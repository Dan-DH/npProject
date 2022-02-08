import styled from "styled-components";
import { DeviceMin } from "../../components/Breakpoints";

export const MainContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
`;

export const MainSynopsis = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SynopsisImage = styled.img`
  width: 50%;
`;

export const SynopsisDiv = styled.div`
  background-color: #b32201;
  font-size: 1.5rem;
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SynopsisParagrahp = styled.p``;

export const MainInstructions = styled.div`
  width: 100%;
  border-radius: 5px 30px 50px 15px;
  display: flex;
  flex-direction: row;
`;

export const InstructionsTitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: white;
  background-color: black;
`;

export const InstructionsTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin: 5vh 0;
`;

export const StepDiv = styled.div`
  width: 50%;
  background-color: #b32201;
  display: flex;
  flex-direction: column;
  padding-top: 1vh;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2vh;
`;

export const StepText = styled.p`
  font-size: 1.5rem;
  margin: auto 2vh;
`;

export const StepNumber = styled.p`
  font-size: 4rem;
  background-color: #b32201;
  min-width: 5rem;
  height: 5rem;
  border-radius: 50%;
  text-align: center;
  border: 2px solid white;
  margin-left: 3rem;
`;

export const InstructionsImage = styled.img`
  width: 50%;
`;
