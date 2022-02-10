import React, { useState } from "react";
import { EmptyCardContainer, EmptyCardText } from "./EmptyCardStyle";

function EmptyCard({ myOrganizedEvents }) {
  return (
    <EmptyCardContainer>
      {myOrganizedEvents ? (
        <EmptyCardText>
          Organize the kind of event you would like to be part of!
        </EmptyCardText>
      ) : (
        <EmptyCardText>
          It's empty in here... Let's join an event!
        </EmptyCardText>
      )}
    </EmptyCardContainer>
  );
}

export default EmptyCard;
