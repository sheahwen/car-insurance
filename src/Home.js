import { useState } from "react";
import NavBar from "./components/NavBar";
import {
  Button,
  Grid,
  Slider,
  Typography,
  InputAdornment,
} from "@mui/material";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";

// ----------------- SLIDER -----------------
const Input = styled(MuiInput)`
  width: 42px;
`;

const Home = () => {
  // --------------- SLIDER ----------------
  const [value, setValue] = useState(30);
  const [inputValue, setInputValue] = useState(1500);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setInputValue(newValue * 50);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value / 50));
    setInputValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
      setInputValue(0);
    } else if (value > 5000) {
      setValue(100);
      setInputValue(5000);
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <div id="sectionOne">
        <div>
          <h2>Save up to S$457/year with pay-per-km car insurance</h2>
          <Button variant="contained" color="primary">
            Get Quote
          </Button>
        </div>
      </div>
      <div id="sectionTwo">
        <Grid container>
          <Grid item md={6} className="comparison">
            <div className="comparisonWidth">
              <Typography
                variant="h1"
                className="insuranceType"
                style={{ fontSize: "5rem", fontWeight: 700 }}
              >
                Traditional
                <br />
                Car Insurance
              </Typography>
              <Typography
                className="typeDescription"
                style={{ fontSize: "1.7rem" }}
              >
                Traditional auto insurance is unfair to most consumers leaving{" "}
                <span className="highlightDescription">
                  65% of drivers overpaying
                </span>{" "}
                for auto insurance.
              </Typography>
            </div>
          </Grid>
          <Grid item md={6} id="comparisonRight" className="comparison">
            <div className="comparisonWidth">
              <Typography
                variant="h1"
                className="insuranceType"
                style={{ fontSize: "5rem", fontWeight: 700 }}
              >
                Pay-per-km
                <br />
                Car Insurance
              </Typography>
              <Typography
                className="typeDescription"
                style={{ fontSize: "1.7rem" }}
              >
                With per per km car insurance, your rate is based on your actual
                driving habits. Our customers{" "}
                <span className="highlightDescription">save 47% </span>on
                average compared to what they were paying their previous auto
                insurer.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      <div id="sectionThree">
        <Typography
          variant="h2"
          id="sectionThreeTitle"
          color="primary"
          style={{ paddingLeft: "5vw", fontSize: "3rem" }}
        >
          How does it work?
        </Typography>
        <Grid container>
          <Grid item md={4} id="sectionThreeLeft">
            <Typography
              variant="h4"
              style={{
                marginTop: 25,
                marginBottom: "4vh",
                paddingLeft: "5vw",
                fontSize: "1.8rem",
              }}
            >
              Other companies calculate your premium on age, drivng experience,
              claims history. We consider{" "}
              <span style={{ color: "#DE9931" }}>real time data</span> like the
              distance you drive.
            </Typography>
            <Button
              variant="contained"
              style={{ marginLeft: "5vw", fontSize: "1.2rem" }}
            >
              Calculate your savings
            </Button>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item md={7} id="sectionThreeRight">
            <Grid container className="rateBox" style={{ width: "60%" }}>
              <Grid item md={3}>
                <Typography variant="h3" className="ratePrice">
                  $30
                </Typography>
              </Grid>
              <Grid item md={9}>
                <Typography
                  variant="h6"
                  className="rateTitle"
                  style={{ fontWeight: 800, fontSize: "1.5rem" }}
                >
                  Monthly base rate
                </Typography>
                <Typography
                  variant="h5"
                  className="rateDescription"
                  style={{ fontSize: "1.2em" }}
                >
                  Paid every month no matter how many km you drive
                </Typography>
              </Grid>
            </Grid>
            <div id="ratePlus">+</div>
            <Grid container className="rateBox" style={{ width: "60%" }}>
              <Grid item md={3}>
                <Typography variant="h3" className="ratePrice">
                  $0.03/km
                </Typography>
              </Grid>
              <Grid item md={9}>
                <Typography
                  variant="h6"
                  className="rateTitle"
                  style={{ fontWeight: 800, fontSize: "1.5rem" }}
                >
                  Monthly variable rate
                </Typography>
                <Typography
                  variant="h5"
                  className="rateDescription"
                  style={{ fontSize: "1.2em" }}
                >
                  Multiply monthly distance in kilometer by per km rate
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div id="sectionFour" style={{ paddingLeft: "5vw" }}>
        <Typography
          variant="h2"
          id="sectionThreeTitle"
          style={{ fontSize: "3rem" }}
        >
          Calculate your rate
        </Typography>
        <div id="sliderPanel">
          <Typography variant="h6" style={{ marginTop: 40 }}>
            Monthly distance travelled in kilometers
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Input
                style={{ width: 95 }}
                value={inputValue}
                endAdornment={
                  <InputAdornment position="end">km</InputAdornment>
                }
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 100,
                  min: 0,
                  max: 5000,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
        </div>
        <Grid container id="premiumBreakdown">
          <Grid item md={4} className="premiumBox">
            <Typography variant="h4">Total monthly premium</Typography>
            <Typography variant="h1">${29 + inputValue * 0.3}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h4">Monthly fixed rate</Typography>
            <Typography variant="h1">$30</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h4">Monthly variable rate</Typography>
            <Typography variant="h1">
              $0.03 x {inputValue}km = ${inputValue * 0.3}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
