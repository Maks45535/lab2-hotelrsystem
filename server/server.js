const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user'); // Підключення моделі користувача
const Reservation = require('./models/reservation'); // Підключення моделі резервації

const app = express();
const PORT = 5000;

// Використовуємо CORS для дозволу запитів з будь-якого домену
app.use(cors());

// Middleware для роботи з JSON
app.use(express.json());

// Підключення до MongoDB
mongoose.connect('mongodb+srv://maks:1234@cluster1.nousi.mongodb.net/hotelreservation', {
});




// ===================== КОРИСТУВАЧІ =====================

// Реєстрація нового користувача
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Перевіряємо, чи існує користувач з таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створюємо нового користувача і зберігаємо в базі даних
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser._id, name, email } });
});

// Логін користувача
app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;

    // Знаходимо користувача
    const user = await User.findOne({ name });
    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Перевіряємо пароль
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user: { id: user._id, name, email: user.email } });
});

// ===================== РЕЗЕРВАЦІЇ =====================

// Маршрут для отримання всіх резервацій
app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get reservations' });
    }
});

// Маршрут для додавання нової резервації
app.post('/api/reservations', async (req, res) => {
    const newReservation = req.body;

    try {
        const reservation = new Reservation(newReservation);
        await reservation.save();
        res.status(201).json({ message: 'Reservation added successfully', reservation });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save reservation' });
    }
});

// Маршрут для оновлення резервації
app.put('/api/reservations/:id', async (req, res) => {
    const reservationId = req.params.id;
    const updatedReservation = req.body;

    try {
        const reservation = await Reservation.findByIdAndUpdate(reservationId, updatedReservation, { new: true });
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json({ message: 'Reservation updated successfully', reservation });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update reservation' });
    }
});

// Маршрут для видалення резервації
app.delete('/api/reservations/:id', async (req, res) => {
    const reservationId = req.params.id;

    try {
        const reservation = await Reservation.findByIdAndDelete(reservationId);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete reservation' });
    }
});

// ===================== ЗАПУСК СЕРВЕРА =====================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
