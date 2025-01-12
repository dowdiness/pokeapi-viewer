import { getPokemon } from './pokeapi'
import { Pokemon } from './types'

/**
 * ポケモンの検索機能を設定します。
 *
 * @param element - ユーザーがポケモンの名前を入力する入力要素。
 * @param button - 検索をトリガーするボタン要素。
 * @param target - ポケモンの説明が表示される段落要素。
 * @param image - ポケモンの画像が表示される画像要素。
 */
export function setupSearch(
  element: HTMLInputElement,
  button: HTMLButtonElement,
  target: HTMLParagraphElement,
  image: HTMLImageElement,
) {
  const setDescription = (pokemon: Pokemon) => {
    const flavor = pokemon.flavors[0] ?? '解説が見つかりませんでした'
    const description = `
      名前: ${pokemon.name}
      分類: ${pokemon.genus}
      解説: ${flavor}
    `
    target.innerHTML = description
    image.src = pokemon.sprite
  }

  button.addEventListener('click', () => {
    getPokemon(element.value)
      .then((pokemon) => {
        setDescription(pokemon)
      })
      .catch((e) => console.error(e))
  })

  getPokemon('pikachu')
    .then((pokemon) => {
      setDescription(pokemon)
    })
    .catch((e) => console.error(e))
}
