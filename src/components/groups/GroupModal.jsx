import { useContext, useEffect, useState } from "react";
import GroupModalContent from "./GroupModalContent";
import { GroupsContext } from "../../App";
import ModalUserTable from "./ModalUserTable";
import Loading from "../Loading";
import EditGroupContent from "./EditGroupContent";
import DeleteResource from "../modals/DeleteResource";
import toast from 'react-hot-toast'
import TrashIcon from '../../assets/trash.png'
import EditIcon from '../../assets/edit.png'
import CloseIcon from '../../assets/exit.png'
import ErrorModal from "../modals/ErrorModal";

function GroupModal({ groupId, onClose }) {
  const { groups, setGroups } = useContext(GroupsContext);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editGroup, setEditGroup] = useState(null);
  const [deleteResource, setDeleteResource] = useState(false);
  if (!groupId) return;


  useEffect(() => {
    if (!groupId) return;

    async function fetchGroup() {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/groups/${groupId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Failed to fetch group");
        setGroup(json);
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
      });
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      if (res.status != 204) {
        toast.error(`Failed to delete ${group.name} :(`);
      } else {
        toast.success(`${group.name} Deleted!`);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete group.");
    }

    setLoading(false);
  }

  if (loading) return <Loading pos={'fixed'} />;

  if (error) return <ErrorModal close={() => setError(null)} message={error.message} />;

  if (!group) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-frame" style={{ overflow: 'unset' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <h2 style={{ margin: '0', width: 'fit-content' }}>
            {group.name} <br />
            <p style={{ margin: '0', color: '#556b82', fontSize: '1rem' }}>{group.id}</p>
          </h2>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <div style={{ marginLeft: 'auto' }}>
              <button style={{ background: 'transparent' }} className="modal-button" onClick={onClose}>
                <img src={CloseIcon} style={{ height: '1rem', width: '1rem' }}></img>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
              <button style={{ background: 'transparent' }} onClick={() => setDeleteResource(true)}>
                <img src={TrashIcon} style={{ height: '1rem', width: '1rem' }}></img>
              </button>

              <button className="modal-button" onClick={() => setEditGroup(group)} style={{ background: 'transparent' }}><img src={EditIcon} style={{ height: '1rem', width: '1rem' }}></img></button>

            </div>
          </div>
          <br />
        </div>

        <div style={{ overflowY: 'auto' }}>
          {editGroup && <EditGroupContent group={group} close={() => setEditGroup(null)}></EditGroupContent>}
          <GroupModalContent group={group} />
          <ModalUserTable groupId={groupId} />

        </div>
        {deleteResource && <DeleteResource confirm={deleteGroup} cancel={() => setDeleteResource(false)}></DeleteResource>}
      </div>
    </div>
  );
}

export default GroupModal;
