/* Island Brew Café — page logic (menu data lives in menu-data.js) */

// flat lookup
const ITEMS = {};
for (const [cat, c] of Object.entries(MENU)) for (const [id,name,price,desc] of c.items) ITEMS[id] = {id,name,price,desc,cat};

const cart = {};               // id -> qty
let dining = "in";             // "in" | "out"
let currentCat = null;
const $ = s => document.querySelector(s);
const fmt = n => n.toLocaleString("en-US") + " Bells";
const count = () => Object.values(cart).reduce((a,b)=>a+b,0);
const total = () => Object.entries(cart).reduce((s,[id,q])=>s+ITEMS[id].price*q,0);

/* ---------- views ---------- */
const bgMode = {home:"", loading:"dark", menu:"soft", category:"soft", checkout:"soft", paid:"dark"};
function show(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active", v.id===view));
  $("#bg").className = "bg " + (bgMode[view]||"");
  $("#cartbar").classList.toggle("show", (view==="menu"||view==="category") && count()>0);
  window.scrollTo(0,0);
}
function go(target){
  if (target==="home") show("home");
  else if (target==="menu") { renderCats(); show("menu"); }
  else if (target==="checkout") { renderCheckout(); show("checkout"); }
  else if (MENU[target]) { openCat(target); }
}
document.addEventListener("click", e=>{
  const g = e.target.closest("[data-go]");
  if (g) go(g.dataset.go);
});

/* ---------- loading ---------- */
const LOAD_LINES = ["Grinding the beans…","Warming up the milk…","Pulling pastries from the oven…","Wiping down the counter…","Setting out the cups…"];
let loadedOnce = false;
$("#enterBtn").addEventListener("click", ()=>{
  if (loadedOnce) { go("menu"); return; }
  show("loading");
  let i = 0, pct = 0;
  const msg = $("#loadMsg");
  const lineTimer = setInterval(()=>{
    msg.style.opacity = 0;
    setTimeout(()=>{ i=(i+1)%LOAD_LINES.length; msg.textContent = LOAD_LINES[i]; msg.style.opacity = 1; }, 300);
  }, 900);
  const barTimer = setInterval(()=>{
    pct = Math.min(100, pct + Math.random()*7 + 2);
    $("#loadBar").style.width = pct + "%";
    $("#loadPct").textContent = Math.floor(pct) + "%";
    if (pct >= 100){
      clearInterval(barTimer); clearInterval(lineTimer);
      loadedOnce = true;
      setTimeout(()=>go("menu"), 450);
    }
  }, 110);
});

/* ---------- menu hub ---------- */
function renderCats(){
  $("#cats").innerHTML = Object.entries(MENU).map(([key,c])=>{
    const inCat = c.items.reduce((s,[id])=>s+(cart[id]||0),0);
    const pics = c.items.slice(0,3).map(([id])=>`<img src="img/${id}.png" alt="">`).join("");
    return `<button class="cat" data-go="${key}">
      <div class="icons">${pics}</div>
      <h3>${c.title}</h3>
      <p>${c.blurb}</p>
      <div class="go"><span>${c.items.length} items →</span>${inCat?`<span class="count">${inCat} in order</span>`:""}</div>
    </button>`;
  }).join("");
}

/* ---------- category ---------- */
function openCat(key){
  currentCat = key;
  const c = MENU[key];
  $("#catTitle").textContent = c.title;
  $("#catSub").textContent = c.blurb;
  renderItems();
  show("category");
}
function renderItems(){
  const c = MENU[currentCat];
  $("#items").innerHTML = c.items.map(([id])=>itemCard(ITEMS[id])).join("");
}
function itemCard(it){
  const q = cart[it.id]||0;
  const ctrl = q
    ? `<div class="stepper"><button data-dec="${it.id}" aria-label="Remove one">−</button><span>${q}</span><button data-inc="${it.id}" aria-label="Add one">+</button></div>`
    : `<button class="add" data-inc="${it.id}">Add</button>`;
  return `<div class="item ${q?"in":""}" id="it-${it.id}">
    <div class="pic"><img src="img/${it.id}.png" alt="${it.name}"></div>
    <div>
      <h3>${it.name}</h3>
      <p>${it.desc}</p>
      <div class="row"><span class="price">${it.price.toLocaleString("en-US")} <small>Bells</small></span>${ctrl}</div>
    </div>
  </div>`;
}
document.addEventListener("click", e=>{
  const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]");
  if (!inc && !dec) return;
  const id = (inc||dec).dataset[inc?"inc":"dec"];
  cart[id] = (cart[id]||0) + (inc?1:-1);
  if (cart[id] <= 0) delete cart[id];
  const card = document.getElementById("it-"+id);
  if (card) card.outerHTML = itemCard(ITEMS[id]);
  if ($("#checkout").classList.contains("active")) renderCheckout();
  updateCartBar(true);
});
function updateCartBar(bump){
  const n = count();
  $("#cbTotal").textContent = fmt(total());
  $("#cbCount").textContent = n + (n===1?" item":" items");
  const bar = $("#cartbar");
  const onShop = $("#menu").classList.contains("active") || $("#category").classList.contains("active");
  bar.classList.toggle("show", onShop && n>0);
  if (bump && n>0){ bar.classList.remove("bump"); void bar.offsetWidth; bar.classList.add("bump"); }
}

