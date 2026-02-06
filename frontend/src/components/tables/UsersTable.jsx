import { useContext, useEffect, useState } from 'react'
import "../../styles/Tables.css"
import UserModal from '../users/UserModal';
import { UsersContext } from '../../App';
import Loading from '../Loading';

function UsersTable({getUsers, loading}) {
  const {users, setUsers} = useContext(UsersContext);
  const [iasUser, setIasUser] = useState(null);

  function close() {
    setIasUser(null);
  };

  function deleteIasUser(id) {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
  };

  if (loading) return(
    <div className='home-table'>
      <Loading/>
    </div>
  );

  return (
    <div className='home-table'>
      {iasUser? <UserModal userId={iasUser} onClose={close} onDelete={deleteIasUser}></UserModal>:
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Login Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr className='hover-tr' key={user.id} onClick={() => setIasUser(user.id)}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.loginName}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}


export default UsersTable;