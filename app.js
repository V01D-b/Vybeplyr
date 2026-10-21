'use strict';

(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const ICONS = {
    home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/>',
    search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
    library:'<path d="M4 4v16M9 6v14M14 4l5 16"/>',
    playlist:'<path d="M4 6h16M4 11h16M4 16h10"/><path d="M18 15v5l4-2.5z"/>',
    heart:'<path d="M20.8 8.8c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 8.8 2.3Z"/>',
    history:'<path d="M3.5 11a8.5 8.5 0 1 1 .8 4.5"/><path d="M3 4v7h7M12 7v5l3 2"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.6-1.4-2.4L7.1 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" transform="translate(-1 -1) scale(1.08)"/>',
    plus:'<path d="M12 5v14M5 12h14"/>' ,
    'chevron-left':'<path d="m15 18-6-6 6-6"/>',
    'chevron-right':'<path d="m9 18 6-6-6-6"/>',
    youtube:'<rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    expand:'<path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/>',
    music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    shuffle:'<path d="m16 3 4 4-4 4M4 17l4-4 3-3 2-2 3-2h4M16 13l4 4-4 4M4 7h3l3 3m3 4 2 2 1 1h4"/>',
    previous:'<path d="M5 5v14M19 5 7 12l12 7z" fill="currentColor" stroke="none"/>',
    next:'<path d="M19 5v14M5 5l12 7-12 7z" fill="currentColor" stroke="none"/>',
    play:'<path d="m8 5 12 7-12 7z" fill="currentColor" stroke="none"/>',
    pause:'<path d="M8 5h3v14H8zM15 5h3v14h-3z" fill="currentColor" stroke="none"/>',
    repeat:'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>',
    'list-music':'<path d="M4 6h12M4 11h12M4 16h7"/><path d="M17 14V5l5-1v8"/><circle cx="15" cy="15" r="2"/><circle cx="20" cy="12" r="2"/>',
    timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M9 2h6M12 2v3"/>',
    volume:'<path d="M4 10v4h4l5 4V6l-5 4z"/><path d="M17 9a5 5 0 0 1 0 6M19 6a9 9 0 0 1 0 12"/>',
    mute:'<path d="M4 10v4h4l5 4V6l-5 4zM17 9l5 6M22 9l-5 6"/>',
    more:'<circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    upload:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
    download:'<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
    edit:'<path d="m4 16-.8 4.8L8 20l11-11-4-4zM13.5 6.5l4 4"/>',
    trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
    queue:'<path d="M4 6h11M4 11h11M4 16h7M17 15v5l4-2.5z"/>',
    'arrow-right':'<path d="M4 12h16M13 5l7 7-7 7"/>',
    keyboard:'<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M6 9h.01M9 9h.01M12 9h.01M15 9h.01M18 9h.01M6 12h.01M9 12h.01M12 12h.01M15 12h.01M18 12h.01M8 15h8"/>',
    'arrow-up':'<path d="M12 19V5M5 12l7-7 7 7"/>',
    'arrow-down':'<path d="M12 5v14M5 12l7 7 7-7"/>',
    external:'<path d="M13 4h7v7M20 4l-9 9"/><path d="M17 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h6"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',
    sort:'<path d="M7 4v16M4 7l3-3 3 3M17 20V4M14 17l3 3 3-3"/>',
    sparkles:'<path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    disc:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v2M21 12h-2M12 21v-2M3 12h2"/>',
  };
  const icon = (name, cls = '') => `<svg viewBox="0 0 24 24" aria-hidden="true"${cls ? ` class="${cls}"` : ''}>${ICONS[name] || ICONS.music}</svg>`;
  $$('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon); });

  const DB_NAME = 'vybe-music-library';
  const DB_VERSION = 1;
  const SETTINGS_KEY = 'vybe-settings-v1';
  const defaultSettings = {
    theme: 'dark', accent: '#9875ff', compact: false, reduceMotion: false,
    volume: 75, shuffle: false, repeat: 'off', autoPlay: true,
    lastView: 'home', sortBy: 'recent', defaultLibraryView: 'all', rememberQueue: true,
  };
  const defaultState = { library: [], playlists: [], favorites: [], history: [], queue: [], currentSongId: null, lastPosition: 0, updatedAt: Date.now() };
  let state = structuredCloneSafe(defaultState);
  let settings = { ...defaultSettings };
  let db = null;
  let currentView = 'home';
  let activePlaylistId = null;
  let currentPlaylistSort = 'custom';
  let isPlaying = false;
  let isMuted = false;
  let previousVolume = 75;
  let previousIds = [];
  let repeatCollection = [];
  let objectUrls = new Map();
  let pendingYoutubeId = null;
  let youtubePlayer = null;
  let youtubeApiLoading = false;
  let youtubeReady = false;
  let youtubePlaybackTimer = null;
  let youtubePoller = null;
  let pendingSeek = null;
  let pendingPlayAfterReady = false;
  let sleepTimerId = null;
  let sleepTimerEndsAt = 0;
  let saveTimer = null;
  let saveError = false;
  let searchQuery = '';
  let modalCloseHandler = null;
  let contextMenu = null;
  let activeDragSongId = null;
  let navHistory = ['home'];
  let navIndex = 0;
  let installPromptEvent = null;
  let youtubePanelManuallyClosed = false;
  const audio = $('#audio-player');

  function structuredCloneSafe(value) {
    try { return structuredClone(value); } catch { return JSON.parse(JSON.stringify(value)); }
  }
  function newId(prefix = 'id') {
    return `${prefix}_${(crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 11)}`)}`;
  }
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  }
  function escapeAttr(value) { return escapeHtml(value).replace(/`/g, '&#96;'); }
  function safeUrl(value) {
    try { const url = new URL(value, location.href); return ['http:', 'https:', 'data:', 'blob:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
  }
  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const s = Math.floor(seconds); const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const rem = s % 60;
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}` : `${m}:${String(rem).padStart(2, '0')}`;
  }
  function formatDuration(seconds) { return Number.isFinite(seconds) && seconds > 0 ? formatTime(seconds) : '—'; }
  function timeAgo(timestamp) {
    const seconds = Math.max(0, Math.floor((Date.now() - Number(timestamp || Date.now())) / 1000));
    if (seconds < 60) return 'Just now'; if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`; if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return new Date(timestamp).toLocaleDateString(undefined, { month:'short', day:'numeric' });
  }
  function greetByTime() { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; }
  function getSong(id) { return state.library.find(song => song.id === id) || null; }
  function getPlaylist(id) { return state.playlists.find(playlist => playlist.id === id) || null; }
  function currentSong() { return getSong(state.currentSongId); }
  function isFavorite(id) { return state.favorites.includes(id); }
  function isCurrentSong(id) { return state.currentSongId === id; }
  function songCover(song, className = 'song-cover') {
    if (!song) return `<div class="${className}">${icon('music')}</div>`;
    const cover = safeUrl(song.cover || '');
    return `<div class="${className}">${cover ? `<img src="${escapeAttr(cover)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : icon(song.kind === 'youtube' ? 'youtube' : 'music')}</div>`;
  }
  function playlistCover(playlist, className = 'playlist-card-art') {
    if (playlist?.cover && safeUrl(playlist.cover)) return `<div class="card-art ${className}"><img src="${escapeAttr(safeUrl(playlist.cover))}" alt="" loading="lazy"></div>`;
    const songs = (playlist?.songIds || []).map(getSong).filter(Boolean).slice(0, 4);
    const stack = songs.length ? `<div class="playlist-stack">${songs.map(song => safeUrl(song.cover || '') ? `<img src="${escapeAttr(safeUrl(song.cover))}" alt="" loading="lazy">` : `<div class="stack-fallback">${icon(song.kind === 'youtube' ? 'youtube' : 'music')}</div>`).join('')}${songs.length === 1 ? `<div class="stack-fallback">${icon('music')}</div><div class="stack-fallback">${icon('music')}</div><div class="stack-fallback">${icon('music')}</div>` : ''}${songs.length === 2 ? `<div class="stack-fallback">${icon('music')}</div><div class="stack-fallback">${icon('music')}</div>` : ''}${songs.length === 3 ? `<div class="stack-fallback">${icon('music')}</div>` : ''}</div>` : `<div class="card-art ${className}">${icon('playlist')}</div>`;
    return songs.length ? `<div class="card-art ${className}">${stack}</div>` : stack;
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) { reject(new Error('This browser does not support local library storage.')); return; }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains('appState')) database.createObjectStore('appState');
        if (!database.objectStoreNames.contains('audioFiles')) database.createObjectStore('audioFiles');
      };
      request.onsuccess = () => { db = request.result; db.onversionchange = () => db.close(); resolve(db); };
      request.onerror = () => reject(request.error || new Error('Could not open local storage.'));
    });
  }
  function dbGet(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly'); const req = tx.objectStore(storeName).get(key);
      req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error);
    });
  }
  function dbPut(storeName, key, value) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite'); tx.objectStore(storeName).put(value, key);
      tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error || new Error('Storage operation was aborted.'));
    });
  }
  function dbDelete(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite'); tx.objectStore(storeName).delete(key);
      tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error);
    });
  }
  async function loadAllData() {
    try {
      await openDatabase();
      const stored = await dbGet('appState', 'main');
      if (stored && typeof stored === 'object') state = normalizeState(stored);
    } catch (error) {
      console.error(error);
      toast('Local storage could not be opened. Run the website at localhost or through HTTPS.', 'error', 6500);
    }
    try {
      const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      settings = { ...defaultSettings, ...(savedSettings && typeof savedSettings === 'object' ? savedSettings : {}) };
    } catch { settings = { ...defaultSettings }; }
    applySettings();
    previousVolume = settings.volume || 75;
    $('#volume-range').value = String(settings.volume);
    updateRangeFill($('#volume-range'));
    $('#global-search').value = searchQuery;
    await restoreSavedPosition();
  }
  function normalizeState(input) {
    const source = input && typeof input === 'object' ? input : {};
    const library = Array.isArray(source.library) ? source.library.filter(s => s && typeof s.id === 'string' && typeof s.title === 'string').map(s => ({
      id:s.id, kind:s.kind === 'youtube' ? 'youtube' : 'local', title:s.title.slice(0,300), artist:String(s.artist || '').slice(0,200), album:String(s.album || '').slice(0,200),
      cover:typeof s.cover === 'string' ? s.cover.slice(0,3_000_000) : '', duration:Number.isFinite(Number(s.duration)) && Number(s.duration) > 0 ? Number(s.duration) : null,
      importedAt:Number(s.importedAt) || Date.now(), videoId:typeof s.videoId === 'string' ? s.videoId : '', sourceUrl:typeof s.sourceUrl === 'string' ? s.sourceUrl : '',
      fileName:typeof s.fileName === 'string' ? s.fileName.slice(0,300) : '', fileSize:Number(s.fileSize) || 0, needsFile:!!s.needsFile, note:typeof s.note === 'string' ? s.note.slice(0,300) : '',
    })) : [];
    const validIds = new Set(library.map(s => s.id));
    const playlists = Array.isArray(source.playlists) ? source.playlists.filter(p => p && typeof p.id === 'string').map(p => ({
      id:p.id, name:String(p.name || 'Untitled playlist').slice(0,100), description:String(p.description || '').slice(0,600), cover:typeof p.cover === 'string' ? p.cover.slice(0,3_000_000) : '', color:String(p.color || ''),
      createdAt:Number(p.createdAt) || Date.now(), updatedAt:Number(p.updatedAt) || Date.now(), songIds:Array.isArray(p.songIds) ? [...new Set(p.songIds.filter(id => validIds.has(id)))].slice(0,50000) : [],
    })) : [];
    return {
      library:library.slice(0,50000), playlists:playlists.slice(0,5000), favorites:Array.isArray(source.favorites) ? [...new Set(source.favorites.filter(id => validIds.has(id)))].slice(0,50000) : [],
      history:Array.isArray(source.history) ? source.history.filter(h => h && validIds.has(h.songId)).slice(0,1000).map(h => ({ songId:h.songId, playedAt:Number(h.playedAt) || Date.now() })) : [],
      queue:Array.isArray(source.queue) ? source.queue.filter(id => validIds.has(id)).slice(0,50000) : [], currentSongId:validIds.has(source.currentSongId) ? source.currentSongId : null,
      lastPosition:Number.isFinite(Number(source.lastPosition)) && Number(source.lastPosition) >= 0 ? Number(source.lastPosition) : 0, updatedAt:Number(source.updatedAt) || Date.now(),
    };
  }
  async function restoreSavedPosition() {
    const song = currentSong();
    if (!song) return;
    renderPlayer();
    if (song.kind === 'local' && db && !song.needsFile) {
      const blob = await getAudioBlob(song.id).catch(() => null);
      if (blob) {
        const url = URL.createObjectURL(blob); objectUrls.set(song.id, url); audio.src = url;
        audio.addEventListener('loadedmetadata', () => { if (isCurrentSong(song.id) && state.lastPosition > 0 && state.lastPosition < (audio.duration || 0)) audio.currentTime = state.lastPosition; }, { once: true });
      }
    }
  }
  function persistSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (error) { console.warn(error); toast('Your settings could not be saved in this browser.', 'warning'); }
  }
  function setSaveStatus(status) {
    const el = $('#save-status'); if (!el) return;
    el.classList.toggle('saving', status === 'saving'); el.classList.toggle('error', status === 'error');
    const label = $('span', el); if (label) label.textContent = status === 'saving' ? 'Saving…' : status === 'error' ? 'Not saved' : 'Saved';
  }
  function schedulePersist() {
    state.updatedAt = Date.now();
    setSaveStatus('saving');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      try {
        if (!db) throw new Error('Browser storage is unavailable.');
        await dbPut('appState', 'main', state);
        persistSettings(); saveError = false; setSaveStatus('saved');
      } catch (error) {
        console.error(error); saveError = true; setSaveStatus('error');
        toast('Could not save your library. Your browser storage may be full.', 'error', 5500);
      }
    }, 280);
  }
  async function saveNow() {
    clearTimeout(saveTimer);
    try { if (!db) await openDatabase(); await dbPut('appState', 'main', state); persistSettings(); setSaveStatus('saved'); }
    catch (error) { console.error(error); setSaveStatus('error'); }
  }
  async function getAudioBlob(songId) { if (!db) return null; return await dbGet('audioFiles', songId); }
  async function putAudioBlob(songId, blob) { if (!db) throw new Error('Local file storage is unavailable.'); await dbPut('audioFiles', songId, blob); }
  async function deleteAudioBlob(songId) { if (db) await dbDelete('audioFiles', songId).catch(() => {}); if (objectUrls.has(songId)) { URL.revokeObjectURL(objectUrls.get(songId)); objectUrls.delete(songId); } }
  function applySettings() {
    document.documentElement.style.setProperty('--accent', settings.accent || defaultSettings.accent);
    const accent2 = mixColor(settings.accent || defaultSettings.accent, '#4e2db7', .25);
    document.documentElement.style.setProperty('--accent-2', accent2);
    document.body.classList.toggle('reduced-motion', !!settings.reduceMotion);
    document.body.classList.toggle('compact-mode', !!settings.compact);
    document.body.classList.toggle('light-theme', settings.theme === 'light');
    const themeMeta = $('meta[name="theme-color"]'); if (themeMeta) themeMeta.content = settings.theme === 'light' ? '#f5f4fa' : '#0b0b10';
    $('#shuffle-button')?.classList.toggle('active', !!settings.shuffle);
    $('#repeat-button')?.classList.toggle('active', settings.repeat !== 'off');
    $('#repeat-button')?.setAttribute('aria-label', `Repeat mode: ${settings.repeat}`);
    $('#repeat-button')?.setAttribute('title', `Repeat ${settings.repeat}`);
    $('#volume-range').value = String(settings.volume);
    updateRangeFill($('#volume-range'));
  }
  function mixColor(c1, c2, weight) {
    const parse = c => { const raw = c.replace('#',''); return [parseInt(raw.slice(0,2),16),parseInt(raw.slice(2,4),16),parseInt(raw.slice(4,6),16)]; };
    try { const a = parse(c1), b = parse(c2); return '#' + a.map((v,i) => Math.round(v*(1-weight)+b[i]*weight).toString(16).padStart(2,'0')).join(''); } catch { return '#7951eb'; }
  }
  function updateRangeFill(input) {
    if (!input) return;
    const min = Number(input.min) || 0; const max = Number(input.max) || 100; const val = Number(input.value) || 0;
    input.style.setProperty('--range-progress', `${((val-min)/(max-min))*100}%`);
    if (input.id === 'seek-range') $('#player-bar')?.style.setProperty('--seek-mobile', `${((val-min)/(max-min))*100}%`);
  }
  function toast(message, type = 'success', timeout = 3500) {
    const region = $('#toast-region'); if (!region) return;
    const el = document.createElement('div'); el.className = `toast ${type === 'error' ? 'error' : type === 'warning' ? 'warning' : ''}`;
    const iconName = type === 'error' ? 'info' : type === 'warning' ? 'info' : 'check';
    el.innerHTML = `<span class="toast-icon">${icon(iconName)}</span><span class="toast-message">${escapeHtml(message)}</span><button aria-label="Dismiss notification">×</button>`;
    $('button', el).addEventListener('click', () => el.remove()); region.append(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(5px)'; setTimeout(() => el.remove(), 200); }, timeout);
  }
  function closeModal() { $('#modal-root').innerHTML = ''; modalCloseHandler = null; }
  function showModal({ title, description = '', body = '', footer = '', wide = false, onOpen = null }) {
    closeContextMenu();
    $('#modal-root').innerHTML = `<div class="modal-backdrop" id="modal-backdrop"><section class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${escapeAttr(title)}"><div class="modal-head"><div><h2>${escapeHtml(title)}</h2>${description ? `<p>${escapeHtml(description)}</p>` : ''}</div><button class="icon-button" data-action="close-modal" aria-label="Close dialog">${icon('close')}</button></div><div class="modal-body">${body}</div>${footer ? `<div class="modal-foot">${footer}</div>` : ''}</section></div>`;
    $('#modal-backdrop').addEventListener('click', event => { if (event.target.id === 'modal-backdrop') closeModal(); });
    modalCloseHandler = () => closeModal();
    if (onOpen) onOpen();
    const first = $('input:not([type=file]), textarea, select, button', $('#modal-root')); if (first) setTimeout(() => first.focus({ preventScroll:true }), 30);
  }
  function closeContextMenu() { if (contextMenu) { contextMenu.remove(); contextMenu = null; } }
  function openContextMenu(anchor, items) {
    closeContextMenu();
    const menu = document.createElement('div'); menu.className = 'context-menu';
    menu.innerHTML = items.map(item => item.separator ? '<div class="menu-separator"></div>' : `<button data-menu-action="${escapeAttr(item.action)}" data-menu-song="${escapeAttr(item.songId || '')}" data-menu-playlist="${escapeAttr(item.playlistId || '')}" class="${item.danger ? 'danger' : ''}">${icon(item.icon || 'music')}<span>${escapeHtml(item.label)}</span></button>`).join('');
    document.body.append(menu); contextMenu = menu;
    const rect = anchor.getBoundingClientRect(); const menuRect = menu.getBoundingClientRect();
    let left = Math.min(rect.right - menuRect.width, window.innerWidth - menuRect.width - 10); let top = rect.bottom + 5;
    if (top + menuRect.height > window.innerHeight - 15) top = Math.max(10, rect.top - menuRect.height - 5);
    menu.style.left = `${Math.max(10,left)}px`; menu.style.top = `${Math.max(10,top)}px`;
    menu.addEventListener('click', event => { const button = event.target.closest('[data-menu-action]'); if (!button) return; handleMenuAction(button.dataset.menuAction, button.dataset.menuSong, button.dataset.menuPlaylist); closeContextMenu(); });
    setTimeout(() => document.addEventListener('click', outside, { once: true }), 0);
    function outside(event) { if (contextMenu && !contextMenu.contains(event.target) && !anchor.contains(event.target)) closeContextMenu(); }
  }

  function setView(view, push = true) {
    const allowed = ['home','search','library','playlists','favorites','history','settings','playlistDetail'];
    if (!allowed.includes(view)) view = 'home';
    currentView = view;
    if (push) { const nextView = view === 'playlistDetail' ? 'playlists' : view; if (navHistory[navIndex] !== nextView) { navHistory = navHistory.slice(0, navIndex + 1); navHistory.push(nextView); navIndex = navHistory.length - 1; } }
    settings.lastView = view; persistSettings();
    $$('.nav-item[data-nav], .mobile-nav-item[data-nav]').forEach(button => button.classList.toggle('active', button.dataset.nav === (view === 'playlistDetail' ? 'playlists' : view)));
    renderPage(); renderSidebarPlaylists(); closeMobileSidebar();
    $('.page-content', document)?.scrollTo?.({ top:0, behavior:settings.reduceMotion ? 'auto' : 'smooth' });
  }
  function renderSidebarPlaylists() {
    const el = $('#sidebar-playlists');
    if (!state.playlists.length) { el.innerHTML = '<div class="sidebar-empty">Create your first playlist<br>and it will appear here.</div>'; return; }
    el.innerHTML = state.playlists.slice().sort((a,b) => b.updatedAt-a.updatedAt).slice(0,30).map(p => `<button class="sidebar-playlist ${activePlaylistId === p.id && currentView === 'playlistDetail' ? 'active' : ''}" data-action="open-playlist" data-playlist-id="${escapeAttr(p.id)}"><span class="sidebar-playlist-cover">${p.cover && safeUrl(p.cover) ? `<img src="${escapeAttr(safeUrl(p.cover))}" alt="">` : icon('playlist')}</span><span class="sidebar-playlist-title">${escapeHtml(p.name)}</span></button>`).join('');
  }
  function renderPage() {
    const el = $('#page-content'); if (!el) return;
    let html = '';
    if (currentView === 'home') html = renderHome();
    else if (currentView === 'search') html = renderSearch();
    else if (currentView === 'library') html = renderLibrary();
    else if (currentView === 'playlists') html = renderPlaylists();
    else if (currentView === 'playlistDetail') html = renderPlaylistDetail();
    else if (currentView === 'favorites') html = renderFavorites();
    else if (currentView === 'history') html = renderHistory();
    else if (currentView === 'settings') html = renderSettings();
    el.innerHTML = html;
    setDynamicIcons(el);
    updatePlayerVisuals();
  }
  function setDynamicIcons(root) { $$('[data-icon]', root).forEach(node => { node.innerHTML = icon(node.dataset.icon); }); }
  function renderHome() {
    const recent = state.history.slice().sort((a,b) => b.playedAt-a.playedAt).map(h => getSong(h.songId)).filter(Boolean).filter((s,i,a) => a.findIndex(x => x.id === s.id) === i).slice(0,6);
    const playlists = state.playlists.slice().sort((a,b) => b.updatedAt-a.updatedAt).slice(0,4);
    const recentLibrary = state.library.slice().sort((a,b) => b.importedAt-a.importedAt).slice(0,6);
    const quick = [
      { label:'Your Favorites', action:'navigate', view:'favorites', icon:'heart', cover: state.favorites.length ? getSong(state.favorites[0])?.cover : '' },
      { label:'Recently Played', action:'navigate', view:'history', icon:'history', cover: recent[0]?.cover },
      { label:'Your Library', action:'navigate', view:'library', icon:'library', cover: recentLibrary[0]?.cover },
      { label:'Your Playlists', action:'navigate', view:'playlists', icon:'playlist', cover: playlists[0]?.cover },
      { label:'Add YouTube Video', action:'import-youtube', icon:'youtube' },
      { label:'Import Local Music', action:'import-local', icon:'upload' },
    ];
    const quickHtml = quick.map(item => `<button class="quick-card" data-action="${item.action}" ${item.view ? `data-view="${item.view}"` : ''}><span class="quick-cover">${item.cover && safeUrl(item.cover) ? `<img src="${escapeAttr(safeUrl(item.cover))}" alt="">` : icon(item.icon)}</span><span class="quick-label">${escapeHtml(item.label)}</span><span class="quick-play">${icon(item.action === 'navigate' ? 'arrow-right' : 'plus')}</span></button>`).join('');
    const empty = state.library.length === 0;
    return `<div class="welcome-banner"><div class="welcome-copy"><div class="eyebrow">YOUR PERSONAL SOUNDTRACK</div><h1 class="welcome-title">${greetByTime()}, music lover<span style="color:var(--accent)">.</span></h1><p class="welcome-subtitle">Your music. Your mood. Your library.<br>Everything you add, kept right here on this device.</p><div class="welcome-actions"><button class="primary-button" data-action="import-local">${icon('upload')} Add your music</button><button class="secondary-button" data-action="import-youtube">${icon('youtube')} Add YouTube video</button></div></div><div class="welcome-art" aria-hidden="true"><div class="welcome-disc"></div><div class="welcome-disc-line"></div></div></div>
      <div class="section-block"><div class="section-head"><h2>Quick access</h2><span class="eyebrow">YOUR SPACE, ONE TAP AWAY</span></div><div class="quick-grid">${quickHtml}</div></div>
      ${empty ? `<div class="section-block"><div class="empty-state"><div class="empty-state-icon">${icon('disc')}</div><h3>Your library, your rules</h3><p>Bring in audio files you own or save a YouTube video reference. Then build playlists, mark favorites and line up your next listening session.</p><div class="empty-actions"><button class="primary-button" data-action="import-local">${icon('upload')} Import local music</button><button class="secondary-button" data-action="import-youtube">${icon('youtube')} Add YouTube video</button><button class="secondary-button" data-action="create-playlist">${icon('plus')} Create playlist</button></div></div></div>` : ''}
      ${recent.length ? `<div class="section-block"><div class="section-head"><h2>Pick up where you left off</h2><button class="section-link" data-nav="history">VIEW HISTORY ↗</button></div><div class="card-grid">${recent.map(song => renderSongCard(song)).join('')}</div></div>` : ''}
      ${playlists.length ? `<div class="section-block"><div class="section-head"><h2>Made by you</h2><button class="section-link" data-nav="playlists">ALL PLAYLISTS ↗</button></div><div class="card-grid">${playlists.map(p => renderPlaylistCard(p)).join('')}</div></div>` : ''}
      ${recentLibrary.length && !recent.length ? `<div class="section-block"><div class="section-head"><h2>Recently added</h2><button class="section-link" data-nav="library">OPEN LIBRARY ↗</button></div><div class="card-grid">${recentLibrary.map(song => renderSongCard(song)).join('')}</div></div>` : ''}
      <div class="app-footer"><span>VYBE · YOUR PERSONAL MUSIC SPACE</span><span>Private by design. Stored on this device.</span></div>`;
  }
  function renderSongCard(song) {
    return `<article class="music-card"><button class="card-art" style="border:0;padding:0;width:100%;" data-action="play-song" data-song-id="${escapeAttr(song.id)}" aria-label="Play ${escapeAttr(song.title)}">${song.cover && safeUrl(song.cover) ? `<img src="${escapeAttr(safeUrl(song.cover))}" alt="" loading="lazy">` : icon(song.kind === 'youtube' ? 'youtube' : 'music')}<span class="card-play">${icon('play')}</span></button><div class="card-title" title="${escapeAttr(song.title)}">${escapeHtml(song.title)}</div><div class="card-subtitle">${escapeHtml(song.artist || (song.kind === 'youtube' ? 'YouTube video' : 'Unknown artist'))}</div><div class="card-meta"><span>${song.kind === 'youtube' ? 'YOUTUBE' : formatDuration(song.duration)}</span><button class="card-more" data-action="song-menu" data-song-id="${escapeAttr(song.id)}" aria-label="More options">${icon('more')}</button></div></article>`;
  }
  function renderPlaylistCard(playlist) {
    const count = (playlist.songIds || []).length;
    return `<article class="music-card"><button class="card-art playlist-card-art" style="border:0;padding:0;width:100%;" data-action="open-playlist" data-playlist-id="${escapeAttr(playlist.id)}" aria-label="Open ${escapeAttr(playlist.name)}">${playlistCover(playlist).replace(/^<div class="card-art playlist-card-art">/,'').replace(/<\/div>$/,'')}<span class="card-play" data-action="play-playlist" data-playlist-id="${escapeAttr(playlist.id)}" role="button" tabindex="0" aria-label="Play playlist">${icon('play')}</span></button><div class="card-title" title="${escapeAttr(playlist.name)}">${escapeHtml(playlist.name)}</div><div class="card-subtitle">${count} ${count === 1 ? 'track' : 'tracks'}${playlist.description ? ` · ${escapeHtml(playlist.description)}` : ''}</div><div class="card-meta"><span>PLAYLIST</span><button class="card-more" data-action="playlist-menu" data-playlist-id="${escapeAttr(playlist.id)}" aria-label="Playlist options">${icon('more')}</button></div></article>`;
  }
  function tableRows(songs, options = {}) {
    const rowRemovable = !!options.removable; const parentPlaylistId = options.playlistId || '';
    if (!songs.length) return '';
    return songs.map((song, index) => `<tr class="song-row ${isCurrentSong(song.id) ? 'current' : ''}" data-song-id="${escapeAttr(song.id)}" ${parentPlaylistId ? `draggable="true" data-playlist-id="${escapeAttr(parentPlaylistId)}"` : ''}>
      <td><span class="row-number">${index+1}</span><button class="row-play" data-action="play-song" data-song-id="${escapeAttr(song.id)}" ${parentPlaylistId ? `data-playlist-id="${escapeAttr(parentPlaylistId)}"` : ''} aria-label="Play ${escapeAttr(song.title)}">${isCurrentSong(song.id) && isPlaying ? icon('pause') : icon('play')}</button></td>
      <td><div class="song-main">${songCover(song)}<div class="song-name-wrap"><span class="song-name">${escapeHtml(song.title)}</span><span class="song-artist">${escapeHtml(song.artist || (song.kind === 'youtube' ? 'YouTube video' : 'Unknown artist'))}</span></div></div></td>
      <td>${escapeHtml(song.album || (song.kind === 'youtube' ? 'YouTube' : 'Local file'))}</td><td>${formatDuration(song.duration)}</td>
      <td><div class="row-actions"><button class="row-action ${isFavorite(song.id) ? 'liked' : ''}" data-action="toggle-favorite" data-song-id="${escapeAttr(song.id)}" aria-label="${isFavorite(song.id) ? 'Remove from' : 'Add to'} favorites">${icon('heart')}</button><button class="row-action" data-action="song-menu" data-song-id="${escapeAttr(song.id)}" aria-label="More options">${icon('more')}</button>${rowRemovable ? `<button class="row-action" data-action="remove-from-playlist" data-song-id="${escapeAttr(song.id)}" data-playlist-id="${escapeAttr(parentPlaylistId)}" aria-label="Remove from playlist">${icon('close')}</button>` : ''}</div></td>
    </tr>`).join('');
  }
  function renderTable(songs, options = {}) {
    return `<div class="song-table-wrap"><table class="song-table"><thead><tr><th>#</th><th>TITLE</th><th>ALBUM / SOURCE</th><th>${icon('clock')}</th><th></th></tr></thead><tbody>${tableRows(songs, options)}</tbody></table></div>`;
  }
  function heading(title, subtitle, actions = '') {
    return `<div class="page-heading"><div><div class="eyebrow">YOUR MUSIC, ORGANIZED</div><h1>${title}</h1><p>${subtitle}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ''}</div>`;
  }
  function sortSongs(songs, sortBy = 'recent') {
    const list = [...songs];
    if (sortBy === 'title') return list.sort((a,b) => a.title.localeCompare(b.title));
    if (sortBy === 'artist') return list.sort((a,b) => (a.artist || '').localeCompare(b.artist || '') || a.title.localeCompare(b.title));
    if (sortBy === 'duration') return list.sort((a,b) => (a.duration || 0) - (b.duration || 0));
    return list.sort((a,b) => b.importedAt - a.importedAt);
  }
  function renderLibrary() {
    const sorted = sortSongs(state.library, settings.sortBy);
    const actions = `<button class="secondary-button" data-action="import-youtube">${icon('youtube')} Add YouTube</button><button class="primary-button" data-action="import-local">${icon('upload')} Import music</button>`;
    return `${heading('Your Library', `${state.library.length} ${state.library.length === 1 ? 'item' : 'items'} in your collection.`, actions)}
      ${state.library.length ? `<div class="list-toolbar"><div class="list-toolbar-left"><span class="badge">${icon('library')} ALL MUSIC</span><span class="filter-chip ${settings.defaultLibraryView === 'youtube' ? 'active' : ''}" data-action="library-filter" data-filter="youtube">${icon('youtube')} YouTube</span><span class="filter-chip ${settings.defaultLibraryView === 'local' ? 'active' : ''}" data-action="library-filter" data-filter="local">${icon('disc')} Local files</span></div><div class="list-toolbar-right"><select class="small-select" id="library-sort" aria-label="Sort library"><option value="recent" ${settings.sortBy==='recent'?'selected':''}>Recently added</option><option value="title" ${settings.sortBy==='title'?'selected':''}>Title A–Z</option><option value="artist" ${settings.sortBy==='artist'?'selected':''}>Artist A–Z</option><option value="duration" ${settings.sortBy==='duration'?'selected':''}>Shortest first</option></select><button class="icon-button tiny" data-action="export-library" title="Export library" aria-label="Export library">${icon('download')}</button></div></div>${renderTable(settings.defaultLibraryView === 'all' ? sorted : sorted.filter(s => s.kind === settings.defaultLibraryView))}` : emptyState('Your library is empty', 'Import local audio files or add a YouTube video reference to start building your personal collection.', 'import-local', 'Import local music', 'import-youtube', 'Add YouTube video')}
      <div class="app-footer"><span>YOUR LIBRARY</span><span>Local files are stored in this browser when supported.</span></div>`;
  }
  function renderPlaylists() {
    return `${heading('Your Playlists', 'Make a mix for every moment, mood or memory.', `<button class="primary-button" data-action="create-playlist">${icon('plus')} Create playlist</button>`)}
      ${state.playlists.length ? `<div class="card-grid">${state.playlists.slice().sort((a,b)=>b.updatedAt-a.updatedAt).map(renderPlaylistCard).join('')}</div>` : emptyState('Your first playlist is one click away', 'Collect your favorite tracks into a playlist you can play, edit and reorder any time.', 'create-playlist', 'Create playlist', 'import-local', 'Import music')}
      <div class="app-footer"><span>PLAYLISTS</span><span>Playlist edits save automatically.</span></div>`;
  }
  function renderPlaylistDetail() {
    const playlist = getPlaylist(activePlaylistId);
    if (!playlist) { currentView = 'playlists'; return renderPlaylists(); }
    const songs = playlist.songIds.map(getSong).filter(Boolean);
    let arranged = [...songs];
    if (currentPlaylistSort === 'title') arranged.sort((a,b)=>a.title.localeCompare(b.title));
    else if (currentPlaylistSort === 'artist') arranged.sort((a,b)=>(a.artist||'').localeCompare(b.artist||''));
    else if (currentPlaylistSort === 'recent') arranged.sort((a,b)=>b.importedAt-a.importedAt);
    const totalDuration = arranged.reduce((sum,s)=>sum+(s.duration||0),0);
    return `<div class="playlist-hero"><div class="playlist-hero-art">${playlist.cover && safeUrl(playlist.cover) ? `<img src="${escapeAttr(safeUrl(playlist.cover))}" alt="Playlist cover">` : icon('playlist')}</div><div class="playlist-hero-copy"><div class="eyebrow">PLAYLIST</div><h1>${escapeHtml(playlist.name)}</h1><p>${escapeHtml(playlist.description || 'A collection curated by you.')}</p><div class="playlist-hero-actions"><button class="primary-button" data-action="play-playlist" data-playlist-id="${escapeAttr(playlist.id)}" ${!songs.length?'disabled':''}>${icon('play')} Play playlist</button><button class="secondary-button" data-action="shuffle-playlist" data-playlist-id="${escapeAttr(playlist.id)}" ${!songs.length?'disabled':''}>${icon('shuffle')} Shuffle</button><button class="secondary-button" data-action="edit-playlist" data-playlist-id="${escapeAttr(playlist.id)}">${icon('edit')} Edit</button><button class="secondary-button" data-action="playlist-menu" data-playlist-id="${escapeAttr(playlist.id)}">${icon('more')} More</button></div><div class="playlist-hero-meta">${songs.length} ${songs.length === 1 ? 'track' : 'tracks'}${totalDuration ? ` · ${formatTime(totalDuration)}` : ''} · Updated ${timeAgo(playlist.updatedAt)}</div></div></div>
      <div class="detail-subhead"><h3>Tracks</h3><div class="sort-controls"><button class="${currentPlaylistSort==='custom'?'active':''}" data-action="playlist-sort" data-sort="custom">Custom order</button><button class="${currentPlaylistSort==='title'?'active':''}" data-action="playlist-sort" data-sort="title">Title</button><button class="${currentPlaylistSort==='artist'?'active':''}" data-action="playlist-sort" data-sort="artist">Artist</button><button class="${currentPlaylistSort==='recent'?'active':''}" data-action="playlist-sort" data-sort="recent">Recently added</button></div></div>
      ${songs.length ? renderTable(arranged, { removable:true, playlistId:playlist.id }) : emptyState('Nothing in this playlist yet', 'Add songs from your library using the three-dot menu, or import something new.', 'library', 'Browse your library', 'import-youtube', 'Add YouTube video')}
      <div class="app-footer"><span>${escapeHtml(playlist.name.toUpperCase())}</span><span>Drag to reorder, or use the move controls in the song menu.</span></div>`;
  }
  function emptyState(title, description, action1, label1, action2 = '', label2 = '') {
    return `<div class="empty-state"><div class="empty-state-icon">${icon(action1 === 'create-playlist' ? 'playlist' : action1 === 'library' ? 'library' : 'music')}</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p><div class="empty-actions"><button class="primary-button" data-action="${escapeAttr(action1)}">${icon(action1==='create-playlist'?'plus':action1==='import-local'?'upload':action1==='library'?'library':'music')} ${escapeHtml(label1)}</button>${action2 ? `<button class="secondary-button" data-action="${escapeAttr(action2)}">${icon(action2==='import-youtube'?'youtube':action2==='create-playlist'?'plus':'upload')} ${escapeHtml(label2)}</button>` : ''}</div></div>`;
  }
  function renderFavorites() {
    const songs = state.favorites.map(getSong).filter(Boolean);
    const actions = songs.length ? `<button class="primary-button" data-action="play-list-ids" data-ids="favorites">${icon('play')} Play all</button><button class="secondary-button" data-action="queue-list-ids" data-ids="favorites">${icon('list-music')} Add to queue</button>` : '';
    return `${heading('Favorites', 'All the tracks you have given a little heart.', actions)}${songs.length ? `<div class="list-toolbar"><div class="list-toolbar-left"><span class="badge">${icon('heart')} ${songs.length} LIKED ${songs.length === 1 ? 'TRACK' : 'TRACKS'}</span></div><div class="list-toolbar-right"><button class="secondary-button" data-action="shuffle-list-ids" data-ids="favorites">${icon('shuffle')} Shuffle</button></div></div>${renderTable(songs)}` : emptyState('Your favorites are waiting', 'Tap the heart on any track to keep it close. Your favorites live in this browser.', 'library', 'Explore your library', 'import-youtube', 'Add YouTube video')}`;
  }
  function renderHistory() {
    const history = state.history.slice().sort((a,b)=>b.playedAt-a.playedAt);
    const actions = history.length ? `<button class="secondary-button" data-action="clear-history">${icon('trash')} Clear history</button>` : '';
    const rows = history.map((h,i) => { const song = getSong(h.songId); return song ? `<div class="history-row song-row" style="display:flex;align-items:center;gap:12px;padding:9px 10px;border-radius:10px" data-song-id="${escapeAttr(song.id)}"><div style="color:#77778b;font-size:10px;min-width:20px">${i+1}</div>${songCover(song)}<div class="song-name-wrap" style="flex:1;min-width:0"><span class="song-name">${escapeHtml(song.title)}</span><span class="song-artist">${escapeHtml(song.artist || (song.kind==='youtube'?'YouTube video':'Unknown artist'))}</span></div><span style="font-size:10px;color:#77778b;white-space:nowrap">${timeAgo(h.playedAt)}</span><button class="row-action" data-action="play-song" data-song-id="${escapeAttr(song.id)}" aria-label="Play ${escapeAttr(song.title)}">${icon('play')}</button><button class="row-action" data-action="remove-history" data-history-index="${i}" data-history-time="${h.playedAt}" data-song-id="${escapeAttr(song.id)}" aria-label="Remove from history">${icon('close')}</button></div>` : ''; }).join('');
    return `${heading('Recently Played', 'A little trail of what you have been listening to.', actions)}${history.length ? `<div class="list-toolbar"><span class="badge">${icon('history')} LAST ${Math.min(history.length,100)} PLAYS</span></div><div class="search-list">${rows}</div>` : emptyState('Your listening story starts here', 'Tracks appear here after playback really starts. A paused track will not add another duplicate entry.', 'library', 'Browse library', 'import-local', 'Import music')}`;
  }
  function renderSearch() {
    const q = searchQuery.trim().toLocaleLowerCase();
    if (!q) return `${heading('Search', 'Find a song, artist, playlist or YouTube video.')}
      <div class="empty-state"><div class="empty-state-icon">${icon('search')}</div><h3>What sounds good?</h3><p>Type in the search field above. Your search stays inside your local library and saved playlist names.</p><div class="empty-actions"><button class="secondary-button" data-action="import-youtube">${icon('youtube')} Add YouTube video</button><button class="secondary-button" data-action="import-local">${icon('upload')} Import audio</button></div></div>`;
    const matches = state.library.filter(s => [s.title,s.artist,s.album,s.fileName,s.sourceUrl].some(v => String(v || '').toLocaleLowerCase().includes(q)));
    const playlistMatches = state.playlists.filter(p => `${p.name} ${p.description}`.toLocaleLowerCase().includes(q));
    const count = matches.length + playlistMatches.length;
    return `${heading(`Results for “${searchQuery.trim()}”`, `${count} ${count===1?'match':'matches'} in your library.`)}<div class="result-count">Only your saved music and playlists are searched. No external catalogue is queried.</div>
      ${playlistMatches.length ? `<div class="search-section"><h3 class="search-category-title">PLAYLISTS · ${playlistMatches.length}</h3><div class="card-grid">${playlistMatches.map(renderPlaylistCard).join('')}</div></div>` : ''}
      ${matches.length ? `<div class="search-section"><h3 class="search-category-title">TRACKS · ${matches.length}</h3>${renderTable(matches)}</div>` : ''}
      ${!count ? `<div class="empty-state"><div class="empty-state-icon">${icon('search')}</div><h3>No results found.</h3><p>Try a different spelling, search by artist, or add music from a local file or a YouTube link.</p><div class="empty-actions"><button class="primary-button" data-action="import-youtube">${icon('youtube')} Add YouTube video</button><button class="secondary-button" data-action="import-local">${icon('upload')} Import local music</button></div></div>` : ''}`;
  }
  function renderSettings() {
    const colors = ['#9875ff','#42c7a5','#ff729d','#ffb86b','#57a2ff','#e88aff'];
    const shortcuts = [['Play / pause','Space'],['Seek forward','→'],['Seek back','←'],['Volume up','↑'],['Volume down','↓'],['Next track','N'],['Previous track','P'],['Mute','M'],['Toggle favorite','F'],['Search','Ctrl / ⌘ K']];
    return `${heading('Settings', 'Make VYBE feel right for the way you listen.')}
      <div class="settings-layout">
        <section class="settings-card"><div class="settings-card-head"><span class="settings-icon">${icon('sparkles')}</span><div><h3>Appearance</h3><p>Your listening space, your style.</p></div></div>
          <div class="setting-row"><div class="setting-copy"><strong>Theme</strong><span>Choose how VYBE looks.</span></div><div class="setting-control"><select class="small-select" id="setting-theme"><option value="dark" ${settings.theme==='dark'?'selected':''}>Dark</option><option value="light" ${settings.theme==='light'?'selected':''}>Light (beta)</option></select></div></div>
          <div class="setting-row"><div class="setting-copy"><strong>Accent colour</strong><span>The main highlight colour used by controls.</span></div><div class="swatches">${colors.map(c => `<button class="swatch ${settings.accent===c?'active':''}" style="--swatch:${c}" data-action="set-accent" data-color="${c}" aria-label="Set accent colour ${c}" title="${c}"></button>`).join('')}</div></div>
          <div class="setting-row"><div class="setting-copy"><strong>Compact song lists</strong><span>Fit more tracks on the screen.</span></div><button class="toggle-switch" data-setting="compact" role="switch" aria-checked="${!!settings.compact}" aria-label="Compact song lists"></button></div>
          <div class="setting-row"><div class="setting-copy"><strong>Reduce motion</strong><span>Minimize transitions and animation.</span></div><button class="toggle-switch" data-setting="reduceMotion" role="switch" aria-checked="${!!settings.reduceMotion}" aria-label="Reduce motion"></button></div>
        </section>
        <section class="settings-card"><div class="settings-card-head"><span class="settings-icon">${icon('music')}</span><div><h3>Playback</h3><p>Control what happens when a track is played.</p></div></div>
          <div class="setting-row"><div class="setting-copy"><strong>Default volume</strong><span>New playback sessions start at this level.</span></div><div class="setting-control"><input id="setting-volume" type="range" min="0" max="100" value="${settings.volume}" aria-label="Default volume"><span id="setting-volume-label" style="font-size:10px;color:#9696a8;min-width:25px">${settings.volume}%</span></div></div>
          <div class="setting-row"><div class="setting-copy"><strong>Shuffle by default</strong><span>Pick the next track at random.</span></div><button class="toggle-switch" data-setting="shuffle" role="switch" aria-checked="${!!settings.shuffle}" aria-label="Shuffle by default"></button></div>
          <div class="setting-row"><div class="setting-copy"><strong>Repeat mode</strong><span>Off, repeat the queue, or repeat one track.</span></div><div class="setting-control"><select class="small-select" id="setting-repeat"><option value="off" ${settings.repeat==='off'?'selected':''}>Off</option><option value="all" ${settings.repeat==='all'?'selected':''}>Repeat queue</option><option value="one" ${settings.repeat==='one'?'selected':''}>Repeat one</option></select></div></div>
          <div class="setting-row"><div class="setting-copy"><strong>Continue with next track</strong><span>Automatically move to the next item when a track ends.</span></div><button class="toggle-switch" data-setting="autoPlay" role="switch" aria-checked="${!!settings.autoPlay}" aria-label="Continue with next track"></button></div>
          <div class="setting-row"><div class="setting-copy"><strong>Remember queue</strong><span>Keep your upcoming tracks after you reopen VYBE.</span></div><button class="toggle-switch" data-setting="rememberQueue" role="switch" aria-checked="${!!settings.rememberQueue}" aria-label="Remember queue"></button></div>
        </section>
        <section class="settings-card"><div class="settings-card-head"><span class="settings-icon">${icon('keyboard')}</span><div><h3>Keyboard shortcuts</h3><p>Shortcuts pause while you type into an input or text area.</p></div></div><div class="keyboard-list">${shortcuts.map(([label,key])=>`<div class="keyboard-item"><span>${label}</span><kbd>${key}</kbd></div>`).join('')}</div></section>
        <section class="settings-card"><div class="settings-card-head"><span class="settings-icon">${icon('library')}</span><div><h3>Library & privacy</h3><p>Manage your local music data and backups.</p></div></div>
          <div class="setting-row"><div class="setting-copy"><strong>Export library</strong><span>Download playlist metadata, favorites, history and settings as a JSON backup. Local audio file data is not included.</span></div><button class="secondary-button" data-action="export-library">${icon('download')} Export</button></div>
          <div class="setting-row"><div class="setting-copy"><strong>Import library backup</strong><span>Restore a JSON backup created by VYBE.</span></div><button class="secondary-button" data-action="import-library">${icon('upload')} Import</button></div>
          <div class="setting-row"><div class="setting-copy"><strong>Clear listening history</strong><span>Remove only your history entries.</span></div><button class="secondary-button" data-action="clear-history">Clear</button></div>
          <div class="setting-row"><div class="setting-copy"><strong>Delete local library</strong><span>Permanently remove playlists, songs, saved settings and imported local audio from this browser.</span></div><button class="danger-button" data-action="clear-library">${icon('trash')} Delete library</button></div>
          <div class="note-box" style="margin-top:14px"><strong>Privacy note:</strong> Your playlists and audio-file blobs are stored in this browser's IndexedDB. Basic preferences are stored in localStorage. YouTube playback and public thumbnails require an internet connection. Clearing this browser's site data can delete your library, so make a backup first.</div>
        </section>
        <section class="settings-card"><div class="settings-card-head"><span class="settings-icon">${icon('info')}</span><div><h3>About VYBE</h3><p>A local-first music player built for your library.</p></div></div>
          <div class="setting-row"><div class="setting-copy"><strong>Local audio</strong><span>Played by your browser's native audio engine. Supported formats depend on the browser.</span></div><span class="badge">ON DEVICE</span></div>
          <div class="setting-row"><div class="setting-copy"><strong>YouTube videos</strong><span>Played inside the official YouTube IFrame player. Some videos block embedding or background playback.</span></div><span class="badge">OFFICIAL PLAYER</span></div>
          <div class="setting-row"><div class="setting-copy"><strong>YouTube playlist import</strong><span>Importing every video from a playlist needs a configured YouTube Data API v3 key, which is not configured in this standalone project. Individual video links work without that key.</span></div><span class="badge">LIMITED</span></div>
          <div class="setting-row"><div class="setting-copy"><strong>Installable app</strong><span>On supported browsers, install VYBE from the browser menu when served on localhost or HTTPS.</span></div><button class="secondary-button" data-action="install-pwa" id="install-pwa-button">Install help</button></div>
        </section>
      </div><div class="app-footer"><span>VYBE VERSION 1.0</span><span>Made to keep your music in your hands.</span></div>`;
  }

  function renderPlayer() {
    const song = currentSong();
    const titleEl = $('#player-title'); const artistEl = $('#player-artist');
    titleEl.textContent = song?.title || 'Nothing playing';
    artistEl.textContent = song ? (song.artist || (song.kind === 'youtube' ? 'YouTube video' : 'Unknown artist')) : 'Your library is waiting';
    const coverEl = $('#player-cover');
    coverEl.innerHTML = song?.cover && safeUrl(song.cover) ? `<img src="${escapeAttr(safeUrl(song.cover))}" alt="">` : icon(song?.kind === 'youtube' ? 'youtube' : 'music');
    $('#player-heart').classList.toggle('liked', !!song && isFavorite(song.id));
    $('#now-playing-heart').classList.toggle('liked', !!song && isFavorite(song.id));
    $('#play-button').innerHTML = icon(isPlaying ? 'pause' : 'play');
    $('#play-button').setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    $('#shuffle-button').classList.toggle('active', !!settings.shuffle);
    $('#repeat-button').classList.toggle('active', settings.repeat !== 'off');
    const repeatIcon = $('#repeat-button'); repeatIcon?.setAttribute('title', `Repeat ${settings.repeat}`); repeatIcon?.setAttribute('aria-label', `Repeat mode: ${settings.repeat}`);
    $('#mute-button').innerHTML = icon(isMuted || Number(settings.volume) === 0 ? 'mute' : 'volume');
    $('#mute-button').classList.toggle('active', isMuted);
    if (song?.kind === 'youtube') {
      $('#now-playing-art').style.display = 'none'; $('#youtube-stage').classList.remove('is-hidden');
      $('#now-playing-details .now-playing-title').textContent = song.title;
      $('#now-playing-details .now-playing-artist').textContent = song.artist || 'YouTube video';
    } else {
      $('#now-playing-art').style.display = 'block'; $('#youtube-stage').classList.add('is-hidden');
      const art = $('#now-playing-art');
      if (song?.cover && safeUrl(song.cover)) art.innerHTML = `<img src="${escapeAttr(safeUrl(song.cover))}" alt="Album artwork" style="width:100%;height:100%;object-fit:cover">`;
      else art.innerHTML = `<div class="large-art-visual"><span class="art-orbit orbit-one"></span><span class="art-orbit orbit-two"></span><span class="art-note">${icon(song ? 'music' : 'disc')}</span><span class="art-caption">${song ? 'NOW PLAYING' : 'YOUR NEXT<br>FAVOURITE SONG'}</span></div>`;
      $('#now-playing-details .now-playing-title').textContent = song?.title || 'Nothing playing yet';
      $('#now-playing-details .now-playing-artist').textContent = song?.artist || (song ? 'Unknown artist' : 'Add a song to get started');
    }
    const compactViewport = window.matchMedia('(max-width:1000px)').matches;
    $('#right-panel').classList.toggle('mobile-youtube-open', compactViewport && song?.kind === 'youtube' && !youtubePanelManuallyClosed);
    $('#player-bar').classList.toggle('youtube-panel-hidden', compactViewport && song?.kind === 'youtube' && youtubePanelManuallyClosed);
    $('#player-bar').classList.toggle('youtube-track-active', song?.kind === 'youtube');
    renderRightQueue();
    updateTimeUI();
  }
  function updatePlayerVisuals() {
    const song = currentSong();
    $$('.song-row[data-song-id]').forEach(row => row.classList.toggle('current', row.dataset.songId === state.currentSongId));
    renderPlayer();
  }
  function renderRightQueue() {
    const el = $('#right-queue'); if (!el) return;
    const ids = state.queue.filter(id => getSong(id)).slice(0, 4);
    if (!ids.length) { el.innerHTML = '<div class="queue-empty">Your queue is empty.<br><span>Add a song to line it up.</span></div>'; return; }
    el.innerHTML = ids.map(id => { const song = getSong(id); return `<div class="queue-preview-item"><div class="queue-mini-cover">${song.cover && safeUrl(song.cover) ? `<img src="${escapeAttr(safeUrl(song.cover))}" alt="">` : icon(song.kind==='youtube'?'youtube':'music')}</div><div class="queue-preview-copy"><strong>${escapeHtml(song.title)}</strong><span>${escapeHtml(song.artist || (song.kind==='youtube'?'YouTube video':'Unknown artist'))}</span></div><button class="play-inline" data-action="play-queued-song" data-song-id="${escapeAttr(song.id)}" title="Play now" aria-label="Play now">${icon('play')}</button></div>`; }).join('');
  }
  function getCurrentTime() {
    const song = currentSong(); if (!song) return 0;
    if (song.kind === 'local') return Number(audio.currentTime) || 0;
    try { return youtubePlayer && youtubeReady ? youtubePlayer.getCurrentTime() || 0 : 0; } catch { return 0; }
  }
  function getDuration() {
    const song = currentSong(); if (!song) return 0;
    if (song.kind === 'local') return Number(audio.duration) || Number(song.duration) || 0;
    try { return youtubePlayer && youtubeReady ? youtubePlayer.getDuration() || Number(song.duration) || 0 : Number(song.duration) || 0; } catch { return Number(song.duration) || 0; }
  }
  function updateTimeUI() {
    const current = getCurrentTime(); const duration = getDuration();
    $('#current-time').textContent = formatTime(current); $('#duration-time').textContent = formatTime(duration);
    const max = Number($('#seek-range').max) || 1000;
    $('#seek-range').value = String(duration > 0 ? Math.min(max, Math.round(current / duration * max)) : 0);
    updateRangeFill($('#seek-range'));
    const expandedSeek = $('#expanded-seek-range');
    if (expandedSeek && document.activeElement !== expandedSeek) expandedSeek.value = String(duration > 0 ? Math.min(1000, Math.round(current / duration * 1000)) : 0);
    if ($('#expanded-current-time')) $('#expanded-current-time').textContent = formatTime(current);
    if ($('#expanded-duration-time')) $('#expanded-duration-time').textContent = formatTime(duration);
    if (expandedSeek) updateRangeFill(expandedSeek);
  }
  let lastPositionPersistAt = 0;
  function updateProgressLoop() {
    clearInterval(youtubePoller);
    youtubePoller = setInterval(() => {
      if (currentSong()?.kind === 'youtube' && youtubeReady && isPlaying) updateTimeUI();
      if (isPlaying && Date.now() - lastPositionPersistAt > 5000) { state.lastPosition = getCurrentTime(); lastPositionPersistAt = Date.now(); schedulePersist(); }
    }, 700);
  }
  async function ensureYoutubeApi() {
    if (window.YT?.Player) { youtubeReady = true; tryCreateYoutubePlayer(); return; }
    if (youtubeReady) return;
    if (youtubeApiLoading) return;
    youtubeApiLoading = true;
    window.onYouTubeIframeAPIReady = () => {
      youtubeReady = true; youtubeApiLoading = false;
      tryCreateYoutubePlayer();
    };
    const existing = $('script[data-youtube-api]');
    if (existing) return;
    const script = document.createElement('script'); script.src = 'https://www.youtube.com/iframe_api'; script.async = true; script.dataset.youtubeApi = 'true';
    script.onerror = () => { youtubeApiLoading = false; toast('The YouTube player could not load. Check your internet connection or try opening the video on YouTube.', 'error', 6500); };
    document.head.append(script);
  }
  function tryCreateYoutubePlayer() {
    if (!youtubeReady || youtubePlayer || !$('#youtube-player')) return;
    youtubePlayer = new YT.Player('youtube-player', {
      height: '200', width: '100%', videoId: pendingYoutubeId || undefined,
      playerVars: { playsinline: 1, rel: 0, enablejsapi: 1, origin: location.origin, modestbranding: 1 },
      events: {
        onReady: () => {
          try { youtubePlayer.setVolume(settings.volume); } catch {}
          if (pendingYoutubeId) { const id = pendingYoutubeId; pendingYoutubeId = null; try { youtubePlayer.loadVideoById(id); if (pendingPlayAfterReady) youtubePlayer.playVideo(); pendingPlayAfterReady = false; } catch {} }
          if (pendingSeek !== null) { try { youtubePlayer.seekTo(pendingSeek, true); } catch {} pendingSeek = null; }
        },
        onStateChange: event => {
          if (event.data === YT.PlayerState.PLAYING) {
            isPlaying = true; recordCurrentListen(); renderPlayer();
          } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.CUED) {
            isPlaying = false; renderPlayer();
          } else if (event.data === YT.PlayerState.ENDED) {
            isPlaying = false; onTrackEnded();
          }
        },
        onError: event => {
          isPlaying = false; renderPlayer();
          const explanation = ({2:'The video link is invalid.',5:'This video could not be played in the embedded player.',100:'This video is unavailable or has been removed.',101:'The owner does not allow this video to be embedded.',150:'The owner does not allow this video to be embedded.'})[event.data] || 'This video could not be played here.';
          toast(`${explanation} Try opening it on YouTube.`, 'error', 6500);
        }
      }
    });
  }
  async function playSong(songId, options = {}) {
    const song = getSong(songId);
    if (!song) { toast('That track is no longer in your library.', 'error'); return; }
    const oldId = state.currentSongId;
    if (!options.skipStack && oldId && oldId !== songId) { previousIds.push(oldId); if (previousIds.length > 80) previousIds.shift(); }
    if (!options.preserveQueue) { state.queue = []; repeatCollection = [songId]; }
    if (song.kind === 'local') {
      if (youtubePlayer && typeof youtubePlayer.stopVideo === 'function') { try { youtubePlayer.stopVideo(); } catch {} }
      audio.pause();
      let url = objectUrls.get(song.id);
      if (!url) {
        let blob = await getAudioBlob(song.id).catch(() => null);
        if (!blob || song.needsFile) {
          toast(`“${song.title}” needs its audio file. Please import the file again.`, 'warning', 6000); return;
        }
        url = URL.createObjectURL(blob); objectUrls.set(song.id, url);
      }
      state.currentSongId = song.id; state.lastPosition = 0; audio.src = url; audio.currentTime = 0;
      audio.volume = (settings.volume || 0) / 100; audio.muted = isMuted;
      renderPlayer(); schedulePersist();
      try { await audio.play(); isPlaying = true; renderPlayer(); } catch (error) { isPlaying = false; renderPlayer(); toast('Playback could not start. Try tapping play again or check the audio format.', 'warning', 5000); }
    } else {
      audio.pause(); audio.removeAttribute('src'); audio.load();
      state.currentSongId = song.id; state.lastPosition = 0; isPlaying = false; youtubePanelManuallyClosed = false;
      pendingYoutubeId = song.videoId; pendingPlayAfterReady = true;
      renderPlayer(); schedulePersist(); await ensureYoutubeApi();
      if (youtubePlayer && youtubeReady) { try { if (youtubePlayer.loadVideoById) youtubePlayer.loadVideoById(song.videoId); youtubePlayer.setVolume(isMuted ? 0 : Number(settings.volume)); youtubePlayer.playVideo(); } catch (error) { console.warn(error); } }
    }
    updatePlayerVisuals();
    updateMediaSession(song);
  }
  function pauseCurrent() {
    const song = currentSong(); if (!song) return;
    if (song.kind === 'local') audio.pause();
    else { try { youtubePlayer?.pauseVideo(); } catch {} isPlaying = false; renderPlayer(); }
    schedulePersist();
  }
  async function resumeCurrent() {
    const song = currentSong(); if (!song) { const first = state.library[0]; if (first) await playSong(first.id); else toast('Import a track or add a YouTube video first.', 'warning'); return; }
    if (song.kind === 'local') {
      if (!audio.src) { await playSong(song.id, {skipStack:true,preserveQueue:true}); return; }
      try { await audio.play(); isPlaying = true; renderPlayer(); } catch { toast('Playback was blocked. Press play once more.', 'warning'); }
    } else {
      await ensureYoutubeApi();
      if (youtubePlayer && youtubeReady) { try { youtubePlayer.playVideo(); } catch {} }
      else { pendingYoutubeId = song.videoId; pendingPlayAfterReady = true; }
    }
  }
  function togglePlayPause() { if (isPlaying) pauseCurrent(); else resumeCurrent(); }
  async function playCollection(ids, startId = null, shuffle = false) {
    let list = [...new Set(ids.filter(id => getSong(id)))];
    if (!list.length) { toast('There are no playable tracks in this list yet.', 'warning'); return; }
    if (shuffle || settings.shuffle) list = shuffleArray(list);
    const start = startId && list.includes(startId) ? startId : list[0];
    const startIndex = list.indexOf(start);
    repeatCollection = [...list];
    state.queue = list.slice(startIndex + 1);
    schedulePersist();
    await playSong(start, {skipStack:true, preserveQueue:true});
    renderPlayer();
  }
  function shuffleArray(input) { const result = [...input]; for (let i=result.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [result[i],result[j]]=[result[j],result[i]]; } return result; }
  async function playNext(manual = true) {
    const current = currentSong();
    if (manual && current && current.kind === 'local' && getCurrentTime() > 0) { state.lastPosition = getCurrentTime(); }
    if (settings.repeat === 'one' && !manual && current) { await playSong(current.id, {skipStack:true,preserveQueue:true}); return; }
    let id = null;
    if (state.queue.length) {
      const index = settings.shuffle ? Math.floor(Math.random()*state.queue.length) : 0;
      [id] = state.queue.splice(index,1);
    } else if (settings.repeat === 'all' && repeatCollection.length) {
      state.queue = repeatCollection.filter(x => x !== state.currentSongId);
      if (!state.queue.length && repeatCollection.length === 1) state.queue = [...repeatCollection];
      if (state.queue.length) { const index = settings.shuffle ? Math.floor(Math.random()*state.queue.length) : 0; [id] = state.queue.splice(index,1); }
    }
    if (id && getSong(id)) { schedulePersist(); await playSong(id, {skipStack:!manual,preserveQueue:true}); renderRightQueue(); return; }
    if (!manual && !settings.autoPlay) { stopPlayback(false); return; }
    if (current && settings.repeat === 'one') { await playSong(current.id, {skipStack:true,preserveQueue:true}); return; }
    if (manual) toast('There is no next track in the queue.', 'warning');
    stopPlayback(false);
  }
  async function playPrevious() {
    if (getCurrentTime() > 3) { seekTo(0); return; }
    const id = previousIds.pop();
    if (!id || !getSong(id)) { seekTo(0); return; }
    if (state.currentSongId && state.currentSongId !== id) state.queue.unshift(state.currentSongId);
    await playSong(id, {skipStack:true,preserveQueue:true});
  }
  function onTrackEnded() { playNext(false); }
  function stopPlayback(clearCurrent = true) {
    audio.pause(); audio.removeAttribute('src'); audio.load();
    try { youtubePlayer?.stopVideo(); } catch {}
    isPlaying = false;
    if (clearCurrent) { state.currentSongId = null; state.lastPosition = 0; }
    renderPlayer(); schedulePersist();
  }
  function seekTo(seconds) {
    const duration = getDuration(); const dest = Math.max(0, Math.min(Number(seconds) || 0, duration || Number(seconds) || 0));
    const song = currentSong(); if (!song) return;
    if (song.kind === 'local') { if (Number.isFinite(audio.duration)) audio.currentTime = dest; }
    else if (youtubePlayer && youtubeReady) { try { youtubePlayer.seekTo(dest, true); } catch {} }
    else pendingSeek = dest;
    state.lastPosition = dest; updateTimeUI(); schedulePersist();
  }
  function changeVolume(value) {
    const v = Math.max(0, Math.min(100, Number(value) || 0)); settings.volume = v; if (v > 0) previousVolume = v;
    audio.volume = v/100; audio.muted = isMuted;
    try { if (youtubePlayer && youtubeReady) youtubePlayer.setVolume(isMuted ? 0 : v); } catch {}
    $('#volume-range').value = String(v); updateRangeFill($('#volume-range')); $('#mute-button').innerHTML = icon(isMuted || v === 0 ? 'mute' : 'volume');
    persistSettings();
  }
  function toggleMute() {
    isMuted = !isMuted; audio.muted = isMuted;
    try { if (youtubePlayer && youtubeReady) youtubePlayer.setVolume(isMuted ? 0 : settings.volume); } catch {}
    $('#mute-button').classList.toggle('active', isMuted); $('#mute-button').innerHTML = icon(isMuted ? 'mute' : 'volume');
    toast(isMuted ? 'Muted' : 'Sound on', 'success', 1200);
  }
  function cycleRepeat() {
    const modes = ['off','all','one']; settings.repeat = modes[(modes.indexOf(settings.repeat)+1)%modes.length]; persistSettings(); applySettings(); renderPlayer();
    toast(settings.repeat === 'off' ? 'Repeat off' : settings.repeat === 'all' ? 'Repeating the queue' : 'Repeating this track', 'success', 1600);
  }
  function toggleShuffle() {
    settings.shuffle = !settings.shuffle;
    if (settings.shuffle && state.queue.length > 1) state.queue = shuffleArray(state.queue);
    persistSettings(); applySettings(); renderPlayer(); schedulePersist(); toast(settings.shuffle?'Shuffle on':'Shuffle off','success',1400);
  }
  function recordCurrentListen() {
    const id = state.currentSongId; if (!id) return;
    const latest = state.history[0];
    if (latest && latest.songId === id && Date.now() - latest.playedAt < 120_000) return;
    state.history.unshift({ songId:id, playedAt:Date.now() }); state.history = state.history.slice(0,1000);
    schedulePersist(); if (currentView === 'history' || currentView === 'home') renderPage();
  }
  function addToQueue(songId, position = 'end') {
    if (!getSong(songId)) return;
    state.queue = state.queue.filter(id => id !== songId);
    if (position === 'next') state.queue.unshift(songId); else state.queue.push(songId);
    schedulePersist(); renderRightQueue(); toast(position === 'next' ? 'Added to play next.' : 'Added to queue.', 'success', 1800);
  }
  function addListToQueue(ids) {
    const incoming = ids.filter(id => getSong(id) && id !== state.currentSongId && !state.queue.includes(id));
    state.queue.push(...incoming); schedulePersist(); renderPlayer(); toast(`${incoming.length} ${incoming.length===1?'track':'tracks'} added to queue.`, 'success');
  }
  function removeFromQueue(songId) {
    state.queue = state.queue.filter(id => id !== songId); schedulePersist(); renderPlayer();
  }
  function toggleFavorite(songId) {
    if (!getSong(songId)) return;
    if (isFavorite(songId)) state.favorites = state.favorites.filter(id => id !== songId); else state.favorites.unshift(songId);
    schedulePersist(); updatePlayerVisuals(); if (['favorites','search'].includes(currentView)) renderPage();
    toast(isFavorite(songId) ? 'Added to favorites.' : 'Removed from favorites.', 'success', 1500);
  }
  function removeSongFromLibrary(songId) {
    const song = getSong(songId); if (!song) return;
    state.library = state.library.filter(s => s.id !== songId); state.favorites = state.favorites.filter(id => id !== songId);
    state.playlists.forEach(p => p.songIds = p.songIds.filter(id => id !== songId)); state.queue = state.queue.filter(id => id !== songId); state.history = state.history.filter(h => h.songId !== songId);
    if (state.currentSongId === songId) stopPlayback(true);
    deleteAudioBlob(songId); schedulePersist(); renderPage(); renderSidebarPlaylists(); toast('Removed from your library. The original file on your device was not deleted.','success',2800);
  }
  function addSongToPlaylist(songId, playlistId) {
    const playlist = getPlaylist(playlistId); if (!playlist || !getSong(songId)) return;
    if (playlist.songIds.includes(songId)) { toast('That track is already in this playlist.', 'warning'); return; }
    playlist.songIds.push(songId); playlist.updatedAt = Date.now(); schedulePersist(); renderSidebarPlaylists(); if (currentView === 'playlistDetail' && activePlaylistId === playlistId) renderPage();
    toast(`Added to “${playlist.name}”.`);
  }
  function removeSongFromPlaylist(songId, playlistId) {
    const playlist = getPlaylist(playlistId); if (!playlist) return;
    playlist.songIds = playlist.songIds.filter(id => id !== songId); playlist.updatedAt = Date.now(); schedulePersist(); renderPage(); renderSidebarPlaylists();
    toast('Removed from playlist. The song stays in your library.');
  }
  function moveSongInPlaylist(songId, playlistId, direction) {
    const playlist = getPlaylist(playlistId); if (!playlist) return;
    const index = playlist.songIds.indexOf(songId); const newIndex = index + direction;
    if (index < 0 || newIndex < 0 || newIndex >= playlist.songIds.length) return;
    [playlist.songIds[index],playlist.songIds[newIndex]] = [playlist.songIds[newIndex],playlist.songIds[index]]; playlist.updatedAt = Date.now(); schedulePersist(); currentPlaylistSort = 'custom'; renderPage();
  }
  function showSongDetails(songId = state.currentSongId) {
    const song = getSong(songId); if (!song) { toast('No track selected yet.', 'warning'); return; }
    const playlists = state.playlists.filter(p => p.songIds.includes(song.id)).map(p=>p.name);
    showModal({ title:'Track details', description:'Information saved in your local library.', body:`<div class="modal-song-info">${songCover(song)}<div><strong>${escapeHtml(song.title)}</strong><span>${escapeHtml(song.artist || 'Unknown artist')}</span></div></div><div class="setting-row"><div class="setting-copy"><strong>Source</strong><span>${song.kind==='youtube'?'YouTube video reference':'Local audio file'}</span></div></div><div class="setting-row"><div class="setting-copy"><strong>Album</strong><span>${escapeHtml(song.album || 'Not provided')}</span></div></div><div class="setting-row"><div class="setting-copy"><strong>Duration</strong><span>${formatDuration(song.duration)}</span></div></div><div class="setting-row"><div class="setting-copy"><strong>Added</strong><span>${new Date(song.importedAt).toLocaleString()}</span></div></div><div class="setting-row"><div class="setting-copy"><strong>In playlists</strong><span>${escapeHtml(playlists.join(', ') || 'No playlist')}</span></div></div>${song.note?`<div class="setting-row"><div class="setting-copy"><strong>Your note</strong><span>${escapeHtml(song.note)}</span></div></div>`:''}${song.sourceUrl?`<div class="setting-row"><div class="setting-copy"><strong>Original link</strong><span style="word-break:break-all">${escapeHtml(song.sourceUrl)}</span></div></div>`:''}${song.kind==='local'&&song.needsFile?'<div class="form-error">The audio file itself is missing in this browser. Re-import it to play this track.</div>':''}`, footer:`<span class="modal-foot-left">Imported ${timeAgo(song.importedAt)}</span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Close</button><button class="secondary-button" data-action="edit-song" data-song-id="${escapeAttr(song.id)}">${icon('edit')} Edit info</button><button class="primary-button" data-action="play-song" data-song-id="${escapeAttr(song.id)}">${icon('play')} Play</button></div>` });
  }


  function openEditSong(songId) {
    const song=getSong(songId);if(!song)return;
    showModal({title:'Edit track info',description:'Correct the title or artist details stored in your library.',body:`<form id="edit-song-form"><div class="modal-song-info">${songCover(song)}<div><strong>${escapeHtml(song.title)}</strong><span>${song.kind==='youtube'?'YouTube reference':'Local audio file'}</span></div></div><div class="form-field"><label for="edit-song-title">Title *</label><input id="edit-song-title" maxlength="300" required value="${escapeAttr(song.title)}"></div><div class="form-field"><label for="edit-song-artist">Artist / channel</label><input id="edit-song-artist" maxlength="200" value="${escapeAttr(song.artist||'')}" placeholder="Unknown artist"></div><div class="form-field"><label for="edit-song-album">Album</label><input id="edit-song-album" maxlength="200" value="${escapeAttr(song.album||'')}" placeholder="Album title"></div><div class="form-field"><label for="edit-song-note">Your note</label><textarea id="edit-song-note" maxlength="300" placeholder="Optional note">${escapeHtml(song.note||'')}</textarea></div><div id="edit-song-error"></div></form>`,footer:`<span class="modal-foot-left">Editing does not change the original audio file or YouTube video.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><button class="primary-button" type="submit" form="edit-song-form">${icon('check')} Save details</button></div>`,onOpen:()=>$('#edit-song-form').addEventListener('submit',event=>{event.preventDefault();const title=$('#edit-song-title').value.trim();if(!title){$('#edit-song-error').innerHTML='<div class="form-error">A title is required.</div>';return;}song.title=title;song.artist=$('#edit-song-artist').value.trim();song.album=$('#edit-song-album').value.trim();song.note=$('#edit-song-note').value.trim();schedulePersist();closeModal();renderPage();renderSidebarPlaylists();renderPlayer();toast('Track details saved.');})});
  }

  function openCreatePlaylist(existingId = null) {
    const existing = existingId ? getPlaylist(existingId) : null;
    let coverData = existing?.cover || '';
    showModal({
      title: existing ? 'Edit playlist' : 'Create a playlist',
      description: existing ? 'Change the details of this mix.' : 'Give your next listening mood a name.',
      body: `<form id="playlist-form"><div class="form-field"><label for="playlist-name">Playlist name *</label><input id="playlist-name" name="name" maxlength="100" required placeholder="e.g. Late night focus" value="${escapeAttr(existing?.name || '')}"></div><div class="form-field"><label for="playlist-description">Description</label><textarea id="playlist-description" name="description" maxlength="600" placeholder="What is this playlist for?">${escapeHtml(existing?.description || '')}</textarea></div><div class="form-field"><label>Playlist cover</label><div class="cover-upload"><div class="cover-upload-preview" id="playlist-cover-preview">${coverData && safeUrl(coverData) ? `<img src="${escapeAttr(coverData)}" alt="Cover preview">` : icon('playlist')}</div><div><input type="file" id="playlist-cover-file" accept="image/png,image/jpeg,image/webp,image/gif" hidden><button type="button" class="secondary-button" id="choose-playlist-cover">${icon('upload')} Choose image</button><div class="form-help" style="margin-top:7px">PNG, JPG, WEBP or GIF. Max 2 MB.</div><button type="button" class="text-button" id="remove-playlist-cover">Remove cover</button></div></div></div><div id="playlist-form-error"></div><input type="hidden" id="playlist-edit-id" value="${escapeAttr(existing?.id || '')}"></form>`,
      footer: `<span class="modal-foot-left">${existing ? `${existing.songIds.length} tracks in this playlist` : 'You can add tracks after creating it.'}</span><div class="modal-foot-actions"><button class="secondary-button" type="button" data-action="close-modal">Cancel</button><button class="primary-button" type="submit" form="playlist-form">${icon(existing ? 'check' : 'plus')} ${existing ? 'Save changes' : 'Create playlist'}</button></div>`,
      onOpen: () => {
        const fileInput = $('#playlist-cover-file');
        $('#choose-playlist-cover').addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', async () => {
          const file = fileInput.files?.[0]; if (!file) return;
          if (!file.type.startsWith('image/')) { toast('Choose an image file.', 'warning'); return; }
          if (file.size > 2*1024*1024) { toast('Cover images must be 2 MB or smaller.', 'warning'); return; }
          coverData = await readDataUrl(file); $('#playlist-cover-preview').innerHTML = `<img src="${escapeAttr(coverData)}" alt="Cover preview">`;
        });
        $('#remove-playlist-cover').addEventListener('click', () => { coverData = ''; $('#playlist-cover-preview').innerHTML = icon('playlist'); });
        $('#playlist-form').addEventListener('submit', event => {
          event.preventDefault();
          const name = $('#playlist-name').value.trim(); const description = $('#playlist-description').value.trim();
          if (!name) { $('#playlist-form-error').innerHTML = '<div class="form-error">Please enter a playlist name.</div>'; return; }
          if (existing) { existing.name = name; existing.description = description; existing.cover = coverData; existing.updatedAt = Date.now(); }
          else { const playlist = { id:newId('playlist'), name, description, cover:coverData, color:'', createdAt:Date.now(), updatedAt:Date.now(), songIds:[] }; state.playlists.unshift(playlist); activePlaylistId = playlist.id; currentView = 'playlistDetail'; }
          schedulePersist(); closeModal(); renderSidebarPlaylists(); renderPage();
          if (existing) toast('Playlist updated.'); else toast(`“${name}” is ready for its first track.`);
        });
      }
    });
  }
  function readDataUrl(file) {
    return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result || '')); reader.onerror = () => reject(reader.error || new Error('Could not read image.')); reader.readAsDataURL(file); });
  }
  function openAddToPlaylist(songId) {
    const song = getSong(songId); if (!song) return;
    if (!state.playlists.length) {
      showModal({ title:'Create a playlist first', description:'There are no playlists to add this track to yet.', body:`<div class="modal-song-info">${songCover(song)}<div><strong>${escapeHtml(song.title)}</strong><span>${escapeHtml(song.artist || 'Unknown artist')}</span></div></div><p style="font-size:11px;color:#9393a5;line-height:1.6">Create a playlist and then add this track to it.</p>`, footer:`<span class="modal-foot-left"></span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><button class="primary-button" data-action="create-playlist">${icon('plus')} Create playlist</button></div>` });
      return;
    }
    showModal({ title:'Add to playlist', description:`Choose where “${song.title}” should go.`, body:`<div class="queue-modal-list">${state.playlists.map(p=>`<button class="queue-modal-row" style="width:100%;text-align:left;color:inherit;cursor:pointer" data-action="select-add-playlist" data-playlist-id="${escapeAttr(p.id)}" data-song-id="${escapeAttr(songId)}"><span class="sidebar-playlist-cover">${p.cover && safeUrl(p.cover)?`<img src="${escapeAttr(safeUrl(p.cover))}" alt="">`:icon('playlist')}</span><span class="queue-modal-title"><strong>${escapeHtml(p.name)}</strong><span>${p.songIds.length} ${p.songIds.length===1?'track':'tracks'}</span></span>${p.songIds.includes(songId)?'<span class="queue-current-label">ADDED</span>':icon('plus')}</button>`).join('')}</div>`, footer:`<span class="modal-foot-left">Changes save automatically.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><button class="secondary-button" data-action="create-playlist">${icon('plus')} New playlist</button></div>` });
  }
  function openYoutubeImport() {
    showModal({ title:'Add YouTube video', description:'Save a video reference to your library and play it with YouTube’s official embedded player.', body:`<form id="youtube-import-form"><div class="form-field"><label for="youtube-url">YouTube video link *</label><input id="youtube-url" type="url" required placeholder="https://www.youtube.com/watch?v=..." autocomplete="url"><div class="form-help">Supports youtube.com/watch, youtu.be, /shorts/ and /embed/ links. A video being saved here does not download its audio.</div></div><div class="form-field"><label for="youtube-title">Title <span style="color:#707084;font-weight:400">(optional)</span></label><input id="youtube-title" maxlength="300" placeholder="Auto-fill from public video info if available"></div><div class="form-field"><label for="youtube-artist">Channel / artist <span style="color:#707084;font-weight:400">(optional)</span></label><input id="youtube-artist" maxlength="200" placeholder="Channel name"></div><div class="form-field"><label for="youtube-description">Your note <span style="color:#707084;font-weight:400">(optional)</span></label><input id="youtube-description" maxlength="300" placeholder="Optional note for yourself"></div><div id="youtube-import-message"></div></form>`, footer:`<span class="modal-foot-left">Video metadata lookup is best-effort and may be blocked.</span><div class="modal-foot-actions"><button class="secondary-button" type="button" data-action="close-modal">Cancel</button><button class="primary-button" id="youtube-import-submit" type="submit" form="youtube-import-form">${icon('plus')} Import video</button></div>`, onOpen:()=>{
      $('#youtube-import-form').addEventListener('submit', async event => {
        event.preventDefault(); const submit = $('#youtube-import-submit'); submit.disabled = true; submit.textContent = 'Checking link…';
        const link = $('#youtube-url').value.trim(); const parsed = parseYouTubeLink(link); const message = $('#youtube-import-message');
        if (!parsed) { message.innerHTML = '<div class="form-error">That doesn’t look like a supported YouTube video link. Check the URL and try again.</div>'; submit.disabled = false; submit.innerHTML = `${icon('plus')} Import video`; return; }
        if (!parsed.videoId) { message.innerHTML = '<div class="form-error">This looks like a YouTube playlist link rather than a single video. Importing whole playlists requires a configured YouTube Data API v3 key; this project does not have one set up. Open a video link from the playlist to add it individually.</div>'; submit.disabled = false; submit.innerHTML = `${icon('plus')} Import video`; return; }
        const manuallyEnteredTitle = $('#youtube-title').value.trim(); const manuallyEnteredArtist = $('#youtube-artist').value.trim();
        let metadata = null;
        if (!manuallyEnteredTitle || !manuallyEnteredArtist) {
          message.innerHTML = '<div class="form-success">Checking public video details…</div>';
          try { metadata = await fetchYoutubeMetadata(parsed.videoId, link); } catch { /* metadata is optional */ }
        }
        const title = manuallyEnteredTitle || metadata?.title || `YouTube video ${parsed.videoId.slice(0,4)}…`;
        const artist = manuallyEnteredArtist || metadata?.author_name || 'YouTube';
        const duplicate = state.library.find(s => s.kind === 'youtube' && s.videoId === parsed.videoId);
        if (duplicate) { closeModal(); toast('That video is already in your library.', 'warning'); if (currentView !== 'library') setView('library'); return; }
        const song = { id:newId('song'), kind:'youtube', title, artist, album:'', cover:metadata?.thumbnail_url || `https://i.ytimg.com/vi/${parsed.videoId}/hqdefault.jpg`, duration:null, videoId:parsed.videoId, sourceUrl:`https://www.youtube.com/watch?v=${parsed.videoId}`, note:$('#youtube-description').value.trim(), importedAt:Date.now(), needsFile:false };
        state.library.unshift(song); schedulePersist(); closeModal(); renderPage(); renderSidebarPlaylists(); toast(`Added “${song.title}” to your library.`);
        if (!metadata && !manuallyEnteredTitle) toast('Video saved. Public title lookup was unavailable, so you can edit the title by removing and re-adding the link with a manual title.', 'warning', 6000);
      });
    } });
  }
  function parseYouTubeLink(raw) {
    try {
      const url = new URL(raw); const host = url.hostname.toLowerCase().replace(/^www\./,'').replace(/^m\./,'');
      if (!['youtube.com','youtu.be','youtube-nocookie.com','music.youtube.com'].includes(host)) return null;
      let id = '';
      if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] || '';
      else if (url.pathname === '/watch') id = url.searchParams.get('v') || '';
      else { const match = url.pathname.match(/^\/(?:shorts|embed|live|v)\/([A-Za-z0-9_-]{11})(?:\/|$)/); if (match) id = match[1]; }
      const valid = /^[A-Za-z0-9_-]{11}$/.test(id) ? id : '';
      return { videoId:valid, playlistId:url.searchParams.get('list') || '', host };
    } catch { return null; }
  }
  async function fetchYoutubeMetadata(videoId, url) {
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 3800);
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`, { signal:controller.signal, mode:'cors' });
      if (!response.ok) throw new Error('No public metadata found.');
      const data = await response.json();
      return { title:String(data.title || '').slice(0,300), author_name:String(data.author_name || '').slice(0,200), thumbnail_url:safeUrl(data.thumbnail_url || '') };
    } finally { clearTimeout(timeout); }
  }
  function openLocalImport() {
    showModal({ title:'Import local music', description:'Add audio files that you have access to. The files stay in this browser; nothing is uploaded.', body:`<div class="dropzone" id="audio-dropzone"><div class="dropzone-icon">${icon('upload')}</div><h3>Drop your music files here</h3><p>or choose files from this device.<br>MP3, WAV, OGG, FLAC, M4A/AAC and other browser-supported audio.</p><button class="primary-button" type="button" id="choose-audio-files">${icon('upload')} Choose audio files</button><input type="file" id="audio-file-input" accept="audio/*,.mp3,.wav,.ogg,.oga,.flac,.m4a,.aac,.opus" multiple><p class="form-help" style="margin-top:13px">A browser can play only formats it supports. Files are stored in this browser when storage limits permit.</p></div><div id="audio-import-status"></div>`, footer:`<span class="modal-foot-left">Nothing is uploaded to a server.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Close</button></div>`, onOpen:()=>{
      const input = $('#audio-file-input'); const drop = $('#audio-dropzone');
      $('#choose-audio-files').addEventListener('click',()=>input.click());
      input.addEventListener('change', async () => { const files=[...(input.files || [])]; input.value=''; if (files.length) await importLocalFiles(files); });
      ['dragenter','dragover'].forEach(type=>drop.addEventListener(type,event=>{event.preventDefault();drop.classList.add('dragover');}));
      ['dragleave','drop'].forEach(type=>drop.addEventListener(type,event=>{event.preventDefault();drop.classList.remove('dragover');}));
      drop.addEventListener('drop', async event=>{const files=[...(event.dataTransfer?.files||[])].filter(f=>f.type.startsWith('audio/') || /\.(mp3|wav|ogg|oga|flac|m4a|aac|opus)$/i.test(f.name));if(files.length)await importLocalFiles(files);else toast('Drop audio files, not folders or other file types.','warning');});
    } });
  }
  async function inspectAudioDuration(file) {
    return new Promise(resolve => {
      const url = URL.createObjectURL(file); const probe = new Audio(); let done = false;
      const finish = duration => { if (done) return; done = true; probe.src=''; URL.revokeObjectURL(url); resolve(Number.isFinite(duration)&&duration>0?duration:null); };
      probe.preload='metadata'; probe.onloadedmetadata=()=>finish(probe.duration); probe.onerror=()=>finish(null); probe.src=url;
      setTimeout(()=>finish(null),5000);
    });
  }
  async function importLocalFiles(files) {
    const status = $('#audio-import-status'); if (status) status.innerHTML = `<div class="form-success">Preparing ${files.length} ${files.length===1?'file':'files'}…</div>`;
    let added = 0, skipped = 0, failed = 0;
    for (const file of files) {
      if (file.size <= 0 || (!file.type.startsWith('audio/') && !/\.(mp3|wav|ogg|oga|flac|m4a|aac|opus)$/i.test(file.name))) { skipped++; continue; }
      const duplicate = state.library.find(s => s.kind==='local' && s.fileName===file.name && s.fileSize===file.size);
      if (duplicate) { skipped++; continue; }
      const songId = newId('song');
      const song = { id:songId, kind:'local', title:file.name.replace(/\.[^.]+$/,'').slice(0,300) || file.name, artist:'', album:'', cover:'', duration:await inspectAudioDuration(file), importedAt:Date.now(), fileName:file.name.slice(0,300), fileSize:file.size, needsFile:false };
      try { await putAudioBlob(songId, file); state.library.unshift(song); added++; }
      catch (error) { console.error(error); failed++; try { await deleteAudioBlob(songId); } catch {} }
    }
    schedulePersist();
    if (status) status.innerHTML = `<div class="${failed?'form-error':'form-success'}">${added} ${added===1?'track':'tracks'} imported${skipped?`, ${skipped} skipped (duplicates or unsupported files)`:''}${failed?`, ${failed} could not be stored`:''}. ${failed?'Your browser storage may be full.':''}</div><div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="primary-button" data-action="close-modal-and-library">Done · View library</button></div>`;
    if (added) { renderPage(); renderSidebarPlaylists(); toast(`Imported ${added} ${added===1?'track':'tracks'}.`); }
    if (!added && !failed) toast('No new audio files were imported. They may already be in your library.', 'warning');
  }
  function openQueueModal() {
    const makeQueueRows = () => {
      const current = currentSong();
      return `<div class="queue-modal-list">${current ? `<div class="queue-modal-row current"><span class="queue-index">▶</span>${songCover(current)}<span class="queue-modal-title"><strong>${escapeHtml(current.title)}</strong><span>Now playing · ${escapeHtml(current.artist || (current.kind==='youtube'?'YouTube video':'Unknown artist'))}</span></span><span class="queue-current-label">PLAYING</span></div>` : ''}${state.queue.map((id,i)=>{const song=getSong(id);return song?`<div class="queue-modal-row" draggable="true" data-queue-song-id="${escapeAttr(id)}"><span class="queue-index">${i+1}</span>${songCover(song)}<span class="queue-modal-title"><strong>${escapeHtml(song.title)}</strong><span>${escapeHtml(song.artist || (song.kind==='youtube'?'YouTube video':'Unknown artist'))}</span></span><div class="queue-modal-buttons"><button class="icon-button" data-action="queue-move" data-song-id="${escapeAttr(id)}" data-direction="-1" aria-label="Move up" title="Move up">${icon('arrow-up')}</button><button class="icon-button" data-action="queue-move" data-song-id="${escapeAttr(id)}" data-direction="1" aria-label="Move down" title="Move down">${icon('arrow-down')}</button><button class="icon-button" data-action="play-queued-song" data-song-id="${escapeAttr(id)}" aria-label="Play now" title="Play now">${icon('play')}</button><button class="icon-button" data-action="queue-remove" data-song-id="${escapeAttr(id)}" aria-label="Remove from queue" title="Remove">${icon('close')}</button></div></div>`:'';}).join('')}${!current&&!state.queue.length?'<div class="empty-state" style="min-height:135px"><div class="empty-state-icon">'+icon('list-music')+'</div><h3>Nothing queued up</h3><p>Add tracks from your library to line up what comes next.</p></div>':''}</div>`;
    };
    showModal({ title:'Queue', description:`${state.queue.length} ${state.queue.length===1?'track':'tracks'} coming up.`, body:makeQueueRows(), wide:true, footer:`<span class="modal-foot-left">Reorder with the arrows, or drag a track.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="clear-queue">Clear queue</button><button class="primary-button" data-action="close-modal">Done</button></div>`, onOpen:()=>{
      const list = $('#modal-root .queue-modal-list');
      list?.addEventListener('dragstart',event=>{const row=event.target.closest('[data-queue-song-id]');if(!row)return;activeDragSongId=row.dataset.queueSongId;event.dataTransfer?.setData('text/plain',activeDragSongId);});
      list?.addEventListener('dragover',event=>{if(event.target.closest('[data-queue-song-id]'))event.preventDefault();});
      list?.addEventListener('drop',event=>{const target=event.target.closest('[data-queue-song-id]');if(!target||!activeDragSongId)return;event.preventDefault();const from=state.queue.indexOf(activeDragSongId),to=state.queue.indexOf(target.dataset.queueSongId);if(from>=0&&to>=0&&from!==to){const [moved]=state.queue.splice(from,1);state.queue.splice(to,0,moved);schedulePersist();openQueueModal();}activeDragSongId=null;});
    } });
  }
  function moveQueueSong(id, direction) {
    const index=state.queue.indexOf(id);const next=index+direction;if(index<0||next<0||next>=state.queue.length)return;
    [state.queue[index],state.queue[next]]=[state.queue[next],state.queue[index]];schedulePersist();openQueueModal();renderRightQueue();
  }
  function openSleepTimer() {
    showModal({ title:'Sleep timer', description:'Let playback stop when it is time to rest.', body:`<div class="queue-modal-list">${[15,30,45,60].map(min=>`<button class="queue-modal-row" style="width:100%;color:inherit;text-align:left" data-action="set-sleep-timer" data-minutes="${min}"><span class="settings-icon">${icon('timer')}</span><span class="queue-modal-title"><strong>${min} minutes</strong><span>Stop playback after ${min} minutes</span></span>${icon('chevron-right')}</button>`).join('')}</div>${sleepTimerId?`<div class="form-success" style="margin-top:12px">A timer is active and will end in about ${Math.max(1,Math.ceil((sleepTimerEndsAt-Date.now())/60000))} minute(s).</div>`:''}`, footer:`<span class="modal-foot-left">Timer runs while this page is open.</span><div class="modal-foot-actions">${sleepTimerId?'<button class="danger-button" data-action="cancel-sleep-timer">Cancel timer</button>':''}<button class="secondary-button" data-action="close-modal">Close</button></div>` });
  }
  function setSleepTimer(minutes) {
    clearTimeout(sleepTimerId); sleepTimerEndsAt=Date.now()+minutes*60_000;
    sleepTimerId=setTimeout(()=>{sleepTimerId=null;sleepTimerEndsAt=0;stopPlayback(false);$('#timer-indicator')?.closest('button')?.classList.remove('timer-active');toast('Sleep timer finished. Playback stopped.','success',4000);},minutes*60_000);
    $('[data-action="sleep-timer"]')?.classList.add('timer-active');closeModal();toast(`Sleep timer set for ${minutes} minutes.`);schedulePersist();
  }
  function cancelSleepTimer() { clearTimeout(sleepTimerId);sleepTimerId=null;sleepTimerEndsAt=0;$('[data-action="sleep-timer"]')?.classList.remove('timer-active');closeModal();toast('Sleep timer cancelled.'); }
  function openExpandedPlayer() {
    const song=currentSong();
    showModal({ title:'Now playing', description:'Your full player view.', body:`<div class="expanded-player-layout"><div class="expanded-art">${song?.cover&&safeUrl(song.cover)?`<img src="${escapeAttr(safeUrl(song.cover))}" alt="">`:icon(song?.kind==='youtube'?'youtube':'music')}</div><div class="expanded-info"><div class="eyebrow">${song ? (song.kind==='youtube'?'YOUTUBE VIDEO':'LOCAL AUDIO') : 'READY WHEN YOU ARE'}</div><h2>${escapeHtml(song?.title||'Nothing playing')}</h2><p>${escapeHtml(song?.artist||(song?'Unknown artist':'Add a track to begin'))}</p><div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:16px"><button class="heart-button ${song&&isFavorite(song.id)?'liked':''}" data-action="toggle-current-favorite" aria-label="Toggle favorite">${icon('heart')}</button><button class="icon-button" data-action="song-details" aria-label="Track details">${icon('info')}</button></div><div class="expanded-controls"><button data-action="shuffle" aria-label="Shuffle">${icon('shuffle')}</button><button data-action="previous" aria-label="Previous">${icon('previous')}</button><button class="play-button" data-action="play-pause" aria-label="Play or pause">${icon(isPlaying?'pause':'play')}</button><button data-action="next" aria-label="Next">${icon('next')}</button><button data-action="stop" aria-label="Stop playback" title="Stop">${icon('close')}</button><button data-action="repeat" aria-label="Repeat">${icon('repeat')}</button></div><div class="expanded-seek"><span class="time-label" id="expanded-current-time">${formatTime(getCurrentTime())}</span><input type="range" class="seek-range" id="expanded-seek-range" min="0" max="1000" value="${getDuration()?Math.round(getCurrentTime()/getDuration()*1000):0}" aria-label="Seek position"><span class="time-label" id="expanded-duration-time">${formatTime(getDuration())}</span></div><div class="expanded-volume"><span>${icon('volume')}</span><label for="expanded-volume-range">Volume</label><input type="range" class="volume-range" id="expanded-volume-range" min="0" max="100" value="${settings.volume}" aria-label="Volume"><span id="expanded-volume-label">${settings.volume}%</span><button class="secondary-button" data-action="sleep-timer">${icon('timer')} Sleep timer</button></div>${song?.kind==='youtube'?`<div class="form-help" style="margin-top:16px">YouTube controls and restrictions are provided by the official embedded player on the right side of the app.</div>`:''}</div></div>`, wide:true, footer:`<span class="modal-foot-left">Keyboard shortcuts work outside text fields.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="open-queue">${icon('list-music')} Queue</button><button class="primary-button" data-action="close-modal">Done</button></div>`, onOpen:()=>{
      $('#expanded-seek-range').addEventListener('input',()=>{const duration=getDuration();$('#expanded-current-time').textContent=formatTime(duration*(Number($('#expanded-seek-range').value)/1000));updateRangeFill($('#expanded-seek-range'));});
      $('#expanded-seek-range').addEventListener('change',()=>seekTo(getDuration()*(Number($('#expanded-seek-range').value)/1000)));
      $('#expanded-volume-range').addEventListener('input',event=>{changeVolume(event.target.value);$('#expanded-volume-label').textContent=`${event.target.value}%`;});
      updateRangeFill($('#expanded-seek-range'));updateRangeFill($('#expanded-volume-range'));
    } });
  }
  function openImportLibrary() {
    showModal({ title:'Import library backup', description:'Restore a JSON backup exported from VYBE. Imported items are merged with your current library.', body:`<div class="dropzone" id="backup-dropzone"><div class="dropzone-icon">${icon('upload')}</div><h3>Choose your backup file</h3><p>Use a .json file exported by VYBE. The file is checked before any data is changed.</p><button class="primary-button" type="button" id="choose-backup-file">${icon('upload')} Choose JSON backup</button><input type="file" id="backup-file" accept="application/json,.json" hidden></div><div id="backup-status"></div><div class="note-box" style="margin-top:14px">Local audio files are not included in JSON backups, so tracks restored from a backup may need their original files imported again.</div>`, footer:`<span class="modal-foot-left">This cannot restore browser-stored audio blobs.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Cancel</button></div>`, onOpen:()=>{
      const input=$('#backup-file');$('#choose-backup-file').addEventListener('click',()=>input.click());
      input.addEventListener('change',async()=>{const file=input.files?.[0];if(!file)return;const status=$('#backup-status');try{if(file.size>15*1024*1024)throw new Error('The backup is larger than 15 MB.');const json=JSON.parse(await file.text());if(!json||json.app!=='VYBE' || !json.data || !Array.isArray(json.data.library)||!Array.isArray(json.data.playlists))throw new Error('This does not look like a valid VYBE backup.');const incoming=normalizeState(json.data);let addCount=0;const existingIds=new Set(state.library.map(s=>s.id));for(const song of incoming.library){if(existingIds.has(song.id))continue;if(song.kind==='local')song.needsFile=true;state.library.push(song);addCount++;}const playlistIds=new Set(state.playlists.map(p=>p.id));for(const p of incoming.playlists){if(playlistIds.has(p.id)){const existing= getPlaylist(p.id);if(existing){existing.name=p.name;existing.description=p.description;existing.cover=p.cover;existing.songIds=[...new Set([...existing.songIds,...p.songIds.filter(id=>getSong(id)||incoming.library.some(s=>s.id===id))])];}}else state.playlists.push(p);}state.favorites=[...new Set([...state.favorites,...incoming.favorites])];state.history=[...incoming.history,...state.history].slice(0,1000);state.queue=settings.rememberQueue?[...state.queue,...incoming.queue.filter(id=>getSong(id))]:state.queue;const incomingSettings=json.settings&&typeof json.settings==='object'?json.settings:{};settings={...settings,theme:['dark','light'].includes(incomingSettings.theme)?incomingSettings.theme:settings.theme,accent:['#9875ff','#42c7a5','#ff729d','#ffb86b','#57a2ff','#e88aff'].includes(incomingSettings.accent)?incomingSettings.accent:settings.accent,compact:!!incomingSettings.compact,reduceMotion:!!incomingSettings.reduceMotion,volume:Math.max(0,Math.min(100,Number(incomingSettings.volume)||0)),shuffle:!!incomingSettings.shuffle,repeat:['off','all','one'].includes(incomingSettings.repeat)?incomingSettings.repeat:settings.repeat,autoPlay:incomingSettings.autoPlay!==false,rememberQueue:incomingSettings.rememberQueue!==false};applySettings();schedulePersist();status.innerHTML=`<div class="form-success">Backup restored. Added ${addCount} new track metadata entries. Existing audio files were not changed.</div><div style="display:flex;justify-content:flex-end;margin-top:10px"><button class="primary-button" data-action="close-modal-and-library">Done · View library</button></div>`;renderSidebarPlaylists();renderPage();}catch(error){status.innerHTML=`<div class="form-error">${escapeHtml(error.message||'The backup could not be read.')}</div>`;} });
    } });
  }
  function exportLibrary() {
    const exportState = structuredCloneSafe(state);
    exportState.library = exportState.library.map(song => song.kind === 'local' ? { ...song, needsFile:true } : song);
    const payload = { app:'VYBE', version:1, exportedAt:new Date().toISOString(), note:'Local audio file blobs are not included in this JSON backup.', data:exportState, settings:settings };
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`vybe-library-${new Date().toISOString().slice(0,10)}.json`;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);toast('Library backup exported. Local audio file data is not included.','success',4500);
  }
  function confirmClearHistory() {
    if (!state.history.length) { toast('Your listening history is already empty.', 'warning'); return; }
    showModal({ title:'Clear listening history?', description:'This removes history entries only. Your library, playlists and favorites will stay untouched.', body:'<p style="font-size:12px;line-height:1.7;color:#a1a1b2">This action cannot be undone unless you have a recent JSON backup.</p>', footer:`<span class="modal-foot-left">${state.history.length} entries will be removed.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Keep history</button><button class="danger-button" data-action="confirm-clear-history">${icon('trash')} Clear history</button></div>` });
  }
  function confirmClearLibrary() {
    showModal({ title:'Delete your local library?', description:'This permanently removes VYBE data stored in this browser.', body:`<div class="form-error">This deletes ${state.library.length} track entries, ${state.playlists.length} playlists, favorites, history and imported local audio blobs. Original files on your device will not be deleted. Export a backup first if you may want to restore your data.</div><div class="form-field"><label for="delete-confirm-text">Type DELETE to confirm</label><input id="delete-confirm-text" autocomplete="off" placeholder="DELETE"></div>`, footer:`<span class="modal-foot-left">This action cannot be undone.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><button class="danger-button" data-action="confirm-clear-library" disabled id="confirm-delete-library">${icon('trash')} Delete everything</button></div>`, onOpen:()=>$('#delete-confirm-text').addEventListener('input',()=>$('#confirm-delete-library').disabled=$('#delete-confirm-text').value.trim()!=='DELETE') });
  }
  async function doClearLibrary() {
    clearTimeout(saveTimer); audio.pause(); audio.removeAttribute('src'); audio.load(); try{youtubePlayer?.stopVideo();}catch{};
    const ids=state.library.filter(s=>s.kind==='local').map(s=>s.id);await Promise.all(ids.map(deleteAudioBlob));
    state=structuredCloneSafe(defaultState);settings={...defaultSettings};currentView='home';activePlaylistId=null;repeatCollection=[];previousIds=[];isPlaying=false;isMuted=false;
    persistSettings();applySettings();await saveNow();closeModal();renderSidebarPlaylists();setView('home');toast('Your local library has been cleared.');
  }
  function openDeletePlaylist(playlistId) {
    const playlist=getPlaylist(playlistId);if(!playlist)return;
    showModal({ title:`Delete “${playlist.name}”?`, description:'The playlist will be removed, but the tracks themselves will remain in your library.', body:`<p style="font-size:12px;line-height:1.7;color:#a3a3b3">This playlist contains ${playlist.songIds.length} ${playlist.songIds.length===1?'track':'tracks'}. Deleting it will not delete any original files, saved YouTube references or other playlists.</p>`, footer:`<span class="modal-foot-left">This action cannot be undone.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Keep playlist</button><button class="danger-button" data-action="confirm-delete-playlist" data-playlist-id="${escapeAttr(playlistId)}">${icon('trash')} Delete playlist</button></div>` });
  }
  function deletePlaylist(playlistId) {
    state.playlists=state.playlists.filter(p=>p.id!==playlistId);if(activePlaylistId===playlistId){activePlaylistId=null;currentView='playlists';}schedulePersist();closeModal();renderSidebarPlaylists();renderPage();toast('Playlist deleted. Your tracks are still in the library.');
  }
  function confirmOpenYoutubeOnSite(songId) {
    const song=getSong(songId);if(!song||!song.videoId)return;
    window.open(`https://www.youtube.com/watch?v=${encodeURIComponent(song.videoId)}`,'_blank','noopener,noreferrer');
  }
  function handleMenuAction(action, songId, playlistId) {
    const song=getSong(songId); const playlist=getPlaylist(playlistId);
    if (action==='play') { if(playlistId){playCollection(playlist?.songIds||[],songId);}else playSong(songId); }
    else if (action==='play-next') addToQueue(songId,'next');
    else if (action==='queue') addToQueue(songId,'end');
    else if (action==='add-playlist') openAddToPlaylist(songId);
    else if (action==='favorite') toggleFavorite(songId);
    else if (action==='details') showSongDetails(songId);
    else if (action==='edit-song') openEditSong(songId);
    else if (action==='open-youtube') confirmOpenYoutubeOnSite(songId);
    else if (action==='remove-library') confirmRemoveSong(songId);
    else if (action==='move-playlist-song-up') moveSongInPlaylist(songId,playlistId,-1);
    else if (action==='move-playlist-song-down') moveSongInPlaylist(songId,playlistId,1);
    else if (action==='playlist-edit') openCreatePlaylist(playlistId);
    else if (action==='playlist-play') playCollection(playlist?.songIds || []);
    else if (action==='playlist-shuffle') playCollection(playlist?.songIds || [], null, true);
    else if (action==='playlist-queue') addListToQueue(playlist?.songIds || []);
    else if (action==='playlist-delete') openDeletePlaylist(playlistId);
    else if (action==='playlist-open') { activePlaylistId=playlistId;setView('playlistDetail'); }
  }
  function confirmRemoveSong(songId) {
    const song=getSong(songId);if(!song)return;
    showModal({ title:'Remove from your library?', description:`“${song.title}” will be removed from VYBE.`, body:`<p style="font-size:12px;line-height:1.7;color:#a3a3b3">This also removes it from playlists, favorites, the queue and listening history. ${song.kind==='local'?'The audio blob stored inside VYBE will be deleted, but the original file on your device will not be touched.':'The YouTube video itself will not be deleted.'}</p>`, footer:`<span class="modal-foot-left">This cannot be undone unless you have a backup.</span><div class="modal-foot-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><button class="danger-button" data-action="confirm-remove-song" data-song-id="${escapeAttr(songId)}">${icon('trash')} Remove track</button></div>` });
  }
  function showSongMenu(anchor, songId, playlistId = '') {
    const song=getSong(songId);if(!song)return;
    const items=[{action:'play',label:'Play now',icon:'play'},{action:'play-next',label:'Play next',icon:'next'},{action:'queue',label:'Add to queue',icon:'list-music'},{separator:true}];
    if(playlistId){items.push({action:'move-playlist-song-up',label:'Move up in playlist',icon:'arrow-up',playlistId},{action:'move-playlist-song-down',label:'Move down in playlist',icon:'arrow-down',playlistId},{separator:true});}
    items.push({action:'add-playlist',label:'Add to playlist…',icon:'playlist'},{action:'favorite',label:isFavorite(songId)?'Remove from favorites':'Add to favorites',icon:'heart'},{action:'edit-song',label:'Edit track info',icon:'edit'},{action:'details',label:'View details',icon:'info'});
    if(song.kind==='youtube')items.push({action:'open-youtube',label:'Open on YouTube',icon:'external'});
    items.push({separator:true},{action:'remove-library',label:'Remove from library',icon:'trash',danger:true});
    openContextMenu(anchor,items.map(i=>({...i,songId})));
  }
  function showPlaylistMenu(anchor, playlistId) {
    const playlist=getPlaylist(playlistId);if(!playlist)return;
    openContextMenu(anchor,[{action:'playlist-open',label:'Open playlist',icon:'playlist',playlistId},{action:'playlist-play',label:'Play playlist',icon:'play',playlistId},{action:'playlist-shuffle',label:'Shuffle playlist',icon:'shuffle',playlistId},{action:'playlist-queue',label:'Add all to queue',icon:'list-music',playlistId},{separator:true},{action:'playlist-edit',label:'Edit playlist',icon:'edit',playlistId},{action:'playlist-delete',label:'Delete playlist',icon:'trash',playlistId,danger:true}]);
  }
  function updateMediaSession(song) {
    if (!('mediaSession' in navigator) || !song) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({ title:song.title, artist:song.artist||'Unknown artist', album:song.album||'', artwork:song.cover&&safeUrl(song.cover)?[{src:safeUrl(song.cover)}]:[] });
      navigator.mediaSession.setActionHandler('play',()=>resumeCurrent());navigator.mediaSession.setActionHandler('pause',()=>pauseCurrent());navigator.mediaSession.setActionHandler('previoustrack',()=>playPrevious());navigator.mediaSession.setActionHandler('nexttrack',()=>playNext(true));
      navigator.mediaSession.setActionHandler('seekto',details=>{if(Number.isFinite(details.seekTime))seekTo(details.seekTime);});
    } catch(error) { console.debug('Media Session is not fully supported in this browser.',error); }
  }
  function handleMenuClick(actionEl) {
    const action=actionEl.dataset.action;const songId=actionEl.dataset.songId;const playlistId=actionEl.dataset.playlistId || actionEl.closest('tr[data-playlist-id]')?.dataset.playlistId || '';
    switch(action) {
      case 'close-modal': closeModal(); break;
      case 'create-playlist': closeModal(); openCreatePlaylist(); break;
      case 'import-local': openLocalImport(); break;
      case 'import-youtube': openYoutubeImport(); break;
      case 'play-song': { if(playlistId && currentView==='playlistDetail'){const p=getPlaylist(playlistId);playCollection(p?.songIds||[],songId);}else playSong(songId); break;}
      case 'play-queued-song': state.queue=state.queue.filter(id=>id!==songId);schedulePersist();playSong(songId,{preserveQueue:true});break;
      case 'play-pause': togglePlayPause(); break;
      case 'previous': playPrevious(); break;
      case 'next': playNext(true); break;
      case 'stop': stopPlayback(true); break;
      case 'shuffle': toggleShuffle(); break;
      case 'repeat': cycleRepeat(); break;
      case 'mute': toggleMute(); break;
      case 'open-queue': openQueueModal(); break;
      case 'sleep-timer': openSleepTimer(); break;
      case 'expand-player': openExpandedPlayer(); break;
      case 'toggle-favorite': toggleFavorite(songId); break;
      case 'toggle-current-favorite': if(state.currentSongId)toggleFavorite(state.currentSongId);else toast('Start a track before adding it to favorites.','warning'); break;
      case 'song-menu': showSongMenu(actionEl,songId,playlistId); break;
      case 'song-details': showSongDetails(); break;
      case 'edit-song': openEditSong(songId || state.currentSongId); break;
      case 'close-youtube-panel': youtubePanelManuallyClosed=true;renderPlayer();break;
      case 'show-youtube-panel': youtubePanelManuallyClosed=false;renderPlayer();break;
      case 'playlist-menu': showPlaylistMenu(actionEl,playlistId); break;
      case 'open-playlist': activePlaylistId=playlistId;setView('playlistDetail'); break;
      case 'edit-playlist': openCreatePlaylist(playlistId); break;
      case 'delete-playlist': openDeletePlaylist(playlistId); break;
      case 'confirm-delete-playlist': deletePlaylist(playlistId); break;
      case 'play-playlist': {const p=getPlaylist(playlistId);playCollection(p?.songIds||[]);break;}
      case 'shuffle-playlist': {const p=getPlaylist(playlistId);playCollection(p?.songIds||[],null,true);break;}
      case 'playlist-sort': currentPlaylistSort=actionEl.dataset.sort||'custom';renderPage();break;
      case 'remove-from-playlist': removeSongFromPlaylist(songId,playlistId);break;
      case 'move-playlist-song-up': moveSongInPlaylist(songId,playlistId,-1);break;
      case 'move-playlist-song-down': moveSongInPlaylist(songId,playlistId,1);break;
      case 'select-add-playlist': addSongToPlaylist(songId,playlistId);closeModal();break;
      case 'remove-from-library': confirmRemoveSong(songId);break;
      case 'confirm-remove-song': removeSongFromLibrary(songId);closeModal();break;
      case 'play-list-ids': playCollection(resolveListIds(actionEl.dataset.ids));break;
      case 'shuffle-list-ids': playCollection(resolveListIds(actionEl.dataset.ids),null,true);break;
      case 'queue-list-ids': addListToQueue(resolveListIds(actionEl.dataset.ids));break;
      case 'library-filter': settings.defaultLibraryView=settings.defaultLibraryView===actionEl.dataset.filter?'all':actionEl.dataset.filter;persistSettings();renderPage();break;
      case 'export-library': exportLibrary();break;
      case 'import-library': openImportLibrary();break;
      case 'clear-history': confirmClearHistory();break;
      case 'confirm-clear-history': state.history=[];schedulePersist();closeModal();renderPage();toast('Listening history cleared.');break;
      case 'remove-history': {const t=Number(actionEl.dataset.historyTime);state.history=state.history.filter(h=>!(h.songId===songId&&h.playedAt===t));schedulePersist();renderPage();break;}
      case 'clear-library': confirmClearLibrary();break;
      case 'confirm-clear-library': if($('#delete-confirm-text')?.value.trim()==='DELETE')doClearLibrary();break;
      case 'clear-queue': state.queue=[];schedulePersist();renderPlayer();openQueueModal();toast('Queue cleared.');break;
      case 'queue-remove': removeFromQueue(songId);openQueueModal();break;
      case 'queue-move': moveQueueSong(songId,Number(actionEl.dataset.direction)||0);break;
      case 'set-sleep-timer': setSleepTimer(Number(actionEl.dataset.minutes)||15);break;
      case 'cancel-sleep-timer': cancelSleepTimer();break;
      case 'close-modal-and-library': closeModal();setView('library');break;
      case 'set-accent': settings.accent=actionEl.dataset.color;persistSettings();applySettings();renderPage();break;
      case 'install-pwa': showModal({title:'Install VYBE',description:'Add the music player to your device for a more app-like experience.',body:`<p style="font-size:11px;line-height:1.7;color:#a5a5b5">Serve the project from <strong>localhost</strong> or HTTPS. In Chrome or Edge, use the Install icon in the address bar or open the browser menu and choose <strong>Install VYBE</strong>. On iPhone, open the site in Safari, tap Share, then choose <strong>Add to Home Screen</strong>. A PWA still needs internet for YouTube videos and may have mobile background-playback limits.</p>`,footer:`<span class="modal-foot-left">Offline caching covers the app shell, not YouTube videos.</span><div class="modal-foot-actions"><button class="primary-button" data-action="close-modal">Got it</button></div>`});break;
      case 'navigate': setView(actionEl.dataset.view); break;
      case 'nav-back': if(navIndex>0){navIndex--;setView(navHistory[navIndex],false)}break;
      case 'nav-forward': if(navIndex<navHistory.length-1){navIndex++;setView(navHistory[navIndex],false)}break;
      case 'clear-search': searchQuery='';$('#global-search').value='';$('#global-search').closest('.global-search-wrap').classList.remove('has-value');setView('search');break;
      default: if(['home','search','library','playlists','favorites','history','settings'].includes(action)) setView(action); break;
    }
  }
  function resolveListIds(name) {
    if(name==='favorites')return state.favorites;
    if(name==='library')return state.library.map(s=>s.id);
    if(name==='recent')return state.history.map(h=>h.songId);
    if(name?.startsWith('playlist:'))return getPlaylist(name.slice(9))?.songIds||[];
    return [];
  }

  function closeMobileSidebar() { $('#sidebar').classList.remove('mobile-open'); $('#mobile-overlay').classList.remove('visible'); }
  function openMobileSidebar() { $('#sidebar').classList.add('mobile-open'); $('#mobile-overlay').classList.add('visible'); }
  function onSearchInput(event) {
    searchQuery=event.target.value;event.target.closest('.global-search-wrap').classList.toggle('has-value',!!searchQuery);
    if(searchQuery.trim()) { if(currentView!=='search')setView('search');else renderPage(); }
    else if(currentView==='search') renderPage();
  }
  function handleGlobalClick(event) {
    const nav=event.target.closest('[data-nav]');
    if(nav) { event.preventDefault(); setView(nav.dataset.nav); return; }
    const actionEl=event.target.closest('[data-action]');
    if(actionEl) { event.preventDefault(); handleMenuClick(actionEl); }
  }
  function setupEvents() {
    document.addEventListener('click',handleGlobalClick);
    $('#global-search').addEventListener('input',onSearchInput);
    $('#global-search').addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();setView('search');$('#global-search').blur();}});
    $('#clear-search').addEventListener('click',()=>{searchQuery='';$('#global-search').value='';$('#global-search').closest('.global-search-wrap').classList.remove('has-value');if(currentView==='search')renderPage();});
    $('#mobile-menu').addEventListener('click',openMobileSidebar);$('#mobile-overlay').addEventListener('click',closeMobileSidebar);
    $('#play-button').addEventListener('click',togglePlayPause);
    $('#seek-range').addEventListener('input',()=>{const duration=getDuration();$('#current-time').textContent=formatTime(duration*(Number($('#seek-range').value)/1000));updateRangeFill($('#seek-range'));});
    $('#seek-range').addEventListener('change',()=>seekTo(getDuration()*(Number($('#seek-range').value)/1000)));
    $('#volume-range').addEventListener('input',event=>changeVolume(event.target.value));
    $('#audio-player').addEventListener('timeupdate',()=>{updateTimeUI();if(Number.isFinite(audio.currentTime)){state.lastPosition=audio.currentTime;}});
    $('#audio-player').addEventListener('loadedmetadata',()=>{const song=currentSong();if(song&&song.kind==='local'&&Number.isFinite(audio.duration)){song.duration=audio.duration;schedulePersist();updateTimeUI();}});
    $('#audio-player').addEventListener('play',()=>{isPlaying=true;recordCurrentListen();renderPlayer();updateMediaSession(currentSong());});
    $('#audio-player').addEventListener('pause',()=>{if(currentSong()?.kind==='local'){isPlaying=false;renderPlayer();schedulePersist();}});
    $('#audio-player').addEventListener('ended',()=>{isPlaying=false;onTrackEnded();});
    $('#audio-player').addEventListener('error',()=>{if(currentSong()?.kind==='local'&&audio.src){isPlaying=false;renderPlayer();toast('This audio file could not be played in your browser. The format may not be supported.', 'error',5500);}});
    $('#page-content').addEventListener('change',event=>{
      if(event.target.id==='library-sort'){settings.sortBy=event.target.value;persistSettings();renderPage();}
      if(event.target.id==='setting-theme'){settings.theme=event.target.value;persistSettings();applySettings();renderPage();}
      if(event.target.id==='setting-repeat'){settings.repeat=event.target.value;persistSettings();applySettings();renderPlayer();}
      if(event.target.id==='setting-volume'){changeVolume(event.target.value);const label=$('#setting-volume-label');if(label)label.textContent=`${event.target.value}%`;}
    });
    $('#page-content').addEventListener('input',event=>{if(event.target.id==='setting-volume'){settings.volume=Number(event.target.value);const label=$('#setting-volume-label');if(label)label.textContent=`${event.target.value}%`;changeVolume(event.target.value);}});
    $('#page-content').addEventListener('click',event=>{
      const toggle=event.target.closest('[data-setting]');if(toggle){const key=toggle.dataset.setting;settings[key]=!settings[key];toggle.setAttribute('aria-checked',String(!!settings[key]));persistSettings();applySettings();if(key==='shuffle'&&settings.shuffle&&state.queue.length>1)state.queue=shuffleArray(state.queue);schedulePersist();return;}
    });
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'){if(contextMenu)closeContextMenu();else if($('#modal-root').children.length)closeModal();else closeMobileSidebar();return;}
      const active=document.activeElement;const typing=active && (active.matches('input,textarea,select,[contenteditable="true"]') || active.isContentEditable);
      if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#global-search').focus();return;}
      if(typing || event.altKey || event.ctrlKey || event.metaKey) return;
      if(event.code==='Space'){event.preventDefault();togglePlayPause();}
      else if(event.key==='ArrowRight'){event.preventDefault();seekTo(getCurrentTime()+10);}
      else if(event.key==='ArrowLeft'){event.preventDefault();seekTo(Math.max(0,getCurrentTime()-10));}
      else if(event.key==='ArrowUp'){event.preventDefault();changeVolume(Math.min(100,Number(settings.volume)+5));}
      else if(event.key==='ArrowDown'){event.preventDefault();changeVolume(Math.max(0,Number(settings.volume)-5));}
      else if(event.key.toLowerCase()==='n')playNext(true);
      else if(event.key.toLowerCase()==='p')playPrevious();
      else if(event.key.toLowerCase()==='m')toggleMute();
      else if(event.key.toLowerCase()==='f'&&state.currentSongId)toggleFavorite(state.currentSongId);
    });
    $('#page-content').addEventListener('dragstart',event=>{const row=event.target.closest('tr[draggable="true"]');if(!row)return;activeDragSongId=row.dataset.songId;event.dataTransfer?.setData('text/plain',activeDragSongId);});
    $('#page-content').addEventListener('dragover',event=>{const row=event.target.closest('tr[draggable="true"]');if(row)event.preventDefault();});
    $('#page-content').addEventListener('drop',event=>{const target=event.target.closest('tr[draggable="true"]');if(!target||!activeDragSongId||target.dataset.playlistId!==target.closest('table')?.querySelector('tr[data-playlist-id]')?.dataset.playlistId)return;event.preventDefault();const playlist=getPlaylist(target.dataset.playlistId);if(!playlist)return;const from=playlist.songIds.indexOf(activeDragSongId);const to=playlist.songIds.indexOf(target.dataset.songId);if(from>=0&&to>=0&&from!==to){const [moved]=playlist.songIds.splice(from,1);playlist.songIds.splice(to,0,moved);playlist.updatedAt=Date.now();currentPlaylistSort='custom';schedulePersist();renderPage();}activeDragSongId=null;});
    window.addEventListener('beforeunload',()=>{state.lastPosition=getCurrentTime();schedulePersist();});
    window.addEventListener('resize',()=>{if(currentSong()?.kind==='youtube')$('#right-panel').classList.toggle('mobile-youtube-open',window.matchMedia('(max-width:1000px)').matches&&!youtubePanelManuallyClosed);});
    window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPromptEvent=event;});
    window.addEventListener('appinstalled',()=>{installPromptEvent=null;toast('VYBE installed. Enjoy your music!');});
  }

  async function start() {
    setupEvents();
    await loadAllData();
    if (!settings.rememberQueue) state.queue=[];
    if (settings.shuffle && state.queue.length>1) state.queue=shuffleArray(state.queue);
    applySettings();renderSidebarPlaylists();renderPlayer();
    setView(['home','search','library','playlists','favorites','history','settings'].includes(settings.lastView)?settings.lastView:'home',false);
    updateProgressLoop();
    if ('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost' || location.hostname==='127.0.0.1')) {
      navigator.serviceWorker.register('./sw.js').catch(error=>console.debug('Service worker is unavailable:',error));
    }
    setInterval(()=>{if(sleepTimerId&&Date.now()>=sleepTimerEndsAt){clearTimeout(sleepTimerId);sleepTimerId=null;}},30000);
  }

  // A playlist may be dragged to reorder. These listeners supplement the click/keyboard controls.
  start().catch(error=>{console.error(error);toast('VYBE could not finish loading. Reload the page or use a modern browser.','error',7000);});

