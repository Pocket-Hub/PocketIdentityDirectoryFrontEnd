import { useContext, useState } from "react";
import { GroupsContext } from "../../App";
import Loading from "../Loading";
import ExitIcon from "../../assets/exit.png"
import toast from "react-hot-toast";


function EditGroupContent({ group, close }) {
    const { groups, setGroups } = useContext(GroupsContext);
    const [name, setName] = useState(group.name);
    const [displayName, setDisplayName] = useState(group.displayName);
    const [description, setDescription] = useState(group.description ?? '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function submitForm(e) {
        setLoading(true);
        e.preventDefault();

        const requestBody = {
            name,
            displayName,
            description
        };

        try {

            const res = await fetch(`/api/v1/groups/${group.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })

            const resGroup = await res.json();
            if (res.status >= 400) throw new Error(resGroup.message || "Failed to edit group!")
            setGroups(groups.map(g => g.id == resGroup.id ? resGroup : g));
            close();
        } catch (err) {
            toast.error(err.message, {
                position: 'top-center'
            })
            setError(err);
        }
        setLoading(false);
    }

    if (loading) return <Loading pos={'relative'}></Loading>

    return (
        <div className="modal-backdrop">

            <div className="modal-frame" style={{ paddingTop: '0', overflowY: 'unset', height: '40vh', width: '40vw' }}>
                <form className="create-user-form" onSubmit={submitForm}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <h2 style={{ marginTop: '0', marginBottom: '0px', width: 'fit-content' }}>Edit Group</h2>
                        <button type="button" style={{ marginLeft: 'auto', background: 'transparent' }} onClick={close}><img src={ExitIcon} style={{ height: '1rem', width: '1rem' }}></img></button>
                    </div>
                    <hr style={{ width: '99%', margin: '0' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', width: '99%' }}>

                        <div className="content-container" style={{ marginTop: '2rem', overflow: 'unset' }}>
                            <div className="modal-content">
                                <label htmlFor="name" style={{ display: '' }}>
                                    <span className="label-text">Name:</span><br />
                                    <input style={{ width: '100%' }}
                                        disabled
                                        required
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="modal-content">
                                <label htmlFor="displayName">
                                    <span className="label-text">Display Name:</span><br />
                                    <input style={{ width: '100%' }}
                                        required
                                        id="displayName"
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        autoFocus
                                    />
                                </label>
                            </div>

                        </div>
                        <div style={{ width: '100%', marginTop: '2rem' }}>
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
                    <button className="modal-button" type="submit">
                        Save
                    </button>
                </form>
            </div>

        </div >
    );
}

export default EditGroupContent;