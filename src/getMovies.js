import axios from "axios";

const main = axios.create({ baseURL: "https://yts.mx/api/v2" });

const getMovies = (page) =>
	main.get("/list_movies.json", { params: { page, limit: 50 } });

export default getMovies;
