import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = ()=>{
    const fakePerson = { name:"fakey", number:"brownie"}
    return (
        axios.get(baseUrl)
        .then( response => response.data.concat(fakePerson))
)};

const getPerson = (id) => {
    return (axios.get(`${baseUrl}/${id}`))
    .then( response => {
        return response.data})
}

const addPerson = (personObj)=>{
    return (
        axios.post(baseUrl, personObj)
        .then( response => response.data)
)};

const deletePerson = (id)=>{
    return (
        axios.delete(`${baseUrl}/${id}`)
        .then(response => {
            return response.data}
        )
)};
export default {getAll, getPerson, addPerson, deletePerson}