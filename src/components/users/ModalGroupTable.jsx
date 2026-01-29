import { useContext, useState } from "react";
import { GroupsContext, UsersContext } from "../../App";
import Loading from "../Loading";
import AssignGroups from "./AssignGroups";

function ModalGroupTable({ iasUser, groups }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const { users, setUsers } = useContext(UsersContext);
    const [user, setUser] = useState(iasUser);
    const [assign, setAssign] = useState(null);
    const [loading, setLoading] = useState(false);

    function updateUser(user) {
        setUsers(prev => prev.map(prevUser =>
            prevUser.id === user.id ? user : prevUser
        ));
        setUser(user);
    }

    async function unassignGroups() {
        setLoading(true);
        const res = await fetch(`/api/v1/users/${user.id}`, {
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
            setSelectedItems(groups?.map(group => group.id.toString()));
        } else {
            setSelectedItems([]);
        }
    };

    const allSelected = groups?.length > 0 && selectedItems.length === user.groups?.length;

    if (loading) return <Loading />

    return (
        <div style={{ marginTop: '1rem' }}>
            <AssignGroups update={updateUser} iasUser={assign} close={() => setAssign(null)}></AssignGroups>

            <div style={{ display: 'flex', paddingBottom: '5px', padding: '3px' }}>
                <button className="modal-button" style={{ marginLeft: 'auto' }} onClick={() => setAssign(user)}>Assign</button>
                <button className="modal-button" disabled={selectedItems.length == 0} style={{ marginLeft: '10px' }} onClick={unassignGroups}>Unassign</button>
            </div>
            <div style={{ boxShadow: '1px 3px 5px gray', margin: '3px', borderRadius: '8px', overflow: 'clip', minHeight: '30vh' }}>
                <table >
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
                        {groups?.map(group => (
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
                {groups.length == 0 && <h2 style={{ alignSelf: 'center', justifySelf: 'center', width: 'fit-content' }}>No Assigned Groups</h2>}

            </div>
        </div>
    );
};

export default ModalGroupTable;
