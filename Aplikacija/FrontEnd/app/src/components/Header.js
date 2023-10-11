import * as React from "react";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { logout } from "../actions/Auth";
import "./Header.css";

const pages = ["Početna", "Sport", "Treneri", "Takmičenja", "Studenti", "O nama"];
const settings = ["Moj profil", "Odjavi se"];

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { Component, ThemeHandler, componentType } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [picture, setPicture] = useState(localStorage.getItem("picture"));

  const reloadHeader = () => {
    setRole(localStorage.getItem("role"));
    setUsername(localStorage.getItem("username"));
    setPicture(localStorage.getItem("picture"));
    handleCloseUserMenu();
  }

  const handleMenuClick = async (option) => {
    console.log(option);
    if (option === "Odjavi se") {
      await logout();
      localStorage.setItem("role", "Guest");
      reloadHeader();
      navigate("/SignIn")
    } else if (option === "Moj profil") {
      navigate("/MyAccount");
    }
  }

  return (
    <React.Fragment>
      <AppBar position="sticky">
      <div className="header">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              SSC
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                    
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => { navigate("/" + page) }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              SSC
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => { navigate("/" + page) }}
                  sx={{ my: 1, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>


            {
              (role !== "Guest") ?
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + "/resources/" + picture} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem >
                        <Typography sx={{ fontWeight: "bold" }}>{username}</Typography>
                      </MenuItem>
                      <Divider sx={{ ml: 1, mr: 1 }} />
                      {settings
                        .filter((setting) => {
                          if (role === "Zaposleni") {
                            return setting;
                          }
                          if (role === "Trener") {
                            return setting;
                          }
                          if (role === "Administrator") {
                            return setting;
                          }
                          if (role === "Student") {
                            return setting;
                          }
                          return true;
                        })
                        .map((setting) => (
                          <MenuItem key={setting} onClick={() => { handleMenuClick(setting) }}>
                            <Typography textAlign="center">{setting}</Typography>
                          </MenuItem>
                        ))}
                    </Menu>
                  </Box>
                </> :
                <>
                  <MenuItem onClick={() => { navigate("/SignIn") }}>
                    <Typography textAlign="center">Prijavi se</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { navigate("/Register/student") }}>
                    <Typography textAlign="center">Registruj se</Typography>
                  </MenuItem >
                </>
            }
          </Toolbar>
        </Container>
        </div>
      </AppBar>
      <Component reloadHeader={reloadHeader} type={componentType} />
    </React.Fragment>
  );
};
export default Header;
