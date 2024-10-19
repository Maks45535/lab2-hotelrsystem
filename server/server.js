const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Додаємо бібліотеку CORS
const app = express();
const PORT = 5000;

// Використовуємо CORS для дозволу запитів з будь-якого домену
app.use(cors());

// Middleware для роботи з JSON
app.use(express.json());

// Шлях до файлу з даними
const dataFilePath = path.join(__dirname, 'reservations.json');

// Маршрут для отримання всіх даних
app.get('/api/reservations', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data));
    });
});

// Маршрут для додавання нових даних з автоматичною генерацією ID
app.post('/api/reservations', (req, res) => {
    const newReservation = req.body;

    // Читаємо поточні дані з reservations.json
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        let reservations = JSON.parse(data);

        // Генерація нового ID
        const newId = reservations.length > 0 ? reservations[reservations.length - 1].id + 1 : 1;
        const reservationWithId = { ...newReservation, id: newId }; // Додаємо новий ID до запису

        // Додаємо нове бронювання до масиву
        reservations.push(reservationWithId);

        // Записуємо оновлені дані назад до reservations.json
        fs.writeFile(dataFilePath, JSON.stringify(reservations, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data' });
            }
            // Повертаємо відповідь із доданим записом
            res.status(201).json({ message: 'Reservation added successfully', reservation: reservationWithId });
        });
    });
});


// Маршрут для оновлення існуючого запису
app.put('/api/reservations/:id', (req, res) => {
    const reservationId = parseInt(req.params.id);
    const updatedReservation = req.body;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        const reservations = JSON.parse(data);
        const reservationIndex = reservations.findIndex((r) => r.id === reservationId);
        if (reservationIndex === -1) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        reservations[reservationIndex] = { ...reservations[reservationIndex], ...updatedReservation };

        fs.writeFile(dataFilePath, JSON.stringify(reservations, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.json({ message: 'Reservation updated successfully' });
        });
    });
});


// Маршрут для видалення запису
app.delete('/api/reservations/:id', (req, res) => {
    const reservationId = parseInt(req.params.id);

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }

        const reservations = JSON.parse(data);
        const updatedReservations = reservations.filter((r) => r.id !== reservationId);

        // Якщо запис не знайдений
        if (reservations.length === updatedReservations.length) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        // Записуємо оновлені дані
        fs.writeFile(dataFilePath, JSON.stringify(updatedReservations, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.status(200).json({ message: 'Reservation deleted successfully' });
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
