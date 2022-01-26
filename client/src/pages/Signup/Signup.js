import React, { useRef, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import {
  GridSignup,
  RowSignup,
  Col1Signup,
  Col2Signup,
  Col1BoxSignup,
  TextContent,
  TextHeading,
  CircleIcon,
} from "../../components/Forms/GridSignup.styled";
import { StyledButton } from "../../components/Forms/Button.styled";
import {
  StyledLinkDiv,
  StyledLink,
} from "../../components/Forms/StyledLink.styled";
import { Label } from "../../components/Forms/Label.styled";
import { Div } from "../../components/Forms/Div.styled";
import { Input } from "../../components/Forms/Input.styled";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [newUser, setNewUser] = useState({
    login: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const handleInputs = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  //   //navigation to go to login page after sign up
  //   let navigate = useNavigate();

  //password validation
  let passwordMatch = useRef(false);
  useEffect(() => {
    if (
      newUser.password === newUser.cPassword &&
      newUser.password !== "" &&
      newUser.cPassword !== ""
    ) {
      passwordMatch.current = true;
    } else {
      passwordMatch.current = false;
    }
  }, [newUser.password, newUser.cPassword]);

  //console.log(Signup);
  const postData = async (e) => {
    e.preventDefault();
    const { login, email, password } = newUser;
    if (passwordMatch.current !== false) {
      const SIGNUP = gql`
      mutation {
        createUser(username: $username, email: $email, password: $password) {
          User {
            id
          }        
        },
      variables: {
        "username": "${newUser.login}", "email": "${newUser.email}", "password": "${newUser.password}
      }
      }`;

      const Signup = () => {
        console.log("test");
        const { loading, error, data } = useQuery(SIGNUP);
        // if (loading) return "loading...";
        if (error) return error.message;
        return JSON.stringify(data);
      };

      // if (res.ok) {
      //   console.log("Successful Registration");
      //   //moving to login page once signup is successful using navigate
      //   navigate("../Login");
      // } else {
      //   setErrorMessage("User name / Email already in use!");
      //   console.log("Invalid Registration");
      // }
      console.log("register");
    } else {
      setErrorMessage("Passwords do not match!");
      console.log("Invalid Registration due to password mismatch");
    }
  };

  return (
    <div>
      <GridSignup>
        <RowSignup>
          <Col1Signup />
          <Col2Signup>
            <h1>Create your account</h1>
            <form onSubmit={postData}>
              <Label>User Name</Label>
              <br />
              <Input
                type="text"
                name="login"
                placeholder="Enter your full name"
                value={newUser.login}
                onChange={handleInputs}
              ></Input>
              <br />
              <Label>Email</Label>
              <br />
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={newUser.email}
                onChange={handleInputs}
              ></Input>
              <br />
              <Label>Password</Label>
              <br />
              <Input
                type="password"
                name="password"
                placeholder="Type to create a password"
                value={newUser.password}
                onChange={handleInputs}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain atleast 1 number, 1 uppercase, 1 lowercase letter, and >= 6 characters."
              ></Input>
              <br />
              <Label>Confirm Password</Label>
              <br />
              <Input
                type="password"
                name="cPassword"
                placeholder="Enter your password again"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Repeat the password you entered above!"
                value={newUser.cPassword}
                onChange={handleInputs}
              ></Input>
              <br />
              <p style={{ color: "#9B0000" }}> {errorMessage}</p>
              <StyledButton>Sign Up</StyledButton>
            </form>
            {/* <StyledLinkDiv>
              Already have an account?{" "}
              <StyledLink to="../Login">Log In</StyledLink>
            </StyledLinkDiv> */}
          </Col2Signup>
        </RowSignup>
      </GridSignup>
    </div>
  );
};
export default SignUp;
