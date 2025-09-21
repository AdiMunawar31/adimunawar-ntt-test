import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";

import navigation from "../../menu-items";
import { IconChevronRight, IconTallymark1 } from "@tabler/icons-react";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import HomeIcon from "@mui/icons-material/Home";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";

// ==============================|| TYPES ||============================== //

interface LinkItem {
  title: string;
  to?: string;
  icon?: React.ElementType;
}

interface BreadcrumbsProps {
  card?: boolean;
  custom?: boolean;
  divider?: boolean;
  heading?: string;
  icon?: boolean;
  icons?: boolean;
  links?: LinkItem[];
  maxItems?: number;
  rightAlign?: boolean;
  separator?: React.ElementType;
  title?: boolean;
  titleBottom?: boolean;
  sx?: object;
  [key: string]: any; // untuk props tambahan
}

interface MenuItem {
  id?: string;
  title: string;
  type: "group" | "collapse" | "item";
  url?: string;
  icon?: React.ElementType;
  breadcrumbs?: boolean;
  children?: MenuItem[];
}

// ==============================|| SUB TITLE COMPONENT ||============================== //

function BTitle({ title }: { title: string }) {
  return (
    <Grid>
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
    </Grid>
  );
}

// ==============================|| MAIN COMPONENT ||============================== //

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  card = true,
  custom = false,
  divider = false,
  heading,
  icon = true,
  icons,
  links,
  maxItems = 8,
  rightAlign = true,
  separator = IconChevronRight,
  title = true,
  titleBottom,
  sx = {},
  ...others
}) => {
  const theme = useTheme();
  const location = useLocation();

  const [main, setMain] = useState<MenuItem | undefined>();
  const [item, setItem] = useState<MenuItem | undefined>();

  const iconSX = {
    marginRight: 6,
    marginTop: -2,
    width: "1rem",
    height: "1rem",
    color: theme.palette.secondary.main,
  };

  const linkSX = {
    display: "flex",
    color: "grey.900",
    textDecoration: "none",
    alignContent: "center",
    alignItems: "center",
  };

  let customLocation = location.pathname;

  // recursive menu traversal
  const getCollapse = (menu: MenuItem) => {
    if (!custom && menu.children) {
      menu.children.forEach((collapse) => {
        if (collapse.type === "collapse") {
          getCollapse(collapse);
          if (collapse.url === customLocation) {
            setMain(collapse);
            setItem(collapse);
          }
        } else if (collapse.type === "item") {
          if (customLocation === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
      });
    }
  };

  useEffect(() => {
    navigation?.items?.forEach((menu: any) => {
      if (menu.type === "group") {
        if (menu?.url && menu.url === customLocation) {
          setMain(menu);
          setItem(menu);
        } else {
          getCollapse(menu);
        }
      }
    });
  }, [customLocation]);

  const SeparatorIcon = separator;
  const separatorIcon = separator ? (
    <SeparatorIcon stroke={1.5} size="16px" />
  ) : (
    <IconTallymark1 stroke={1.5} size="16px" />
  );

  let mainContent;
  let itemContent;
  let breadcrumbContent: React.ReactNode = <Typography />;
  let itemTitle = "";
  let CollapseIcon: React.ElementType | undefined;
  let ItemIcon: React.ElementType | undefined;

  // main content
  if (main && main.type === "collapse") {
    CollapseIcon = main.icon ? main.icon : AccountTreeTwoToneIcon;
    mainContent = (
      <Typography
        {...(main.url && { component: Link as any, to: main.url })}
        variant="h6"
        noWrap
        sx={{
          overflow: "hidden",
          lineHeight: 1.5,
          mb: -0.625,
          textOverflow: "ellipsis",
          maxWidth: { xs: 102, sm: "unset" },
          display: "inline-block",
        }}
        color={
          window.location.pathname === main.url
            ? "text.primary"
            : "text.secondary"
        }
      >
        {icons && <CollapseIcon style={{ ...iconSX }} />}
        {main.title}
      </Typography>
    );
  }

  // breadcrumb card for main
  if (
    !custom &&
    main &&
    main.type === "collapse" &&
    main.breadcrumbs !== false
  ) {
    breadcrumbContent = (
      <Card
        sx={
          card === false
            ? { mb: 3, bgcolor: "transparent", ...sx }
            : { mb: 3, bgcolor: "background.default", ...sx }
        }
        {...others}
      >
        <Box sx={{ p: 1.25, px: card === false ? 0 : 2 }}>
          <Grid
            container
            direction={rightAlign ? "row" : "column"}
            justifyContent={rightAlign ? "space-between" : "flex-start"}
            alignItems={rightAlign ? "center" : "flex-start"}
            spacing={1}
          >
            {title && !titleBottom && <BTitle title={main.title} />}
            <Grid>
              <MuiBreadcrumbs
                aria-label="breadcrumb"
                maxItems={maxItems}
                separator={separatorIcon}
                sx={{
                  "& .MuiBreadcrumbs-separator": {
                    width: 16,
                    ml: 1.25,
                    mr: 1.25,
                  },
                }}
              >
                <Typography
                  component={Link as any}
                  to="/"
                  color="textSecondary"
                  variant="h6"
                  sx={linkSX}
                >
                  {icons && <HomeTwoToneIcon style={iconSX} />}
                  {icon && !icons && (
                    <HomeIcon style={{ ...iconSX, marginRight: 0 }} />
                  )}
                  {(!icon || icons) && "Dashboard"}
                </Typography>
                {mainContent}
              </MuiBreadcrumbs>
            </Grid>
            {title && titleBottom && <BTitle title={main.title} />}
          </Grid>
        </Box>
        {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
      </Card>
    );
  }

  // item content
  if (
    (item && item.type === "item") ||
    (item?.type === "group" && item?.url) ||
    custom
  ) {
    itemTitle = item?.title ?? "";
    ItemIcon = item?.icon ? item.icon : AccountTreeTwoToneIcon;

    itemContent = (
      <Typography
        variant="h6"
        noWrap
        sx={{
          ...linkSX,
          color: "text.secondary",
          display: "inline-block",
          overflow: "hidden",
          lineHeight: 1.5,
          mb: -0.625,
          textOverflow: "ellipsis",
          maxWidth: { xs: 102, sm: "unset" },
        }}
      >
        {icons && <ItemIcon style={{ ...iconSX }} />}
        {itemTitle}
      </Typography>
    );

    let tempContent: React.ReactNode = (
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        maxItems={maxItems}
        separator={separatorIcon}
        sx={{ "& .MuiBreadcrumbs-separator": { width: 16, mx: 0.75 } }}
      >
        <Typography
          component={Link as any}
          to="/dashboard/main"
          color="textSecondary"
          variant="h6"
          sx={linkSX}
        >
          {/* {icons && <HomeTwoToneIcon style={...iconSX} />} */}
          {icon && !icons && <HomeIcon style={{ ...iconSX, marginRight: 0 }} />}
          {(!icon || icons) && "Dashboard"}
        </Typography>
        {mainContent}
        {itemContent}
      </MuiBreadcrumbs>
    );

    // custom links
    if (custom && links && links.length > 0) {
      tempContent = (
        <MuiBreadcrumbs
          aria-label="breadcrumb"
          maxItems={maxItems}
          separator={separatorIcon}
          sx={{
            "& .MuiBreadcrumbs-separator": {
              width: 16,
              ml: 1.25,
              mr: 1.25,
            },
          }}
        >
          {links.map((link, index) => {
            const LIcon = link.icon ? link.icon : AccountTreeTwoToneIcon;
            return (
              <Typography
                key={index}
                {...(link.to && { component: Link as any, to: link.to })}
                variant="h6"
                sx={linkSX}
                color={!link.to ? "text.primary" : "text.secondary"}
              >
                {link.icon && <LIcon style={iconSX} />}
                {link.title}
              </Typography>
            );
          })}
        </MuiBreadcrumbs>
      );
    }

    if (item?.breadcrumbs !== false || custom) {
      breadcrumbContent = (
        <Card
          sx={
            card === false
              ? { mb: 3, bgcolor: "transparent", ...sx }
              : { mb: 3, bgcolor: "background.default", ...sx }
          }
          {...others}
        >
          <Box sx={{ p: 1.25, px: card === false ? 0 : 2 }}>
            <Grid
              container
              direction={rightAlign ? "row" : "column"}
              justifyContent={rightAlign ? "space-between" : "flex-start"}
              alignItems={rightAlign ? "center" : "flex-start"}
              spacing={1}
            >
              {title && !titleBottom && (
                <BTitle title={custom ? heading ?? "" : item?.title ?? ""} />
              )}
              <Grid>{tempContent}</Grid>
              {title && titleBottom && (
                <BTitle title={custom ? heading ?? "" : item?.title ?? ""} />
              )}
            </Grid>
          </Box>
          {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
        </Card>
      );
    }
  }

  return breadcrumbContent;
};

export default Breadcrumbs;
