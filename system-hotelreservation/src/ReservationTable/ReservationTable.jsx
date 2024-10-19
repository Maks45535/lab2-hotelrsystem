import React, { useState, useEffect } from 'react';
import AddReservationForm from './AddReservationForm';
import EditReservationForm from './EditReservationForm'; // Імпортуємо форму редагування
import './ReservationTable.css';

const ReservationTable = () => {
    const [reservations, setReservations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentReservation, setCurrentReservation] = useState({
        id: null,
        guest: '',
        email: '',
        checkIn: '',
        checkOut: ''
    });

    // Завантажуємо дані з серверу при першому завантаженні сторінки
    useEffect(() => {
        fetch('http://localhost:5000/api/reservations')
            .then((response) => response.json())
            .then((data) => setReservations(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Функція для додавання нового запису
    const addReservation = (newReservation) => {
        fetch('http://localhost:5000/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReservation),
        })
            .then((response) => response.json())
            .then((data) => {
                setReservations([...reservations, data.reservation]); // Отримуємо збережений запис з ID
            })
            .catch((error) => console.error('Error saving data:', error));
    };

    // Функція для видалення запису на сервері
    const deleteReservation = (id) => {
        fetch(`http://localhost:5000/api/reservations/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete reservation');
                }
                return response.json();
            })
            .then(() => {
                const updatedReservations = reservations.filter((reservation) => reservation.id !== id);
                setReservations(updatedReservations);
            })
            .catch((error) => console.error('Error deleting data:', error));
    };

    // Функція для початку редагування
    const editReservation = (reservation) => {
        setIsEditing(true);
        setCurrentReservation(reservation);
    };

    // Функція для оновлення запису
    const updateReservation = (updatedReservation) => {
        fetch(`http://localhost:5000/api/reservations/${updatedReservation.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReservation),
        })
            .then((response) => response.json())
            .then(() => {
                const updatedReservations = reservations.map((reservation) =>
                    reservation.id === updatedReservation.id ? updatedReservation : reservation
                );
                setReservations(updatedReservations);
                setIsEditing(false);
                setCurrentReservation({ id: null, guest: '', email: '', checkIn: '', checkOut: '' });
            })
            .catch((error) => console.error('Error updating data:', error));
    };

    return (
        <div>
            <h2>Reservation List</h2>
            {isEditing ? (
                <EditReservationForm
                    currentReservation={currentReservation}
                    onUpdate={updateReservation}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <AddReservationForm onAdd={addReservation} />
            )}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Guest</th>
                    <th>Email</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {reservations.length === 0 ? (
                    <tr>
                        <td colSpan="5">No reservation available.</td>
                    </tr>
                ) : (
                    reservations.map((reservation) => (
                        <tr>
                            <td>{reservation.id}</td>
                            <td>{reservation.guest}</td>
                            <td>{reservation.email}</td>
                            <td>{reservation.checkIn}</td>
                            <td>{reservation.checkOut}</td>
                            <td>
                                <button onClick={() => editReservation(reservation)}>Edit</button>
                                <button onClick={() => deleteReservation(reservation.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationTable;