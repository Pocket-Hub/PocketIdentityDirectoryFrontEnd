import { countryOptions } from "../../data/countryOptions";
import "../../styles/Modals.css"
import "../../styles/Content.css"

function UserModalContent({ user }) {

    return (
        <div className="content-container" style={{ overflowY: 'unset' }}>
            <div className="users-info">
                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>User Profile</h2>
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
                    <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Additional Info</h2>
                    <div>
                        <label><strong>Company:</strong></label>
                        <p>{user.companyInfo?.company ?? ""}</p>
                        <label><strong>Country:</strong></label>
                        <p>{countryOptions.find(
                            (c) => c.value === user.companyInfo?.country
                        )?.label ?? ""}</p>
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

                        <label><strong>Last Updated:</strong></label>
                        <p>{user.lastUpdate &&
                            `${user.lastUpdate.substring(5, 7)}/${user.lastUpdate.substring(8, 10)}/${user.lastUpdate.substring(0, 4)} - ${user.lastUpdate?.substring(11, 19)}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default UserModalContent;