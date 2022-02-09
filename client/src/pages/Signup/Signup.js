import React, { useRef, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
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

  //navigation to go to login page after sign up
  let navigate = useNavigate();

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

  //defining the query
  const SIGNUP = gql`
    mutation createUser(
      $username: String!
      $email: String!
      $password: String!
    ) {
      createUser(username: $username, email: $email, password: $password) {
        id
      }
    }
  `;

  //destructuring the newUser object
  const { login, email, password } = newUser;
  const [addUser, { data, loading, error }] = useMutation(SIGNUP);
  if (loading) return "Submitting...";
  // if (error) setErrorMessage(error.message); --this was preventing the error handling

  //return form
  return (
    <div>
      <GridSignup>
        <RowSignup>
          <Col1Signup />
          <Col2Signup>
            <h1>Create your account</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (login === "" || email === "" || password === "") {
                  setErrorMessage("Fields cannot be empty");
                  return false;
                }

                if (passwordMatch.current === false) {
                  setErrorMessage("Passwords do not match");
                  return false;
                }
                await addUser({
                  variables: {
                    username: login,
                    email: email,
                    password: password,
                  },
                  onCompleted: ({ createUser }) => {
                    navigate("../login");
                  },
                }).catch((err) => {
                  setErrorMessage(err.message);
                });
              }}
            >
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
              <br />
              <StyledButton>Sign Up</StyledButton>
            </form>
            Already got an account?
            <StyledLink to="../Login"> Log In</StyledLink>
          </Col2Signup>
        </RowSignup>
      </GridSignup>
    </div>
  );
};
export default SignUp;
