import { Paper } from "@mui/material";
import Chart from "./components/dashboard/Chart";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "60vh",
        }}
      >
        <Chart />
      </Paper>
      <Paper>
        <h2>Outstanding balance</h2>
        <h4>As at 10 Feb 2022</h4>
        <p>$0.00</p>
      </Paper>
      <Paper>
        <h2>Distance travelled between 1 Feb 2022 - 10 Feb 2022:</h2>
        <p>381km</p>
        <h4>Extrapolated premium for Feb 2022 = $781</h4>
      </Paper>
    </div>
  );
};

export default Dashboard;
