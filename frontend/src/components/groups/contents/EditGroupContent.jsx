import { useContext } from "react";
import { EditGroupsContext } from "../GroupModal";
import Loading from "../../Loading";


function EditGroupContent({ loading, setLoading, save }) {
    const { name, setName, displayName, setDisplayName, description, setDescription } = useContext(EditGroupsContext)

    async function submitForm(e) {
        setLoading(true);
        e.preventDefault();
        await save();
        setLoading(false);
    }

    return (
        <form className="content-container" style={{ flexDirection: 'column', height: '25vh', gap: '15px', margin: '0' }} onSubmit={submitForm}>
            {loading ? <Loading pos={'relative'}></Loading> : <>
                <div style={{ display: 'flex', gap: '10vw' }}>
                    <label htmlFor="name">
                        <span className="label-text">Name:</span><br />
                        <input
                            style={{ width: '100%' }}
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
                        <input
                            style={{ width: '100%' }}
                            required
                            id="displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            autoFocus
                        />
                    </label>
                </div>

                <label htmlFor="description">
                    <strong>Description:</strong><br />
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '98%', whiteSpace: 'pre-line', overflowY: 'auto', minHeight: 'unset' }}
                        rows="2"
                        maxLength="255"
                    />
                </label>
                <button style={{ display: 'none' }} type="submit"></button>
            </>}
        </form>
    );
}

export default EditGroupContent;