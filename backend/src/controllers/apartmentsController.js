const apartmentsService = require('../services/apartmentsService');

const getAll = (req, res) => {
    const apartments = apartmentsService.findAll();
    res.json(apartments);
};

const getOne = (req, res) => {
    const id = parseInt(req.params.id);
    const apartment = apartmentsService.findOne(id);
    if (!apartment) {
        return res.status(404).json({ error: 'Апартамент не найден' });
    }
    res.json(apartment);
};

const create = (req, res) => {
    const { src, title, text, price, area, capacity, services, bookingHistory } = req.body;
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    const newApartment = apartmentsService.create({ src, title, text, price, area, capacity, services, bookingHistory });
    res.status(201).json(newApartment);
};

const update = (req, res) => {
    const id = parseInt(req.params.id);
    const updated = apartmentsService.update(id, req.body);
    if (!updated) {
        return res.status(404).json({ error: 'Апартамент не найден' });
    }
    res.json(updated);
};

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    const success = apartmentsService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Апартамент не найден' });
    }
    res.status(204).send();
};

module.exports = { getAll, getOne, create, update, remove };
