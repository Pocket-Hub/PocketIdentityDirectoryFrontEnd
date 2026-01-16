import { useEffect, useState } from 'react'
import './App.css'
import UsersTable from './components/UsersTable';
import GroupsTable from './components/GroupsTable';

function App() {
  const [areGroupsVisible, setAreGroupsVisible] = useState(true);


  return (
    <>
      <header>
        <h1>Pocket Identity Directory</h1>
      </header>
      <hr />
      <div style={{textAlign: "left", width: "90%", margin: "auto"}}>
        <button onClick={() => setAreGroupsVisible(false)}>Users</button>
        <button onClick={() => setAreGroupsVisible(true)}>Groups</button>
      {areGroupsVisible ?
        <GroupsTable></GroupsTable> :
        <UsersTable></UsersTable>
      }
      </div>
    </>
  )
}

export default App
