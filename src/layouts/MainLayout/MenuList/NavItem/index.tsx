import { useEffect, useRef, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// project imports
import { handlerDrawerOpen, useGetMenuMaster } from "../../../../api/menu";
import useConfig from "../../../../hooks/useConfig";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import type { MenuItem } from "../../../../interfaces/menu-item";

// ==============================|| NAV ITEM TYPES ||============================== //

interface MenuChip {
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  variant?: "filled" | "outlined";
  size?: "small" | "medium";
  label: string;
  avatar?: string;
}

interface ExtendedMenuItem extends MenuItem {
  target?: boolean;
  disabled?: boolean;
  chip?: MenuChip;
}

interface NavItemProps {
  item: ExtendedMenuItem;
  level: number;
  isParents?: boolean;
  setSelectedID?: () => void;
}

// ==============================|| COMPONENT - NAV ITEM ||============================== //

export default function NavItem({
  item,
  level,
  isParents = false,
  setSelectedID,
}: NavItemProps) {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));
  const ref = useRef<HTMLSpanElement | null>(null);

  const { pathname } = useLocation();
  const { borderRadius } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const path = item.link ?? item.url;
  const isSelected = path ? !!matchPath({ path, end: false }, pathname) : false;

  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    if (ref.current) {
      const compare = ref.current.scrollWidth > ref.current.clientWidth;
      setHover(compare);
    }
  };

  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
    return () => {
      window.removeEventListener("resize", compareSize);
    };
  }, []);

  const Icon = item?.icon;
  const itemIcon = Icon ? (
    <Icon
      stroke={1.5}
      size={drawerOpen ? "20px" : "24px"}
      style={{ ...(isParents && { fontSize: 20, stroke: "1.5" }) }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{ width: isSelected ? 8 : 6, height: isSelected ? 8 : 6 }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  const itemTarget = item.target ? "_blank" : "_self";

  const itemHandler = () => {
    if (downMD) handlerDrawerOpen(false);

    if (isParents && setSelectedID) {
      setSelectedID();
    }
  };

  const iconSelectedColor = "secondary.main";

  const itemUrl = item.url ?? "#";

  return (
    <ListItemButton
      component={Link}
      to={itemUrl}
      target={itemTarget}
      disabled={item.disabled}
      disableRipple={!drawerOpen}
      sx={{
        zIndex: 1201,
        borderRadius: `${borderRadius}px`,
        mb: 0.5,
        ...(drawerOpen && level !== 1 && { ml: `${level * 18}px` }),
        ...(!drawerOpen && { pl: 1.25 }),
        ...(drawerOpen &&
          level === 1 && {
            "&:hover": {
              bgcolor: "secondary.light",
            },
            "&.Mui-selected": {
              bgcolor: "secondary.light",
              color: iconSelectedColor,
              "&:hover": {
                color: iconSelectedColor,
                bgcolor: "secondary.light",
              },
            },
          }),
        ...((!drawerOpen || level !== 1) && {
          py: level === 1 ? 0 : 1,
          "&:hover": {
            bgcolor: "transparent",
          },
          "&.Mui-selected": {
            "&:hover": {
              bgcolor: "transparent",
            },
            bgcolor: "transparent",
          },
        }),
      }}
      selected={isSelected}
      onClick={itemHandler}
    >
      <ButtonBase
        aria-label="theme-icon"
        sx={{ borderRadius: `${borderRadius}px` }}
        disableRipple={drawerOpen}
      >
        <ListItemIcon
          sx={{
            minWidth: level === 1 ? 36 : 18,
            color: isSelected ? iconSelectedColor : "text.primary",
            ...(!drawerOpen &&
              level === 1 && {
                borderRadius: `${borderRadius}px`,
                width: 46,
                height: 46,
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  bgcolor: "secondary.light",
                },
                ...(isSelected && {
                  bgcolor: "secondary.light",
                  "&:hover": {
                    bgcolor: "secondary.light",
                  },
                }),
              }),
          }}
        >
          {itemIcon}
        </ListItemIcon>
      </ButtonBase>

      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <Tooltip title={item.title} disableHoverListener={!hoverStatus}>
          <ListItemText
            primary={
              <Typography
                ref={ref}
                noWrap
                variant={isSelected ? "h5" : "body1"}
                color="inherit"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: 102,
                }}
              >
                {item.title}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{ display: "block", ...theme.typography.caption }}
                >
                  {item.caption}
                </Typography>
              )
            }
          />
        </Tooltip>
      )}

      {drawerOpen && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={
            item.chip.avatar ? <Avatar>{item.chip.avatar}</Avatar> : undefined
          }
        />
      )}
    </ListItemButton>
  );
}
