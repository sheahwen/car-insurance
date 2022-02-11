import { useState, useEffect } from "react";
import {
  Paper,
  Button,
  ButtonGroup,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import Chart from "./components/dashboard/Chart";
import NavBar from "./components/NavBar";
import LeftList from "./components/dashboard/LeftList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import UserContext from "./UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import DirectionsCarFilledTwoToneIcon from "@mui/icons-material/DirectionsCarFilledTwoTone";
import NoteTwoToneIcon from "@mui/icons-material/NoteTwoTone";

const Dashboard = () => {
  const { userToken, setUserToken } = useContext(UserContext);

  const history = useHistory();
  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };

  if (!userToken) {
    routeChange();
  }
  // const userToken =
  // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ0NDYwMjg1LCJpYXQiOjE2NDQ0NTk5ODUsImp0aSI6IjU5MjJmNjc5NDEwMTRmZGFiNjllMzAzMDI4NWMzNGRkIiwidXNlcl9pZCI6MX0.XlLUtp8FAs8sBpo0ef5VsIlXSXjwB8YcWQ_vxPuJVR4";
  const [data, setData] = useState(null);
  const [chartButton, setChartButton] = useState("month");
  const [chartData, setChartData] = useState({
    day: null,
    month: null,
  });
  const [payable, setPayable] = useState(0);
  const [displayPage, setDisplayPage] = useState("dashboard");
  const [profileRow, setProfileRow] = useState([]);
  const [reportRow, setReportRow] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [contract, setContract] = useState(false);

  useEffect(async () => {
    if (!userToken) {
      routeChange();
    }
    const url = "http://127.0.0.1:8000/user/user-detail/2/";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const parsedResponse = await response.json();
      setData(parsedResponse);
      setChartData((prevState) => ({
        ...prevState,
        month: parsedResponse.month,
      }));
    } catch (error) {
      console.error(error.message);
    }

    // generate outstanding balance
    for (const item of data.payables) {
      if (item) {
        setPayable((payable += item.amount));
      }
    }
  }, []);

  // to change chart display
  const handleDay = () => {
    setChartButton("day");
  };

  const handleMonth = () => {
    setChartButton("month");
  };

  useEffect(async () => {
    if (chartButton === "day") {
      if (chartData.day === null) {
        const userId = data.user.id;
        const url = "http://127.0.0.1:8000/user/chart/day/" + userId + "/";
        const response = await fetch(url);
        const parsedResponse = await response.json();
        setChartData((prevState) => ({
          ...prevState,
          day: parsedResponse,
        }));
      }
    }
  }, [chartButton]);

  // generate today's date
  const today = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const todayStr = new Intl.DateTimeFormat("en-US", options).format(today);

  // navigation on left list
  const switchDisplayPage = (page) => {
    setDisplayPage(page);
  };

  // profile table
  function createData(field, information) {
    return { field, information };
  }

  useEffect(() => {
    if (data) {
      setProfileRow([
        createData("Username", data.user.username),
        createData("Email", data.user.email),
        createData("Phone Number", data.license.phone),
        createData("First Name", data.license["first_name"]),
        createData("Last Name", data.license["last_name"]),
        createData("IC Number", data.license["ic_no"]),
        createData("Date of Birth", data.license["dob"]),
        createData("Driving License Number", data.license["license_no"]),
      ]);

      for (const entry of data.mileage) {
        setReportRow((prevState) => [
          ...prevState,
          {
            id: entry.id,
            date: entry.date,
            contract: entry.contract,
            distance: entry.km,
          },
        ]);
      }
    }
  }, [data]);

  // reports table
  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "contract", headerName: "Contract Number", width: 150 },
    {
      field: "distance",
      headerName: "Distance Travelled (km)",
      type: "number",
      width: 200,
    },
  ];
  const numofDays = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const currentDay = today.getDate();

  const handleVehicle = (data) => {
    setVehicleInfo(data);
    setDisplayPage("vehicle");
    setContract(false);
  };

  const handleContract = () => {
    setContract(!contract);
  };

  return (
    <div className="dashboardPage">
      <NavBar />
      <LeftList
        vehicleList={data ? data.vehicle.map((car) => car["vehicle_no"]) : []}
        navigateList={switchDisplayPage}
        passData={handleVehicle}
      />
      {displayPage === "dashboard" && (
        <div className="dashboard">
          <ButtonGroup variant="contained" aria-label="outlined button group">
            <Button onClick={handleDay}>Day</Button>
            <Button onClick={handleMonth}>Month</Button>
          </ButtonGroup>
          {data !== null && (
            // <Paper
            //   sx={{
            //     p: 2,
            //     display: "flex",
            //     flexDirection: "column",
            //     height: "60vh",
            //   }}
            // >
            <Chart
              chartButton={chartButton}
              chartData={
                chartButton === "day" && chartData.day
                  ? chartData.day
                  : data.month
              }
            />
            // </Paper>
          )}
          <Grid container spacing={2} style={{ marginTop: 20, marginLeft: 2 }}>
            <Grid
              item
              xs={3.5}
              style={{
                backgroundColor: "white",
                borderRight: "1px lightgray solid",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                className="paperSectionTitle"
                color="primary"
                sx={{ fontSize: 30, paddingTop: 2 }}
              >
                Outstanding balance
              </Typography>
              <Typography
                variant="h6"
                className="paperSectionSubtitle"
                sx={{ fontSize: 15, color: "gray" }}
              >
                As at {todayStr}
              </Typography>
              <Typography variant="h3" sx={{ fontSize: 40, paddingTop: 4 }}>
                ${payable}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4.5}
              style={{
                backgroundColor: "white",
                borderRight: "1px lightgray solid",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                className="paperSectionTitle"
                color="primary"
                sx={{ fontSize: 30, paddingTop: 2 }}
              >
                Distance travelled this month
              </Typography>
              <Typography
                variant="h6"
                className="paperSectionSubtitle"
                sx={{ fontSize: 15, color: "gray" }}
              >
                1 Feb 2022 - 10 Feb 2022
              </Typography>
              <Typography variant="h3" sx={{ fontSize: 40, paddingTop: 4 }}>
                {data ? data.month[data.month.length - 1].total : 0} km
              </Typography>
            </Grid>
            <Grid
              item
              xs={3.5}
              style={{
                backgroundColor: "white",
                borderRight: "1px lightgray solid",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                className="paperSectionTitle"
                color="primary"
                sx={{ fontSize: 30, paddingTop: 2 }}
              >
                Estimated premium
              </Typography>
              <Typography
                variant="h6"
                className="paperSectionSubtitle"
                sx={{ fontSize: 15, color: "gray" }}
              >
                Extrapolated based on month-to-date distance
              </Typography>
              <Typography variant="h3" sx={{ fontSize: 40, paddingTop: 4 }}>
                $
                {data
                  ? (
                      30 +
                      (data.month[data.month.length - 1].total *
                        0.03 *
                        numofDays) /
                        currentDay
                    ).toFixed(2)
                  : 0}
              </Typography>
            </Grid>
          </Grid>
        </div>
      )}
      {displayPage === "profile" && (
        <div className="profile">
          <Typography variant="h4">My Profile</Typography>
          <Typography
            variant="h6"
            style={{
              color: "gray",
              fontWeight: 200,
              fontSize: 15,
              marginBottom: 20,
            }}
          >
            Manage and protect your account
          </Typography>
          <Divider />
          <TableContainer component={Paper} sx={{ width: "83vw" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell align="left">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profileRow.map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.field}
                    </TableCell>
                    <TableCell align="left">{row.information}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {displayPage === "reports" && (
        <div className="reports">
          <div style={{ height: "80vh", width: 600 }}>
            <DataGrid
              rows={reportRow}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[15]}
              components={{ Toolbar: GridToolbar }}
              style={{ backgroundColor: "white" }}
            />
          </div>
        </div>
      )}
      {displayPage === "vehicle" && (
        <div className="vehicle" style={{ backgroundColor: "white" }}>
          <Grid container>
            <Grid item md={4}>
              <div className="vehiclePart">
                <DirectionsCarFilledTwoToneIcon
                  sx={{ fontSize: 100 }}
                  color="success"
                />
                <div>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontSize: 18, fontWeight: 700 }}
                  >
                    Car Number
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontSize: 22, lineHeight: 0.5, marginBottom: 1.5 }}
                  >
                    {vehicleInfo.vehicle["vehicle_no"]}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontSize: 18, fontWeight: 700 }}
                  >
                    Make and model
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontSize: 22, lineHeight: 0.5, marginBottom: 1.5 }}
                  >
                    {vehicleInfo.vehicle.make}- {vehicleInfo.vehicle.model}
                  </Typography>{" "}
                </div>
              </div>
              <div className="vehiclePart">
                <NoteTwoToneIcon sx={{ fontSize: 100 }} color="success" />{" "}
                <div>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontSize: 18, fontWeight: 700 }}
                  >
                    Contract number
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: 22,
                      lineHeight: 0.5,
                      marginBottom: 1.5,
                      cursor: "pointer",
                    }}
                    onClick={handleContract}
                  >
                    {vehicleInfo.contract["contract_no"]}
                  </Typography>{" "}
                  <Typography variant="h4"></Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontSize: 18, fontWeight: 700 }}
                  >
                    Application Status:
                  </Typography>
                  {vehicleInfo.contract["application_status"] ? (
                    <>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: 22,
                          lineHeight: 0.5,
                          marginBottom: 1.5,
                        }}
                        color="green"
                      >
                        {" "}
                        Success
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: 22,
                          lineHeight: 0.5,
                          marginBottom: 1.5,
                        }}
                        color="secondary"
                      >
                        {" "}
                        Pending
                      </Typography>
                    </>
                  )}{" "}
                </div>
              </div>
            </Grid>
            <Grid item md={8}>
              {contract && (
                <Paper
                  elevation={3}
                  sx={{ width: "85%", marginLeft: 5, height: "80vh" }}
                >
                  <Typography variant="h1">This is a contract</Typography>
                </Paper>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
