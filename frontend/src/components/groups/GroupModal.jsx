import { createContext, useContext, useEffect, useState } from "react";
import GroupModalContent from "./contents/GroupModalContent";
import { GroupsContext, IconsContext } from "../../App";
import Loading from "../Loading";
import DeleteResource from "../modals/DeleteResource";
import toast from 'react-hot-toast'
import ErrorModal from "../modals/ErrorModal";
import EditGroupContent from "./contents/EditGroupContent";
import ModalUserTable from "./contents/ModalUserTable";

export const EditGroupsContext = createContext({ name: '', setName: () => { }, displayName: '', setDisplayName: () => { }, description: '', setDescription: () => { } })

function GroupModal({ groupId, onClose }) {
  const { TrashIcon, EditIcon, ExitIcon } = useContext(IconsContext);
  const { groups, setGroups } = useContext(GroupsContext);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editGroup, setEditGroup] = useState(null);
  const [deleteResource, setDeleteResource] = useState(false);
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [description, setDescription] = useState('');
  const [loadingEditForm, setLoadingEditForm] = useState(false);
  if (!groupId) return;


  useEffect(() => {
    if (!groupId) return;

    async function fetchGroup() {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/groups/${groupId}`);

        if (res.status == 404) {
          window.location.redirect("/not-found");
        }

        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Failed to fetch group");
        setGroup(json);
        setName(json.name);
        setDisplayName(json.displayName);
        setDescription(json.description);
      } catch (err) {
        setError(err);
        console.log("error: " + error)
        setGroup(null);
      } finally {
        setLoading(false);
      }
    }

    fetchGroup();
  }, [groupId, groups]);

  async function deleteGroup() {
    if (!group) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/groups/${groupId}`, {
        method: "DELETE",
        headers: {
          'x-csrf-token': localStorage.getItem('csrf-token')
        }
      });
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      if (res.status != 204) {
        toast.error(`Failed to delete ${group.name} :(`);
      } else {
        toast.success(`Group: ${group.name} Deleted!`);
      }
      onClose();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  function closeEdit() {
    setName(group.name);
    setDisplayName(group.displayName);
    setDescription(group.description);
    setEditGroup(null);
  }

  async function save() {
    setLoadingEditForm(true);

    const requestBody = { name, displayName, description };

    try {
      const res = await fetch(`/api/v1/groups/${groupId}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'x-csrf-token': localStorage.getItem('csrf-token')
        },
        body: JSON.stringify(requestBody
        )
      });
      const resGroup = await res.json();
      if (!res.ok) throw new Error(resGroup.message || "Failed to edit group!")
      setGroups(groups.map(g => g.id == resGroup.id ? resGroup : g));

      setEditGroup(null);
    } catch (err) {
      toast.error(err.message, {
        position: 'top-center'
      })
    }

    setLoadingEditForm(false);
  }

  if (loading) return <Loading pos={'fixed'} />;

  if (error) return <ErrorModal close={() => setError(null)} message={error.message} />;

  if (!group) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-frame" style={{ overflow: 'unset', height: '85vh', width: '40vw' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <h2 style={{ margin: '0', width: 'fit-content' }}>
            {group.name} <br />
            <p style={{ margin: '0', color: '#556b82', fontSize: '1rem' }}>{group.id}</p>
          </h2>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <div style={{ marginLeft: 'auto' }}>
              <button style={{ background: 'transparent' }} className="modal-button" onClick={onClose}>
                <img src={ExitIcon} style={{ height: '1rem', width: '1rem' }}></img>
              </button>
            </div>
            {editGroup ?
              <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>

                <button onClick={save}>
                  Save
                </button>

                <button className="modal-button" onClick={closeEdit}>
                  Cancel
                </button>
              </div>
              :
              <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>

                <button style={{ background: 'transparent' }} onClick={() => setDeleteResource(true)}>
                  <img src={TrashIcon} style={{ height: '1rem', width: '1rem' }}></img>
                </button>

                <button className="modal-button" onClick={() => setEditGroup(group)} style={{ background: 'transparent' }}>
                  <img src={EditIcon} style={{ height: '1rem', width: '1rem' }}></img>
                </button>
              </div>}
          </div>
          <br />
        </div>

        <div style={{ overflowY: 'auto', height: '75vh' }}>
          {editGroup ? <EditGroupsContext value={{ name, setName, displayName, setDisplayName, description, setDescription }}><EditGroupContent loading={loadingEditForm} setLoading={setLoadingEditForm} save={save}></EditGroupContent></EditGroupsContext> :
            <GroupModalContent group={group} />}
          <ModalUserTable groupId={groupId} />
        </div>
        {deleteResource && <DeleteResource confirm={deleteGroup} cancel={() => setDeleteResource(false)}></DeleteResource>}
      </div>
    </div>
  );
}

export default GroupModal;
