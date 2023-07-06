import React from "react";

interface NameUrl {
  name: string;
  url: string;
}

interface Abilities {
  ability: NameUrl[];
  is_hidden: boolean;
  slot: number;
}

interface GameIncideces {
  game_index: number;
  version: NameUrl[];
}

interface VersionDetail {
  level_learned_at: number;
  move_learn_method: NameUrl[];
  version_group: NameUrl[];
}

interface Moves {
  move: NameUrl[];
  version_group_details: VersionDetail[];
}

interface DreamWorld {
  front_default: string;
  front_female: boolean;
}

interface SpriteOtherHome {
  front_default: string;
  front_female: boolean;
  front_shiny: string;
  front_shiny_female: boolean;
}

interface OfficialArtWork {
  front_default: string;
  front_shiny: string;
}

interface SpriteOther {
  dream_world: DreamWorld[];
  home: SpriteOtherHome[];
  official_artwork: OfficialArtWork[];
}

interface GenerationColors {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

interface GenerationI {
  red_blue: GenerationColors[];
  yellow: GenerationColors[];
}

interface ColorCrystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

interface GenerationII {
  crystal: ColorCrystal[];
}

interface SpritesVersions {
  generation_i: GenerationI[];
  generation_ii: GenerationII[];
}

interface Sprites {
  back_default: string;
  back_female: boolean;
  back_shiny: string;
  back_shiny_female: boolean;
  front_default: string;
  front_female: boolean;
  front_shiny: string;
  front_shiny_female: boolean;
  other: SpriteOther[];
  versions: SpritesVersions[];
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: NameUrl[];
}

interface Types {
  slot: number;
  type: NameUrl[];
}

interface Pokemon {
  abilities: Abilities[];
  base_experience: number;
  forms: NameUrl[];
  game_indices: GameIncideces[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves[];
  name: string;
  order: number;
  past_types: [];
  species: NameUrl[];
  sprites: Sprites[];
  stats: Stats[];
  types: Types[];
  weight: number;
}

const practice = () => {
  return <div>practice</div>;
};

export default practice;
