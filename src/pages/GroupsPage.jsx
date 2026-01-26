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
    const [name, setName] = useState("");
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        getGroups();
    }, [])

    async function getGroups() {
        setLoading(true);

        const params = { name, displayName }

        const searchParams = new URLSearchParams(
            Object.entries(params).filter(
                ([_, value]) => value !== undefined && value !== null && value !== ""
            )
        );

        try {
            let res = await fetch("http://localhost:8080/api/v1/groups?" + searchParams.toString());
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

    function handleSubmit(e) {
        e.preventDefault();
        getGroups();
    }

    if (loading) return (
        <div className='home-table'>
            <Loading position={'relative'} />
        </div>
    )




    return (
        <div className='home-table'>
            <div style={{ display: 'flex', padding: '0.5rem' }}>
                <button onClick={() => setAddGroup(true)}>Add</button>
                <form onSubmit={handleSubmit} className="search-div">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..."></input>
                    <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name..."></input>
                    <button type="submit" style={{ marginLeft: 'auto' }}>↺</button>
                </form>
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