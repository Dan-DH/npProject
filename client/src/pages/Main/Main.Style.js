import styled from "styled-components";
import { DeviceMin } from "../../components/Breakpoints";

export const MainContainer = styled.div``;

export const SecondMainContainer = styled.div`
  margin-top: 5vh;
  color: white;
  display: flex;
  flex-direction: row;
`;

export const MainTitle = styled.h1`
  margin-top: 5vh;
  font-size: 4rem;
  text-align: center;
  color: #b32201;
  background-color: white;
`;
export const MainSynopsis = styled.div`
  width: 50%;
  padding: 2vh;
`;
export const SynopsisParagrahp = styled.p`
  font-size: 2rem;
  margin: 1vh auto;
  width: 50%;
  background-color: #b32201;
  padding: 2vh;
  border-radius: 15px 50px 30px 5px;
`;
export const MainInstructions = styled.div`
  width: 50%;
  background-color: grey;
  margin-right: 5vh;
  border-radius: 5px 30px 50px 15px;
  padding: 2vh;
`;

export const InstructionsTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2vh;
`;

export const StepText = styled.p`
  font-size: 2rem;
  margin: auto 2vh;
`;
export const StepNumber = styled.p`
  font-size: 4rem;
  background-color: #b32201;
  min-width: 5rem;
  height: 5rem;
  border-radius: 50%;
  text-align: center;
`;
