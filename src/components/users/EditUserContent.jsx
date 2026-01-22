import { useContext, useState } from "react";
import { countryOptions } from "../../data/countryOptions";
import { UsersContext } from "../../App";


function EditUserContent({ user, close }) {
    if (!user) return null;
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState({ firstName: user.firstName ?? '', lastName: user.name.lastName });
    const [loginName, setLoginName] = useState(user.loginName);
    const [userType, setUserType] = useState(user.userType);
    const [companyInfo, setCompanyInfo] = useState({ company: user.companyInfo?.company ?? '', country: user.companyInfo?.country ?? '', city: user.companyInfo?.city ?? '' });
    const [validFrom, setValidFrom] = useState(user.validFrom ?? '');
    const [validTo, setValidTo] = useState(user.validTo ?? '');
    const [status, setStatus] = useState(user.status);
    const { users, setUsers } = useContext(UsersContext);

    async function submitForm(e) {
        e.preventDefault();
        const requestBody = {
            email,
            name,
            loginName,
            userType,
            companyInfo,
            status,
            validFrom: !validFrom || validFrom.trim() === "" ? null : new Date(validFrom).toISOString(),
            validTo: !validTo || validTo.trim() === "" ? null : new Date(validTo).toISOString(),
        };
        const res = await fetch(`http://localhost:8080/api/v1/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const resUser = await res.json();
        setUsers(users.map(u => u.id == resUser.id? resUser : u))
        close();
    }

    return (
        <div className="content-container">
            <form className="create-user-form" onSubmit={submitForm}>
                <div className="content-container">
                    <div className="modal-content">
                        <h2 style={{ marginBottom: 0, marginTop: 0 }}>Create User</h2>
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
                        <label htmlFor="userType">
                            <strong>User Type:</strong><br />
                            <select
                                required
                                id="userType"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="public">Public</option>
                            </select>
                        </label>
                        <label htmlFor="status">
                            <strong>Status:</strong><br />
                            <select
                                required
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="new">New</option>
                            </select>
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
                            <select
                                id="country"
                                value={companyInfo.country}
                                onChange={(e) => setCompanyInfo({ ...companyInfo, country: e.target.value })}
                            >
                                <option value=""></option>
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
                                value={validFrom?.substring(0, 10)}
                                onChange={(e) => setValidFrom(e.target.value)}
                            />
                        </label>
                        <label htmlFor="validTo">
                            <strong>Valid To:</strong><br />
                            <input
                                id="validTo"
                                type="date"
                                value={validTo?.substring(0, 10)}
                                onChange={(e) => setValidTo(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="buttons-div">
                    <button className="modal-button" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>

    );
}

export default EditUserContent;