import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Holdings from "./pages/Holdings";
import Positions from "./pages/Positions";
import Funds from "./pages/Funds";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/holdings",
          element: <Holdings />,
        },
        {
          path: "/positions",
          element: <Positions />,
        },
        {
          path: "/funds",
          element: <Funds />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

