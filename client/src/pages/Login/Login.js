import React from "react";
import { useNavigate } from "react-router";
import {
  GridLogin,
  RowLogin,
  Col1Login,
  Col2Login,
} from "../../components/Forms/GridLogin.styled";
import { StyledButton } from "../../components/Forms/Button.styled";
import { StyledLink } from "../../components/Forms/StyledLink.styled";
import { Label } from "../../components/Forms/Label.styled";
import { useState } from "react";
import { Input } from "../../components/Forms/Input.styled";
import { gql, useMutation } from "@apollo/client";

const LogIn = ({ geek, setGeek }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userLog, setUserLog] = useState({
    login: "",
    password: "",
  });

  //redirects to home on login
  let navigate = useNavigate();

  const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        token
        email
        username
        profile_pic
        bio
      }
    }
  `;

  const [logUser] = useMutation(LOGIN);

  const handleInputs = (e) => {
    setUserLog({ ...userLog, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <GridLogin>
        <RowLogin>
          <Col1Login />
          <Col2Login>
            <h1>Log in</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (userLog.login !== "" && userLog.password !== "") {
                  try {
                    const { data, error, loading } = await logUser({
                      variables: {
                        username: userLog.login,
                        password: userLog.password,
                      },
                      onCompleted: ({ login }) => {
                        localStorage.setItem("auth_token", login.token);
                        setGeek({
                          id: login.id,
                          email: login.email,
                          profilePic: login.profile_pic,
                          username: login.username,
                          bio: login.bio,
                        });
                        navigate("../home");
                      },
                    });
                  } catch (err) {
                    setErrorMessage(err.message);
                  }
                } else {
                  setErrorMessage("Username / password cannot be empty");
                }
              }}
            >
              <Label>User name</Label>
              <br />
              <Input
                type="text"
                name="login"
                placeholder="Enter your user name"
                onChange={handleInputs}
              ></Input>
              <br />
              <Label>Password</Label>
              <br />
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleInputs}
                title="User name or password is incorrect!"
              ></Input>
              <br />
              <p style={{ color: "#9B0000" }}> {errorMessage}</p>
              <br />
              <StyledButton>Log In</StyledButton>
            </form>
            Don't have an account yet?
            <StyledLink to="../Signup"> Sign Up</StyledLink>
          </Col2Login>
        </RowLogin>
      </GridLogin>
    </div>
  );
};
export default LogIn;
