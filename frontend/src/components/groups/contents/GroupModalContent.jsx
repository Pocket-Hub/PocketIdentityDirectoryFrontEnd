

function GroupModalContent({ group }) {

    return (

        <div className="content-container" style={{ flexDirection: 'column', height: '25vh', gap: '15px', margin: '0' }}>
            <div style={{ display: 'flex', gap: '10vw' }}>
                <label><strong>Name:</strong>
                    <p>{group.name}</p></label>
                <label><strong>Display Name:</strong>
                    <p>{group.displayName}</p>
                </label>
            </div>
            <label><strong>Description:</strong>
                <p style={{ height: '3rem', width: '99%', whiteSpace: 'pre-line', overflowY: 'auto', overflowX: 'unset', wordBreak: 'break-word' }}>{group.description}</p>
            </label>
        </div>
    );
}

export default GroupModalContent;