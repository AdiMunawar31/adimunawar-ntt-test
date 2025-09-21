import { type ReactNode, useMemo } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  type Theme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// project imports
import useConfig from "../hooks/useConfig";
import Palette from "./palette";
import Typography from "./typography";
import componentStyleOverrides from "./compStyleOverride";
import customShadows from "./shadows";

interface ThemeCustomizationProps {
  children: ReactNode;
}

const ThemeCustomization: React.FC<ThemeCustomizationProps> = ({
  children,
}) => {
  const { borderRadius, fontFamily, mode, outlinedFilled, presetColor } =
    useConfig();

  // Palette
  const theme: Theme = useMemo(
    () => Palette(mode, presetColor),
    [mode, presetColor]
  );

  // Typography
  const themeTypography = useMemo(
    () => Typography(theme, borderRadius, fontFamily),
    [theme, borderRadius, fontFamily]
  );

  // Custom Shadows
  const themeCustomShadows = useMemo(
    () => customShadows(mode, theme),
    [mode, theme]
  );

  // Theme Options
  const themeOptions = useMemo(
    () => ({
      direction: "ltr",
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: "48px",
          padding: "16px",
          "@media (min-width: 600px)": {
            minHeight: "48px",
          },
        },
      },
      typography: themeTypography,
      customShadows: themeCustomShadows,
    }),
    [theme, themeCustomShadows, themeTypography]
  );

  const themes: Theme = createTheme(themeOptions as any);

  themes.components = useMemo(
    () =>
      componentStyleOverrides({
        theme: themes,
        borderRadius,
        outlinedFilled,
      }),
    [themes, borderRadius, outlinedFilled]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeCustomization;
