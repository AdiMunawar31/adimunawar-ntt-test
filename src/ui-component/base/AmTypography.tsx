import { Typography } from "@mui/material";
import React, { type FC, type ReactNode, type ReactElement } from "react";

interface AmTypographyProps {
  big?: boolean;
  bold?: boolean;
  extraBold?: boolean;
  children: ReactNode;
  color?: string;
  fontSize?: number | string;
  fontWeight?: number;
  extraSmall?: boolean;
  small?: boolean;
  semiBold?: boolean;
  medium?: boolean;
  sx?: React.CSSProperties;
  textAlign?: React.CSSProperties["textAlign"];
  [key: string]: any;
}

const AmTypography: FC<AmTypographyProps> = ({
  big = false,
  bold = false,
  extraBold = false,
  children,
  color = "inherit",
  fontSize,
  fontWeight,
  extraSmall = false,
  small = false,
  semiBold = false,
  medium = false,
  sx,
  textAlign,
  ...props
}): ReactElement | null => {
  const determineFontSize = (): string | number => {
    if (big) return "24px";
    if (small) return "14px";
    if (extraSmall) return "12px";
    if (fontSize) return fontSize;
    return "16px";
  };

  const determineFontWeight = (): string | number => {
    if (extraBold) return "800";
    if (bold) return "700";
    if (semiBold) return "600";
    if (medium) return "500";
    return fontWeight ?? "400";
  };

  return (
    <Typography
      component="span"
      textOverflow="ellipsis"
      fontSize={fontSize}
      textAlign={textAlign}
      sx={{
        color: color,
        whiteSpace: "pre-line",
        wordBreak: "break-word",
        fontSize: determineFontSize(),
        fontWeight: determineFontWeight(),
        fontFamily: "var(--font-source-sans), sans-serif",
        textTransform: "none",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default AmTypography;
