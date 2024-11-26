import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"; // Додаємо окремий CSS файл для стилізації профілю

function ProfilePage() {
    const navigate = useNavigate();

    // Статичний масив з прикладами бронювань
    const [bookings, setBookings] = useState([
        {
            id: 1,
            city: "Madrid",
            hotel: "Hotel Madrid Palace",
            price: "€150",
            date: "2024-12-01",
        },
        {
            id: 2,
            city: "Barcelona",
            hotel: "Hotel Barcelona Center",
            price: "€200",
            date: "2024-12-10",
        },
        {
            id: 3,
            city: "Valencia",
            hotel: "Hotel Valencia Bay",
            price: "€120",
            date: "2024-12-15",
        },
    ]);

    // Функція для видалення бронювання
    const handleDeleteBooking = (id) => {
        setBookings(bookings.filter((booking) => booking.id !== id));
    };

    const handleBackToHome = () => {
        navigate("/home"); // Перехід на головну сторінку
    };

    return (
        <div className="profile-page">
            {/* Верхній навігаційний бар */}
            <header className="profile-header">
                <div className="header-content">
                    <h1>BookingEurope.com</h1>
                    <div className="header-buttons">
                        <button className="back-button" onClick={handleBackToHome}>
                            Back to Home
                        </button>
                    </div>
                </div>
            </header>

            {/* Контент профілю */}
            <main className="profile-main">
                <section className="profile-info">
                    <h2>Your Profile</h2>
                    <div className="profile-details">
                        <p><strong>Name:</strong> John Doe</p>
                        <p><strong>Email:</strong> johndoe@example.com</p>
                        <h3>Your Bookings:</h3>
                        {/* Список бронювань */}
                        <div className="bookings-list">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="booking-card">
                                    <h4>{booking.city}</h4>
                                    <p><strong>Hotel:</strong> {booking.hotel}</p>
                                    <p><strong>Price:</strong> {booking.price}</p>
                                    <p><strong>Booking Date:</strong> {booking.date}</p>
                                    {/* Кнопка видалення */}
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteBooking(booking.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Можна додавати додаткові блоки для редагування профілю */}
                <section className="profile-settings">
                    <h3>Settings</h3>
                    <button className="edit-profile-button">Edit Profile</button>
                    <button className="change-password-button">Change Password</button>
                </section>
            </main>

            {/* Футер */}
            <footer className="profile-footer">
                <p>BookingEurope.com © 2024. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ProfilePage;
