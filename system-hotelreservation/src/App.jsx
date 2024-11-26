import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ReservationTable from "./ReservationTable/ReservationTable.jsx";
import LoginForm from "./ReservationTable/LoginForm.jsx";
import RegistrationForm from "./ReservationTable/RegistrationForm.jsx";
import HomePage from "./ReservationTable/HomePage.jsx";
import ProfilePage from "./ReservationTable/ProfilePage.jsx";
import SearchResultsPage from "./ReservationTable/SearchResultsPage.jsx"; // Імпорт нового компонента

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Перенаправлення "/" на RegistrationForm */}
                    <Route path="/" element={<Navigate to="/register" />} />

                    {/* Сторінка реєстрації */}
                    <Route path="/register" element={<RegistrationForm />} />

                    {/* Інші маршрути */}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/reservations" element={<ReservationTable />} />
                    <Route path="/home" element={<HomePage />} />

                    {/* Сторінка результатів пошуку */}
                    <Route path="/search-results" element={<SearchResultsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
