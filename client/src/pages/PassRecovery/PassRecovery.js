import React from "react";
import { useNavigate } from "react-router";
import {
  GridLogin,
  RowLogin,
  Col1Login,
  Col2Login,
} from "../../components/Forms/GridLogin.styled";
import { StyledButton } from "../../components/Forms/Button.styled";
import { useState } from "react";
import { Input } from "../../components/Forms/Input.styled";
import { gql, useMutation } from "@apollo/client";

const PassRecovery = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [userEmail, setUserEmail] = useState({ email: "" });

  let navigate = useNavigate();

  const PASS_RECOVERY = gql`
    mutation PassRecovery($email: String!) {
      passRecovery(email: $email) {
        id
      }
    }
  `;

  const [passRecovery] = useMutation(PASS_RECOVERY);

  const handleInputs = (e) => {
    setUserEmail({ ...userEmail, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <GridLogin>
        <RowLogin>
          <Col1Login />
          <Col2Login>
            <h1>Password recovery</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (userEmail.email !== "") {
                  const { data, error, loading } = await passRecovery({
                    variables: {
                      email: userEmail.email,
                    },
                  });
                  navigate("../login");
                } else {
                  setErrorMessage("Email cannot be empty");
                }
              }}
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={userEmail.email}
                onChange={handleInputs}
              ></Input>
              <br />
              <br />
              <p style={{ color: "#9B0000" }}> {errorMessage}</p>
              <StyledButton>Request password</StyledButton>
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

export default PassRecovery;
