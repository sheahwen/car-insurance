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
} from "@mui/material";

const Quote = () => {
  return (
    <>
      <div>
        <NavBar />
        <h2>Get a quote</h2>
        <p>Provide details to get an immediate quote</p>
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
              <TextField {...params} label="Engine Capacity" margin="normal" />
            )}
          />
        </FormControl>
      </div>
      <div>
        <Button variant="contained">Get My Quote</Button>
      </div>
    </>
  );
};

export default Quote;
