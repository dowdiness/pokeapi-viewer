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
