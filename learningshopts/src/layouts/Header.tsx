import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/AuthSlice";

function FloatingIcons() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    navigate("/profile");
    // console.log("profile")
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 8,
        right: 16,
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton size="large" color="inherit">
        <ShoppingCartIcon sx={{ color: "black" }} />
      </IconButton>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle sx={{ color: "black" }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default FloatingIcons;
