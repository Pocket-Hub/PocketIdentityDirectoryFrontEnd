import { useContext, useEffect, useState } from 'react'
import "../../styles/Tables.css"
import Loading from '../Loading';
import { GroupsContext } from '../../App';


function GroupsTable() {
  const {groups, setGroups} = useContext(GroupsContext);

  return (
    <div>
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
            <tr className='hover-tr' key={group.id}>
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