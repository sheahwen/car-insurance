import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";

const NavBar = () => {
  // states for menu
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // states for logging out
  const handleLogOut = () => {
    setAuth(false);
    setAnchorEl(null); // to close menu
  };

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="fixed" color="secondary" style={{ zIndex: 1400 }}>
        <Toolbar>
          <Link variant="h6" sx={{ flexGrow: 1, color: "black" }} href="/">
            LOGO
          </Link>
          <Link
            variant="h6"
            sx={{ flexGrow: 1, color: "black" }}
            href="#sectionFour"
          >
            Calculator
          </Link>
          <Link
            variant="h6"
            sx={{ flexGrow: 1, color: "black" }}
            href="/get-quote"
          >
            Get Quote
          </Link>
          {!auth && (
            <Link variant="h6" sx={{ flexGrow: 1, color: "black" }} href="/">
              Log In
            </Link>
          )}
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                style={{ zIndex: 1500 }}
              >
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/dashboard">Dashboard</Link>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* <Link href="#">Logo</Link>
      <Link href="#sectionFour">Calculator</Link>
      <Link href="#">Login</Link>
      <Button variant="text" href="/get-quote">
        Get Quote
      </Button> */}
    </div>
  );
};

export default NavBar;
