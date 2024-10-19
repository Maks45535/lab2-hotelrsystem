import React, { useState, useEffect } from 'react';

const EditReservationForm = ({ currentReservation, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState(currentReservation);

    // Оновлюємо стан форми, якщо поточне бронювання змінюється
    useEffect(() => {
        setFormData(currentReservation);
    }, [currentReservation]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData); // Передаємо оновлені дані батьківському компоненту
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="guest"
                value={formData.guest}
                onChange={handleChange}
                placeholder="Guest Name"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Guest Email"
                required
            />
            <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
            />
            <button type="submit">Update Reservation</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditReservationForm;
