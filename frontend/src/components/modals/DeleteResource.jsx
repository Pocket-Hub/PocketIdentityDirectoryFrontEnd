


function DeleteResource({ confirm, cancel }) {


    return (
        <div className="modal-backdrop">
            <div style={{ backgroundColor: 'white', borderRadius: '8px', textAlign: 'center', padding: '1%' }}>
                <h1 style={{ marginTop: '0' }}>Delete Resource</h1>
                <p>Are you sure you want to delete this resource?</p>
                <div style={{display: 'flex', gap: '3px', justifySelf: 'center'}}>
                    <button onClick={() => confirm()} className="delete-button">Confirm</button>
                    <button onClick={() => cancel()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}


export default DeleteResource;