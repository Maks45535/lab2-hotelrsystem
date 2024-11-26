import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    const navigate = useNavigate();
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");

    // Статичні дані про готелі для пошуку
    const hotels = [
        { id: 1, name: "Hotel Valencia", city: "Valencia", price: "100€", date: "2024-12-15", image: "/valencia.jpg" },
        { id: 2, name: "Hotel Madrid", city: "Madrid", price: "120€", date: "2024-12-20", image: "/madrid.jpg" },
        { id: 3, name: "Hotel Barcelona", city: "Barcelona", price: "150€", date: "2024-12-18", image: "/barcelona.jpg" },
        { id: 4, name: "Hotel Seville", city: "Seville", price: "90€", date: "2024-12-25", image: "/seville.jpg" },
    ];

    // Обробник для кнопки "Search"
    const handleSearch = () => {
        // Фільтруємо дані готелів за введеним текстом і датою
        const filteredHotels = hotels.filter(
            (hotel) =>
                hotel.city.toLowerCase().includes(destination.toLowerCase()) &&
                hotel.date === date
        );

        // Перенаправлення на сторінку результатів пошуку
        navigate("/search-results", { state: { hotels: filteredHotels } });
    };

    // Обробник для кнопки "Profile"
    const handleProfile = () => {
        navigate("/profile");
    };

    // Обробник для кнопки "Logout"
    const handleLogout = () => {
        navigate("/register");
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <div className="header-content">
                    <h1>BookingEurope.com</h1>
                    <div className="header-buttons">
                        <button className="profile-button" onClick={handleProfile}>
                            Profile
                        </button>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <main className="homepage-main">
                <section className="search-section">
                    <h2>Where are you going?</h2>
                    <div className="search-bar">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Enter destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                        <input
                            className="search-input"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </section>
                <section className="destinations-section">
                    <h2>Explore Spain</h2>
                    <div className="destinations-grid">
                        <div className="destination-card">
                            <img
                                className="destination-image"
                                src="/valencia.jpg"
                                alt="Valencia"
                            />
                            <h3>Valencia</h3>
                        </div>
                        <div className="destination-card">
                            <img
                                className="destination-image"
                                src="/madrid.jpg"
                                alt="Madrid"
                            />
                            <h3>Madrid</h3>
                        </div>
                        <div className="destination-card">
                            <img
                                className="destination-image"
                                src="/barcelona.jpg"
                                alt="Barcelona"
                            />
                            <h3>Barcelona</h3>
                        </div>
                        <div className="destination-card">
                            <img
                                className="destination-image"
                                src="/seville.jpg"
                                alt="Seville"
                            />
                            <h3>Seville</h3>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="homepage-footer">
                <p>BookingEurope.com © 2024. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
