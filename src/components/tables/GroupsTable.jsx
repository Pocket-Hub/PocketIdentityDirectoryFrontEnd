import { useEffect, useState } from 'react'
import "../../styles/Tables.css"
import Loading from '../Loading';


function GroupsTable() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      setLoading(false);
    }
    getGroups();

  }, [])

  if (error) {
    return (
      <><h1>Sorry, something went wrong :-/</h1>
        <h2>Try to refresh</h2>
      </>
    );
  }


  return (
    <div>
      {loading && <Loading></Loading>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Display Name</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.displayName}</td>
              <td>{group.name}</td>
              <td>{group.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default GroupsTable;