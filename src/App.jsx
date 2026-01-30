import { createContext, useEffect, useState } from 'react'
import './App.css'
import './styles/Modals.css'
import './styles/Tables.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import GroupsPage from './pages/GroupsPage'
import Loading from './components/Loading'
import toast, { Toaster } from 'react-hot-toast'
import PocketLogo from './assets/PocketFavIcon.png'
import LogoutButton from './assets/power.png'
import UsersIcon from './assets/users.png'
import GroupsIcon from './assets/groups.png'
import HomeIcon from './assets/home.png'

export const UsersContext = createContext({ users: [], setUsers: () => { } });
export const GroupsContext = createContext({ groups: [], setGroups: () => { } });


function App() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentURL, setCurrentURL] = useState(window.location.href);

  async function getGroups() {
    try {
      let res = await fetch("/api/v1/groups");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let json = await res.json();
      setGroups(json.resources);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  async function getUsers() {
    try {
      let res = await fetch("/api/v1/users");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      };
      let json = await res.json();
      setUsers(json.resources);
    } catch (err) {
      setError(err);
      console.log(err);
    };
  };

  async function sync() {
    toast.success("Started Sync Job!")
    const res = await fetch("/api/v1/sync", { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    if (res.status == 204) {
      toast.success("Sync Job Finished!")
    } else {
      toast.error("Sync job failed :(")
    }
  };

  return (
    <BrowserRouter>
      <UsersContext.Provider value={{ users, setUsers, getUsers }}>
        <GroupsContext.Provider value={{ groups, setGroups, getGroups }}>
          <Toaster position='bottom-left' />
          <header style={{ display: 'flex', gap: '10px' }}>
            <Link to="/"><img src={PocketLogo} style={{ width: '36px', height: '48px' }}></img></Link>
            <h3 style={{ marginLeft: '8px' }}>Pocket Identity Directory</h3>

            <button style={{ marginLeft: 'auto', width: '3.2rem' }} onClick={() => sync()}>Sync</button>
            <a href='/do/logout'><button style={{ padding: '0px', display: 'flex', background: 'transparent', boxShadow: 'unset' }}><img src={LogoutButton} style={{ width: '30px' }}></img></button></a>

          </header>
          <hr style={{ margin: '0' }} />

          <div style={{ display: 'flex', flexDirection: 'row', height: '91.5vh' }}>
            {currentURL.includes('/Users') || currentURL.includes('/Groups') ? <>
              <div className='site-navigation'>
                <Link to='/'><img style={{ height: '1.2rem' }} src={HomeIcon} />Home</Link>
                <Link to='/Users' style={{ backgroundColor: currentURL.includes('/Users') ? 'rgb(196, 196, 196)' : '' }}><img style={{ height: '1.2rem' }} src={UsersIcon} /><p>Users</p></Link>
                <Link to='/Groups' style={{ backgroundColor: currentURL.includes('/Groups') ? 'rgb(196, 196, 196)' : '' }}><img style={{ height: '1.2rem' }} src={GroupsIcon} /><p>Groups</p></Link>
              </div>
              <hr style={{ margin: '10px', marginTop: '0', marginBottom: '0', height: '90vh' }} /></> : <></>}
            <Routes>
              <Route path='/' element={<HomePage setPage={setCurrentURL} />}></Route>
              <Route path='/Users' element={<UsersPage setPage={setCurrentURL} />}></Route>
              <Route path='/Groups' element={<GroupsPage setPage={setCurrentURL} />}></Route>
            </Routes>
          </div>


        </GroupsContext.Provider>
      </UsersContext.Provider>
    </BrowserRouter>
  );
}

export default App
