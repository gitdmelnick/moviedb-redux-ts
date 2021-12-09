import { useState, ChangeEvent, MouseEvent, useCallback } from "react";
import s from "./Autosuggest.module.css";
import {debounce} from "../../utilities/utilities";

type Suggestion = {
  value: string;
  key: string | number;
};

type AutosuggestProps = {
  suggestions: Suggestion[];
  onClick: (event: MouseEvent) => void;
  onChange: (event: ChangeEvent) => void;
};

const Autosuggest = ({ suggestions, onClick, onChange }: AutosuggestProps) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  const debouncedInput = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => onChange(event)),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.currentTarget;
    const userInput = element.value;

    setShowSuggestions(true);
    setUserInput(userInput);

    debouncedInput(e);
  };

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);

    onClick(e);
  };

  const renderAutosuggest = () => {
    if (showSuggestions && userInput) {
      if (suggestions.length) {
        return (
          <ul className={s.suggestions}>
            {suggestions.map(({ value, key }, index) => {
              return (
                <li key={key} onClick={e => handleClick(e)} data-id={key}>
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
    <div className={s.suggestionsContainer}>
      <input type="text" onChange={e => handleChange(e)} value={userInput} />
      {renderAutosuggest()}
    </div>
  );
};

export default Autosuggest;
