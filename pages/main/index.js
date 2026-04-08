import { ProductCardComponent } from "../../components/product-card/index.js";
import { navigateTo } from "../../main.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.allData = [];
        this.nextId = 5;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: flex-start; padding: 20px;"></div>
        `;
    }

    getInitialData() {
        return [
            {
                id: 1,
                src: "images/art-gallery-1.webp",
                title: "Стандарт",
                text: "Уютный номер 25 м², вид во двор",
                price: 9000,
                area: "21 м²",
                capacity: "2 взрослых",
                services: ["WiFi", "TV", "Кондиционер"],
                bookingHistory: "1011100111"
            },
            {
                id: 2,
                src: "images/lux-9.webp",
                title: "Студио",
                text: "Современная студия 35 м² с кухней",
                price: 11000,
                area: "35 м²",
                capacity: "2 взрослых",
                services: ["WiFi", "TV", "Кухня", "Кондиционер"],
                bookingHistory: "1111000011"
            },
            {
                id: 3,
                src: "images/standart-1-1.webp",
                title: "Люкс",
                text: "Просторный люкс 50 м², вид на море",
                price: 15000,
                area: "50 м²",
                capacity: "2 взрослых + ребенок",
                services: ["WiFi", "TV", "Джакузи", "Мини-бар"],
                bookingHistory: "111010100111"
            },
            {
                id: 4,
                src: "images/lux-s-vidom-4.webp",
                title: "Президентский",
                text: "Элитный номер 100 м² с террасой",
                price: 24000,
                area: "100 м²",
                capacity: "4 взрослых",
                services: ["WiFi", "TV", "Сауна", "Бассейн"],
                bookingHistory: "1000000001"
            }
        ];
    }

    hasFreeDays(booking, need) {
        let count = 0;
        for (let char of booking) {
            if (char === '0') {
                count++;
                if (count >= need) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }

    addCard() {
        if (this.allData.length === 0) return;
        const firstCard = this.allData[0];
        const newCard = {
            ...firstCard,
            id: this.nextId++,
            title: `${firstCard.title} (копия)`
        };
        this.allData.push(newCard);
        this.renderCards(this.allData);
    }

    deleteLastCard() {
        if (this.allData.length === 0) return;
        this.allData.pop();
        this.renderCards(this.allData);
    }

    clickCard(e) {
        const cardId = parseInt(e.target.dataset.id);
        navigateTo('product', cardId, this.allData);
    }

    renderCards(data) {
        const container = document.getElementById('main-page');
        container.innerHTML = '';
        data.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        this.allData = this.getInitialData();
        this.renderCards(this.allData);

        // Показываем кнопки управления главной страницы
        const controls = document.getElementById('main-page-controls');
        if (controls) controls.style.display = 'flex';

        const addBtn = document.getElementById('add-card-btn');
        const deleteBtn = document.getElementById('delete-card-btn');
        const filterSelect = document.getElementById('filter-days');
        const applyBtn = document.getElementById('apply-filter');
        const resetBtn = document.getElementById('reset-filter');

        if (addBtn) addBtn.onclick = () => this.addCard();
        if (deleteBtn) deleteBtn.onclick = () => this.deleteLastCard();

        if (applyBtn) {
            applyBtn.onclick = () => {
                const days = parseInt(filterSelect.value);
                if (days) {
                    const filtered = this.allData.filter(item => this.hasFreeDays(item.bookingHistory, days));
                    this.renderCards(filtered);
                }
            };
        }

        if (resetBtn) {
            resetBtn.onclick = () => {
                filterSelect.value = '';
                this.renderCards(this.allData);
            };
        }
    }
}
