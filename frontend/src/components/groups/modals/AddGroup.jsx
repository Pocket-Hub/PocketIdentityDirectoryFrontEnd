import { useContext, useState } from "react";
import { GroupsContext, IconsContext } from "../../../App";
import Loading from "../../Loading";
import toast from "react-hot-toast";


function AddGroup({ close }) {
    const { ExitIcon } = useContext(IconsContext);
    const { groups, setGroups } = useContext(GroupsContext);
    const [name, setName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function submitForm(e) {
        e.preventDefault();

        const requestBody = {
            name,
            displayName,
            description
        };

        setLoading(true);

        try {
            const res = await fetch("/api/v1/groups", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'x-csrf-token': localStorage.getItem('csrf-token')
                },
                body: JSON.stringify(requestBody)
            })

            const group = await res.json();
            if (res.status >= 400) throw new Error(group.message || "Failed to create group!")
            setGroups([...groups, group]);
            toast.success(`Group ${name} created!`)
            close();
        } catch (err) {
            toast.error(err.message, {
                position: 'top-center'
            })
            setError(err);
        } finally {
            setLoading(false);

        }
    }

    return (

        <div className="modal-backdrop">
            <div className="modal-frame" style={{ paddingTop: '0', overflowY: 'unset', height: '60vh' }}>
                {loading ? <div style={{ marginTop: '20px', height: '100%' }}><Loading /></div> :
                    <form className="create-user-form" onSubmit={submitForm}>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <h2 style={{ marginTop: '0', marginBottom: '0px', width: 'fit-content' }}>Create Group</h2>
                            <button type="button" style={{ marginLeft: 'auto', background: 'transparent' }} onClick={close}><img src={ExitIcon} style={{ height: '1rem', width: '1rem' }}></img></button>
                        </div>
                        <hr style={{ width: '99%', margin: '0' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', width: '99%', overflowX: 'clip' }}>
                            <div className="content-container" style={{ marginTop: '2rem', overflow: 'unset' }}>
                                <div className="modal-content">
                                    <label htmlFor="name" style={{ display: '' }}>
                                        <span className="label-text">Name:</span><br />
                                        <input style={{ width: '100%' }}
                                            required
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoFocus
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
                                        maxLength="255"
                                    />
                                </label>
                            </div>
                        </div>
                        <button className="modal-button" type="submit">
                            Create
                        </button>
                    </form>}
            </div>

        </div >

    );
}


export default AddGroup;