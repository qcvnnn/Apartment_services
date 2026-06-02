const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'apartments.json');

const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

app.get('/apartments', (req, res) => {
    let apartments = readData();
    const { title } = req.query;

    if (title) {
        apartments = apartments.filter(a =>
            a.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    res.json(apartments);
});


app.get('/apartments/:id', (req, res) => {
    const apartments = readData();
    const id = parseInt(req.params.id);
    const apartment = apartments.find(a => a.id === id);
    if (!apartment) return res.status(404).json({ error: 'Не найдено' });
    res.json(apartment);
});

app.post('/apartments', (req, res) => {
    const apartments = readData();
    const newId = apartments.length > 0 ? Math.max(...apartments.map(a => a.id)) + 1 : 1;
    const newApartment = { id: newId, ...req.body };
    apartments.push(newApartment);
    writeData(apartments);
    res.status(201).json(newApartment);
});

app.patch('/apartments/:id', (req, res) => {
    const apartments = readData();
    const id = parseInt(req.params.id);
    const index = apartments.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ error: 'Не найдено' });
    apartments[index] = { ...apartments[index], ...req.body };
    writeData(apartments);
    res.json(apartments[index]);
});

app.delete('/apartments/:id', (req, res) => {
    const apartments = readData();
    const id = parseInt(req.params.id);
    const filtered = apartments.filter(a => a.id !== id);
    if (filtered.length === apartments.length) return res.status(404).json({ error: 'Не найдено' });
    writeData(filtered);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Сервер на http://localhost:${PORT}`);
});
