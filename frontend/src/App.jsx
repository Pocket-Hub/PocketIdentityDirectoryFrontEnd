import { createContext, useEffect, useState } from 'react'
import './App.css'
import './styles/Modals.css'
import './styles/Tables.css'
import './styles/Content.css'
import './styles/Loading.css'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import GroupsPage from './pages/GroupsPage'
import toast, { Toaster } from 'react-hot-toast'
import PocketLogo from './assets/PocketFavIcon.png'
import LogoutButton from './assets/power.png'
import UsersIcon from './assets/users.png'
import GroupsIcon from './assets/groups.png'
import HomeIcon from './assets/home.png'
import ErrorPage from './pages/ErrorPage'
import EditIcon from './assets/edit.png'
import ExitIcon from './assets/exit.png'
import RefreshIcon from './assets/refresh.png'
import TrashIcon from './assets/trash.png'
import { requestAllUsers } from './requests/usersRequests'
import MobileErrorPage from './pages/MobileErrorPage'

export const UsersContext = createContext({ users: [], setUsers: () => { }, getUsers: () => { } });
export const GroupsContext = createContext({ groups: [], setGroups: () => { }, getGroups: () => { } });
export const IconsContext = createContext();
export const EnumsContext = createContext({ countries: [], userTypes: [], userStatuses: [] });

function App() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentURL, setCurrentURL] = useState(window.location.pathname);
  const location = useLocation();
  const navigate = useNavigate();
  const [countries, setCountries] = useState();
  const [userTypes, setUserTypes] = useState();
  const [userStatuses, setUserStatuses] = useState();
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState("");


  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile && !location.pathname.startsWith("/Mobile")) {
      navigate("/Mobile", { replace: true });
    } else if (!isMobile && location.pathname.startsWith("/Mobile")) {
      navigate("/", { replace: true });
    }
    getEnums();

  }, [location.pathname, navigate]);

  async function getEnums() {

    try {
      const res = await fetch("/api/v1/enums", {
        method: 'GET',
        headers: {
          'x-csrf-token': 'fetch'
        }
      });
      const responseBody = await res.json();
      localStorage.setItem('csrf-token', res.headers.get('x-csrf-token'))
      setCountries(responseBody.countries);
      setUserStatuses(responseBody.userStatuses);
      setUserTypes(responseBody.userTypes);
    } catch (err) {
      console.error(err.message);
    }
  }

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
      setUsers(await requestAllUsers(""));
    } catch (err) {
      setError(err);
    };
  };

  async function sync() {
    // if(syncing){
    //   setSyncError("Sync already in progress.")
    //   throw new Error();
    // }
    // setSyncing(true);
    const res = await fetch("/api/v1/sync", { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-csrf-token': localStorage.getItem('csrf-token') } });
    if (res.status !== 204) {
      const body = await res.json();
      setSyncError(body.message || "Sync failed.")
      // setSyncing(false);
      throw new Error("sync failed");
    }
    // setSyncing(false);
  };

  function toastSync() {
    toast.promise(sync(), { loading: 'Syncing...', success: 'Synced successfully!', error: syncError });
  }

  return (
    <EnumsContext.Provider value={{ countries, userTypes, userStatuses }}>
      <IconsContext.Provider value={{ TrashIcon, EditIcon, ExitIcon, UsersIcon, GroupsIcon, RefreshIcon, HomeIcon }}>
        <UsersContext.Provider value={{ users, setUsers, getUsers }}>
          <GroupsContext.Provider value={{ groups, setGroups, getGroups }}>
            <Toaster position='bottom-left' />
            <header style={{ display: 'flex', gap: '10px' }}>
              <Link to="/"><img src={PocketLogo} style={{ width: '36px', height: '48px' }}></img></Link>
              <h3 style={{ marginLeft: '8px' }}>Pocket Identity Directory</h3>

              <button style={{ marginLeft: 'auto', width: '3.2rem' }} onClick={() => toastSync()}>Sync</button>
              <a href='/do/logout'><button style={{ padding: '0px', display: 'flex', background: 'transparent', boxShadow: 'unset' }}><img src={LogoutButton} style={{ width: '30px' }}></img></button></a>
            </header>
            <hr style={{ margin: '0' }} />

            <div style={{ display: 'flex', flexDirection: 'row', height: '85.5vh' }}>
              {currentURL.includes('/Users') || currentURL.includes('/Groups') ? <>
                <div className='site-navigation'>
                  <Link to='/'><img style={{ height: '1.2rem' }} src={HomeIcon} />Home</Link>
                  <Link to='/Users' style={{ borderRight: currentURL.includes('/Users') ? '2px solid #00A1DD' : '', color: currentURL.includes('/Users') ? '#00A1DD' : '' }}><img style={{ height: '1.2rem' }} src={UsersIcon} /><p>Users</p></Link>
                  <Link to='/Groups' style={{ borderRight: currentURL.includes('/Groups') ? '2px solid #00A1DD' : '', color: currentURL.includes('/Groups') ? '#00A1DD' : '' }}><img style={{ height: '1.2rem' }} src={GroupsIcon} /><p>Groups</p></Link>
                </div>
                <hr style={{ margin: '10px', marginTop: '0', marginBottom: '0', height: '85vh' }} /></> : <></>}
              <Routes>
                <Route path='/' element={<HomePage setPage={setCurrentURL} />}></Route>
                <Route path='/Users' element={<UsersPage setPage={setCurrentURL} />}></Route>
                <Route path='/Groups' element={<GroupsPage setPage={setCurrentURL} />}></Route>
                <Route path="/Mobile" element={<MobileErrorPage setPage={setCurrentURL} />}></Route>
                <Route path='*' element={<ErrorPage setPage={setCurrentURL} />}></Route>
              </Routes>
            </div>
          </GroupsContext.Provider>
        </UsersContext.Provider>
      </IconsContext.Provider>
    </EnumsContext.Provider>
  );
}

export default App
