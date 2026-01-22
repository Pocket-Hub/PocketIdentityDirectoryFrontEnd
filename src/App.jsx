import { createContext, useEffect, useState } from 'react'
import './App.css'
import UsersTable from './components/tables/UsersTable';
import GroupsTable from './components/tables/GroupsTable';
import Loading from './components/Loading';
import AddUser from './components/modals/AddUser';

export const UsersContext = createContext({ users: [], setUsers: () => { } });
export const GroupsContext = createContext({ groups: [], setGroups: () => { } });


function App() {
  const [areGroupsVisible, setAreGroupsVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addUser, setAddUser] = useState(false);
  const [addGroup, setAddGroup] = useState(false);

  async function getGroups() {
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
  };

  async function getUsers() {
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
  };

  async function sync() {
    setLoading(true);
    const res = await fetch("http://localhost:8080/api/v1/sync", { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) setError("Something went wrong!");
    setLoading(false);
    getUsers();
    getGroups();
  };

  async function refresh() {
    await getUsers();
    await getGroups();
  };

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      <GroupsContext.Provider value={{ groups, setGroups }}>
        <header style={{ display: 'flex' }}>
          <h1>Pocket Identity Directory</h1>
          <div className='buttons-div' style={{ marginLeft: 'auto', height: '20%' }}>
            <button className='modal-button' onClick={() => sync()}>Sync</button>
            <button className='modal-button' onClick={() => refresh()}>Refresh</button>
          </div>
        </header>
        <hr />
        <div style={{ textAlign: "left", width: "90%", margin: "auto" }}>
          <div style={{ display: 'flex', gap: '2%' }}>
            <div style={{width: '50%'}}>
              <button style={{ marginLeft: 'auto' }} onClick={() => setAddUser(true)}>Add User</button>
            </div>
            <div style={{width: '50%'}}>
              <button style={{ marginLeft: 'auto' }} onClick={() => setAddGroup(true)}>Add Group</button></div>
          </div>
          <div className='home-table-div'>
            <UsersTable getUsers={getUsers}></UsersTable>
            <GroupsTable getGroups={getGroups}></GroupsTable>
          </div>
          {addUser && <AddUser close={() => setAddUser(false)}></AddUser>}
        </div>
      </GroupsContext.Provider>
    </UsersContext.Provider>
  );
}

export default App
