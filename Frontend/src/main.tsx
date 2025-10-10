import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App.tsx'
import { LogIn } from './presentation/top/LogIn.tsx';
import { SignUp } from './presentation/top/SignUp.tsx';
import { Home } from './presentation/home/home.tsx';
import { Detail } from './presentation/detail/detail.tsx';

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/login", Component: LogIn},
  { path: "/signup", Component: SignUp},
  { path: "/home", Component: Home},
  { path: "/:id", Component: Detail},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
