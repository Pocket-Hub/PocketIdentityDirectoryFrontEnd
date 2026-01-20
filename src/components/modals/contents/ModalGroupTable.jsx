import { useContext, useState } from "react";
import { GroupsContext, UsersContext } from "../../../App";
import Loading from "../../Loading";

function ModalGroupTable({ userId }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const {users, setUsers} = useContext(UsersContext);
    const [user, setUser] = useState(users.find(u => u.id ===userId));
    const [loading, setLoading] = useState(false);

    function updateUser(user){
        setUsers(prev => prev.map(prevUser => 
            prevUser.id === user.id? user : prevUser
        ));
        setUser(user);
    }

    async function unassignGroups(){
        setLoading(true);
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
        setLoading(false);
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
            setSelectedItems(user.groups?.map(group => group.id.toString()));
        } else {
            setSelectedItems([]);
        }
    };

    const allSelected = user.groups?.length > 0 && selectedItems.length === user.groups?.length;

    return (
        <div>
            {loading && <Loading></Loading>}
            <div style={{ display: 'flex' }}>
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Groups</h2>
                <button className="modal-button" style={{ marginLeft: 'auto' }}>Assign</button>
                <button className="modal-button" disabled={selectedItems.length == 0} style={{marginLeft: '10px'}} onClick={unassignGroups}>Unassign</button>
            </div>
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
                    {user.groups?.map(group => (
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
    );
};

export default ModalGroupTable;
