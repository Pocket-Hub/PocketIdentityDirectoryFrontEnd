import { useContext, useEffect, useState } from "react";
import { GroupsContext } from "../App";
import Loading from "../components/Loading";
import GroupModal from "../components/groups/GroupModal"
import AddGroup from "../components/modals/AddGroup";
import Refresh from "../assets/refresh.png"



function GroupsPage({ setPage }) {
    const [groupId, setGroupId] = useState(null);
    const { groups, setGroups } = useContext(GroupsContext);
    const [loading, setLoading] = useState(false);
    const [addGroup, setAddGroup] = useState(false);
    const [name, setName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        getGroups();
        setPage(window.location.href)
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
            let res = await fetch("/api/v1/groups?" + searchParams.toString());
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

    return (
        <div className="home-table">
            <div style={{ display: 'flex', padding: '1%', height: '4%', flexDirection: 'column' }}>
                <form onSubmit={handleSubmit} className="search-div">
                    <h3 style={{ margin: '0', alignContent: 'center' }}>Groups({groups.length})</h3>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..."></input>
                    <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display Name..."></input>
                    <button type="button" onClick={() => setAddGroup(true)} style={{ width: '3rem', marginLeft: 'auto' }}>Add</button>
                    <button type="submit" style={{ marginLeft: '0.5rem', height: '1.5rem', width: '1.5rem', background: 'transparent', color: 'black' }}><img style={{height: '1.5rem'}} src={Refresh}></img></button>
                </form>
                <hr style={{ width: '100%' }} />
            </div>

            <div style={{ overflowY: 'auto', height: '92%', borderRadius: '8px' }}>

                {groupId && <GroupModal groupId={groupId} onClose={() => setGroupId(null)}></ GroupModal>}
                {loading ? <Loading pos={'relative'} /> :
                    <>
                        {error ? <h1>Error</h1> :
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
                            </table>}
                    </>}
                {addGroup && <AddGroup close={() => setAddGroup(false)}></AddGroup>}
            </div>
        </div>
    );
}


export default GroupsPage;