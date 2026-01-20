import { useContext, useState } from "react";
import "../../styles/Modals.css"
import ModalGroupTable from "./contents/ModalGroupTable";
import { UsersContext } from "../../App";
import UserModalContent from "./contents/UserModalContent";


function UserModal({ userId, onClose }) {
    if (!userId) return null;
    const [areGroupsVisible, setAreGroupsVisible] = useState(false);
    const { users, setUsers } = useContext(UsersContext);
    const [user, setUser] = useState(users.find(u => u.id === userId));

    async function deleteUser() {
        const res = await fetch(`http://localhost:8080/api/v1/users/${user.id}`, {
            method: 'DELETE'
        });
        setUsers(prev => prev.filter(u => u.id !== userId))
        onClose();
    }

    return (
        <div className="modal-backdrop">
            <div>
                <div>
                    <button style={{ border: areGroupsVisible ? '#1a1a1a' : 'solid 2px' }} onClick={() => setAreGroupsVisible(false)}>Profile</button>
                    <button style={{ border: areGroupsVisible ? 'solid 2px' : '#1a1a1a' }} onClick={() => setAreGroupsVisible(true)}>Groups</button>

                </div>
                <div className="modal-frame">
                    {areGroupsVisible ?
                        <ModalGroupTable groups={user.groups} closeModal={onClose} userId={user.id}></ModalGroupTable>
                        :
                        <UserModalContent user={user}></UserModalContent>
                    }
                    <div className="buttons-div" style={{alignSelf: 'center'}}>
                        <button className="modal-button" onClick={deleteUser}>Delete</button>
                        <button className="modal-button" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserModal;