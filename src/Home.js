import { useState } from "react";
import NavBar from "./components/NavBar";
import { Button, Grid, Slider } from "@mui/material";
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
          <Button variant="outlined">Get Quote</Button>
        </div>
      </div>
      <div id="sectionTwo">
        <Grid container>
          <Grid item md={6} className="comparison">
            <div className="insuranceType">
              Traditional
              <br />
              Car Insurance
            </div>
            <div className="typeDescription">
              Traditional auto insurance is unfair to most consumers leaving 65%
              of drivers overpaying for auto insurance.
            </div>
          </Grid>
          <Grid item md={6} id="comparisonRight" className="comparison">
            <div className="insuranceType">
              Pay-per-km
              <br />
              Car Insurance
            </div>
            <div className="typeDescription">
              With per per km car insurance, your rate is based on your actual
              driving habits. Our customers save 47% on average compared to what
              they were paying their previous auto insurer.
            </div>
          </Grid>
        </Grid>
        <div id="sectionThree">
          <Grid container>
            <Grid item md={5}>
              <h2>How does it work?</h2>
              <p>
                Other companies calculate your premium on age, drivng
                experience, claims history. We consider real time data like the
                distance you drive.
              </p>
              <Button variant="contained">Find your savings</Button>
            </Grid>
            <Grid item md={7}>
              <Grid container className="rateBox">
                <Grid item md={3}>
                  <div className="ratePrice">$29</div>
                </Grid>
                <Grid item md={9}>
                  <div className="rateTitle">Monthly base rate</div>
                  <div className="rateDescription">
                    Paid every month no matter how many km you drive
                  </div>
                </Grid>
              </Grid>
              <div id="ratePlus">+</div>
              <Grid container className="rateBox">
                <Grid item md={3}>
                  <div className="ratePrice">$0.30/km</div>
                </Grid>
                <Grid item md={9}>
                  <div className="rateTitle">Monthly variable rate</div>
                  <div className="rateDescription">
                    Multiply monthly distance in kilometer by per km rate
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div id="sectionFour">
          <h2>Calculate your rate</h2>
          <div id="sliderPanel">
            <h4>Monthly distance travelled in kilometers</h4>
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
                  style={{ width: 60 }}
                  value={inputValue}
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
          <Grid container>
            <Grid item md={4}>
              <h4>Monthly fixed rate</h4>
              <h2>$29</h2>
            </Grid>
            <Grid item md={4}>
              <h4>Monthly variable rate</h4>
              <p>
                $0.30 x {inputValue}km = ${inputValue * 0.3}
              </p>
            </Grid>
            <Grid item md={4}>
              <h4>Total monthly premium</h4>
              <p>${29 + inputValue * 0.3}</p>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