/* ---------- checkout ---------- */
function renderCheckout(){
  const ids = Object.keys(cart);
  const n = count();
  $("#coCount").textContent = n ? `${n} ${n===1?"item":"items"}` : "";
  if (!ids.length){
    $("#coBody").innerHTML = `<div class="empty">Your tray is empty.<br><button class="btn" data-go="menu">Browse the menu</button></div>`;
    return;
  }
  const order = ["drinks","light","desserts"];
  ids.sort((a,b)=>order.indexOf(ITEMS[a].cat)-order.indexOf(ITEMS[b].cat));
  const lines = ids.map(id=>{
    const it = ITEMS[id], q = cart[id];
    return `<div class="line">
      <img src="img/${id}.png" alt="">
      <div><h3>${it.name}</h3><div class="each">${fmt(it.price)} each</div></div>
      <div class="stepper"><button data-dec="${id}" aria-label="Remove one">−</button><span>${q}</span><button data-inc="${id}" aria-label="Add one">+</button></div>
      <div class="lt">${fmt(it.price*q)}</div>
    </div>`;
  }).join("");
  const sub = total();
  const bag = dining==="out" ? 50 : 0;
  $("#coBody").innerHTML = `<div class="co-grid">
    <div class="lines">${lines}</div>
    <aside class="summary">
      <h3>Summary</h3>
      <div class="seg">
        <button data-dine="in" class="${dining==="in"?"on":""}">Eat in</button>
        <button data-dine="out" class="${dining==="out"?"on":""}">Take away</button>
      </div>
      <div class="sumrow"><span>Subtotal</span><span>${fmt(sub)}</span></div>
      <div class="sumrow"><span>Takeaway bag</span><span>${bag?fmt(bag):"—"}</span></div>
      <div class="sumrow total"><span>Total</span><span>${fmt(sub+bag)}</span></div>
      <p class="note">${dining==="out"?"A paper bag adds 50 Bells.":"Grab any free seat. We'll bring it over."}</p>
      <button class="btn" id="payBtn">Pay ${fmt(sub+bag)}</button>
    </aside>
  </div>`;
}
document.addEventListener("click", e=>{
  const d = e.target.closest("[data-dine]");
  if (d){ dining = d.dataset.dine; renderCheckout(); }
  if (e.target.closest("#payBtn")) pay();
});

/* ---------- pay ---------- */
function pay(){
  const sub = total(), bag = dining==="out"?50:0;
  const rows = Object.keys(cart).map(id=>`<div class="r"><span>${cart[id]} × ${ITEMS[id].name}</span><span>${(ITEMS[id].price*cart[id]).toLocaleString("en-US")}</span></div>`).join("");
  $("#ticket").innerHTML = rows +
    (bag?`<div class="r"><span>Takeaway bag</span><span>50</span></div>`:"") +
    `<div class="r big"><span>Paid</span><span>${fmt(sub+bag)}</span></div>`;
  $("#orderNo").textContent = "#" + String(Math.floor(Math.random()*900)+100);
  $("#paying").classList.add("show");
  setTimeout(()=>{
    $("#paying").classList.remove("show");
    show("paid");
  }, 1400);
}
$("#newOrder").addEventListener("click", ()=>{
  for (const k in cart) delete cart[k];
  dining = "in";
  updateCartBar(false);
  go("menu");
});

renderCats();
