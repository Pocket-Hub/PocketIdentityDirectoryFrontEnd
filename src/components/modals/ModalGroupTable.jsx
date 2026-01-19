import { useState } from "react";

function ModalGroupTable({ closeModal, updateUser, userId, groups }) {
    const [grps, setGrps] = useState(groups);
    const [selectedItems, setSelectedItems] = useState([]);

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
        })
        let resUser = await res.json();
        updateUser(resUser);
        setGrps(resUser.groups)
        setSelectedItems([]);
    }
    

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
                <button style={{ marginLeft: 'auto' }} onClick={unassignGroups}>Unassign</button>
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
                    {grps.map(group => (
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
