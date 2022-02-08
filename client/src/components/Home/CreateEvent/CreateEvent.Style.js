import styled from "styled-components";
import { DeviceMin } from "../../Breakpoints";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin: 2vh auto;
  font-size: 1.3rem;
  width: 80%;
`;

export const Label = styled.label`
  color: white;
  margin: 0.5vh;
  background-color: #b32201;
`;

export const Submit = styled.button`
  margin: 1vh auto 0 auto;
  width: 20vh;
  height: 5vh;
  font-size: 1.3rem;
  background-color: #b32201;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const FormSelect = styled.select`
  margin-top: 1vh;
  padding-left: 2px;
  width: 99.8%;
  height: 5vh;
  font-size: 1.2rem;
  background-color: #353944;
  border: 1px solid white;
  color: white;
`;

export const FormOption = styled.option``;

export const Input = styled.input`
  height: 3vh;
  width: 98.6%;
  margin-top: 1vh;
  padding-left: 5px;
  font-size: 1rem;
  background-color: #353944;
  border: 1px solid white;
  color: white;
`;

export const TextArea = styled.textarea`
  height: 7vh;
  width: 99.5%;
  margin-top: 1vh;
  font-size: 1rem;
  background-color: #353944;
  border: 1px solid white;
  color: white;
`;
