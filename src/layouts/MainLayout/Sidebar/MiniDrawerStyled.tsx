import { styled, type CSSObject, type Theme } from "@mui/material/styles";
import Drawer, { type DrawerProps } from "@mui/material/Drawer";

// project imports
import { drawerWidth } from "../../../configs/constant";

// ==============================|| DRAWER - MINI STYLED MIXINS ||============================== //

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  borderRight: "none",
  zIndex: 1099,
  background: theme.palette.background.default,
  overflowX: "hidden",
  boxShadow: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen + 200,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: 72,
  height: "auto",
  borderRight: "none",
  zIndex: 1099,
  background: theme.palette.background.default,
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen + 200,
  }),
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

interface MiniDrawerProps extends DrawerProps {
  open?: boolean;
}

const MiniDrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<MiniDrawerProps>(({ theme, open }: { theme: Theme; open?: boolean }) => {
  const paperStyles = open ? openedMixin(theme) : closedMixin(theme);
  return {
    width: drawerWidth,
    borderRight: "0px",
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": paperStyles,
  };
});

export default MiniDrawerStyled;
