

function GroupModalContent({ group }) {

    return (

        <div className="content-container" style={{height: '50%'}}>
            <div className="users-info">
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Group Info</h2>
                <p style={{ marginTop: "0px", color: "darkgrey" }}>{group.id}</p>
                <div style={{display: 'flex', gap: '10vw'}}>
                    <label><strong>Name:</strong>
                    <p>{group.name}</p></label>
                    
                    <label><strong>Display Name:</strong>
                    <p>{group.displayName}</p>
                    </label>
                    
                </div>
                <label><strong>Description:</strong></label>
                <p>{group.description}</p>
            </div>
            <div className="users-info">

            </div>
        </div>

    );
}

export default GroupModalContent;