import { BrowserRouter, useRoutes } from "react-router-dom";
import Home from "@/views/Home";
import About from "@/views/About";

function Router() {
  return useRoutes([
    {
      path: "",
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },
  ]);
}

function Routers() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
export default Routers;
