import { useState } from "react";
import "../../styles/Modals.css"
import Loading from "../Loading";


function UserModal({ user, onClose }) {
  if (!user) return null;
  const [loading, setLoading] = useState(false);

  async function deleteUser(){
    setLoading(true);
    const res = await fetch(`http://localhost:8080/api/v1/users/${user.id}`, {
      method: 'DELETE'
    });
    setLoading(false);
    onClose();
  }

  if (loading) return <Loading></Loading>

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 style={{marginBottom: "0px", marginTop: "0px"}}>User Profile</h2>
        <p style={{marginTop: "0px", color: "darkgrey"}}>{user.id}</p>
        <div className="modal-content">
            <p>{user.email}</p>
            <p>{user.name.firstName}</p>
            <p>{user.name.lastName}</p>
            <p>{user.loginName}</p>
            <p>{user.status}</p>
            <p>{user.type}</p>
            <p>{user.validFrom}</p>
            <p>{user.validTo}</p>
            <p>{user.lastUpdate}</p>
        </div>
        <div className="modal-actions">
          <button className="modal-button" onClick={deleteUser}>Delete</button>
          <button className="modal-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default UserModal;