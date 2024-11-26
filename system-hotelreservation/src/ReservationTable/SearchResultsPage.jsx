import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResultsPage.css";

function SearchResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Отримання даних про готелі, переданих через navigate
    const hotels = location.state?.hotels || [];

    // Обробник для кнопки "Reserve"
    const handleReserve = (hotel) => {
        alert(`You have reserved a room at ${hotel.name} in ${hotel.city}.`);
        // Додати логіку збереження бронювання, якщо потрібно
    };

    return (
        <div className="search-results-page">
            <header className="search-results-header">
                <h1>Search Results</h1>
                <button className="back-button" onClick={() => navigate("/home")}>
                    Back to Home
                </button>
            </header>
            <main className="results-main">
                {hotels.length > 0 ? (
                    <div className="hotels-grid">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="hotel-card">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="hotel-image"
                                />
                                <div className="hotel-details">
                                    <h3>{hotel.name}</h3>
                                    <p>City: {hotel.city}</p>
                                    <p>Price: {hotel.price}</p>
                                    <p>Date: {hotel.date}</p>
                                    <button
                                        className="reserve-button"
                                        onClick={() => handleReserve(hotel)}
                                    >
                                        Reserve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-results">No results found. Please try again.</p>
                )}
            </main>
        </div>
    );
}

export default SearchResultsPage;