async function playNext(manual = true) {
  const current = currentSong();

  if (manual && current && current.kind === 'local' && getCurrentTime() > 0) {
    state.lastPosition = getCurrentTime();
  }

  // Repeat ONE: denselben Song erneut starten
  if (settings.repeat === 'one' && !manual && current) {
    await playSong(current.id, {
      skipStack: true,
      preserveQueue: true
    });
    return;
  }

  let id = null;

  // Zuerst die normale Warteschlange abspielen
  if (state.queue.length > 0) {
    const index = settings.shuffle
      ? Math.floor(Math.random() * state.queue.length)
      : 0;

    [id] = state.queue.splice(index, 1);
  }

  // Repeat ALL: Playlist erneut von vorne abspielen
  else if (settings.repeat === 'all' && repeatCollection.length > 0) {
    const collection = repeatCollection.filter(songId => getSong(songId));

    if (collection.length > 0) {
      state.queue = collection.filter(songId => songId !== state.currentSongId);

      // Wenn nur ein Song vorhanden ist, diesen erneut abspielen
      if (state.queue.length === 0 && collection.length === 1) {
        state.queue = [...collection];
      }

      if (state.queue.length > 0) {
        const index = settings.shuffle
          ? Math.floor(Math.random() * state.queue.length)
          : 0;

        [id] = state.queue.splice(index, 1);
      }
    }
  }

  if (id && getSong(id)) {
    schedulePersist();

    await playSong(id, {
      skipStack: !manual,
      preserveQueue: true
    });

    renderRightQueue();
    return;
  }

  // Am Ende stoppen, wenn Autoplay ausgeschaltet ist
  if (!manual && !settings.autoPlay) {
    stopPlayback(false);
    return;
  }

  if (manual) {
    toast('There is no next track in the queue.', 'warning');
  }

  stopPlayback(false);
}

})();

