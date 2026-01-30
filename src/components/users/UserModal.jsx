import { useContext, useEffect, useState } from "react";
import "../../styles/Modals.css";
import ModalGroupTable from "./ModalGroupTable";
import { UsersContext } from "../../App";
import UserModalContent from "./UserModalContent";
import Loading from "../Loading";
import EditUserContent from "./EditUserContent";
import DeleteResource from "../modals/DeleteResource";
import toast from 'react-hot-toast'
import TrashIcon from '../../assets/trash.png'
import EditIcon from '../../assets/edit.png'
import CloseIcon from '../../assets/exit.png'
import ErrorModal from "../modals/ErrorModal";

function UserModal({ userId, onClose }) {
  const { users, setUsers } = useContext(UsersContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(false);
  const [deleteResource, setDeleteResource] = useState(false);
  const [groupsVisible, setGroupsVisible] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function getUser() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/v1/users/${userId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Failed to fetch user");
        setUser(json);
      } catch (err) {
        setError(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [userId, users]);

  async function deleteUser() {
    if (!user) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/v1/users/${user.id}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      if (res.status != 204) {
        toast.error(`Failed to delete ${user.email} :(`)
      } else {
        toast.success(`${user.email} Deleted!`);
      }
      onClose();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  function reverseProp(func) {
    func();
  }

  if (loading) return <Loading pos={'fixed'} />;

  if (error) return <ErrorModal close={() => setError(null)} message={error.message} />

  function showGroups() {
    setGroupsVisible(true);
    setEditUser(null);
  }
  function showEdit() {
    setEditUser(user);
    setGroupsVisible(false);
  }

  if (!user) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-frame" style={{ width: '40vw' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <h2 style={{ margin: '0', width: 'fit-content' }}>
              {user.email} <br />
              <p style={{ margin: '0', color: '#556b82', fontSize: '1rem' }}>{user.id}</p>
            </h2>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <div style={{ marginLeft: 'auto' }}>
                <button style={{ background: 'transparent' }} className="modal-button" onClick={onClose}>
                  <img src={CloseIcon} style={{ height: '1rem', width: '1rem' }}></img>
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                {editUser ? <></> : <button style={{ background: 'transparent' }} onClick={() => setDeleteResource(true)}>
                  <img src={TrashIcon} style={{ height: '1rem', width: '1rem' }}></img>
                </button>
                }
                {editUser ? <button className="modal-button" onClick={() => setEditUser(null)}>Exit</button>
                  :
                  <button className="modal-button" onClick={showEdit} style={{ background: 'transparent' }}><img src={EditIcon} style={{ height: '1rem', width: '1rem' }}></img></button>
                }
              </div>
            </div>
            <br />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <p className="modal-selection" style={{ backgroundColor: groupsVisible ? '' : 'rgb(196, 196, 196)' }} onClick={() => setGroupsVisible(false)}>User Info</p>
            <p className="modal-selection" style={{ backgroundColor: groupsVisible ? 'rgb(196, 196, 196)' : '' }} onClick={showGroups}>Groups</p>
          </div>
        </div>
        <hr style={{ width: '99%', margin: '0', marginTop: '5px' }} />
        <div style={{ overflowY: 'auto' }}>
          {editUser ? <EditUserContent user={editUser} close={() => setEditUser(null)} reverseProp={reverseProp} /> : <>

            {groupsVisible ? <ModalGroupTable
              groups={user.groups ?? []}
              closeModal={onClose}
              iasUser={user}
            /> :
              <UserModalContent user={user} />}
            {deleteResource && <DeleteResource confirm={deleteUser} cancel={() => setDeleteResource(false)}></DeleteResource>}
          </>
          }</div>
      </div>
    </div>
  );
}

export default UserModal;
