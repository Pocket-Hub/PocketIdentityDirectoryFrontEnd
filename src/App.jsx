import { useEffect, useState } from 'react'
import './App.css'
import UsersTable from './components/UsersTable';
import GroupsTable from './components/GroupsTable';

function App() {
  const [areGroupsVisible, setAreGroupsVisible] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUsers() {
      try {
        let res = await fetch("http://localhost:8080/api/v1/users");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let json = await res.json();
        setUsersList(json.resources);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    }
    async function getGroups() {
      try {
        let res = await fetch("http://localhost:8080/api/v1/groups");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        let json = await res.json();
        setGroupsList(json.resources);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    }
    getGroups();
    getUsers();

  }, [])

  if (loading) {
    return (<h1>Loading...</h1>)
  }

  if (error) {
    return (<h1>Sorry, something went wrong :-/</h1>);
  }


  return (
    <>
    <button onClick={() => setAreGroupsVisible(false)}>Users</button>
    <button onClick={() => setAreGroupsVisible(true)}>Groups</button>
      {areGroupsVisible ?
        <GroupsTable groups={groupsList}></GroupsTable> :
        <UsersTable users={usersList}></UsersTable>
      }
    </>
  )
}

export default App
