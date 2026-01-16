


function UsersTable({users}){

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