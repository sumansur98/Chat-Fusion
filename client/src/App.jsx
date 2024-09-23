import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import LayoutLoaders from "./components/layouts/Loaders";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(()=>import("./pages/admin/AdminLogin"))
const Dashboard = lazy(()=>import("./pages/admin/Dashboard"))
const UserManagement = lazy(()=>import("./pages/admin/UserManagement"))
const ChatManagement = lazy(()=>import("./pages/admin/ChatManagement"))
const MessageManagement = lazy(()=>import("./pages/admin/MessageManagement"))




const App = () => {
  const {user, loader} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(server);
    axios.get(`${server}/api/v1/user/me`).then((res) => console.log(res))
    .catch(err => dispatch(userNotExists()));
  },[dispatch])

  return loader ? (
    <LayoutLoaders/>
  ) : (
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
          <Route path="/admin/users" element={<UserManagement/>}></Route>
          <Route path="/admin/chats" element={<ChatManagement/>}></Route>
          <Route path="/admin/messages" element={<MessageManagement/>}></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center"/>
    </BrowserRouter>
  );
};

export default App;
