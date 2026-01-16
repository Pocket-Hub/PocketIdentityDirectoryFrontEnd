import { useEffect, useState } from 'react'
import "../styles/Tables.css"

function UsersTable(){
  const [users, setUsers] = useState([]);
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
          setUsers(json.resources);
        } catch (err) {
          setError(err);
          console.log(err);
        }
        setLoading(false);
      }
      getUsers();
  
    }, [])

    if (loading) {
    return (<h1>Loading...</h1>)
  }

  if (error) {
    return (
    <><h1>Sorry, something went wrong :-/</h1>
      <h2>Try to refresh</h2>
      </>
    );
  }

    return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Login Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name.firstName}</td>
            <td>{user.name.lastName}</td>
            <td>{user.email}</td>
            <td>{user.loginName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default UsersTable;