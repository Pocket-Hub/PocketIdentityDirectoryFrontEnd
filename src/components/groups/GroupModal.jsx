import { useContext, useEffect, useState } from "react";
import GroupModalContent from "./GroupModalContent";
import { GroupsContext } from "../../App";
import ModalUserTable from "./ModalUserTable";
import Loading from "../Loading";

function GroupModal({ groupId, onClose }) {
    if (!groupId) return;
  const { groups, setGroups } = useContext(GroupsContext);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      } finally {
        setLoading(false);
      }
    }

    fetchGroup();
  }, [groupId, groups]);

  async function deleteGroup() {
    if (!group) return;

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
  }

  if (loading) return <Loading />;

  if (error) return null;

  if (!group) return null;

  return (
    <div className="modal-backdrop">
      <div>
        <div className="modal-frame" style={{ borderTopLeftRadius: "8px" }}>
          <GroupModalContent group={group} />
          <ModalUserTable groupId={groupId} />
        </div>

        <div className="buttons-div" style={{ alignSelf: "center" }}>
          <button className="modal-button" onClick={deleteGroup}>Delete</button>
          <button className="modal-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default GroupModal;
