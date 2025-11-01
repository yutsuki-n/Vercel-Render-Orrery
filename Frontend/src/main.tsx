import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { LogIn } from './view/top/LogIn.tsx';
import { SignUp } from './view/top/SignUp.tsx';
import { Home } from './view/home/home.tsx';
import { Detail } from './view/detail/detail.tsx';
import { EditProfile } from './view/user/edit.tsx';
import { WithdrawApp } from './view/user/withdraw.tsx';
import { Header } from './view/common/header.tsx';
import { Footer } from './view/common/footer.tsx';

const RootLayout = () => (
  <>
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <main className='flex-grow py-8'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  </>
);

const router = createBrowserRouter([{
  element: <RootLayout />,
  children:[
    { path: "/", Component: LogIn},
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
