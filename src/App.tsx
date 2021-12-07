import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { store } from "./app/store";
import Header from "./features/header/Header";
import Home from "./features/home/Home";
import Movie from "./features/movie/Movie";
import ErrorBoundary from "./common/sharedComponents/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<Movie />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

export default App;
