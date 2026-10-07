import { encyclopedia as data } from './assets/content.js';

const main = document.querySelector('#main');
const search = document.querySelector('#search');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storage = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
};
let saved = storage.get('sejarah-saved-v1', []);
if (!Array.isArray(saved)) saved = [];
saved = saved.filter(id => data.chapters.some(c => c.id === id));
const minutes = text => Math.max(1, Math.ceil(text.split(/\s+/).length / 180));
const chapterText = c => c.sections.map(s => `${s.title} ${s.text}`).join(' ');
const eraNames = ['Dunia klasik', 'Agama & perdagangan', 'Jaringan Eurasia', 'Dunia samudra', 'Era industri', 'Dunia modern'];
const ranges = ['1–5', '6–10', '11–15', '16–18', '19', '20–21'];
const card = c => `<a class="chapter-card" href="#${c.id}"><div class="card-top"><span>Abad ${String(c.century).padStart(2,'0')}</span><span>${escape(c.years)}${c.century === 1 ? '' : ' M'}</span></div><h3>${escape(c.title)}</h3><p>${escape(c.index)}</p><div class="card-bottom"><span>${minutes(chapterText(c))} menit baca${saved.includes(c.id) ? ' · Tersimpan' : ''}</span><b aria-hidden="true">↗</b></div></a>`;
const intro = (tag, title, description) => `<div class="page-intro"><div class="eyebrow">${tag}</div><h1>${title}</h1><p>${description}</p></div>`;
function art() {
  return `<div class="hero-art" role="img" aria-label="Ilustrasi garis bola dunia dan orbit sebagai lambang keterhubungan sejarah"><div class="art-label">ATLAS WAKTU / 001—2026</div><svg viewBox="0 0 520 400" aria-hidden="true"><defs><pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#dacda3" stroke-width=".4" opacity=".15"/></pattern><radialGradient id="glow"><stop stop-color="#617253" stop-opacity=".5"/><stop offset="1" stop-color="#243d35" stop-opacity="0"/></radialGradient></defs><rect width="520" height="400" fill="url(#grid)"/><circle cx="270" cy="196" r="190" fill="url(#glow)"/><g transform="translate(270 197) rotate(-20)" fill="none" stroke="#c1b790" stroke-width=".8"><circle r="130"/><circle r="153" opacity=".4" stroke-dasharray="2 7"/><ellipse rx="53" ry="130"/><ellipse rx="100" ry="130"/><ellipse rx="130" ry="42"/><ellipse rx="130" ry="89"/><path d="M-130 0H130M0-130V130"/><ellipse rx="199" ry="60" transform="rotate(-28)" stroke="#e5c88d"/><path d="M-161-113 159 114" opacity=".5"/><circle cx="171" cy="-77" r="5" fill="#d29b5a" stroke="none"/><circle cx="-113" cy="67" r="4" fill="#d29b5a" stroke="none"/><path d="M-18-157h36M0-175v36M-184 1h18M-175-8v18"/></g><g fill="#dfc898" font-family="Georgia" font-size="11"><text x="396" y="114">XXI</text><text x="111" y="291">I</text></g></svg><div class="art-bottom"><span>MANUSIA · GAGASAN · PERADABAN</span><strong>2.000 tahun</strong></div></div>`;
}
function home() {
  const last = data.chapters.find(c => c.id === storage.get('sejarah-last-v1', null));
  main.innerHTML = `<section class="hero"><div class="hero-copy"><div class="eyebrow">Dua milenium, satu dunia</div><h1>Masa lalu yang<br>membentuk<br><em>dunia kita.</em></h1><p>Jelajahi perjalanan manusia, kekuasaan, dan pengetahuan. Dari jaringan dunia klasik hingga kecerdasan buatan—abad demi abad.</p><div class="hero-actions"><a class="button" href="#jelajah">Mulai menjelajah <span>↗</span></a><a class="text-link" href="#tentang">Tentang ensiklopedia</a></div></div>${art()}</section><div class="metrics"><div class="metric"><strong>21</strong><span>Abad perjalanan<br>sejarah manusia</span></div><div class="metric"><strong>9</strong><span>Genealogi ilmu<br>lintas peradaban</span></div><div class="metric"><strong>2026</strong><span>Batas cakupan<br>dokumen sumber</span></div></div><section class="page-section">${last ? `<a class="resume" href="#${last.id}"><span>Lanjutkan bacaan · Abad ${last.century}</span><strong>${escape(last.title)} ↗</strong></a>` : ''}<div class="section-heading"><div><span class="section-kicker">01 / Menelusuri waktu</span><h2>Setiap abad, sebuah cerita.</h2></div><p>Dunia selalu terhubung. Telusuri perubahan masyarakat dan perjalanan gagasan dari satu zaman ke zaman berikutnya.</p></div><div class="era-tabs" aria-label="Pilih periode">${eraNames.map((n,i)=>`<button class="chip" data-era="${i}" aria-pressed="${i===0}">Abad ${ranges[i]}</button>`).join('')}</div><div class="cards" id="home-cards">${data.chapters.filter(c=>c.era===0).map(card).join('')}</div></section><section class="page-section"><div class="feature"><div><span class="section-kicker">02 / Jejak pengetahuan</span><h2>Tak ada gagasan<br>yang lahir sendiri.</h2><p>Ilmu tumbuh melalui perjumpaan. Ikuti perjalanan matematika, kedokteran, komputasi, dan pengetahuan lain melintasi budaya serta generasi.</p><a class="text-link" href="#ilmu">Telusuri genealogi ilmu ↗</a></div><div class="topic-links">${data.sciences.map((s,i)=>`<a href="#ilmu-${i+1}">${escape(s.title)} <span>↗</span></a>`).join('')}</div></div></section><section class="page-section"><blockquote class="quote">“Ilmu pengetahuan adalah warisan kumulatif manusia.”<small>Prinsip ensiklopedia sejarah global</small></blockquote></section>`;
  document.querySelectorAll('[data-era]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-era]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelector('#home-cards').innerHTML = data.chapters.filter(c=>c.era===Number(button.dataset.era)).map(card).join('');
  }));
}
function explore(onlySaved=false) {
  main.innerHTML = `<section class="page-section">${intro(onlySaved?'Perpustakaan pribadi':'01 / Menelusuri waktu',onlySaved?'Bacaan tersimpan.':'Jelajahi 21 abad.',onlySaved?'Koleksi bacaan pilihan Anda. Penanda disimpan di browser pada perangkat ini.':'Dari dunia klasik hingga dunia digital. Pilih sebuah abad untuk membaca naskah dari dokumen sumber.')}<div class="era-tabs" aria-label="Filter periode"><button class="chip" data-filter="all" aria-pressed="true">Semua abad</button>${eraNames.map((e,i)=>`<button class="chip" data-filter="${i}" aria-pressed="false">${e}</button>`).join('')}</div><p id="filter-count" class="section-kicker" role="status"></p><div id="all-cards" class="cards"></div></section>`;
  const update = filter => {
    const chapters = data.chapters.filter(c=>(!onlySaved||saved.includes(c.id))&&(filter==='all'||c.era===Number(filter)));
    document.querySelector('#filter-count').textContent = `${chapters.length} bab`;
    document.querySelector('#all-cards').innerHTML = chapters.length ? chapters.map(card).join('') : `<p class="empty">${onlySaved?'Belum ada bacaan tersimpan pada pilihan ini. Buka sebuah bab, lalu pilih “Simpan bacaan”.':'Tidak ada bab pada periode ini.'}</p>`;
  };
  update('all');
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    update(button.dataset.filter);
  }));
}
function paragraphs(text) {
  // Insert visual paragraph breaks without changing the original words or punctuation.
  const sentences = text.match(/[^.!?]+(?:[.!?]+[”’"]?|$)/g) || [text];
  const groups=[]; let group='';
  for (const sentence of sentences) {
    if (group && (group.length > 380 || sentence.includes('→') !== group.includes('→'))) { groups.push(group.trim()); group=''; }
    group+=sentence;
  }
  if(group.trim()) groups.push(group.trim());
  return groups.map(p=>`<p${p.includes('→')?' class="flow"':''}>${escape(p)}</p>`).join('');
}
function renderSections(sections) { return sections.map(s=>`${s.title?`<h2>${escape(s.title)}</h2>`:''}${paragraphs(s.text)}`).join(''); }
function sidebar(current) {
  return `<aside class="reader-sidebar" aria-label="Navigasi bab"><p>DAFTAR ABAD</p>${data.chapters.map(c=>`<a href="#${c.id}"${c.id===current?' aria-current="page"':''}>Abad ${String(c.century).padStart(2,'0')} <span>${escape(c.years)}</span></a>`).join('')}</aside>`;
}
function chapter(c) {
  storage.set('sejarah-last-v1',c.id);
  main.innerHTML = `<div class="progress" aria-hidden="true"></div><div class="reader-shell">${sidebar(c.id)}<article class="reader"><div class="breadcrumb"><a href="#jelajah">Jelajahi abad</a> / Abad ${c.century}</div><div class="eyebrow">${escape(data.eras[c.era])}</div><h1>${escape(c.title)}</h1><div class="reader-meta"><span>Abad ${c.century} · ${escape(c.years)}</span><span>${minutes(chapterText(c))} menit baca</span><button id="save" class="save-button" aria-pressed="${saved.includes(c.id)}">${saved.includes(c.id)?'◆ Bacaan tersimpan':'◇ Simpan bacaan'}</button></div><div class="reader-text">${renderSections(c.sections)}</div><div class="reader-end">Naskah dari <a href="assets/ensiklopedia-sejarah-global.pdf#page=${c.page}" target="_blank" rel="noopener">dokumen sumber, mulai halaman ${c.page} ↗</a>. Judul pendek ditambahkan untuk navigasi. <a href="#tentang">Baca catatan editorial.</a></div><nav class="reader-pagination" aria-label="Bab sebelum dan sesudah">${c.century>1?`<a href="#abad-${c.century-1}">← Abad ${c.century-1}</a>`:'<a href="#jelajah">← Semua abad</a>'}${c.century<21?`<a href="#abad-${c.century+1}">Abad ${c.century+1} →</a>`:'<a href="#ilmu">Genealogi ilmu →</a>'}</nav></article></div>`;
  document.querySelector('#save').addEventListener('click',event=>{
    saved = saved.includes(c.id) ? saved.filter(id=>id!==c.id) : [...saved,c.id];
    const persisted = storage.set('sejarah-saved-v1',saved);
    const active = saved.includes(c.id);
    event.currentTarget.setAttribute('aria-pressed',String(active));
    event.currentTarget.textContent = active?'◆ Bacaan tersimpan':'◇ Simpan bacaan';
    toast(persisted?(active?'Bacaan ditambahkan ke koleksi.':'Bacaan dihapus dari koleksi.'):'Penanda aktif untuk sesi ini; penyimpanan browser tidak tersedia.');
  });
}
function collection(type) {
  const science=type==='ilmu', items=science?data.sciences:data.synthesis;
  main.innerHTML=`<section class="page-section">${intro(science?'02 / Jejak pengetahuan':'03 / Melihat pola besar',science?'Genealogi ilmu modern.':'Sintesis 2.000 tahun.',science?'Setiap penemuan memiliki perjalanan panjang. Telusuri bagaimana gagasan diwariskan, diterjemahkan, dikembangkan, dan digunakan.':'Lihat hubungan lintas abad: pusat ekonomi, peperangan, komunikasi, institusi, dan perubahan masyarakat.')}<div class="collection">${items.map((s,i)=>`<a class="topic-card" href="#${type}-${i+1}"><span>${String(i+1).padStart(2,'0')} ↗</span><h2>${escape(s.title)}</h2><p>${escape(s.text.slice(0,130))}…</p></a>`).join('')}</div></section>`;
}
function topic(type,index) {
  const items=type==='ilmu'?data.sciences:data.synthesis, item=items[index];
  if(!item) return notFound();
  main.innerHTML=`<div class="reader-shell">${sidebar('')}<article class="reader"><div class="breadcrumb"><a href="#${type}">${type==='ilmu'?'Genealogi ilmu':'Sintesis sejarah'}</a> / ${escape(item.title)}</div><div class="eyebrow">Pengetahuan lintas zaman</div><h1>${escape(item.title)}</h1><div class="reader-text">${paragraphs(item.text)}</div><div class="reader-end">Disalin dari bagian ${type==='ilmu'?'VII — Genealogi Ilmu Modern':'VIII — Sintesis 2.000 Tahun'} pada dokumen sumber. Urutan panah mengikuti naskah asli dan merupakan ringkasan, bukan satu jalur sebab-akibat yang pasti. <a href="#tentang">Tentang sumber.</a></div><nav class="reader-pagination" aria-label="Navigasi topik"><a href="#${type}">← Semua topik</a>${index+1<items.length?`<a href="#${type}-${index+2}">Topik selanjutnya →</a>`:''}</nav></article></div>`;
}
function glossary() {
  main.innerHTML=`<section class="page-section">${intro('04 / Memahami istilah','Glosarium ringkas.','Sepuluh istilah untuk membantu membaca sejarah global. Definisi mengikuti dokumen sumber.')}<dl class="glossary">${data.glossary.map((g,i)=>`<div id="istilah-${i+1}"><dt>${escape(g.title)}</dt><dd>${escape(g.text)}</dd></div>`).join('')}</dl></section>`;
}
function about() {
  main.innerHTML=`<section class="page-section about">${intro('Catatan pembaca','Tentang ensiklopedia ini.','Masyarakat, kekuasaan, pengetahuan, dan warisannya hingga 2026.')}<h2>Lintas abad, lintas peradaban</h2>${paragraphs(data.about)}<h2>Cara membaca dokumen</h2>${paragraphs(data.guide)}<p>Dalam versi website, panjang dan kelengkapan setiap bab mengikuti PDF. Beberapa abad berupa uraian singkat, sementara bab lain memiliki subbagian. Judul pendek pada kartu adalah tambahan navigasi.</p><h2>Peta besar 2.000 tahun</h2>${data.overview.split(/ (?=Abad \d)/).map(p=>`<p>${escape(p)}</p>`).join('')}<div class="editorial"><h2>Catatan editorial dan sumber</h2>${paragraphs(data.editorial)}</div><p>Website ini mengadaptasi isi PDF yang diberikan, tanpa menambahkan klaim historis atau menganggap dokumen sebagai sumber akademik final. Cakupan “hingga 2026” mengikuti judul sumber dan bukan pembaruan otomatis.</p><a class="button" href="assets/ensiklopedia-sejarah-global.pdf" download>Unduh dokumen asli ↓</a><h2>Privasi bacaan</h2><p>Penanda bacaan dan bab terakhir disimpan di browser Anda. Tidak ada akun, pelacakan analitik, atau pengiriman riwayat bacaan. Font dimuat dari Google Fonts; jika tidak tersedia, website memakai font bawaan perangkat.</p></section>`;
}
const searchable = [
  ...data.chapters.map(c=>({title:`Abad ${c.century} — ${c.title}`,text:`${c.index} ${chapterText(c)}`,href:c.id,type:'Bab sejarah'})),
  ...data.sciences.map((s,i)=>({...s,href:`ilmu-${i+1}`,type:'Genealogi ilmu'})),
  ...data.synthesis.map((s,i)=>({...s,href:`sintesis-${i+1}`,type:'Sintesis sejarah'})),
  ...data.glossary.map((s,i)=>({...s,href:`glosarium/istilah-${i+1}`,type:'Glosarium'})),
  {title:'Tentang, cara membaca, dan catatan sumber',text:`${data.about} ${data.guide} ${data.overview} ${data.editorial}`,href:'tentang',type:'Tentang ensiklopedia'}
];
function highlight(text,query) {
  const index=text.toLocaleLowerCase('id').indexOf(query.toLocaleLowerCase('id'));
  return index<0?escape(text):`${escape(text.slice(0,index))}<mark>${escape(text.slice(index,index+query.length))}</mark>${escape(text.slice(index+query.length))}`;
}
function results(query) {
  search.value=query;
  const words=query.toLocaleLowerCase('id').split(/\s+/).filter(Boolean);
  const found=words.length?searchable.filter(item=>words.every(word=>`${item.title} ${item.text}`.toLocaleLowerCase('id').includes(word))):[];
  main.innerHTML=`<section class="page-section">${intro('Pencarian ensiklopedia',query?`Hasil untuk “${escape(query)}”`:'Apa yang ingin Anda temukan?',query?`${found.length} hasil di seluruh bab, genealogi ilmu, sintesis, dan glosarium.`:'Gunakan kolom pencarian di atas. Coba “Srivijaya”, “kertas”, atau “komputer”.')}<div aria-live="polite">${found.map(item=>{
    const start=Math.max(0,item.text.toLocaleLowerCase('id').indexOf(words[0])-70);
    const snippet=(start?'…':'')+item.text.slice(start,start+250)+(start+250<item.text.length?'…':'');
    return `<a class="result" href="#${item.href}"><small>${item.type}</small><h2>${highlight(item.title,query)} ↗</h2><p>${highlight(snippet,words[0])}</p></a>`;
  }).join('')||`<p class="empty">${query?'Belum ditemukan. Coba kata yang lebih singkat atau istilah lain.':'Pencarian mencakup seluruh naskah, bukan hanya judul.'}</p>`}</div></section>`;
}
function notFound(){main.innerHTML=`<section class="page-section">${intro('Halaman tidak ditemukan','Mari kembali ke perjalanan.','Alamat bab ini tidak tersedia.')}<a class="button" href="#jelajah">Jelajahi semua abad ↗</a></section>`;}
let toastTimer;
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2800);}
function route() {
  let hash;try{hash=decodeURIComponent(location.hash.slice(1))||'beranda';}catch{hash='404';}
  const parts=hash.split('/');
  const active=parts[0];
  document.querySelectorAll('.header nav a').forEach(a=>{const selected=a.hash===`#${active}`||(active.startsWith('abad-')&&a.hash==='#jelajah')||(active.startsWith('ilmu-')&&a.hash==='#ilmu');if(selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  const c=data.chapters.find(c=>c.id===active);
  let title='Dua Milenium, Satu Dunia';
  if(c){chapter(c);title=`Abad ${c.century}: ${c.title}`;}
  else if(active==='beranda')home();
  else if(active==='jelajah'||active==='tersimpan'){explore(active==='tersimpan');title=active==='jelajah'?'Jelajahi 21 Abad':'Bacaan Tersimpan';}
  else if(active==='ilmu'||active==='sintesis'){collection(active);title=active==='ilmu'?'Genealogi Ilmu Modern':'Sintesis 2.000 Tahun';}
  else if(/^(ilmu|sintesis)-\d+$/.test(active)){const [type,id]=active.split('-');topic(type,Number(id)-1);title=(type==='ilmu'?data.sciences:data.synthesis)[Number(id)-1]?.title||'Halaman tidak ditemukan';}
  else if(active==='glosarium'){glossary();title='Glosarium';}
  else if(active==='tentang'){about();title='Tentang dan Sumber';}
  else if(active==='cari'){const query=parts.slice(1).join('/');results(query);title=query?`Pencarian: ${query}`:'Pencarian';}
  else notFound();
  document.title=`${title} — Ensiklopedia Sejarah Global`;
  if(active!=='cari')search.value='';
  window.scrollTo({top:0,behavior:'instant'});
  main.focus({preventScroll:true});
  if(active==='glosarium'&&/^istilah-\d+$/.test(parts[1]||''))document.getElementById(parts[1])?.scrollIntoView();
}
document.querySelector('#search-form').addEventListener('submit',event=>{event.preventDefault();const hash=`#cari/${encodeURIComponent(search.value.trim())}`;if(location.hash===hash)route();else location.hash=hash;});
document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView();});
window.addEventListener('hashchange',route);
window.addEventListener('scroll',()=>{const el=document.querySelector('.progress');if(el){const article=document.querySelector('.reader');const total=article.offsetTop+article.offsetHeight-window.innerHeight;el.style.width=`${Math.min(100,Math.max(0,window.scrollY/Math.max(total,1)*100))}%`;}},{passive:true});
route();
