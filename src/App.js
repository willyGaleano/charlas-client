import "./App.less";
import { Router as RouterHistory } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./utils/history.jsx";
import Router from "./routes/Router";
import { store } from "./redux/store";

function App() {
  return (
    <RouterHistory history={history}>
      <Provider store={store}>
        <Router />
      </Provider>
    </RouterHistory>
  );
}

export default App;
