/* ==========================================================================
   CAMPEONATO DE FÚTBOL INFANTIL - APP CORE LOGIC (v5.2 Definitiva)
   Club Atlético Comunicaciones de Mercedes (Corrientes)
   Categorías: 2015, 2016, 2017, 2018, 2019
   ========================================================================== */

// Unregister stale service workers immediately to prevent cached blank responses
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
      registration.unregister();
    }
  }).catch(() => {});
}

// Escudo Oficial Aurinegro de Club Atlético Comunicaciones de Mercedes (Corrientes)
const OFFICIAL_COMU_CREST = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 140'><g><path d='M60 5 L112 25 L112 75 C112 105 60 135 60 135 C60 135 8 105 8 75 L8 25 Z' fill='%23ffd700' stroke='%23000000' stroke-width='6'/><path d='M8 25 L112 25 L112 48 L8 48 Z' fill='%23000000'/><text x='60' y='41' text-anchor='middle' font-family='Arial, sans-serif' font-weight='900' font-size='13' fill='%23ffd700' letter-spacing='1'>COMUNICACIONES</text><rect x='22' y='48' width='15' height='68' fill='%23000000'/><rect x='52.5' y='48' width='15' height='75' fill='%23000000'/><rect x='83' y='48' width='15' height='68' fill='%23000000'/><path d='M20 70 L100 70 L100 95 L20 95 Z' fill='%23ffd700' stroke='%23000000' stroke-width='3'/><text x='60' y='88' text-anchor='middle' font-family='Arial, sans-serif' font-weight='900' font-size='14' fill='%23000000'>MERCEDES</text></g></svg>`;

const TEAM_CRESTS = {
  comu: OFFICIAL_COMU_CREST,
  boca: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23003b7a' stroke='%23ffcc00' stroke-width='4'/><rect x='10' y='38' width='80' height='24' fill='%23ffcc00'/><text x='50' y='28' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='%23fff'>CABJ</text></svg>`,
  river: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23ffffff' stroke='%23d32f2f' stroke-width='4'/><polygon points='15,25 85,75 75,85 10,35' fill='%23d32f2f'/><text x='50' y='55' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='16' fill='%23111'>CARP</text></svg>`,
  racing: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23ffffff' stroke='%2300a8e8' stroke-width='4'/><rect x='22' y='22' width='18' height='60' fill='%2300a8e8'/><rect x='60' y='22' width='18' height='60' fill='%2300a8e8'/><text x='50' y='82' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='%2300a8e8'>RACING</text></svg>`,
  independiente: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23d32f2f' stroke='%23ffffff' stroke-width='4'/><circle cx='50' cy='50' r='25' fill='%23ffffff'/><text x='50' y='56' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='18' fill='%23d32f2f'>CAI</text></svg>`,
  sanlorenzo: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23002b49' stroke='%23d32f2f' stroke-width='4'/><rect x='15' y='22' width='70' height='10' fill='%23d32f2f'/><rect x='15' y='42' width='70' height='10' fill='%23d32f2f'/><rect x='15' y='62' width='70' height='10' fill='%23d32f2f'/><text x='50' y='55' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='%23fff'>CASLA</text></svg>`,
  velez: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23ffffff' stroke='%230038a8' stroke-width='4'/><polygon points='20,25 50,60 80,25' fill='%230038a8'/><text x='50' y='82' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='%230038a8'>CAVS</text></svg>`,
  rosariocentral: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23002b49' stroke='%23ffcc00' stroke-width='4'/><rect x='20' y='22' width='15' height='60' fill='%23ffcc00'/><rect x='65' y='22' width='15' height='60' fill='%23ffcc00'/><text x='50' y='55' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='%23ffcc00'>CARC</text></svg>`,
  talleres: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23ffffff' stroke='%23001f54' stroke-width='4'/><rect x='25' y='22' width='12' height='60' fill='%23001f54'/><rect x='44' y='22' width='12' height='60' fill='%23001f54'/><rect x='63' y='22' width='12' height='60' fill='%23001f54'/><text x='50' y='82' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='%23001f54'>CAT</text></svg>`,
  lanus: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23800020' stroke='%23ffffff' stroke-width='4'/><circle cx='50' cy='50' r='25' fill='%23ffffff'/><text x='50' y='56' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='16' fill='%23800020'>CAL</text></svg>`,
  newells: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23000000' stroke='%23ffffff' stroke-width='4'/><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 Z' fill='%23d32f2f'/><text x='50' y='56' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='15' fill='%23ffffff'>NOB</text></svg>`,
  huracan: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23ffffff' stroke='%23dc2626' stroke-width='4'/><circle cx='50' cy='45' r='18' fill='%23dc2626'/><text x='50' y='82' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='%23dc2626'>CAH</text></svg>`
};

const DEFAULT_12_TEAMS = [
  { id: 'comu', name: 'Comunicaciones (Mercedes)', short: 'COM', crest: OFFICIAL_COMU_CREST, isHost: true },
  { id: 'boca', name: 'Boca Juniors', short: 'BOC', crest: TEAM_CRESTS.boca },
  { id: 'river', name: 'River Plate', short: 'RIV', crest: TEAM_CRESTS.river },
  { id: 'racing', name: 'Racing Club', short: 'RAC', crest: TEAM_CRESTS.racing },
  { id: 'independiente', name: 'Independiente', short: 'IND', crest: TEAM_CRESTS.independiente },
  { id: 'sanlorenzo', name: 'San Lorenzo', short: 'SLO', crest: TEAM_CRESTS.sanlorenzo },
  { id: 'velez', name: 'Vélez Sarsfield', short: 'VEL', crest: TEAM_CRESTS.velez },
  { id: 'rosariocentral', name: 'Rosario Central', short: 'CEN', crest: TEAM_CRESTS.rosariocentral },
  { id: 'talleres', name: 'Talleres de Córdoba', short: 'TAL', crest: TEAM_CRESTS.talleres },
  { id: 'lanus', name: 'Club Atlético Lanús', short: 'LAN', crest: TEAM_CRESTS.lanus },
  { id: 'newells', name: "Newell's Old Boys", short: 'NOB', crest: TEAM_CRESTS.newells },
  { id: 'huracan', name: 'Club Atlético Huracán', short: 'HUR', crest: TEAM_CRESTS.huracan }
];

const DEFAULT_SPONSORS = [
  { 
    id: 's1', 
    name: 'Gobierno de Corrientes', 
    tier: 'main', 
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70"><rect width="240" height="70" rx="10" fill="%23111827" stroke="%23ffd700" stroke-width="3"/><circle cx="38" cy="35" r="20" fill="%23ffd700"/><path d="M38 20 L42 30 L52 32 L44 39 L47 49 L38 43 L29 49 L32 39 L24 32 L34 30 Z" fill="%23111827"/><text x="135" y="32" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="12" fill="%23ffd700" letter-spacing="1">GOBIERNO DE</text><text x="135" y="52" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="%23ffffff" letter-spacing="1.5">CORRIENTES</text></svg>`, 
    url: 'https://www.corrientes.gob.ar/' 
  },
  { 
    id: 's2', 
    name: 'Municipalidad de Mercedes', 
    tier: 'main', 
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70"><rect width="240" height="70" rx="10" fill="%23ffd700" stroke="%23000000" stroke-width="3"/><rect x="10" y="10" width="220" height="50" rx="6" fill="%23000000"/><text x="120" y="32" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="11" fill="%23ffd700" letter-spacing="1">MUNICIPALIDAD DE</text><text x="120" y="53" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="17" fill="%23ffffff" letter-spacing="2">MERCEDES</text></svg>`, 
    url: 'https://mercedes.gob.ar/' 
  },
  { 
    id: 's3', 
    name: 'Supermercado El Cartero', 
    tier: 'gold', 
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70"><rect width="240" height="70" rx="10" fill="%2316a34a" stroke="%23ffd700" stroke-width="2.5"/><text x="120" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="11" fill="%23ffd700" letter-spacing="1">SUPERMERCADOS</text><text x="120" y="53" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="17" fill="%23ffffff" letter-spacing="1">EL CARTERO</text></svg>`, 
    url: '#' 
  },
  { 
    id: 's4', 
    name: 'Yerba Mate Taragüí', 
    tier: 'gold', 
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70"><rect width="240" height="70" rx="10" fill="%23dc2626" stroke="%23ffffff" stroke-width="2.5"/><text x="120" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="21" fill="%23ffd700" letter-spacing="2">TARAGÜÍ</text></svg>`, 
    url: 'https://www.taragui.com/' 
  },
  { 
    id: 's5', 
    name: 'Banco de Corrientes', 
    tier: 'silver', 
    logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70"><rect width="240" height="70" rx="10" fill="%231e3a8a" stroke="%2360a5fa" stroke-width="2.5"/><text x="120" y="31" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="11" fill="%2393c5fd" letter-spacing="1">BANCO DE</text><text x="120" y="52" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="%23ffffff" letter-spacing="1.5">CORRIENTES</text></svg>`, 
    url: 'https://www.bancodecorrientes.com.ar/' 
  }
];

const CATEGORIES = ['2015', '2016', '2017', '2018', '2019'];

// Global App State
let appState = {
  currentCategory: '2015',
  currentTab: 'fixture',
  categoriesData: {},
  sponsors: DEFAULT_SPONSORS,
  isAdmin: false
};

// --- Conexión a Firebase (datos en vivo, compartidos por todos los dispositivos) ---
const fbDB = firebase.database();
const fbAuth = firebase.auth();
const stateRef = fbDB.ref('tournamentState');
let firebaseReady = false; // evita pisar datos remotos antes de recibir el primer snapshot

