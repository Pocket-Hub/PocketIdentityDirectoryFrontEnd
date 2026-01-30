


function ErrorModal({ close, message }) {
    if (message?.includes("Failed to fetch")) {
        message = "You are offline!"
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-frame" style={{ height: 'fit-content', width: '30vw', alignItems: 'center' }}>
                <h2 style={{ width: 'fit-content' }}>Error!</h2>
                <p style={{ textAlign: 'center', wordBreak: 'break-word', height: 'fit-content' }}>{message}</p>
                <button style={{ marginTop: 'auto' }} onClick={close}>Close</button>
            </div>
        </div>
    );
}


export default ErrorModal;