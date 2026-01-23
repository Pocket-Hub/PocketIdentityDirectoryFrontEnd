import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../App";
import Loading from "../components/Loading";
import UserModal from "../components/users/UserModal";
import AddUser from "../components/modals/AddUser";


function UsersPage() {
    const { users, setUsers } = useContext(UsersContext);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [addUser, setAddUser] = useState(false);


    useEffect(() => {
        getUsers();
    }, [])


    async function getUsers() {
        setLoading(true);
        try {
            let res = await fetch("http://localhost:8080/api/v1/users");
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

    function deleteIasUser(id) {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
    };

    if (loading) return (
        <div className='home-table'>
            <Loading position={'relative'} />
        </div>
    );

    return (
        <div className="home-table">
            <div style={{ display: 'flex', padding: '0.5rem' }}><button onClick={() => setAddUser(true)}>Add</button><button style={{ marginLeft: 'auto' }} onClick={() => getUsers()}>refresh</button></div>
            <hr style={{ margin: '0' }} />
            {userId && <UserModal userId={userId} onClose={() => setUserId(null)} onDelete={deleteIasUser}></UserModal>}
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
                            <td>{user.name.firstName}</td>
                            <td>{user.name.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.loginName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {addUser && <AddUser close={() => setAddUser(false)}></AddUser>}
        </div>
    );
}

export default UsersPage;