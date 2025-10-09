import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App.tsx'
import { LogIn } from './presentation/LogIn.tsx';

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/login", Component: LogIn}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
