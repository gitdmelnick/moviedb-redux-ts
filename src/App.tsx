import { Provider } from "react-redux";
import "./App.css";
import { store } from "./app/store";
import { Dummy } from "./common/sharedComponents/Dummy/Dummy";
import  Header  from "./features/header/Header";

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
      </div>
    </Provider>
  );
}

export default App;
