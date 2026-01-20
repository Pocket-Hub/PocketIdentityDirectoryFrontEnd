import "../../../styles/Modals.css"

function UserModalContent({ user }) {

    return (
        <div className="user-info-modal">
            <div className="users-info">
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>User Profile</h2>
                <p style={{ marginTop: "0px", color: "darkgrey" }}>{user.id}</p>
                <label><strong>Email:</strong></label>
                <p>{user.email}</p>
                <label><strong>First Name:</strong></label>
                <p>{user.name.firstName}</p>
                <label><strong>Last Name:</strong></label>
                <p>{user.name.lastName}</p>
                <label><strong>Login Name:</strong></label>
                <p>{user.loginName}</p>
                <label><strong>Status:</strong></label>
                <p>{user.status}</p>
                <label><strong>User Type:</strong></label>
                <p>{user.type}</p>
            </div>
            <div className="users-info">
                <div>
                    <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Company Info</h2>
                    <div>
                        <label><strong>Company:</strong></label>
                        <p>{user.companyInfo?.company ?? "none"}</p>
                        <label><strong>Country:</strong></label>
                        <p>{user.companyInfo?.country ?? "none"}</p>
                        <label><strong>City:</strong></label>
                        <p>{user.companyInfo?.city ?? "none"}</p>
                    </div>
                    <hr />
                    <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Meta</h2>
                    <div>
                        <label><strong>Valid From:</strong></label>
                        <p>{user.validFrom}</p>
                        <label><strong>Valid To:</strong></label>
                        <p>{user.validTo}</p>
                        <label><strong>Last Updated:</strong></label>
                        <p>{user.lastUpdate}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default UserModalContent;