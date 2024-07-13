import "./App.css";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
const LandingPage = lazy(() => import("./pages/LandingPage"));
import Authpage from "./pages/Authpage";
import Chatpage from "./pages/Chatpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authprovider from "./providers/Authprovider";
import PasswordReset from "./pages/PasswordReset";
import ErrorPage from "./pages/ErrorPage";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "auth",
          element: <Authpage />,
        },
        {
          path: "chat",
          element: <Chatpage />,
        },
      ],
    },
    {
      path: "/resetPwd",
      element: <PasswordReset />,
    },
  ]);

 
  return (
    <>
       
      <Authprovider>
          <NextUIProvider>
            <RouterProvider router={router} />
            <ToastContainer
              autoClose={3000}
              style={{ zIndex: 1000, background: "transparent" }}
              position="bottom-right"
            />
          </NextUIProvider>
      </Authprovider>
    </>
  );
}

export default App;
