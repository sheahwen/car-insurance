import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Drawer, Toolbar, Divider, List } from "@mui/material";

const LeftList = (props) => {
  const vehicleList = props.vehicleList;
  const renderVehicleList = vehicleList.map((car) => {
    return (
      <ListItem button>
        <ListItemIcon>
          <DirectionsCarIcon />
        </ListItemIcon>
        <ListItemText primary={car} />
      </ListItem>
    );
  });

  const handleSwitchPage = (prop) => () => {
    props.navigateList(prop);
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
          width: 180,
        }}
      ></Toolbar>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            onClick={handleSwitchPage("dashboard")}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary="Profile"
            onClick={handleSwitchPage("profile")}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText
            primary="Reports"
            onClick={handleSwitchPage("reports")}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <div>
          <ListSubheader inset>Vehicles</ListSubheader>
          {renderVehicleList}
        </div>
      </List>
    </Drawer>
  );
};

export default LeftList;
