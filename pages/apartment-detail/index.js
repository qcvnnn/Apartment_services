import { navigateTo } from "../../main.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ApartmentDetailPage  {
    constructor(parent, id, allData) {
        this.parent = parent;
        this.id = id;
        this.allData = allData;
    }

     getData() {
    ajax.get(stockUrls.getStockById(this.id), (data) => {
        this.renderData(data);
    })
}
    renderData(item) {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML(item));
    document.getElementById('home-btn').onclick = () => navigateTo('main');
}

    maxFreeDays(bookingString) {
        let max = 0, current = 0;
        for (let char of bookingString) {
            if (char === '0') {
                current++;
                if (current > max) max = current;
            } else {
                current = 0;
            }
        }
        return max;
    }

    getMissingServices(availableServices) {
    const allServices = ["WiFi", "TV", "Кондиционер", "Кухня", "Джакузи", "Мини-бар", "Сауна", "Бассейн", "Завтрак", "Парковка"];
    const availableArray = availableServices.split(', ');
    return allServices.filter(service => !availableArray.includes(service));
}

    mergeObjects(obj1, obj2) {
        const result = {};
        for (let key in obj1) {
            result[key] = obj1[key];
        }
        for (let key in obj2) {
            if (!(key in result)) {
                result[key] = obj2[key];
            }
        }
        return result;
    }

    getHTML(data) {
        const maxFree = this.maxFreeDays(data.bookingHistory);
        const missing = this.getMissingServices(data.services);

        const basicInfo = {
            название: data.title,
            площадь: data.area,
            вместимость: data.capacity,
            цена: data.price + " ₽"
        };
        const extraInfo = {
            кондиционер: "есть",
            отопление: "есть",
            сейф: "есть"
        };
        const merged = this.mergeObjects(basicInfo, extraInfo);

        return `
            <!-- ХЭДЕР С НАЗВАНИЕМ И КНОПКОЙ ДОМОЙ -->
            <div style="background-color: #ece8dd; padding: 15px 20px; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; justify-content: space-between; align-items: center;">
                <h2 style="color: #B49450; margin-left: 140px; font-size: 22px; font-weight: bold; ">Удаленное заселение в апарт-отель</h2>
                <button id="home-btn" style="background: #B49450; border: none; border-radius: 30px; padding: 8px 20px;margin-right:100px; color: white; cursor: pointer;">
                    Домой
                </button>
            </div>

            <div style="height: calc(100vh - 200px); overflow: hidden; display: flex; justify-content: center; align-items: center; padding: 20px; margin-top: 70px;">
                <div style="max-width: 500px; width: 100%;">

                    <div style="background: #F5F0E8; border-radius: 15px; padding: 12px 15px; margin-bottom: 12px;">
                        <div><strong>Максимум свободных дней подряд</strong></div>
                        <div style="font-size: 28px; font-weight: bold; color: #B49450; margin-top: 5px;">${maxFree} дней</div>
                    </div>

                    <div style="background: #F5F0E8; border-radius: 15px; padding: 12px 15px; margin-bottom: 12px;">
                        <div style="margin-bottom: 8px;"><strong>Услуги в номере:</strong></div>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                            ${this.renderServicesWithColors(data.services, missing)}
                        </div>
                    </div>

                    <div style="background: #F5F0E8; border-radius: 15px; padding: 12px 15px; margin-bottom: 12px;">
                        <div><strong>Итог:</strong></div>
                        <div style="margin-top: 8px; font-size: 13px;">
                            ${Object.entries(merged).map(([key, val]) => `
                                <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #ddd;">
                                    <span style="font-weight: 500;">${key}:</span>
                                    <span>${val}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>


                </div>
            </div>
        `;
    }
    show3DModel() {
    import('three').then(async (THREE) => {
        const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
        const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');

        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; display:flex; justify-content:center; align-items:center;`;

        const container = document.createElement('div');
        container.style.cssText = `width:80%; height:80%; background:#F5F0E8; border-radius:20px; position:relative;`;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Закрыть';
        closeBtn.style.cssText = `position:absolute; top:10px; right:10px; background:#B49450; border:none; border-radius:30px; padding:8px 20px; color:white; cursor:pointer; z-index:10001;`;

        const canvas = document.createElement('canvas');
        canvas.style.cssText = `width:100%; height:100%; display:block; border-radius:20px;`;

        container.appendChild(closeBtn);
        container.appendChild(canvas);
        modal.appendChild(container);
        document.body.appendChild(modal);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xF5F0E8);

        const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.set(3, 2, 5);

        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 2, 1);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040));

        // ЗАГРУЗИТЕ ВАШУ МОДЕЛЬ - ЗАМЕНИТЕ НАЗВАНИЕ ФАЙЛА
        const loader = new GLTFLoader();
        loader.load('models/Bedroom.glb', (gltf) => {
            scene.add(gltf.scene);
        });

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        const resize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', resize);

        closeBtn.onclick = () => {
            window.removeEventListener('resize', resize);
            modal.remove();
        };
    });
}
    renderServicesWithColors(available, missing) {
        const all = ["WiFi", "TV", "Кондиционер", "Кухня", "Джакузи", "Мини-бар", "Сауна", "Бассейн", "Завтрак", "Парковка"];
        return all.map(service => {
            const isAvailable = available.includes(service);
            return `
                <span style="
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    background-color: ${isAvailable ? '#B49450' : '#CCCCCC'};
                    color: ${isAvailable ? 'white' : '#666'};
                ">
                    ${service}
                </span>
            `;
        }).join('');
    }

    render() {
    const controls = document.getElementById('main-page-controls');
    if (controls) controls.style.display = 'none';
    this.parent.innerHTML = '';
    this.getData();
}
}
