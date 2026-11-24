(() => {
  const $ = s => document.querySelector(s);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  let state = store.get("pq-state", { genre: "fantasy", ort: "taverne", lvl: 1 });
  let saved = store.get("pq-saved", []);
  let sound = store.get("pq-sound", true);
  let current = null, typing = null;

  // --- Chiptune ---
  let ac;
  function beep(freq = 440, dur = 0.06, type = "square", delay = 0) {
    if (!sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + delay;
      o.type = type; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.06, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g).connect(ac.destination); o.start(t); o.stop(t + dur);
    } catch {}
  }
  const jingle = lvl => [523, 659, 784, 1047].forEach((f, i) => beep(f * (lvl >= 3 ? 0.75 : 1), 0.09, "square", i * 0.08));

  // --- UI ---
  function renderOpts(el, data, key) {
    el.innerHTML = "";
    Object.entries(data).forEach(([id, d]) => {
      const b = document.createElement("button");
      b.className = "opt" + (state[key] === id ? " on" : "");
      b.textContent = (d.icon ? d.icon + " " : "") + d.label;
      b.onclick = () => { state[key] = id; beep(660); persist(); render(); };
      el.appendChild(b);
    });
  }
  function renderLvl() {
    const el = $("#stufen"); el.innerHTML = "";
    STUFEN.forEach((s, i) => {
      const b = document.createElement("button");
      const on = i < state.lvl;
      b.className = "lvl" + (on ? " on" : "");
      b.style.background = on ? s.color : "";
      b.textContent = i + 1;
      b.title = s.label;
      b.onclick = () => { state.lvl = i + 1; beep(300 + i * 120); persist(); render(); };
      el.appendChild(b);
    });
    $("#lvlname").textContent = "· " + STUFEN[state.lvl - 1].label.toUpperCase();
    $("#lvlname").style.color = STUFEN[state.lvl - 1].color;
  }
  function renderSaved() {
    const ul = $("#saved"); ul.innerHTML = "";
    $("#cnt").textContent = saved.length ? `(${saved.length})` : "";
    if (!saved.length) { ul.innerHTML = '<li class="empty">LEER</li>'; return; }
    saved.forEach((p, i) => {
      const li = document.createElement("li");
      const t = document.createElement("p");
      const b = document.createElement("b"); b.textContent = p.title + "\n";
      t.append(b, p.text);
      const d = document.createElement("button");
      d.className = "del"; d.textContent = "✕"; d.setAttribute("aria-label", "Löschen");
      d.onclick = () => { saved.splice(i, 1); store.set("pq-saved", saved); beep(150, .15); renderSaved(); };
      li.append(t, d); ul.appendChild(li);
    });
  }
  function render() {
    renderOpts($("#genres"), GENRES, "genre");
    renderOpts($("#orte"), ORTE, "ort");
    renderLvl();
    $("#snd").textContent = "♪ SOUND: " + (sound ? "AN" : "AUS");
  }
  const persist = () => store.set("pq-state", state);

  // --- Generator ---
  function generate() {
    const g = GENRES[state.genre], o = ORTE[state.ort], s = STUFEN[state.lvl - 1];
    const fill = str => str
      .replace(/\{npc\}/g, pick(g.npc)).replace(/\{feind\}/g, pick(g.feind))
      .replace(/\{obj\}/g, pick(g.obj)).replace(/\{ort\}/g, o.in);
    let hook = fill(pick(s.hook));
    hook = hook.charAt(0).toUpperCase() + hook.slice(1);
    const lines = [
      "► " + hook,
      "◆ ORT: " + pick(o.detail),
      "♥ EINSATZ: " + fill(pick(s.stakes)),
      "⌛ ZEIT: " + s.timer
    ];
    if (state.lvl >= 2) lines.push("✦ TWIST: " + pick(g.twist));
    return {
      title: `${g.label.toUpperCase()} · ${o.label.toUpperCase()} · LV${state.lvl}`,
      text: lines.join("\n")
    };
  }

  function show(p) {
    current = p;
    const out = $("#out");
    out.classList.remove("hidden", "shake");
    if (state.lvl >= 4) { void out.offsetWidth; out.classList.add("shake"); }
    $("#out-title").textContent = p.title;
    const el = $("#out-text"); el.textContent = "";
    clearInterval(typing);
    let i = 0;
    typing = setInterval(() => {
      el.textContent = p.text.slice(0, i += 2);
      if (i % 6 === 0) beep(880 + Math.random() * 200, 0.02);
      if (i >= p.text.length) { el.textContent = p.text; clearInterval(typing); }
    }, 16);
    jingle(state.lvl);
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $("#go").onclick = () => show(generate());
  $("#again").onclick = () => show(generate());
  $("#rnd").onclick = () => {
    state.genre = pick(Object.keys(GENRES));
    state.ort = pick(Object.keys(ORTE));
    state.lvl = 1 + Math.floor(Math.random() * STUFEN.length);
    persist(); render(); show(generate());
  };
  $("#save").onclick = () => {
    if (!current || saved.some(p => p.text === current.text)) return;
    saved.unshift(current); store.set("pq-saved", saved);
    [784, 1047, 1319].forEach((f, i) => beep(f, .08, "square", i * .07));
    renderSaved();
  };
  $("#copy").onclick = async () => {
    if (!current) return;
    try { await navigator.clipboard.writeText(current.title + "\n" + current.text); $("#copy").textContent = "✓ KOPIERT"; }
    catch { $("#copy").textContent = "✕ FEHLER"; }
    beep(1200, .05);
    setTimeout(() => $("#copy").textContent = "⎘ KOPIEREN", 1500);
  };
  $("#snd").onclick = () => { sound = !sound; store.set("pq-sound", sound); render(); beep(520); };

  render(); renderSaved();

  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
