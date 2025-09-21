import { type Theme, alpha } from "@mui/material/styles";
import type { ChipProps } from "@mui/material/Chip";

// ===============================||  OVERRIDES - CHIP  ||=============================== //

export default function Chip(theme: Theme) {
  return {
    MuiChip: {
      defaultProps: {
        color: "primary",
        variant: "light",
      },
      styleOverrides: {
        root: {
          "&.MuiChip-deletable .MuiChip-deleteIcon": {
            color: "inherit",
          },
          variants: [
            {
              props: { variant: "light" },
              style: ({
                ownerState,
              }: {
                ownerState: ChipProps & { color: string };
              }) => {
                const colorKey = ownerState.color || "primary";
                const paletteColor = theme.palette[
                  colorKey as keyof Theme["palette"]
                ] as any;

                return {
                  ...(paletteColor && {
                    color: paletteColor.main,
                    backgroundColor: paletteColor.light,
                    ...(ownerState.color === "error" && {
                      backgroundColor: alpha(paletteColor.light, 0.25),
                    }),
                    ...(ownerState.color === "success" && {
                      backgroundColor: alpha(paletteColor.light, 0.5),
                    }),
                    ...((ownerState.color === "warning" ||
                      ownerState.color === "success") && {
                      color: paletteColor.dark,
                    }),
                    "&.MuiChip-clickable": {
                      "&:hover": {
                        color: paletteColor.light,
                        backgroundColor: paletteColor.dark,
                      },
                    },
                  }),
                };
              },
            },
            {
              props: { variant: "outlined", color: "warning" },
              style: {
                borderColor: theme.palette.warning.dark,
                color: theme.palette.warning.dark,
              },
            },
            {
              props: { variant: "outlined", color: "success" },
              style: {
                borderColor: theme.palette.success.dark,
                color: theme.palette.success.dark,
              },
            },
          ],
        },
      },
    },
  };
}
