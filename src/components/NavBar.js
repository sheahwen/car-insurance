import { Link, Button } from "@mui/material";

const NavBar = () => {
  return (
    <div>
      <Link href="#">Logo</Link>
      <Link href="#sectionFour">Calculator</Link>
      <Link href="#">Login</Link>
      <Button variant="text" href="#">
        Get Quote
      </Button>
    </div>
  );
};

export default NavBar;
