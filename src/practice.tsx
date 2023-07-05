import React from "react";

type AbilityType = {
  name: string;
  url: string;
};

type AbilitiesType = {
  ability: AbilityType[];
  is_hidden: boolean;
  slot: number;
};

type GameIncidecesType = {
  game_index: number;
  version: AbilityType[];
};

type VersionDetailType = {
  level_learned_at: number;
  move_learn_method: AbilityType[];
  version_group: AbilityType[];
};

type MovesType = {
  move: AbilityType[];
  version_group_details: VersionDetailType[];
};

type DreamWorldType = {
  front_default: string;
  front_female: boolean;
};

type SpriteOtherHomeType = {
  front_default: string;
  front_female: boolean;
  front_shiny: string;
  front_shiny_female: boolean;
};

type OfficialArtWorkType = {
  front_default: string;
  front_shiny: string;
};

type SpriteOtherType = {
  dream_world: DreamWorldType[];
  home: SpriteOtherHomeType[];
  official_artwork: OfficialArtWorkType[];
};

type GenerationColorsType = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
};

type GenerationIType = {
  red_blue: GenerationColorsType[];
  yellow: GenerationColorsType[];
};

type ColorCrystalType = {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
};

type GenerationIIType = {
  crystal: ColorCrystalType[];
};

type SpritesVersionsType = {
  generation_i: GenerationIType[];
  generation_ii: GenerationIIType[];
};

type SpritesType = {
  back_default: string;
  back_female: boolean;
  back_shiny: string;
  back_shiny_female: boolean;
  front_default: string;
  front_female: boolean;
  front_shiny: string;
  front_shiny_female: boolean;
  other: SpriteOtherType[];
  versions: SpritesVersionsType[];
};

interface PracticeInterface {
  abilities: AbilitiesType[];
  base_experience: number;
  forms: AbilityType[];
  game_indices: GameIncidecesType[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MovesType[];
  name: string;
  order: number;
  past_types: [];
  species: AbilityType[];
  sprites: SpritesType[];
}

const practice = () => {
  return <div>practice</div>;
};

export default practice;
