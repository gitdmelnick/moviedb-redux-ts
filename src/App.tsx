import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { store } from "./app/store";
import Dummy from "./common/sharedComponents/Dummy/Dummy";
import  Header  from "./features/header/Header";
import Home from "./features/home/Home";

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/movie/:id" element={<Dummy text="Movies here"/>} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
