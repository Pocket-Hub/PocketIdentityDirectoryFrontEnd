import { useContext, useState } from "react";
import { UsersContext } from "../../App";
import Loading from "../Loading";
import { countryOptions } from "../../data/countryOptions";
import ExitIcon from "../../assets/exit.png"
import ErrorModal from "./ErrorModal";




function AddUser({ close }) {
    const { users, setUsers } = useContext(UsersContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState({ firstName: "", lastName: "" });
    const [loginName, setLoginName] = useState("");
    const [type, setType] = useState("public");
    const [companyInfo, setCompanyInfo] = useState({ company: "", country: "", city: "" });
    const [validFrom, setValidFrom] = useState("");
    const [validTo, setValidTo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    async function submitForm(e) {
        e.preventDefault();

        const requestBody = {
            email,
            name,
            loginName,
            type,
            companyInfo,
            validFrom: !validFrom || validFrom.trim() === "" ? null : new Date(validFrom).toISOString(),
            validTo: !validTo || validTo.trim() === "" ? null : new Date(validTo).toISOString(),
        };
        setLoading(true);

        try {
            const res = await fetch("/api/v1/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
            const user = await res.json();
            if (res.status >= 400) {
                throw new Error(user.message || "There was an error with creating this user!")
            }
            setUsers([...users, user]);

            setLoading(false);
            close();
        } catch (err) {
            setError(err);
            console.log(err)
        }
        setLoading(false);
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-frame" style={{ paddingTop: '0', overflowY: 'unset', height: '50vh' }}>
                <form className="create-user-form" onSubmit={submitForm}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <h2 style={{ marginTop: '0', marginBottom: '0px', width: 'fit-content' }}>Create User</h2>
                        <button type="button" style={{ marginLeft: 'auto', background: 'transparent' }} onClick={close}><img src={ExitIcon} style={{ height: '1rem', width: '1rem' }}></img></button>
                    </div>
                    <hr style={{ width: '99%', margin: '0' }} />

                    {loading ? <Loading /> : <>
                        {error && <p style={{ backgroundColor: '#ff6b6b', borderRadius: '8px', height: 'fit-content', padding: '3px', maxHeight: '4rem', wordBreak: 'break-word', marginTop: '5vh', position: 'absolute' }}>{error.message}</p>}
                        <div className="content-container" style={{ marginTop: '3rem' }}>
                            <div className="modal-content">
                                <label htmlFor="email">
                                    <span class="label-text">Email:</span>
                                    <input
                                        required
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoFocus
                                    />
                                </label>
                                <label htmlFor="firstName">
                                    <strong>First Name:</strong>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={name.firstName}
                                        onChange={(e) => setName({ ...name, firstName: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="lastName">
                                    <span class="label-text">Last Name:</span>
                                    <input
                                        required
                                        id="lastName"
                                        type="text"
                                        value={name.lastName}
                                        onChange={(e) => setName({ ...name, lastName: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="loginName">
                                    <span class="label-text">Login Name:</span>
                                    <input
                                        required
                                        id="loginName"
                                        type="text"
                                        value={loginName}
                                        onChange={(e) => setLoginName(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="userType">
                                    <strong>User Type:</strong>
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
                                <label htmlFor="company">
                                    <strong>Company:</strong>
                                    <input
                                        id="company"
                                        type="text"
                                        value={companyInfo.company}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, company: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="country">
                                    <strong>Country:</strong>
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
                                    <strong>City:</strong>
                                    <input
                                        id="city"
                                        type="text"
                                        value={companyInfo.city}
                                        onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                                    />
                                </label>
                                <label htmlFor="validFrom">
                                    <strong>Valid From:</strong>
                                    <input
                                        id="validFrom"
                                        type="date"
                                        value={validFrom}
                                        onChange={(e) => setValidFrom(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="validTo">
                                    <strong>Valid To:</strong>
                                    <input
                                        id="validTo"
                                        type="date"
                                        value={validTo}
                                        onChange={(e) => setValidTo(e.target.value)}
                                    />
                                </label>
                            </div>

                        </div>
                        <button className="modal-button" type="submit">
                            Create
                        </button></>}
                </form >
            </div>
        </div >



    );

}

export default AddUser;