/* ==========================================================================
   CAMPEONATO DE FÚTBOL INFANTIL - APP CORE LOGIC (v4.0 Definitiva)
   Club Atlético Comunicaciones de Mercedes (Corrientes)
   Categorías: 2015, 2016, 2017, 2018, 2019
   ========================================================================== */

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
  talleres: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 5 L90 22 L90 60 C90 80 50 95 50 95 C50 95 10 80 10 60 L10 22 Z' fill='%23ffffff' stroke='%23001f54' stroke-width='4'/><rect x='25' y='22' width='12' height='60' fill='%23001f54'/><rect x='44' y='22' width='12' height='60' fill='%23001f54'/><rect x='63' y='22' width='12' height='60' fill='%23001f54'/><text x='50' y='82' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='14' fill='%23001f54'>CAT</text></svg>`
};

const DEFAULT_TEAMS = [
  { id: 'comu', name: 'Comunicaciones (Mercedes)', short: 'COM', crest: OFFICIAL_COMU_CREST, isHost: true },
  { id: 'boca', name: 'Boca Juniors', short: 'BOC', crest: TEAM_CRESTS.boca },
  { id: 'river', name: 'River Plate', short: 'RIV', crest: TEAM_CRESTS.river },
  { id: 'racing', name: 'Racing Club', short: 'RAC', crest: TEAM_CRESTS.racing },
  { id: 'independiente', name: 'Independiente', short: 'IND', crest: TEAM_CRESTS.independiente },
  { id: 'sanlorenzo', name: 'San Lorenzo', short: 'SLO', crest: TEAM_CRESTS.sanlorenzo },
  { id: 'velez', name: 'Vélez Sarsfield', short: 'VEL', crest: TEAM_CRESTS.velez },
  { id: 'rosariocentral', name: 'Rosario Central', short: 'CEN', crest: TEAM_CRESTS.rosariocentral },
  { id: 'talleres', name: 'Talleres de Córdoba', short: 'TAL', crest: TEAM_CRESTS.talleres }
];

// Logos Gráficos de Auspiciantes (100% Autocontenidos y Visibles en cualquier pantalla)
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

// App State Management
let appState = {
  currentCategory: '2015',
  currentTab: 'fixture',
  categoriesData: {},
  sponsors: DEFAULT_SPONSORS,
  isAdmin: false,
  adminPin: 'comu2026'
};

// Initialize App Data & Force Crest/Sponsor Cache Upgrade
function initData() {
  const savedData = localStorage.getItem('comu_torneo_app_state_v4');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      appState = { ...appState, ...parsed };

      // FORCE UPGRADE Comunicaciones crest in every category to the official badge!
      if (appState.categoriesData) {
        Object.keys(appState.categoriesData).forEach(cat => {
          const catTeams = appState.categoriesData[cat].teams;
          if (catTeams) {
            catTeams.forEach(t => {
              if (t.id === 'comu') t.crest = OFFICIAL_COMU_CREST;
              else if (TEAM_CRESTS[t.id]) t.crest = TEAM_CRESTS[t.id];
            });
          }
        });
      }
      appState.sponsors = DEFAULT_SPONSORS;
    } catch (e) {
      console.error('Error loading stored data:', e);
      generateDefaultTournamentState();
    }
  } else {
    generateDefaultTournamentState();
  }
}

function saveState() {
  const dataToSave = {
    currentCategory: appState.currentCategory,
    currentTab: appState.currentTab,
    categoriesData: appState.categoriesData,
    sponsors: appState.sponsors,
    adminPin: appState.adminPin
  };
  localStorage.setItem('comu_torneo_app_state_v4', JSON.stringify(dataToSave));
}

