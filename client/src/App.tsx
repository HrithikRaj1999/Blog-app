import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRouter from "./Router/AppRouter";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />;
    </Provider>
  );
}

export default App;
