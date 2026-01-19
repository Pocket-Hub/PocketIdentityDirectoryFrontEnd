import { useContext, useEffect, useState } from 'react'
import "../../styles/Tables.css"
import UserModal from '../modals/UserModal';
import Loading from '../Loading';
import { UsersContext } from '../../App';

function UsersTable() {
  const {users, setUsers} = useContext(UsersContext);
  const [iasUser, setIasUser] = useState(null);


  function close() {
    setIasUser(null);
  }

  function deleteIasUser(id) {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== id))
  }

  console.log(users);

  return (
    <div>
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
            <tr key={user.id} onClick={() => setIasUser(user)}>
              <td>{user.id}</td>
              <td>{user.name.firstName}</td>
              <td>{user.name.lastName}</td>
              <td>{user.email}</td>
              <td>{user.loginName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal user={iasUser} onClose={close} onDelete={deleteIasUser}></UserModal>
    </div>
  );
}


export default UsersTable;