import { createContext, useEffect, useState } from 'react'
import './App.css'
import './styles/Modals.css'
import './styles/Tables.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import GroupsPage from './pages/GroupsPage'

export const UsersContext = createContext({ users: [], setUsers: () => { }});
export const GroupsContext = createContext({ groups: [], setGroups: () => { }});


function App() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addUser, setAddUser] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(false);

  async function getGroups() {
    setLoadingGroups(true);
    try {
      let res = await fetch("http://localhost:8080/api/v1/groups");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let json = await res.json();
      setGroups(json.resources);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoadingGroups(false);
  };

  async function getUsers() {
    setLoadingUsers(true);
    try {
      let res = await fetch("http://localhost:8080/api/v1/users");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      };
      let json = await res.json();
      setUsers(json.resources);
    } catch (err) {
      setError(err);
      console.log(err);
    };
    setLoadingUsers(false);
  };
  
  async function sync() {
    setLoading(true);
    const res = await fetch("http://localhost:8080/api/v1/sync", { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) setError("Something went wrong!");
    setLoading(false);
    refresh();
  };

  async function refresh() {
    getUsers();
    getGroups();
  };

  return (
    <BrowserRouter>
      <UsersContext.Provider value={{ users, setUsers, getUsers }}>
        <GroupsContext.Provider value={{ groups, setGroups, getGroups }}>
          <header style={{ display: 'flex' }}>
            <Link to="/" c><img src='src/assets/PocketFavIcon.png' style={{ width: '36px', height: '48px' }}></img></Link>
            <h3 style={{ marginLeft: '8px' }}>Pocket Identity Directory</h3>
          </header>
          <hr />


          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/Users' element={<UsersPage/>}></Route>
            <Route path='/Groups' element={<GroupsPage/>}></Route>
          </Routes>

        </GroupsContext.Provider>
      </UsersContext.Provider>
    </BrowserRouter>
  );
}

export default App
