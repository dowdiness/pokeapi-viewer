import { getPokemon } from './pokeapi'

export function setupSearch(
  element: HTMLInputElement,
  button: HTMLButtonElement,
  target: HTMLParagraphElement,
  image: HTMLImageElement,
) {
  const setPokemon = async (name: string) => {
    return await getPokemon(name)
  }

  const setDescription = (pokemon: [string, (string | string[])[]]) => {
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
