import styled from "styled-components";
import { DeviceMin } from "../Breakpoints";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5vh auto;
`;

export const FormTitle = styled.h1`
  color: white;
  text-align: center;
  background-color: #b32201;
  width: 70%;
  margin: 0 auto;
`;

export const FormForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2vh auto;
  font-size: 1.3rem;
  width: 100%;
`;

export const Label = styled.label`
  color: white;
  margin: 0.5vh auto;
  width: 70%;
  background-color: #b32201;
  text-align: left;
`;

export const Parag = styled.p`
  padding-left: 5px;
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
  // margin-top: 1vh;
  // width: 99.8%;
  // height: 5vh;
  // font-size: 1.2rem;
  // background-color: #353944;
  // border: 1px solid white;
  // color: white;
`;

export const FormOption = styled.option``;

export const Input = styled.input`
  height: 3vh;
  width: 98.5%;
  margin-top: 1vh;
  font-size: 1rem;
  background-color: #353944;
  border: 1px solid white;
  color: white;
  padding-left: 5px;
`;

export const TextArea = styled.textarea`
  // height: 7vh;
  // width: 99%;
  // margin-top: 1vh;
  // font-size: 1rem;
  // background-color: #353944;
  // border: 1px solid white;
  // color: white;
`;
