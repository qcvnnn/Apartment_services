export class ApartmentCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    const is3D = data.id === 3 && data.model3d;
    return `
      <div class="card" style="width: 280px; height: 480px; margin: 10px; border-radius: 15px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="height: 200px; flex-shrink: 0;">
          ${is3D ? `<canvas id="canvas-${data.id}" style="width: 100%; height: 100%; background: #f0f0f0;"></canvas>` : `<img src="${data.src}" style="width: 100%; height: 100%; object-fit: cover;">`}
        </div>
        <div class="card-body" style="padding: 15px; flex: 1; display: flex; flex-direction: column;">
          <h5 style="margin: 0 0 8px 0;">${data.title}</h5>
          <p style="margin: 0 0 8px 0; flex: 1; overflow: hidden; text-overflow: ellipsis;">${data.text}</p>
          <p style="color: #B49450; font-size: 24px; margin: 0 0 10px 0;">${data.price} ₽</p>

          <!-- Ряд 1: ПОДРОБНЕЕ и УДАЛИТЬ -->
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <button class="btn btn-primary" id="detail-${data.id}" data-id="${data.id}" style="flex: 1; background: #B49450; color: black; border: none; border-radius: 30px; padding: 6px 0; cursor: pointer; font-size: 14px;">ПОДРОБНЕЕ</button>
            <button class="btn btn-danger" id="delete-${data.id}" style="flex: 1; background: #B49450; color: white; border: none; border-radius: 30px; padding: 6px 0; cursor: pointer; font-size: 14px;">УДАЛИТЬ</button>
          </div>

          <!-- Ряд 2: РЕДАКТИРОВАТЬ -->
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-warning" id="edit-${data.id}" style="width: 100%; background: #B49450; color: white; border: none; border-radius: 30px; padding: 6px 0; cursor: pointer; font-size: 14px;">РЕДАКТИРОВАТЬ</button>
          </div>
        </div>
      </div>
    `;
  }

  async render(data, clickHandler, deleteHandler, editHandler) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));

    document.getElementById(`detail-${data.id}`).onclick = (e) => {
        e.stopPropagation();
        clickHandler(e);
    };
    document.getElementById(`delete-${data.id}`).onclick = (e) => {
        e.stopPropagation();
        deleteHandler(data.id);
    };
    document.getElementById(`edit-${data.id}`).onclick = (e) => {
        e.stopPropagation();
        if (editHandler) editHandler(data.id);   // ← единственный обработчик
    };

    if (data.id === 3 && data.model3d) {
      const THREE = await import("three");
      const { OrbitControls } =
        await import("three/addons/controls/OrbitControls.js");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");

      const canvas = document.getElementById(`canvas-${data.id}`);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf5f0e8);

      const camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000,
      );
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
      loader.load(data.model3d, (gltf) => {
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
      window.addEventListener("resize", resize);
      setTimeout(resize, 100);
    }
  }
}
