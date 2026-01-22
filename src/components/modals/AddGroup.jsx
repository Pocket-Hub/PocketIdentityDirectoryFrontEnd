import { useContext, useState } from "react";
import { GroupsContext } from "../../App";
import Loading from "../Loading";


function AddGroup({ close }) {
    const { groups, setGroups } = useContext(GroupsContext);
    const [name, setName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    async function submitForm(e) {
        e.preventDefault();

        const requestBody = {
            name,
            displayName,
            description
        };

        setLoading(true);
        const res = await fetch("http://localhost:8080/api/v1/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })

        const group = await res.json();
        setGroups([...groups, group]);
        setLoading(false);
        close();
    }
    
     if(loading) return(
            <div className="home-table">
                <Loading></Loading>
            </div>
        );

    return (

        <div className="home-table">
            <form className="create-user-form" onSubmit={submitForm}>
                    <div className="content-container" style={{ width: '80%' }}>
                        <div className="modal-content" style={{ width: '100%' }}>
                            <h2 style={{ marginBottom: 0, marginTop: 0 }}>Create Group</h2>
                            <label htmlFor="name">
                                <strong>Name:</strong><br />
                                <input style={{width: '100%'}}
                                    required
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label htmlFor="displayName">
                                <strong>Display Name:</strong><br />
                                <input style={{width: '100%'}}
                                    id="displayName"
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                            </label>
                            <label htmlFor="description">
                                <strong>Description:</strong><br />
                                <textarea
                                    required
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
                        Create
                    </button>
                    <button className="modal-button" type="button" onClick={close}>
                        Close
                    </button>
                </div>
            </form>
        </div>

    );
}


export default AddGroup;