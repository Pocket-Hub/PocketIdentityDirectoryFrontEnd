


function GroupsTable({groups}){

    return (
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
  );
}


export default GroupsTable;