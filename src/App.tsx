import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./common/slices/userSlice";
import "./App.css";
import "./index.css";
import ErrorBoundary from "./common/sharedComponents/ErrorBoundary/ErrorBoundary";
import Header from "./features/header/Header";
import Footer from "./common/sharedComponents/Footer/Footer";
import Home from "./features/home/Home";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import MovieInfo from "./features/movieInfo/MovieInfo";
import SearchResults from "./features/searchResults/SearchResults";
import Favorites from "./features/favorites/Favorites";
import History from "./features/history/History";
import { PrivateRoute } from "./common/sharedComponents/PrivateRoute/PrivateRoute";

function App() {
  const { currentUser } = useAppSelector(selectUser);

  return (
    <Provider store={store}>
      <div className="App">
        <ErrorBoundary>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="movie/:id" element={<MovieInfo />} />
            <Route
              path="favorites"
              element={<PrivateRoute component={Favorites} />}
            />
            <Route
              path="history"
              element={<PrivateRoute component={History} />}
            />
          </Routes>
          <Footer />
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
