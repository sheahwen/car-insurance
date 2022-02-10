import { useState, useEffect } from "react";
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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useHistory } from "react-router-dom";

const Quote = () => {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState({
    type: null,
    make: "",
    model: "",
    capacity: "",
  });
  const [make, setMake] = useState([]);
  const [model, setModel] = useState([]);
  const [alignment, setAlignment] = useState("used");

  useEffect(async () => {
    const response = await fetch("https://car-data.p.rapidapi.com/cars/makes", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "car-data.p.rapidapi.com",
        "x-rapidapi-key": "9f1ab7700dmshf27ae1be80b6095p1fa53djsn5e437c61bdea",
      },
    });
    const parsedResponse = await response.json();
    const allMakes = parsedResponse.map((make) => make.toUpperCase());
    allMakes.sort();
    setMake(allMakes);
  }, []);

  // useEffect(async () => {
  //   if (input.make !== "" && input.model === "") {
  //     const response = await fetch(
  //       `https://car-data.p.rapidapi.com/cars?make=${input.make}&limit=10&page=0`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "x-rapidapi-host": "car-data.p.rapidapi.com",
  //           "x-rapidapi-key":
  //             "9f1ab7700dmshf27ae1be80b6095p1fa53djsn5e437c61bdea",
  //         },
  //       }
  //     );
  //     const parsedResponse = await response.json();
  //     const models = parsedResponse.map((item) => item.model);
  //     const modelOptions = models.filter(
  //       (item, index) => models.indexOf(item) === index
  //     );
  //     const modelsOptionsArr = modelOptions.map((model) => model.toUpperCase());
  //     setModel(modelsOptionsArr.sort());
  //   }
  // }, [input]);

  const stepIncrement = () => {
    // if (input.type && input.make && input.model && input.capacity) {
    //   setStep(step + 1);
    // }
    setStep(step + 1);
    if (step === 2) {
      handleSingpass();
    }
  };

  const stepDecrement = () => {
    setStep(step - 1);
    setInput({
      type: null,
      make: "",
      model: "",
      capacity: "",
    });
  };

  const handleType = (prop) => (e) => {
    setInput((prevState) => ({
      ...prevState,
      type: prop,
    }));
    setAlignment(prop);
  };

  const handleInput = (prop) => (e) => {
    if (prop === "make") {
      setInput((prevState) => ({
        ...prevState,
        [prop]: e.target.innerText,
        model: "",
        capacity: "",
      }));
    } else if (prop === "model") {
      if (input.make === "") {
        setInput((prevState) => ({
          ...prevState,
          [prop]: e.target.innerText,
          capacity: "",
        }));
      }
    } else if (prop === "capacity") {
      setInput((prevState) => ({
        ...prevState,
        [prop]: e.target.innerText,
      }));
    }
  };

  const history = useHistory();

  const handleSingpass = async () => {
    let data = null;
    try {
      const url = "http://localhost:5000/getEnv";
      data = await fetch(url);
      data = await data.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    const state = "123";
    var authoriseUrl =
      data.authApiUrl +
      "?client_id=" +
      data.clientId +
      "&attributes=" +
      data.attributes +
      "&purpose=" +
      "demonstrating MyInfo APIs" +
      "&state=" +
      encodeURIComponent(state) +
      "&redirect_uri=" +
      data.redirectUrl;
    window.location.assign(authoriseUrl);
  };

  return (
    <>
      <NavBar />
      {step === 1 && (
        <div style={{ marginLeft: 30, marginTop: 80 }}>
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
            <ToggleButtonGroup
              variant="contained"
              aria-label="outlined button group"
              value={alignment}
              color="info"
            >
              <ToggleButton value="used" onClick={handleType("used")}>
                Used Car
              </ToggleButton>
              <ToggleButton value="new" onClick={handleType("new")}>
                New Car
              </ToggleButton>
            </ToggleButtonGroup>
            <Autocomplete
              disablePortal
              id="input-make"
              className="inputFields"
              options={make}
              sx={{ width: 300 }}
              size="small"
              onChange={handleInput("make")}
              value={input.make}
              renderInput={(params) => (
                <TextField {...params} label="Make" margin="normal" />
              )}
            />
            <Autocomplete
              disablePortal
              id="input-model"
              className="inputFields"
              options={model}
              sx={{ width: 300 }}
              size="small"
              onChange={handleInput("model")}
              value={input.model}
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
              onChange={handleInput("capacity")}
              value={input.capacity}
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
      {(step === 2 || step === 3) && (
        <div>
          <div id="quoteRates">
            <DirectionsCarIcon sx={{ fontSize: 100 }} />
            <Typography
              variant="h5"
              color="primary"
              className="quoteTitle"
              sx={{ fontSize: 40, fontWeight: 700 }}
            >
              Your monthly base rate:
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 30 }}>
              $30
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              className="quoteTitle"
              sx={{ fontSize: 40, fontWeight: 700 }}
            >
              Your monthly variable rate:
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 30 }}>
              $0.03/km
            </Typography>
          </div>
          <div id="backSignUp">
            <Button variant="contained" color="warning" onClick={stepDecrement}>
              Back
            </Button>
            {step === 2 && (
              <Button variant="contained" onClick={stepIncrement}>
                Sign Up
              </Button>
            )}
            {step === 3 && (
              <Button variant="contained" onClick={stepIncrement} color="info">
                Retrive Info from Singpass
              </Button>
            )}
          </div>
        </div>
      )}
      {step === 3 && (
        <div
          style={{ marginTop: 40, alignItems: "center", textAlign: "center" }}
        >
          <Typography>Retrieving info from Singpass... </Typography>
        </div>
      )}
    </>
  );
};

export default Quote;
