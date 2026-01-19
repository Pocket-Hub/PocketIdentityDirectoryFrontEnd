import { useContext, useState } from "react";
import { GroupsContext, UsersContext } from "../../App";

function ModalGroupTable({ groups, updateUser, userId }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const {users, setUsers} = useContext(UsersContext);

    function updateUser(user){
        setUsers(prev => prev.map(prevUser => 
            prevUser.id === user.id? user : prevUser
        ));
    }

    async function unassignGroups(){
        const res = await fetch(`http://localhost:8080/api/v1/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                action: "remove",
                groups: selectedItems
            })
        });
        let resUser = await res.json();
        updateUser(resUser);
        setSelectedItems([]);
    };

    

    function handleCheckBoxChange(e) {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedItems([...selectedItems, value]);
        } else {
            setSelectedItems(selectedItems.filter(item => item !== value));
        }
    }

    function handleCheckAllBoxes(e) {
        if (e.target.checked) {
            setSelectedItems(groups.map(group => group.id.toString()));
        } else {
            setSelectedItems([]);
        }
    }

    const allSelected = groups.length > 0 && selectedItems.length === groups.length;

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Groups</h2>
                <button className="modal-button" style={{ marginLeft: 'auto' }} onClick={unassignGroups}>Assign</button>
                <button className="modal-button" style={{marginLeft: '10px'}} onClick={unassignGroups}>Unassign</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
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
                    {groups.map(group => (
                        <tr key={group.id}>
                            <td>
                                <input
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
    );
}

export default ModalGroupTable;
