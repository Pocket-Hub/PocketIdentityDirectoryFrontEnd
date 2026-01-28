import { useContext, useState } from "react";
import { GroupsContext } from "../../App";
import Loading from "../Loading";


function EditGroupContent({ group, close }) {
    const { groups, setGroups } = useContext(GroupsContext);
    const [name, setName] = useState(group.name);
    const [displayName, setDisplayName] = useState(group.displayName);
    const [description, setDescription] = useState(group.description ?? '');
    const [loading, setLoading] = useState(false);

    async function submitForm(e) {
        setLoading(true);
        e.preventDefault();

        const requestBody = {
            name,
            displayName,
            description
        };

        const res = await fetch(`/api/v1/groups/${group.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })

        const resGroup = await res.json();
        setGroups(groups.map(g => g.id == resGroup.id ? resGroup : g));
        setLoading(false);
        close();
    }

    if (loading) return <Loading pos={'relative'}></Loading>

    return (
        <form className="create-user-form" onSubmit={submitForm}>
            <div className="content-container" style={{ width: '80%' }}>
                <div className="modal-content" style={{ width: '100%' }}>
                    <h2 style={{ marginBottom: 0, marginTop: 0, alignSelf: 'center' }}>Edit Group</h2>
                    <label htmlFor="name">
                        <span className="label-text">Name:</span><br />
                        <input className="inactive" style={{ width: '100%' }}
                            disabled
                            required
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="displayName">
                        <span className="label-text">Display Name:</span><br />
                        <input style={{ width: '100%' }}
                            required
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="description">
                        <strong>Description:</strong><br />
                        <textarea
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className="buttons-div">
                <button className="modal-button" type="submit">
                    Save
                </button>
            </div>
        </form>

    );
}

export default EditGroupContent;