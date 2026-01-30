

function GroupModalContent({ group }) {

    return (

        <div className="content-container" style={{ flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '10vw' }}>
                <label><strong>Name:</strong>
                    <p>{group.name}</p></label>
                <label><strong>Display Name:</strong>
                    <p>{group.displayName}</p>
                </label>
            </div>
            <label><strong>Description:</strong>
                <p style={{ height: '3rem', width: '99%', whiteSpace: 'pre-line', overflowY: 'auto' }}>{group.description}</p>
            </label>
        </div>

    );
}

export default GroupModalContent;