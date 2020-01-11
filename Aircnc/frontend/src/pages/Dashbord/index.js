// Externas
import React, { useEffect, useState, useMemo }from 'react';
import { Link }from 'react-router-dom';
import socketio from 'socket.io-client';
// Internas
import api from '../../services/api';
import './styles.css'
//

export default function Dashbord(){
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333',{
        query:{ user_id },
    }), [user_id]);

    useEffect(()=> {
    
        socket.on('booking_request',data => {
            setRequests([... requests, data]);
        })
    },[requests,socket])
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard',{
                headers:{user_id}
            });
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    async function handlerAccept(id){
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));
    }

    async function handlerReject(id){
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));
    }
    return (
        <>
        <ul className="notifications">
            {requests.map(requests => (
            <li key= {requests._id}>
                <p>
                    <strong> {requests.user.email}</strong> esta solicitando uma reserva em <strong>{requests.spot.company}</strong> para a data: <strong>{requests.date}</strong>
                </p>
                <button className="accept" onClick={() => handlerAccept(requests._id)}>ACEITAR</button>
                <button className="reject" onClick={() => handlerReject(requests._id)}>REJEITAR</button>
            </li>
        ))}
        </ul>

        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{backgroundImage: `url(${spot.thumbnail_url})`}} />
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R${spot.price}/dia`: 'GRATUITO'}</span>
                </li>
            ))}
        </ul>

        <Link to="/new">
            <button className="btn"> Cadastrar novo Spot </button>
        </Link>
        </>
    );
}