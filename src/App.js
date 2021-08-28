import React, { useState, useEffect } from "react";
import getMovies from "./getMovies";

const useMovies = () => {
	const [page, setPage] = useState(1);
	const [movieList, setMovieList] = useState([]);

	const getMovieList = async (pageNum) => {
		try {
			const {
				data: {
					data: { movies },
				},
			} = await getMovies(pageNum);
			setMovieList([...movieList, ...movies]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleScroll = () => {
		const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

		if (scrollTop + clientHeight >= scrollHeight) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		getMovieList(page);
	}, [page]);

	return movieList;
};

const App = () => {
	const movieList = useMovies();
	return (
		<div>
			{movieList.map((movie) => (
				<h1>{movie.title}</h1>
			))}
		</div>
	);
};

export default App;
