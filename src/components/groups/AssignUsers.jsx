import { useContext, useState } from "react";
import { GroupsContext, UsersContext } from "../../App";

function AssignUsers({ update, groupId, close }) {
    if (!groupId) return;
    const [selectedItems, setSelectedItems] = useState([]);
    const { users, setUsers } = useContext(UsersContext);
    const { groups, setGroups } = useContext(GroupsContext);
    const [group, setGroup] = useState(groups.find(g => g.id === groupId))
    const groupMembers = group?.members ?? [];
    const displayUsers = users.filter(
        u => !groupMembers.some(gm => gm.id === u.id)
    );

    async function assign() {
        const res = await fetch(`http://localhost:8080/api/v1/groups/${groupId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                action: "add",
                users: selectedItems
            })
        });
        let resGroup = await res.json();
        update(resGroup)
        setSelectedItems([]);
        close();
    };

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
            setSelectedItems(displayUsers.map(user => user.id.toString()));
        } else {
            setSelectedItems([]);
        }
    };

    const allSelected = displayUsers.length > 0 && selectedItems.length === displayUsers.length;

    return (
        <div className="modal-backdrop" >
            <div className="modal-frame" style={{ height: '20vh', width: '35vw', borderTopLeftRadius: '8px'}}>
                <div className="content-container" style={{width: '100%'}}>
                    <table style={{width: '100%'}}>
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
                                <th>Email</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayUsers.map(user => (
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
                                    <td>{user.name.lastName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="buttons-div" style={{marginTop: '5px'}}>
                    <button disabled={selectedItems.length == 0} className="modal-button" onClick={assign}>Assign</button>
                    <button className="modal-button" onClick={close}>Close</button>
                </div>
        </div >
    );
}


export default AssignUsers;