import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import Dummy from "../../common/sharedComponents/Dummy/Dummy";
import Movies from "../movies/Movies";
import { useGetMoviesByNameQuery } from "../movies/moviesSlice";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const { data, isSuccess } = useGetMoviesByNameQuery(query!, { skip: !query });

    return (<Movies movies={data ?? []}></Movies>);
}

export default SearchResults;