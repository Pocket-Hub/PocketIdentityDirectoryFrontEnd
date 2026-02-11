import { useContext } from "react";
import { EditUserContext } from "../UserModal";
import { countryOptions } from "../../../data/countryOptions";
import Loading from "../../Loading";
import { EnumsContext } from "../../../App";


function EditUserContent({ user, updateUser, loading, setLoading }) {
    const { email, setEmail, name, setName, loginName, setLoginName, type, setType, companyInfo, setCompanyInfo, validFrom, setValidFrom, validTo, setValidTo, status, setStatus } = useContext(EditUserContext);
    const { countries, userStatuses, userTypes } = useContext(EnumsContext);

    async function submitForm(e) {
        setLoading(true);
        e.preventDefault();
        await updateUser();
        setLoading(false);
    }


    return (
        <>
            {loading ? <div style={{ height: '100%' }}><Loading pos={'relative'} /></div> :
                <form className="create-user-form" onSubmit={submitForm}>
                    <div className="content-container" style={{ marginTop: '0' }}>
                        <div className="modal-content">
                            <h3 style={{ marginBottom: 0, marginTop: 0 }}>User Profile</h3>
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
                                    {userStatuses.map(userStatus => <option value={userStatus} key={userStatus}>{userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}</option>)}
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
                                    {userTypes.map(userType => <option value={userType} key={userType}>{userType.charAt(0).toUpperCase() + userType.slice(1)}</option>)}
                                </select>
                            </label>
                        </div>
                        <div className="modal-content">
                            <h3 style={{ marginBottom: 0, marginTop: 0 }}>Additional Info</h3>
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
                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
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
                        <button className="modal-button" style={{ display: 'none' }} type="submit">
                            Save
                        </button>
                    </div>
                </form >}
        </>

    );
}

export default EditUserContent;