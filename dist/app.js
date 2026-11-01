const STORAGE_KEY = "mara_protocol_recovery_v1";

const missions = [
  {
    id: "trace",
    chapter: "Kapitel 1 · Protokolljagd",
    chapterNav: "01 · Protokolljagd",
    title: "Mitschnitt 07",
    story: "Die Leitstelle hat Fragmente aus M.A.R.A.s Funkverkehr geborgen. Erkenne die Bausteine ihrer Nachrichtensprache.",
    prompt: "Ordne jedes Fragment seiner Funktion im Protokoll zu.",
    state: "SIGNAL FOUND",
    type: "categorize",
    instruction: "Tippe zuerst ein Fragment und danach den passenden Bereich. Bereits abgelegte Fragmente kannst du antippen und neu zuordnen.",
    hint: "Ein Befehl sagt, was geschehen soll. Ein Trennzeichen strukturiert die Nachricht. Nutzdaten liefern den konkreten Inhalt.",
    success: "Der erste Satzbau ist entschlüsselt: BEFEHL : NUTZDATEN. Das ist die Syntax von M.A.R.A.s Protokoll.",
    buckets: [
      { id: "command", label: "Befehl" },
      { id: "separator", label: "Trennzeichen" },
      { id: "payload", label: "Nutzdaten" },
    ],
    tokens: [
      { id: "hello", label: "HELLO", bucket: "command" },
      { id: "colon1", label: ":", bucket: "separator" },
      { id: "team", label: "TEAM7", bucket: "payload" },
      { id: "mode", label: "MODE", bucket: "command" },
      { id: "colon2", label: ":", bucket: "separator" },
      { id: "safe", label: "SAFE", bucket: "payload" },
    ],
    log: [
      "Der Datenstrom enthält wiederkehrende Wörter und Doppelpunkte.",
      "Vermutung: Nachrichten folgen einem festen Bauplan.",
      "Ziel: Formale Struktur erkennen, bevor Inhalte gedeutet werden.",
    ],
    terms: [
      ["Syntax", "Regeln für den formalen Aufbau einer Nachricht."],
      ["Befehl", "Festgelegtes Schlüsselwort, das eine Aktion bezeichnet."],
      ["Nutzdaten", "Der konkrete Inhalt, den eine Nachricht transportiert."],
    ],
  },
  {
    id: "dialogue",
    chapter: "Kapitel 1 · Protokolljagd",
    chapterNav: "01 · Protokolljagd",
    title: "Dialog rekonstruieren",
    story: "Die Reihenfolge ist entscheidend. M.A.R.A. akzeptiert Befehle erst, nachdem sich die Leitstelle korrekt angemeldet hat.",
    prompt: "Setze den aufgezeichneten Dialog in eine gültige Reihenfolge.",
    state: "PARSER ONLINE",
    type: "sequence",
    instruction: "Baue den Wechsel aus Anfrage und Antwort auf. Tippe einen abgelegten Baustein an, um ihn wieder zu entfernen.",
    hint: "Zuerst stellt sich TEAM7 vor. Danach bestätigt M.A.R.A. ihre Bereitschaft. Erst dann kann der Status abgefragt werden.",
    success: "Die Rollen sind klar: Der Client sendet Anfragen, M.A.R.A. antwortet als Server. Auch die Reihenfolge gehört zum Protokoll.",
    sequence: [
      { id: "a", label: "TEAM7 → HELLO:TEAM7" },
      { id: "b", label: "M.A.R.A. → OK:READY" },
      { id: "c", label: "TEAM7 → STATUS" },
      { id: "d", label: "M.A.R.A. → STATUS:RUNAWAY" },
      { id: "e", label: "TEAM7 → MODE:SAFE" },
      { id: "f", label: "M.A.R.A. → OK:SAFE" },
    ],
    log: [
      "Die Fragmente stammen aus einem einzigen Gespräch.",
      "M.A.R.A. beantwortet jeden gültigen Befehl direkt.",
      "Vor HELLO wurden alle Befehle verworfen.",
    ],
    terms: [
      ["Semantik", "Bedeutung eines Befehls und seiner Antwort."],
      ["Client", "Teilnehmer, der eine Anfrage an einen Dienst sendet."],
      ["Server", "Teilnehmer, der Anfragen verarbeitet und beantwortet."],
    ],
  },
  {
    id: "errors",
    chapter: "Kapitel 1 · Protokolljagd",
    chapterNav: "01 · Protokolljagd",
    title: "Störmeldungen",
    story: "Ein robustes Protokoll muss auch ungültige Nachrichten behandeln. Drei Fehlerfälle blockieren noch den Rückrufkanal.",
    prompt: "Wähle für jeden Fehler die passende Protokollantwort.",
    state: "ERROR CHECK",
    type: "quiz",
    instruction: "Bearbeite die drei Fälle nacheinander. Nach jeder Entscheidung bekommst du eine direkte Rückmeldung.",
    hint: "Unterscheide zwischen unbekanntem Befehl, fehlendem Wert und falschem Zustand des Gesprächs.",
    success: "M.A.R.A. kann Fehler nun eindeutig melden. Ein Protokoll beschreibt nicht nur den Normalfall, sondern auch Abweichungen.",
    questions: [
      {
        text: "TEAM7 sendet nur „MODE“ – der notwendige Wert fehlt. Welche Antwort passt?",
        options: ["ERR:VALUE_MISSING", "OK:SAFE", "ERR:LOGIN_REQUIRED"],
        answer: 0,
        explanation: "Richtig: Der Befehl ist bekannt, aber sein notwendiger Wert fehlt.",
      },
      {
        text: "TEAM7 sendet „BANANE:42“. M.A.R.A. kennt diesen Befehl nicht.",
        options: ["STATUS:RUNAWAY", "ERR:UNKNOWN_COMMAND", "ERR:VALUE_MISSING"],
        answer: 1,
        explanation: "Richtig: Die Syntax wirkt vollständig, aber das Schlüsselwort gehört nicht zum Protokoll.",
      },
      {
        text: "TEAM7 sendet „RETURN:LAB“, bevor HELLO bestätigt wurde.",
        options: ["OK:RETURNING", "ERR:LOGIN_REQUIRED", "ERR:UNKNOWN_COMMAND"],
        answer: 1,
        explanation: "Richtig: Der Befehl ist erlaubt, aber noch nicht in diesem Zustand des Dialogs.",
      },
    ],
    log: [
      "Fehlerantworten beginnen einheitlich mit ERR.",
      "Eine präzise Rückmeldung hilft dem Gegenüber bei der Korrektur.",
      "Der aktuelle Gesprächszustand beeinflusst gültige Befehle.",
    ],
    terms: [
      ["Fehlerbehandlung", "Festgelegte Reaktion auf ungültige oder unerwartete Nachrichten."],
      ["Zustand", "Phase eines Dialogs, die bestimmt, welche Schritte gerade erlaubt sind."],
      ["Robustheit", "Fähigkeit, auch bei fehlerhaften Eingaben kontrolliert zu reagieren."],
    ],
  },
  {
    id: "recall",
    chapter: "Kapitel 1 · Protokolljagd",
    chapterNav: "01 · Protokolljagd",
    title: "Rückrufsequenz",
    story: "Das Kommunikationsprotokoll ist verstanden. Jetzt muss TEAM7 selbst eine vollständige Befehlsfolge senden.",
    prompt: "Programmiere die kürzeste gültige Rückrufsequenz.",
    state: "CHANNEL READY",
    type: "sequence",
    instruction: "Ordne nur die Client-Befehle. Die Serverantworten werden automatisch geprüft.",
    hint: "Anmelden, Status prüfen, sicheren Modus aktivieren, Rückkehr auslösen, Verbindung sauber beenden.",
    success: "Rückruf erfolgreich. Du hast Syntax, Bedeutung, Reihenfolge und Zustände zu einem vollständigen Protokoll verbunden.",
    sequence: [
      { id: "a", label: "HELLO:TEAM7" },
      { id: "b", label: "STATUS" },
      { id: "c", label: "MODE:SAFE" },
      { id: "d", label: "RETURN:LAB" },
      { id: "e", label: "QUIT" },
    ],
    log: [
      "Der Rückrufbefehl funktioniert nur im Modus SAFE.",
      "QUIT beendet eine Sitzung kontrolliert.",
      "M.A.R.A. hat die Rückkehr bestätigt – doch Datenpakete gehen verloren.",
    ],
    terms: [
      ["Kommunikationsprotokoll", "Gemeinsame Regeln zu Aufbau, Bedeutung, Reihenfolge und Fehlerfällen von Nachrichten."],
      ["Sitzung", "Zusammenhängender Nachrichtenaustausch zwischen Teilnehmern."],
      ["Handshake", "Abgestimmter Beginn einer Kommunikation, hier mit HELLO und OK."],
    ],
  },
  {
    id: "stack",
    chapter: "Kapitel 2 · Schichtenwerkstatt",
    chapterNav: "02 · Schichtenwerkstatt",
    title: "Schichtenstapel",
    story: "M.A.R.A.s Nachricht ist korrekt, erreicht das Labor aber nicht. Ordne die Aufgaben des Netzwerkstapels von oben nach unten.",
    prompt: "Baue das vierstufige TCP/IP-Modell auf.",
    state: "STACK DAMAGED",
    type: "sequence",
    instruction: "Beginne bei der Anwendung, die Daten erzeugt. Der unterste Baustein bringt sie schließlich über das lokale Medium.",
    hint: "Anwendung → Transport → Internet → Netzzugang. Jede Schicht nutzt die Dienste der Schicht darunter.",
    success: "Der Stapel steht. Das Schichtenmodell teilt komplexe Kommunikation in klar abgegrenzte Aufgaben.",
    sequence: [
      { id: "a", label: "Anwendungsschicht" },
      { id: "b", label: "Transportschicht" },
      { id: "c", label: "Internetschicht" },
      { id: "d", label: "Netzzugangsschicht" },
    ],
    log: [
      "Die Anwendung kennt M.A.R.A.s Befehle.",
      "Darunter arbeiten allgemeine Netzwerkdienste.",
      "Schichten reduzieren Abhängigkeiten: Ob WLAN oder Kabel, das Protokoll bleibt gleich.",
    ],
    terms: [
      ["Schichtenmodell", "Aufteilung eines komplexen Systems in Ebenen mit abgegrenzten Aufgaben."],
      ["TCP/IP-Modell", "Praxisnahes Modell der Internetkommunikation mit vier Schichten."],
      ["Dienst", "Leistung, die eine Schicht für die darüberliegende Schicht bereitstellt."],
    ],
  },
  {
    id: "encapsulation",
    chapter: "Kapitel 2 · Schichtenwerkstatt",
    chapterNav: "02 · Schichtenwerkstatt",
    title: "Verpackungsstraße",
    story: "Beim Senden ergänzt jede Schicht eigene Steuerinformationen. Rekonstruiere die Kapselung von M.A.R.A.s Nachricht.",
    prompt: "Ordne die Verpackungen vom innersten Inhalt bis zur Übertragung.",
    state: "PACKET ASSEMBLY",
    type: "sequence",
    instruction: "Die Anwendungsnachricht ist der Kern. Danach kommen TCP-, IP- und lokale Rahmeninformationen hinzu.",
    hint: "Zuerst kennt nur die Anwendung RETURN:LAB. Dann folgen Ports, IP-Adressen und ganz außen der lokale Frame.",
    success: "Paket montiert. Beim Empfänger werden die Ergänzungen in umgekehrter Reihenfolge wieder entfernt.",
    sequence: [
      { id: "a", label: "Anwendungsdaten · RETURN:LAB" },
      { id: "b", label: "TCP-Segment · Ports ergänzen" },
      { id: "c", label: "IP-Paket · IP-Adressen ergänzen" },
      { id: "d", label: "Frame · lokales Netz ergänzen" },
    ],
    log: [
      "Jede Schicht fügt einen eigenen Header hinzu.",
      "Die inneren Nutzdaten bleiben für tiefere Schichten undurchsichtig.",
      "Am Ziel läuft der Vorgang als Entkapselung rückwärts.",
    ],
    terms: [
      ["Kapselung", "Ergänzen schichtspezifischer Steuerinformationen beim Senden."],
      ["Header", "Steuerdaten am Anfang einer Übertragungseinheit."],
      ["Entkapselung", "Schrittweises Auswerten und Entfernen der Header am Ziel."],
    ],
  },
  {
    id: "addresses",
    chapter: "Kapitel 2 · Schichtenwerkstatt",
    chapterNav: "02 · Schichtenwerkstatt",
    title: "Adresslabor",
    story: "Vier Informationen wurden beim Absturz vertauscht. Weise sie der Schicht zu, die sie tatsächlich verwendet.",
    prompt: "Ordne jede Information der richtigen TCP/IP-Schicht zu.",
    state: "ROUTE SEARCH",
    type: "categorize",
    instruction: "Denke daran: Ein Rechner, ein Programm und eine lokale Netzwerkkarte werden auf unterschiedlichen Ebenen adressiert.",
    hint: "Befehlssprache = Anwendung, Port = Transport, IP-Adresse = Internet, Frame/MAC = Netzzugang.",
    success: "Adressierung repariert: IP findet den Zielrechner, der Port das Zielprogramm und der lokale Frame den nächsten Übertragungsschritt.",
    buckets: [
      { id: "app", label: "Anwendung" },
      { id: "transport", label: "Transport" },
      { id: "internet", label: "Internet" },
      { id: "link", label: "Netzzugang" },
    ],
    tokens: [
      { id: "syntax", label: "Befehl RETURN:LAB", bucket: "app" },
      { id: "port", label: "Zielport 5000", bucket: "transport" },
      { id: "ip", label: "Ziel-IP 10.0.0.7", bucket: "internet" },
      { id: "frame", label: "WLAN-Frame / MAC", bucket: "link" },
      { id: "ack", label: "TCP bestätigt Empfang", bucket: "transport" },
      { id: "route", label: "Router wählt nächsten Weg", bucket: "internet" },
    ],
    log: [
      "Eine IP-Adresse bezeichnet einen Netzanschluss, nicht ein Programm.",
      "Ports unterscheiden Dienste auf demselben Rechner.",
      "MAC-Adressen und Frames wirken nur im jeweils lokalen Netzabschnitt.",
    ],
    terms: [
      ["Port", "Nummer, über die die Transportschicht ein Zielprogramm unterscheidet."],
      ["IP-Adresse", "Logische Adresse eines Netzanschlusses über Netzgrenzen hinweg."],
      ["Frame", "Übertragungseinheit der Netzzugangsschicht in einem lokalen Netz."],
    ],
  },
  {
    id: "diagnostics",
    chapter: "Kapitel 2 · Schichtenwerkstatt",
    chapterNav: "02 · Schichtenwerkstatt",
    title: "Fehlerdiagnose",
    story: "Die Telemetrie meldet vier Störungen. Lokalisiere jede Störung, ohne den gesamten Netzwerkstapel zu zerlegen.",
    prompt: "Bestimme für jeden Fehler die betroffene Schicht.",
    state: "DIAGNOSTICS",
    type: "quiz",
    instruction: "Wähle jeweils die Schicht, deren eigene Information oder Regel fehlerhaft ist.",
    hint: "Frage dich bei jedem Fehler: Geht es um die Nachricht, das Zielprogramm, den Zielrechner oder das lokale Medium?",
    success: "Diagnose abgeschlossen. Das Schichtenmodell hilft, Fehler systematisch einzugrenzen und gezielt zu beheben.",
    questions: [
      { text: "Der Zielport ist falsch; auf dem Rechner hört dort kein Dienst.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 1, explanation: "Richtig: Ports gehören zur Transportschicht." },
      { text: "Die Ziel-IP zeigt auf einen anderen Rechner.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 2, explanation: "Richtig: IP-Adressierung und Routing sind Aufgaben der Internetschicht." },
      { text: "M.A.R.A. kennt den Befehl RETURNX nicht.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 0, explanation: "Richtig: Die Bedeutung der Protokollbefehle liegt in der Anwendungsschicht." },
      { text: "Der WLAN-Frame kommt beschädigt am nächsten Gerät an.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 3, explanation: "Richtig: Der lokale Frame gehört zur Netzzugangsschicht." },
    ],
    log: [
      "Ein Fehler ist meist auf eine Schicht begrenzbar.",
      "Die Schichten oberhalb können dadurch unabhängig bleiben.",
      "Der Rückkanal ist stabil – es fehlt nur noch der Modellabgleich.",
    ],
    terms: [
      ["Fehlerlokalisierung", "Eingrenzen einer Störung auf die verantwortliche Ebene."],
      ["Routing", "Auswahl eines Weges für IP-Pakete durch mehrere Netze."],
      ["Dienstprozess", "Programm, das auf einem bestimmten Port Anfragen entgegennimmt."],
    ],
  },
  {
    id: "osi",
    chapter: "Kapitel 3 · OSI-Transfer",
    chapterNav: "03 · OSI-Transfer",
    title: "Sieben auf vier",
    story: "Das Labor dokumentiert nach dem siebenschichtigen OSI-Referenzmodell. Ordne die feineren OSI-Schichten dem TCP/IP-Modell zu.",
    prompt: "Bilde die korrekte Zuordnung von sieben OSI- zu vier TCP/IP-Schichten.",
    state: "MODEL SYNC",
    type: "categorize",
    instruction: "Tippe eine OSI-Schicht und danach den passenden TCP/IP-Bereich. Mehrere OSI-Schichten können gemeinsam in einem Bereich liegen.",
    hint: "OSI 7–5 werden zur TCP/IP-Anwendung. OSI 4 und 3 entsprechen jeweils einer eigenen Schicht. OSI 2–1 bilden gemeinsam den Netzzugang.",
    success: "Modellabgleich vollständig: Das OSI-Modell beschreibt feiner, das TCP/IP-Modell fasst praktische Internetfunktionen zusammen.",
    buckets: [
      { id: "app", label: "TCP/IP Anwendung" },
      { id: "transport", label: "TCP/IP Transport" },
      { id: "internet", label: "TCP/IP Internet" },
      { id: "link", label: "TCP/IP Netzzugang" },
    ],
    tokens: [
      { id: "l7", label: "7 · Anwendung", bucket: "app" },
      { id: "l6", label: "6 · Darstellung", bucket: "app" },
      { id: "l5", label: "5 · Sitzung", bucket: "app" },
      { id: "l4", label: "4 · Transport", bucket: "transport" },
      { id: "l3", label: "3 · Vermittlung", bucket: "internet" },
      { id: "l2", label: "2 · Sicherung", bucket: "link" },
      { id: "l1", label: "1 · Bitübertragung", bucket: "link" },
    ],
    log: [
      "OSI ist ein Referenzmodell mit sieben getrennten Schichten.",
      "TCP/IP beschreibt die im Internet praktisch verwendete Architektur kompakter.",
      "Die Modelle sind nicht identisch, lassen sich für die grundlegenden Aufgaben aber sinnvoll abgleichen.",
    ],
    terms: [
      ["OSI-Modell", "Siebenschichtiges Referenzmodell zur Beschreibung von Netzwerkkommunikation."],
      ["Darstellungsschicht", "OSI-Schicht 6: Formate, Kodierung, Kompression und Verschlüsselung."],
      ["Sitzungsschicht", "OSI-Schicht 5: Aufbau und Steuerung zusammenhängender Dialoge."],
      ["Vermittlungsschicht", "OSI-Schicht 3: logische Adressierung und Weiterleitung zwischen Netzen."],
    ],
  },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const elements = {
  hero: $("#hero-view"),
  mission: $("#mission-view"),
  nav: $("#mission-nav"),
  progressLabel: $("#progress-label"),
  progressBar: $("#progress-bar"),
  missionChapter: $("#mission-chapter"),
  missionTitle: $("#mission-title"),
  missionStory: $("#mission-story"),
  machineState: $("#machine-state"),
  puzzlePrompt: $("#puzzle-prompt"),
  puzzleArea: $("#puzzle-area"),
  feedback: $("#feedback"),
  signalMeter: $("#signal-meter"),
  check: $("#check-button"),
  next: $("#next-button"),
  hint: $("#hint-button"),
  intel: $("#intel-content"),
  dialog: $("#completion-dialog"),
  stats: $("#completion-stats"),
};

const blankState = () => ({
  mode: null,
  current: 0,
  complete: Array(missions.length).fill(false),
  signals: Array(missions.length).fill(3),
  hints: Array(missions.length).fill(false),
});

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || !Array.isArray(stored.complete)) return blankState();
    return {
      ...blankState(),
      ...stored,
      complete: missions.map((_, index) => Boolean(stored.complete[index])),
      signals: missions.map((_, index) => Math.max(1, Math.min(3, Number(stored.signals?.[index]) || 3))),
      hints: missions.map((_, index) => Boolean(stored.hints?.[index])),
    };
  } catch {
    return blankState();
  }
}

let state = loadState();
let interaction = {};
let activeIntel = "log";

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function icon(name) {
  if (name === "check") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>';
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 11V8a4 4 0 0 1 8 0v3M6 11h12v10H6z" /></svg>';
}

function renderProgress() {
  const count = state.complete.filter(Boolean).length;
  elements.progressLabel.textContent = `${count} / ${missions.length}`;
  elements.progressBar.style.width = `${(count / missions.length) * 100}%`;
}

function canOpen(index) {
  if (state.mode === "expert") return true;
  if (index === 0) return true;
  return state.complete[index - 1];
}

function renderNav() {
  elements.nav.innerHTML = "";
  let lastChapter = "";
  missions.forEach((mission, index) => {
    if (mission.chapterNav !== lastChapter) {
      const heading = document.createElement("div");
      heading.className = "nav-chapter";
      heading.textContent = mission.chapterNav;
      elements.nav.append(heading);
      lastChapter = mission.chapterNav;
    }

    const button = document.createElement("button");
    const locked = state.mode === "guided" && !canOpen(index);
    button.type = "button";
    button.className = `mission-button${state.complete[index] ? " completed" : ""}${!elements.mission.classList.contains("hidden") && state.current === index ? " active" : ""}`;
    button.disabled = !state.mode || locked;
    button.title = locked ? "Schließe zuerst die vorherige Mission ab." : mission.title;
    button.innerHTML = `
      <span class="mission-index">${state.complete[index] ? "✓" : String(index + 1).padStart(2, "0")}</span>
      <span class="mission-label">${mission.title}</span>
      <span class="nav-status">${locked ? icon("lock") : state.complete[index] ? icon("check") : ""}</span>
    `;
    button.addEventListener("click", () => openMission(index));
    elements.nav.append(button);
  });
}

function showHero() {
  elements.hero.classList.remove("hidden");
  elements.mission.classList.add("hidden");
  renderNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function start(mode) {
  state.mode = mode;
  saveState();
  const firstIncomplete = state.complete.findIndex((done) => !done);
  openMission(firstIncomplete === -1 ? 0 : firstIncomplete);
}

function prepareInteraction(mission, completed) {
  if (mission.type === "sequence") {
    interaction = { order: completed ? mission.sequence.map((item) => item.id) : [] };
  } else if (mission.type === "categorize") {
    const assignments = {};
    if (completed) mission.tokens.forEach((token) => { assignments[token.id] = token.bucket; });
    interaction = { assignments, selected: null };
  } else {
    interaction = {
      question: completed ? mission.questions.length - 1 : 0,
      selected: completed ? mission.questions.at(-1).answer : null,
    };
  }
}

function openMission(index) {
  if (!state.mode) state.mode = "guided";
  if (!canOpen(index)) return;
  state.current = index;
  saveState();
  activeIntel = "log";
  prepareInteraction(missions[index], state.complete[index]);
  elements.hero.classList.add("hidden");
  elements.mission.classList.remove("hidden");
  renderMission();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderMission() {
  const mission = missions[state.current];
  elements.missionChapter.textContent = mission.chapter;
  elements.missionTitle.textContent = mission.title;
  elements.missionStory.textContent = mission.story;
  elements.machineState.textContent = mission.state;
  elements.puzzlePrompt.textContent = mission.prompt;
  elements.feedback.className = "feedback hidden";
  elements.feedback.textContent = "";
  elements.check.classList.toggle("hidden", state.complete[state.current]);
  elements.next.classList.toggle("hidden", !state.complete[state.current]);
  elements.next.textContent = state.current === missions.length - 1 ? "Einsatzbericht" : "Nächste Mission";
  elements.hint.disabled = state.complete[state.current];
  renderSignal();
  renderPuzzle();
  renderIntel();
  renderNav();
  renderProgress();

  if (state.complete[state.current]) {
    showFeedback(mission.success, "success");
  }
}

function renderSignal() {
  const value = state.signals[state.current];
  elements.signalMeter.innerHTML = Array.from({ length: 3 }, (_, i) => `<span class="signal-cell${i < value ? " on" : ""}"></span>`).join("");
  elements.signalMeter.setAttribute("aria-label", `Signalqualität: ${value} von 3`);
}

function renderPuzzle() {
  const mission = missions[state.current];
  if (mission.type === "sequence") renderSequence(mission);
  if (mission.type === "categorize") renderCategorize(mission);
  if (mission.type === "quiz") renderQuiz(mission);
}

function renderSequence(mission) {
  const chosen = new Set(interaction.order);
  const byId = Object.fromEntries(mission.sequence.map((item) => [item.id, item]));
  elements.puzzleArea.innerHTML = `
    <p class="puzzle-instruction">${mission.instruction}</p>
    <div class="sequence-board" id="sequence-board">
      ${interaction.order.map((id, index) => `<button class="sequence-tile" type="button" data-remove="${id}"><span class="order">${index + 1}</span>${byId[id].label}</button>`).join("")}
    </div>
    <div class="tile-pool" id="tile-pool">
      ${mission.sequence.filter((item) => !chosen.has(item.id)).map((item) => `<button class="sequence-tile" type="button" data-add="${item.id}">${item.label}</button>`).join("")}
    </div>
  `;
  $$('[data-add]').forEach((button) => button.addEventListener("click", () => {
    interaction.order.push(button.dataset.add);
    renderSequence(mission);
  }));
  $$('[data-remove]').forEach((button) => button.addEventListener("click", () => {
    interaction.order = interaction.order.filter((id) => id !== button.dataset.remove);
    renderSequence(mission);
  }));
}

function renderCategorize(mission) {
  const unassigned = mission.tokens.filter((token) => !interaction.assignments[token.id]);
  elements.puzzleArea.innerHTML = `
    <p class="puzzle-instruction">${mission.instruction}</p>
    <div class="tile-pool">
      ${unassigned.length ? unassigned.map((token) => `<button class="category-tile${interaction.selected === token.id ? " selected" : ""}" type="button" data-token="${token.id}">${token.label}</button>`).join("") : '<span class="puzzle-instruction">Alle Bausteine sind zugeordnet.</span>'}
    </div>
    <div class="bucket-grid">
      ${mission.buckets.map((bucket) => `
        <section class="bucket${interaction.selected ? " active" : ""}" data-bucket="${bucket.id}">
          <h3>${bucket.label}</h3>
          <div class="bucket-cards">
            ${mission.tokens.filter((token) => interaction.assignments[token.id] === bucket.id).map((token) => `<button class="bucket-card" type="button" data-return="${token.id}" title="Zurücklegen">${token.label}</button>`).join("")}
          </div>
        </section>
      `).join("")}
    </div>
  `;
  $$('[data-token]').forEach((button) => button.addEventListener("click", () => {
    interaction.selected = interaction.selected === button.dataset.token ? null : button.dataset.token;
    renderCategorize(mission);
  }));
  $$('[data-bucket]').forEach((bucket) => bucket.addEventListener("click", (event) => {
    if (event.target.closest("[data-return]") || !interaction.selected) return;
    interaction.assignments[interaction.selected] = bucket.dataset.bucket;
    interaction.selected = null;
    renderCategorize(mission);
  }));
  $$('[data-return]').forEach((button) => button.addEventListener("click", () => {
    delete interaction.assignments[button.dataset.return];
    interaction.selected = button.dataset.return;
    renderCategorize(mission);
  }));
}

function renderQuiz(mission) {
  const question = mission.questions[interaction.question];
  elements.puzzleArea.innerHTML = `
    <p class="puzzle-instruction">${mission.instruction}</p>
    <div class="quiz-progress">FALL ${interaction.question + 1} VON ${mission.questions.length}</div>
    <h3 class="quiz-question">${question.text}</h3>
    <div class="quiz-options">
      ${question.options.map((option, index) => `<button class="quiz-option${interaction.selected === index ? " selected" : ""}" type="button" data-option="${index}">${option}</button>`).join("")}
    </div>
  `;
  $$('[data-option]').forEach((button) => button.addEventListener("click", () => {
    interaction.selected = Number(button.dataset.option);
    renderQuiz(mission);
  }));
}

function renderIntel() {
  const mission = missions[state.current];
  $$(".intel-tabs button").forEach((button) => button.classList.toggle("active", button.dataset.intel === activeIntel));
  if (activeIntel === "log") {
    elements.intel.innerHTML = `
      <h3>Beobachtungen</h3>
      ${mission.log.map((entry, index) => `<div class="trace"><time>0${index + 1}</time><code>${entry}</code></div>`).join("")}
    `;
  } else {
    elements.intel.innerHTML = `
      <h3>Fachbegriffe dieser Mission</h3>
      <dl class="term-list">${mission.terms.map(([term, definition]) => `<div><dt>${term}</dt><dd>${definition}</dd></div>`).join("")}</dl>
    `;
  }
}

function showFeedback(message, kind) {
  elements.feedback.textContent = message;
  elements.feedback.className = `feedback ${kind}`;
}

function reduceSignal() {
  state.signals[state.current] = Math.max(1, state.signals[state.current] - 1);
  saveState();
  renderSignal();
}

function checkAnswer() {
  const mission = missions[state.current];
  if (mission.type === "sequence") checkSequence(mission);
  if (mission.type === "categorize") checkCategorize(mission);
  if (mission.type === "quiz") checkQuiz(mission);
}

function checkSequence(mission) {
  if (interaction.order.length < mission.sequence.length) {
    showFeedback(`Noch ${mission.sequence.length - interaction.order.length} Baustein(e) fehlen.`, "error");
    return;
  }
  const correct = interaction.order.every((id, index) => id === mission.sequence[index].id);
  if (correct) completeMission();
  else {
    reduceSignal();
    showFeedback("Die Bausteine sind vollständig, aber ihre Reihenfolge passt noch nicht zum Ablauf. Prüfe Abhängigkeiten und Antworten.", "error");
  }
}

function checkCategorize(mission) {
  const placed = Object.keys(interaction.assignments).length;
  if (placed < mission.tokens.length) {
    showFeedback(`Ordne noch ${mission.tokens.length - placed} Baustein(e) zu.`, "error");
    return;
  }
  const wrong = mission.tokens.filter((token) => interaction.assignments[token.id] !== token.bucket);
  if (!wrong.length) completeMission();
  else {
    reduceSignal();
    showFeedback(`${wrong.length} Zuordnung(en) passen noch nicht. Tippe abgelegte Karten an, um sie neu einzuordnen.`, "error");
  }
}

function checkQuiz(mission) {
  if (interaction.selected === null) {
    showFeedback("Wähle zuerst eine Antwort aus.", "error");
    return;
  }
  const question = mission.questions[interaction.question];
  if (interaction.selected !== question.answer) {
    reduceSignal();
    showFeedback("Diese Antwort passt noch nicht zum beschriebenen Fehler. Nutze Fachbegriff und Gesprächszustand als Hinweis.", "error");
    return;
  }

  if (interaction.question < mission.questions.length - 1) {
    const explanation = question.explanation;
    interaction.question += 1;
    interaction.selected = null;
    renderQuiz(mission);
    showFeedback(`${explanation} Weiter mit dem nächsten Fall.`, "success");
  } else {
    completeMission();
  }
}

function completeMission() {
  const wasComplete = state.complete[state.current];
  state.complete[state.current] = true;
  saveState();
  elements.check.classList.add("hidden");
  elements.next.classList.remove("hidden");
  elements.next.textContent = state.current === missions.length - 1 ? "Einsatzbericht" : "Nächste Mission";
  elements.hint.disabled = true;
  showFeedback(missions[state.current].success, "success");
  renderProgress();
  renderNav();
  if (!wasComplete && state.complete.every(Boolean)) showCompletion();
}

function showHint() {
  const mission = missions[state.current];
  if (!state.hints[state.current]) {
    state.hints[state.current] = true;
    reduceSignal();
  }
  showFeedback(mission.hint, "hint");
}

function goNext() {
  if (state.current === missions.length - 1) {
    showCompletion();
    return;
  }
  let nextIndex = state.current + 1;
  if (state.mode === "expert") {
    const laterIncomplete = state.complete.findIndex((done, index) => index > state.current && !done);
    const anyIncomplete = state.complete.findIndex((done) => !done);
    nextIndex = laterIncomplete !== -1 ? laterIncomplete : anyIncomplete;
  }
  if (nextIndex === -1) showCompletion();
  else openMission(nextIndex);
}

function showCompletion() {
  const signalTotal = state.signals.reduce((sum, value) => sum + value, 0);
  const hintsUsed = state.hints.filter(Boolean).length;
  elements.stats.innerHTML = `
    <span><strong>${state.complete.filter(Boolean).length} / ${missions.length}</strong>Missionen</span>
    <span><strong>${signalTotal} / ${missions.length * 3}</strong>Signalpunkte</span>
    <span><strong>${hintsUsed}</strong>Hinweise</span>
  `;
  if (typeof elements.dialog.showModal === "function") elements.dialog.showModal();
}

function resetGame() {
  if (!window.confirm("Möchtest du den gesamten Missionsfortschritt auf diesem Gerät zurücksetzen?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = blankState();
  interaction = {};
  renderProgress();
  showHero();
}

$("#guided-start").addEventListener("click", () => start("guided"));
$("#expert-start").addEventListener("click", () => start("expert"));
$("#brand-button").addEventListener("click", showHero);
$("#back-to-map").addEventListener("click", showHero);
$("#reset-button").addEventListener("click", resetGame);
$("#check-button").addEventListener("click", checkAnswer);
$("#next-button").addEventListener("click", goNext);
$("#hint-button").addEventListener("click", showHint);
$("#close-completion").addEventListener("click", () => elements.dialog.close());
$$(".intel-tabs button").forEach((button) => button.addEventListener("click", () => {
  activeIntel = button.dataset.intel;
  renderIntel();
}));

renderProgress();
renderNav();
