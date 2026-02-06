import { useEffect } from "react";



function MobileErrorPage({ setPage }) {

    useEffect(() => {
        setPage(window.location.href)
    }, [])


    return (
        <div className="modal-backdrop" style={{ backgroundColor: 'white' }}>
            <h3 style={{ width: 'fit-content' }}>Sorry, we do not support mobile devices yet.</h3>
        </div>
    );
}

export default MobileErrorPage;