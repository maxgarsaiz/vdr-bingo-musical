'use strict';

/* ══════════════════════════════════════════════════════════════════════════
   Bingo Musical VDR  —  app.js
   ══════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────────
//  NOTE FREQUENCIES  (Hz)
// ─────────────────────────────────────────────────────────────────────────
const N = {
  C3:130.81, D3:146.83, E3:164.81, F3:174.61, G3:196.00, A3:220.00, B3:246.94,
  C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392.00, A4:440.00, B4:493.88,
  C5:523.25, D5:587.33, E5:659.25, F5:698.46, G5:783.99, A5:880.00, B5:987.77,
  C6:1046.50,
  _:0 // rest
};

// ─────────────────────────────────────────────────────────────────────────
//  MELODIES  — { name, notes: [freq, beats][], tempo, type }
//  B  1-15  : classical     (sine)
//  I 16-30  : rock          (sawtooth)
//  N 31-45  : jazz/bossa    (triangle)
//  G 46-60  : electronic    (square)
//  O 61-75  : pop           (sine)
// ─────────────────────────────────────────────────────────────────────────
const MELODIES = {
  // ── B column ─────────────────────────────────────────────────────────
  1:  { name:'Cumpleaños Feliz',      type:'sine',     tempo:160,
        notes:[[N.C4,1],[N.C4,.5],[N.D4,1.5],[N.C4,1.5],[N.F4,1.5],[N.E4,3]] },
  2:  { name:'Estrellita (Twinkle)',  type:'sine',     tempo:140,
        notes:[[N.C4,1],[N.C4,1],[N.G4,1],[N.G4,1],[N.A4,1],[N.A4,1],[N.G4,2]] },
  3:  { name:'Mary Had a Little Lamb',type:'sine',     tempo:160,
        notes:[[N.E4,1],[N.D4,1],[N.C4,1],[N.D4,1],[N.E4,1],[N.E4,1],[N.E4,2]] },
  4:  { name:'Jingle Bells',          type:'sine',     tempo:180,
        notes:[[N.E4,1],[N.E4,1],[N.E4,2],[N.E4,1],[N.E4,1],[N.E4,2],[N.E4,1],[N.G4,1],[N.C4,1],[N.D4,1],[N.E4,3]] },
  5:  { name:'Himno a la Alegría',    type:'sine',     tempo:150,
        notes:[[N.E4,1],[N.E4,1],[N.F4,1],[N.G4,1],[N.G4,1],[N.F4,1],[N.E4,1],[N.D4,1],[N.C4,1],[N.C4,1],[N.D4,1],[N.E4,1],[N.E4,2],[N.D4,2]] },
  6:  { name:'Für Elise',             type:'sine',     tempo:160,
        notes:[[N.E5,1],[N.D5,.5],[N.E5,.5],[N.D5,1],[N.E5,1],[N.B4,1],[N.D5,1],[N.C5,1],[N.A4,3]] },
  7:  { name:'Canon de Pachelbel',    type:'sine',     tempo:100,
        notes:[[N.D4,2],[N.A3,2],[N.B3,2],[N.F4,2],[N.G3,2],[N.D4,2],[N.G3,2],[N.A3,2]] },
  8:  { name:'Sonata Clara de Luna',  type:'sine',     tempo:120,
        notes:[[N.E3,2],[N.G3,2],[N.C4,2],[N.E3,2],[N.G3,2],[N.C4,4]] },
  9:  { name:'El Danubio Azul',       type:'sine',     tempo:180,
        notes:[[N.D4,2],[N.A4,1],[N.A4,1],[N.B4,2],[N.A4,2],[N.G4,4]] },
  10: { name:'Habanera (Carmen)',      type:'sine',     tempo:150,
        notes:[[N.D4,1],[N.D4,1],[N.D4,1],[N.G3,.5],[N.A3,.5],[N.B3,1],[N.C4,1],[N.D4,3]] },
  11: { name:'Minueto de Bach',        type:'sine',     tempo:160,
        notes:[[N.G4,1],[N.F4,.5],[N.E4,.5],[N.D4,1],[N.C4,1],[N.D4,1],[N.E4,1],[N.C4,3]] },
  12: { name:'La Traviata',            type:'sine',     tempo:140,
        notes:[[N.A4,1],[N.E5,2],[N.D5,1],[N.C5,1],[N.B4,1],[N.A4,4]] },
  13: { name:'Vals del Sombrero',      type:'sine',     tempo:170,
        notes:[[N.G4,2],[N.D4,1],[N.G4,2],[N.B4,1],[N.D5,2],[N.G4,2]] },
  14: { name:'Air on the G String',    type:'sine',     tempo:100,
        notes:[[N.D5,2],[N.C5,1],[N.B4,1],[N.A4,2],[N.G4,4]] },
  15: { name:'Spring (Vivaldi)',        type:'sine',     tempo:190,
        notes:[[N.E5,1],[N.E5,1],[N.E5,1],[N.D5,1],[N.E5,2],[N.G5,2],[N.E5,4]] },

  // ── I column ─────────────────────────────────────────────────────────
  16: { name:'Smoke on the Water',     type:'sawtooth', tempo:140,
        notes:[[N.G3,1],[N.A3,1],[N.C4,1.5],[N.G3,1],[N.A3,1],[N.B3,.5],[N.C4,3]] },
  17: { name:'Sweet Child O\'Mine',    type:'sawtooth', tempo:120,
        notes:[[N.D5,.5],[N.D5,.5],[N.A4,.5],[N.G4,.5],[N.A4,.5],[N.D5,.5],[N.A4,.5],[N.G4,2]] },
  18: { name:'Eye of the Tiger',       type:'sawtooth', tempo:170,
        notes:[[N.C4,.5],[N.C4,.5],[N.C4,.5],[N.G3,1],[N.C4,.5],[N.C4,.5],[N.D4,.5],[N.C4,.5],[N.A3,3]] },
  19: { name:'We Will Rock You',       type:'sawtooth', tempo:100,
        notes:[[N.E4,1],[N.E4,1],[N.A4,2],[N.E4,1],[N.E4,1],[N.A4,2]] },
  20: { name:'Bohemian Rhapsody',      type:'sawtooth', tempo:145,
        notes:[[N.B4,1],[N.A4,1],[N.G4,1],[N.F4,1],[N.E4,2],[N.D4,4]] },
  21: { name:'Hotel California',       type:'sawtooth', tempo:140,
        notes:[[N.B3,1],[N.D4,1],[N.E4,1],[N.F4,2],[N.E4,1],[N.D4,4]] },
  22: { name:'Stairway to Heaven',     type:'sawtooth', tempo:130,
        notes:[[N.A3,1],[N.C4,1],[N.D4,1],[N.E4,2],[N.D4,1],[N.C4,4]] },
  23: { name:'Back in Black',          type:'sawtooth', tempo:160,
        notes:[[N.E3,1],[N.G3,1],[N.A3,1],[N.E3,1],[N.G3,1],[N.A3,2],[N.G3,.5],[N.A3,3]] },
  24: { name:'Purple Rain',            type:'sawtooth', tempo:120,
        notes:[[N.A4,2],[N.G4,1],[N.E4,1],[N.D4,2],[N.E4,4]] },
  25: { name:'Sweet Home Alabama',     type:'sawtooth', tempo:155,
        notes:[[N.D4,1],[N.E4,1],[N.G4,1],[N.A4,2],[N.G4,1],[N.E4,4]] },
  26: { name:'Don\'t Stop Believin\'', type:'sawtooth', tempo:170,
        notes:[[N.E4,.5],[N.F4,.5],[N.G4,1],[N.F4,.5],[N.E4,.5],[N.D4,.5],[N.C4,3]] },
  27: { name:'Born to Run',            type:'sawtooth', tempo:170,
        notes:[[N.E4,1],[N.G4,1],[N.A4,1],[N.G4,1],[N.E4,2],[N.D4,4]] },
  28: { name:'Livin\' on a Prayer',    type:'sawtooth', tempo:160,
        notes:[[N.D4,1],[N.E4,1],[N.G4,2],[N.D4,1],[N.E4,1],[N.A4,4]] },
  29: { name:'Jump (Van Halen)',        type:'sawtooth', tempo:160,
        notes:[[N.C4,1],[N.C4,.5],[N.G4,1],[N.G4,.5],[N.A4,2],[N.G4,4]] },
  30: { name:'Another One Bites',      type:'sawtooth', tempo:180,
        notes:[[N.G3,.5],[N.G3,.5],[N.G3,.5],[N.D4,.5],[N.G3,.5],[N.F3,.5],[N.G3,3]] },

  // ── N column ─────────────────────────────────────────────────────────
  31: { name:'Take Five',              type:'triangle', tempo:160,
        notes:[[N.E4,1],[N.D4,1],[N.C4,.5],[N.D4,.5],[N.E4,1],[N.F4,1],[N.G4,3]] },
  32: { name:'Summertime',             type:'triangle', tempo:120,
        notes:[[N.A4,2],[N.F4,1],[N.A4,1],[N.G4,2],[N.E4,2],[N.C4,4]] },
  33: { name:'Fly Me to the Moon',     type:'triangle', tempo:150,
        notes:[[N.A4,1],[N.E4,1],[N.F4,1],[N.C4,1],[N.D4,1],[N.A3,1],[N.B3,4]] },
  34: { name:'What a Wonderful World', type:'triangle', tempo:130,
        notes:[[N.C4,1],[N.E4,1],[N.G4,1],[N.E4,1],[N.F4,2],[N.D4,4]] },
  35: { name:'Autumn Leaves',          type:'triangle', tempo:140,
        notes:[[N.C4,1],[N.D4,1],[N.F4,1],[N.E4,1],[N.D4,1],[N.C4,1],[N.B3,4]] },
  36: { name:'Girl from Ipanema',      type:'triangle', tempo:155,
        notes:[[N.F4,1],[N.G4,1],[N.A4,1],[N.B4,2],[N.A4,1],[N.G4,1],[N.F4,4]] },
  37: { name:'All of Me (Holiday)',    type:'triangle', tempo:130,
        notes:[[N.C5,2],[N.A4,1],[N.G4,1],[N.E4,2],[N.F4,4]] },
  38: { name:'Misty',                  type:'triangle', tempo:130,
        notes:[[N.E4,2],[N.B4,1],[N.A4,1],[N.G4,1],[N.A4,1],[N.B4,4]] },
  39: { name:"'Round Midnight",         type:'triangle', tempo:100,
        notes:[[N.A4,2],[N.G4,1],[N.F4,1],[N.E4,1],[N.D4,1],[N.C4,4]] },
  40: { name:'Corcovado',              type:'triangle', tempo:140,
        notes:[[N.E4,1],[N.D4,1],[N.G4,2],[N.F4,1],[N.E4,1],[N.D4,4]] },
  41: { name:'Desafinado',             type:'triangle', tempo:150,
        notes:[[N.E4,1],[N.F4,1],[N.G4,1],[N.A4,2],[N.G4,1],[N.F4,4]] },
  42: { name:'Blue in Green',          type:'triangle', tempo:110,
        notes:[[N.G4,2],[N.A4,1],[N.B4,1],[N.A4,1],[N.G4,1],[N.E4,4]] },
  43: { name:'Anthropology',           type:'triangle', tempo:200,
        notes:[[N.G4,.5],[N.B4,.5],[N.D5,.5],[N.G5,1],[N.D5,.5],[N.B4,.5],[N.G4,3]] },
  44: { name:'So What',                type:'triangle', tempo:140,
        notes:[[N.D4,1],[N.F4,1],[N.A4,1],[N.C5,1],[N.E5,2],[N.D5,4]] },
  45: { name:'Wave (Tom Jobim)',        type:'triangle', tempo:140,
        notes:[[N.A4,2],[N.E4,1],[N.F4,1],[N.G4,2],[N.A4,4]] },

  // ── G column ─────────────────────────────────────────────────────────
  46: { name:'Around the World',       type:'square',   tempo:185,
        notes:[[N.E4,.5],[N.E4,.5],[N.D4,.5],[N.D4,.5],[N.C4,.5],[N.C4,.5],[N.D4,1],[N.E4,3]] },
  47: { name:'One More Time',          type:'square',   tempo:175,
        notes:[[N.C4,.5],[N.E4,.5],[N.G4,1],[N.A4,.5],[N.G4,.5],[N.E4,4]] },
  48: { name:'Blue (Da Ba Dee)',        type:'square',   tempo:165,
        notes:[[N.E4,1],[N.G4,1],[N.E4,.5],[N.G4,.5],[N.A4,1],[N.G4,.5],[N.E4,.5],[N.D4,3]] },
  49: { name:'Levels (Avicii)',         type:'square',   tempo:175,
        notes:[[N.C4,.5],[N.D4,.5],[N.F4,1],[N.G4,1],[N.A4,2],[N.G4,3]] },
  50: { name:'Sandstorm',              type:'square',   tempo:180,
        notes:[[N.B4,.5],[N.B4,.5],[N.B4,.5],[N.A4,.5],[N.G4,.5],[N.A4,.5],[N.B4,4]] },
  51: { name:'Children (Robert Miles)', type:'square',  tempo:160,
        notes:[[N.E4,.5],[N.G4,.5],[N.B4,.5],[N.D5,1],[N.B4,.5],[N.G4,1],[N.E4,3]] },
  52: { name:'Insomnia (Faithless)',    type:'square',   tempo:170,
        notes:[[N.A3,.5],[N.C4,.5],[N.E4,.5],[N.A4,1],[N.E4,.5],[N.C4,1],[N.A3,3]] },
  53: { name:'Kernkraft 400',          type:'square',   tempo:175,
        notes:[[N.A4,.5],[N.A4,.5],[N.G4,.5],[N.A4,.5],[N.A4,.5],[N.A4,.5],[N.C5,1],[N.A4,3]] },
  54: { name:'Pump Up the Jam',        type:'square',   tempo:180,
        notes:[[N.C4,.5],[N.C4,.5],[N.E4,.5],[N.G4,1],[N.E4,.5],[N.C4,1],[N.G3,3]] },
  55: { name:'Get Lucky (Daft Punk)',  type:'square',   tempo:165,
        notes:[[N.F4,1],[N.A4,1],[N.C5,1],[N.A4,.5],[N.G4,.5],[N.F4,4]] },
  56: { name:'Oxygène (Jarre)',        type:'square',   tempo:120,
        notes:[[N.D4,2],[N.F4,1],[N.A4,1],[N.C5,2],[N.A4,1],[N.F4,4]] },
  57: { name:'Da Funk (Daft Punk)',    type:'square',   tempo:150,
        notes:[[N.A3,.5],[N.C4,.5],[N.E4,.5],[N.G4,1],[N.E4,.5],[N.C4,.5],[N.A3,3]] },
  58: { name:'Flat Beat (Mr. Oizo)',   type:'square',   tempo:160,
        notes:[[N.E4,.5],[N.E4,.5],[N.E4,1],[N.G4,.5],[N.E4,.5],[N.D4,4]] },
  59: { name:'Harder Better Faster',  type:'square',   tempo:175,
        notes:[[N.C4,.5],[N.E4,.5],[N.G4,.5],[N.C5,1],[N.G4,.5],[N.E4,.5],[N.C4,3]] },
  60: { name:'Show Me Love (Robyn)',   type:'square',   tempo:140,
        notes:[[N.G4,1],[N.A4,1],[N.B4,2],[N.A4,1],[N.G4,2],[N.F4,3]] },

  // ── O column ─────────────────────────────────────────────────────────
  61: { name:'Shape of You',           type:'sine',     tempo:165,
        notes:[[N.E4,.5],[N.G4,.5],[N.A4,1],[N.G4,.5],[N.E4,.5],[N.D4,.5],[N.E4,3]] },
  62: { name:'Despacito',              type:'sine',     tempo:170,
        notes:[[N.B3,.5],[N.D4,.5],[N.E4,1],[N.F4,1],[N.G4,2],[N.E4,3]] },
  63: { name:'Blinding Lights',        type:'sine',     tempo:171,
        notes:[[N.E4,.5],[N.G4,.5],[N.A4,.5],[N.C5,1],[N.A4,.5],[N.G4,.5],[N.E4,3]] },
  64: { name:'Bad Guy (Billie)',        type:'sine',     tempo:135,
        notes:[[N.G3,.5],[N.G3,.5],[N.A3,.5],[N.G3,.5],[N.F3,.5],[N.G3,1],[N.A3,4]] },
  65: { name:'Old Town Road',          type:'sine',     tempo:160,
        notes:[[N.A3,1],[N.B3,1],[N.C4,1],[N.E4,2],[N.D4,1],[N.C4,4]] },
  66: { name:'Watermelon Sugar',       type:'sine',     tempo:168,
        notes:[[N.E4,.5],[N.F4,.5],[N.G4,1],[N.A4,.5],[N.G4,.5],[N.E4,4]] },
  67: { name:'Stay (Kid Laroi)',        type:'sine',     tempo:130,
        notes:[[N.G4,2],[N.E4,1],[N.D4,1],[N.C4,2],[N.D4,4]] },
  68: { name:'Levitating (Lipa)',       type:'sine',     tempo:103,
        notes:[[N.D4,.5],[N.E4,.5],[N.F4,.5],[N.G4,1],[N.F4,.5],[N.E4,.5],[N.D4,3]] },
  69: { name:'Dynamite (BTS)',          type:'sine',     tempo:114,
        notes:[[N.E4,.5],[N.G4,.5],[N.A4,.5],[N.B4,1],[N.A4,.5],[N.G4,.5],[N.E4,3]] },
  70: { name:'Peaches (Bieber)',        type:'sine',     tempo:146,
        notes:[[N.G4,.5],[N.A4,.5],[N.B4,1],[N.A4,.5],[N.G4,.5],[N.F4,1],[N.E4,3]] },
  71: { name:'As It Was (Styles)',      type:'sine',     tempo:174,
        notes:[[N.E4,1],[N.G4,1],[N.A4,1],[N.G4,.5],[N.E4,.5],[N.D4,4]] },
  72: { name:'Anti-Hero (Swift)',       type:'sine',     tempo:97,
        notes:[[N.C4,1],[N.E4,1],[N.G4,2],[N.E4,1],[N.C4,4]] },
  73: { name:'Flowers (Cyrus)',         type:'sine',     tempo:118,
        notes:[[N.D4,.5],[N.E4,.5],[N.G4,1],[N.A4,1],[N.G4,.5],[N.E4,.5],[N.D4,3]] },
  74: { name:'Unholy (Smith)',          type:'sine',     tempo:144,
        notes:[[N.A3,.5],[N.C4,.5],[N.E4,1],[N.G4,1],[N.E4,.5],[N.C4,.5],[N.A3,3]] },
  75: { name:'Calm Down (Rema)',        type:'sine',     tempo:106,
        notes:[[N.G4,.5],[N.A4,.5],[N.B4,.5],[N.C5,1],[N.B4,.5],[N.A4,.5],[N.G4,4]] },
};

// ─────────────────────────────────────────────────────────────────────────
//  AUDIO ENGINE
// ─────────────────────────────────────────────────────────────────────────
const MASTER_GAIN = 0.45; // master volume for all musical sound effects

let audioCtx  = null;
let masterGain = null;
let muted = false;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = MASTER_GAIN;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playNote(freq, startTime, durSec, type, vol) {
  if (muted || !audioCtx || freq === 0) return;

  const osc  = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(masterGain);

  osc.type = type || 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(vol || 0.4, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + durSec);

  osc.start(startTime);
  osc.stop(startTime + durSec + 0.05);
}

function playBallMelody(ballNumber) {
  initAudio();
  const mel = MELODIES[ballNumber];
  if (!mel) return;

  const beatDur = 60 / mel.tempo;
  let t = audioCtx.currentTime + 0.06;

  mel.notes.forEach(([freq, beats]) => {
    if (freq > 0) {
      playNote(freq, t, beats * beatDur * 0.88, mel.type);
    }
    t += beats * beatDur;
  });
}

// A short win fanfare
function playWinFanfare() {
  initAudio();
  const fanfare = [
    [N.C5,.5],[N.E5,.5],[N.G5,.5],[N.C6,.5],
    [N.G5,.25],[N.C6,1.5]
  ];
  let t = audioCtx.currentTime + 0.05;
  const beatDur = 60 / 200;
  fanfare.forEach(([freq, beats]) => {
    playNote(freq, t, beats * beatDur * 0.9, 'sine', 0.5);
    t += beats * beatDur;
  });
}

// ─────────────────────────────────────────────────────────────────────────
//  BINGO GAME STATE
// ─────────────────────────────────────────────────────────────────────────
const COLS   = ['B','I','N','G','O'];
const RANGES = { B:[1,15], I:[16,30], N:[31,45], G:[46,60], O:[61,75] };

let bag      = [];   // remaining balls
let drawn    = [];   // drawn balls (in order)
let card     = [];   // card[row][col] = { num, marked }
let gameOver = false;

// Build a shuffled array of integers [min, max] inclusive
function range(min, max) {
  const arr = [];
  for (let i = min; i <= max; i++) arr.push(i);
  return shuffle(arr);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateBag() {
  bag = shuffle([...Array(75)].map((_, i) => i + 1));
}

function generateCard() {
  // For each column, pick 5 random numbers from its range (N column gets FREE in center)
  card = [];
  for (let row = 0; row < 5; row++) {
    card[row] = [];
    for (let col = 0; col < 5; col++) {
      card[row][col] = { num: 0, marked: false };
    }
  }

  COLS.forEach((letter, col) => {
    const [min, max] = RANGES[letter];
    const nums = range(min, max).slice(0, 5);
    for (let row = 0; row < 5; row++) {
      card[row][col] = { num: nums[row], marked: false };
    }
  });

  // FREE center square
  card[2][2] = { num: 0, marked: true, free: true };
}

function colOfNumber(num) {
  const idx = Math.floor((num - 1) / 15);
  return idx >= 0 && idx < COLS.length ? COLS[idx] : '';
}

// ─────────────────────────────────────────────────────────────────────────
//  WIN DETECTION
// ─────────────────────────────────────────────────────────────────────────
function checkWin() {
  // Returns array of winning [row,col] pairs or null
  const is = (r, c) => card[r][c].marked;

  // Check rows
  for (let r = 0; r < 5; r++) {
    if ([0,1,2,3,4].every(c => is(r,c)))
      return [[r,0],[r,1],[r,2],[r,3],[r,4]];
  }
  // Check cols
  for (let c = 0; c < 5; c++) {
    if ([0,1,2,3,4].every(r => is(r,c)))
      return [[0,c],[1,c],[2,c],[3,c],[4,c]];
  }
  // Diagonal ↘
  if ([0,1,2,3,4].every(i => is(i,i)))
    return [[0,0],[1,1],[2,2],[3,3],[4,4]];
  // Diagonal ↙
  if ([0,1,2,3,4].every(i => is(i,4-i)))
    return [[0,4],[1,3],[2,2],[3,1],[4,0]];

  return null;
}

// ─────────────────────────────────────────────────────────────────────────
//  DOM RENDERING
// ─────────────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function renderCard() {
  const grid = $('bingo-card');
  grid.innerHTML = '';

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = card[row][col];
      const div  = document.createElement('div');
      div.className = 'card-cell';
      div.dataset.row = row;
      div.dataset.col = col;

      if (cell.free) {
        div.classList.add('free', 'marked');
        div.textContent = 'FREE';
      } else {
        div.textContent = cell.num;
        if (cell.marked) div.classList.add('marked');
      }

      grid.appendChild(div);
    }
  }
}

function markAndRenderNumber(num) {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (card[r][c].num === num) {
        card[r][c].marked = true;
        const cell = document.querySelector(`.card-cell[data-row="${r}"][data-col="${c}"]`);
        if (cell) cell.classList.add('marked');
        return;
      }
    }
  }
}

function highlightWinners(positions) {
  const cells = document.querySelectorAll('.card-cell');
  cells.forEach(cell => {
    const r = +cell.dataset.row;
    const c = +cell.dataset.col;
    if (positions.some(([pr,pc]) => pr===r && pc===c)) {
      cell.classList.add('winner');
    }
  });
}

function renderCurrentBall(num) {
  const container = $('current-ball');
  const col = colOfNumber(num);
  const cls = `ball-${col.toLowerCase()}`;

  container.innerHTML = `
    <div class="ball ${cls} ball-pop">
      <span class="ball-letter">${col}</span>
      <span class="ball-number">${num}</span>
    </div>`;

  const mel = MELODIES[num];
  $('song-name').textContent = mel ? `♪ ${mel.name}` : '';
}

function renderMiniball(num) {
  const col  = colOfNumber(num).toLowerCase();
  const div  = document.createElement('div');
  div.className = `mini-ball mini-ball-${col}`;
  div.title = `${colOfNumber(num)}${num}`;
  div.textContent = num;
  $('drawn-balls').prepend(div);
}

// ─────────────────────────────────────────────────────────────────────────
//  GAME ACTIONS
// ─────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────
//  LOCALSTORAGE PERSISTENCE
// ─────────────────────────────────────────────────────────────────────────
const SAVE_KEY = 'vdr-bingo-state';

function saveState() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      bag, drawn, card, gameOver,
      lastBall: drawn.length > 0 ? drawn[drawn.length - 1] : null
    }));
  } catch (err) { console.warn('saveState: could not write to localStorage', err); }
}

function clearState() {
  try { localStorage.removeItem(SAVE_KEY); } catch (err) { console.warn('clearState failed', err); }
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const s = JSON.parse(raw);
    if (!s.card || !s.bag || !s.drawn) return false;
    bag      = s.bag;
    drawn    = s.drawn;
    card     = s.card;
    gameOver = s.gameOver || false;

    // Rebuild UI from restored state
    $('draw-count').textContent = drawn.length;
    $('drawn-balls').innerHTML  = '';
    $('win-overlay').classList.add('hidden');
    renderCard();

    // Re-render each drawn mini-ball (oldest first → newest on top)
    [...drawn].reverse().forEach(num => renderMiniball(num));

    // Show the last drawn ball, if any
    if (s.lastBall) {
      renderCurrentBall(s.lastBall);
    }

    if (gameOver) {
      const win = checkWin();
      if (win) highlightWinners(win);
    }

    $('btn-draw').disabled = bag.length === 0 || gameOver;
    return true;
  } catch (err) {
    console.warn('loadState: could not restore state', err);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────
//  WEB SPEECH API
// ─────────────────────────────────────────────────────────────────────────
const SPEECH_LANG          = 'es-ES';
const SPEECH_SYNTHESIS_RATE = 0.9;

// speechEnabled controls voice ball announcements (Web Speech API).
// muted controls musical sound effects (Web Audio API). They are independent.
let speechEnabled = true;

function announceBall(num) {
  if (!speechEnabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // interrupt any previous utterance
  const col = colOfNumber(num);
  const mel = MELODIES[num];
  const text = mel ? `${col} ${num}. ${mel.name}` : `${col} ${num}`;
  const utt  = new SpeechSynthesisUtterance(text);
  utt.lang   = SPEECH_LANG;
  utt.rate   = SPEECH_SYNTHESIS_RATE;
  window.speechSynthesis.speak(utt);
}

// ─────────────────────────────────────────────────────────────────────────
//  GAME ACTIONS
// ─────────────────────────────────────────────────────────────────────────
function drawBall() {
  if (gameOver || bag.length === 0) return;

  const num = bag.pop();
  drawn.push(num);

  $('draw-count').textContent = drawn.length;

  renderCurrentBall(num);
  renderMiniball(num);
  playBallMelody(num);
  announceBall(num);

  markAndRenderNumber(num);

  const win = checkWin();
  if (win) {
    gameOver = true;
    highlightWinners(win);
    setTimeout(() => {
      playWinFanfare();
      $('win-overlay').classList.remove('hidden');
    }, 600);
  }

  $('btn-draw').disabled = bag.length === 0 || gameOver;
  saveState();
}

function newGame() {
  // Confirm if a game is already in progress
  if (drawn.length > 0 && !gameOver) {
    if (!confirm('¿Seguro que quieres empezar una nueva partida? Se perderá la partida actual.')) {
      return;
    }
  }

  gameOver = false;
  drawn = [];
  generateBag();
  generateCard();
  clearState();

  // Reset UI
  $('draw-count').textContent = '0';
  $('drawn-balls').innerHTML = '';
  $('song-name').textContent = 'Pulsa «Sacar Bola» para empezar';
  $('current-ball').innerHTML = `
    <div class="ball ball-empty">
      <span class="ball-letter">?</span>
      <span class="ball-number">--</span>
    </div>`;
  $('win-overlay').classList.add('hidden');
  $('btn-draw').disabled = false;

  renderCard();
}

// ─────────────────────────────────────────────────────────────────────────
//  EVENT LISTENERS
// ─────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  $('btn-draw').addEventListener('click', drawBall);

  $('btn-new').addEventListener('click', newGame);

  $('btn-close-win').addEventListener('click', newGame);

  $('btn-mute').addEventListener('click', () => {
    muted = !muted;
    $('btn-mute').textContent = muted ? '🔇' : '🔊';
    if (audioCtx && masterGain) {
      masterGain.gain.value = muted ? 0 : MASTER_GAIN;
    }
  });

  $('btn-speak').addEventListener('click', () => {
    speechEnabled = !speechEnabled;
    $('btn-speak').textContent = speechEnabled ? '🔈' : '🔕';
    $('btn-speak').title = speechEnabled ? 'Cantar bola (activo)' : 'Cantar bola (silenciado)';
    if (!speechEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  });

  // Restore saved game or start fresh
  if (!loadState()) {
    newGame();
  }
});

