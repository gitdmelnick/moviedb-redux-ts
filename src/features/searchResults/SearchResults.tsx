import { useSearchParams } from "react-router-dom";
import Movies from "../movies/Movies";
import { useGetMoviesByNameQuery } from "../movies/moviesSlice";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const { data } = useGetMoviesByNameQuery(query!, { skip: !query });

    return (<Movies movies={data ?? []}></Movies>);
}

export default SearchResults;