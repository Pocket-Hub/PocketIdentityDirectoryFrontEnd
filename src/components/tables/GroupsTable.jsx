import { useContext, useEffect, useState } from 'react'
import "../../styles/Tables.css"
import { GroupsContext } from '../../App';
import GroupModal from '../groups/GroupModal';
import Loading from '../Loading';


function GroupsTable({getGroups}) {
  const [groupId, setGroupId] = useState(null);
  const {groups, setGroups} = useContext(GroupsContext);
  const [loading, setLoading] = useState(false);

  async function refreshGroups() {
    setLoading(true);
    await getGroups();
    setLoading(false);
  }

  useEffect(() => {
    refreshGroups();
  }, [])

  if (loading) return(
    <div className='home-table'>
      <Loading/>
    </div>
  );


  return (
    <div className='home-table'>
      {groupId? <GroupModal groupId={groupId} onClose={() => setGroupId(null)}></GroupModal> : 
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Display Name</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr className='hover-tr' key={group.id} onClick={() => setGroupId(group.id)}>
              <td>{group.id}</td>
              <td>{group.displayName}</td>
              <td>{group.name}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}


export default GroupsTable;