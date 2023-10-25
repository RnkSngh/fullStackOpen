import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
    return (
        axios.get(baseUrl)
            .then(response => response.data)
    )
};

const getPerson = (id) => {
    return (axios.get(`${baseUrl}/${id}`))
        .then(response => {
            return response.data
        })
}

const addPerson = (personObj) => {
    return (
        axios.post(baseUrl, personObj)
            .then(response => response.data)
    )
};

const modifyPerson = (id, personObj) => {
    return (axios.put(`${baseUrl}/${id}`, personObj)).then(response => {
        return response.data
    })
}

const deletePerson = (id) => {
    return (
        axios.delete(`${baseUrl}/${id}`)
            .then(response => {
                return response.data
            }
            )
    )
};
export default { getAll, getPerson, addPerson, deletePerson, modifyPerson }