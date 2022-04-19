import axios from "axios";

export default axios.create({
  baseURL: "https://mola-items-api.herokuapp.com/",
  // baseURL: "http://localhost:3500",
});
