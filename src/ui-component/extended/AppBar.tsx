import { cloneElement, type ReactElement, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";

// assets
import MenuIcon from "@mui/icons-material/Menu";
import { IconDashboard, IconHome2 } from "@tabler/icons-react";

// ==============================|| TYPES ||============================== //

interface ElevationScrollProps {
  children: ReactElement<MuiAppBarProps>;
  window?: () => Window;
}

interface AppBarProps {
  window?: () => Window;
}

// ==============================|| ELEVATION SCROLL ||============================== //

const ElevationScroll: React.FC<ElevationScrollProps> = ({
  children,
  window,
}) => {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 1 : 0,
    sx: {
      ...(children.props.sx || {}),
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
  });
};

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar: React.FC<AppBarProps> = ({ window }) => {
  const [drawerToggle, setDrawerToggle] = useState(false);

  const drawerToggler =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerToggle(open);
    };

  return (
    <ElevationScroll window={window}>
      <MuiAppBar>
        <Container>
          <Toolbar sx={{ py: 2.5, px: `0 !important` }}>
            <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "left" }}>
              Adi Munawar
            </Typography>
            <Stack
              direction="row"
              sx={{ display: { xs: "none", sm: "flex" } }}
              spacing={{ xs: 1.5, md: 2.5 }}
            >
              <Button color="inherit" component={Link} href="#">
                Home
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                target="_blank"
              >
                Dashboard
              </Button>
            </Stack>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton
                color="inherit"
                onClick={drawerToggler(true)}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
              >
                <Box
                  sx={{ width: "auto" }}
                  role="presentation"
                  onClick={drawerToggler(false)}
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Link
                      sx={{ textDecoration: "none" }}
                      href="#"
                      target="_blank"
                    >
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <IconHome2 />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItemButton>
                    </Link>
                    <Link
                      sx={{ textDecoration: "none" }}
                      href="/login"
                      target="_blank"
                    >
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <IconDashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    </Link>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
