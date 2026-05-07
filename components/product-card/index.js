export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
    // Если id === 3, показываем 3D модель, иначе фото
    const is3D = (data.id === 3); // Люкс

    return `
        <div class="card" style="width: 280px; margin: 10px; border-radius: 15px; overflow: hidden;">
            ${is3D ? `<canvas id="canvas-${data.id}" style="width: 100%; height: 200px; background: #f0f0f0;"></canvas>` : `<img src="${data.src}" style="width: 100%; height: 200px; object-fit: cover;">`}
            <div class="card-body" style="padding: 15px;">
                <h5>${data.title}</h5>
                <p>${data.text}</p>
                <p style="color: #B49450; font-size: 24px;">${data.price} ₽</p>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button class="btn btn-primary" id="detail-${data.id}" data-id="${data.id}" style="flex: 1;">ПОДРОБНЕЕ</button>
                    <button class="btn btn-danger" id="delete-${data.id}" style="flex: 1; background: #B49450; color: white; border: none; border-radius: 30px; padding: 8px 0; cursor: pointer;">УДАЛИТЬ</button>
                </div>
            </div>
        </div>
    `;
}

    async render(data, clickHandler, deleteHandler) {
    this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

    // Если это не 3D карточка (id !== 3), просто привязываем кнопки и выходим
    if (data.id !== 3) {
        document.getElementById(`detail-${data.id}`).onclick = (e) => {
            e.stopPropagation();
            clickHandler(e);
        };
        document.getElementById(`delete-${data.id}`).onclick = (e) => {
            e.stopPropagation();
            deleteHandler(data.id);
        };
        return;
    }

    // Инициализация 3D модели только для id === 3 (Люкс)
    const THREE = await import('three');
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
    const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');

    const canvas = document.getElementById(`canvas-${data.id}`);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F0E8);

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(2, 1.5, 3);

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

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
    setTimeout(resize, 100);

    // Кнопки
    document.getElementById(`detail-${data.id}`).onclick = (e) => {
        e.stopPropagation();
        clickHandler(e);
    };
    document.getElementById(`delete-${data.id}`).onclick = (e) => {
        e.stopPropagation();
        deleteHandler(data.id);
    };
}
}
