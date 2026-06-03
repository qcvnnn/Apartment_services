const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/OrbitControls-bqNUcqTQ.js","assets/three.module-CbbBeXoY.js","assets/GLTFLoader-Bhlbid4Q.js"])))=>i.map(i=>d[i]);
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`modulepreload`,t=function(e){return`/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``;if(a)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let l=document.createElement(`link`);if(l.rel=o?`stylesheet`:e,o||(l.as=`script`),l.crossOrigin=``,l.href=i,c&&l.setAttribute(`nonce`,c),document.head.appendChild(l),o)return new Promise((e,t)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[])t.status===`rejected`&&s(t.reason);return r().catch(s)})},i=class{constructor(e){this.parent=e}getHTML(e){return`
      <div class="card" style="width: 280px; height: 480px; margin: 10px; border-radius: 15px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="height: 200px; flex-shrink: 0;">
          ${e.id===3&&e.model3d?`<canvas id="canvas-${e.id}" style="width: 100%; height: 100%; background: #f0f0f0;"></canvas>`:`<img src="${e.src}" style="width: 100%; height: 100%; object-fit: cover;">`}
        </div>
        <div class="card-body" style="padding: 15px; flex: 1; display: flex; flex-direction: column;">
          <h5 style="margin: 0 0 8px 0;">${e.title}</h5>
          <p style="margin: 0 0 8px 0; flex: 1; overflow: hidden; text-overflow: ellipsis;">${e.text}</p>
          <p style="color: #B49450; font-size: 24px; margin: 0 0 10px 0;">${e.price} ₽</p>

          <!-- Ряд 1: ПОДРОБНЕЕ и УДАЛИТЬ -->
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <button class="btn btn-primary" id="detail-${e.id}" data-id="${e.id}" style="flex: 1; background: #B49450; color: black; border: none; border-radius: 30px; padding: 6px 0; cursor: pointer; font-size: 14px;">ПОДРОБНЕЕ</button>
            <button class="btn btn-danger" id="delete-${e.id}" style="flex: 1; background: #B49450; color: white; border: none; border-radius: 30px; padding: 6px 0; cursor: pointer; font-size: 14px;">УДАЛИТЬ</button>
          </div>

          <!-- Ряд 2: РЕДАКТИРОВАТЬ -->
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-warning" id="edit-${e.id}" style="width: 100%; background: #B49450; color: white; border: none; border-radius: 30px; padding: 6px 0; cursor: pointer; font-size: 14px;">РЕДАКТИРОВАТЬ</button>
          </div>
        </div>
      </div>
    `}async render(e,t,n,i){if(this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e)),document.getElementById(`detail-${e.id}`).onclick=e=>{e.stopPropagation(),t(e)},document.getElementById(`delete-${e.id}`).onclick=t=>{t.stopPropagation(),n(e.id)},document.getElementById(`edit-${e.id}`).onclick=t=>{t.stopPropagation(),i(e.id)},e.id===3&&e.model3d){let t=await r(()=>import(`./three.module-CbbBeXoY.js`),[]),{OrbitControls:n}=await r(async()=>{let{OrbitControls:e}=await import(`./OrbitControls-bqNUcqTQ.js`);return{OrbitControls:e}},__vite__mapDeps([0,1])),{GLTFLoader:i}=await r(async()=>{let{GLTFLoader:e}=await import(`./GLTFLoader-Bhlbid4Q.js`);return{GLTFLoader:e}},__vite__mapDeps([2,1])),a=document.getElementById(`canvas-${e.id}`),o=new t.Scene;o.background=new t.Color(16117992);let s=new t.PerspectiveCamera(45,a.clientWidth/a.clientHeight,.1,1e3);s.position.set(2,1.5,3);let c=new t.WebGLRenderer({canvas:a});c.setSize(a.clientWidth,a.clientHeight);let l=new n(s,a);l.enableDamping=!0,l.autoRotate=!0,l.autoRotateSpeed=1.5;let u=new t.DirectionalLight(16777215,1);u.position.set(1,2,1),o.add(u),o.add(new t.AmbientLight(4210752)),new i().load(e.model3d,e=>{o.add(e.scene)});function d(){requestAnimationFrame(d),l.update(),c.render(o,s)}d();let f=()=>{let e=a.clientWidth,t=a.clientHeight;s.aspect=e/t,s.updateProjectionMatrix(),c.setSize(e,t)};window.addEventListener(`resize`,f),setTimeout(f,100)}}},a=new class{constructor(){this.baseUrl=`http://localhost:3000`}getStocks(){return`${this.baseUrl}/apartments`}getStockById(e){return`${this.baseUrl}/apartments/${e}`}createStock(){return`${this.baseUrl}/apartments`}updateStockById(e){return`${this.baseUrl}/apartments/${e}`}removeStockById(e){return`${this.baseUrl}/apartments/${e}`}},o=class{constructor(e){this.parent=e,this.allData=[],this.nextId=5}get pageRoot(){return document.getElementById(`main-page`)}getHTML(){return`
      <div>
        <div style="margin-bottom: 20px; text-align: center;">
          <input type="text" id="search-input" placeholder="Поиск по названию..." style="padding: 8px; width: 200px;">
          <button id="search-btn" class="btn-gold">Найти</button>
          <button id="reset-search" class="btn-reset">Сброс</button>

          <select id="filter-days" class="filter-select" style="margin-left: 20px;">
            <option value="">Свободно дней</option>
            ${[...Array(14).keys()].map(e=>`<option value="${e+1}">${e+1} ${e+1===1?`день`:`дней`}</option>`).join(``)}
          </select>
          <button id="apply-filter" class="btn-gold">Найти</button>
          <button id="reset-filter" class="btn-reset">Сброс</button>
        </div>

        <div id="main-page" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: flex-start; padding: 20px;"></div>

        <div style="text-align: center; margin: 20px;">
          <button id="add-card-btn" style="background: #B49450; color: white; border: none; border-radius: 30px; padding: 10px 20px; cursor: pointer;">+ Добавить карточку</button>
        </div>
      </div>
    `}getData(){fetch(`http://localhost:3000/apartments`).then(e=>e.json()).then(e=>{this.allData=e,this.renderData(e)}).catch(e=>console.error(`Ошибка загрузки:`,e))}hasFreeDays(e,t){let n=0;for(let r of e)if(r===`0`){if(n++,n>=t)return!0}else n=0;return!1}addCard(){if(this.allData.length===0)return;let e=this.allData[0],t={...e,id:this.nextId++,title:`${e.title} (копия)`};this.allData.push(t),this.renderData(this.allData)}deleteCard(e){this.allData=this.allData.filter(t=>t.id!==e),this.renderData(this.allData)}renderData(e){let t=document.getElementById(`main-page`);t.innerHTML=``,e.forEach(e=>{new i(t).render(e,this.clickCard.bind(this),this.deleteCard.bind(this),this.showEditModal.bind(this))})}clickCard(e){l(`product`,parseInt(e.target.dataset.id),this.allData)}showEditModal(e){let t=this.allData.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`edit-modal`);n&&n.remove();let r=document.createElement(`div`);r.id=`edit-modal`,r.style.cssText=`
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; justify-content: center;
      align-items: center; z-index: 10000;
    `,r.innerHTML=`
      <div style="background: white; border-radius: 20px; padding: 25px; width: 400px; max-width: 90%;">
        <h3 style="color: #B49450; margin-bottom: 20px;">Редактировать карточку</h3>
        <label>Название</label>
        <input type="text" id="edit-title" value="${t.title}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
        <label>Описание</label>
        <input type="text" id="edit-text" value="${t.text}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
        <label>Цена (₽)</label>
        <input type="number" id="edit-price" value="${t.price}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
        <label>Площадь (м²)</label>
        <input type="number" id="edit-area" value="${t.area}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
        <label>Вместимость</label>
        <input type="text" id="edit-capacity" value="${t.capacity}" style="width: 100%; padding: 8px; margin-bottom: 15px; border-radius: 30px; border: 1px solid #ccc;">
        <label>Услуги</label>
        <input type="text" id="edit-services" value="${t.services}" style="width: 100%; padding: 8px; margin-bottom: 20px; border-radius: 30px; border: 1px solid #ccc;">
        <div style="display: flex; gap: 10px;">
          <button id="save-edit-btn" style="background: #B49450; color: white; border: none; border-radius: 30px; padding: 10px; flex: 1; cursor: pointer;">Сохранить</button>
          <button id="close-modal-btn" style="background: #ccc; border: none; border-radius: 30px; padding: 10px; flex: 1; cursor: pointer;">Отмена</button>
        </div>
      </div>
    `,document.body.appendChild(r),document.getElementById(`close-modal-btn`).onclick=()=>r.remove(),r.onclick=e=>{e.target===r&&r.remove()},document.getElementById(`save-edit-btn`).onclick=async()=>{let t={title:document.getElementById(`edit-title`).value,text:document.getElementById(`edit-text`).value,price:parseInt(document.getElementById(`edit-price`).value),area:document.getElementById(`edit-area`).value,capacity:document.getElementById(`edit-capacity`).value,services:document.getElementById(`edit-services`).value};try{if((await fetch(a.updateStockById(e),{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})).ok){let n=this.allData.findIndex(t=>t.id===e);this.allData[n]={...this.allData[n],...t},this.renderData(this.allData),r.remove()}else console.error(`Ошибка при обновлении`)}catch(e){console.error(`Ошибка сети:`,e)}}}showAddModal(){let e=document.getElementById(`add-modal`);e&&e.remove();let t=document.createElement(`div`);t.id=`add-modal`,t.style.cssText=`
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; justify-content: center;
      align-items: center; z-index: 10000;
    `,t.innerHTML=`
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
    `,document.body.appendChild(t),document.getElementById(`close-add-modal-btn`).onclick=()=>t.remove(),t.onclick=e=>{e.target===t&&t.remove()},document.getElementById(`save-add-btn`).onclick=async()=>{let e={title:document.getElementById(`add-title`).value,text:document.getElementById(`add-text`).value,price:parseInt(document.getElementById(`add-price`).value),area:document.getElementById(`add-area`).value,capacity:document.getElementById(`add-capacity`).value,services:document.getElementById(`add-services`).value,src:`https://palmira-art.com/wp-content/uploads/2025/03/art-gallery-1.webp`,bookingHistory:`0000000000`};try{let n=await fetch(a.createStock(),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(n.ok){let e=await n.json();this.allData.push(e),this.renderData(this.allData),t.remove()}else console.error(`Ошибка при добавлении`)}catch(e){console.error(`Ошибка сети:`,e)}}}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.getData();let e=document.getElementById(`search-btn`),t=document.getElementById(`search-input`),n=document.getElementById(`reset-search`),r=document.getElementById(`filter-days`),i=document.getElementById(`apply-filter`),a=document.getElementById(`reset-filter`),o=document.getElementById(`add-card-btn`),s=document.getElementById(`home-main-btn`);s&&(s.onclick=()=>{this.render()}),e&&(e.onclick=()=>{let e=t.value.toLowerCase(),n=this.allData.filter(t=>t.title.toLowerCase().includes(e));this.renderData(n)}),n&&(n.onclick=()=>{t.value=``,this.renderData(this.allData)}),i&&(i.onclick=()=>{let e=parseInt(r.value);if(e){let t=this.allData.filter(t=>this.hasFreeDays(t.bookingHistory,e));this.renderData(t)}}),a&&(a.onclick=()=>{r.value=``,this.renderData(this.allData)}),o&&(o.onclick=()=>this.showAddModal())}},s=class{constructor(e,t,n){this.parent=e,this.id=t}async getData(){try{let e=await(await fetch(`http://localhost:3000/apartments/${this.id}`)).json();this.renderData(e)}catch(e){console.error(`Ошибка загрузки карточки:`,e)}}renderData(e){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e)),document.getElementById(`home-btn`).onclick=()=>l(`main`)}maxFreeDays(e){let t=0,n=0;for(let r of e)r===`0`?(n++,n>t&&(t=n)):n=0;return t}getMissingServices(e){let t=[`WiFi`,`TV`,`Кондиционер`,`Кухня`,`Джакузи`,`Мини-бар`,`Сауна`,`Бассейн`,`Завтрак`,`Парковка`],n=Array.isArray(e)?e:e.split(`, `);return t.filter(e=>!n.includes(e))}mergeObjects(e,t){let n={};for(let t in e)n[t]=e[t];for(let e in t)e in n||(n[e]=t[e]);return n}getHTML(e){let t=this.maxFreeDays(e.bookingHistory),n=this.getMissingServices(e.services),r={название:e.title,площадь:e.area,вместимость:e.capacity,цена:e.price+` ₽`},i=this.mergeObjects(r,{кондиционер:`есть`,отопление:`есть`,сейф:`есть`});return`
      <div style="background-color: #ece8dd; padding: 15px 20px; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; display: flex; justify-content: space-between; align-items: center;">
        <h2 style="color: #B49450; margin-left: 140px; font-size: 22px; font-weight: bold;">Удаленное заселение в апарт-отель</h2>
        <button id="home-btn" style="background: #B49450; border: none; border-radius: 30px; padding: 8px 20px; margin-right: 100px; color: white; cursor: pointer;">Домой</button>
      </div>

      <div style="min-height: calc(100vh - 200px); display: flex; justify-content: center; align-items: center; padding: 20px;">
        <div style="max-width: 500px; width: 100%;">
          <div style="background: #F5F0E8; border-radius: 15px; padding: 12px 15px; margin-bottom: 12px;">
            <div><strong>Максимум свободных дней подряд</strong></div>
            <div style="font-size: 28px; font-weight: bold; color: #B49450; margin-top: 5px;">${t} дней</div>
          </div>

          <div style="background: #F5F0E8; border-radius: 15px; padding: 12px 15px; margin-bottom: 12px;">
            <div style="margin-bottom: 8px;"><strong>Услуги в номере:</strong></div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${this.renderServicesWithColors(e.services,n)}
            </div>
          </div>

          <div style="background: #F5F0E8; border-radius: 15px; padding: 12px 15px; margin-bottom: 12px;">
            <div><strong>Итог:</strong></div>
            <div style="margin-top: 8px; font-size: 13px;">
              ${Object.entries(i).map(([e,t])=>`
                <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #ddd;">
                  <span style="font-weight: 500;">${e}:</span>
                  <span>${t}</span>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
      </div>
    `}renderServicesWithColors(e,t){return[`WiFi`,`TV`,`Кондиционер`,`Кухня`,`Джакузи`,`Мини-бар`,`Сауна`,`Бассейн`,`Завтрак`,`Парковка`].map(t=>{let n=e.includes(t);return`
        <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; background-color: ${n?`#B49450`:`#CCCCCC`}; color: ${n?`white`:`#666`};">
          ${t}
        </span>
      `}).join(``)}render(){let e=document.getElementById(`main-page-controls`);e&&(e.style.display=`none`),this.parent.innerHTML=``,this.getData()}},c=null;function l(e,...t){let n=document.getElementById(`root`);n.innerHTML=``,e===`main`?(c=new o(n),c.render()):e===`product`&&(c=new s(n,t[0],t[1]),c.render())}l(`main`);