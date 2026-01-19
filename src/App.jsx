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
        <button style={{backgroundColor: areGroupsVisible? '#1a1a1a' : 'rgb(123, 123, 123)'}} onClick={() => setAreGroupsVisible(false)}>Users</button>
        <button style={{backgroundColor: areGroupsVisible? 'rgb(123, 123, 123)' : '#1a1a1a'}} onClick={() => setAreGroupsVisible(true)}>Groups</button>
      {areGroupsVisible ?
        <GroupsTable></GroupsTable> :
        <UsersTable></UsersTable>
      }
      </div>
    </>
  )
}

export default App
