import React, { type ReactNode } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  type CardProps,
} from "@mui/material";

// ==============================|| CUSTOM SUB CARD ||============================== //

interface SubCardProps extends Omit<CardProps, "title" | "content"> {
  children: ReactNode;
  className?: string;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: ReactNode;
  sx?: object;
  contentSX?: object;
  footerSX?: object;
  title?: ReactNode;
  actions?: ReactNode;
}

const SubCard: React.FC<SubCardProps> = ({
  children,
  className,
  content = true,
  contentClass,
  darkTitle,
  secondary,
  sx = {},
  contentSX = {},
  footerSX = {},
  title,
  actions,
  ...others
}) => {
  const defaultShadow = "0 2px 14px 0 rgb(32 40 45 / 8%)";

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "divider",
        ":hover": { boxShadow: defaultShadow },
        ...sx,
      }}
      className={className}
      {...others}
    >
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader
          sx={{ p: 2.5 }}
          title={<Typography variant="h5">{title}</Typography>}
          action={secondary}
        />
      )}
      {darkTitle && title && (
        <CardHeader
          sx={{ p: 2.5 }}
          title={<Typography variant="h4">{title}</Typography>}
          action={secondary}
        />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent
          sx={{ p: 2.5, ...contentSX }}
          className={contentClass || ""}
        >
          {children}
        </CardContent>
      )}
      {!content && children}

      {/* actions & footer divider */}
      {actions && <Divider />}

      {actions && (
        <CardActions sx={{ p: 2.5, ...footerSX }}>{actions}</CardActions>
      )}
    </Card>
  );
};

export default SubCard;
