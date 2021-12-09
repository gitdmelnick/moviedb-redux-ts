import { Provider } from "react-redux";
import {Routes, Route } from "react-router-dom";
import "./App.css";
import { store } from "./app/store";
import Header from "./features/header/Header";
import Home from "./features/home/Home";
import MovieInfo from "./features/movieInfo/MovieInfo";
import ErrorBoundary from "./common/sharedComponents/ErrorBoundary/ErrorBoundary";
import SearchResults from "./features/searchResults/SearchResults";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ErrorBoundary>
        <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults/>}/>
              <Route path="/movie/:id" element={<MovieInfo />} />
            </Routes>
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
