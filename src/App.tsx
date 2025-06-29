import { Route, Routes } from 'react-router-dom';
import HomeLayout from './layouts/homeLayout';
import HomePage from './components/homePage';
import RegisterPage from './components/registerPage';
import RegisterLayout from './layouts/registerLayout';
import LoginPage from './components/loginPage';
import Users from './components/users';
import Groups from './components/groups';
import GroupDetails from './components/groupDetails';
import UserLogs from './components/userLogs';
import CreateGroup from './components/createGroup';
import ChangePassword from "./components/changePassword";
import {FetchUserProfile} from "./components/fetchProfile";
function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />}/>
        <Route path="api/auth/login" element={<LoginPage />}/>
        <Route path="api/auth/register" element={<RegisterPage />}/>
        <Route path="api/users" element={<Users/>}/>
        <Route path="/api/groups" element={<Groups/>}/>
        <Route path="/groups/:id" element={<GroupDetails />} />
        <Route path="/api/logs" element={<UserLogs/>}/>
        <Route path="/groups/create" element={<CreateGroup/>}/>
          <Route path="/api/auth/change-password" element={<ChangePassword/>}/>
          <Route path="/api/auth/me" element={<FetchUserProfile/>}/>

      </Route>
      <Route element={<RegisterLayout/>}>
      </Route>
    </Routes>
  );
}

export default App;