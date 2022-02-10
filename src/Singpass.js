import { useEffect, useState } from "react";

const Login = () => {
  // set states
  const [data, setData] = useState(null);

  const handleLogin = () => {
    console.log("logging in");
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
    console.log(authoriseUrl);

    window.location = authoriseUrl;
  };
  const str1 =
    "https://test.api.myinfo.gov.sg/serviceauth/myinfo-com/v1/authorise?client_id=STG2-MYINFO-SELF-TEST&purpose=demonstrating%20MyInfo%20APIs&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fcallback&response_type=code&scope=uinfin%20name%20sex%20race%20nationality%20dob%20email%20mobileno%20regadd%20housingtype%20hdbtype%20marital%20edulevel%20noa-basic%20ownerprivate%20cpfcontributions%20cpfbalances&state=123";
  const str2 =
    "https://test.api.myinfo.gov.sg/serviceauth/myinfo-com/v1/authorise?client_id=STG2-MYINFO-SELF-TEST&purpose=demonstrating%20MyInfo%20APIs&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fcallback&response_type=code&scope=uinfin%20name%20sex%20race%20nationality%20dob%20email%20mobileno%20regadd%20housingtype%20hdbtype%20marital%20edulevel%20noa-basic%20ownerprivate%20cpfcontributions%20cpfbalances&state=123";

  // useEffect(async () => {
  //   try {
  //     const url = "http://localhost:5000/getEnv";
  //     let data = await fetch(url);
  //     data = await data.json();
  //     setData(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <>
      <button onClick={handleLogin}>Retrieve Singpass Info</button>
      <div>{str1 == str2 ? "same" : "different"}</div>
    </>
  );
};

export default Login;
