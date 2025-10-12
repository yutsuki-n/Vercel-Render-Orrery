import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import App from './App.tsx'
import { LogIn } from './presentation/top/LogIn.tsx';
import { SignUp } from './presentation/top/SignUp.tsx';
import { Home } from './presentation/home/home.tsx';
import { Detail } from './presentation/detail/detail.tsx';
import { EditProfile } from './presentation/user/edit.tsx';
import { WithdrawApp } from './presentation/user/withdraw.tsx';
import { Header } from './presentation/common/header.tsx';
import { Footer } from './presentation/common/footer.tsx';

const RootLayout = () => (
  <>
    <Header/>
    <Outlet/>
    <Footer/>
  </>
);

const router = createBrowserRouter([{
  element: <RootLayout />,
  children:[
    { path: "/", Component: App },
    { path: "/login", Component: LogIn},
    { path: "/signup", Component: SignUp},
    { path: "/home", Component: Home},
    { path: "/:id", Component: Detail},
    { path: "/edit", Component: EditProfile},
    { path: "/withdraw", Component: WithdrawApp},]
}]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
)
