import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MostrarPeliculas.scss';
import dayjs from 'dayjs';


export default function MostrarPeliculas({endpoint}) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const fnc = async () => { 
            try {

                let respuesta = await axios.get(endpoint);

                setMovies(respuesta.data);

            } catch (error) {
                console.log(error);
            }
        }
        fnc();
    }, []);

    return (
        <>
            <div className="padreMovies">

                <div className="containerMovies">

                    {movies.map(movie => {

                        return (
                            <div className="cardMovies">

                                <img className="moviesPoster" src={!movie.poster_path ? 'Images/notfound.png' : `https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="poster"></img>

                                <div className="textoMovies">
                                    <p>
                                        {movie.title}
                                    </p>
                                    <p>
                                        {dayjs(movie.release_date).format('DD-MM-YYYY')}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </>
    )
}