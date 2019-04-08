import axios from "axios";

export default axios.create({
  baseURL: "https://promotic.com.br/api/",
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