// Repara/completa la estructura de categorías (equipos, grupos, fixtures, playoffs)
function repairCategoriesData(categoriesData) {
  categoriesData = categoriesData || {};
  CATEGORIES.forEach(cat => {
    let catData = categoriesData[cat];
    if (!catData) {
      catData = {
        format: 'groups_cup',
        teams: JSON.parse(JSON.stringify(DEFAULT_12_TEAMS)),
        groups: { A: [], B: [], C: [] },
        fixtures: [],
        playoffs: createEmptyPlayoffsObj()
      };
      categoriesData[cat] = catData;
      appState.categoriesData = categoriesData;
      executeGroupDrawBackend(cat, false);
    } else {
      if (!catData.format) catData.format = 'groups_cup';
      if (!catData.teams || !Array.isArray(catData.teams) || catData.teams.length === 0) {
        catData.teams = JSON.parse(JSON.stringify(DEFAULT_12_TEAMS));
      }
      if (!catData.groups || !catData.groups.A || catData.groups.A.length === 0) {
        catData.groups = { A: [], B: [], C: [] };
        appState.categoriesData = categoriesData;
        executeGroupDrawBackend(cat, false);
      }
      if (!catData.fixtures || !Array.isArray(catData.fixtures) || catData.fixtures.length === 0) {
        catData.fixtures = generateGroupsFixtures(catData.groups, cat);
      }
      if (!catData.playoffs || !catData.playoffs.initialCruces) {
        catData.playoffs = createEmptyPlayoffsObj();
      }
    }
  });
  return categoriesData;
}

// Se llama una vez al arrancar: escucha la base en tiempo real y arma el estado local.
function initData() {
  stateRef.on('value', (snapshot) => {
    const remote = snapshot.val();
    if (remote && remote.categoriesData) {
      appState.currentCategory = remote.currentCategory || appState.currentCategory || '2015';
      appState.categoriesData = repairCategoriesData(remote.categoriesData);
      appState.sponsors = (remote.sponsors && remote.sponsors.length) ? remote.sponsors : DEFAULT_SPONSORS;
    } else if (!firebaseReady) {
      // Primera vez que se usa la app y todavía no hay nada guardado en Firebase.
      generateDefaultTournamentState();
    }
    firebaseReady = true;
    safeRenderApp();
  }, (error) => {
    console.error('Error de conexión con Firebase:', error);
    if (!firebaseReady) {
      generateDefaultTournamentState();
      firebaseReady = true;
      safeRenderApp();
    }
    alert('No se pudo conectar con la base de datos en línea (revisá tu conexión a internet). Mostrando datos locales mientras tanto.');
  });

  fbAuth.onAuthStateChanged((user) => {
    appState.isAdmin = !!user;
    renderAdminHeaderStatus();
  });
}

// Guarda el estado en Firebase para que se vea igual en todos los dispositivos.
// Solo funciona si hay una sesión de administrador activa (lo exige la regla de seguridad).
function saveState() {
  if (!appState.isAdmin) return; // los visitantes solo leen, nunca escriben
  const dataToSave = {
    currentCategory: appState.currentCategory,
    currentTab: appState.currentTab,
    categoriesData: appState.categoriesData,
    sponsors: appState.sponsors
  };
  stateRef.set(dataToSave).catch((e) => {
    console.error('Error guardando en Firebase:', e);
    if (e && e.code === 'PERMISSION_DENIED') {
      alert('No se pudo guardar: tu sesión de administrador no es válida o expiró. Cerrá sesión y volvé a ingresar.');
    } else {
      alert('No se pudo guardar el cambio (' + (e && e.message ? e.message : 'error desconocido') + '). Probá de nuevo.');
    }
  });
}

