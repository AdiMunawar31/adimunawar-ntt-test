import type { ElementType } from "react";
import MuiAvatar, {
  type AvatarProps as MuiAvatarProps,
} from "@mui/material/Avatar";

type AvatarSize = "badge" | "xs" | "sm" | "md" | "lg" | "xl";

export interface CustomAvatarProps extends Omit<MuiAvatarProps, "color"> {
  className?: string;
  color?: string;
  outline?: boolean;
  size?: AvatarSize;
  sx?: MuiAvatarProps["sx"];
  component?: ElementType;
  href?: string;
  target?: string;
}

export default function Avatar({
  className,
  color,
  outline,
  size,
  sx,
  ...others
}: CustomAvatarProps) {
  const colorSX =
    color && !outline
      ? { color: "background.paper", bgcolor: `${color}.main` }
      : {};

  const outlineSX = outline
    ? {
        color: color ? `${color}.main` : "primary.main",
        bgcolor: "background.paper",
        border: "2px solid",
        borderColor: color ? `${color}.main` : "primary.main",
      }
    : {};

  let sizeSX: Record<string, number> = {};

  switch (size) {
    case "badge":
      sizeSX = { width: 28, height: 28 };
      break;
    case "xs":
      sizeSX = { width: 34, height: 34 };
      break;
    case "sm":
      sizeSX = { width: 40, height: 40 };
      break;
    case "md":
      sizeSX = { width: 60, height: 60 };
      break;
    case "lg":
      sizeSX = { width: 72, height: 72 };
      break;
    case "xl":
      sizeSX = { width: 82, height: 82 };
      break;
    default:
      sizeSX = {};
  }

  return (
    <MuiAvatar
      className={className}
      sx={{ ...colorSX, ...outlineSX, ...sizeSX, ...sx }}
      {...others}
    />
  );
}
