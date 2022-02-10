import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {
  // states for menu
  const [anchorEl, setAnchorEl] = useState(null);
  const { userToken, setUserToken } = useContext(UserContext);

  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // states for logging out
  const handleLogOut = () => {
    setUserToken(null);
    setAnchorEl(null); // to close menu
  };

  const handleNav = (props) => (e) => {
    const path = `/${props}`;
    history.push(path);
  };

  return (
    <div>
      <AppBar position="fixed" color="secondary" style={{ zIndex: 1400 }}>
        <Toolbar>
          <Link
            variant="h6"
            sx={{ flexGrow: 1, color: "black", cursor: "pointer" }}
            onClick={handleNav("")}
          >
            LOGO
          </Link>
          <Link
            variant="h6"
            sx={{ flexGrow: 1, color: "black", cursor: "pointer" }}
            onClick={handleNav("#sectionFour")}
          >
            Calculator
          </Link>
          <Link
            variant="h6"
            sx={{ flexGrow: 1, color: "black", cursor: "pointer" }}
            onClick={handleNav("get-quote")}
          >
            Get Quote
          </Link>
          {!userToken && (
            <Link
              variant="h6"
              sx={{ flexGrow: 1, color: "black" }}
              href="/login"
            >
              Log In
            </Link>
          )}
          {userToken && (
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
                  <Link onClick={handleNav("dashboard")}>Dashboard</Link>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