// Comprime y redimensiona una imagen antes de convertirla a base64,
// para evitar llenar el localStorage con fotos pesadas sin procesar.
function resizeImageToDataURL(file, maxDim = 220, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height) {
          if (width > maxDim) { height = Math.round(height * (maxDim / width)); width = maxDim; }
        } else {
          if (height > maxDim) { width = Math.round(width * (maxDim / height)); height = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('No se pudo procesar la imagen.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

function generateDefaultTournamentState() {
  appState.categoriesData = {};
  CATEGORIES.forEach(cat => {
    const teams = JSON.parse(JSON.stringify(DEFAULT_12_TEAMS));
    appState.categoriesData[cat] = {
      format: 'groups_cup',
      teams: teams,
      groups: { A: [], B: [], C: [] },
      fixtures: [],
      playoffs: createEmptyPlayoffsObj()
    };
    executeGroupDrawBackend(cat, false);
  });
  appState.sponsors = [...DEFAULT_SPONSORS];
  saveState();
}

function createEmptyPlayoffsObj() {
  return {
    initialCruces: [
      { id: 'cruce_0', label: '1er Mejor 1° vs 2do Mejor 3°', home: null, away: null, homeScore: null, awayScore: null, winner: null, loser: null, dayDate: 'Sábado - 15:00 hs' },
      { id: 'cruce_1', label: '2do Mejor 1° vs 1er Mejor 3°', home: null, away: null, homeScore: null, awayScore: null, winner: null, loser: null, dayDate: 'Sábado - 16:15 hs' },
      { id: 'cruce_2', label: '3er Mejor 1° vs Peor 2°', home: null, away: null, homeScore: null, awayScore: null, winner: null, loser: null, dayDate: 'Sábado - 17:30 hs' },
      { id: 'cruce_3', label: '1er Mejor 2° vs 2do Mejor 2°', home: null, away: null, homeScore: null, awayScore: null, winner: null, loser: null, dayDate: 'Sábado - 18:45 hs' }
    ],
    oroSemis: [
      { id: 'oro_semi_0', home: null, away: null, homeScore: null, awayScore: null, winner: null, loser: null, dayDate: 'Domingo - 10:00 hs' },
      { id: 'oro_semi_1', home: null, away: null, homeScore: null, awayScore: null, winner: null, loser: null, dayDate: 'Domingo - 11:15 hs' }
    ],
    oroFinal: { id: 'oro_final', home: null, away: null, homeScore: null, awayScore: null, winner: null, dayDate: 'Gran Final Copa de Oro' },
    oroThird: { id: 'oro_third', home: null, away: null, homeScore: null, awayScore: null, winner: null, dayDate: '3er Puesto Copa de Oro' },
    plataSemis: [
      { id: 'plata_semi_0', home: null, away: null, homeScore: null, awayScore: null, winner: null, loser: null, dayDate: 'Domingo - 09:00 hs' },
      { id: 'plata_semi_1', home: null, away: null, homeScore: null, awayScore: null, winner: null, loser: null, dayDate: 'Domingo - 10:15 hs' }
    ],
    plataFinal: { id: 'plata_final', home: null, away: null, homeScore: null, awayScore: null, winner: null, dayDate: 'Gran Final Copa de Plata' },
    plataThird: { id: 'plata_third', home: null, away: null, homeScore: null, awayScore: null, winner: null, dayDate: '3er Puesto Copa de Plata' },
    oroDrawn: false,
    plataDrawn: false,
    generated: false
  };
}

// --------------------------------------------------------------------------
// FORMAT SWITCHING & GROUP DRAW BACKEND LOGIC
// --------------------------------------------------------------------------

function switchCategoryFormat(catYear, newFormat) {
  if (!appState.isAdmin) return openAdminPinModal();
  const catData = appState.categoriesData[catYear];
  if (!catData) return;

  catData.format = newFormat;
  if (newFormat === 'groups_cup') {
    executeGroupDrawBackend(catYear, false);
  } else {
    catData.fixtures = generateSingleTableFixture(catData.teams, catYear);
    catData.playoffs = createEmptyPlayoffsObj();
  }
  saveState();
  safeRenderApp();
}

function executeGroupDrawBackend(catYear, resetScores = true) {
  const catData = appState.categoriesData[catYear];
  if (!catData || !catData.teams || catData.teams.length === 0) return;

  const shuffled = [...catData.teams].sort(() => Math.random() - 0.5);
  const groups = { A: [], B: [], C: [] };
  
  shuffled.forEach((team, index) => {
    if (index % 3 === 0) groups.A.push(team.id);
    else if (index % 3 === 1) groups.B.push(team.id);
    else groups.C.push(team.id);
  });

  catData.groups = groups;
  catData.fixtures = generateGroupsFixtures(groups, catYear);
  catData.playoffs = createEmptyPlayoffsObj();

  if (resetScores) {
    saveState();
  }
}

function generateGroupsFixtures(groups, catYear) {
  const allJornadas = [];

  ['A', 'B', 'C'].forEach(grpKey => {
    const teamIds = (groups && groups[grpKey]) ? groups[grpKey] : [];
    if (teamIds.length < 2) return;

    for (let r = 0; r < teamIds.length - 1; r++) {
      let jornadaObj = allJornadas[r];
      if (!jornadaObj) {
        jornadaObj = { jornadaNumber: r + 1, matches: [] };
        allJornadas[r] = jornadaObj;
      }

      for (let i = 0; i < Math.floor(teamIds.length / 2); i++) {
        const homeIdx = (r + i) % (teamIds.length - 1);
        let awayIdx = (teamIds.length - 1 - i + r) % (teamIds.length - 1);
        if (i === 0) awayIdx = teamIds.length - 1;

        const homeId = teamIds[homeIdx];
        const awayId = teamIds[awayIdx];

        if (homeId && awayId) {
          const matchId = `m_${catYear}_grp${grpKey}_j${r + 1}_${i}`;
          jornadaObj.matches.push({
            id: matchId,
            group: grpKey,
            home: homeId,
            away: awayId,
            homeScore: null,
            awayScore: null,
            status: 'scheduled',
            dayDate: `Jornada ${r + 1}`,
            time: `${9 + (r * 2) + i}:00 hs`,
            pitch: `Cancha Grupo ${grpKey}`
          });
        }
      }
    }
  });

  return allJornadas.filter(j => j && j.matches && j.matches.length > 0);
}

function generateSingleTableFixture(teams, catYear) {
  const rounds = [];
  const teamList = teams || [];
  for (let i = 0; i < Math.min(3, teamList.length - 1); i++) {
    const matches = [];
    for (let j = 0; j < Math.floor(teamList.length / 2); j++) {
      const home = teamList[j];
      const away = teamList[teamList.length - 1 - j];
      if (home && away) {
        matches.push({
          id: `m_${catYear}_gen_j${i + 1}_${j}`,
          group: null,
          home: home.id,
          away: away.id,
          homeScore: null,
          awayScore: null,
          status: 'scheduled',
          dayDate: `Fecha ${i + 1}`,
          time: '10:00 hs',
          pitch: 'Cancha Estadio'
        });
      }
    }
    rounds.push({ jornadaNumber: i + 1, matches: matches });
  }
  return rounds;
}

// --------------------------------------------------------------------------
// STANDINGS & QUALIFIED RANKING CALCULATIONS
// --------------------------------------------------------------------------

function calculateGroupStandings(category, groupLetter) {
  const catData = appState.categoriesData ? appState.categoriesData[category] : null;
  if (!catData) return [];

  const groupTeamIds = (catData.groups && catData.groups[groupLetter]) ? catData.groups[groupLetter] : [];
  const stats = {};

  groupTeamIds.forEach(teamId => {
    const teamObj = getTeamObj(teamId);
    stats[teamId] = {
      ...teamObj,
      group: groupLetter,
      pts: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0
    };
  });

  (catData.fixtures || []).forEach(round => {
    (round.matches || []).forEach(m => {
      if (m.group === groupLetter && m.status === 'finished' && m.homeScore !== null && m.awayScore !== null) {
        const home = stats[m.home];
        const away = stats[m.away];
        if (home && away) {
          home.pj += 1; away.pj += 1;
          home.gf += m.homeScore; home.gc += m.awayScore;
          away.gf += m.awayScore; away.gc += m.homeScore;

          if (m.homeScore > m.awayScore) {
            home.pts += 3; home.pg += 1; away.pp += 1;
          } else if (m.homeScore < m.awayScore) {
            away.pts += 3; away.pg += 1; home.pp += 1;
          } else {
            home.pts += 1; away.pts += 1; home.pe += 1; away.pe += 1;
          }
        }
      }
    });
  });

  return Object.values(stats).map(t => {
    t.dg = t.gf - t.gc;
    return t;
  }).sort(sortTeamsComparator);
}

function sortTeamsComparator(a, b) {
  if (!a || !b) return 0;
  if (b.pts !== a.pts) return (b.pts || 0) - (a.pts || 0);
  if (b.dg !== a.dg) return (b.dg || 0) - (a.dg || 0);
  if (b.gf !== a.gf) return (b.gf || 0) - (a.gf || 0);
  return (a.name || '').localeCompare(b.name || '');
}

function calculateQualifiedTeamsRanking(category) {
  const tableA = calculateGroupStandings(category, 'A') || [];
  const tableB = calculateGroupStandings(category, 'B') || [];
  const tableC = calculateGroupStandings(category, 'C') || [];

  const primeros = [tableA[0], tableB[0], tableC[0]].filter(Boolean).sort(sortTeamsComparator);
  const segundos = [tableA[1], tableB[1], tableC[1]].filter(Boolean).sort(sortTeamsComparator);
  const terceros = [tableA[2], tableB[2], tableC[2]].filter(Boolean).sort(sortTeamsComparator);

  const mejoresTerceros = terceros.slice(0, 2);

  const qualifiedList = [
    { rankLabel: '1er Mejor 1°', team: primeros[0] || null },
    { rankLabel: '2do Mejor 1°', team: primeros[1] || null },
    { rankLabel: '3er Mejor 1°', team: primeros[2] || null },
    { rankLabel: '1er Mejor 2°', team: segundos[0] || null },
    { rankLabel: '2do Mejor 2°', team: segundos[1] || null },
    { rankLabel: '3er Segundo (Peor 2°)', team: segundos[2] || null },
    { rankLabel: '1er Mejor 3°', team: mejoresTerceros[0] || null },
    { rankLabel: '2do Mejor 3°', team: mejoresTerceros[1] || null }
  ];

  return { primeros, segundos, terceros, mejoresTerceros, qualifiedList };
}

function calculateSingleStandings(category) {
  const catData = appState.categoriesData ? appState.categoriesData[category] : null;
  if (!catData) return [];

  const stats = {};
  (catData.teams || []).forEach(t => {
    stats[t.id] = { ...t, pts: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0 };
  });

  (catData.fixtures || []).forEach(round => {
    (round.matches || []).forEach(m => {
      if (m.status === 'finished' && m.homeScore !== null && m.awayScore !== null) {
        const home = stats[m.home];
        const away = stats[m.away];
        if (home && away) {
          home.pj += 1; away.pj += 1;
          home.gf += m.homeScore; home.gc += m.awayScore;
          away.gf += m.awayScore; away.gc += m.homeScore;

          if (m.homeScore > m.awayScore) {
            home.pts += 3; home.pg += 1; away.pp += 1;
          } else if (m.homeScore < m.awayScore) {
            away.pts += 3; away.pg += 1; home.pp += 1;
          } else {
            home.pts += 1; away.pts += 1; home.pe += 1; away.pe += 1;
          }
        }
      }
    });
  });

  return Object.values(stats).map(t => {
    t.dg = t.gf - t.gc;
    return t;
  }).sort(sortTeamsComparator);
}

// --------------------------------------------------------------------------
// RENDER VIEWS WITH SAFE ERROR HANDLING
// --------------------------------------------------------------------------

function safeRenderApp() {
  try {
    renderApp();
  } catch (err) {
    console.error('Render error encountered, auto-healing state:', err);
    generateDefaultTournamentState();
    renderApp();
  }
}

function renderApp() {
  renderAdminHeaderStatus();
  renderMarqueeSponsors();
  renderCategoryPills();
  renderTabButtons();
  renderMainContent();
  renderFooterSponsors();
}

function renderAdminHeaderStatus() {
  const container = document.getElementById('adminHeaderBtn');
  if (!container) return;
  if (appState.isAdmin) {
    container.innerHTML = `
      <button class="btn-primary" style="background: #22c55e; color: #fff;" onclick="logoutAdmin()">
        🔓 Admin (Cerrar Sesión)
      </button>
    `;
  } else {
    container.innerHTML = `
      <button class="btn-secondary" onclick="openAdminPinModal()">
        🔐 Ingresar Admin
      </button>
    `;
  }
}

function renderCategoryPills() {
  const container = document.getElementById('categoryPills');
  if (!container) return;
  container.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-btn ${appState.currentCategory === cat ? 'active' : ''}" onclick="selectCategory('${cat}')">
      Cat. ${cat}
    </button>
  `).join('');
}

function renderTabButtons() {
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  const isGroups = catData && catData.format === 'groups_cup';

  const tabs = [
    { id: 'fixture', label: '📅 Fixture y Horarios' },
    { id: 'standings', label: isGroups ? '🏆 Posiciones y Grupos' : '🏆 Tabla de Posiciones' },
    { id: 'cruces', label: isGroups ? '⚔️ Cruces, Copa Oro y Plata' : '⚔️ Cruces y Gran Final' },
    { id: 'teams', label: '👥 Equipos de la Categoría' },
    { id: 'sponsors', label: '🤝 Auspiciantes / Sponsors' },
    { id: 'app', label: '📱 Descargar App' }
  ];

  const container = document.getElementById('viewTabs');
  if (!container) return;
  container.innerHTML = tabs.map(tab => `
    <button class="tab-btn ${appState.currentTab === tab.id ? 'active' : ''}" onclick="selectTab('${tab.id}')">
      ${tab.label}
    </button>
  `).join('');
}

function renderMarqueeSponsors() {
  const track = document.getElementById('sponsorMarqueeTrack');
  if (!track) return;
  const list = [...(appState.sponsors || DEFAULT_SPONSORS), ...(appState.sponsors || DEFAULT_SPONSORS)];
  track.innerHTML = list.map(sp => `
    <a href="${sp.url && sp.url !== '#' ? sp.url : 'javascript:void(0)'}" target="${sp.url && sp.url !== '#' ? '_blank' : '_self'}" class="sponsor-item-mini" rel="noopener">
      <img src="${sp.logo}" alt="${sp.name}" title="${sp.name}">
    </a>
  `).join('');
}

function renderFooterSponsors() {
  const container = document.getElementById('footerSponsorsGrid');
  if (!container) return;
  const list = appState.sponsors || DEFAULT_SPONSORS;
  container.innerHTML = list.map(sp => `
    <a href="${sp.url && sp.url !== '#' ? sp.url : 'javascript:void(0)'}" target="${sp.url && sp.url !== '#' ? '_blank' : '_self'}" title="${sp.name}" rel="noopener">
      <img src="${sp.logo}" alt="${sp.name}" class="footer-sponsor-img">
    </a>
  `).join('');
}

function renderMainContent() {
  const container = document.getElementById('mainContent');
  if (!container) return;

  switch (appState.currentTab) {
    case 'fixture':
      container.innerHTML = renderFixtureView();
      break;
    case 'standings':
      container.innerHTML = renderStandingsView();
      break;
    case 'cruces':
      container.innerHTML = renderCrucesView();
      break;
    case 'teams':
      container.innerHTML = renderTeamsManagementView();
      break;
    case 'sponsors':
      container.innerHTML = renderSponsorsView();
      break;
    case 'app':
      container.innerHTML = renderAppDownloadView();
      break;
    default:
      container.innerHTML = renderFixtureView();
  }
}

// --------------------------------------------------------------------------
// 1. FIXTURE VIEW
// --------------------------------------------------------------------------

function renderFixtureView() {
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData) return '<p style="padding:2rem; text-align:center; color:var(--text-muted);">No hay datos cargados para esta categoría.</p>';

  const isGroups = catData.format === 'groups_cup';
  const fixtures = catData.fixtures || [];

  return `
    <div class="format-banner">
      <div>
        <span style="font-weight: 700; color: var(--text-muted); font-size: 0.85rem; display: block;">Modalidad de Competición:</span>
        <span class="format-badge ${isGroups ? 'groups' : 'general'}">
          ${isGroups ? '🎲 Sorteo 3 Grupos + Copas Oro y Plata' : '📊 Tabla General Única (Todos contra Todos)'}
        </span>
      </div>
      ${appState.isAdmin ? `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn-secondary" style="font-size: 0.8rem;" onclick="switchCategoryFormat('${appState.currentCategory}', '${isGroups ? 'general_table' : 'groups_cup'}')">
            🔄 Cambiar a ${isGroups ? 'Tabla General Única' : 'Sorteo 3 Grupos + Copas'}
          </button>
          ${isGroups ? `
            <button class="btn-primary" style="font-size: 0.8rem;" onclick="startInteractiveGroupDraw()">
              🎲 Re-Sortear Grupos
            </button>
          ` : ''}
        </div>
      ` : ''}
    </div>

    <div class="section-title">
      <div>
        <span>Fixture y Calendario de Partidos</span>
        <span class="badge">Categoría ${appState.currentCategory}</span>
      </div>
    </div>

    ${fixtures.length === 0 ? `
      <div style="background: var(--bg-card); padding: 2rem; text-align: center; border-radius: 12px; margin-top: 1rem; border: 1px dashed var(--border-color);">
        <p style="color: var(--primary-gold); font-weight: 700;">No hay partidos generados aún.</p>
        ${appState.isAdmin ? `
          <button class="btn-primary" style="margin-top: 1rem;" onclick="startInteractiveGroupDraw()">🎲 Realizar Sorteo de Grupos</button>
        ` : ''}
      </div>
    ` : fixtures.map((jornada) => `
      <div class="jornada-controls" style="margin-top: 1.5rem;">
        <span class="jornada-title">Jornada ${jornada.jornadaNumber}</span>
      </div>

      <div class="matches-grid">
        ${(jornada.matches || []).map(m => {
          const homeTeam = getTeamObj(m.home);
          const awayTeam = getTeamObj(m.away);
          const isComuMatch = homeTeam.id === 'comu' || awayTeam.id === 'comu';

          return `
            <div class="match-card ${isComuMatch ? 'is-comu' : ''}">
              <div class="match-header">
                <div style="display: flex; flex-direction: column; gap: 0.15rem;">
                  <span style="font-weight: 800; color: var(--primary-gold);">
                    ${m.group ? `<span class="group-badge-${m.group}">Grupo ${m.group}</span> ` : ''}
                    📅 ${m.dayDate || 'Por definir'} • 🕒 ${m.time || ''}
                  </span>
                  <span style="color: var(--text-muted); font-size: 0.75rem;">📍 ${m.pitch || 'Cancha Comunicaciones'}</span>
                </div>
                <span class="status-pill ${m.status}">
                  ${m.status === 'finished' ? 'Finalizado' : (m.status === 'live' ? '• En Vivo' : 'Programado')}
                </span>
              </div>

              <div class="teams-vs">
                <div class="team-box">
                  <img src="${homeTeam.crest}" class="team-crest" alt="${homeTeam.name}">
                  <span class="team-name">${homeTeam.name}</span>
                </div>

                <div class="score-display">
                  <span class="score-num">${m.homeScore !== null && m.homeScore !== undefined ? m.homeScore : '-'}</span>
                  <span class="score-divider">:</span>
                  <span class="score-num">${m.awayScore !== null && m.awayScore !== undefined ? m.awayScore : '-'}</span>
                </div>

                <div class="team-box">
                  <img src="${awayTeam.crest}" class="team-crest" alt="${awayTeam.name}">
                  <span class="team-name">${awayTeam.name}</span>
                </div>
              </div>

              <div class="match-footer">
                <small style="color: var(--text-muted);">Campeonato Mercedes 2026</small>
                <button class="edit-score-btn" onclick="openScoreModal('${m.id}')">
                  ${appState.isAdmin ? '✏️ Editar Resultado' : '🔒 Iniciar Sesión Admin'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `).join('')}
  `;
}

// --------------------------------------------------------------------------
// 2. STANDINGS VIEW
// --------------------------------------------------------------------------

function renderStandingsView() {
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData) return '<p style="padding:2rem; text-align:center;">No hay datos de posiciones.</p>';

  const isGroups = catData.format === 'groups_cup';

  if (!isGroups) {
    const standings = calculateSingleStandings(appState.currentCategory);
    return `
      <div class="section-title">
        <div>
          <span>Tabla General de Posiciones</span>
          <span class="badge">Categoría ${appState.currentCategory}</span>
        </div>
      </div>
      ${renderStandingsTableMarkup(standings, 'Tabla General Única')}
    `;
  }

  const standingsA = calculateGroupStandings(appState.currentCategory, 'A');
  const standingsB = calculateGroupStandings(appState.currentCategory, 'B');
  const standingsC = calculateGroupStandings(appState.currentCategory, 'C');
  const ranking = calculateQualifiedTeamsRanking(appState.currentCategory);

  return `
    <div class="section-title">
      <div>
        <span>Tablas de Posiciones por Grupos</span>
        <span class="badge">Categoría ${appState.currentCategory}</span>
      </div>
      <button class="btn-primary" onclick="selectTab('cruces')">⚡ Ver Cruces y Copas</button>
    </div>

    <div class="groups-grid">
      <div class="group-card">
        <h3 style="color: var(--primary-gold); margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
          <span>🏆 GRUPO A</span>
          <span class="group-badge-A">Grupo A</span>
        </h3>
        ${renderGroupMiniTable(standingsA)}
      </div>

      <div class="group-card">
        <h3 style="color: #38bdf8; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
          <span>🏆 GRUPO B</span>
          <span class="group-badge-B">Grupo B</span>
        </h3>
        ${renderGroupMiniTable(standingsB)}
      </div>

      <div class="group-card">
        <h3 style="color: #a855f7; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
          <span>🏆 GRUPO C</span>
          <span class="group-badge-C">Grupo C</span>
        </h3>
        ${renderGroupMiniTable(standingsC)}
      </div>
    </div>

    <div class="table-card" style="margin-top: 2rem;">
      <div style="padding: 1.25rem; border-bottom: 1px solid var(--border-color); background: rgba(255,215,0,0.05);">
        <h3 style="color: var(--primary-gold); font-size: 1.15rem; font-weight: 900; text-transform: uppercase;">
          ⭐ Ranking General & Clasificados a la Ronda Final (8 Equipos)
        </h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">
          Clasifican los 3 Primeros, los 3 Segundos y los 2 Mejores Terceros de la Fase de Grupos.
        </p>
      </div>

      <div class="standings-table-wrapper">
        <table class="standings-table">
          <thead>
            <tr>
              <th style="text-align: left; padding-left: 1rem;">Mérito / Condición</th>
              <th>Equipo Clasificado</th>
              <th>Grupo Orig.</th>
              <th>PTS</th>
              <th>DG</th>
              <th>GF</th>
              <th>Destino en Cruces</th>
            </tr>
          </thead>
          <tbody>
            ${(ranking.qualifiedList || []).map((item, idx) => {
              const t = item.team;
              if (!t) return `<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">${item.rankLabel}: Por definir</td></tr>`;
              const isTercero = idx >= 6;

              let matchLabel = '';
              if (idx === 0) matchLabel = 'vs 2° Mejor Tercero (Cruce 1)';
              if (idx === 1) matchLabel = 'vs 1er Mejor Tercero (Cruce 2)';
              if (idx === 2) matchLabel = 'vs Peor Segundo (Cruce 3)';
              if (idx === 3) matchLabel = 'vs 2do Mejor Segundo (Cruce 4)';
              if (idx === 4) matchLabel = 'vs 1er Mejor Segundo (Cruce 4)';
              if (idx === 5) matchLabel = 'vs 3er Mejor Primero (Cruce 3)';
              if (idx === 6) matchLabel = 'vs 2do Mejor Primero (Cruce 2)';
              if (idx === 7) matchLabel = 'vs 1er Mejor Primero (Cruce 1)';

              return `
                <tr class="${isTercero ? 'tr-qualify-tercero' : 'tr-qualify-oro'}">
                  <td style="font-weight: 800; color: var(--primary-gold); padding-left: 1rem;">${item.rankLabel}</td>
                  <td class="team-cell">
                    <img src="${t.crest}" style="width: 26px; height: 26px; object-fit: contain;">
                    <span>${t.name}</span>
                  </td>
                  <td><span class="group-badge-${t.group}">Gr. ${t.group}</span></td>
                  <td class="pts-col">${t.pts}</td>
                  <td>${t.dg > 0 ? '+' + t.dg : t.dg}</td>
                  <td>${t.gf}</td>
                  <td style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">${matchLabel}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderGroupMiniTable(standings) {
  if (!standings || standings.length === 0) return '<p style="color:var(--text-muted); font-size:0.85rem;">Esperando partidos...</p>';

  return `
    <table class="standings-table" style="font-size: 0.85rem;">
      <thead>
        <tr>
          <th style="text-align: left;">Equipo</th>
          <th>PTS</th>
          <th>PJ</th>
          <th>DG</th>
        </tr>
      </thead>
      <tbody>
        ${standings.map((t, idx) => `
          <tr style="${idx < 2 ? 'background: rgba(255,215,0,0.06);' : ''}">
            <td class="team-cell">
              <span style="font-weight: 800; width: 18px; color: var(--text-muted);">${idx + 1}°</span>
              <img src="${t.crest}" style="width: 22px; height: 22px; object-fit: contain;">
              <span style="font-weight: 600;">${t.short || t.name}</span>
            </td>
            <td class="pts-col">${t.pts}</td>
            <td>${t.pj}</td>
            <td>${t.dg > 0 ? '+' + t.dg : t.dg}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderStandingsTableMarkup(standings, title) {
  return `
    <div class="table-card">
      <div class="standings-table-wrapper">
        <table class="standings-table">
          <thead>
            <tr>
              <th style="text-align: left; padding-left: 1rem;">Equipo</th>
              <th>PTS</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
            </tr>
          </thead>
          <tbody>
            ${(standings || []).map((t, idx) => `
              <tr style="${t.id === 'comu' ? 'background: rgba(255, 215, 0, 0.08); font-weight: bold;' : ''}">
                <td class="team-cell">
                  <span class="pos-badge ${idx === 0 ? 'pos-1' : (idx === 1 ? 'pos-2' : (idx === 2 ? 'pos-3' : ''))}">${idx + 1}</span>
                  <img src="${t.crest}" style="width: 28px; height: 28px; object-fit: contain;">
                  <span>${t.name} ${t.id === 'comu' ? '⭐' : ''}</span>
                </td>
                <td class="pts-col">${t.pts}</td>
                <td>${t.pj}</td>
                <td>${t.pg}</td>
                <td>${t.pe}</td>
                <td>${t.pp}</td>
                <td>${t.gf}</td>
                <td>${t.gc}</td>
                <td>${t.dg > 0 ? '+' + t.dg : t.dg}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 3. CRUCES & COPAS ORO / PLATA VIEW
// --------------------------------------------------------------------------

function renderCrucesView() {
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData) return '<p style="padding:2rem; text-align:center;">No hay datos de cruces.</p>';

  const isGroups = catData.format === 'groups_cup';

  if (!isGroups) {
    return renderCrucesSingleTableMarkup();
  }

  const ranking = calculateQualifiedTeamsRanking(appState.currentCategory);
  const playoffs = catData.playoffs || createEmptyPlayoffsObj();
  catData.playoffs = playoffs;

  const p1_1 = ranking.qualifiedList[0] ? ranking.qualifiedList[0].team : null;
  const p1_2 = ranking.qualifiedList[1] ? ranking.qualifiedList[1].team : null;
  const p1_3 = ranking.qualifiedList[2] ? ranking.qualifiedList[2].team : null;
  const p2_1 = ranking.qualifiedList[3] ? ranking.qualifiedList[3].team : null;
  const p2_2 = ranking.qualifiedList[4] ? ranking.qualifiedList[4].team : null;
  const p2_3 = ranking.qualifiedList[5] ? ranking.qualifiedList[5].team : null;
  const p3_1 = ranking.qualifiedList[6] ? ranking.qualifiedList[6].team : null;
  const p3_2 = ranking.qualifiedList[7] ? ranking.qualifiedList[7].team : null;

  if (playoffs.initialCruces && playoffs.initialCruces.length >= 4) {
    playoffs.initialCruces[0].home = playoffs.initialCruces[0].home || (p1_1 ? p1_1.id : null);
    playoffs.initialCruces[0].away = playoffs.initialCruces[0].away || (p3_2 ? p3_2.id : null);

    playoffs.initialCruces[1].home = playoffs.initialCruces[1].home || (p1_2 ? p1_2.id : null);
    playoffs.initialCruces[1].away = playoffs.initialCruces[1].away || (p3_1 ? p3_1.id : null);

    playoffs.initialCruces[2].home = playoffs.initialCruces[2].home || (p1_3 ? p1_3.id : null);
    playoffs.initialCruces[2].away = playoffs.initialCruces[2].away || (p2_3 ? p2_3.id : null);

    playoffs.initialCruces[3].home = playoffs.initialCruces[3].home || (p2_1 ? p2_1.id : null);
    playoffs.initialCruces[3].away = playoffs.initialCruces[3].away || (p2_2 ? p2_2.id : null);
  }

  return `
    <div class="section-title">
      <div>
        <span>Cruces Iniciales & Fases Finales (Copa Oro / Plata)</span>
        <span class="badge">Categoría ${appState.currentCategory}</span>
      </div>
    </div>

    <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 2rem;">
      <h3 style="color: var(--primary-gold); font-size: 1.1rem; font-weight: 900; text-transform: uppercase; margin-bottom: 0.5rem;">
        ⚡ Cruces Iniciales de Clasificación (8 Equipos)
      </h3>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">
        Los 4 Ganadores clasifican a la <strong>Copa de Oro</strong>. Los 4 Perdedores pasan a la <strong>Copa de Plata</strong>.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        ${(playoffs.initialCruces || []).map((m, idx) => renderBracketMatchCard(m, `cruce_${idx}`, m.label)).join('')}
      </div>
    </div>

    <div class="cup-header-oro">
      <span>🏆 COPA DE ORO</span>
      ${appState.isAdmin ? `
        <button class="btn-primary" style="font-size: 0.8rem; background: var(--primary-gold); color: #000;" onclick="drawCopaSemis('${appState.currentCategory}', 'oro')">
          🎲 Sortear Semifinales Copa Oro
        </button>
      ` : ''}
    </div>

    <div class="bracket-container">
      <div class="bracket-round">
        <div class="round-header" style="border-color: var(--primary-gold); color: var(--primary-gold);">Semifinales Copa de Oro</div>
        ${(playoffs.oroSemis || []).map((m, idx) => renderBracketMatchCard(m, `oro_semi_${idx}`, `Semi Oro ${idx + 1}`)).join('')}
      </div>

      <div class="bracket-round">
        <div class="round-header" style="background: rgba(255, 215, 0, 0.2); border-color: var(--primary-gold);">👑 GRAN FINAL COPA DE ORO</div>
        ${playoffs.oroFinal ? renderBracketMatchCard(playoffs.oroFinal, 'oro_final', 'Gran Final Oro') : '<p style="padding:1rem;">Por definir</p>'}

        <div class="round-header" style="margin-top: 1.5rem;">🥉 3er Puesto Copa de Oro</div>
        ${playoffs.oroThird ? renderBracketMatchCard(playoffs.oroThird, 'oro_third', '3er Puesto Oro') : '<p style="padding:1rem;">Por definir</p>'}
      </div>
    </div>

    ${playoffs.oroFinal && playoffs.oroFinal.winner ? `
      <div class="champion-card">
        <div class="champion-trophy">🏆</div>
        <h2 style="color: var(--primary-gold); font-weight: 900; text-transform: uppercase;">¡CAMPEÓN COPA DE ORO - CAT. ${appState.currentCategory}!</h2>
        <h1 style="font-size: 2.2rem; color: #fff; margin-top: 0.5rem;">${getTeamName(playoffs.oroFinal.winner)}</h1>
      </div>
    ` : ''}

    <div class="cup-header-plata">
      <span>🥈 COPA DE PLATA</span>
      ${appState.isAdmin ? `
        <button class="btn-secondary" style="font-size: 0.8rem;" onclick="drawCopaSemis('${appState.currentCategory}', 'plata')">
          🎲 Sortear Semifinales Copa Plata
        </button>
      ` : ''}
    </div>

    <div class="bracket-container">
      <div class="bracket-round">
        <div class="round-header" style="border-color: #9ca3af; color: #e5e7eb;">Semifinales Copa de Plata</div>
        ${(playoffs.plataSemis || []).map((m, idx) => renderBracketMatchCard(m, `plata_semi_${idx}`, `Semi Plata ${idx + 1}`)).join('')}
      </div>

      <div class="bracket-round">
        <div class="round-header" style="background: rgba(156, 163, 175, 0.2); border-color: #9ca3af;">🥈 GRAN FINAL COPA DE PLATA</div>
        ${playoffs.plataFinal ? renderBracketMatchCard(playoffs.plataFinal, 'plata_final', 'Gran Final Plata') : '<p style="padding:1rem;">Por definir</p>'}

        <div class="round-header" style="margin-top: 1.5rem;">🥉 3er Puesto Copa de Plata</div>
        ${playoffs.plataThird ? renderBracketMatchCard(playoffs.plataThird, 'plata_third', '3er Puesto Plata') : '<p style="padding:1rem;">Por definir</p>'}
      </div>
    </div>

    ${playoffs.plataFinal && playoffs.plataFinal.winner ? `
      <div class="champion-card" style="border-color: #9ca3af;">
        <div class="champion-trophy">🥈</div>
        <h2 style="color: #e5e7eb; font-weight: 900; text-transform: uppercase;">¡CAMPEÓN COPA DE PLATA - CAT. ${appState.currentCategory}!</h2>
        <h1 style="font-size: 2.2rem; color: #fff; margin-top: 0.5rem;">${getTeamName(playoffs.plataFinal.winner)}</h1>
      </div>
    ` : ''}
  `;
}

function renderCrucesSingleTableMarkup() {
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  const playoffs = catData ? catData.playoffs || createEmptyPlayoffsObj() : createEmptyPlayoffsObj();

  return `
    <div class="section-title">
      <div>
        <span>Cruces Directos y Final</span>
        <span class="badge">Categoría ${appState.currentCategory}</span>
      </div>
    </div>

    <div class="bracket-actions">
      <button class="btn-primary" onclick="generatePlayoffsFromSingleTable()">
        🔄 Generar Cruces por Tabla General
      </button>
    </div>

    <div class="bracket-container" style="margin-top: 1.5rem;">
      <div class="bracket-round">
        <div class="round-header">Semifinales</div>
        ${(playoffs.oroSemis || []).map((m, idx) => renderBracketMatchCard(m, `oro_semi_${idx}`, `Semi ${idx + 1}`)).join('')}
      </div>

      <div class="bracket-round">
        <div class="round-header" style="background: rgba(255, 215, 0, 0.2); border-color: var(--primary-gold);">🏆 Gran Final</div>
        ${playoffs.oroFinal ? renderBracketMatchCard(playoffs.oroFinal, 'oro_final', 'Gran Final') : '<p>Por definir</p>'}
      </div>
    </div>
  `;
}

function renderBracketMatchCard(m, matchTypeKey, titleLabel) {
  if (!m) return '';
  const home = getTeamObj(m.home);
  const away = getTeamObj(m.away);

  return `
    <div class="bracket-match">
      <div style="background: rgba(0,0,0,0.5); padding: 0.35rem 0.65rem; font-size: 0.75rem; color: var(--primary-gold); font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between;">
        <span>${titleLabel}</span>
        <span>${m.dayDate || 'Por definir'}</span>
      </div>

      <div class="bracket-team ${m.winner === m.home && m.home ? 'winner' : ''}">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="${home.crest}" style="width: 24px; height: 24px; object-fit: contain;">
          <span style="font-weight: 700;">${home.name}</span>
        </div>
        <span class="bracket-score">${m.homeScore !== null && m.homeScore !== undefined ? m.homeScore : '-'}</span>
      </div>

      <div class="bracket-team ${m.winner === m.away && m.away ? 'winner' : ''}">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="${away.crest}" style="width: 24px; height: 24px; object-fit: contain;">
          <span style="font-weight: 700;">${away.name}</span>
        </div>
        <span class="bracket-score">${m.awayScore !== null && m.awayScore !== undefined ? m.awayScore : '-'}</span>
      </div>

      <div style="padding: 0.4rem; background: rgba(0,0,0,0.4); text-align: center;">
        <button class="edit-score-btn" style="margin: 0 auto; font-size: 0.75rem; width: 100%; justify-content: center;" onclick="openPlayoffScoreModal('${matchTypeKey}')">
          ${appState.isAdmin ? '✏️ Definir Resultado' : '🔒 Iniciar Sesión Admin'}
        </button>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// 4. TEAMS MANAGEMENT VIEW
// --------------------------------------------------------------------------

function renderTeamsManagementView() {
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData) return '';

  const teamList = catData.teams || [];

  return `
    <div class="section-title">
      <div>
        <span>Equipos Registrados (${teamList.length} Equipos)</span>
        <span class="badge">Categoría ${appState.currentCategory}</span>
      </div>
      ${appState.isAdmin ? `
        <button class="btn-primary" onclick="openAddTeamModal()">+ Cargar Nuevo Equipo</button>
      ` : `
        <button class="btn-secondary" style="font-size: 0.8rem;" onclick="openAdminPinModal()">🔒 Iniciar Sesión Admin</button>
      `}
    </div>

    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.25rem;">
      Puedes cargar manualmente la cantidad de equipos deseada para la categoría ${appState.currentCategory} y subir sus respectivos escudos.
    </p>

    <div class="teams-manage-grid">
      ${teamList.map(t => `
        <div class="team-manage-card">
          <img src="${t.crest || OFFICIAL_COMU_CREST}" style="width: 56px; height: 56px; object-fit: contain;">
          <h4 style="font-weight: 800; font-size: 0.95rem; color: #fff;">${t.name}</h4>
          <span style="font-size: 0.75rem; color: var(--primary-gold); font-weight: 900;">Sigla: ${t.short || '-'}</span>

          ${appState.isAdmin ? `
            <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: 0.5rem;">
              <button class="btn-secondary" style="flex: 1; font-size: 0.75rem; padding: 0.35rem;" onclick="openEditTeamModal('${t.id}')">✏️ Editar</button>
              ${!t.isHost ? `
                <button class="btn-secondary" style="color: #ef4444; border-color: rgba(239,68,68,0.3); font-size: 0.75rem; padding: 0.35rem;" onclick="deleteTeamFromCategory('${t.id}')">🗑️</button>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

// --------------------------------------------------------------------------
// INTERACTIVE GROUPS DRAW ANIMATION MODAL
// --------------------------------------------------------------------------

function startInteractiveGroupDraw() {
  if (!appState.isAdmin) return openAdminPinModal();

  const modal = document.getElementById('drawModal');
  const stage = document.getElementById('drawStageContent');
  if (!modal || !stage) return;

  modal.classList.add('open');

  stage.innerHTML = `
    <div class="draw-bowl-box">
      <div class="draw-ball-spinning">⚽</div>
      <h3 style="color: var(--primary-gold); font-weight: 900;">¡Sorteando Grupos A, B y C!</h3>
      <p style="color: var(--text-muted); margin-top: 0.5rem;">Mezclando los bolilleros de la Categoría ${appState.currentCategory}...</p>
    </div>
    <button class="btn-primary" style="margin-top: 1rem; width: 100%; justify-content: center;" onclick="revealGroupDrawLive()">
      🎲 Iniciar Sorteo en Vivo
    </button>
  `;
}

function revealGroupDrawLive() {
  const catYear = appState.currentCategory;
  executeGroupDrawBackend(catYear, true);

  const catData = appState.categoriesData ? appState.categoriesData[catYear] : null;
  const stage = document.getElementById('drawStageContent');
  if (!catData || !stage) return;

  const grpA = (catData.groups && catData.groups.A) ? catData.groups.A : [];
  const grpB = (catData.groups && catData.groups.B) ? catData.groups.B : [];
  const grpC = (catData.groups && catData.groups.C) ? catData.groups.C : [];

  stage.innerHTML = `
    <div style="text-align: center;">
      <h2 style="color: var(--primary-gold); font-weight: 900;">🎉 ¡SORTEO COMPLETADO EXITOSAMENTE!</h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Los equipos se organizaron automáticamente en los 3 Grupos:</p>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; text-align: left; margin-bottom: 1.5rem;">
        <div style="background: rgba(255,215,0,0.1); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--primary-gold);">
          <h4 style="color: var(--primary-gold); font-weight: 900;">GRUPO A</h4>
          <ul style="padding-left: 1rem; font-size: 0.85rem; margin-top: 0.5rem;">
            ${grpA.map(id => `<li>${getTeamName(id)}</li>`).join('')}
          </ul>
        </div>

        <div style="background: rgba(56,189,248,0.1); padding: 0.75rem; border-radius: 8px; border: 1px solid #38bdf8;">
          <h4 style="color: #38bdf8; font-weight: 900;">GRUPO B</h4>
          <ul style="padding-left: 1rem; font-size: 0.85rem; margin-top: 0.5rem;">
            ${grpB.map(id => `<li>${getTeamName(id)}</li>`).join('')}
          </ul>
        </div>

        <div style="background: rgba(168,85,247,0.1); padding: 0.75rem; border-radius: 8px; border: 1px solid #a855f7;">
          <h4 style="color: #a855f7; font-weight: 900;">GRUPO C</h4>
          <ul style="padding-left: 1rem; font-size: 0.85rem; margin-top: 0.5rem;">
            ${grpC.map(id => `<li>${getTeamName(id)}</li>`).join('')}
          </ul>
        </div>
      </div>

      <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="closeDrawModal()">
        ✅ Ver Fixture y Grupos
      </button>
    </div>
  `;
  safeRenderApp();
}

function closeDrawModal() {
  const modal = document.getElementById('drawModal');
  if (modal) modal.classList.remove('open');
}

// --------------------------------------------------------------------------
// SEMIFINALS DRAW LOGIC (COPA ORO / PLATA)
// --------------------------------------------------------------------------

function drawCopaSemis(category, cupType) {
  if (!appState.isAdmin) return openAdminPinModal();

  const catData = appState.categoriesData ? appState.categoriesData[category] : null;
  if (!catData) return;

  const playoffs = catData.playoffs || createEmptyPlayoffsObj();
  catData.playoffs = playoffs;

  const candidates = [];
  (playoffs.initialCruces || []).forEach(m => {
    if (m.winner && m.loser) {
      if (cupType === 'oro') candidates.push(m.winner);
      if (cupType === 'plata') candidates.push(m.loser);
    }
  });

  if (candidates.length < 4) {
    alert(`Se requieren definir los 4 resultados de los Cruces Iniciales para poder sortear las Semifinales de la Copa de ${cupType === 'oro' ? 'Oro' : 'Plata'}.`);
    return;
  }

  const shuffled = [...candidates].sort(() => Math.random() - 0.5);

  if (cupType === 'oro') {
    playoffs.oroSemis[0].home = shuffled[0];
    playoffs.oroSemis[0].away = shuffled[1];
    playoffs.oroSemis[1].home = shuffled[2];
    playoffs.oroSemis[1].away = shuffled[3];
    playoffs.oroDrawn = true;
  } else {
    playoffs.plataSemis[0].home = shuffled[0];
    playoffs.plataSemis[0].away = shuffled[1];
    playoffs.plataSemis[1].home = shuffled[2];
    playoffs.plataSemis[1].away = shuffled[3];
    playoffs.plataDrawn = true;
  }

  saveState();
  safeRenderApp();
  alert(`¡Sorteo de Semifinales de la Copa de ${cupType === 'oro' ? 'Oro' : 'Plata'} realizado exitosamente!`);
}

// --------------------------------------------------------------------------
// TEAM MANAGEMENT MODALS & HANDLERS
// --------------------------------------------------------------------------

function openAddTeamModal() {
  if (!appState.isAdmin) return openAdminPinModal();

  document.getElementById('teamModalTitle').innerText = '➕ Cargar Nuevo Equipo';
  document.getElementById('teamEditId').value = '';
  document.getElementById('teamNameInput').value = '';
  document.getElementById('teamShortInput').value = '';
  document.getElementById('teamFileInput').value = '';
  document.getElementById('teamPresetCrestSelect').value = '';
  document.getElementById('crestPreviewBox').style.display = 'none';

  document.getElementById('teamModal').classList.add('open');
}

function openEditTeamModal(teamId) {
  if (!appState.isAdmin) return openAdminPinModal();

  const team = getTeamObj(teamId);
  if (!team) return;

  document.getElementById('teamModalTitle').innerText = '✏️ Editar Equipo';
  document.getElementById('teamEditId').value = team.id;
  document.getElementById('teamNameInput').value = team.name;
  document.getElementById('teamShortInput').value = team.short || '';
  document.getElementById('teamFileInput').value = '';
  document.getElementById('teamPresetCrestSelect').value = '';

  const previewImg = document.getElementById('crestPreviewImg');
  previewImg.src = team.crest || OFFICIAL_COMU_CREST;
  document.getElementById('crestPreviewBox').style.display = 'block';

  document.getElementById('teamModal').classList.add('open');
}

function previewPresetCrest() {
  const presetKey = document.getElementById('teamPresetCrestSelect').value;
  const previewBox = document.getElementById('crestPreviewBox');
  const previewImg = document.getElementById('crestPreviewImg');

  if (presetKey && TEAM_CRESTS[presetKey]) {
    previewImg.src = TEAM_CRESTS[presetKey];
    previewBox.style.display = 'block';
  } else {
    previewBox.style.display = 'none';
  }
}

function saveTeamForm() {
  if (!appState.isAdmin) return;

  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData) return;

  const editId = document.getElementById('teamEditId').value;
  const name = document.getElementById('teamNameInput').value.trim();
  const shortName = document.getElementById('teamShortInput').value.trim().toUpperCase();
  const presetKey = document.getElementById('teamPresetCrestSelect').value;
  const fileInput = document.getElementById('teamFileInput');

  if (!name) {
    alert('Ingresa el nombre del equipo.');
    return;
  }

  const processSave = (crestDataUrl) => {
    let finalCrest = crestDataUrl;
    if (!finalCrest && presetKey && TEAM_CRESTS[presetKey]) {
      finalCrest = TEAM_CRESTS[presetKey];
    }

    if (editId) {
      const target = (catData.teams || []).find(t => t.id === editId);
      if (target) {
        target.name = name;
        target.short = shortName || name.substring(0, 3).toUpperCase();
        if (finalCrest) target.crest = finalCrest;
      }
    } else {
      const newId = 't_' + Date.now();
      catData.teams = catData.teams || [];
      catData.teams.push({
        id: newId,
        name: name,
        short: shortName || name.substring(0, 3).toUpperCase(),
        crest: finalCrest || OFFICIAL_COMU_CREST,
        isHost: false
      });
    }

    saveState();
    closeTeamModal();
    safeRenderApp();
  };

  if (fileInput.files && fileInput.files[0]) {
    resizeImageToDataURL(fileInput.files[0], 220, 0.72)
      .then(processSave)
      .catch((err) => {
        console.error(err);
        alert('No se pudo procesar la imagen del escudo. Probá con otra imagen.');
      });
  } else {
    processSave(null);
  }
}

function deleteTeamFromCategory(teamId) {
  if (!appState.isAdmin) return openAdminPinModal();

  if (confirm('¿Deseas eliminar este equipo de la categoría?')) {
    const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
    if (catData && catData.teams) {
      catData.teams = catData.teams.filter(t => t.id !== teamId);
      saveState();
      safeRenderApp();
    }
  }
}

function closeTeamModal() {
  const modal = document.getElementById('teamModal');
  if (modal) modal.classList.remove('open');
}

// --------------------------------------------------------------------------
// PLAYOFF SCORES HANDLERS & MODALS
// --------------------------------------------------------------------------

let currentPlayoffMatchKey = null;

function openPlayoffScoreModal(matchKey) {
  if (!appState.isAdmin) return openAdminPinModal();

  currentPlayoffMatchKey = matchKey;
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData) return;

  const playoffs = catData.playoffs || createEmptyPlayoffsObj();
  let matchObj = null;

  if (matchKey.startsWith('cruce_')) {
    const idx = parseInt(matchKey.split('_')[1], 10);
    matchObj = (playoffs.initialCruces || [])[idx];
  } else if (matchKey.startsWith('oro_semi_')) {
    const idx = parseInt(matchKey.split('_')[2], 10);
    matchObj = (playoffs.oroSemis || [])[idx];
  } else if (matchKey === 'oro_final') {
    matchObj = playoffs.oroFinal;
  } else if (matchKey === 'oro_third') {
    matchObj = playoffs.oroThird;
  } else if (matchKey.startsWith('plata_semi_')) {
    const idx = parseInt(matchKey.split('_')[2], 10);
    matchObj = (playoffs.plataSemis || [])[idx];
  } else if (matchKey === 'plata_final') {
    matchObj = playoffs.plataFinal;
  } else if (matchKey === 'plata_third') {
    matchObj = playoffs.plataThird;
  }

  if (!matchObj || (!matchObj.home && !matchObj.away)) {
    alert('Primero se deben definir los equipos clasificados a este encuentro.');
    return;
  }

  const home = getTeamObj(matchObj.home);
  const away = getTeamObj(matchObj.away);

  document.getElementById('modalPlayoffHomeName').innerText = home.name;
  document.getElementById('modalPlayoffAwayName').innerText = away.name;
  document.getElementById('modalPlayoffHomeInput').value = matchObj.homeScore !== null && matchObj.homeScore !== undefined ? matchObj.homeScore : 0;
  document.getElementById('modalPlayoffAwayInput').value = matchObj.awayScore !== null && matchObj.awayScore !== undefined ? matchObj.awayScore : 0;

  document.getElementById('playoffScoreModal').classList.add('open');
}

function savePlayoffScore() {
  if (!appState.isAdmin || !currentPlayoffMatchKey) return;

  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData) return;

  const playoffs = catData.playoffs || createEmptyPlayoffsObj();
  const homeScore = parseInt(document.getElementById('modalPlayoffHomeInput').value, 10);
  const awayScore = parseInt(document.getElementById('modalPlayoffAwayInput').value, 10);

  let matchObj = null;
  if (currentPlayoffMatchKey.startsWith('cruce_')) {
    const idx = parseInt(currentPlayoffMatchKey.split('_')[1], 10);
    matchObj = (playoffs.initialCruces || [])[idx];
  } else if (currentPlayoffMatchKey.startsWith('oro_semi_')) {
    const idx = parseInt(currentPlayoffMatchKey.split('_')[2], 10);
    matchObj = (playoffs.oroSemis || [])[idx];
  } else if (currentPlayoffMatchKey === 'oro_final') {
    matchObj = playoffs.oroFinal;
  } else if (currentPlayoffMatchKey === 'oro_third') {
    matchObj = playoffs.oroThird;
  } else if (currentPlayoffMatchKey.startsWith('plata_semi_')) {
    const idx = parseInt(currentPlayoffMatchKey.split('_')[2], 10);
    matchObj = (playoffs.plataSemis || [])[idx];
  } else if (currentPlayoffMatchKey === 'plata_final') {
    matchObj = playoffs.plataFinal;
  } else if (currentPlayoffMatchKey === 'plata_third') {
    matchObj = playoffs.plataThird;
  }

  if (matchObj) {
    matchObj.homeScore = isNaN(homeScore) ? 0 : homeScore;
    matchObj.awayScore = isNaN(awayScore) ? 0 : awayScore;

    if (homeScore === awayScore) {
      const choice = prompt(`Empate ${homeScore}-${awayScore}. Elige Ganador por penales (1 para ${getTeamName(matchObj.home)} o 2 para ${getTeamName(matchObj.away)}):`, '1');
      matchObj.winner = choice === '2' ? matchObj.away : matchObj.home;
      matchObj.loser = choice === '2' ? matchObj.home : matchObj.away;
    } else {
      matchObj.winner = homeScore > awayScore ? matchObj.home : matchObj.away;
      matchObj.loser = homeScore > awayScore ? matchObj.away : matchObj.away;
    }

    syncSemisToFinals('oro');
    syncSemisToFinals('plata');
  }

  saveState();
  closePlayoffScoreModal();
  safeRenderApp();
}

function syncSemisToFinals(cupType) {
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData || !catData.playoffs) return;

  const playoffs = catData.playoffs;
  const semis = cupType === 'oro' ? playoffs.oroSemis : playoffs.plataSemis;
  const final = cupType === 'oro' ? playoffs.oroFinal : playoffs.plataFinal;
  const third = cupType === 'oro' ? playoffs.oroThird : playoffs.plataThird;

  if (semis && semis[0] && semis[1] && semis[0].winner && semis[1].winner && final && third) {
    final.home = semis[0].winner;
    final.away = semis[1].winner;

    third.home = semis[0].loser;
    third.away = semis[1].loser;
  }
}

function closePlayoffScoreModal() {
  const modal = document.getElementById('playoffScoreModal');
  if (modal) modal.classList.remove('open');
}

// --------------------------------------------------------------------------
// OTHER CONTROLLERS & SPONSORS (PRESERVED)
// --------------------------------------------------------------------------

function getTeamObj(teamId) {
  if (!teamId) return { name: 'Por Definir', crest: OFFICIAL_COMU_CREST };
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData || !catData.teams) return { name: teamId, crest: OFFICIAL_COMU_CREST };
  const found = catData.teams.find(t => t.id === teamId);
  return found || { name: teamId, crest: OFFICIAL_COMU_CREST };
}

function getTeamName(teamId) {
  return getTeamObj(teamId).name;
}

function selectCategory(cat) {
  appState.currentCategory = cat;
  saveState();
  safeRenderApp();
}

function selectTab(tab) {
  appState.currentTab = tab;
  saveState();
  safeRenderApp();
}

function openAdminPinModal() {
  const emailInput = document.getElementById('adminEmailInput');
  const input = document.getElementById('adminPinInput');
  if (emailInput) emailInput.value = '';
  if (input) input.value = '';
  const modal = document.getElementById('adminPinModal');
  if (modal) modal.classList.add('open');
}

function closeAdminPinModal() {
  const modal = document.getElementById('adminPinModal');
  if (modal) modal.classList.remove('open');
}

function submitAdminPin() {
  const email = (document.getElementById('adminEmailInput').value || '').trim();
  const password = (document.getElementById('adminPinInput').value || '').trim();
  if (!email || !password) {
    alert('Ingresá el email y la contraseña de administrador.');
    return;
  }
  fbAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      closeAdminPinModal();
      safeRenderApp();
      alert('¡Sesión de Administrador iniciada correctamente!');
    })
    .catch((err) => {
      console.error(err);
      alert('No se pudo iniciar sesión: email o contraseña incorrectos.');
    });
}

function logoutAdmin() {
  fbAuth.signOut().then(() => {
    safeRenderApp();
    alert('Has cerrado la sesión de Administrador.');
  });
}

let currentEditingMatchId = null;

function openScoreModal(matchId) {
  if (!appState.isAdmin) return openAdminPinModal();
  currentEditingMatchId = matchId;
  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData) return;

  let matchObj = null;
  (catData.fixtures || []).forEach(j => {
    const found = (j.matches || []).find(m => m.id === matchId);
    if (found) matchObj = found;
  });

  if (!matchObj) return;

  const home = getTeamObj(matchObj.home);
  const away = getTeamObj(matchObj.away);

  document.getElementById('modalHomeName').innerText = home.name;
  document.getElementById('modalAwayName').innerText = away.name;
  document.getElementById('modalHomeInput').value = matchObj.homeScore !== null && matchObj.homeScore !== undefined ? matchObj.homeScore : 0;
  document.getElementById('modalAwayInput').value = matchObj.awayScore !== null && matchObj.awayScore !== undefined ? matchObj.awayScore : 0;
  document.getElementById('modalStatusSelect').value = matchObj.status;
  
  document.getElementById('modalDayDateInput').value = matchObj.dayDate || '';
  document.getElementById('modalTimeInput').value = matchObj.time || '';
  document.getElementById('modalPitchInput').value = matchObj.pitch || '';

  document.getElementById('scoreModal').classList.add('open');
}

function saveMatchScore() {
  if (!currentEditingMatchId || !appState.isAdmin) return;

  const catData = appState.categoriesData ? appState.categoriesData[appState.currentCategory] : null;
  if (!catData) return;

  const homeScore = parseInt(document.getElementById('modalHomeInput').value, 10);
  const awayScore = parseInt(document.getElementById('modalAwayInput').value, 10);
  const status = document.getElementById('modalStatusSelect').value;
  
  const dayDate = document.getElementById('modalDayDateInput').value.trim();
  const time = document.getElementById('modalTimeInput').value.trim();
  const pitch = document.getElementById('modalPitchInput').value.trim();

  (catData.fixtures || []).forEach(j => {
    const matchObj = (j.matches || []).find(m => m.id === currentEditingMatchId);
    if (matchObj) {
      matchObj.homeScore = isNaN(homeScore) ? 0 : homeScore;
      matchObj.awayScore = isNaN(awayScore) ? 0 : awayScore;
      matchObj.status = status;
      matchObj.dayDate = dayDate;
      matchObj.time = time;
      matchObj.pitch = pitch;
    }
  });

  saveState();
  closeScoreModal();
  safeRenderApp();
}

function closeScoreModal() {
  const modal = document.getElementById('scoreModal');
  if (modal) modal.classList.remove('open');
}

// Sponsor Actions
function openAddSponsorModal() {
  if (!appState.isAdmin) return openAdminPinModal();
  const modal = document.getElementById('sponsorModal');
  if (modal) modal.classList.add('open');
}

function closeSponsorModal() {
  const modal = document.getElementById('sponsorModal');
  if (modal) modal.classList.remove('open');
}

function saveSponsor() {
  if (!appState.isAdmin) return;

  const name = document.getElementById('sponsorNameInput').value;
  const tier = document.getElementById('sponsorTierInput').value;
  const url = document.getElementById('sponsorUrlInput').value || '#';
  const fileInput = document.getElementById('sponsorFileInput');

  if (!name) {
    alert('Ingresa el nombre del auspiciante.');
    return;
  }

  const createSponsorObj = (logoUrl) => {
    const newSp = {
      id: 'sp_' + Date.now(),
      name: name,
      tier: tier,
      logo: logoUrl || DEFAULT_SPONSORS[0].logo,
      url: url
    };
    appState.sponsors = appState.sponsors || [];
    appState.sponsors.push(newSp);
    saveState();
    closeSponsorModal();
    safeRenderApp();
  };

  if (fileInput.files && fileInput.files[0]) {
    resizeImageToDataURL(fileInput.files[0], 260, 0.72)
      .then(createSponsorObj)
      .catch((err) => {
        console.error(err);
        alert('No se pudo procesar el logo del sponsor. Probá con otra imagen.');
      });
  } else {
    createSponsorObj(null);
  }
}

function deleteSponsor(spId) {
  if (!appState.isAdmin) return openAdminPinModal();

  if (confirm('¿Deseas eliminar este sponsor?')) {
    appState.sponsors = (appState.sponsors || []).filter(s => s.id !== spId);
    saveState();
    safeRenderApp();
  }
}

function renderSponsorsView() {
  const list = appState.sponsors || DEFAULT_SPONSORS;
  return `
    <div class="section-title">
      <div>
        <span>Auspiciantes y Sponsors Oficiales</span>
        <span class="badge">${list.length} Sponsors Activos</span>
      </div>
      <button class="btn-primary" onclick="openAddSponsorModal()">+ Agregar Auspiciante</button>
    </div>

    <div class="sponsor-admin-grid">
      ${list.map(sp => `
        <div class="sponsor-card-admin">
          <span class="sponsor-tier-badge tier-${sp.tier}">Sponsor ${sp.tier.toUpperCase()}</span>
          <img src="${sp.logo}" alt="${sp.name}" style="max-height: 80px; width: 100%; object-fit: contain;">
          <h4 style="font-weight: 800; font-size: 1rem; margin-top: 0.4rem;">${sp.name}</h4>
          ${appState.isAdmin ? `
            <button class="btn-secondary" style="width: 100%; justify-content: center; font-size: 0.8rem; margin-top: 0.5rem; color: #ef4444; border-color: rgba(239, 68, 68, 0.3);" onclick="deleteSponsor('${sp.id}')">
              🗑️ Eliminar
            </button>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function renderAppDownloadView() {
  return `
    <div class="section-title">
      <span>Instalar Aplicación & Panel Administrativo</span>
    </div>

    <div class="pwa-banner">
      <div class="pwa-info">
        <div class="pwa-icon">📱</div>
        <div>
          <h3 style="color: var(--primary-gold); font-weight: 900;">App Móvil Comunicaciones Mercedes</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Instálala en tu celular para ver resultados y posiciones sin gastar datos.</p>
        </div>
      </div>
      <button class="btn-primary" onclick="triggerPwaInstall()">
        📲 Instalar App Ahora
      </button>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <div class="table-card" style="padding: 1.5rem;">
        <h3 style="color: var(--primary-gold); margin-bottom: 1rem;">🤖 Instalación en Android (Chrome)</h3>
        <ol style="color: var(--text-main); padding-left: 1.2rem; line-height: 1.8; font-size: 0.9rem;">
          <li>Toca el botón <strong>"Instalar App Ahora"</strong>.</li>
          <li>O toca los tres puntos <strong>(⋮)</strong> arriba a la derecha en Chrome.</li>
          <li>Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a inicio"</strong>.</li>
        </ol>
      </div>

      <div class="table-card" style="padding: 1.5rem;">
        <h3 style="color: var(--primary-gold); margin-bottom: 1rem;">🍏 Instalación en iPhone / iPad (Safari)</h3>
        <ol style="color: var(--text-main); padding-left: 1.2rem; line-height: 1.8; font-size: 0.9rem;">
          <li>Abre esta página en <strong>Safari</strong>.</li>
          <li>Toca el botón <strong>Compartir</strong> <span style="font-size: 1.1rem;">⎋</span>.</li>
          <li>Selecciona <strong>"Agregar a inicio"</strong> ➕.</li>
        </ol>
      </div>
    </div>
  `;
}

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

function triggerPwaInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
    });
  } else {
    alert('Para instalar la app en tu celular, usa la opción "Agregar a inicio" de tu navegador.');
  }
}

// Robust Immediate + Event Initialization
function bootApp() {
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.innerHTML = '<div style="text-align:center; padding: 3rem 1rem; color: var(--text-muted);">Conectando con el torneo en vivo…</div>';
  }
  initData(); // el primer render ocurre cuando llega el primer snapshot de Firebase
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
