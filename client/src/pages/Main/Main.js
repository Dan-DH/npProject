import React from "react";

import {
  MainContainer,
  MainSynopsis,
  SynopsisParagrahp,
  MainInstructions,
  InstructionsTitle,
  Step,
  StepText,
  StepNumber,
  StepDiv,
  InstructionsTitleDiv,
  SynopsisImage,
  SynopsisDiv,
  InstructionsImage,
} from "./Main.Style";

import tavernBanner from "../../assets/images/tavernBanner.webp";

import valorantBanner from "../../assets/images/valorantBanner.webp";

function Main() {
  return (
    <MainContainer>
      <MainSynopsis>
        <SynopsisImage src={tavernBanner} />
        <SynopsisDiv>
          <SynopsisParagrahp>
            Having trouble finding players for your gaming sessions?
            <br />
            <br />
            GeekOut is a event-driven community for all gamers
          </SynopsisParagrahp>
        </SynopsisDiv>
      </MainSynopsis>
      <InstructionsTitleDiv>
        <InstructionsTitle>How to have fun in 4 easy steps:</InstructionsTitle>
      </InstructionsTitleDiv>
      <MainInstructions>
        <StepDiv>
          <Step>
            <StepNumber>1</StepNumber>
            <StepText>Create an account using your email</StepText>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepText>
              Create an event. Set a location, date and number of players
            </StepText>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepText>Rejoice as other players sign up for your event</StepText>
          </Step>
          <Step>
            <StepNumber>4</StepNumber>
            <StepText>Go and have a good time!</StepText>
          </Step>
        </StepDiv>
        <InstructionsImage src={valorantBanner} />
      </MainInstructions>
    </MainContainer>
  );
}

export default Main;
