(function(){
const C=CONFIG, $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const fmt=n=>C.currency+Math.round(n).toLocaleString('en-NG');
const items={}; C.menu.forEach(c=>c.items.forEach(i=>items[i.id]={...i,plate:!!c.plate,drink:!!c.drinks}));
(C.bulk||[]).forEach(b=>b.sizes.forEach(([l,p],j)=>items[b.id+':'+j]={id:b.id+':'+j,name:`${b.name} – ${l}`,price:p,img:b.img,plate:true}));
const pic=(img,name,cls='')=>img?`<img src="images/${img}.webp" alt="${name}" loading="lazy" width="800" height="600" class="${cls}">`:`<div class="nophoto ${cls}"><span>${name}</span><em>Photo coming soon</em></div>`;
let cart={}; try{cart=JSON.parse(localStorage.getItem('esc_cart')||'{}')}catch(e){}
Object.keys(cart).forEach(k=>{if(!items[k])delete cart[k]});
const save=()=>localStorage.setItem('esc_cart',JSON.stringify(cart));
const wa=t=>`https://wa.me/${C.whatsappNumber}`+(t?`?text=${encodeURIComponent(t)}`:'');

// Fill copy
$$('.promoPct').forEach(e=>e.textContent=C.promoDiscountPercent);
$$('.promoExtra').forEach(e=>e.textContent=C.promoExtra);
$$('.promoMin').forEach(e=>e.textContent=C.promoMinPlates);
$$('.areasInline').forEach(e=>e.textContent=C.deliveryAreas.join(', '));
$('#areaList').innerHTML=C.deliveryAreas.map(a=>`<li>${a}</li>`).join('');
$('#slotList').textContent=C.timeSlots.join(' · ');
['#heroWa','#contactWa','#waFloat','#waLink'].forEach(s=>$(s).href=wa('Hello ETHICAL SMAG CHOPPINGS, I would like to make an order.'));
$$('.waDetails,.waDetailsBtn').forEach(e=>e.href=wa('Hello ETHICAL SMAG CHOPPINGS, I would like to book my spot and confirm an order.'));
$('#waLink').textContent=C.whatsappDisplay;
if(C.email){$('#emailRow').hidden=false;$('#emailLink').href='mailto:'+C.email;$('#emailLink').textContent=C.email;$('#emailBtn').hidden=false;}
$('#year').textContent=new Date().getFullYear();

// Saturdays (Africa/Lagos = UTC+1, no DST)
function lagosNow(){const d=new Date();return new Date(d.getTime()+d.getTimezoneOffset()*60000+3600000);}
function saturdays(){const n=lagosNow();let d=new Date(n.getFullYear(),n.getMonth(),n.getDate());
  d.setDate(d.getDate()+((C.cutoffDay-d.getDay()+7)%7));
  const cut=new Date(d);cut.setHours(C.cutoffHour,0,0,0); if(n>=cut)d.setDate(d.getDate()+7);
  return Array.from({length:C.saturdaysToShow},(_,i)=>{const x=new Date(d);x.setDate(d.getDate()+7*i);return x;});}
const satLabel=d=>d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const sats=saturdays(); $('#nextSat').textContent=satLabel(sats[0]);
$('#dateSelect').innerHTML=sats.map(d=>`<option>${satLabel(d)}</option>`).join('');
$('#slotSelect').innerHTML='<option value="">Choose a time slot</option>'+C.timeSlots.map(s=>`<option>${s}</option>`).join('');
function setAreas(){const pick=$('input[name=method]:checked').value==='Pickup';
  $('#areaSelect').innerHTML=pick?'<option>Pickup</option>':'<option value="">Choose your area</option>'+C.deliveryAreas.map(a=>`<option>${a}</option>`).join('');
  $('#addrWrap').hidden=pick;}
$$('input[name=method]').forEach(r=>r.onchange=setAreas); setAreas();

// Menu
$('#catTabs').innerHTML=C.menu.map((c,i)=>`<a href="#cat${i}">${c.cat}</a>`).join('');
$('#menuWrap').innerHTML=C.menu.map((c,i)=>`<div class="cat" id="cat${i}"><h3>${c.cat}</h3>${c.note?`<p class="muted">${c.note}</p>`:''}<div class="grid">${c.items.map(it=>`
 <article class="dish">${pic(it.img,it.name)}<div class="dish-body"><h4>${it.name}</h4><p>${it.desc}</p>
 <div class="dish-foot"><span class="price">${fmt(it.price)}</span><button class="add" data-id="${it.id}">+ Add</button></div></div></article>`).join('')}</div></div>`).join('');
$('#bulkGrid').innerHTML=(C.bulk||[]).map(b=>`<article class="dish bulk"><div class="tagwrap">${pic(b.img,b.name)}<span class="ptag">From ${fmt(Math.min(...b.sizes.map(s=>s[1])))}</span></div><div class="dish-body"><h4>${b.name}</h4>
 <select class="size" id="sz-${b.id}">${b.sizes.map(([l,p],j)=>`<option value="${j}">${l} — ${fmt(p)}</option>`).join('')}</select>
 <div class="dish-foot"><span class="price muted" style="font-size:.85rem">Saturday delivery</span><button class="add" data-bulk="${b.id}">+ Add</button></div></div></article>`).join('');
const evMsg="Hello ETHICAL SMAG CHOPPINGS, I'd like to book catering for an outdoor event.\nEvent type: \nDate: \nNumber of guests: \nLocation: ";
$('#eventWa').href=wa(evMsg); $$('.eventLink').forEach(e=>e.href=wa(evMsg));
document.addEventListener('click',e=>{const bb=e.target.closest('[data-bulk]');if(bb){const k=bb.dataset.bulk+':'+$('#sz-'+bb.dataset.bulk).value;cart[k]=(cart[k]||0)+1;save();render();toast(items[k].name+' added');return;}
 const b=e.target.closest('[data-id]');if(!b)return;const id=b.dataset.id,a=b.dataset.act;
  if(a==='dec'){cart[id]--; if(cart[id]<=0)delete cart[id];} else if(a==='rm'){delete cart[id];} else {cart[id]=(cart[id]||0)+1; if(!a)toast(items[id].name+' added');}
  save();render();});

function calc(){let sub=0,plates=0;for(const k in cart){sub+=items[k].price*cart[k]; if(items[k].plate)plates+=cart[k];}
  const ok=plates>=C.promoMinPlates, disc=ok?sub*C.promoDiscountPercent/100:0; return {sub,plates,ok,disc,total:sub-disc+C.deliveryFee};}
function totalsHTML(t){return `<div><span>Subtotal</span><span>${fmt(t.sub)}</span></div>`+(t.ok?`<div class="save"><span>Promo ${C.promoDiscountPercent}% off</span><span>−${fmt(t.disc)}</span></div><div class="save"><span>Free extra</span><span>🎁 ${C.promoExtra}</span></div>`:'')+`<div><span>Delivery</span><span class="free">Free</span></div><div class="grand"><span>Total</span><span>${fmt(t.total)}</span></div>`;}
function render(){const keys=Object.keys(cart),t=calc(),n=keys.reduce((a,k)=>a+cart[k],0);
  $('#cartCount').textContent=n;
  $('#cartItems').innerHTML=keys.length?keys.map(k=>`<div class="line">${items[k].img?`<img src="images/${items[k].img}.webp" alt="" loading="lazy">`:`<div class="nophoto mini"></div>`}<div class="ln"><b>${items[k].name}</b><small>${fmt(items[k].price)} each</small></div>
   <div class="qty"><button data-id="${k}" data-act="dec" aria-label="Decrease">−</button><span>${cart[k]}</span><button data-id="${k}" data-act="inc" aria-label="Increase">+</button></div><button class="rm" data-id="${k}" data-act="rm" aria-label="Remove">🗑</button></div>`).join(''):'<p class="empty">Your cart is empty. Add some delicious dishes!</p>';
  const left=C.promoMinPlates-t.plates;
  $('#promoNudge').innerHTML=!keys.length?'':t.ok?`🎉 Promo unlocked: ${C.promoDiscountPercent}% off + ${C.promoExtra}!`:`Add ${left} more plate${left>1?'s':''} to unlock the promo (${C.promoDiscountPercent}% off + ${C.promoExtra}).`;
  $('#promoNudge').className='nudge'+(t.ok?' ok':'');
  $('#totals').innerHTML=$('#totals2').innerHTML=keys.length?totalsHTML(t):'';
  $('#toCheckout').disabled=!keys.length;}
render();

// Drawer
const open=()=>{document.body.classList.add('drawer-open');showCart();}, close=()=>document.body.classList.remove('drawer-open');
$('#openCart').onclick=open;$('#closeCart').onclick=close;$('#overlay').onclick=close;
function showCart(){$('#cartView').hidden=false;$('#checkout').hidden=true;$('#drawerTitle').textContent='Your order';}
$('#toCheckout').onclick=()=>{$('#cartView').hidden=true;$('#checkout').hidden=false;$('#drawerTitle').textContent='Checkout';};
$('#backToCart').onclick=showCart;

function buildMsg(f){const t=calc(),L=[];
  L.push(`*NEW ORDER – ${C.businessName}*`,'',`*Saturday:* ${f.date}`,`*Time slot:* ${f.slot}`,`*Method:* ${f.method}${f.method==='Delivery'?' (Free delivery)':''}`,`*Area:* ${f.area}`);
  if(f.method==='Delivery'&&f.address)L.push(`*Address/landmark:* ${f.address}`);
  L.push(`*Name:* ${f.name}`,`*Phone:* ${f.phone}`,'','*Items:*');
  for(const k in cart)L.push(`• ${cart[k]} × ${items[k].name} — ${fmt(items[k].price*cart[k])}`);
  L.push('',`Subtotal: ${fmt(t.sub)}`);
  if(t.ok)L.push(`Promo (${t.plates} plates): ${C.promoDiscountPercent}% off −${fmt(t.disc)} + ${C.promoExtra}`);
  L.push('Delivery: Free',`*TOTAL: ${fmt(t.total)}*`);
  if(f.notes)L.push('',`Notes: ${f.notes}`);
  L.push('',`*Payment:* Bank transfer — please send me payment details after confirming my order.`);
  return L.join('\n');}
function readForm(){const fd=new FormData($('#checkout')),f=Object.fromEntries(fd.entries());
  if(!f.name.trim()||!f.phone.trim()||!f.area||!f.date||!f.slot){$('#formErr').textContent='Please fill in name, phone, area, Saturday and time slot.';return null;}
  if(!Object.keys(cart).length){$('#formErr').textContent='Your cart is empty.';return null;}
  $('#formErr').textContent='';return f;}
$('#checkout').onsubmit=e=>{e.preventDefault();const f=readForm();if(!f)return;const url=wa(buildMsg(f));window.__lastOrderUrl=url;window.open(url,'_blank');};
$('#emailBtn').onclick=()=>{const f=readForm();if(!f)return;location.href=`mailto:${C.email}?subject=${encodeURIComponent('New order – '+f.date)}&body=${encodeURIComponent(buildMsg(f).replace(/\*/g,''))}`;};

let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),1600);}
})();
