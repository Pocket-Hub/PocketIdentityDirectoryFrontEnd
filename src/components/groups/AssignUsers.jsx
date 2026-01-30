import { useContext, useEffect, useState } from "react";
import { GroupsContext, UsersContext } from "../../App";
import Loading from "../Loading";
import ErrorModal from "../modals/ErrorModal";

function AssignUsers({ update, groupId, close }) {
    if (!groupId) return;
    const [selectedItems, setSelectedItems] = useState([]);
    const { users, getUsers } = useContext(UsersContext);
    const { groups } = useContext(GroupsContext);
    const [group, setGroup] = useState(groups.find(g => g.id === groupId))
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const groupMembers = group?.members ?? [];
    const displayUsers = users.filter(
        u => !groupMembers.some(gm => gm.id === u.id)
    );

    useEffect(() => {
        setLoading(true);
        getUsers();
        setLoading(false);
    }, [])

    async function assign() {
        setLoading(true);

        try {
            const res = await fetch(`/api/v1/groups/${groupId}`, {
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
            if (!res.ok) throw new Error(resGroup.message || "Failed to fetch");
            update(resGroup)
            setSelectedItems([]);
        } catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
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
            {error && <ErrorModal close={() => setError(null)} message={error.message} />}
            <div className="modal-frame" style={{ height: '40vh', width: '35vw', padding: '0' }}>
                <h2 style={{ marginBottom: '1rem', marginTop: '1rem', alignSelf: 'center', width: 'fit-content' }}>Assign Members</h2>
                <hr style={{ margin: '0' }} />
                {loading ? <Loading /> :
                    <div className="content-container" style={{ width: '100%', margin: '0', marginBottom: 'auto', flexDirection: 'column' }}>
                        <table style={{ width: '100%' }}>
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
                                        <td>{user.lastName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {displayUsers.length == 0 && <h2 style={{ justifySelf: 'center', alignSelf: 'center', width: 'fit-content' }}>No Users to Assign</h2>}

                    </div>}
                <div className="buttons-div" style={{ marginTop: '5px', alignSelf: 'center', justifySelf: 'center', padding: '1rem' }}>
                    <button disabled={selectedItems.length == 0} className="modal-button" onClick={assign}>Assign</button>
                    <button className="modal-button" onClick={close}>Close</button>
                </div>
            </div>

        </div >
    );
}


export default AssignUsers;