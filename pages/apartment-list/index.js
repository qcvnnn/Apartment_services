import { ApartmentCardComponent } from "../../components/apartment-card/index.js";
import { navigateTo } from "../../main.js";

export class ApartmentsListPage {
  constructor(parent) {
    this.parent = parent;
    this.allData = [];
    this.nextId = 5;
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  getHTML() {
    return `
        <!-- ПОИСК И ФИЛЬТР ВНИЗУ -->
        <div style="margin-bottom: 20px; text-align: center;">
            <input type="text" id="search-input" placeholder="Поиск по названию..." style="padding: 8px; width: 200px;">
            <button id="search-btn" class="btn-gold">Найти</button>
            <button id="reset-search" class="btn-reset">Сброс</button>

            <select id="filter-days" class="filter-select" style="margin-left: 20px;">
                <option value="">Свободно дней</option>
                <option value="1">1 день</option>
                <option value="2">2 дня</option>
                <option value="3">3 дня</option>
                <option value="4">4 дня</option>
                <option value="5">5 дней</option>
                <option value="6">6 дней</option>
                <option value="7">7 дней</option>
                <option value="8">8 дней</option>
                <option value="9">9 дней</option>
                <option value="10">10 дней</option>
                <option value="11">11 дней</option>
                <option value="12">12 дней</option>
                <option value="13">13 дней</option>
                <option value="14">14 дней</option>
            </select>
            <button id="apply-filter" class="btn-gold">Найти</button>
            <button id="reset-filter" class="btn-reset">Сброс</button>
        </div>

        <div id="main-page" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: flex-start; padding: 20px;"></div>

        <div style="text-align: center; margin: 20px;">
            <button id="add-card-btn" style="background: #B49450; color: white; border: none; border-radius: 30px; padding: 10px 20px; cursor: pointer;">+ Добавить карточку</button>
        </div>
    `;
  }

  async loadData() {
    try {
      const response = await fetch('http://localhost:3000/apartments');
      const data = await response.json();
      if (data && data.length) {
        this.allData = data;
        this.nextId = Math.max(...data.map(c => c.id)) + 1;
        this.renderCards(this.allData);
        this.attachHandlers();
      } else {
        throw new Error("Нет данных");
      }
    } catch (err) {
      console.warn("Ошибка, использую mock", err);
      this.allData = this.getInitialData();
      this.renderCards(this.allData);
      this.attachHandlers();
    }
  }

  attachHandlers() {
    // Поиск по названию
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const resetSearch = document.getElementById('reset-search');

    if (searchBtn) {
      searchBtn.onclick = () => {
        const text = searchInput.value.toLowerCase();
        const filtered = this.allData.filter(item => item.title.toLowerCase().includes(text));
        this.renderCards(filtered);
      };
    }

    if (resetSearch) {
      resetSearch.onclick = () => {
        searchInput.value = '';
        this.renderCards(this.allData);
      };
    }

    // Фильтр по дням
    const filterSelect = document.getElementById('filter-days');
    const applyBtn = document.getElementById('apply-filter');
    const resetFilter = document.getElementById('reset-filter');

    if (applyBtn) {
      applyBtn.onclick = () => {
        const days = parseInt(filterSelect.value);
        if (days) {
          const filtered = this.allData.filter(item => this.hasFreeDays(item.bookingHistory, days));
          this.renderCards(filtered);
        }
      };
    }

    if (resetFilter) {
      resetFilter.onclick = () => {
        filterSelect.value = '';
        this.renderCards(this.allData);
      };
    }

    // Добавление карточки
    const addBtn = document.getElementById('add-card-btn');
    if (addBtn) addBtn.onclick = () => this.addCard();
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
        services: "WiFi, TV, Кондиционер",
        bookingHistory: "1011100111",
      },
      {
        id: 2,
        src: "images/lux-9.webp",
        title: "Студио",
        text: "Современная студия 35 м² с кухней",
        price: 11000,
        area: "35 м²",
        capacity: "2 взрослых",
        services: "WiFi, TV, Кухня, Кондиционер",
        bookingHistory: "1111000011",
      },
      {
        id: 3,
        src: "images/standart-1-1.webp",
        title: "Люкс",
        text: "Просторный люкс 50 м²",
        price: 15000,
        area: "50 м²",
        capacity: "2 взрослых + ребенок",
        services: "WiFi, TV, Джакузи, Мини-бар",
        bookingHistory: "111010100111",
      },
      {
        id: 4,
        src: "images/lux-s-vidom-4.webp",
        title: "Президентский",
        text: "Элитный номер 100 м² с террасой",
        price: 24000,
        area: "100 м²",
        capacity: "4 взрослых",
        services: "WiFi, TV, Сауна, Бассейн",
        bookingHistory: "1000000001",
      },
    ];
  }

  hasFreeDays(booking, need) {
    let count = 0;
    for (let char of booking) {
      if (char === "0") {
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
      title: `${firstCard.title} (копия)`,
    };
    this.allData.push(newCard);
    this.renderCards(this.allData);
  }

  deleteCard(id) {
    this.allData = this.allData.filter((item) => item.id !== id);
    this.renderCards(this.allData);
  }

  renderCards(data) {
    const container = document.getElementById("main-page");
    container.innerHTML = "";
    data.forEach((item) => {
      const productCard = new ApartmentCardComponent(container);
      productCard.render(
        item,
        this.clickCard.bind(this),
        this.deleteCard.bind(this),
      );
    });
  }

  clickCard(e) {
    const cardId = parseInt(e.target.dataset.id);
    navigateTo("product", cardId, this.allData);
  }

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.loadData(); // вместо this.allData = this.getInitialData()

    // Скрываем кнопки управления главной страницы (если нужно)
    const controls = document.getElementById("main-page-controls");
    if (controls) controls.style.display = "flex";
  }
}
