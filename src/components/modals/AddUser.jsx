import { useContext, useState } from "react";
import { UsersContext } from "../../App";
import Loading from "../Loading";
import { countryOptions } from "../../data/countryOptions";




function AddUser({ close }) {
    const { users, setUsers } = useContext(UsersContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState({ firstName: "", lastName: "" });
    const [loginName, setLoginName] = useState("");
    const [userType, setUserType] = useState("public");
    const [companyInfo, setCompanyInfo] = useState({ company: "", country: "", city: "" });
    const [validFrom, setValidFrom] = useState("");
    const [validTo, setValidTo] = useState("");
    const [loading, setLoading] = useState(false);


    async function submitForm(e) {
        e.preventDefault();

        const requestBody = {
            email,
            name,
            loginName,
            userType,
            companyInfo,
            validFrom: !validFrom || validFrom.trim() === "" ? null : new Date(validFrom).toISOString(),
            validTo: !validTo || validTo.trim() === "" ? null : new Date(validTo).toISOString(),
        };

        setLoading(true);
        const res = await fetch("http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const user = await res.json();
        setUsers([...users, user]);
        setLoading(false);
        close();
    }

    if (loading) return (
        <div className="home-table">
            <Loading></Loading>
        </div>
    );

    return (
        <div className="home-table">
            <form className="create-user-form" onSubmit={submitForm}>
                <div className="content-container">
                    <div className="content-container">
                        <div className="modal-content">
                            <h2 style={{ marginBottom: 0, marginTop: 0, alignSelf: 'center' }}>Create User</h2>
                            <label htmlFor="email">
                                <span class="label-text">Email:</span><br />
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
                                <span class="label-text">Last Name:</span><br />
                                <input
                                    required
                                    id="lastName"
                                    type="text"
                                    value={name.lastName}
                                    onChange={(e) => setName({ ...name, lastName: e.target.value })}
                                />
                            </label>
                            <label htmlFor="loginName">
                                <span class="label-text">Login Name:</span><br />
                                <input
                                    required
                                    id="loginName"
                                    type="text"
                                    value={loginName}
                                    onChange={(e) => setLoginName(e.target.value)}
                                />
                            </label>
                            <label htmlFor="userType">
                                <strong>User Type:</strong><br />
                                <select
                                    required
                                    id="userType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                >
                                    <option value="public">Public</option>
                                    <option value="employee">Employee</option>
                                    <option value="customer">Customer</option>
                                    <option value="partner">Partner</option>
                                    <option value="external">External</option>
                                    <option value="onboardee">Onboardee</option>
                                    <option value="alumni">Alumni</option>
                                </select>
                            </label>
                        </div>

                        <div className="modal-content">
                            <h2 style={{ marginBottom: 0, marginTop: 0, alignSelf: 'center' }}>Additional Info</h2>
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
                                <select
                                    id="country"
                                    value={companyInfo.country}
                                    onChange={(e) => setCompanyInfo({ ...companyInfo, country: e.target.value })}
                                >
                                    {countryOptions.map((country) => (
                                        <option key={country.value} value={country.value}>
                                            {country.label}
                                        </option>
                                    ))}
                                </select>
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
                                    type="date"
                                    value={validFrom}
                                    onChange={(e) => setValidFrom(e.target.value)}
                                />
                            </label>
                            <label htmlFor="validTo">
                                <strong>Valid To:</strong><br />
                                <input
                                    id="validTo"
                                    type="date"
                                    value={validTo}
                                    onChange={(e) => setValidTo(e.target.value)}
                                />
                            </label>
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