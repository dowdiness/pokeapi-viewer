import { tags } from "typia";

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

export type endPoints =
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

export type options = {
  name?: string,
  searchParams?: URLSearchParams
}

type NamedAPIResource = {
  name: string, url: string
}

type Name = {
  name: string,
  language: NamedAPIResource
}

export type PokemonSprite = {
  sprites: {
    front_default: string,
    front_shiny: string,
    front_female: string | null,
    front_shiny_female: string | null,
    back_default: string | null,
    back_shiny: string | null,
    back_female: string | null,
    back_shiny_female: string | null,
  }
}

type Genus = {
  genus: string,
  language: {
    name: string, url: string
  }
}

export type PokemonSpecies = {
  flavor_text_entries: {
    flavor_text: string,
    language: NamedAPIResource
  }[],
  genera: Genus[] & tags.MinItems<1>,
  names: Name[] & tags.MinItems<1>,
}
