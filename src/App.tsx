import { Route, Routes } from 'react-router-dom';
import HomeLayout from './layouts/homeLayout';
import HomePage from './components/homePage';
import RegisterPage from './components/registerPage';
import RegisterLayout from './layouts/registerLayout';
import LoginPage from './components/loginPage';
import Users from './components/users';
import Groups from './components/groups';
import GroupDetails from './components/groupDetails';


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
      </Route>
      <Route element={<RegisterLayout/>}>
      </Route>
    </Routes>
  );
}

export default App;