import React, { useState } from 'react';
import './AddReservationForm.css';

const AddReservationForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        guest: '',
        email: '',
        checkIn: '',
        checkOut: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({ guest: '', email: '', checkIn: '', checkOut: '' });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="guest"
                    className="input-width"
                    value={formData.guest}
                    onChange={handleChange}
                    placeholder="Guest Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    className="input-width"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Guest Email"
                    required
                />
                <input
                    type="date"
                    name="checkIn"
                    className="input-width"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="checkOut"
                    className="input-width"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="button-width">Add Reservation</button>
            </form>
        </div>
    );
};

export default AddReservationForm;
