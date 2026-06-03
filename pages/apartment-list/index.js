import { ApartmentCardComponent } from "../../components/apartment-card/index.js";
import { navigateTo } from "../../main.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

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
      <div style="margin-bottom: 20px; text-align: center;">
        <input type="text" id="search-input" placeholder="Поиск по названию..." style="padding: 8px; width: 200px;">
        <button id="search-btn" class="btn-gold">Найти</button>
        <button id="reset-search" class="btn-reset">Сброс</button>

        <select id="filter-days" class="filter-select" style="margin-left: 20px;">
          <option value="">Свободно дней</option>
          ${[...Array(14).keys()].map((i) => `<option value="${i + 1}">${i + 1} ${i + 1 === 1 ? "день" : "дней"}</option>`).join("")}
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

  getData() {
    ajax.get(stockUrls.getStocks(), (data) => {
      this.allData = data;
      this.renderData(data);
    });
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

  // addCard() {
  //   if (this.allData.length === 0) return;
  //   const firstCard = this.allData[0];
  //   const newCard = {
  //     ...firstCard,
  //     id: this.nextId++,
  //     title: `${firstCard.title} (копия)`,
  //   };
  //   this.allData.push(newCard);
  //   this.renderData(this.allData);
  // }

  deleteCard(id) {
    this.allData = this.allData.filter((item) => item.id !== id);
    this.renderData(this.allData);
  }

  renderData(items) {
    const container = document.getElementById("main-page");
    container.innerHTML = "";
    items.forEach((item) => {
      const card = new ApartmentCardComponent(container);
      card.render(item, this.clickCard.bind(this), this.deleteCard.bind(this), this.showEditModal.bind(this));
    });
  }

  clickCard(e) {
    const cardId = parseInt(e.target.dataset.id);
    navigateTo("product", cardId, this.allData);
  }

  showEditModal(cardId) {
    const card = this.allData.find(c => c.id === cardId);
    if (!card) return;

    const oldModal = document.getElementById("edit-modal");
    if (oldModal) oldModal.remove();

    const modal = document.createElement("div");
    modal.id = "edit-modal";
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); display: flex; justify-content: center;
        align-items: center; z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 25px; width: 400px; max-width: 90%;">
            <h3 style="color: #B49450; margin-bottom: 20px;">Редактировать карточку</h3>
            <label>Название</label>
            <input type="text" id="edit-title" value="${card.title}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Описание</label>
            <input type="text" id="edit-text" value="${card.text}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Цена (₽)</label>
            <input type="number" id="edit-price" value="${card.price}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Площадь (м²)</label>
            <input type="number" id="edit-area" value="${card.area}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Вместимость</label>
            <input type="text" id="edit-capacity" value="${card.capacity}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Услуги</label>
            <input type="text" id="edit-services" value="${card.services}" style="width: 100%; padding: 8px; margin-bottom: 20px; border-radius: 30px; border: 1px solid #ccc;">
            <div style="display: flex; gap: 10px;">
                <button id="save-edit-btn" style="background: #B49450; color: white; border: none; border-radius: 30px; padding: 10px; flex: 1; cursor: pointer;">Сохранить</button>
                <button id="close-modal-btn" style="background: #ccc; border: none; border-radius: 30px; padding: 10px; flex: 1; cursor: pointer;">Отмена</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("close-modal-btn").onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    // Кнопка "Сохранить" пока ничего не делает (для ЛР6)
    document.getElementById("save-edit-btn").onclick = () => {
        console.log("Редактирование карточки", cardId);
        modal.remove();
    };
}

showAddModal() {
    const oldModal = document.getElementById("add-modal");
    if (oldModal) oldModal.remove();

    const modal = document.createElement("div");
    modal.id = "add-modal";
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); display: flex; justify-content: center;
        align-items: center; z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 25px; width: 400px; max-width: 90%;">
            <h3 style="color: #B49450; margin-bottom: 20px;">Добавить новую карточку</h3>
            <label>Название</label>
            <input type="text" id="add-title" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Описание</label>
            <input type="text" id="add-text" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Цена (₽)</label>
            <input type="number" id="add-price" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Площадь (м²)</label>
            <input type="number" id="add-area" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Вместимость</label>
            <input type="text" id="add-capacity" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
            <label>Услуги</label>
            <input type="text" id="add-services" style="width: 100%; padding: 8px; margin-bottom: 20px; border-radius: 30px; border: 1px solid #ccc;">
            <div style="display: flex; gap: 10px;">
                <button id="save-add-btn" style="background: #B49450; color: white; border: none; border-radius: 30px; padding: 10px; flex: 1; cursor: pointer;">Сохранить</button>
                <button id="close-add-modal-btn" style="background: #ccc; border: none; border-radius: 30px; padding: 10px; flex: 1; cursor: pointer;">Отмена</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("close-add-modal-btn").onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    // Кнопка "Сохранить" пока ничего не делает (для ЛР6)
    document.getElementById("save-add-btn").onclick = () => {
        console.log("Добавление карточки (пока без сохранения)");
        modal.remove();
    };
}

  render() {
    this.parent.innerHTML = "";
    this.parent.insertAdjacentHTML("beforeend", this.getHTML());
    this.getData();

    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");
    const resetSearch = document.getElementById("reset-search");
    const filterSelect = document.getElementById("filter-days");
    const applyBtn = document.getElementById("apply-filter");
    const resetFilter = document.getElementById("reset-filter");
    const addBtn = document.getElementById("add-card-btn");

    if (searchBtn) {
      searchBtn.onclick = () => {
        const text = searchInput.value.toLowerCase();
        const filtered = this.allData.filter((item) =>
          item.title.toLowerCase().includes(text),
        );
        this.renderData(filtered);
      };
    }

    if (resetSearch) {
      resetSearch.onclick = () => {
        searchInput.value = "";
        this.renderData(this.allData);
      };
    }

    if (applyBtn) {
      applyBtn.onclick = () => {
        const days = parseInt(filterSelect.value);
        if (days) {
          const filtered = this.allData.filter((item) =>
            this.hasFreeDays(item.bookingHistory, days),
          );
          this.renderData(filtered);
        }
      };
    }

    if (resetFilter) {
      resetFilter.onclick = () => {
        filterSelect.value = "";
        this.renderData(this.allData);
      };
    }

    if (addBtn) addBtn.onclick = () => this.showAddModal();
  }
}
