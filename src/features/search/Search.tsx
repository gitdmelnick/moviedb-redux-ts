import { useState, useMemo, useEffect, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from 'react-router-dom'
import s from "./Search.module.css";
import Autosuggest from "../../common/sharedComponents/Autosuggest/Autosuggest";
import { useGetMoviesByNameQuery } from "../movies/moviesSlice";

const Search = () => {
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>("");
  const { data } = useGetMoviesByNameQuery(query, { skip: !query });
  const navigate = useNavigate();

  useEffect(() => {
    setSuggestions(data ?? []);
  }, [data]);

  const transformedResults = useMemo(() => {
    return suggestions
      .map((suggestion) => {
        return { value: suggestion.title, key: suggestion.id };
      })
      .slice(0, 5);
  }, [suggestions]);

  const handleOnChange = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setQuery(element.value);
  };

  const handleOnClick = (e: MouseEvent) => {
    const element = e.currentTarget as HTMLElement;
    if(query) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <div className={s.search}>
      <Autosuggest
        suggestions={transformedResults}
        onChange={handleOnChange}
        onClick={handleOnClick}
      />
    </div>
  );
};

export default Search;
