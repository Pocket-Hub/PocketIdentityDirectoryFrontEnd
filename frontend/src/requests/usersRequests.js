


export async function requestAllUsers(searchParams) {

    let res = await fetch("/api/v1/users?" + searchParams.toString());
    if (res.status == 404) {
        throw new Error("Server returned an error, please try again later.")
    }
    let json = await res.json();
    if (!res.ok) {
        throw new Error(json.message || "Something went wrong! " + res.status);
    };


    return json.resources;
}

export async function getSpecificUser(id) {
    const res = await fetch(`/api/v1/users/${id}`);
    if (res.status == 404) {
        window.location.replace("/not-found");
    }

    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to fetch user");

    return json;
}

export async function createUser(requestBody) {
    const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-csrf-token": localStorage.getItem('csrf-token')
        },
        body: JSON.stringify(requestBody)
    });
    if (res.status == 404) {
        window.location.replace("/not-found")
    }

    const user = await res.json();

    if (res.status >= 400) {
        throw new Error(user.message || "There was an error with creating this user!")
    }

    return user;
}

export async function saveUser(requestBody, id) {
    const res = await fetch(`/api/v1/users/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            "x-csrf-token": localStorage.getItem('csrf-token')

        },
        body: JSON.stringify(requestBody)
    });
    if (res.status == 404) {
        window.location.replace("/not-found")
    }
    const resUser = await res.json();

    if (!res.ok) {
        throw new Error(resUser.message || "There was an error with editing this user!")
    }
    return resUser;
}

export async function deleteUser(id) {
    const res = await fetch(`/api/v1/users/${id}`, {
        method: "DELETE",
        headers: {
            "x-csrf-token": localStorage.getItem('csrf-token')
        }
    });

    return res.status;
}