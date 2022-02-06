import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";

// Generate Sales Data

export default function Chart(props) {
  const theme = useTheme();

  // change chart display
  const chartButton = props.chartButton;
  const chartData = props.chartData;

  const current = new Date();

  const data = [];

  if (chartButton === "month") {
    const createData = (month, total) => {
      return { xaxis: month, yaxis: total };
    };

    for (const point of chartData) {
      const monthStr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthYear = `${monthStr[Number(point.month) - 1]}-${point.year}`;
      data.push(createData(monthYear, point.total));
    }
  } else if (chartButton === "day") {
    const createData = (date, total) => {
      return { xaxis: date, yaxis: total };
    };

    for (const point of chartData) {
      data.push(createData(point.date, point.total));
    }
  }

  return (
    <div>
      {/* <ResponsiveContainer width={500} height={300}> */}
      <LineChart width={1000} height={300} data={data} className="chart">
        <XAxis
          dataKey="xaxis"
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        />
        <YAxis
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        >
          <Label
            angle={270}
            offset={-3}
            position="left"
            style={{
              textAnchor: "middle",
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          >
            Distance Travelled (km)
          </Label>
        </YAxis>
        <Line
          type="monotone"
          dataKey="yaxis"
          stroke="#8884d8"
          stroke={theme.palette.primary.main}
          dot={false}
        />
      </LineChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
}
