import { merge } from "lodash-es";
import Chip from "./Chip";
import type { Theme } from "@mui/material";

// ===============================||  OVERRIDES - MAIN  ||=============================== //

export default function ComponentsOverrides(theme: Theme) {
  return merge(Chip(theme));
}
