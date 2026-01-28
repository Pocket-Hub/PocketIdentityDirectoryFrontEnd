import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../App";
import Loading from "../components/Loading";
import UserModal from "../components/users/UserModal";
import AddUser from "../components/modals/AddUser";
import Refresh from "../assets/refresh.png"


function UsersPage({ setPage }) {
    const { users, setUsers } = useContext(UsersContext);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [addUser, setAddUser] = useState(false);
    const [status, setStatus] = useState("");
    const [userType, setUserType] = useState("");
    const [lastName, setLastName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [error, setError] = useState(null);


    useEffect(() => {
        getUsers();
        setPage(window.location.href)
    }, [])


    async function getUsers() {
        setLoading(true);

        const params = { status, userType, lastName, groupName };

        const searchParams = new URLSearchParams(
            Object.entries(params).filter(
                ([_, value]) => value !== undefined && value !== null && value.trim() !== ""
            )
        );

        try {
            let res = await fetch("/api/v1/users?" + searchParams.toString());
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            };
            let json = await res.json();
            setUsers(json.resources);
        } catch (err) {
            setError(err);
            console.log(err);
        };
        setLoading(false);
    };

    function handleSubmit(e) {
        e.preventDefault();
        getUsers();
    }

    function deleteIasUser(id) {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
    };

    return (
        <div className="home-table">
            <div style={{ display: 'flex', padding: '1%', height: '4%', flexDirection: 'column' }}>
                <form onSubmit={handleSubmit} className="search-div">
                    <h3 style={{ margin: '0', alignContent: 'center' }}>Users({users.length})</h3>
                    <input value={userType} onChange={(e) => setUserType(e.target.value)} placeholder="User Type..."></input>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name..."></input>
                    <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Member of Group..."></input>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} style={{color: status == ""? '#999': ''}}>
                        <option value=''>Status...</option>
                        <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                        <option value='new'>New</option>
                    </select>
                    <button type="button" onClick={() => setAddUser(true)} style={{ width: '3rem', marginLeft: 'auto' }}>Add</button>
                    <button type="submit" style={{ marginLeft: '0.5rem', height: '1.5rem', width: '1.5rem', background: 'transparent', color: 'black' }}><img style={{height: '1.5rem'}} src={Refresh}></img></button>
                </form>
                <hr style={{width: '100%'}}/>
            </div>
            <div style={{ overflowY: 'auto', height: '92%', borderRadius: '8px' }}>
                {loading ? <Loading /> :
                    <>
                        {userId && <UserModal userId={userId} onClose={() => setUserId(null)} onDelete={deleteIasUser}></UserModal>}
                        {loading && <Loading pos={'relative'}></Loading>}
                        {error ? <h1>There was an error, please try again!</h1> :
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Login Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr className='hover-tr' key={user.id} onClick={() => setUserId(user.id)}>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.loginName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                    </>}
            </div>
            {addUser && <AddUser close={() => setAddUser(false)}></AddUser>}
        </div>
    );
}

export default UsersPage;