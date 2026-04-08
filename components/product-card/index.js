export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 280px; margin: 10px; border-radius: 15px; overflow: hidden;">
                <img src="${data.src}" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="card-body" style="padding: 15px;">
                    <h5>${data.title}</h5>
                    <p>${data.text}</p>
                    <p style="color: #B49450; font-size: 24px;">${data.price} ₽</p>
                    <button class="btn btn-primary" id="detail-${data.id}" data-id="${data.id}">ПОДРОБНЕЕ</button>
                </div>
            </div>
        `;
    }

    render(data, clickHandler) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        const btn = document.getElementById(`detail-${data.id}`);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                clickHandler(e);
            });
        }
    }
}
