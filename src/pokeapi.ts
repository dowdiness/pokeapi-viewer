type berries =
  | 'berry'
  | 'berry-firmness'
  | 'berry-flavor'

type contests =
  | 'contest-type'
  | 'contest-effect'
  | 'super-contest-effect'

type encounters =
  | 'encounter-method'
  | 'encounter-condition'
  | 'encounter-condition-value'

type evolution =
  | 'evolution-chain'
  | 'evolution-trigger'

type games =
  | 'generation'
  | 'pokedex'
  | 'version'
  | 'version-group'

type items =
  | 'item'
  | 'item-attribute'
  | 'item-category'
  | 'item-fling-effect'
  | 'item-pocket'

type locations =
  | 'location'
  | 'location-area'
  | 'pal-park-area'
  | 'region'

type machines = 'machine'

type moves =
  | 'move'
  | 'move-ailment'
  | 'move-battle-style'
  | 'move-category'
  | 'move-damage-class'
  | 'move-learn-method'
  | 'move-target'

type pokemon =
  | 'pokemon'
  | 'ability'
  | 'characteristic'
  | 'egg-group'
  | 'gender'
  | 'growth-rate'
  | 'nature'
  | 'pokeathlon-stat'
  | 'pokemon-color'
  | 'pokemon-form'
  | 'pokemon-habitat'
  | 'pokemon-shape'
  | 'pokemon-species'
  | 'stat'
  | 'type'

type endPoints =
  | berries
  | contests
  | encounters
  | evolution
  | games
  | items
  | locations
  | machines
  | moves
  | pokemon

type options = {
  name?: string,
  searchParams?: URLSearchParams
}

function createPokeUrl(
  endpoint: endPoints = 'pokemon',
  options?: options
) {
  // configure options object
  if (!options) {
    options = {};
  }
  if (!options?.searchParams) {
    options.searchParams = new URLSearchParams([['limit', '20'], ['offset', '0']])
  }

  const baseUrl = 'https://pokeapi.co';
  const versionPath = '/api/v2';
  let pathname = '';
  // set pathname
  if (options.name) {
    pathname = `${versionPath}/${endpoint}/${options.name}/`;
  } else {
    pathname = `${versionPath}/${endpoint}/`;
  }

  const url = `${pathname}?${options.searchParams.toString()}`;

  return new URL(url, baseUrl);
}

async function getPokemon(name: string) {
  const getSprite = async () => {
    let spriteUrl = 'https://demofree.sirv.com/nope-not-here.jpg';
    try {
      const res = await fetch(createPokeUrl('pokemon', { name }));
      if (!res.ok) {
        throw new Error(`レスポンスステータス on pokemon: ${res.status}`);
      }
      const json = await res.json();
      spriteUrl = json.sprites.front_default;
    } catch (e) {
      console.error(e);
    }
    return spriteUrl;
  }

  const getInfo = async () => {
    let flavors = ['解説が見つかりませんでした'];
    let genera = '分類が見つかりませんでした';
    let pokeName = '名前が見つかりませんでした';
    try {
      const res = await fetch(createPokeUrl('pokemon-species', { name }));
      if (!res.ok) {
        throw new Error(`レスポンスステータス on pokemon: ${res.status}`);
      }
      const json = await res.json();
      flavors = json.flavor_text_entries
        .filter((flavor: { language: { name: string } }) => flavor?.language?.name === 'ja')
        .map((flavor: { flavor_text: string }) => flavor.flavor_text)
      genera = json.genera.filter((genera: { language: { name: string } }) => genera?.language?.name === 'ja')[0].genus
      pokeName = json.names.filter((name: { language: { name: string } }) => name?.language?.name === 'ja')[0].name
    } catch (e) {
      console.error(e);
    }
    return [pokeName, flavors, genera];
  }

  const result = await Promise.all([getSprite(), getInfo()])

  return result
}

function getPokemons(start: number, end: number) {
  return Array.from({ length: end - start + 1 })
    .map((_, i) => getPokemon(`${i + start}`))
}

export { getPokemon, getPokemons }
