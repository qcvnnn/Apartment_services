import { ApartmentsListPage } from "./pages/apartment-list/index.js";
import { ApartmentDetailPage } from "./pages/apartment-detail/index.js";

let currentPage = null;

export function navigateTo(page, ...params) {
    const root = document.getElementById('root');
    root.innerHTML = '';

    if (page === 'main') {
        currentPage = new ApartmentsListPage(root);
        currentPage.render();
    } else if (page === 'product') {
        currentPage = new ApartmentDetailPage(root, params[0], params[1]);
        currentPage.render();
    }
}

navigateTo('main');
