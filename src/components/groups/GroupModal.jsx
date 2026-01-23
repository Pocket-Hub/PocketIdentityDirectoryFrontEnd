import { useContext, useEffect, useState } from "react";
import GroupModalContent from "./GroupModalContent";
import { GroupsContext } from "../../App";
import ModalUserTable from "./ModalUserTable";
import Loading from "../Loading";
import EditGroupContent from "./EditGroupContent";

function GroupModal({ groupId, onClose }) {
    if (!groupId) return;
  const { groups, setGroups } = useContext(GroupsContext);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editGroup, setEditGroup] = useState(null);

  useEffect(() => {
    if (!groupId) return;

    async function fetchGroup() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8080/api/v1/groups/${groupId}`);
        if (!res.ok) throw new Error("Failed to fetch group");
        const json = await res.json();
        setGroup(json);
      } catch (err) {
        console.error(err);
        setError("Failed to load group.");
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
      const res = await fetch(`http://localhost:8080/api/v1/groups/${groupId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete group");
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete group.");
    }
    setLoading(false);
  }

  if (loading) return <Loading />;

  if (error) return null;

  if (!group) return null;

  return (
      <div style={{padding: '2%'}}>
        <header className="modal-header">
        <h2>{group.displayName}</h2>
        <div style={{marginLeft: 'auto',display: 'flex', gap: '10px'}}>
        <button className="delete-button" onClick={deleteGroup}>
          Delete
        </button>
        {editGroup ? <button className="modal-button"  onClick={() => setEditGroup(null)}>Exit</button>
            :
            <button className="modal-button"  onClick={() => setEditGroup(group)}>Edit</button>
          }
        <button className="modal-button" onClick={onClose}>
          Close
        </button>
        </div>
        </header>

        {editGroup? <EditGroupContent group={group} close={() => setEditGroup(null)}></EditGroupContent> : <>
          <GroupModalContent group={group} />
          <hr />
          <ModalUserTable groupId={groupId} />
          </>}
      </div>
  );
}

export default GroupModal;
