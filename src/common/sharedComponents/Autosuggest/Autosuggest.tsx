import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent  } from "react";
import cl from "./Autosuggest.module.css";

// Temporary type until proper entity type is added
type AutosuggestProps = {
  suggestions: string[];
}

export const Autosuggest = ({suggestions}:AutosuggestProps) => {
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

  // filteredSuggestions might be unnecessary
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestions => suggestions.toLocaleLowerCase().indexOf(userInput.toLocaleLowerCase()) > -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  }

  const onClick = (e: MouseEvent<HTMLInputElement>) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        setActiveSuggestion(0);
        setShowSuggestions(false);
        setUserInput(filteredSuggestions[activeSuggestion]);
        break;
      case "ArrowUp":
        if(activeSuggestion === 0) {
          return;
        }

        setActiveSuggestion(activeSuggestion - 1);
        break;        
      case "ArrowDown":
        if(activeSuggestion - 1 === filteredSuggestions.length) {
          return;
        }
        setActiveSuggestion(activeSuggestion + 1);

        break;
      default:
        console.log(e.key);
        break;
    }
  }





  return <></>;
};
