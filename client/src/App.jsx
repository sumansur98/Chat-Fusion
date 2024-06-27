import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import LayoutLoaders from "./components/layouts/Loaders";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(()=>import("./pages/admin/AdminLogin"))
const Dashboard = lazy(()=>import("./pages/admin/Dashboard"))


let user = true;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders/>}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/chat/:chatId" element={<Chat />}></Route>
            <Route path="/groups" element={<Groups />}></Route>
          </Route>

          <Route path="/login" element={
            <ProtectRoute user={!user} redirect="/">
              <Login />
            </ProtectRoute>
          }></Route>

          <Route path="/admin" element={<AdminLogin/>}></Route>
          <Route path="/admin/dashboard" element={<Dashboard/>}></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
