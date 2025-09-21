import React from "react";
import { Button, CircularProgress } from "@mui/material";
import AmTypography from "./AmTypography";
import colors from "../../configs/colors";

interface ButtonProps {
  readonly color?: string;
  readonly variant?: "contained" | "outlined" | "text";
  readonly icon?: React.ReactNode;
  readonly endIcon?: React.ReactNode;
  readonly label?: React.ReactNode;
  readonly sx?: object;
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
  readonly fullWidth?: boolean;
  readonly type?: "button" | "submit" | "reset";
  readonly borderRadius?: string | number;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly display?: "block" | "flex";
  readonly labelColor?: string;
  readonly borderColor?: string;
  readonly isHover?: boolean;
  readonly isActive?: boolean;
  readonly gapIcon?: string | number;
}

export default function AmButton({
  color = colors.palette.primary,
  variant = "outlined",
  icon,
  endIcon,
  label,
  sx,
  onClick,
  fullWidth = false,
  type = "button",
  borderRadius = "6px",
  disabled = false,
  loading = false,
  labelColor,
  borderColor = "transparent",
  display,
  isHover = false,
  isActive = false,
  gapIcon = 0,
}: ButtonProps) {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      sx={{
        ...sx,
        borderRadius: borderRadius,
        border: `1px solid ${borderColor}`,
        textTransform: "none",
        backgroundColor:
          (sx as Record<string, any>)?.backgroundColor ||
          (isActive ? colors.palette.primary : color),
        display: display,
        boxShadow: "none",
        color: isActive ? "white" : labelColor,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: isHover ? colors.palette.primary : "none",
          backgroundColor: isHover ? colors.palette.primary : "none",
          color: isHover ? "white" : labelColor,
          "& .icon": {
            color: isHover ? "white" : labelColor,
          },
        },
      }}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <div style={{ display: "flex", gap: gapIcon }}>
          {icon && (
            <AmTypography
              className="icon"
              style={{
                color: labelColor,
                display: "inline-flex",
                alignItems: "center",
                marginRight: label ? "0.5rem" : "0",
              }}
            >
              {icon}
            </AmTypography>
          )}
          <AmTypography>{label}</AmTypography>
          {endIcon && (
            <AmTypography
              className="end-icon"
              style={{
                color: labelColor,
                display: "inline-flex",
                alignItems: "center",
                marginLeft: label ? "0.5rem" : "0",
              }}
            >
              {endIcon}
            </AmTypography>
          )}
        </div>
      )}
    </Button>
  );
}
