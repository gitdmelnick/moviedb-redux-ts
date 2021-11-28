import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent  } from "react";
import cl from "./Autosuggest.module.css";

// Temporary type until proper entity type is added
type Suggestion = {
  value: string;
  key: string | number;
}

type AutosuggestProps = {
  suggestions: Suggestion[];
}

export const Autosuggest = ({suggestions}:AutosuggestProps) => {
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

  // filteredSuggestions might be unnecessary
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  let suggestionsList; 

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.value.substr(0, userInput.length).toLocaleLowerCase() === userInput.toLocaleLowerCase()
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
  }

  const onClick = (e: MouseEvent<HTMLElement>) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    switch (e.key) {
      case "Enter":
        setActiveSuggestion(0);
        setShowSuggestions(false);
        setUserInput(filteredSuggestions[activeSuggestion].value);
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

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsList = (
        <ul className={cl.suggestions}>
          {filteredSuggestions.map((suggestion, index) => {
            let className;
  
            if (index === activeSuggestion) {
              className = cl.suggestionActive;
            }
            return (
              <li className={className} key={suggestion.key} onClick={onClick}>
                {suggestion.value}
              </li>
            );
          })}
        </ul>
      );
    } 
  }

  return (
    <>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsList}
    </>
  )
};
