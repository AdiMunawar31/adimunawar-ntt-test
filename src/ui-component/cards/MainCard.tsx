import type { Theme } from "@mui/material";
import Card, { type CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/system";
import { forwardRef, type ReactNode } from "react";

const headerStyle = {
  "& .MuiCardHeader-action": { mr: 0 },
};

export interface MainCardProps extends Omit<CardProps, "title" | "content"> {
  border?: boolean;
  boxShadow?: boolean;
  content?: boolean;
  contentClass?: string;
  contentSX?: SxProps<Theme>;
  headerSX?: SxProps<Theme>;
  darkTitle?: boolean;
  secondary?: ReactNode;
  shadow?: string;
  title?: ReactNode;
}

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(function MainCard(
  {
    border = false,
    boxShadow,
    children,
    content = true,
    contentClass = "",
    contentSX = {},
    headerSX = {},
    darkTitle,
    secondary,
    shadow,
    sx,
    title,
    ...others
  },
  ref
) {
  const defaultShadow = "0 2px 14px 0 rgb(32 40 45 / 8%)";

  return (
    <Card
      ref={ref}
      {...others}
      sx={{
        border: border ? "1px solid" : "none",
        borderColor: "divider",
        ":hover": {
          boxShadow: boxShadow ? shadow || defaultShadow : "inherit",
        },
        ...sx,
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader
          sx={{ ...headerStyle, ...headerSX }}
          title={title}
          action={secondary}
        />
      )}
      {darkTitle && title && (
        <CardHeader
          sx={{ ...headerStyle, ...headerSX }}
          title={<Typography variant="h3">{title}</Typography>}
          action={secondary}
        />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content ? (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      ) : (
        children
      )}
    </Card>
  );
});

export default MainCard;
