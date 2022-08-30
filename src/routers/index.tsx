import { lazy, Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About'

// const Home = lazy(() => import('@/pages/Home'))
// const About = lazy(() => import('@/pages/About'))

function Router() {
  return useRoutes([
    {
      path: '',
      element: <Home />
    },
    {
      path: 'about',
      element: <About />
    },
  ])
}

export default () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
)