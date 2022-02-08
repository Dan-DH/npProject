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
  flex-wrap: wrap;
`;

export const SynopsisImage = styled.img`
  width: 100%;

  @media ${DeviceMin.md} {
    width: 50%;
  }
`;

export const SynopsisDiv = styled.div`
  background-color: #b32201;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 2vh;
  font-size: 2vh;

  @media ${DeviceMin.md} {
    font-size: 3vh;
    width: 50%;
    padding: 0;
  }
`;

export const SynopsisParagrahp = styled.p`
  max-width: 70%;
  margin: auto;

  @media ${DeviceMin.md} {
    max-width: 100%;
  }
`;

export const InstructionsTitleDiv = styled.div`
  width: 100%;
  color: white;
  background-color: black;
`;

export const InstructionsTitle = styled.h2`
  font-size: 2.5vh;
  text-align: center;
  margin: 5vh 0;

  @media ${DeviceMin.md} {
    font-size: 4vh;
  }
`;

export const MainInstructions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StepDiv = styled.div`
  width: 100%;
  background-color: #b32201;
  display: flex;
  flex-direction: column;
  padding-top: 1vh;

  @media ${DeviceMin.md} {
    width: 50%;
  }
`;

export const Step = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2vh;
`;

export const StepText = styled.p`
  font-size: 2vh;
  margin: auto 2vh;

  @media ${DeviceMin.md} {
    font-size: 3vh;
  }
`;

export const StepNumber = styled.p`
  font-size: 3.5vh;
  background-color: #b32201;
  min-width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  text-align: center;
  border: 2px solid white;

  @media ${DeviceMin.md} {
    font-size: 4rem;
    min-width: 5rem;
    height: 5rem;
    margin-left: 3rem;
  }
`;

export const InstructionsImage = styled.img`
  width: 100%;

  @media ${DeviceMin.md} {
    width: 50%;
  }
`;
