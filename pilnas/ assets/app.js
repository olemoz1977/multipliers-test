// v10.8 – Multipliers (SVG radar, offline, dark/light, PDF print)
const ARCH = [
  {key:'TM', name:'Talent Magnet', color:'#66a6ff'},
  {key:'LB', name:'Liberator',     color:'#59c173'},
  {key:'CH', name:'Challenger',    color:'#f6c453'},
  {key:'DM', name:'Debate Maker',  color:'#c792ea'},
  {key:'IN', name:'Investor',      color:'#ff6b6b'}
];

const QUESTIONS = [
  {a:'TM', t:'Padedu žmonėms atsiskleisti suteikdamas erdvę ir grįžtamąjį ryšį.'},
  {a:'TM', t:'Dažnai kviečiu naujus žmones prisidėti prie svarbių temų.'},
  {a:'TM', t:'Pastebiu žmonių stiprybes ir parenku tinkamas užduotis.'},
  {a:'TM', t:'Skiriu laiką talentui atpažinti komandoje.'},

  {a:'LB', t:'Aiškiai susitariame dėl standartų, bet leidžiu klysti mokantis.'},
  {a:'LB', t:'Kuriu saugią aplinką kalbėti apie problemas be kaltinimų.'},
  {a:'LB', t:'Skatinu komandoje drausmę laikytis susitarimų.'},
  {a:'LB', t:'Greitai reaguoju į nusižengimus, bet teisingai ir pagarbiai.'},

  {a:'CH', t:'Formuluoju ambiciją su aiškiu „kodėl“.'},
  {a:'CH', t:'Klausiu „kaip padarysime?“ vietoje „ar tai įmanoma?“'},
  {a:'CH', t:'Padedu komandai matyti didesnį paveikslą ir kryptį.'},
  {a:'CH', t:'Iššūkius paverčiu mokymosi galimybėmis.'},

  {a:'DM', t:'Prieš sprendimą kviečiu skirtingas perspektyvas ir faktus.'},
  {a:'DM', t:'Moku vesti konstruktyvias diskusijas be asmeniškumų.'},
  {a:'DM', t:'Skiriu laiko argumentų „už“ ir „prieš“ įvertinimui.'},
  {a:'DM', t:'Priimdamas sprendimą apibendrinu išgirstus požiūrius.'},

  {a:'IN', t:'Deleguoju rezultatą, o ne tik užduotis.'},
  {a:'IN', t:'Suteikiu reikiamus resursus ir pašalinu kliūtis.'},
  {a:'IN', t:'Sutariu dėl patikros taškų ir atsakomybės.'},
  {a:'IN', t:'Po delegavimo išlaikau pasitikėjimą ir palaikymą.'},

  {a:'SP', t:'Dažnai atidėlioju svarbius pokalbius (invertuotas).', inv:true},
  {a:'SP', t:'Retai prašau grįžtamojo ryšio (invertuotas).', inv:true},
  {a:'SP', t:'Konfliktuose linkęs gintis, o ne ieškoti sprendimų (invertuotas).', inv:true},
  {a:'SP', t:'Vengiu neapibrėžtumo ir rizikos (invertuotas).', inv:true},
  {a:'SP', t:'Dažnai jaučiu stresą darbe (invertuotas).', inv:true}
];

function shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}

function renderQuestions(){
  const container = document.getElementById('questions');
  container.innerHTML = '';
  let idx = 0;
  for(const q of shuffle([...QUESTIONS])){
    const row = document.createElement('div');
    row.className = 'q';
    const label = document.createElement('label');
    label.innerHTML = `<strong>${(++idx).toString().padStart(2,'0')}.</strong> ${q.t}`;
    const scale = document.createElement('div');
    scale.className = 'scale';
    for(let v=1; v<=5; v++){
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'q_'+idx; // unikalus
      input.value = v;
      input.required = true;
      scale.appendChild(input);
    }
    row.appendChild(label);
    row.appendChild(scale);
    row.dataset.arch = q.a;
    row.dataset.inv  = q.inv ? '1' : '0';
    container.appendChild(row);
  }
}

function collect(){
  const rows = [...document.querySelectorAll('.q')];
  const scores = {TM:0, LB:0, CH:0, DM:0, IN:0};
  const counts = {TM:0, LB:0, CH:0, DM:0, IN:0};
  let missing = 0;
  for(const r of rows){
    const chosen = r.querySelector('input[type=radio]:checked');
    if(!chosen){ missing++; continue; }
    let v = Number(chosen.value);
    if(r.dataset.inv==='1') v = 6 - v; // invertuoti SP
    const a = r.dataset.arch;
    if(a in scores){ scores[a] += v; counts[a] += 1; }
  }
  return {scores, counts, missing};
}

function normalize(sum, cnt){return cnt? (sum/cnt) : 0;}

