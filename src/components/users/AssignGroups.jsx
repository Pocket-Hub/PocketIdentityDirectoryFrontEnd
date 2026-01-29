import { useContext, useEffect, useState } from "react";
import { GroupsContext, UsersContext } from "../../App";
import Loading from "../Loading";

function AssignGroups({ update, iasUser, close }) {
    if (!iasUser) return;
    const [selectedItems, setSelectedItems] = useState([]);
    const { users } = useContext(UsersContext);
    const { groups, getGroups } = useContext(GroupsContext);
    const [user, setUser] = useState(iasUser)
    const [loading, setLoading] = useState(false);
    const userGroups = user?.groups ?? [];
    const displayGroups = groups.filter(
        g => !userGroups.some(ug => ug.id === g.id)
    );

    useEffect(() => {
        setLoading(true);
        getGroups();
        setLoading(false);
    }, [])


    async function assign() {
        setLoading(true);
        const res = await fetch(`/api/v1/users/${user.id}`, {
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
        setLoading(false);
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

            <div className="modal-frame" style={{ height: '40vh', width: '35vw', padding: '0' }}>
                <h2 style={{ marginBottom: '1rem', marginTop: '1rem', alignSelf: 'center', width: 'fit-content' }}>Assign Groups</h2>
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
                        {displayGroups.length == 0 && <h2 style={{ justifySelf: 'center', alignSelf: 'center', width: 'fit-content' }}>No Groups to Assign</h2>}
                    </div>}
                <div className="buttons-div" style={{ marginTop: '5px', alignSelf: 'center', justifySelf: 'center', padding: '1rem' }}>
                    <button disabled={selectedItems.length == 0} className="modal-button" onClick={assign}>Assign</button>
                    <button className="modal-button" onClick={close}>Close</button>
                </div>
            </div>

        </div >
    );
}


export default AssignGroups;