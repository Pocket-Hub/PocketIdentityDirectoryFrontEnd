import { useState } from "react";
import "../../styles/Modals.css"
import ModalGroupTable from "./modalGroupTable";


function UserModal({ user, onClose, onDelete, setUser }) {
    if (!user) return null;
    const [areGroupsVisible, setAreGroupsVisible] = useState(false);

    async function deleteUser() {
        const res = await fetch(`http://localhost:8080/api/v1/users/${user.id}`, {
            method: 'DELETE'
        });
        onDelete(user.id);
        onClose();
    }

    return (
        <div className="modal-backdrop">
            <div>
                <div>
                    <button style={{ border: areGroupsVisible ? '#1a1a1a' : 'solid 2px' }} onClick={() => setAreGroupsVisible(false)}>Profile</button>
                    <button style={{ border: areGroupsVisible ? 'solid 2px' : '#1a1a1a' }} onClick={() => setAreGroupsVisible(true)}>Groups</button>

                </div>
                <div className="modal">
                    {areGroupsVisible ?
                        <div>
                            <ModalGroupTable groups={user.groups} closeModal={onClose} userId={user.id}></ModalGroupTable>
                        </div>
                        :
                        <div style={{ display: 'flex' }}>
                            <div className="modal-content">
                                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>User Profile</h2>
                                <p style={{ marginTop: "0px", color: "darkgrey" }}>{user.id}</p>
                                <label><strong>Email:</strong></label>
                                <p>{user.email}</p>
                                <label><strong>First Name:</strong></label>
                                <p>{user.name.firstName}</p>
                                <label><strong>Last Name:</strong></label>
                                <p>{user.name.lastName}</p>
                                <label><strong>Login Name:</strong></label>
                                <p>{user.loginName}</p>
                                <label><strong>Status:</strong></label>
                                <p>{user.status}</p>
                                <label><strong>User Type:</strong></label>
                                <p>{user.type}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '8vw' }}>
                                <div>
                                    <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Company Info</h2>
                                    <div className="modal-content">
                                        <label><strong>Company:</strong></label>
                                        <p>{user.companyInfo?.company ?? "none"}</p>
                                        <label><strong>Country:</strong></label>
                                        <p>{user.companyInfo?.country ?? "none"}</p>
                                        <label><strong>City:</strong></label>
                                        <p>{user.companyInfo?.city ?? "none"}</p>
                                    </div>
                                    <hr />
                                    <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Meta</h2>
                                    <div>
                                        <label><strong>Valid From:</strong></label>
                                        <p>{user.validFrom}</p>
                                        <label><strong>Valid To:</strong></label>
                                        <p>{user.validTo}</p>
                                        <label><strong>Last Updated:</strong></label>
                                        <p>{user.lastUpdate}</p>
                                    </div>

                                </div>


                            </div>

                        </div>
                    }
                    <div className="modal-actions">
                        <button className="modal-button" onClick={deleteUser}>Delete</button>
                        <button className="modal-button" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserModal;