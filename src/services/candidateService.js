import axios from "axios";

export default class CandidateService{
   
    getCandidates(pageNo, pageSize){
        return axios.get(`http://localhost:8080/api/candidates/getAll?pageNo=${pageNo}&pageSize=${pageSize}`)
    }
}