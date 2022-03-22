import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  AppBar,
  Box,
  Menu,
  SvgIcon,
  ImageListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logo from "./logo_wb.png";

const pages = ["Define", "My Words", "My Books"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
    switch (event.target.id) {
      case "logo":
        navigate("/");
        break;
      case "Define":
        navigate("/");
        break;
      case "My Words":
        navigate("/mywords");
        break;
      case "My Books":
        navigate("/mybooks");
        break;
      default:
        throw new Error("ERROR in Switch Case");
        break;
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ marginBottom: "2em" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ImageListItem
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                margin: "0em 2em",
              }}
              onClick={handleCloseNavMenu}
            >
              <img
                src={logo}
                style={{ height: "90px", margin: "0em 1em" }}
                id="logo"
              />
            </ImageListItem>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
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
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" id={page}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Word Buddy
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    margin: "0em 3em",
                  }}
                  id={page}
                  style={{ fontSize: "20px" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
