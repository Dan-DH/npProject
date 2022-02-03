import React from "react";

import {
  MainContainer,
  SecondMainContainer,
  MainTitle,
  MainSynopsis,
  SynopsisParagrahp,
  MainInstructions,
  InstructionsTitle,
  Step,
  StepText,
  StepNumber,
} from "./Main.Style";

function Main() {
  return (
    <MainContainer>
      <MainTitle>What's GeekOut?</MainTitle>
      <SecondMainContainer>
        <MainSynopsis>
          <SynopsisParagrahp>
            Having trouble finding players for a D&D campaing or want to play
            some old-school GoldenEye 007 deathmatch?
          </SynopsisParagrahp>
          <SynopsisParagrahp>
            GeekOut is a event-driven community for social gamers of any kind.
          </SynopsisParagrahp>
        </MainSynopsis>
        <MainInstructions>
          <InstructionsTitle>
            How to have fun in 4 easy steps:
          </InstructionsTitle>
          <Step>
            <StepNumber>1</StepNumber>
            <StepText>Create an account using your email</StepText>
          </Step>
          <Step>
            <StepNumber>2</StepNumber>
            <StepText>
              Create an event. Set a date, location and number of players.
            </StepText>
          </Step>
          <Step>
            <StepNumber>3</StepNumber>
            <StepText>Rejoice as other users sign up for your event.</StepText>
          </Step>
          <Step>
            <StepNumber>4</StepNumber>
            <StepText>Go and have a good time!</StepText>
          </Step>
        </MainInstructions>
      </SecondMainContainer>
    </MainContainer>
  );
}

export default Main;
