import type { endPoints, options } from './types'

/**
 * PokeAPIのURLを作成します。
 *
 * @param endpoint - 使用するエンドポイント（デフォルトは 'pokemon'）。
 * @param options - リクエストのオプションパラメータ。
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
  if (options.name) {
    pathname = `${versionPath}/${endpoint}/${options.name}/`;
  } else {
    pathname = `${versionPath}/${endpoint}/`;
  }

  const url = `${pathname}?${options.searchParams.toString()}`;

  return new URL(url, baseUrl);
}

/**
 * ポケモンの名前でスプライトと情報を取得します。
 *
 * @param name - ポケモンの名前。
 * @returns スプライトURLとポケモンの名前、フレーバーテキスト、分類を含む配列に解決されるPromise。
 */
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
    return [pokeName, flavors, genera] satisfies [string, string[], string];
  }

  const result = await Promise.all([getSprite(), getInfo()])

  return result
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
