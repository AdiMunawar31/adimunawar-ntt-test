import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeText {
    dark: string;
    hint: string;
  }
  interface Palette {
    orange: Palette["primary"];
    dark: Palette["primary"];
  }
  interface PaletteOptions {
    orange?: PaletteColorOptions;
    dark?: PaletteColorOptions;
  }
}
