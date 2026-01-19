import { useEffect, useState } from 'react'
import './App.css'
import UsersTable from './components/tables/UsersTable';
import GroupsTable from './components/tables/GroupsTable';

function App() {
  const [areGroupsVisible, setAreGroupsVisible] = useState(false);

  return (
    <>
      <header>
        <h1>Pocket Identity Directory</h1>
      </header>
      <hr />
      <div style={{textAlign: "left", width: "90%", margin: "auto"}}>
        <button style={{border: areGroupsVisible? '#1a1a1a' : 'solid 2px'}} onClick={() => setAreGroupsVisible(false)}>Users</button>
        <button style={{border: areGroupsVisible? 'solid 2px' : '#1a1a1a'}} onClick={() => setAreGroupsVisible(true)}>Groups</button>
      {areGroupsVisible ?
        <GroupsTable></GroupsTable> :
        <UsersTable></UsersTable>
      }
      </div>
    </>
  )
}

export default App
