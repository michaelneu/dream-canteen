import { ONE_MINUTE, ONE_SECOND } from "../lib/Time";
import { Percentage, TimeNumber } from "../types/Numbers";

export const IS_DEBUG_ENABLED = window.location.search.includes("debug");
export const SCREEN_AREA_UNDERSCALE = 0.9 as Percentage;
export const BLOCK_SIZE = 100;
export const MOVEMENT_SPEED = 10;
export const BLOCK_GRAB_DISTANCE = 80;
export const BLOCK_PUT_DOWN_DISTANCE = 150;

export const GAME_DURATION = (2 * ONE_MINUTE) as TimeNumber;

export const PREPARE_STATION_PROGRESS_CHANGE = 5 as Percentage;
export const COOKING_STATION_PROGRESS_CHANGE = 1 as Percentage;
export const POT_MAX_CONTENTS = 3;

export const INGREDIENTS_TO_DROP = 3;
export const INGREDIENTS_BLINK_AFTER_MS = ONE_SECOND;

export const MAX_RECIPES = 3;
export const MAX_INGREDIENTS_PER_RECIPE = 4;

export const SCORE_INCREASE_CORRECT_RECIPE = 100;
export const SCORE_DECREASE_WRONG_RECIPE = -10;
