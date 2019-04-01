import axios from "axios";

export default axios.create({
  baseURL: "http://agile-beyond-92897.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json",
  transformResponse: [
    data => {
      console.log(data);
      return data;
    }
  ]
});
