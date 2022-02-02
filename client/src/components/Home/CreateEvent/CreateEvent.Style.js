import styled from "styled-components";
import { DeviceMin } from "../../Breakpoints";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
`;

export const FormTitle = styled.h1`
  color: white;
  text-align: center;
  background-color: #b32201;
  width: 80%;
  margin: 0 auto;
`;

export const FormForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-size: 1.3rem;
`;

export const Label = styled.label`
  color: white;
  margin: 0.5vh;
  width: 40vh;
  background-color: #b32201;
`;

export const Submit = styled.input`
  margin-top: 1vh;
  width: 20vh;
  height: 5vh;
  font-size: 1.3rem;
  background-color: #b32201;
  color: white;
  border: none;
  border-radius: 5px;
`;

export const FormSelect = styled.select`
  margin-top: 1vh;
  width: 100%;
  height: 5vh;
  font-size: 1.2rem;
`;

export const FormOption = styled.option``;

export const Input = styled.input`
  height: 3vh;
  width: 99%;
  margin-top: 1vh;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  height: 7vh;
  width: 99%;
  margin-top: 1vh;
  font-size: 1rem;
`;
