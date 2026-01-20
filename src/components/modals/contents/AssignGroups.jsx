import { useContext, useState } from "react";
import { GroupsContext, UsersContext } from "../../../App";

function AssignGroups({ update, userId, close }) {
    if (!userId) return;
    const [selectedItems, setSelectedItems] = useState([]);
    const { users, setUsers } = useContext(UsersContext);
    const { groups, setGroups } = useContext(GroupsContext);
    const [user, setUser] = useState(users.find(u => u.id === userId))
    const userGroups = user?.groups ?? [];
    const displayGroups = groups.filter(
        g => !userGroups.some(ug => ug.id === g.id)
    );

    async function assign() {
        const res = await fetch(`http://localhost:8080/api/v1/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                action: "add",
                groups: selectedItems
            })
        });
        let resUser = await res.json();
        update(resUser)
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
            setSelectedItems(displayGroups.map(group => group.id.toString()));
        } else {
            setSelectedItems([]);
        }
    };

    const allSelected = displayGroups.length > 0 && selectedItems.length === displayGroups.length;

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
                                <th>Display Name</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayGroups.map(group => (
                                <tr key={group.id}>
                                    <td>
                                        <input className="check-box"
                                            type="checkbox"
                                            value={group.id}
                                            checked={selectedItems.includes(group.id.toString())}
                                            onChange={handleCheckBoxChange}
                                        />
                                    </td>
                                    <td>{group.id}</td>
                                    <td>{group.displayName}</td>
                                    <td>{group.name}</td>
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


export default AssignGroups;