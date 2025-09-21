import type { ReactNode, ForwardedRef } from "react";
import Collapse, { type CollapseProps } from "@mui/material/Collapse";
import Fade, { type FadeProps } from "@mui/material/Fade";
import Grow, { type GrowProps } from "@mui/material/Grow";
import Slide, { type SlideProps } from "@mui/material/Slide";
import Zoom, { type ZoomProps } from "@mui/material/Zoom";
import Box, { type BoxProps } from "@mui/material/Box";

type TransitionType = "grow" | "collapse" | "fade" | "slide" | "zoom";
type TransitionPlacement =
  | "top-left"
  | "top-right"
  | "top"
  | "bottom-left"
  | "bottom-right"
  | "bottom";
type TransitionDirection = "left" | "right" | "up" | "down";

interface BaseProps {
  children: ReactNode;
  placement?: TransitionPlacement;
  type?: TransitionType;
  direction?: TransitionDirection;
  ref?: ForwardedRef<HTMLDivElement>;
}

type TransitionsProps = BaseProps &
  Omit<BoxProps, "children" | "position"> &
  Partial<GrowProps & FadeProps & SlideProps & CollapseProps & ZoomProps>;

export default function Transitions({
  children,
  placement = "top-left",
  sx,
  type = "grow",
  direction = "up",
  ref,
  ...others
}: TransitionsProps) {
  let positionSX: Record<string, string> = {
    transformOrigin: "0 0 0",
  };

  switch (placement) {
    case "top-right":
      positionSX = { transformOrigin: "top right" };
      break;
    case "top":
      positionSX = { transformOrigin: "top" };
      break;
    case "bottom-left":
      positionSX = { transformOrigin: "bottom left" };
      break;
    case "bottom-right":
      positionSX = { transformOrigin: "bottom right" };
      break;
    case "bottom":
      positionSX = { transformOrigin: "bottom" };
      break;
    case "top-left":
    default:
      positionSX = { transformOrigin: "0 0 0" };
      break;
  }

  return (
    <Box ref={ref}>
      {type === "grow" && (
        <Grow {...others}>
          <Box sx={{ ...positionSX, ...sx }}>{children}</Box>
        </Grow>
      )}
      {type === "collapse" && (
        <Collapse {...others} sx={{ ...positionSX, ...sx }}>
          {children}
        </Collapse>
      )}
      {type === "fade" && (
        <Fade
          {...others}
          timeout={{
            appear: 500,
            enter: 600,
            exit: 400,
          }}
        >
          <Box sx={{ ...positionSX, ...sx }}>{children}</Box>
        </Fade>
      )}
      {type === "slide" && (
        <Slide
          {...others}
          timeout={{
            appear: 0,
            enter: 400,
            exit: 200,
          }}
          direction={direction}
        >
          <Box sx={{ ...positionSX, ...sx }}>{children}</Box>
        </Slide>
      )}
      {type === "zoom" && (
        <Zoom {...others}>
          <Box sx={{ ...positionSX, ...sx }}>{children}</Box>
        </Zoom>
      )}
    </Box>
  );
}