function generateDefaultTournamentState() {
  appState.categoriesData = {};
  CATEGORIES.forEach(cat => {
    const teams = [...DEFAULT_TEAMS];
    const fixtures = generateDemoFixture(teams, cat);
    appState.categoriesData[cat] = {
      teams: teams,
      fixtures: fixtures,
      playoffs: {
        semis: [],
        thirdPlace: null,
        final: null,
        generated: false
      }
    };
  });
  appState.sponsors = [...DEFAULT_SPONSORS];
  saveState();
}

function generateDemoFixture(teams, catYear) {
  const rounds = [];
  
  // Fecha 1
  rounds.push({
    jornadaNumber: 1,
    matches: [
      { id: `m_${catYear}_1_1`, home: 'comu', away: 'boca', homeScore: 2, awayScore: 1, status: 'finished', dayDate: 'Sábado 10/10', time: '09:00 hs', pitch: 'Cancha 1 (Comunicaciones)' },
      { id: `m_${catYear}_1_2`, home: 'river', away: 'racing', homeScore: 3, awayScore: 3, status: 'finished', dayDate: 'Sábado 10/10', time: '10:15 hs', pitch: 'Cancha 1 (Comunicaciones)' },
      { id: `m_${catYear}_1_3`, home: 'independiente', away: 'sanlorenzo', homeScore: 1, awayScore: 0, status: 'finished', dayDate: 'Sábado 10/10', time: '11:30 hs', pitch: 'Cancha 2 (Auxiliar)' },
      { id: `m_${catYear}_1_4`, home: 'velez', away: 'rosariocentral', homeScore: 2, awayScore: 2, status: 'finished', dayDate: 'Sábado 10/10', time: '12:45 hs', pitch: 'Cancha 2 (Auxiliar)' }
    ]
  });

  // Fecha 2
  rounds.push({
    jornadaNumber: 2,
    matches: [
      { id: `m_${catYear}_2_1`, home: 'comu', away: 'river', homeScore: 1, awayScore: 0, status: 'finished', dayDate: 'Domingo 11/10', time: '09:00 hs', pitch: 'Cancha 1 (Comunicaciones)' },
      { id: `m_${catYear}_2_2`, home: 'boca', away: 'independiente', homeScore: 2, awayScore: 0, status: 'finished', dayDate: 'Domingo 11/10', time: '10:15 hs', pitch: 'Cancha 1 (Comunicaciones)' },
      { id: `m_${catYear}_2_3`, home: 'racing', away: 'velez', homeScore: null, awayScore: null, status: 'scheduled', dayDate: 'Domingo 11/10', time: '11:30 hs', pitch: 'Cancha 2 (Auxiliar)' },
      { id: `m_${catYear}_2_4`, home: 'sanlorenzo', away: 'talleres', homeScore: null, awayScore: null, status: 'scheduled', dayDate: 'Domingo 11/10', time: '12:45 hs', pitch: 'Cancha 2 (Auxiliar)' }
    ]
  });

  // Fecha 3
  rounds.push({
    jornadaNumber: 3,
    matches: [
      { id: `m_${catYear}_3_1`, home: 'comu', away: 'racing', homeScore: null, awayScore: null, status: 'scheduled', dayDate: 'Lunes 12/10', time: '15:00 hs', pitch: 'Cancha Principal (Estadio)' },
      { id: `m_${catYear}_3_2`, home: 'river', away: 'boca', homeScore: null, awayScore: null, status: 'scheduled', dayDate: 'Lunes 12/10', time: '16:15 hs', pitch: 'Cancha Principal (Estadio)' },
      { id: `m_${catYear}_3_3`, home: 'velez', away: 'independiente', homeScore: null, awayScore: null, status: 'scheduled', dayDate: 'Lunes 12/10', time: '17:30 hs', pitch: 'Cancha 2 (Auxiliar)' },
      { id: `m_${catYear}_3_4`, home: 'rosariocentral', away: 'talleres', homeScore: null, awayScore: null, status: 'scheduled', dayDate: 'Lunes 12/10', time: '18:45 hs', pitch: 'Cancha 2 (Auxiliar)' }
    ]
  });

  return rounds;
}

