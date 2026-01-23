import { useContext, useEffect, useState } from "react";
import { GroupsContext } from "../App";
import Loading from "../components/Loading";
import GroupModal from "../components/groups/GroupModal"
import AddGroup from "../components/modals/AddGroup";



function GroupsPage() {
    const [groupId, setGroupId] = useState(null);
    const { groups, setGroups } = useContext(GroupsContext);
    const [loading, setLoading] = useState(false);
    const [addGroup, setAddGroup] = useState(false);

    useEffect(() => {
        getGroups();
    }, [])

    async function getGroups() {
        setLoading(true);
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
    };

    if (loading) return (
        <div className='home-table'>
            <Loading position={'relative'} />
        </div>
    )




    return (
        <div className='home-table'>
            <div style={{ display: 'flex', padding: '0.5rem' }}><button onClick={() => setAddGroup(true)}>Add</button><button style={{ marginLeft: 'auto' }} onClick={() => getGroups()}>refresh</button>
            </div>
            <hr style={{ margin: '0' }} />
            {groupId && <GroupModal groupId={groupId} onClose={() => setGroupId(null)}></ GroupModal>}
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
                </table>
                {addGroup && <AddGroup close={() => setAddGroup(false)}></AddGroup>}
        </div>
    );
}


export default GroupsPage;