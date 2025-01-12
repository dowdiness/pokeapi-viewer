import './style.css'
import { setupSearch } from './searchPokemon.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Pokemon Viewer</h1>
    <div class="card">
      <input id="search">
    </div>
    <div class="card">
      <button id="start" type="button">Search</button>
    </div>
    <p id="pokemon"></p>
    <img id="poke-img" />
  </div>
`

const input = document.querySelector<HTMLInputElement>('#search')
const button = document.querySelector<HTMLButtonElement>('#start')
const target = document.querySelector<HTMLParagraphElement>('#pokemon')
const image = document.querySelector<HTMLImageElement>('#poke-img')

setupSearch(input!, button!, target!, image!)
