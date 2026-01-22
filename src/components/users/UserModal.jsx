import { useContext, useEffect, useState } from "react";
import "../../styles/Modals.css";
import ModalGroupTable from "./ModalGroupTable";
import { UsersContext } from "../../App";
import UserModalContent from "./UserModalContent";
import Loading from "../Loading";

function UserModal({ userId, onClose }) {
  const { users, setUsers } = useContext(UsersContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [areGroupsVisible, setAreGroupsVisible] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function getUser() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:8080/api/v1/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const json = await res.json();
        setUser(json);
      } catch (err) {
        console.error(err);
        setError("Failed to load user.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [userId]);

  async function deleteUser() {
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:8080/api/v1/users/${user.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  }

  if (loading) return <Loading />;

  if (error) return (
    <div className="modal-backdrop">
      <div className="modal-frame">
        <p>{error}</p>
        <button onClick={onClose} className="modal-button">Close</button>
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <div style={{padding: '2%'}}>
      <header className="modal-header">
        <h2>{user.name.firstName} {user.name.lastName}</h2>
        <div style={{marginLeft: 'auto',display: 'flex', gap: '10px'}}>
        <button className="modal-button" onClick={deleteUser}>
          Delete
        </button>
        <button className="modal-button" onClick={onClose}>
          Close
        </button>
        </div>
        </header>
      
      <UserModalContent user={user} />
      <ModalGroupTable
        groups={user.groups || []}
        closeModal={onClose}
        userId={user.id}
      />
    </div>
  );
}

export default UserModal;
