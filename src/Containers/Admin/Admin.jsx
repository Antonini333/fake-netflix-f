import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.scss';
import dayjs from 'dayjs';


export default function AdminOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const fnc = async () => {

            try {
                const usuario = JSON.parse(localStorage.getItem('usuario'));

                const header = {
                    headers: { Authorization: usuario.token }
                };

                let respuesta = await axios.get(`${process.env.REACT_APP_APIURL}/order/show`, header);

                setOrders(respuesta.data);

            } catch (error) {
                console.log(error);
            }
        }

        fnc();

    }, []);


    return (

        <>
            <div className="padreContainer">

                <div className="containerCards">

                    {orders.map(order => {

                        return (


                            <div className="card">

                                <img className="moviePoster" src={`https://image.tmdb.org/t/p/w200/${order.movieId.poster_path}`} alt="poster"></img>

                                <div className="texto">
                                    <p>
                                        {order.movieId.title}
                                    </p>

                                    <p>
                                        {`${order.rentalState ? 'Alquilada' : 'Otro'}`}
                                    </p>

                                    <p>
                                        Inicio alquiler: {dayjs(order.rentalDate).format('DD-MM-YYYY')}
                                    </p>

                                    <p>
                                        Fin alquiler: {dayjs(order.rentalEndDate).format('DD-MM-YYYY')}
                                    </p>

                                    <p>
                                        Alquilada por: {order.userId?.name} {order.userId?.surname}
                                    </p>

                                    <p>
                                        Fin alquiler: {dayjs(order.rentalEndDate).format('DD-MM-YYYY')}
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