import { useContext, useEffect, useState } from 'react'
import "../../styles/Tables.css"
import { GroupsContext } from '../../App';
import GroupModal from '../groups/GroupModal';


function GroupsTable() {
  const [groupId, setGroupId] = useState(null);
  const {groups, setGroups} = useContext(GroupsContext);

  return (
    <div style={{overflowY: 'auto'}}>
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
            <tr className='hover-tr' key={group.id} onClick={() => setGroupId(group.id)}>
              <td>{group.id}</td>
              <td>{group.displayName}</td>
              <td>{group.name}</td>
              <td>{group.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {groupId && <GroupModal groupId={groupId} onClose={() => setGroupId(null)}></GroupModal>}
    </div>
  );
}


export default GroupsTable;