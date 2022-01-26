import React from "react";
import {
  GridLogin,
  RowLogin,
  Col1Login,
  Col2Login,
} from "../../components/Forms/GridLogin.styled";
import { StyledButton } from "../../components/Forms/Button.styled";
import {
  StyledLinkDiv,
  StyledLink,
} from "../../components/Forms/StyledLink.styled";
import { Label } from "../../components/Forms/Label.styled";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Input } from "../../components/Forms/Input.styled";
//const LogIn = ({ auth, setAuth, user, setUser, coolDan, setCoolDan }) => {

//   const [errorMessage, setErrorMessage] = useState("");
//   let navigate = useNavigate();

//   let name, value;
//   const handleInputs = (e) => {
//     name = e.target.name;
//     value = e.target.value;
//     setUser({ ...user, [name]: value });
//   };
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const { login, password } = user;
//     const res = await fetch("/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         login,
//         password,
//       }),
//     });

//     const testDan = await fetch(`/users/login/${login}`)
//       .then((r) => r.json())
//       .then((r) => setCoolDan(r._id));

//     if (res.ok) {
//       console.log("Successfully logged in");
//       setAuth("Authenticated");
//       navigate("../");
//     } else {
//       setErrorMessage("User name or Password is wrong!");
//       console.log("login or password is wrong");
//       setAuth("Login needed");
//     }
//   };
const LogIn = () => {
  return (
    <div>
      <GridLogin>
        <RowLogin>
          <Col1Login />
          <Col2Login>
            <h1>Log in</h1>
            <form>
              <Label>User name</Label>
              <br />
              <Input
                type="text"
                name="login"
                placeholder="Enter your user name"
                // onChange={handleInputs}
              ></Input>
              <br />
              <Label>Password</Label>
              <br />
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                // onChange={handleInputs}
                title="User name or password is incorrect!"
              ></Input>
              <br />
              {/* <p style={{ color: "#9B0000" }}> {errorMessage}</p> */}
              <StyledButton>Log In</StyledButton>
            </form>
            {/* <StyledLinkDiv>
              Don't have an account?{" "}
              <StyledLink to="../Signup">Sign Up</StyledLink>
            </StyledLinkDiv> */}
          </Col2Login>
        </RowLogin>
      </GridLogin>
    </div>
  );
};
export default LogIn;
