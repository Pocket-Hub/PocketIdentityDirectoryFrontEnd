import { useContext, useState } from "react";
import { UsersContext } from "../../App";
import Loading from "../Loading";

function AddUser({ close }) {
    const { users, setUsers } = useContext(UsersContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState({ firstName: "", lastName: "" });
    const [loginName, setLoginName] = useState("");
    const [userType, setUserType] = useState("");
    const [companyInfo, setCompanyInfo] = useState({ company: "", country: "", city: "" });
    const [validFrom, setValidFrom] = useState("");
    const [validTo, setValidTo] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);


    async function submitForm(e) {
        e.preventDefault();
        const requestBody = {
            email,
            name,
            loginName,
            userType,
            companyInfo,
            validFrom,
            validTo,
            status
        };

        setLoading(true);
        const res = await fetch("http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })

        const user = await res.json();
        setUsers([...users, user]);
        setLoading(false);
        close();
    }

    return (
        <div className="modal-backdrop">
            {loading && <Loading></Loading>}
            <form className="create-user-form" onSubmit={submitForm}>
                <div className="modal-frame" style={{ justifyContent: "center", borderTopLeftRadius: '8px' }}>
                    <div className="content-container">
                        <div className="content-container">
                            <div className="modal-content">
                                <h2 style={{ marginBottom: 0, marginTop: 0 }}>User Profile</h2>
                                <label htmlFor="email">
                                    <strong>Email:</strong><br />
                                    <input
                                        required
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="firstName">
                                    <strong>First Name:</strong><br />
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={name.firstName}
                                        onChange={(e) => setName({ ...name, firstName: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="lastName">
                                    <strong>Last Name:</strong><br />
                                    <input
                                        required
                                        id="lastName"
                                        type="text"
                                        value={name.lastName}
                                        onChange={(e) => setName({ ...name, lastName: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="loginName">
                                    <strong>Login Name:</strong><br />
                                    <input
                                        required
                                        id="loginName"
                                        type="text"
                                        value={loginName}
                                        onChange={(e) => setLoginName(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="status">
                                    <strong>Status:</strong><br />
                                    <input
                                        required
                                        id="status"
                                        type="text"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="userType">
                                    <strong>User Type:</strong><br />
                                    <input
                                        required
                                        id="userType"
                                        type="text"
                                        value={userType}
                                        onChange={(e) => setUserType(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div className="modal-content">
                                <h2 style={{ marginBottom: 0, marginTop: 0 }}>Additional Info</h2>
                                <label htmlFor="company">
                                    <strong>Company:</strong><br />
                                    <input
                                        id="company"
                                        type="text"
                                        value={companyInfo.company}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, company: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="country">
                                    <strong>Country:</strong><br />
                                    <input
                                        id="country"
                                        type="text"
                                        value={companyInfo.country}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, country: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="city">
                                    <strong>City:</strong><br />
                                    <input
                                        id="city"
                                        type="text"
                                        value={companyInfo.city}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="validFrom">
                                    <strong>Valid From:</strong><br />
                                    <input
                                        id="validFrom"
                                        type="text"
                                        value={validFrom}
                                        onChange={(e) => setValidFrom(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="validTo">
                                    <strong>Valid To:</strong><br />
                                    <input
                                        id="validTo"
                                        type="text"
                                        value={validTo}
                                        onChange={(e) => setValidTo(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttons-div">
                    <button className="modal-button" type="submit">
                        Create
                    </button>
                    <button className="modal-button" type="button" onClick={close}>
                        Close
                    </button>
                </div>
            </form>
        </div>

    );

}

export default AddUser;