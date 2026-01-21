import { useContext, useState } from "react";
import Loading from "../Loading";
import { GroupsContext } from "../../App";
import AssignUsers from "./AssignUsers";


function ModalUserTable({ groupId }) {
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const { groups, setGroups } = useContext(GroupsContext);
    const [group, setGroup] = useState(groups.find(g => g.id === groupId))
    const [assign, setAssign] = useState(null);

    async function unassignMembers() {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/api/v1/groups/${groupId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "remove",
                    users: selectedItems
                })
            });

            if (!res.ok) {
                throw new Error('Server returned an error');
            }

            const resGroup = await res.json();

            updateGroup(resGroup);
            setSelectedItems([]);
        } catch (err) {
            console.error('Fetch failed:', err);
        } finally {
            setLoading(false);
        }
    }

    function updateGroup(grp) {
        setGroups(prev => prev.map(prevGroup =>
            prevGroup.id === grp.id ? grp : prevGroup
        ));
        setGroup(grp);
    }

    function handleCheckBoxChange(e) {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedItems([...selectedItems, value]);
        } else {
            setSelectedItems(selectedItems.filter(item => item !== value));
        }
    };

    function handleCheckAllBoxes(e) {
        if (e.target.checked) {
            setSelectedItems(group.members?.map(user => user.id.toString()));
        } else {
            setSelectedItems([]);
        }
    };

    const allSelected = group.members?.length > 0 && selectedItems.length === group.members?.length;

    return (
        <div style={{ height: '50%' }}>
            {loading && <Loading></Loading>}
            {assign && <AssignUsers update={updateGroup} close={() => setAssign(false)} groupId={groupId}></AssignUsers>}
            <div style={{ display: 'flex' }}>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Members</h2>
                <button className="modal-button" style={{ marginLeft: 'auto' }} onClick={() => setAssign(group.id)}>Assign</button>
                <button className="modal-button" disabled={selectedItems.length == 0} style={{ marginLeft: '10px' }} onClick={() => unassignMembers()}>Unassign</button>
            </div>
            <div className="content-container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input className="check-box"
                                    type="checkbox"
                                    checked={allSelected}
                                    onChange={handleCheckAllBoxes}
                                />
                            </th>
                            <th>ID</th>
                            <th>Display Name</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {group.members?.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <input className="check-box"
                                        type="checkbox"
                                        value={user.id}
                                        checked={selectedItems.includes(user.id.toString())}
                                        onChange={handleCheckBoxChange}
                                    />
                                </td>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModalUserTable;