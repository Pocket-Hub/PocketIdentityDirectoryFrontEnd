import "../../../styles/AddResource.css"


function AddResource({ close }) {

    function submitForm(e) {
        e.preventDefault();
        close();
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-frame">
                <div className="content-container">
                    <form className="create-user-form" onSubmit={submitForm}>
                        <div className="content-container">
                            <div className="modal-content">
                                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>User Profile</h2>
                                <label htmlFor="email">
                                    <strong>Email:</strong><br />
                                    <input required id="email" type="email" />
                                </label>
                                <label htmlFor="firstName">
                                    <strong>First Name:</strong><br />
                                    <input id="firstName" type="text" />
                                </label>
                                <label htmlFor="lastName">
                                    <strong>Last Name:</strong><br />
                                    <input required id="lastName" type="text" />
                                </label>
                                <label htmlFor="loginName">
                                    <strong>Login Name:</strong><br />
                                    <input required id="loginName" type="text" />
                                </label>
                                <label htmlFor="status">
                                    <strong>Status:</strong><br />
                                    <input required id="status" type="text" />
                                </label>
                                <label htmlFor="userType">
                                    <strong>User Type:</strong><br />
                                    <input required id="userType" type="text" />

                                </label>
                            </div>
                            <div className="modal-content">
                                <h2 style={{ marginBottom: "0px", marginTop: "0px" }}>Additional Info</h2>
                                <label htmlFor="company">
                                    <strong>Company:</strong><br />
                                    <input id="company" type="text" />
                                </label>
                                <label htmlFor="country">
                                    <strong>Country:</strong><br />
                                    <input id="country" type="text" />
                                </label>
                                <label htmlFor="city">
                                    <strong>City:</strong><br />
                                    <input id="city" type="text" />
                                </label>
                                <label htmlFor="validFrom">
                                    <strong>Valid From:</strong><br />
                                    <input id="validFrom" type="text" />
                                </label>
                                <label htmlFor="validTo">
                                    <strong>Valid To:</strong><br />
                                    <input id="validTo" type="text" />
                                </label>
                                <label htmlFor="update">
                                    <strong>Last Updated:</strong><br />
                                    <input id="update" type="text" />
                                </label>
                            </div>
                        </div>
                        <div className="buttons-div">
                            <button className="modal-button" type='submit'>Create</button>
                            <button className="modal-button" onClick={close}>Close</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    );

}

export default AddResource;