import { createContext, useEffect, useState } from 'react'
import './App.css'
import UsersTable from './components/tables/UsersTable';
import GroupsTable from './components/tables/GroupsTable';
import Loading from './components/Loading';
import AddUser from './components/modals/AddUser';
import AddGroup from './components/modals/AddGroup';

export const UsersContext = createContext({ users: [], setUsers: () => { }, getUsers: () => { } });
export const GroupsContext = createContext({ groups: [], setGroups: () => { }, getGroups: () => { } });


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

  useEffect(() => {
    getUsers();
    getGroups();
  }, [])

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
    <UsersContext.Provider value={{ users, setUsers, getUsers }}>
      <GroupsContext.Provider value={{ groups, setGroups, getGroups }}>
        <header style={{ display: 'flex' }}>
          <img src='src/assets/PocketFavIcon.png' style={{width: '36px', height: '48px'}}></img>
          <h3 style={{marginLeft: '8px'}}>Pocket Identity Directory</h3>
          {/* <div className='buttons-div' style={{ marginLeft: 'auto', height: '20%' }}>
            <button className='modal-button' onClick={() => sync()}>Sync</button>
            <button className='modal-button' onClick={() => refresh()}>Refresh</button>
          </div> */}
        </header>
        <hr />
        {loading ? <Loading /> :
          <div style={{ textAlign: "left", width: "90%", margin: "auto" }}>
            <div style={{ display: 'flex', gap: '2%', marginBottom: '4px' }}>
              <div style={{ width: '50%' }}>
                <button style={{ marginLeft: 'auto' }} onClick={() => setAddUser(true)}>Add User</button>
              </div>
              <div style={{ width: '50%' }}>
                <button style={{ marginLeft: 'auto' }} onClick={() => setAddGroup(true)}>Add Group</button></div>
            </div>
            <div className='home-table-div'>
              {addUser ? <AddUser close={() => setAddUser(false)}></AddUser> : <UsersTable getUsers={getUsers} loading={loadingUsers}></UsersTable>}
              {addGroup ? <AddGroup close={() => setAddGroup(false)}></AddGroup> : <GroupsTable getGroups={getGroups} loading={loadingGroups}></GroupsTable>}
            </div>
          </div>}
      </GroupsContext.Provider>
    </UsersContext.Provider>
  );
}

export default App
