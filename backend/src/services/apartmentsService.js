const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = () => {
    return fileService.readData(dataFilePath);
};

const findOne = (id) => {
    const apartments = fileService.readData(dataFilePath);
    return apartments.find(a => a.id === id);
};

const create = (apartmentData) => {
    const apartments = fileService.readData(dataFilePath);
    const newId = apartments.length > 0 ? Math.max(...apartments.map(a => a.id)) + 1 : 1;
    const newApartment = { id: newId, ...apartmentData };
    apartments.push(newApartment);
    fileService.writeData(dataFilePath, apartments);
    return newApartment;
};

const update = (id, apartmentData) => {
    const apartments = fileService.readData(dataFilePath);
    const index = apartments.findIndex(a => a.id === id);
    if (index === -1) return null;
    apartments[index] = { ...apartments[index], ...apartmentData };
    fileService.writeData(dataFilePath, apartments);
    return apartments[index];
};

const remove = (id) => {
    const apartments = fileService.readData(dataFilePath);
    const filtered = apartments.filter(a => a.id !== id);
    if (filtered.length === apartments.length) return false;
    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
