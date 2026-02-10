import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { IconsContext, UsersContext } from "../../App";
import { deleteUser, getSpecificUser, saveUser } from "../../requests/usersRequests";
import "../../styles/Modals.css";
import Loading from "../Loading";
import DeleteResource from "../modals/DeleteResource";
import ErrorModal from "../modals/ErrorModal";
import EditUserContent from "./contents/EditUserContent";
import UserModalContent from "./contents/UserModalContent";
import ModalGroupTable from "./contents/ModalGroupTable";

export const EditUserContext = createContext(null);


function UserModal({ userId, onClose }) {
  const { TrashIcon, EditIcon, ExitIcon } = useContext(IconsContext);
  const { users, setUsers } = useContext(UsersContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(false);
  const [deleteResource, setDeleteResource] = useState(false);
  const [groupsVisible, setGroupsVisible] = useState(false);
  const [loadingEditForm, setLoadingEditForm] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [loginName, setLoginName] = useState(null);
  const [type, setType] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [validFrom, setValidFrom] = useState(null);
  const [validTo, setValidTo] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!userId) return;

    async function getUser() {
      setLoading(true);
      setError(null);

      try {
        const fetchedUser = await getSpecificUser(userId);
        setUser(fetchedUser);

        setEmail(fetchedUser.email ?? '');
        setName({
          firstName: fetchedUser.name?.firstName ?? '',
          lastName: fetchedUser.name?.lastName ?? '',
        });
        setLoginName(fetchedUser.loginName ?? '');
        setType(fetchedUser.type ?? '');
        setCompanyInfo({
          company: fetchedUser.companyInfo?.company ?? '',
          country: fetchedUser.companyInfo?.country ?? '',
          city: fetchedUser.companyInfo?.city ?? '',
        });
        setValidFrom(fetchedUser.validFrom ?? '');
        setValidTo(fetchedUser.validTo ?? '');
        setStatus(fetchedUser.status ?? '');

      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [userId, users]);


  async function deleteSelectedUser() {
    if (!user) return;
    setLoading(true);

    try {
      const res = await deleteUser(user.id);
      if (res != 204) {
        toast.error(`Failed to delete ${user.email} :(`)
      } else {
        toast.success(`User: ${user.email} Deleted!`);
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      }
      onClose();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  async function updateUser() {
    setLoadingEditForm(true);

    if (!name.firstName) {
      setName({ lastName: name.lastName })
    }

    const requestBody = { email, name, loginName, type, companyInfo, status, validFrom: !validFrom || validFrom.trim() === "" ? null : new Date(validFrom).toISOString(), validTo: !validTo || validTo.trim() === "" ? null : new Date(validTo).toISOString() };

    try {
      const resUser = await saveUser(requestBody, userId);
      console.log(requestBody);
      setUsers(users.map(u => u.id == resUser.id ? resUser : u))
      setEditUser(null);
    } catch (err) {
      toast.error(err.message, {
        position: 'top-center'
      })
    }

    setLoadingEditForm(false);
  }

  if (loading) return <Loading pos={'fixed'} />;

  if (error) return <ErrorModal close={() => setError(null)} message={error.message} />

  function showGroups() {
    setGroupsVisible(true);
    closeEdit();
  }
  function showEdit() {
    setEditUser(user);
    setGroupsVisible(false);
  }

  function closeEdit() {
    setEmail(user.email ?? '');
    setName({
      firstName: user.name?.firstName ?? '',
      lastName: user.name?.lastName ?? '',
    });
    setLoginName(user.loginName ?? '');
    setType(user.type ?? '');
    setCompanyInfo({
      company: user.companyInfo?.company ?? '',
      country: user.companyInfo?.country ?? '',
      city: user.companyInfo?.city ?? '',
    });
    setValidFrom(user.validFrom ?? '');
    setValidTo(user.validTo ?? '');
    setStatus(user.status ?? '');
    setEditUser(null);
  }

  if (!user) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-frame" style={{ width: '40vw', height: '85vh' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingBottom: '3px' }}>
            <h2 style={{ margin: '0', width: 'fit-content' }}>
              {user.email} <br />
              <p style={{ margin: '0', color: '#556b82', fontSize: '1rem' }}>{user.id}</p>
            </h2>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <div style={{ marginLeft: 'auto' }}>
                <button style={{ background: 'transparent' }} className="modal-button" onClick={onClose}>
                  <img src={ExitIcon} style={{ height: '1rem', width: '1rem' }}></img>
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                {editUser ? <button style={{ padding: '3px' }} className="modal-button" onClick={updateUser}>Save</button> : <button style={{ background: 'transparent' }} onClick={() => setDeleteResource(true)}>
                  <img src={TrashIcon} style={{ height: '1rem', width: '1rem' }}></img>
                </button>
                }
                {editUser ? <button className="modal-button" onClick={closeEdit} style={{ padding: '3px' }}>Close</button>
                  :
                  <button className="modal-button" onClick={showEdit} style={{ background: 'transparent' }}><img src={EditIcon} style={{ height: '1rem', width: '1rem' }}></img></button>
                }
              </div>
            </div>
            <br />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <p className="modal-selection" style={{ borderBottom: groupsVisible ? '' : '2px solid #00A1DD', color: groupsVisible ? '' : '#00A1DD' }} onClick={() => setGroupsVisible(false)}>User Info</p>
            <p className="modal-selection" style={{ borderBottom: groupsVisible ? '2px solid #00A1DD' : '', color: groupsVisible ? '#00A1DD' : '' }} onClick={showGroups}>Groups</p>
          </div>
        </div>
        <hr style={{ width: '99%', margin: '0', marginTop: '5px' }} />
        <div style={{ overflowY: 'auto', overflowX: 'unset', height: '100%' }}>
          {editUser ?
            <EditUserContext.Provider
              value={{
                email,
                setEmail,
                name,
                setName,
                loginName,
                setLoginName,
                type,
                setType,
                companyInfo,
                setCompanyInfo,
                validFrom,
                setValidFrom,
                validTo,
                setValidTo,
                status,
                setStatus,
              }}
            >
              <EditUserContent user={editUser} onClose={() => setEditUser(null)} updateUser={updateUser} loading={loadingEditForm} setLoading={setLoadingEditForm} />
            </EditUserContext.Provider> :
            <>
              {groupsVisible ? <ModalGroupTable
                user={user}
                setUser={setUser}
              /> :
                <UserModalContent user={user} />}
              {deleteResource && <DeleteResource confirm={deleteSelectedUser} cancel={() => setDeleteResource(false)}></DeleteResource>}
            </>
          }</div>
      </div>
    </div>
  );
}

export default UserModal;
