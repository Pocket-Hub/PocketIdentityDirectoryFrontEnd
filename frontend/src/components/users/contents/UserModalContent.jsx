// import { countryOptions } from "../../../data/countryOptions";


function UserModalContent({ user }) {

    return (
        <div className="content-container" style={{ marginTop: '0' }}>
            <div className="users-info">
                <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>User Profile</h3>
                <label><strong>Email:</strong></label>
                <p>{user.email}</p>
                <label><strong>First Name:</strong></label>
                <p>{user.name.firstName}</p>
                <label><strong>Last Name:</strong></label>
                <p>{user.name.lastName}</p>
                <label><strong>Login Name:</strong></label>
                <p>{user.loginName}</p>
                <label><strong>Status:</strong></label>
                <p>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</p>
                <label><strong>User Type:</strong></label>
                <p>{user.type.charAt(0).toUpperCase() + user.type.slice(1)}</p>
            </div>
            <div className="users-info">
                <div>
                    <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>Additional Info</h3>
                    <div>
                        <label><strong>Company:</strong></label>
                        <p>{user.companyInfo?.company ?? ""}</p>
                        <label><strong>Country:</strong></label>
                        <p>{user.companyInfo?.country}</p>
                        <label><strong>City:</strong></label>
                        <p>{user.companyInfo?.city ?? ""}</p>
                    </div>
                    <div>
                        <label><strong>Valid From:</strong></label>
                        <p>
                            {user.validFrom ?
                                `${user.validFrom.substring(5, 7)}/${user.validFrom.substring(8, 10)}/${user.validFrom.substring(0, 4)}` : ''}
                        </p>

                        <label><strong>Valid To:</strong></label>
                        <p>
                            {user.validTo ?
                                `${user.validTo.substring(5, 7)}/${user.validTo.substring(8, 10)}/${user.validTo.substring(0, 4)}` : ''}
                        </p>

                        <label><strong>Version:</strong></label>
                        <p>{user.version}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default UserModalContent;