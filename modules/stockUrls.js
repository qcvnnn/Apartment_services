class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/apartments`;
    }

    getStockById(id) {
        return `${this.baseUrl}/apartments/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/apartments`;
    }

    removeStockById() {
        return `${this.baseUrl}/apartments/${id}`;
    }

    updateStockById() {
        return `${this.baseUrl}/apartments/${id}`;
    }
}

export const stockUrls = new StockUrls();
