import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";

const Callback = () => {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState(null);

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();

  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const data = { code };
    try {
      let response = await fetch("http://localhost:5000/getPersonData", {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      response = await response.json();
      const obj = response.text;
      const name = obj.name.value.split(" ");
      const firstname = name.shift();
      const lastname = name.join(" ");
      const dataObj = {
        ic: obj.uinfin.value,
        firstname: firstname,
        lastname: lastname,
        dob: obj.dob.value,
        email: obj.email.value,
        phone: `${obj.mobileno.prefix.value}${obj.mobileno.areacode.value}-${obj.mobileno.nbr.value}`,
        licenseexp: obj.drivinglicence.qdl.expirydate.value,
        vehicleno: obj.vehicles[0].vehicleno.value,
        make: obj.vehicles[0].make.value,
        model: obj.vehicles[0].model.value,
        registrationyear: Number(
          obj.vehicles[0].originalregistrationdate.value.substring(0, 4)
        ),
        coeexp: obj.vehicles[0].coeexpirydate.value,
      };
      setData(dataObj);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    const inputObj = {};
    for (const key of Object.keys(data)) {
      inputObj[key] = input.get(key);
    }
    inputObj["type"] = type;
    inputObj["capacity"] = input.get("capacity");
    inputObj["licenseno"] = input.get("ic");

    setUserDetails(inputObj);
    setStep(step + 1);
  };

  // ---------------------------------------------
  const [type, setType] = useState("new");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const createUser = async (obj) => {
    let response = await fetch("http://localhost:8000/user/create-user/", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    response = await response.json();
    console.log(response);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    const obj = userDetails;
    obj.username = input.get("username");
    obj.email = input.get("email");
    obj.password = input.get("password");
    // setUserDetails((prevState) => ({ ...prevState, ...obj }));

    // to post
    createUser(obj);
  };

  return (
    <>
      <NavBar />
      {data && step === 1 && (
        <Container component="main" maxWidth="lg" sx={{ mt: 15 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <FormatAlignCenterIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Details
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Typography>Basic details</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    value={data.firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    value={data.lastname}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    required
                    fullWidth
                    id="ic"
                    label="NRIC Number"
                    name="ic"
                    autoComplete="ic"
                    value={data.ic}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    id="dob"
                    value={data.dob}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    id="phone"
                    value={data.phone}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Typography>Driving license details</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="licenseno"
                    required
                    fullWidth
                    id="licensno"
                    label="Driving License Number"
                    autoFocus
                    value={data.ic}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="licenseexp"
                    // required
                    fullWidth
                    id="licenseexp"
                    type="date"
                    label="Driving License Expiry Date"
                    autoFocus
                    value={data.licenseexp}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Typography>Vehicle details</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    name="vehicleno"
                    required
                    fullWidth
                    id="vehicleno"
                    label="Vehicle Number"
                    autoFocus
                    value={data.vehicleno}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Select
                    labelId="vehicletype"
                    id="vehicletype"
                    value={type}
                    label="Vehicle Type"
                    onChange={handleChange}
                  >
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="used">Used</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    name="coeexp"
                    required
                    fullWidth
                    id="coeexp"
                    label="Coe Expiry Date"
                    type="date"
                    autoFocus
                    value={data.coeexp}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    name="registrationyear"
                    required
                    fullWidth
                    id="registrationyear"
                    label="Year of Registration"
                    type="number"
                    autoFocus
                    value={data.registrationyear}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="make"
                    required
                    fullWidth
                    id="make"
                    label="Make"
                    autoFocus
                    value={data.make}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="model"
                    required
                    fullWidth
                    id="model"
                    label="Model"
                    autoFocus
                    value={data.model}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="capacity"
                    required
                    fullWidth
                    id="capacity"
                    label="Capacity"
                    type="number"
                    autoFocus
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                  control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Details
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      )}
      {step === 2 && (
        <>
          {" "}
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSignUp}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="username"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="username"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </>
      )}
    </>
  );
};

export default Callback;
