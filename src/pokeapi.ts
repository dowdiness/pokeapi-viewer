import typia from 'typia'
import type {
  endPoints,
  options,
  Pokemon,
  PokemonSprite,
  PokemonSpecies
} from './types'

/**
 * PokeAPIのURLを作成します。
 *
 * @param endpoint - 使用するエンドポイント（デフォルトは 'pokemon'）。
 * @param options - リクエストのオプションパラメータ。
 * @see https://pokeapi.co/
 * @returns 作成されたURL。
 */
function createPokeUrl(
  endpoint: endPoints = 'pokemon',
  options?: options
) {
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
  if (options.nameOrId) {
    pathname = `${versionPath}/${endpoint}/${options.nameOrId}/`;
  } else {
    pathname = `${versionPath}/${endpoint}/`;
  }

  const url = `${pathname}?${options.searchParams.toString()}`;

  return new URL(url, baseUrl);
}

/**
 * ポケモンの名前でスプライトと情報を取得します。
 *
 * @param nameOrId - ポケモンの名前か図鑑番号。
 * @returns スプライトURLとポケモンの名前、フレーバーテキスト、分類を含む配列に解決されるPromise。
 */
async function getPokemon(nameOrId: string): Promise<Pokemon> {
  const getSprite = async () => {
    let spriteUrl = 'https://demofree.sirv.com/nope-not-here.jpg';
    try {
      const res = await fetch(createPokeUrl('pokemon', { nameOrId }));
      if (!res.ok) {
        console.error(`レスポンスステータス on pokemon: ${res.status}`)
        return spriteUrl
      }
      const json = await res.json();
      const validatedJson = typia.misc.validatePrune<PokemonSprite>(json)
      if (!validatedJson.success) {
        console.error(validatedJson.errors)
        return spriteUrl
      }
      spriteUrl = json.sprites.front_default;
    } catch (e) {
      console.error(e);
    }
    return spriteUrl;
  }

  const getInfo = async () => {
    let name = '名前が見つかりませんでした';
    let flavors = ['解説が見つかりませんでした'];
    let genus = '分類が見つかりませんでした';
    try {
      const res = await fetch(createPokeUrl('pokemon-species', { nameOrId }));
      if (!res.ok) {
        console.error(`レスポンスステータス on pokemon: ${res.status}`);
        return { name, flavors, genus };
      }
      const json = await res.json();
      const validatedJson = typia.misc.validatePrune<PokemonSpecies>(json)
      if (!validatedJson.success) {
        console.error(validatedJson.errors)
        return { name, flavors, genus };
      }
      name = validatedJson.data.names
        .filter((name) => name?.language?.name === 'ja')
        [0]?.name ?? name
      flavors = validatedJson.data.flavor_text_entries
        .filter((flavor) => flavor?.language?.name === 'ja')
        .map((flavor) => flavor.flavor_text)
      genus = validatedJson.data.genera
        .filter((genus) => genus?.language?.name === 'ja')
        [0]?.genus ?? genus
    } catch (e) {
      console.error(e);
    }
    return { name, flavors, genus };
  }

  const result = await Promise.all([getSprite(), getInfo()])

  return { sprite: result[0], ...result[1] }
}

/**
 * IDの範囲でポケモンを取得します。
 *
 * @param start - 範囲の開始ID。
 * @param end - 範囲の終了ID。
 * @returns ポケモンデータに解決されるPromiseの配列。
 */
function getPokemons(start: number, end: number) {
  return Array.from({ length: end - start + 1 })
    .map((_, i) => getPokemon(`${i + start}`))
}

export { getPokemon, getPokemons }
