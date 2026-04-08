import { MainPage } from "./pages/main/index.js";
import { ProductPage } from "./pages/product/index.js";

let currentPage = null;

export function navigateTo(page, ...params) {
    const root = document.getElementById('root');
    root.innerHTML = '';

    if (page === 'main') {
        currentPage = new MainPage(root);
        currentPage.render();
    } else if (page === 'product') {
        currentPage = new ProductPage(root, params[0], params[1]);
        currentPage.render();
    }
}

navigateTo('main');
