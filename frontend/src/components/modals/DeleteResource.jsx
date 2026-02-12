


function DeleteResource({ confirm, cancel }) {


    return (
        <div className="modal-backdrop">
            <div style={{ backgroundColor: 'white', borderRadius: '8px', textAlign: 'center', padding: '1%' }}>
                <h2 style={{ margin: '0', width: 'unset' }}>Delete Resource</h2>
                <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>Are you sure you want to delete this resource?</p>
                <div style={{ display: 'flex', gap: '3px', justifySelf: 'center' }}>
                    <button onClick={() => confirm()} className="delete-button">Confirm</button>
                    <button onClick={() => cancel()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}


export default DeleteResource;