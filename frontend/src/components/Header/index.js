import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ArrowDropDown,
} from "@mui/icons-material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null),
    [drawerOpen, setDrawerOpen] = useState(false),
    navigate = useNavigate(),
    location = useLocation(),
    { showSnackbar } = useSnackbar(),
    handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    },
    handleMenuClose = () => {
      setAnchorEl(null);
    },
    handleDrawerOpen = () => {
      setDrawerOpen(true);
    },
    handleDrawerClose = () => {
      setDrawerOpen(false);
    },
    handleNavigation = (path) => {
      if (location.pathname !== path) navigate(path);
    },
    userName = localStorage.getItem("authUser"),
    handleLogout = async () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authUserLastName");
      localStorage.removeItem("authEmail");
      localStorage.removeItem("authID");
      localStorage.removeItem("authPhone");
      localStorage.removeItem("authAvatar");
      localStorage.removeItem("authBio");
      showSnackbar("Logged out successfully", "success");
      handleNavigation("/login");
      handleMenuClose();
    };
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/sign-up" && (
        <>
          {" "}
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <HomeIcon style={{ marginLeft: 10, fill: "#ffffff" }} />
              </Link>
              <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 10 }}>
                Video Dashboard
              </Typography>
              <Box display="flex" alignItems="center">
                <Avatar onClick={handleMenuClick}>
                  {userName !== null ? userName.charAt(0) : "S"}
                </Avatar>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="admin-options"
                  onClick={handleMenuClick}
                >
                  <ArrowDropDown />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
            <Box
              width={250}
              role="presentation"
              onClick={handleDrawerClose}
              onKeyDown={handleDrawerClose}
            >
              <List sx={{ paddingTop: 0 }}>
                <ListItemButton
                  selected={location.pathname === "/home"}
                  onClick={() => handleNavigation("/home")}
                  sx={{
                    "&.Mui-selected": {
                      background: "#007bff",
                      "& span": {
                        color: "#f1f1f1",
                      },
                      "&:hover": {
                        background: "#0056b3",
                        "& span": {
                          color: "#f1f1f1",
                        },
                      },
                    },
                    "&:hover": {
                      background: "#0056b3",
                      "& span": {
                        color: "#f1f1f1",
                      },
                    },
                  }}
                >
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton
                  selected={location.pathname === "/new-video"}
                  onClick={() => handleNavigation("/new-video")}
                  sx={{
                    "&.Mui-selected": {
                      background: "#007bff",
                      "& span": {
                        color: "#f1f1f1",
                      },
                      "&:hover": {
                        background: "#0056b3",
                        "& span": {
                          color: "#f1f1f1",
                        },
                      },
                    },
                    "&:hover": {
                      background: "#0056b3",
                      "& span": {
                        color: "#f1f1f1",
                      },
                    },
                  }}
                >
                  <ListItemText primary="Upload Video" />
                </ListItemButton>
                <ListItemButton
                  selected={location.pathname === "/my-videos"}
                  onClick={() => handleNavigation("/my-videos")}
                  sx={{
                    "&.Mui-selected": {
                      background: "#007bff",
                      "& span": {
                        color: "#f1f1f1",
                      },
                      "&:hover": {
                        background: "#0056b3",
                        "& span": {
                          color: "#f1f1f1",
                        },
                      },
                    },
                    "&:hover": {
                      background: "#0056b3",
                      "& span": {
                        color: "#f1f1f1",
                      },
                    },
                  }}
                >
                  <ListItemText primary="My Videos" />
                </ListItemButton>
                <ListItemButton
                  selected={location.pathname === "/listings"}
                  onClick={() => handleNavigation("/listings")}
                  sx={{
                    "&.Mui-selected": {
                      background: "#007bff",
                      "& span": {
                        color: "#f1f1f1",
                      },
                      "&:hover": {
                        background: "#0056b3",
                        "& span": {
                          color: "#f1f1f1",
                        },
                      },
                    },
                    "&:hover": {
                      background: "#0056b3",
                      "& span": {
                        color: "#f1f1f1",
                      },
                    },
                  }}
                >
                  <ListItemText primary="Listings" />
                </ListItemButton>
              </List>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
};

export default Header;