function drawRadarSVG(vals){
  const svg = document.getElementById('radarSvg');
  svg.innerHTML = '';
  const R = 200, levels = 5;
  // grid
  for(let lvl=1; lvl<=levels; lvl++){
    const r = (lvl/levels)*R; const pts=[];
    for(let i=0;i<ARCH.length;i++){
      const ang = (-90 + i*360/ARCH.length) * Math.PI/180;
      pts.push(`${(r*Math.cos(ang)).toFixed(1)},${(r*Math.sin(ang)).toFixed(1)}`);
    }
    const poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    poly.setAttribute('points', pts.join(' '));
    poly.setAttribute('fill','none');
    poly.setAttribute('stroke', getComputedStyle(document.body).getPropertyValue('--grid').trim());
    svg.appendChild(poly);
  }
  // labels
  for(let i=0;i<ARCH.length;i++){
    const ang = (-90 + i*360/ARCH.length) * Math.PI/180;
    const x = (220*Math.cos(ang)).toFixed(1);
    const y = (220*Math.sin(ang)).toFixed(1);
    const text = document.createElementNS('http://www.w3.org/2000/svg','text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor','middle');
    text.setAttribute('dominant-baseline','middle');
    text.setAttribute('fill', getComputedStyle(document.body).getPropertyValue('--muted').trim());
    text.textContent = ARCH[i].name;
    svg.appendChild(text);
  }
  // data
  const pts = ARCH.map((_,i)=>{
    const ang = (-90 + i*360/ARCH.length) * Math.PI/180;
    const r = (vals[i]/5)*R;
    return `${(r*Math.cos(ang)).toFixed(1)},${(r*Math.sin(ang)).toFixed(1)}`;
  });
  const poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
  poly.setAttribute('points', pts.join(' '));
  poly.setAttribute('fill','rgba(102,166,255,0.25)');
  poly.setAttribute('stroke','#66a6ff');
  poly.setAttribute('stroke-width','2');
  svg.appendChild(poly);
}

function drawRadar(vals){
  // Jei yra Chart.js ir canvas – naudok Chart, kitaip SVG
  if(window.Chart && document.getElementById('radarCanvas')){
    const ctx = document.getElementById('radarCanvas').getContext('2d');
    if(window.__chart) window.__chart.destroy();
    window.__chart = new Chart(ctx, {
      type:'radar',
      data:{
        labels: ARCH.map(a=>a.name),
        datasets:[{ label:'Vidurkiai', data: vals, backgroundColor:'rgba(102,166,255,0.25)', borderColor:'#66a6ff', pointBackgroundColor:'#66a6ff' }]
      },
      options:{ scales:{ r:{ min:0, max:5, grid:{ color:getComputedStyle(document.body).getPropertyValue('--grid').trim() }, pointLabels:{ color:getComputedStyle(document.body).getPropertyValue('--muted').trim() } } }, plugins:{ legend:{ display:false } } }
    });
    document.getElementById('libStatus').textContent = 'Chart.js ✓';
  } else {
    drawRadarSVG(vals);
    document.getElementById('libStatus').textContent = 'SVG (be Chart.js)';
  }
}

function calc(){
  const {scores, counts, missing} = collect();
  if(missing>0){
    document.getElementById('status').innerHTML = `Liko neatsakytų: <span class="bad">${missing}</span>`;
    return;
  }
  const vals = ARCH.map(a=> normalize(scores[a.key], counts[a.key]));
  drawRadar(vals);
  const maxIdx = vals.indexOf(Math.max(...vals));
  const best = ARCH[maxIdx];
  document.getElementById('summary').innerHTML =
    `Dominuojantis archetipas: <strong>${best.name}</strong>. `+
    ARCH.map((a,i)=>`${a.name}: ${vals[i].toFixed(2)}`).join(' | ');
  document.getElementById('status').textContent = '✅ Apskaičiuota.';
}

function reset(){
  document.querySelectorAll('.q input[type=radio]:checked').forEach(i=>i.checked=false);
  document.getElementById('summary').textContent = 'Kol kas neapskaičiuota.';
  document.getElementById('status').textContent = '';
  drawRadar([0,0,0,0,0]);
}

function exportJSON(){
  const {scores, counts, missing} = collect();
  if(missing>0){ alert(`Užpildykite visus klausimus. Liko: ${missing}`); return; }
  const vals = ARCH.map(a=> normalize(scores[a.key], counts[a.key]));
  const payload = {
    timestamp: new Date().toISOString(),
    scores, counts,
    means: Object.fromEntries(ARCH.map((a,i)=>[a.key, Number(vals[i].toFixed(3))])),
    dominant: ARCH[vals.indexOf(Math.max(...vals))].key
  };
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'multipliers_result.json';
  a.click();
}

function toggleTheme(){
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight? '' : 'light');
  // perpiešti radarą, kad spalvos atsinaujintų
  const current = document.getElementById('summary').textContent.includes('Dominuojantis')
    ? Array.from(document.getElementById('summary').textContent.matchAll(/([0-9]+\.[0-9]{2})/g)).map(m=>Number(m[1]))
    : [0,0,0,0,0];
  drawRadar(current.length===5?current:[0,0,0,0,0]);
}

function initApp(){
  renderQuestions();
  reset();
  document.getElementById('calc').addEventListener('click', calc);
  document.getElementById('reset').addEventListener('click', ()=>{ renderQuestions(); reset(); });
  document.getElementById('pdf').addEventListener('click', ()=>window.print());
  document.getElementById('theme').addEventListener('click', toggleTheme);
  const exp = document.getElementById('export'); if(exp) exp.addEventListener('click', exportJSON);
  // biblioteka statusui
  document.getElementById('libStatus').textContent = (window.Chart? 'Chart.js ✓' : 'SVG (be Chart.js)');
}

window.addEventListener('DOMContentLoaded', initApp);
