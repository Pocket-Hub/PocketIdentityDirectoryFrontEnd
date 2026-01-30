import { useContext, useEffect, useState } from "react";
import { countryOptions } from "../../data/countryOptions";
import { UsersContext } from "../../App";
import Loading from "../Loading";
import '../../styles/Content.css'
import toast from "react-hot-toast";


function EditUserContent({ user, close }) {
    if (!user) return null;
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState({ firstName: user.name.firstName ?? '', lastName: user.name.lastName });
    const [loginName, setLoginName] = useState(user.loginName);
    const [type, setType] = useState(user.userType);
    const [companyInfo, setCompanyInfo] = useState({ company: user.companyInfo?.company ?? '', country: user.companyInfo?.country ?? '', city: user.companyInfo?.city ?? '' });
    const [validFrom, setValidFrom] = useState(user.validFrom ?? '');
    const [validTo, setValidTo] = useState(user.validTo ?? '');
    const [status, setStatus] = useState(user.status);
    const { users, setUsers } = useContext(UsersContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function submitForm(e) {
        setLoading(true);
        e.preventDefault();
        const requestBody = {
            email,
            name,
            loginName,
            type,
            companyInfo,
            status,
            validFrom: !validFrom || validFrom.trim() === "" ? null : new Date(validFrom).toISOString(),
            validTo: !validTo || validTo.trim() === "" ? null : new Date(validTo).toISOString(),
        };
        try {
            const res = await fetch(`/api/v1/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            const resUser = await res.json();
            if (res.status >= 400) {
                throw new Error(resUser.message || "There was an error with editing this user!")
            }
            setUsers(users.map(u => u.id == resUser.id ? resUser : u))
            close();
        } catch (err) {
            toast.error(err.message, {
                position: 'top-center'
            })
            setError(err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            {loading ? <div style={{ height: '48vh' }}><Loading pos={'relative'} /></div> :
                <form className="create-user-form" onSubmit={submitForm}>
                    <div className="content-container">
                        <div className="modal-content">
                            <h2 style={{ marginBottom: 0, marginTop: 0 }}>User Profile</h2>
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
                                <strong>First Name:</strong><br /><input
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
                            <label htmlFor="userType">
                                <strong>User Type:</strong><br />
                                <select
                                    required
                                    id="userType"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
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
                            <label htmlFor="lastUpdated">
                                <strong>Last Updated:</strong>
                                <input
                                    value={`${user.lastUpdate.substring(5, 7)}/${user.lastUpdate.substring(8, 10)}/${user.lastUpdate.substring(0, 4)}-${user.lastUpdate?.substring(11, 19)}`}

                                    disabled
                                />
                            </label>
                        </div>
                    </div>
                    <div className="buttons-div">
                        <button className="modal-button" style={{ marginBottom: '2px' }} type="submit">
                            Save
                        </button>
                    </div>
                </form >}
        </>

    );
}

export default EditUserContent;