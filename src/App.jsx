import { createContext, useEffect, useState } from 'react'
import './App.css'
import UsersTable from './components/tables/UsersTable';
import GroupsTable from './components/tables/GroupsTable';
import Loading from './components/Loading';

export const UsersContext = createContext({users: [], setUsers: () => {}});
export const GroupsContext = createContext({groups: [], setGroups: () => {}});


function App() {
  const [areGroupsVisible, setAreGroupsVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUsers() {
      setLoading(true);

      try {
        let res = await fetch("http://localhost:8080/api/v1/users");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let json = await res.json();
        setUsers(json.resources);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);

    }
    async function getGroups() {
      setLoading(true);

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
      setLoading(false);
    }
    getUsers();
    getGroups();

  }, [])



  return (
    <UsersContext.Provider value={{users, setUsers}}>
      <GroupsContext.Provider value={{groups, setGroups}}>
        {loading && <Loading></Loading>}
        <header>
          <h1>Pocket Identity Directory</h1>
        </header>
        <hr />
        <div style={{ textAlign: "left", width: "90%", margin: "auto" }}>
          <button style={{ border: areGroupsVisible ? '#1a1a1a' : 'solid 2px' }} onClick={() => setAreGroupsVisible(false)}>Users</button>
          <button style={{ border: areGroupsVisible ? 'solid 2px' : '#1a1a1a' }} onClick={() => setAreGroupsVisible(true)}>Groups</button>
          {areGroupsVisible ?
            <GroupsTable></GroupsTable> :
            <UsersTable></UsersTable>
          }
        </div>
      </GroupsContext.Provider>
    </UsersContext.Provider>
  )
}

export default App
