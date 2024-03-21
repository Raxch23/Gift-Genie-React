import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import YourCards from "./pages/YourCards/index.jsx";
import CardGenerator from "./pages/CardGenerator/index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Giftcard from "./pages/Giftcard/index.jsx";
// import "https://fonts.googleapis.com/css?family=Tangerine|Notable|Droid+Sans|Lobster";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "yourcards",
        element: <YourCards />,
      },

      {
        path: "cardDownload",
        element: <Giftcard />,
      },

      {
        path: "cardGenerator",
        element: <CardGenerator />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