// Calculate Standings Table
function calculateStandings(category) {
  const catData = appState.categoriesData[category];
  if (!catData) return [];

  const stats = {};
  catData.teams.forEach(team => {
    stats[team.id] = {
      ...team,
      pts: 0,
      pj: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      gf: 0,
      gc: 0,
      dg: 0
    };
  });

  catData.fixtures.forEach(round => {
    round.matches.forEach(match => {
      if (match.status === 'finished' && match.homeScore !== null && match.awayScore !== null) {
        const home = stats[match.home];
        const away = stats[match.away];

        if (home && away) {
          home.pj += 1;
          away.pj += 1;
          home.gf += match.homeScore;
          home.gc += match.awayScore;
          away.gf += match.awayScore;
          away.gc += match.homeScore;

          if (match.homeScore > match.awayScore) {
            home.pts += 3;
            home.pg += 1;
            away.pp += 1;
          } else if (match.homeScore < match.awayScore) {
            away.pts += 3;
            away.pg += 1;
            home.pp += 1;
          } else {
            home.pts += 1;
            away.pts += 1;
            home.pe += 1;
            away.pe += 1;
          }
        }
      }
    });
  });

  return Object.values(stats).map(t => {
    t.dg = t.gf - t.gc;
    return t;
  }).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    return b.gf - a.gf;
  });
}

// Render Functions
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
  const tabs = [
    { id: 'fixture', label: '📅 Fixture y Horarios' },
    { id: 'standings', label: '🏆 Tabla de Posiciones' },
    { id: 'cruces', label: '⚔️ Cruces y Gran Final' },
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
  const list = [...appState.sponsors, ...appState.sponsors];
  track.innerHTML = list.map(sp => `
    <a href="${sp.url && sp.url !== '#' ? sp.url : 'javascript:void(0)'}" target="${sp.url && sp.url !== '#' ? '_blank' : '_self'}" class="sponsor-item-mini" rel="noopener">
      <img src="${sp.logo}" alt="${sp.name}" title="${sp.name}">
    </a>
  `).join('');
}

