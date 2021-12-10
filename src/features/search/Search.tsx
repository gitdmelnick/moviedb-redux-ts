import { useState, useMemo, useEffect, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/sharedComponents/Button/Button";
import s from "./Search.module.css";
import Autosuggest from "../../common/sharedComponents/Autosuggest/Autosuggest";
import { useGetMoviesByNameQuery } from "../movies/moviesSlice";
import {
  selectIsAuthenticated,
  updateHistory,
} from "../../common/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Search = () => {
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>("");
  const { data } = useGetMoviesByNameQuery(query, { skip: !query });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

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
    if (query) {
      navigate(`/movie/${element.getAttribute("data-id")}`);
    }
  };

  const handleSearchClick = (e: MouseEvent) => {
    const queryEndpoint = `/search?query=${query}`;
    if (query && isAuthenticated) {
      if (isAuthenticated) {
        dispatch(updateHistory(queryEndpoint));
      }
      navigate(queryEndpoint);
      setSuggestions([]);
    }
  };

  return (
    <div className={s.search}>
      <Autosuggest
        suggestions={transformedResults}
        onChange={handleOnChange}
        onClick={handleOnClick}
      />
      <Button onClick={handleSearchClick}>Search</Button>
    </div>
  );
};

export default Search;
