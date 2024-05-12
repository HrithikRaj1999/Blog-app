import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRouter from "./Router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer
        autoClose={2000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