function renderFooterSponsors() {
  const container = document.getElementById('footerSponsorsGrid');
  if (!container) return;
  container.innerHTML = appState.sponsors.map(sp => `
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
    case 'sponsors':
      container.innerHTML = renderSponsorsView();
      break;
    case 'app':
      container.innerHTML = renderAppDownloadView();
      break;
  }
}

// 1. Fixture View
function renderFixtureView() {
  const catData = appState.categoriesData[appState.currentCategory];
  if (!catData) return '<p>No hay datos cargados.</p>';

  return `
    <div class="section-title">
      <div>
        <span>Fixture, Días y Horarios</span>
        <span class="badge">Categoría ${appState.currentCategory}</span>
      </div>
      ${appState.isAdmin ? `
        <button class="btn-secondary" onclick="openAddMatchModal()">+ Agregar Partido</button>
      ` : `
        <button class="btn-secondary" style="font-size: 0.8rem; background: rgba(255,215,0,0.1); border-color: var(--primary-gold); color: var(--primary-gold);" onclick="openAdminPinModal()">
          🔒 Modo Espectador (Ingresar Admin)
        </button>
      `}
    </div>

    ${catData.fixtures.map((jornada) => `
      <div class="jornada-controls" style="margin-top: 1.5rem;">
        <span class="jornada-title">Jornada ${jornada.jornadaNumber}</span>
      </div>

      <div class="matches-grid">
        ${jornada.matches.map(m => {
          const homeTeam = catData.teams.find(t => t.id === m.home) || { name: m.home, crest: '' };
          const awayTeam = catData.teams.find(t => t.id === m.away) || { name: m.away, crest: '' };
          const isComuMatch = homeTeam.id === 'comu' || awayTeam.id === 'comu';

          return `
            <div class="match-card ${isComuMatch ? 'is-comu' : ''}">
              <div class="match-header">
                <div style="display: flex; flex-direction: column; gap: 0.15rem;">
                  <span style="font-weight: 800; color: var(--primary-gold);">📅 ${m.dayDate || 'Día por definir'} • 🕒 ${m.time || 'Horario'}</span>
                  <span style="color: var(--text-muted); font-size: 0.75rem;">📍 ${m.pitch || 'Cancha por definir'}</span>
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
                  <span class="score-num">${m.homeScore !== null ? m.homeScore : '-'}</span>
                  <span class="score-divider">:</span>
                  <span class="score-num">${m.awayScore !== null ? m.awayScore : '-'}</span>
                </div>

                <div class="team-box">
                  <img src="${awayTeam.crest}" class="team-crest" alt="${awayTeam.name}">
                  <span class="team-name">${awayTeam.name}</span>
                </div>
              </div>

              <div class="match-footer">
                <small style="color: var(--text-muted);">Copa Mercedes 2026</small>
                <button class="edit-score-btn" onclick="openScoreModal('${m.id}')">
                  ${appState.isAdmin ? '✏️ Editar Partido / Resultado' : '🔒 Iniciar Sesión Admin'}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `).join('')}
  `;
}

// 2. Standings Table View
function renderStandingsView() {
  const standings = calculateStandings(appState.currentCategory);

  return `
    <div class="section-title">
      <div>
        <span>Tabla de Posiciones</span>
        <span class="badge">Categoría ${appState.currentCategory}</span>
      </div>
      <button class="btn-primary" onclick="selectTab('cruces')">⚡ Ver Cruces y Final</button>
    </div>

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
            ${standings.map((t, idx) => `
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

      <div class="playoff-zone-legend">
        <div class="legend-item">
          <span class="legend-dot qualify"></span>
          <span>Clasificados a Semifinales (Puestos 1° al 4°)</span>
        </div>
      </div>
    </div>
  `;
}

// 3. Cruces, Playoffs & Gran Final View (100% Functional Admin Editing for Semis, Final & 3rd Place)
function renderCrucesView() {
  const catData = appState.categoriesData[appState.currentCategory];
  const playoffs = catData.playoffs;

  return `
    <div class="section-title">
      <div>
        <span>Cruces, Semifinales y Gran Final</span>
        <span class="badge">Categoría ${appState.currentCategory}</span>
      </div>
    </div>

    <div class="bracket-actions">
      <button class="btn-primary" onclick="generatePlayoffsFromStandings()">
        🔄 Generar Cruces según Tabla de Posiciones
      </button>
      ${appState.isAdmin ? `
        <button class="btn-secondary" onclick="resetPlayoffs()">
          🧹 Reiniciar Llaves
        </button>
      ` : ''}
    </div>

    ${!playoffs.generated ? `
      <div style="background: var(--bg-card); padding: 3rem 1.5rem; text-align: center; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <p style="font-size: 1.1rem; color: var(--primary-gold); font-weight: 700;">Las llaves de eliminatorias aún no han sido generadas para la categoría ${appState.currentCategory}.</p>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Haz clic en el botón superior para cruzar el 1° vs 4° y 2° vs 3° de la tabla.</p>
      </div>
    ` : `
      <div class="bracket-container">
        <!-- Semifinales -->
        <div class="bracket-round">
          <div class="round-header">Semifinales</div>
          ${playoffs.semis.map((m, idx) => renderBracketMatchCard(m, `semi_${idx}`, `Semi ${idx + 1}`)).join('')}
        </div>

        <!-- Gran Final y 3er Puesto -->
        <div class="bracket-round">
          <div class="round-header" style="background: rgba(255, 215, 0, 0.2); border-color: var(--primary-gold);">🏆 Gran Final</div>
          ${playoffs.final ? renderBracketMatchCard(playoffs.final, 'final', 'Gran Final') : `
            <div class="bracket-match"><p style="padding:1.5rem; text-align:center; color: var(--text-muted);">Esperando definición de Semifinales</p></div>
          `}

          <div class="round-header" style="margin-top: 2rem;">🥉 3er y 4to Puesto</div>
          ${playoffs.thirdPlace ? renderBracketMatchCard(playoffs.thirdPlace, 'third', '3er Puesto') : `
            <div class="bracket-match"><p style="padding:1.5rem; text-align:center; color: var(--text-muted);">Esperando definición de Semifinales</p></div>
          `}
        </div>
      </div>

      ${playoffs.final && playoffs.final.winner ? `
        <div class="champion-card">
          <div class="champion-trophy">🏆</div>
          <h2 style="color: var(--primary-gold); font-weight: 900; text-transform: uppercase;">¡CAMPEÓN CATEGORÍA ${appState.currentCategory}!</h2>
          <h1 style="font-size: 2.2rem; color: #fff; margin-top: 0.5rem;">${getTeamName(playoffs.final.winner)}</h1>
          <p style="color: var(--text-muted); margin-top: 0.5rem;">Club Atlético Comunicaciones de Mercedes Corrientes</p>
        </div>
      ` : ''}
    `}
  `;
}

function renderBracketMatchCard(m, matchType, titleLabel) {
  const home = getTeamObj(m.home);
  const away = getTeamObj(m.away);

  return `
    <div class="bracket-match">
      <div style="background: rgba(0,0,0,0.5); padding: 0.35rem 0.65rem; font-size: 0.75rem; color: var(--primary-gold); font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between;">
        <span>${titleLabel}</span>
        <span>${m.dayDate || 'Por definir'}</span>
      </div>

      <div class="bracket-team ${m.winner === m.home ? 'winner' : ''}">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="${home.crest}" style="width: 24px; height: 24px; object-fit: contain;">
          <span style="font-weight: 700;">${home.name}</span>
        </div>
        <span class="bracket-score">${m.homeScore !== null ? m.homeScore : '-'}</span>
      </div>

      <div class="bracket-team ${m.winner === m.away ? 'winner' : ''}">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="${away.crest}" style="width: 24px; height: 24px; object-fit: contain;">
          <span style="font-weight: 700;">${away.name}</span>
        </div>
        <span class="bracket-score">${m.awayScore !== null ? m.awayScore : '-'}</span>
      </div>

      <div style="padding: 0.4rem; background: rgba(0,0,0,0.4); text-align: center;">
        <button class="edit-score-btn" style="margin: 0 auto; font-size: 0.75rem; width: 100%; justify-content: center;" onclick="openPlayoffScoreModal('${matchType}')">
          ${appState.isAdmin ? '✏️ Definir Resultado' : '🔒 Iniciar Sesión Admin'}
        </button>
      </div>
    </div>
  `;
}

// 4. Sponsor View
function renderSponsorsView() {
  return `
    <div class="section-title">
      <div>
        <span>Auspiciantes y Sponsors Oficiales</span>
        <span class="badge">${appState.sponsors.length} Sponsors Activos</span>
      </div>
      <button class="btn-primary" onclick="openAddSponsorModal()">+ Agregar Auspiciante</button>
    </div>

    <div class="sponsor-admin-grid">
      ${appState.sponsors.map(sp => `
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

// 5. App Download View
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

    <div class="table-card" style="padding: 1.5rem; margin-top: 1.5rem;">
      <h3 style="color: var(--primary-gold); margin-bottom: 1rem;">🔐 Control de Administrador & Respaldo</h3>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          ${appState.isAdmin ? `
            <button class="btn-primary" style="background: #22c55e; color: #fff;" onclick="logoutAdmin()">🔓 Cerrar Sesión Administrador</button>
            <button class="btn-secondary" onclick="openChangePinModal()">🔑 Cambiar Clave PIN</button>
          ` : `
            <button class="btn-primary" onclick="openAdminPinModal()">🔐 Ingresar como Administrador</button>
          `}
        </div>

        ${appState.isAdmin ? `
          <hr style="border-color: var(--border-subtle); margin: 0.5rem 0;">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn-secondary" onclick="exportDataJSON()">📥 Exportar Respaldo (JSON)</button>
            <button class="btn-secondary" onclick="document.getElementById('importFileInput').click()">📤 Importar Respaldo (JSON)</button>
            <input type="file" id="importFileInput" style="display:none" onchange="importDataJSON(event)" accept=".json">
            <button class="btn-secondary" style="border-color: #ef4444; color: #ef4444;" onclick="confirmResetAll()">🔄 Restablecer Torneo Demostración</button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// Playoff Generation Helper
function generatePlayoffsFromStandings() {
  if (!appState.isAdmin) return openAdminPinModal();

  const standings = calculateStandings(appState.currentCategory);
  if (standings.length < 4) {
    alert('Se necesitan al menos 4 equipos registrados para armar las semifinales.');
    return;
  }

  const catData = appState.categoriesData[appState.currentCategory];
  catData.playoffs = {
    generated: true,
    semis: [
      { id: 'semi_0', home: standings[0].id, away: standings[3].id, homeScore: null, awayScore: null, winner: null, dayDate: 'Domingo - 15:00 hs' },
      { id: 'semi_1', home: standings[1].id, away: standings[2].id, homeScore: null, awayScore: null, winner: null, dayDate: 'Domingo - 16:15 hs' }
    ],
    final: { id: 'final', home: null, away: null, homeScore: null, awayScore: null, winner: null, dayDate: 'Gran Final' },
    thirdPlace: { id: 'third', home: null, away: null, homeScore: null, awayScore: null, winner: null, dayDate: '3er Puesto' }
  };

  saveState();
  renderMainContent();
}

function resetPlayoffs() {
  if (!appState.isAdmin) return openAdminPinModal();

  if (confirm('¿Deseas reiniciar los cruces de esta categoría?')) {
    const catData = appState.categoriesData[appState.currentCategory];
    catData.playoffs = { semis: [], final: null, thirdPlace: null, generated: false };
    saveState();
    renderMainContent();
  }
}

// Helper Getters
function getTeamObj(teamId) {
  if (!teamId) return { name: 'Por Definir', crest: '' };
  const catData = appState.categoriesData[appState.currentCategory];
  return catData.teams.find(t => t.id === teamId) || { name: teamId, crest: '' };
}

function getTeamName(teamId) {
  return getTeamObj(teamId).name;
}

// Navigation Handlers
function selectCategory(cat) {
  appState.currentCategory = cat;
  saveState();
  renderApp();
}

function selectTab(tab) {
  appState.currentTab = tab;
  saveState();
  renderApp();
}

// Admin PIN Authentication
function openAdminPinModal() {
  document.getElementById('adminPinInput').value = '';
  document.getElementById('adminPinModal').classList.add('open');
}

function closeAdminPinModal() {
  document.getElementById('adminPinModal').classList.remove('open');
}

function submitAdminPin() {
  const enteredPin = document.getElementById('adminPinInput').value.trim();
  if (enteredPin === appState.adminPin) {
    appState.isAdmin = true;
    closeAdminPinModal();
    renderApp();
    alert('¡Sesión de Administrador iniciada correctamente!');
  } else {
    alert('Clave PIN incorrecta. Por favor vuelve a intentarlo.');
  }
}

function logoutAdmin() {
  appState.isAdmin = false;
  renderApp();
  alert('Has cerrado la sesión de Administrador.');
}

function openChangePinModal() {
  const currentPin = prompt('Ingresa tu clave PIN actual para verificar:');
  if (currentPin !== appState.adminPin) {
    alert('La clave actual es incorrecta.');
    return;
  }

  const newPin = prompt('Ingresa la NUEVA clave PIN de Administrador (mínimo 4 caracteres):');
  if (newPin && newPin.trim().length >= 4) {
    appState.adminPin = newPin.trim();
    saveState();
    alert('¡Clave PIN cambiada exitosamente!');
  } else if (newPin) {
    alert('La nueva clave debe tener al menos 4 caracteres.');
  }
}

// Match Score Modal (Strict Admin Enforced)
let currentEditingMatchId = null;

function openScoreModal(matchId) {
  if (!appState.isAdmin) return openAdminPinModal();

  currentEditingMatchId = matchId;
  const catData = appState.categoriesData[appState.currentCategory];
  let matchObj = null;

  catData.fixtures.forEach(j => {
    const found = j.matches.find(m => m.id === matchId);
    if (found) matchObj = found;
  });

  if (!matchObj) return;

  const home = getTeamObj(matchObj.home);
  const away = getTeamObj(matchObj.away);

  document.getElementById('modalHomeName').innerText = home.name;
  document.getElementById('modalAwayName').innerText = away.name;
  document.getElementById('modalHomeInput').value = matchObj.homeScore !== null ? matchObj.homeScore : 0;
  document.getElementById('modalAwayInput').value = matchObj.awayScore !== null ? matchObj.awayScore : 0;
  document.getElementById('modalStatusSelect').value = matchObj.status;
  
  document.getElementById('modalDayDateInput').value = matchObj.dayDate || '';
  document.getElementById('modalTimeInput').value = matchObj.time || '';
  document.getElementById('modalPitchInput').value = matchObj.pitch || '';

  document.getElementById('scoreModal').classList.add('open');
}

function saveMatchScore() {
  if (!currentEditingMatchId || !appState.isAdmin) return;

  const catData = appState.categoriesData[appState.currentCategory];
  const homeScore = parseInt(document.getElementById('modalHomeInput').value, 10);
  const awayScore = parseInt(document.getElementById('modalAwayInput').value, 10);
  const status = document.getElementById('modalStatusSelect').value;
  
  const dayDate = document.getElementById('modalDayDateInput').value.trim();
  const time = document.getElementById('modalTimeInput').value.trim();
  const pitch = document.getElementById('modalPitchInput').value.trim();

  catData.fixtures.forEach(j => {
    const matchObj = j.matches.find(m => m.id === currentEditingMatchId);
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
  renderMainContent();
}

function closeScoreModal() {
  document.getElementById('scoreModal').classList.remove('open');
}

// Playoff Score Modal (100% Functional Admin Editing for Gran Final & 3er Puesto)
let currentPlayoffType = null;

function openPlayoffScoreModal(type) {
  if (!appState.isAdmin) return openAdminPinModal();

  currentPlayoffType = type;
  const playoffs = appState.categoriesData[appState.currentCategory].playoffs;
  let matchObj = null;

  if (type === 'semi_0') matchObj = playoffs.semis[0];
  if (type === 'semi_1') matchObj = playoffs.semis[1];
  if (type === 'final') matchObj = playoffs.final;
  if (type === 'third') matchObj = playoffs.thirdPlace;

  if (!matchObj) {
    alert('Primero se deben disputar y definir las Semifinales para habilitar este encuentro.');
    return;
  }

  const home = getTeamObj(matchObj.home);
  const away = getTeamObj(matchObj.away);

  document.getElementById('modalPlayoffHomeName').innerText = home.name;
  document.getElementById('modalPlayoffAwayName').innerText = away.name;
  document.getElementById('modalPlayoffHomeInput').value = matchObj.homeScore !== null ? matchObj.homeScore : 0;
  document.getElementById('modalPlayoffAwayInput').value = matchObj.awayScore !== null ? matchObj.awayScore : 0;

  document.getElementById('playoffScoreModal').classList.add('open');
}

function savePlayoffScore() {
  if (!appState.isAdmin) return;

  const playoffs = appState.categoriesData[appState.currentCategory].playoffs;
  const homeScore = parseInt(document.getElementById('modalPlayoffHomeInput').value, 10);
  const awayScore = parseInt(document.getElementById('modalPlayoffAwayInput').value, 10);

  let matchObj = null;
  if (currentPlayoffType === 'semi_0') matchObj = playoffs.semis[0];
  if (currentPlayoffType === 'semi_1') matchObj = playoffs.semis[1];
  if (currentPlayoffType === 'final') matchObj = playoffs.final;
  if (currentPlayoffType === 'third') matchObj = playoffs.thirdPlace;

  if (matchObj) {
    matchObj.homeScore = isNaN(homeScore) ? 0 : homeScore;
    matchObj.awayScore = isNaN(awayScore) ? 0 : awayScore;

    if (homeScore === awayScore) {
      const winnerName = prompt(`El partido terminó empatado ${homeScore}-${awayScore}. Elige al Ganador por penales (escribe 1 para ${getTeamName(matchObj.home)} o 2 para ${getTeamName(matchObj.away)}):`, '1');
      matchObj.winner = winnerName === '2' ? matchObj.away : matchObj.home;
    } else {
      matchObj.winner = homeScore > awayScore ? matchObj.home : matchObj.away;
    }

    const s1 = playoffs.semis[0];
    const s2 = playoffs.semis[1];

    if (s1 && s2 && s1.winner && s2.winner) {
      const loser1 = s1.winner === s1.home ? s1.away : s1.home;
      const loser2 = s2.winner === s2.home ? s2.away : s2.home;

      playoffs.final = playoffs.final || {};
      playoffs.final.home = s1.winner;
      playoffs.final.away = s2.winner;
      playoffs.final.dayDate = playoffs.final.dayDate || 'Gran Final';

      playoffs.thirdPlace = playoffs.thirdPlace || {};
      playoffs.thirdPlace.home = loser1;
      playoffs.thirdPlace.away = loser2;
      playoffs.thirdPlace.dayDate = playoffs.thirdPlace.dayDate || '3er Puesto';
    }
  }

  saveState();
  closePlayoffScoreModal();
  renderMainContent();
}

function closePlayoffScoreModal() {
  document.getElementById('playoffScoreModal').classList.remove('open');
}

// Sponsor Admin Modal
function openAddSponsorModal() {
  if (!appState.isAdmin) return openAdminPinModal();
  document.getElementById('sponsorModal').classList.add('open');
}

function closeSponsorModal() {
  document.getElementById('sponsorModal').classList.remove('open');
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
    appState.sponsors.push(newSp);
    saveState();
    closeSponsorModal();
    renderApp();
  };

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      createSponsorObj(e.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    createSponsorObj(null);
  }
}

function deleteSponsor(spId) {
  if (!appState.isAdmin) return openAdminPinModal();

  if (confirm('¿Deseas eliminar este sponsor?')) {
    appState.sponsors = appState.sponsors.filter(s => s.id !== spId);
    saveState();
    renderApp();
  }
}

// PWA Install Prompt
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

function triggerPwaInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installation accepted');
      }
      deferredPrompt = null;
    });
  } else {
    alert('Para instalar la app en tu celular, usa las opciones "Instalar aplicación" (Android) o "Agregar a Inicio" (iPhone Safari).');
  }
}

// Export / Import
function exportDataJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Campeonato_Comunicaciones_${appState.currentCategory}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importDataJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.categoriesData) {
        appState = { ...appState, ...parsed };
        saveState();
        renderApp();
        alert('¡Datos del torneo importados correctamente!');
      }
    } catch (err) {
      alert('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
}

function confirmResetAll() {
  if (!appState.isAdmin) return openAdminPinModal();

  if (confirm('¿Estás seguro de restablecer todos los datos del torneo al estado inicial?')) {
    generateDefaultTournamentState();
    renderApp();
  }
}

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration error:', err));
  });
}

// Init App
document.addEventListener('DOMContentLoaded', () => {
  initData();
  renderApp();
});
