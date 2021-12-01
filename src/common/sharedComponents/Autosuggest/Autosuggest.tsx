import { useState, ChangeEvent, MouseEvent, useCallback } from "react";
import cl from "./Autosuggest.module.css";

type Suggestion = {
  value: string;
  key: string | number;
};

type AutosuggestProps = {
  suggestions: Suggestion[];
  // Doesn't look right?
  onClick: <T>(arg?: T) => void;
  onChange: <T>(arg?: T) => void;
};

const debounce = (callback: Function, delay = 350) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

// Needs splitting into 2 components
const Autosuggest = ({ suggestions, onClick, onChange }: AutosuggestProps) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  const debouncedInput = useCallback(
    debounce((inputText: string) => onChange(inputText)),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;

    setShowSuggestions(true);
    setUserInput(userInput);

    debouncedInput(userInput);
  };

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);

    onClick(e.currentTarget.getAttribute("data-id"));
  };

  const renderAutosuggest = () => {
    if (showSuggestions && userInput) {
      if (suggestions.length) {
        return (
          <ul className={cl.suggestions}>
            {suggestions.map(({ value, key }, index) => {
              return (
                <li key={key} onClick={handleClick} data-id={key}>
                  {value}
                </li>
              );
            })}
          </ul>
        );
      }
    }
  };

  return (
    <div className={cl.suggestionsContainer}>
      <input type="text" onChange={handleChange} value={userInput} />
      {renderAutosuggest()}
    </div>
  );
};

export default Autosuggest;
