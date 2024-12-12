import axios from "axios";
const baseUrl = "/api";

export function getAll() {
    return axios
        .get(`${baseUrl}/persons`)
        .then((res) => {
            console.log(res.data);
            return res.data;
        })
        .catch((err) => {
            throw new Error("could not get persons");
        });
}

export function getId() {
    return axios
        .get(`${baseUrl}/id`)
        .then((res) => res.data.id)
        .catch((e) => {
            throw new Error("failed to retrieve id");
        });
}

// export function updateId(id) {
//     alert(JSON.stringify(id));
//     return axios
//         .put(`${baseUrl}/id`, { id: id })
//         .then((res) => res.data)
//         .catch(() => {
//             throw new Error("could not update id");
//         });
// }

export function personExists(name) {
    return axios
        .get(`${baseUrl}/persons?name=${name}`)
        .then((data) => {
            if (data.data.length) {
                alert("exist")
                return data.data[0];
            } else {
                return null;
            }
        })
        .catch((err) => {
            throw new Error("failed to access database");
        });
}

export function updatePerson(person) {
    console.log(person);
    return axios
        .put(`${baseUrl}/persons/${person.id}`, person)
        .then((data) => data.data)
        .catch(() => {
            throw new Error("failed to update person");
        });
}

export function addPerson(person) {
    return axios
        .post(`${baseUrl}/persons`, person)
        .then((per) => {
            return per.data;
        })
        .catch(() => {
            throw new Error("failed to add Person");
        });
}

export function deletePerson(person) {
    // alert(person.id);
    return axios
        .delete(`${baseUrl}/persons/${person.id}`)
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            throw new Error("failed to delete person");
        });
}
