import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./landing_page/AppLayout"
import Home from "./landing_page/pages/Home"
import Signup from "./landing_page/pages/Signup"
import Login from "./landing_page/pages/Login"
import About from "./landing_page/pages/About"
import Products from "./landing_page/pages/Products"
import Pricing from "./landing_page/pages/Pricing"
import Support from "./landing_page/pages/Support"
import VerifyEmail from "./landing_page/pages/VerifyEmail"
import NotFound from "./landing_page/pages/NotFound"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/pricing",
          element: <Pricing />
        },
        {
          path: "/support",
          element: <Support />
        },
        {
          path: "/verify-email",
          element: <VerifyEmail />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}

export default App

