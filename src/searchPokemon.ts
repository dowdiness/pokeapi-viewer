import { getPokemon } from './pokeapi'

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
  const setPokemon = async (name: string) => {
    return await getPokemon(name)
  }

  const setDescription = (pokemon: [string, [string, string[], string]]) => {
    const description = `
      名前: ${pokemon[1][0]}
      分類: ${pokemon[1][2]}
      解説: ${pokemon[1][1][0]}
    `
    target.innerHTML = description
    image.src = pokemon[0]
  }

  button.addEventListener('click', () => {
    setPokemon(element.value)
      .then((pokemon) => {
        setDescription(pokemon)
      })
      .catch((e) => console.error(e))
  })

  setPokemon('pikachu')
    .then((pokemon) => {
      setDescription(pokemon)
    })
    .catch((e) => console.error(e))
}
