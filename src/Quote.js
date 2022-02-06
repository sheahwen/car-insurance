import { useState } from "react";
import NavBar from "./components/NavBar";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  ButtonGroup,
  Button,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Quote = () => {
  const [step, setStep] = useState(1);

  const stepIncrement = () => {
    setStep(step + 1);
  };

  const stepDecrement = () => {
    setStep(step - 1);
  };

  return (
    <>
      <NavBar />
      {step === 1 && (
        <div>
          <Typography
            variant="h2"
            id="sectionThreeTitle"
            color="primary"
            style={{ fontSize: "3rem", marginTop: 40 }}
          >
            Get a quote
          </Typography>
          <Typography variant="h6">
            Provide the following details to get an immediate quote
          </Typography>
          <FormControl margin="normal" className="form">
            <InputLabel>Vehicle Type</InputLabel>
            <div id="vehicleTypeBlank"></div>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button>Used Car</Button>
              <Button>New Car</Button>
            </ButtonGroup>
            <Autocomplete
              disablePortal
              id="input-make"
              className="inputFields"
              options={["AUDI", "TOYOTA", "VOLKSWAGEN"]}
              sx={{ width: 300 }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Make" margin="normal" />
              )}
            />
            <Autocomplete
              disablePortal
              id="input-model"
              className="inputFields"
              options={["A1", "A3", "A4"]}
              sx={{ width: 300 }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Model" margin="normal" />
              )}
            />
            <Autocomplete
              disablePortal
              id="input-engine"
              className="inputFields"
              options={[1500, 1600, 1700]}
              sx={{ width: 300 }}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Engine Capacity"
                  margin="normal"
                />
              )}
            />
          </FormControl>
          <div>
            <Button variant="contained" onClick={stepIncrement}>
              Get My Quote
            </Button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <div id="quoteRates">
            <DirectionsCarIcon />
            <Typography variant="h2">Your monthly base rate: $30</Typography>
            <Typography variant="h2">
              Your monthly variable rate: $0.03/km
            </Typography>
          </div>
          <div>
            <Button variant="contained" color="warning" onClick={stepDecrement}>
              Back
            </Button>
            <Button variant="contained" onClick={stepIncrement}>
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Quote;
