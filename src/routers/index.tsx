import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';

function Router() {
  return useRoutes([
    {
      path: '',
      element: <Home />,
    },
    {
      path: 'about',
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
