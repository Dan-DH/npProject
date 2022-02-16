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
  //getting the user and token from the url
  const url = window.location.pathname.split("/");
  const urlUserId = url[2];
  const urlToken = url[3];
  // console.log(urlUserId);
  // console.log(urlToken);

  const [errorMessage, setErrorMessage] = useState("");
  const [passReset, setPassReset] = useState({
    password: "",
    cPassword: "",
  });
  const handleInputs = (e) => {
    setPassReset({ ...passReset, [e.target.name]: e.target.value });
  };

  //navigation to go to login page after sign up
  let navigate = useNavigate();

  //password validation
  let passwordMatch = useRef(false);
  useEffect(() => {
    if (
      passReset.password === passReset.cPassword &&
      passReset.password !== "" &&
      passReset.cPassword !== ""
    ) {
      passwordMatch.current = true;
    } else {
      passwordMatch.current = false;
    }
  }, [passReset.password, passReset.cPassword]);

  //defining the query
  const PASS_RESET = gql`
    mutation PasswordReset($id: ID!, $token: String!, $password: String!) {
      passwordReset(id: $id, token: $token, password: $password)
    }
  `;

  //destructuring the passReset object
  const [passwordReset] = useMutation(PASS_RESET);

  //return form
  return (
    <div style={{ minHeight: "80vh" }}>
      <GridSignup>
        <RowSignup>
          <Col1Signup />
          <Col2Signup>
            <h1>Password reset</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (passwordMatch.current === false) {
                  setErrorMessage("Passwords do not match");
                  return false;
                }
                try {
                  await passwordReset({
                    variables: {
                      id: urlUserId,
                      token: urlToken,
                      password: passReset.password,
                    },
                  });
                  navigate("../login");
                } catch (error) {
                  if (
                    error.message === "JsonWebTokenError: invalid signature"
                  ) {
                    setErrorMessage(
                      "Invalid/expired token. Please request a new one"
                    );
                  } else {
                    setErrorMessage(error.message);
                  }
                }
              }}
            >
              <Label>New password</Label>
              <br />
              <Input
                type="password"
                name="password"
                placeholder="Type to create a password"
                value={passReset.password}
                onChange={handleInputs}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain atleast 1 number, 1 uppercase, 1 lowercase letter, and >= 6 characters."
              ></Input>
              <br />
              <Label>Confirm new password</Label>
              <br />
              <Input
                type="password"
                name="cPassword"
                placeholder="Enter your password again"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Repeat the password you entered above!"
                value={passReset.cPassword}
                onChange={handleInputs}
              ></Input>
              <br />
              <p style={{ color: "#9B0000" }}> {errorMessage}</p>
              <br />
              <StyledButton>Submit</StyledButton>
            </form>
          </Col2Signup>
        </RowSignup>
      </GridSignup>
    </div>
  );
};
export default SignUp;
