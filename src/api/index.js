import axios from "axios";

// Change the baseURL to point to your backend server on port 5000
const API = axios.create({
    baseURL: "https://stack-overflow-backend-zrxk.onrender.com", // Updated from 3000 to 5000
});

// Adding interceptor to include Authorization token in request headers
API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`;
    }
    return req;
});

// Define API endpoints and methods
export const login = (authdata) => API.post("/user/login", authdata);
export const signup = (authdata) => API.post("/user/signup", authdata);
export const getallusers = () => API.get("/user/getallusers");
export const updateprofile = (id, updatedata) => API.patch(`/user/update/${id}`, updatedata);

export const postquestion = (questiondata) => API.post("/questions/Ask", questiondata);
export const getallquestions = () => API.get("/questions/get");
export const deletequestion = (id) => API.delete(`/questions/delete/${id}`);
export const votequestion = (id, value) => API.patch(`/questions/vote/${id}`, { value });

export const postanswer = (id, noofanswers, answerbody, useranswered) =>
    API.patch(`/answer/post/${id}`, { noofanswers, answerbody, useranswered });

export const deleteanswer = (id, answerid, noofanswers) =>
    API.patch(`/answer/delete/${id}`, { answerid, noofanswers });