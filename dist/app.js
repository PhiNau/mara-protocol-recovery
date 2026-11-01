const STORAGE_KEY = "mara_protocol_recovery_v1";

const prologueScenes = [
  {
    kicker: "21:47 Uhr · Techniklabor",
    title: "Der Abend, an dem M.A.R.A. verschwand",
    text: "Eigentlich sollte der mobile Assistenzroboter nur einen neuen Netzwerkmodus testen. Dann flackern die Monitore, die Labortür öffnet sich – und M.A.R.A. rollt ohne Freigabe hinaus in die Nacht.",
    transmission: "SYSTEMLOG // Verbindung zu M.A.R.A. verloren · letzter Zustand: UPDATE_PENDING",
    art: "lab",
  },
  {
    kicker: "22:03 Uhr · Außerhalb des Campus",
    title: "Die Maschine folgt einem fremden Takt",
    text: "Eine Überwachungskamera erfasst M.A.R.A. am Rand des Stadtwalds. Ihre Sensoren funktionieren, doch auf normale Steuerbefehle reagiert sie nicht. Irgendetwas hat ihre Kommunikationsregeln verändert.",
    transmission: "KAMERA 04 // Ziel erkannt · Bewegungsrichtung: Relaisstation Nord · Reaktion auf Rückruf: keine",
    art: "forest",
  },
  {
    kicker: "22:11 Uhr · Netzwerk-Leitstelle",
    title: "Im Rauschen steckt eine Sprache",
    text: "TEAM7 fängt kurze Datenbursts auf. Wiederkehrende Wörter, Doppelpunkte und Antworten deuten auf ein Protokoll hin. Wer seine Regeln versteht, kann vielleicht wieder mit M.A.R.A. sprechen.",
    transmission: "MITSCHNITT 07 // … HELLO:??? … ERR:LOGIN_REQUIRED … STATUS:RUNAWAY …",
    art: "signal",
  },
  {
    kicker: "22:16 Uhr · Einsatzfreigabe",
    title: "Protocol Recovery beginnt",
    text: "Eure Aufgabe: Rekonstruiert zuerst M.A.R.A.s Sprache. Repariert danach den Transportweg durch die Netzwerkschichten und übersetzt die Ergebnisse für das OSI-Laborprotokoll.",
    transmission: "MISSIONSZIEL // Kontakt herstellen · sicheren Modus aktivieren · Rückkehr zum Labor auslösen",
    art: "map",
  },
];

const academyModules = [
  {
    id: "why",
    kicker: "Das Grundproblem",
    title: "Warum Kommunikation Schichten braucht",
    lead: "Eine Nachricht muss verstanden, einem Programm zugestellt, durch mehrere Netze geleitet und über ein konkretes Medium übertragen werden. Keine einzelne Regel kann all das sinnvoll zugleich lösen.",
    visual: "analogy",
    sections: [
      ["Eine große Aufgabe wird teilbar", "Das Schichtenmodell zerlegt Kommunikation in überschaubare Teilprobleme. Eine Schicht kümmert sich jeweils um eine bestimmte Art von Aufgabe und stellt der darüberliegenden Schicht einen Dienst bereit."],
      ["Austauschbare Technik", "Die Anwendung muss nicht wissen, ob die Bits später über WLAN, Glasfaser oder ein Kupferkabel laufen. Solange die Grenze zwischen den Schichten gleich bleibt, kann eine Schicht ausgetauscht werden, ohne alles andere neu zu erfinden."],
      ["Sender und Empfänger spiegeln sich", "Beim Sender wandert die Nachricht von oben nach unten. Beim Empfänger läuft der Weg umgekehrt: vom Signal zurück zur Bedeutung für die Anwendung."],
    ],
    takeaway: "Schichten trennen Verantwortlichkeiten. Dadurch werden Netzwerke planbar, austauschbar und leichter zu reparieren.",
  },
  {
    id: "stack",
    kicker: "Vier Ebenen im Internet",
    title: "Das TCP/IP-Modell im Überblick",
    lead: "Für das Internet genügt häufig ein Modell mit vier Schichten. Jede Schicht hat eigene Aufgaben, eigene Begriffe und eine eigene Sicht auf dieselben Daten.",
    visual: "stack",
    sections: [
      ["Anwendungsschicht", "Hier leben die Regeln einer konkreten Anwendung: Chatbefehle, Webseiten, E-Mail oder M.A.R.A.s RETURN:LAB. Die Schicht kennt die Bedeutung der Nutzdaten."],
      ["Transportschicht", "Sie verbindet Prozesse auf Endgeräten. Ports unterscheiden Programme; TCP kann Reihenfolge, Bestätigung und erneute Übertragung organisieren."],
      ["Internetschicht", "IP-Adressen und Routing bringen Pakete durch mehrere Netze zum richtigen Zielrechner. Router arbeiten vor allem auf dieser Ebene."],
      ["Netzzugangsschicht", "Sie überträgt Frames im jeweils lokalen Netzabschnitt – etwa über Ethernet oder WLAN. Dazu gehören MAC-Adressen, Prüfsummen und die physische Signalübertragung."],
    ],
    takeaway: "Oben geht es um Bedeutung, darunter um Programmzustellung, dann um den Rechnerweg und ganz unten um den lokalen Transport.",
  },
  {
    id: "encapsulation",
    kicker: "Senderseite",
    title: "Kapselung: Die Nachricht bekommt Hüllen",
    lead: "Jede Schicht ergänzt genau die Steuerinformationen, die sie für ihre Aufgabe benötigt. Die vorherigen Daten werden dabei zur Nutzlast der nächsten Schicht.",
    visual: "encapsulation",
    sections: [
      ["1 · Anwendungsdaten", "M.A.R.A.s Protokoll erzeugt RETURN:LAB. Für die Anwendung ist die Bedeutung klar; ein Netzwerk könnte damit allein aber noch nichts zustellen."],
      ["2 · TCP-Segment", "TCP ergänzt unter anderem Quell- und Zielport sowie Sequenzinformationen. Damit kann das Zielgerät die Daten dem richtigen Prozess und der richtigen Reihenfolge zuordnen."],
      ["3 · IP-Paket", "IP ergänzt Quell- und Ziel-IP. Router lesen diese Hülle, um das Paket schrittweise durch verschiedene Netze weiterzuleiten."],
      ["4 · Frame", "Für den nächsten lokalen Abschnitt entsteht ein Frame mit lokalen Adressen und Prüfinformationen. Am nächsten Router kann diese äußerste Hülle durch eine neue ersetzt werden."],
    ],
    takeaway: "Kapselung verändert die ursprüngliche Nachricht nicht. Sie legt mehrere zweckgebundene Steuerhüllen darum.",
  },
  {
    id: "decapsulation",
    kicker: "Empfängerseite",
    title: "Entkapselung: Hülle für Hülle zur Bedeutung",
    lead: "Am Ziel wird der Vorgang umgekehrt. Jede Schicht liest nur die Informationen, die für sie bestimmt sind, und gibt die verbleibende Nutzlast nach oben weiter.",
    visual: "decapsulation",
    sections: [
      ["Frame prüfen", "Die Netzzugangsschicht kontrolliert die lokale Übertragung und entfernt die Rahmeninformationen."],
      ["IP-Ziel prüfen", "Die Internetschicht erkennt, dass das Paket für diesen Rechner bestimmt ist, und reicht seine Nutzlast weiter."],
      ["Port und Reihenfolge prüfen", "Die Transportschicht setzt Daten gegebenenfalls zusammen und liefert sie an das Programm, das am Zielport wartet."],
      ["Befehl interpretieren", "Erst die Anwendung versteht RETURN:LAB als fachlichen Befehl und kann eine Aktion auslösen."],
    ],
    takeaway: "Eine Schicht muss den Inhalt tieferer oder höherer Protokolle nicht vollständig verstehen – nur ihre eigene Hülle.",
  },
  {
    id: "addresses",
    kicker: "Wer soll die Daten bekommen?",
    title: "MAC, IP, Port und Protokollrolle auseinanderhalten",
    lead: "Netzwerke verwenden mehrere Arten von Identifikatoren, weil auf jeder Ebene ein anderes Ziel gemeint ist.",
    visual: "addresses",
    sections: [
      ["MAC-Adresse · nächster lokaler Schritt", "Sie bezeichnet eine Netzwerkschnittstelle im lokalen Abschnitt. Beim Übergang über einen Router ändern sich die MAC-Adressen des Frames."],
      ["IP-Adresse · Zielrechner über Netzgrenzen", "Sie bleibt normalerweise auf dem Weg erhalten und ermöglicht Routing durch viele miteinander verbundene Netze."],
      ["Port · Zielprozess", "Mehrere Programme nutzen denselben Rechner. Der Port entscheidet, welcher Dienst die Daten erhält."],
      ["Anwendungsprotokoll · Bedeutung", "Erst die Anwendung weiß, ob die Nutzdaten einen Chattext, eine Webseitenanfrage oder einen Maschinenbefehl darstellen."],
    ],
    takeaway: "MAC findet den nächsten lokalen Empfänger, IP den Zielrechner, Port das Zielprogramm und das Anwendungsprotokoll die Bedeutung.",
  },
  {
    id: "journey",
    kicker: "Ende-zu-Ende-Reise",
    title: "Was unterwegs gleich bleibt – und was sich ändert",
    lead: "M.A.R.A.s Paket passiert einen Access Point und zwei Router. Nicht jede Hülle besitzt dabei dieselbe Lebensdauer.",
    visual: "journey",
    sections: [
      ["An den Endgeräten", "Anwendung und Transport arbeiten im Wesentlichen Ende zu Ende: M.A.R.A. spricht mit dem Laborprogramm."],
      ["An Routern", "Router interessieren sich für die IP-Zieladresse. Sie entfernen den eingehenden lokalen Frame und bauen für den nächsten Netzabschnitt einen neuen."],
      ["Auf jedem Teilstück", "WLAN, Ethernet oder Glasfaser können aufeinanderfolgen. Das IP-Paket kann diese unterschiedlichen lokalen Techniken überqueren."],
    ],
    takeaway: "Der lokale Frame wechselt an jedem Router. Ziel-IP, Ports und Anwendungsdaten reisen grundsätzlich weiter bis zum Ziel.",
  },
  {
    id: "diagnostics",
    kicker: "Reparaturstrategie",
    title: "Fehler Schicht für Schicht eingrenzen",
    lead: "Das Schichtenmodell ist kein bloßes Schaubild. Es ist ein Werkzeug, um aus einem Symptom eine sinnvolle Prüfstrategie abzuleiten.",
    visual: "diagnostics",
    sections: [
      ["Von unten nach oben prüfen", "Kommt überhaupt ein Signal oder Frame an? Ist der Zielrechner per IP erreichbar? Antwortet der erwartete Port? Versteht die Anwendung den Befehl?"],
      ["Beobachtungen statt Vermutungen", "Ein erfolgreicher Ping beweist nicht, dass ein Dienstport offen ist. Eine TCP-Verbindung beweist nicht, dass die Anwendung den Inhalt versteht."],
      ["Grenzen bewusst nutzen", "Jeder erfolgreiche Test schließt bestimmte Fehlerquellen aus. So wird aus einem großen Problem eine kleine Menge plausibler Ursachen."],
    ],
    takeaway: "Diagnose bedeutet: erst feststellen, welche Schichten funktionieren, und dann die erste fehlerhafte Grenze untersuchen.",
  },
];

const academyCheckpoint = [
  {
    text: "Ein Chatbefehl erreicht den richtigen Rechner und Port, wird dort aber nicht verstanden. Welche Ebene prüfst du?",
    options: ["Anwendung", "Transport", "Internet", "Netzzugang"],
    answer: 0,
  },
  {
    text: "Welche Information kann sich an jedem Router für den nächsten lokalen Abschnitt ändern?",
    options: ["Anwendungsbefehl", "Zielport", "IP-Ziel", "Frame-/MAC-Information"],
    answer: 3,
  },
  {
    text: "In welcher Reihenfolge kapselt ein Sender die Nachricht?",
    options: ["Daten → Segment → Paket → Frame", "Frame → Paket → Segment → Daten", "Paket → Daten → Frame → Segment"],
    answer: 0,
  },
];

const lessons = {
  trace: {
    title: "Wie Protokolle Nachrichten lesbar machen",
    intro: "Computer können nur zusammenarbeiten, wenn beide Seiten denselben Aufbau erwarten. Diese formalen Regeln nennt man Syntax.",
    why: "Ohne eindeutige Syntax kann ein Empfänger nicht entscheiden, wo ein Befehl endet und seine Daten beginnen.",
    example: "Wie bei einem Chatbefehl /nick:Alex trennt der Doppelpunkt Aktion und konkreten Wert.",
    question: "Welche Rolle spielt jedes Fragment – unabhängig davon, an welcher Stelle es gerade liegt?",
    points: ["Schlüsselwörter bezeichnen mögliche Aktionen.", "Trennzeichen grenzen Bestandteile eindeutig voneinander ab.", "Nutzdaten konkretisieren einen Befehl, etwa einen Namen oder Modus."],
    kind: "grammar",
  },
  dialogue: {
    title: "Anfrage, Antwort und Gesprächszustand",
    intro: "Ein Protokoll ist mehr als ein Nachrichtenformat. Es legt auch fest, wer beginnt und welche Nachricht in welcher Phase erlaubt ist.",
    why: "Online-Banking, Spiele und Chats müssen wissen, ob eine Verbindung gerade neu, angemeldet oder beendet ist.",
    example: "Eine Tür öffnet sich auch nicht, bevor eine Zugangskarte erkannt wurde – selbst wenn der Öffnungsbefehl korrekt ist.",
    question: "Welche Antwort verrät dir, was M.A.R.A. vor dem nächsten Befehl erwartet?",
    points: ["Der Client stellt eine Anfrage; der Server reagiert darauf.", "Eine Begrüßung kann eine Sitzung eröffnen.", "Dieselbe Nachricht kann je nach aktuellem Zustand gültig oder ungültig sein."],
    kind: "handshake",
  },
  errors: {
    title: "Fehler sind Teil des Protokolls",
    intro: "Gute Protokolle definieren eindeutige Antworten auf unvollständige, unbekannte oder verfrühte Nachrichten.",
    why: "Präzise Fehlercodes machen aus blindem Raten eine gezielte Reparatur.",
    example: "HTTP unterscheidet ebenfalls, ob etwas verboten, unbekannt oder vorübergehend nicht erreichbar ist.",
    question: "Ist die Nachricht falsch gebaut, unbekannt oder nur im falschen Moment angekommen?",
    points: ["Syntaxfehler: Der Aufbau ist unvollständig.", "Semantikfehler: Der Befehl ist unbekannt oder unpassend.", "Zustandsfehler: Die Nachricht kommt in der falschen Gesprächsphase."],
    kind: "errors",
  },
  recall: {
    title: "Eine Sitzung gezielt steuern",
    intro: "Komplexe Aktionen entstehen oft aus mehreren kleinen, bestätigten Schritten. Der nächste Schritt darf erst erfolgen, wenn sein notwendiger Zustand erreicht ist.",
    why: "Steuerprotokolle verhindern dadurch, dass Maschinen riskante Aktionen überspringen.",
    example: "Ein Drucker nimmt einen Druckauftrag erst an, nachdem Verbindung und Bereitschaft bestätigt wurden.",
    question: "Welcher bestätigte Zustand ist die Voraussetzung für deinen nächsten Schritt?",
    points: ["Antworten liefern Hinweise auf den aktuellen Zustand.", "Sicherheitskritische Aktionen benötigen Voraussetzungen.", "Ein sauberer Abschluss beendet die Sitzung eindeutig."],
    kind: "states",
  },
  stack: {
    title: "Arbeitsteilung im TCP/IP-Modell",
    intro: "Netzwerkkommunikation wird in Schichten zerlegt. Jede Schicht löst eine andere Teilaufgabe und bietet der darüberliegenden Schicht einen Dienst an.",
    why: "So kann eine Anwendung unverändert über WLAN, Kabel oder Mobilfunk kommunizieren.",
    example: "Wie bei einer Paketlieferung kümmern sich Inhalt, Zustellung, Route und Transportmittel um verschiedene Probleme.",
    question: "In welcher Reihenfolge begegnet eine Nachricht den Aufgaben auf dem Weg nach unten?",
    points: ["Oben entstehen anwendungsspezifische Nachrichten.", "In der Mitte werden Programme und Rechner adressiert.", "Unten erfolgt die konkrete Übertragung im lokalen Netz."],
    kind: "stack",
  },
  encapsulation: {
    title: "Kapselung: Eine Nachricht wird reisefertig",
    intro: "Beim Senden ergänzt jede Schicht eigene Steuerinformationen. So entsteht aus Anwendungsdaten schrittweise eine übertragbare Einheit.",
    why: "Nur mit diesen Zusatzinformationen wissen Netze, wohin Daten gehören und welches Programm sie erhalten soll.",
    example: "Ein Brief steckt im Umschlag, der Umschlag in einer Transportkiste – jede Hülle hat andere Angaben.",
    question: "Welche Information wird wann benötigt, und welche Hülle liegt am Ende ganz außen?",
    points: ["Die ursprüngliche Nachricht bleibt im Inneren erhalten.", "Jeder Header ist für eine bestimmte Schicht bestimmt.", "Am Ziel werden die Verpackungen in umgekehrter Reihenfolge ausgewertet."],
    kind: "capsule",
  },
  addresses: {
    title: "Drei Ziele auf drei Ebenen",
    intro: "Damit Daten ankommen, müssen lokaler Übertragungsschritt, Zielrechner und Zielprogramm unterschieden werden.",
    why: "Eine einzige Adresse könnte nicht gleichzeitig Gebäude, Wohnung und Empfänger unterscheiden.",
    example: "IP ähnelt der Gebäudeadresse, der Port der Wohnungsnummer und der lokale Frame dem nächsten Lieferfahrzeug.",
    question: "Welches Ziel bezeichnet die jeweilige Information tatsächlich?",
    points: ["IP-Adressen führen über Netzgrenzen zum Rechner.", "Ports unterscheiden Programme auf diesem Rechner.", "Frames und MAC-Adressen wirken im lokalen Netzabschnitt."],
    kind: "addresses",
  },
  diagnostics: {
    title: "Fehler mit dem Schichtenmodell eingrenzen",
    intro: "Statt das gesamte Netzwerk zu verdächtigen, lässt sich eine Störung anhand der betroffenen Information einer Schicht zuordnen.",
    why: "Eine gute Diagnose spart Zeit: Ein falscher Port wird nicht durch den Austausch des WLAN-Kabels repariert.",
    example: "Techniker prüfen zuerst, ob Inhalt, Dienst, Route oder lokale Verbindung betroffen ist.",
    question: "Welche Beobachtung grenzt den Fehler am stärksten ein?",
    points: ["Unbekannte Befehle betreffen die Anwendung.", "Ports und zuverlässige Übertragung gehören zum Transport.", "IP und Routing betreffen den Weg zwischen Netzen."],
    kind: "diagnostics",
  },
  osi: {
    title: "Zwei Modelle, unterschiedliche Auflösung",
    intro: "Das OSI-Modell beschreibt Kommunikation in sieben feinen Schichten. Das TCP/IP-Modell fasst mehrere dieser Aufgaben zu vier praxisnahen Bereichen zusammen.",
    why: "Beide Modelle helfen, dieselbe Kommunikation aus unterschiedlicher Detailtiefe zu beschreiben.",
    example: "Eine Landkarte und ein Stadtplan zeigen dasselbe Gebiet, bündeln Informationen aber unterschiedlich.",
    question: "Welche Aufgabe bleibt gleich, auch wenn das andere Modell sie mit weiteren Aufgaben zusammenfasst?",
    points: ["Vergleiche Aufgaben – nicht nur Schichtnummern.", "Transport und Vermittlung sind in beiden Modellen klar erkennbar.", "Anwendungsnahe und mediennahe Aufgaben werden im TCP/IP-Modell stärker gebündelt."],
    kind: "osi",
  },
};

const dialogueConfigs = {
  dialogue: {
    welcome: "RX-Kanal geöffnet. M.A.R.A. wartet auf eine gültige Sitzung.",
    commands: ["STATUS", "HELLO:TEAM7", "MODE:SAFE", "PING", "HELLO"],
    goals: [["error", "Protokollgrenze entdecken"], ["auth", "Sitzung öffnen"], ["status", "Status ermitteln"]],
  },
  recall: {
    welcome: "Direktkanal bereit. Führe M.A.R.A. kontrolliert zum Labor zurück.",
    commands: ["QUIT", "RETURN:LAB", "STATUS", "MODE:SAFE", "HELLO:TEAM7", "MODE:FAST"],
    goals: [["auth", "Anmelden"], ["status", "Lage prüfen"], ["safe", "Sicherer Modus"], ["returned", "Rückkehr starten"], ["quit", "Sitzung beenden"]],
  },
};

const missionNarrative = {
  trace: {
    before: "M.A.R.A. // …SPRACHE BESCHÄDIGT… TRENNUNG UNKLAR…",
    after: "M.A.R.A. // FRAGMENTE ERKANNT. IHR BEGINNT, MICH ZU VERSTEHEN.",
  },
  dialogue: {
    before: "LEITSTELLE // Testet nicht nur den richtigen Befehl. Findet heraus, wie M.A.R.A. auf einen falschen Zustand reagiert.",
    after: "M.A.R.A. // TEAM7 IDENTIFIZIERT. STATUSKANAL OFFEN.",
  },
  errors: {
    before: "M.A.R.A. // DREI STÖRUNGEN. DREI URSACHEN. NICHT ALLES IST EIN SYNTAXFEHLER.",
    after: "M.A.R.A. // FEHLERCODES REKONSTRUIERT. MISSVERSTÄNDNISSE SINKEN.",
  },
  recall: {
    before: "LEITSTELLE // Der Rückruf ist sicherheitskritisch. Verlasst euch auf Bestätigungen, nicht auf Vermutungen.",
    after: "M.A.R.A. // RÜCKKEHR AKTIV. ABER MEINE PAKETE VERLIEREN DEN WEG.",
  },
  stack: {
    before: "M.A.R.A. // ANWENDUNG SPRICHT. NETZWERK SCHWEIGT. VIER AUFGABEN SIND VERTAUSCHT.",
    after: "M.A.R.A. // SCHICHTEN GESTAPELT. JEDE AUFGABE HAT WIEDER IHREN ORT.",
  },
  encapsulation: {
    before: "LEITSTELLE // Eine nackte Anwendungsnachricht kann nicht reisen. Baut sie Schicht für Schicht auf.",
    after: "M.A.R.A. // FRAME BEREIT. DATEN SIND REISEFÄHIG.",
  },
  addresses: {
    before: "M.A.R.A. // ICH KENNE DAS ZIEL – ABER NICHT, OB ES RECHNER, PROGRAMM ODER NÄCHSTER HOP IST.",
    after: "M.A.R.A. // ADRESSEN GETRENNT. ZIELPROGRAMM GEFUNDEN.",
  },
  diagnostics: {
    before: "LEITSTELLE // Vier Symptome, vier Ebenen. Findet die Ursache, bevor ihr Komponenten austauscht.",
    after: "M.A.R.A. // DIAGNOSEKANAL GRÜN. FEHLER LASSEN SICH EINGRENZEN.",
  },
  osi: {
    before: "LABOR // Unser Bericht verlangt sieben OSI-Schichten. Übersetzt die reparierte TCP/IP-Sicht, ohne Aufgaben zu verlieren.",
    after: "M.A.R.A. // MODELLE SYNCHRON. ROUTE ZUM LABOR FREIGEGEBEN.",
  },
};

function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

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
    hint: "Vergleiche die Fragmente mit Wörtern und Satzzeichen: Welche Teile können allein eine Aktion benennen, welche strukturieren nur?",
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
      { id: "status", label: "STATUS", bucket: "command" },
      { id: "colon3", label: ":", bucket: "separator" },
      { id: "runaway", label: "RUNAWAY", bucket: "payload" },
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
    title: "Erster Kontakt",
    story: "Die Reihenfolge ist entscheidend. M.A.R.A. akzeptiert Befehle erst, nachdem sich die Leitstelle korrekt angemeldet hat.",
    prompt: "Entdecke eine Protokollgrenze, stelle Kontakt her und ermittle M.A.R.A.s Zustand.",
    state: "PARSER ONLINE",
    type: "dialogue",
    instruction: "Teste bewusst auch einen verfrühten oder unvollständigen Befehl. Stelle danach die Sitzung her und ermittle den Status. M.A.R.A.s Antworten sind deine Hinweise.",
    hint: "Achte auf M.A.R.A.s Fehlermeldung: Sie verrät, welche Voraussetzung für deine zuletzt gesendete Nachricht noch fehlt.",
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
    story: "Ein robustes Protokoll muss auch ungültige Nachrichten behandeln. Fünf unterschiedliche Störfälle blockieren noch den Rückrufkanal.",
    prompt: "Wähle für jeden Fehler die passende Protokollantwort.",
    state: "ERROR CHECK",
    type: "quiz",
    instruction: "Unterscheide Aufbau, Bedeutung und Gesprächszustand. Nach jeder Entscheidung bekommst du eine fachliche Rückmeldung.",
    hint: "Prüfe nacheinander drei Fragen: Ist der Aufbau vollständig? Ist das Schlüsselwort bekannt? Ist die Nachricht in dieser Phase erlaubt?",
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
      {
        text: "TEAM7 sendet „HELLO TEAM7“ ohne das vereinbarte Trennzeichen.",
        options: ["ERR:FORMAT", "ERR:UNKNOWN_COMMAND", "OK:READY"],
        answer: 0,
        explanation: "Richtig: Die Bestandteile sind erkennbar, aber der vereinbarte Nachrichtenaufbau wurde verletzt.",
      },
      {
        text: "Eine bereits angemeldete Leitstelle sendet erneut „HELLO:TEAM7“.",
        options: ["ERR:ALREADY_CONNECTED", "ERR:VALUE_MISSING", "STATUS:RUNAWAY"],
        answer: 0,
        explanation: "Richtig: Die Nachricht ist syntaktisch korrekt, passt aber nicht mehr zum aktuellen Sitzungszustand.",
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
    title: "Rückrufkanal",
    story: "Das Kommunikationsprotokoll ist verstanden. Jetzt muss TEAM7 selbst eine vollständige Befehlsfolge senden.",
    prompt: "Steuere M.A.R.A. im Live-Dialog sicher zurück zum Labor.",
    state: "CHANNEL READY",
    type: "dialogue",
    instruction: "Die Konsole akzeptiert freie Eingaben. Erreiche alle Missionsziele; verfrühte oder ungültige Befehle verändern das Gespräch nicht.",
    hint: "Lies die Zielmarken und Maschinenantworten wie eine Checkliste: Welcher Zustand muss erreicht sein, bevor eine Rückkehr gefahrlos sein kann?",
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
    prompt: "Bringe vier konkrete Netzwerkaufgaben in die Reihenfolge des TCP/IP-Stapels.",
    state: "STACK DAMAGED",
    type: "sequence",
    instruction: "Die Karten tragen absichtlich nicht nur Schichtnamen. Ordne die Aufgaben vom anwendungsnahen Schritt bis zur lokalen Übertragung.",
    hint: "Starte bei den Daten, die ein Programm versteht, und frage dann bei jeder Stufe: Was muss als Nächstes ergänzt werden, damit sie näher an das Übertragungsmedium kommen?",
    success: "Der Stapel steht. Das Schichtenmodell teilt komplexe Kommunikation in klar abgegrenzte Aufgaben.",
    sequence: [
      { id: "a", label: "RETURN:LAB als M.A.R.A.-Befehl verstehen" },
      { id: "b", label: "Daten dem Dienst auf Port 5000 zustellen" },
      { id: "c", label: "Weg zur Ziel-IP über Netze bestimmen" },
      { id: "d", label: "Frame über den nächsten WLAN-Abschnitt senden" },
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
    hint: "Stell dir mehrere Umschläge vor: Welche Information wird zuerst erzeugt, und welche Verpackung braucht man erst unmittelbar für den lokalen Transport?",
    success: "Paket montiert. Beim Empfänger werden die Ergänzungen in umgekehrter Reihenfolge wieder entfernt.",
    sequence: [
      { id: "a", label: "Kern · RETURN:LAB" },
      { id: "b", label: "Hülle · Quell-/Zielport und Sequenznummer" },
      { id: "c", label: "Hülle · Quell-/Ziel-IP und Lebensdauer" },
      { id: "d", label: "Außenhülle · MAC-Ziel und Prüfsumme" },
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
    hint: "Unterscheide vier Ziele: Bedeutung der Nachricht, Programm auf dem Zielrechner, Rechner in einem entfernten Netz und nächstes Gerät im lokalen Netz.",
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
    story: "Die Telemetrie meldet sechs Störungen. Lokalisiere jede Störung anhand der Symptome, ohne den gesamten Netzwerkstapel zu zerlegen.",
    prompt: "Bestimme für jeden Fehler die betroffene Schicht.",
    state: "DIAGNOSTICS",
    type: "quiz",
    instruction: "Wähle jeweils die Schicht, deren eigene Information oder Regel fehlerhaft ist.",
    hint: "Markiere in der Fehlermeldung das betroffene Objekt. Ist es ein Befehl, ein Dienst, ein Rechnerweg oder eine lokale Übertragung?",
    success: "Diagnose abgeschlossen. Das Schichtenmodell hilft, Fehler systematisch einzugrenzen und gezielt zu beheben.",
    questions: [
      { text: "Der Rechner ist per Ping erreichbar. Trotzdem antwortet kein Programm auf dem erwarteten Kommunikationskanal.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 1, explanation: "Richtig: Der Rechnerweg funktioniert; der nicht erreichbare Programmkanal verweist auf die Transportschicht und ihren Port." },
      { text: "Im lokalen WLAN ist alles stabil, aber jedes Paket wird am Router in das falsche Zielnetz weitergeleitet.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 2, explanation: "Richtig: Die Weiterleitung zwischen Netzen ist Aufgabe der Internetschicht." },
      { text: "Verbindung und Zustellung funktionieren. Erst M.A.R.A. meldet „UNKNOWN_COMMAND“.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 0, explanation: "Richtig: Transport und Weg funktionieren; die Bedeutung des Befehls gehört zur Anwendung." },
      { text: "Nur auf einem bestimmten Access Point treten fehlerhafte Prüfsummen in den Frames auf.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 3, explanation: "Richtig: Frames und die konkrete lokale Übertragung liegen im Netzzugang." },
      { text: "M.A.R.A. erhält Daten doppelt und in falscher Reihenfolge, obwohl die Ziel-IP stimmt.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 1, explanation: "Richtig: Reihenfolge und zuverlässige Ende-zu-Ende-Übertragung sind Transportaufgaben." },
      { text: "Nach einem Routerwechsel erreicht das Paket das richtige Zielnetz nicht mehr; lokale Frames bleiben fehlerfrei.", options: ["Anwendung", "Transport", "Internet", "Netzzugang"], answer: 2, explanation: "Richtig: Das Symptom grenzt den Fehler auf Routing und damit die Internetschicht ein." },
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
    prompt: "Ordne OSI-Schichten und konkrete Laborbeobachtungen den vier TCP/IP-Bereichen zu.",
    state: "MODEL SYNC",
    type: "categorize",
    instruction: "Ordne zuerst die sieben OSI-Schichten. Übertrage danach dasselbe Prinzip auf sechs konkrete Aufgaben aus dem Laborbericht.",
    hint: "Vergleiche die Aufgaben beider Modelle. Suche zuerst die Schichten, deren Namen oder Kernaufgaben fast identisch sind; ordne danach die übrigen als Bündel zu.",
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
      { id: "x1", label: "JSON darstellen & verschlüsseln", bucket: "app" },
      { id: "x2", label: "Sitzung nach Abbruch fortsetzen", bucket: "app" },
      { id: "x3", label: "Ende-zu-Ende über Port 5000", bucket: "transport" },
      { id: "x4", label: "Paket über Router weiterleiten", bucket: "internet" },
      { id: "x5", label: "WLAN-Frame gegen Fehler prüfen", bucket: "link" },
      { id: "x6", label: "Bits als Funksignal übertragen", bucket: "link" },
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
  prologue: $("#prologue-view"),
  hero: $("#hero-view"),
  academy: $("#academy-view"),
  mission: $("#mission-view"),
  nav: $("#mission-nav"),
  progressLabel: $("#progress-label"),
  progressBar: $("#progress-bar"),
  missionChapter: $("#mission-chapter"),
  missionTitle: $("#mission-title"),
  missionStory: $("#mission-story"),
  missionVoice: $("#mission-voice"),
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
  lessonTitle: $("#lesson-title"),
  lessonVisual: $("#lesson-visual"),
  lessonCopy: $("#lesson-copy"),
  lessonConfirm: $("#lesson-confirm"),
  puzzleCard: $("#puzzle-card"),
  academyNav: $("#academy-nav"),
  academyCompletion: $("#academy-completion"),
  academyNumber: $("#academy-module-number"),
  academyKicker: $("#academy-kicker"),
  academyTitle: $("#academy-title"),
  academyLead: $("#academy-lead"),
  academyVisual: $("#academy-visual"),
  academyBody: $("#academy-body"),
  academyInteraction: $("#academy-interaction"),
  academyFeedback: $("#academy-feedback"),
  academyPrev: $("#academy-prev"),
  academyNext: $("#academy-next"),
};

const blankState = () => ({
  mode: null,
  current: 0,
  complete: Array(missions.length).fill(false),
  signals: Array(missions.length).fill(3),
  hints: Array(missions.length).fill(false),
  lessons: Array(missions.length).fill(false),
  prologueSeen: false,
  academyModules: Array(academyModules.length).fill(false),
  layerCourseComplete: false,
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
      lessons: missions.map((_, index) => Boolean(stored.lessons?.[index] || stored.complete?.[index])),
      academyModules: academyModules.map((_, index) => Boolean(stored.academyModules?.[index] || stored.layerCourseComplete)),
      layerCourseComplete: Boolean(stored.layerCourseComplete),
    };
  } catch {
    return blankState();
  }
}

let state = loadState();
let interaction = {};
let activeIntel = "log";
let sceneIndex = 0;
let academyIndex = 0;
let academyTargetMission = null;
let academyInteraction = {};

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
      if (mission.chapterNav.startsWith("02")) {
        const courseButton = document.createElement("button");
        courseButton.type = "button";
        courseButton.className = `mission-button academy-nav-button${state.layerCourseComplete ? " completed" : ""}`;
        courseButton.innerHTML = `
          <span class="mission-index">${state.layerCourseComplete ? "✓" : "↗"}</span>
          <span class="mission-label">Grundkurs Schichtenmodell</span>
          <span class="nav-status">${state.layerCourseComplete ? icon("check") : ""}</span>
        `;
        courseButton.addEventListener("click", () => openAcademy(null));
        elements.nav.append(courseButton);
      }
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
  elements.prologue.classList.add("hidden");
  elements.academy.classList.add("hidden");
  elements.hero.classList.remove("hidden");
  elements.mission.classList.add("hidden");
  renderNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function sceneArt(kind) {
  const robot = `<svg class="scene-robot" viewBox="0 0 220 280" aria-hidden="true"><path d="M110 42V20"/><circle class="eye" cx="110" cy="16" r="7"/><rect class="head" x="49" y="46" width="122" height="82" rx="27"/><circle class="eye" cx="86" cy="86" r="9"/><circle class="eye" cx="134" cy="86" r="9"/><path d="M84 108h52M94 130v20h32v-20"/><rect class="body" x="36" y="149" width="148" height="95" rx="26"/><path d="M37 170 14 207M183 170l23 37M78 244v22M142 244v22"/></svg>`;
  if (kind === "lab") return `<div class="scene-art"><div class="lab-window"><div class="city-line"></div></div><div class="desk"></div><div class="monitor left"></div><div class="monitor right"></div><div class="alarm-wash"></div></div>`;
  if (kind === "forest") return `<div class="scene-art forest"><div class="scene-grid"></div>${robot}</div>`;
  if (kind === "signal") return `<div class="scene-art"><div class="scene-grid"></div><div class="signal-wave"></div><div class="map-node a">TEAM7</div><div class="map-node b">M.A.R.A.</div><div class="map-line one"></div></div>`;
  return `<div class="scene-art"><div class="scene-grid"></div><div class="map-line one"></div><div class="map-line two"></div><div class="map-node a">PROTOKOLL</div><div class="map-node b">OSI</div><div class="map-node c">TCP/IP</div>${robot}</div>`;
}

function renderScene() {
  const scene = prologueScenes[sceneIndex];
  $("#scene-kicker").textContent = scene.kicker;
  $("#scene-title").textContent = scene.title;
  $("#scene-text").textContent = scene.text;
  $("#scene-transmission").innerHTML = `<small>ABGEFANGENE ÜBERTRAGUNG</small>${escapeHtml(scene.transmission)}`;
  $("#scene-counter").innerHTML = prologueScenes.map((_, index) => `<span class="${index === sceneIndex ? "active" : ""}"></span>`).join("");
  $("#scene-visual").innerHTML = sceneArt(scene.art);
  $("#scene-back").disabled = sceneIndex === 0;
  $("#scene-next").textContent = sceneIndex === prologueScenes.length - 1 ? "Zur Einsatzkarte" : "Weiter";
  $("#scene-skip").classList.toggle("hidden", sceneIndex === prologueScenes.length - 1);
}

function showPrologue() {
  sceneIndex = 0;
  elements.prologue.classList.remove("hidden");
  elements.hero.classList.add("hidden");
  elements.academy.classList.add("hidden");
  elements.mission.classList.add("hidden");
  renderScene();
  renderNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function finishPrologue() {
  state.prologueSeen = true;
  saveState();
  showHero();
}

function initializeAcademyInteraction(module, completed = false) {
  const all = {
    why: ["meaning", "process", "route", "medium"],
    stack: ["app", "transport", "internet", "link"],
    encapsulation: [0, 1, 2, 3],
    decapsulation: [0, 1, 2, 3],
    addresses: ["mac", "ip", "port", "protocol"],
    journey: [0, 1, 2, 3, 4],
  };
  academyInteraction = {
    module: module.id,
    seen: new Set(completed ? (all[module.id] || []) : []),
    active: module.id === "stack" ? "app" : module.id === "addresses" ? "mac" : 0,
    checkpoint: 0,
    selected: null,
    checkpointDone: completed && module.id === "diagnostics",
    optionOrders: academyCheckpoint.map((question) => shuffle(question.options.map((_, index) => index))),
  };
}

function academyVisual(module) {
  const active = academyInteraction.active;
  if (module.visual === "analogy") {
    return `<div class="academy-analogy">
      <div class="analogy-column"><small>NETZWERK</small><strong>RETURN:LAB</strong><span>Anwendung versteht den Befehl</span><span>Transport findet das Programm</span><span>IP findet den Rechnerweg</span><span>WLAN überträgt lokal</span></div>
      <div class="analogy-bridge">↔<em>gleiche Idee</em></div>
      <div class="analogy-column mail"><small>PAKETDIENST</small><strong>Inhalt</strong><span>Abteilung wählt Empfänger</span><span>Adresse findet das Gebäude</span><span>Transporter fährt Teilstrecke</span><span>Medium bewegt das Paket</span></div>
    </div>`;
  }
  if (module.visual === "stack") {
    return `<div class="academy-stack">
      <button class="academy-layer app${active === "app" ? " active" : ""}" data-study="app"><b>4</b><span><strong>Anwendung</strong><small>Was bedeuten die Daten?</small></span><em>Nachricht</em></button>
      <button class="academy-layer transport${active === "transport" ? " active" : ""}" data-study="transport"><b>3</b><span><strong>Transport</strong><small>Welches Programm? Vollständig?</small></span><em>Segment</em></button>
      <button class="academy-layer internet${active === "internet" ? " active" : ""}" data-study="internet"><b>2</b><span><strong>Internet</strong><small>Welcher Rechnerweg?</small></span><em>Paket</em></button>
      <button class="academy-layer link${active === "link" ? " active" : ""}" data-study="link"><b>1</b><span><strong>Netzzugang</strong><small>Wie über die lokale Strecke?</small></span><em>Frame / Bits</em></button>
    </div>`;
  }
  if (module.visual === "encapsulation") {
    return `<div class="packet-workbench sending">
      <div class="packet-caption">SENDER · VON INNEN NACH AUSSEN</div>
      <div class="packet-nested">
        ${active >= 3 ? '<div class="packet-shell frame"><label>FRAME-HEADER</label>' : ""}
        ${active >= 2 ? '<div class="packet-shell ip"><label>IP-HEADER</label>' : ""}
        ${active >= 1 ? '<div class="packet-shell tcp"><label>TCP-HEADER</label>' : ""}
        <div class="packet-shell data"><label>DATEN</label><strong>RETURN:LAB</strong></div>
        ${active >= 1 ? "</div>" : ""}${active >= 2 ? "</div>" : ""}${active >= 3 ? "</div>" : ""}
      </div>
      <div class="packet-legend"><span>Je größer die Hülle, desto tiefer die Schicht.</span></div>
    </div>`;
  }
  if (module.visual === "decapsulation") {
    const remaining = 3 - Number(active);
    return `<div class="packet-workbench receiving">
      <div class="packet-caption">EMPFÄNGER · VON AUSSEN NACH INNEN</div>
      <div class="peel-stack">
        <div class="peel-layer frame${remaining < 3 ? " removed" : ""}"><strong>Frame</strong><span>${remaining < 3 ? "✓ geprüft und entfernt" : "lokale Prüfsumme & MAC"}</span></div>
        <div class="peel-layer ip${remaining < 2 ? " removed" : ""}"><strong>IP-Paket</strong><span>${remaining < 2 ? "✓ Zielrechner erkannt" : "Quell- & Ziel-IP"}</span></div>
        <div class="peel-layer tcp${remaining < 1 ? " removed" : ""}"><strong>TCP-Segment</strong><span>${remaining < 1 ? "✓ an Port zugestellt" : "Ports & Reihenfolge"}</span></div>
        <div class="peel-layer data"><strong>RETURN:LAB</strong><span>${active >= 3 ? "Anwendung versteht den Befehl" : "noch verpackte Nutzdaten"}</span></div>
      </div>
    </div>`;
  }
  if (module.visual === "addresses") {
    return `<div class="address-map">
      <div class="endpoint mara"><span>M.A.R.A.</span><small>10.0.0.7</small></div>
      <div class="network-hop"><i></i><strong>Access Point</strong><small>lokaler Frame</small></div>
      <div class="network-hop router"><i></i><strong>Router</strong><small>IP-Weiterleitung</small></div>
      <div class="endpoint lab"><span>Laborserver</span><small>203.0.113.9 : 5000</small></div>
      <div class="address-flow"><span>MAC nur bis zum nächsten Hop</span><span>IP bis zum Zielrechner</span><span>Port bis zum Zielprogramm</span></div>
    </div>`;
  }
  if (module.visual === "journey") {
    const steps = ["M.A.R.A.", "WLAN-AP", "Router A", "Router B", "Labor"];
    return `<div class="journey-map">${steps.map((label, index) => `<div class="journey-node${index <= active ? " active" : ""}"><b>${index + 1}</b><span>${label}</span>${index < steps.length - 1 ? '<i>→</i>' : ""}</div>`).join("")}</div>
      <div class="journey-facts"><span>RETURN:LAB · bleibt gleich</span><span>Port 5000 · bleibt gleich</span><span>Ziel-IP · bleibt gleich</span><span>Frame/MAC · wird pro Teilstrecke neu</span></div>`;
  }
  return `<div class="diagnostic-console">
    <div class="diagnostic-line good"><span>01</span><strong>Frame empfangen</strong><em>Netzzugang wahrscheinlich intakt</em></div>
    <div class="diagnostic-line good"><span>02</span><strong>Ping erfolgreich</strong><em>IP-Weg grundsätzlich intakt</em></div>
    <div class="diagnostic-line warn"><span>03</span><strong>Port 5000 antwortet nicht</strong><em>Transport/Dienst untersuchen</em></div>
    <div class="diagnostic-line"><span>04</span><strong>Protokollantwort ausstehend</strong><em>erst nach Verbindung prüfen</em></div>
  </div>`;
}

function renderAcademyBody(module) {
  elements.academyBody.innerHTML = `
    <div class="academy-explanations">${module.sections.map(([title, text]) => `<section><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></section>`).join("")}</div>
    <aside class="academy-takeaway"><small>MERKSATZ</small><strong>${escapeHtml(module.takeaway)}</strong></aside>
  `;
}

function renderAcademyInteraction(module) {
  const seen = academyInteraction.seen;
  if (module.id === "why") {
    const items = [
      ["meaning", "Bedeutung", "Die Anwendung versteht RETURN:LAB."],
      ["process", "Programm", "Der Port führt zum richtigen Dienst."],
      ["route", "Rechnerweg", "IP und Router finden den Zielrechner."],
      ["medium", "Teilstrecke", "WLAN oder Ethernet bewegen den Frame lokal."],
    ];
    elements.academyInteraction.innerHTML = `<h3>Vier Verantwortlichkeiten aufdecken</h3><p>Öffne alle Karten und achte darauf, dass jede Frage ein anderes Ziel hat.</p><div class="study-card-grid">${items.map(([id, title, text]) => `<button class="study-reveal${seen.has(id) ? " revealed" : ""}" data-study="${id}"><strong>${title}</strong><span>${seen.has(id) ? text : "Aufdecken"}</span></button>`).join("")}</div>`;
  } else if (module.id === "stack") {
    const info = {
      app: ["Anwendung", "Protokolle: HTTP, DNS, Chat, M.A.R.A. · Einheit: Nachricht"],
      transport: ["Transport", "Protokolle: TCP oder UDP · Einheit: Segment/Datagramm"],
      internet: ["Internet", "Protokoll: IP · Geräte: Router · Einheit: Paket"],
      link: ["Netzzugang", "Techniken: Ethernet, WLAN · Einheit: Frame und Bits"],
    }[academyInteraction.active];
    elements.academyInteraction.innerHTML = `<h3>Schichtenscanner</h3><p>Tippe im Schaubild jede Schicht an. Der Scanner zeigt typische Protokolle und Dateneinheiten.</p><div class="layer-readout"><small>AKTIVE SCHICHT</small><strong>${info[0]}</strong><span>${info[1]}</span></div><div class="seen-meter">${["app", "transport", "internet", "link"].map((id) => `<i class="${seen.has(id) ? "seen" : ""}"></i>`).join("")}<span>${seen.size} / 4 untersucht</span></div>`;
  } else if (["encapsulation", "decapsulation"].includes(module.id)) {
    const labels = module.id === "encapsulation"
      ? ["Anwendungsdaten", "TCP ergänzen", "IP ergänzen", "Frame ergänzen"]
      : ["Frame entfernen", "IP auswerten", "TCP auswerten", "Anwendung erhält Daten"];
    elements.academyInteraction.innerHTML = `<h3>${module.id === "encapsulation" ? "Verpackungsregler" : "Entpackungsregler"}</h3><p>Gehe die Verarbeitung in vier Schritten durch und beobachte, welche Informationen hinzukommen oder verschwinden.</p><div class="step-controls">${labels.map((label, index) => `<button class="step-control${academyInteraction.active === index ? " active" : ""}${seen.has(index) ? " seen" : ""}" data-study="${index}"><b>${index + 1}</b>${label}</button>`).join("")}</div>`;
  } else if (module.id === "addresses") {
    const items = {
      mac: ["MAC / Frame", "Nächste Schnittstelle im lokalen Netzabschnitt; wird an Routern neu gesetzt."],
      ip: ["IP-Adresse", "Zielrechner über Netzgrenzen hinweg; wird von Routern für die Wegwahl gelesen."],
      port: ["Port", "Zielprozess auf dem Endgerät, zum Beispiel Laborsoftware auf Port 5000."],
      protocol: ["Anwendungsprotokoll", "Bedeutung der Nutzdaten, zum Beispiel STATUS oder RETURN:LAB."],
    };
    elements.academyInteraction.innerHTML = `<h3>Adressdetektor</h3><p>Untersuche alle vier Kennzeichnungen. Formuliere dabei jeweils: „Diese Angabe findet …“</p><div class="address-tabs">${Object.entries(items).map(([id, [title]]) => `<button class="${academyInteraction.active === id ? " active" : ""}" data-study="${id}">${title}</button>`).join("")}</div><div class="address-readout"><strong>${items[academyInteraction.active][0]}</strong><p>${items[academyInteraction.active][1]}</p></div><div class="seen-meter">${Object.keys(items).map((id) => `<i class="${seen.has(id) ? "seen" : ""}"></i>`).join("")}<span>${seen.size} / 4 untersucht</span></div>`;
  } else if (module.id === "journey") {
    const notes = [
      "M.A.R.A. kapselt den Befehl vollständig. Der erste Frame ist für den Access Point bestimmt.",
      "Der Access Point transportiert den Frame im lokalen Netz; das enthaltene IP-Ziel bleibt erhalten.",
      "Router A entfernt den alten Frame, liest die Ziel-IP und erzeugt einen neuen Frame für den nächsten Hop.",
      "Router B wiederholt diesen Vorgang. Ports und Anwendungsdaten bleiben weiterhin Teil der Nutzlast.",
      "Der Laborserver entkapselt bis zur Anwendung. Erst dort wird RETURN:LAB wieder als Befehl verstanden.",
    ];
    elements.academyInteraction.innerHTML = `<h3>Paketreise abspielen</h3><p>Verfolge dasselbe Paket über fünf Stationen.</p><div class="journey-controls">${notes.map((_, index) => `<button class="${academyInteraction.active === index ? " active" : ""}${seen.has(index) ? " seen" : ""}" data-study="${index}">${index + 1}</button>`).join("")}</div><div class="journey-note">${notes[academyInteraction.active]}</div>`;
  } else {
    const question = academyCheckpoint[academyInteraction.checkpoint];
    const order = academyInteraction.optionOrders[academyInteraction.checkpoint];
    elements.academyInteraction.innerHTML = academyInteraction.checkpointDone
      ? `<div class="checkpoint-complete"><strong>Grundwissen bestätigt</strong><p>Du kannst die vier Schichten unterscheiden, Kapselung erklären und erste Fehler eingrenzen.</p></div>`
      : `<h3>Abschluss-Checkpoint ${academyInteraction.checkpoint + 1} / ${academyCheckpoint.length}</h3><p class="checkpoint-question">${question.text}</p><div class="checkpoint-options">${order.map((index) => `<button class="${academyInteraction.selected === index ? " selected" : ""}" data-checkpoint-option="${index}">${question.options[index]}</button>`).join("")}</div><button class="secondary-button checkpoint-check" id="checkpoint-check" type="button">Antwort prüfen</button>`;
  }

  $$('[data-study]').forEach((button) => button.addEventListener("click", () => {
    const raw = button.dataset.study;
    const value = /^\d+$/.test(raw) ? Number(raw) : raw;
    academyInteraction.active = value;
    academyInteraction.seen.add(value);
    elements.academyVisual.innerHTML = academyVisual(module);
    renderAcademyInteraction(module);
  }));
  $$('[data-checkpoint-option]').forEach((button) => button.addEventListener("click", () => {
    academyInteraction.selected = Number(button.dataset.checkpointOption);
    renderAcademyInteraction(module);
  }));
  const checkButton = $("#checkpoint-check");
  if (checkButton) checkButton.addEventListener("click", checkAcademyCheckpoint);
}

function academyRequirementMet(module) {
  const needed = { why: 4, stack: 4, encapsulation: 4, decapsulation: 4, addresses: 4, journey: 5 };
  if (module.id === "diagnostics") return academyInteraction.checkpointDone;
  return academyInteraction.seen.size >= needed[module.id];
}

function checkAcademyCheckpoint() {
  if (academyInteraction.selected === null) {
    showAcademyFeedback("Wähle zuerst eine Antwort aus.", "error");
    return;
  }
  const question = academyCheckpoint[academyInteraction.checkpoint];
  if (academyInteraction.selected !== question.answer) {
    showAcademyFeedback("Noch nicht. Nutze das Ausschlussprinzip: Welche Informationen funktionieren laut Beschreibung bereits?", "error");
    return;
  }
  if (academyInteraction.checkpoint === academyCheckpoint.length - 1) {
    academyInteraction.checkpointDone = true;
    renderAcademyInteraction(academyModules[academyIndex]);
    showAcademyFeedback("Checkpoint bestanden. Dein Grundwissen ist einsatzbereit.", "success");
  } else {
    academyInteraction.checkpoint += 1;
    academyInteraction.selected = null;
    renderAcademyInteraction(academyModules[academyIndex]);
    showAcademyFeedback("Richtig. Weiter zur nächsten Transferfrage.", "success");
  }
}

function showAcademyFeedback(message, kind) {
  elements.academyFeedback.textContent = message;
  elements.academyFeedback.className = `academy-feedback ${kind}`;
}

function renderAcademyNav() {
  elements.academyNav.innerHTML = academyModules.map((module, index) => {
    const unlocked = index === 0 || state.academyModules[index - 1] || state.layerCourseComplete;
    return `<button type="button" data-academy-index="${index}" class="${index === academyIndex ? "active" : ""}${state.academyModules[index] ? " complete" : ""}" ${unlocked ? "" : "disabled"}><span>${state.academyModules[index] ? "✓" : String(index + 1).padStart(2, "0")}</span>${module.title}</button>`;
  }).join("");
  $$('[data-academy-index]').forEach((button) => button.addEventListener("click", () => {
    academyIndex = Number(button.dataset.academyIndex);
    initializeAcademyInteraction(academyModules[academyIndex], state.academyModules[academyIndex]);
    renderAcademy();
  }));
}

function renderAcademy() {
  const module = academyModules[academyIndex];
  const completed = state.academyModules.filter(Boolean).length;
  elements.academyCompletion.innerHTML = `<strong>${completed} / ${academyModules.length}</strong><span>Stationen bearbeitet</span>`;
  elements.academyNumber.textContent = String(academyIndex + 1).padStart(2, "0");
  elements.academyKicker.textContent = module.kicker;
  elements.academyTitle.textContent = module.title;
  elements.academyLead.textContent = module.lead;
  elements.academyVisual.innerHTML = academyVisual(module);
  renderAcademyBody(module);
  renderAcademyInteraction(module);
  renderAcademyNav();
  elements.academyFeedback.className = "academy-feedback hidden";
  elements.academyPrev.disabled = academyIndex === 0;
  elements.academyNext.textContent = academyIndex === academyModules.length - 1 ? "Grundkurs abschließen" : state.academyModules[academyIndex] ? "Nächste Station" : "Station abschließen";
}

function openAcademy(targetMission = null) {
  academyTargetMission = targetMission;
  const firstIncomplete = state.academyModules.findIndex((done) => !done);
  academyIndex = firstIncomplete === -1 ? 0 : firstIncomplete;
  initializeAcademyInteraction(academyModules[academyIndex], state.academyModules[academyIndex]);
  elements.prologue.classList.add("hidden");
  elements.hero.classList.add("hidden");
  elements.mission.classList.add("hidden");
  elements.academy.classList.remove("hidden");
  renderAcademy();
  renderNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function advanceAcademy() {
  const module = academyModules[academyIndex];
  if (!state.academyModules[academyIndex] && !academyRequirementMet(module)) {
    const instruction = module.id === "diagnostics" ? "Löse zuerst alle drei Checkpointfragen." : "Arbeite zuerst alle interaktiven Elemente dieser Station durch.";
    showAcademyFeedback(instruction, "error");
    return;
  }
  state.academyModules[academyIndex] = true;
  if (academyIndex === academyModules.length - 1) {
    state.layerCourseComplete = true;
    saveState();
    renderNav();
    const target = academyTargetMission;
    academyTargetMission = null;
    if (target !== null) openMission(target);
    else showHero();
    return;
  }
  saveState();
  academyIndex += 1;
  initializeAcademyInteraction(academyModules[academyIndex], state.academyModules[academyIndex]);
  renderAcademy();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function start(mode) {
  state.mode = mode;
  state.prologueSeen = true;
  saveState();
  const firstIncomplete = state.complete.findIndex((done) => !done);
  openMission(firstIncomplete === -1 ? 0 : firstIncomplete);
}

function prepareInteraction(mission, completed) {
  if (mission.type === "sequence") {
    interaction = { order: completed ? mission.sequence.map((item) => item.id) : [], poolOrder: shuffle(mission.sequence.map((item) => item.id)) };
  } else if (mission.type === "categorize") {
    const assignments = {};
    if (completed) mission.tokens.forEach((token) => { assignments[token.id] = token.bucket; });
    interaction = { assignments, selected: null, poolOrder: shuffle(mission.tokens.map((token) => token.id)) };
  } else if (mission.type === "quiz") {
    interaction = {
      question: completed ? mission.questions.length - 1 : 0,
      selected: completed ? mission.questions.at(-1).answer : null,
      optionOrders: mission.questions.map((question) => shuffle(question.options.map((_, index) => index))),
    };
  } else if (mission.type === "dialogue") {
    const config = dialogueConfigs[mission.id];
    const flags = {};
    if (completed) config.goals.forEach(([key]) => { flags[key] = true; });
    interaction = {
      flags,
      history: [{ who: "SYSTEM", type: "system", message: completed ? mission.success : config.welcome }],
      commandOrder: shuffle(config.commands),
    };
  }
}

function openMission(index) {
  if (!state.mode) state.mode = "guided";
  if (!canOpen(index)) return;
  if (index >= 4 && !state.layerCourseComplete) {
    openAcademy(index);
    return;
  }
  state.current = index;
  saveState();
  activeIntel = "log";
  prepareInteraction(missions[index], state.complete[index]);
  elements.prologue.classList.add("hidden");
  elements.academy.classList.add("hidden");
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
  elements.missionVoice.innerHTML = `<span>LIVE // ${escapeHtml(missionNarrative[mission.id].before)}</span>`;
  elements.puzzleCard.dataset.mission = mission.id;
  elements.puzzlePrompt.textContent = mission.prompt;
  elements.feedback.className = "feedback hidden";
  elements.feedback.textContent = "";
  elements.check.classList.toggle("hidden", state.complete[state.current] || mission.type === "dialogue");
  elements.next.classList.toggle("hidden", !state.complete[state.current]);
  elements.next.textContent = state.current === missions.length - 1 ? "Einsatzbericht" : "Nächste Mission";
  elements.hint.disabled = state.complete[state.current] || !state.lessons[state.current];
  renderLesson();
  renderSignal();
  renderPuzzle();
  renderIntel();
  renderNav();
  renderProgress();

  if (state.complete[state.current]) {
    showMissionSuccess(mission);
  }
}

function lessonVisual(kind) {
  if (kind === "grammar") return `<div class="mini-diagram"><div class="diagram-row"><span class="diagram-box accent">BEFEHL</span><span class="diagram-arrow">:</span><span class="diagram-box">NUTZDATEN</span></div><div class="diagram-caption">Ein vereinbarter Bauplan macht Nachrichten eindeutig zerlegbar.</div></div>`;
  if (kind === "handshake") return `<div class="mini-diagram"><div class="diagram-row"><span class="diagram-box">CLIENT</span><span class="diagram-arrow">→</span><span class="diagram-box accent">ANFRAGE</span><span class="diagram-arrow">→</span><span class="diagram-box">SERVER</span></div><div class="diagram-row" style="margin-top:12px"><span class="diagram-box">CLIENT</span><span class="diagram-arrow">←</span><span class="diagram-box accent">ANTWORT</span><span class="diagram-arrow">←</span><span class="diagram-box">SERVER</span></div><div class="diagram-caption">Jede Antwort verändert, was als Nächstes möglich ist.</div></div>`;
  if (kind === "errors") return `<div class="mini-diagram"><div class="diagram-row"><span class="diagram-box">AUFBAU?</span><span class="diagram-arrow">→</span><span class="diagram-box">BEKANNT?</span><span class="diagram-arrow">→</span><span class="diagram-box">ERLAUBT?</span></div><div class="diagram-caption">Drei Prüfschritte führen zu präzisen Fehlermeldungen.</div></div>`;
  if (kind === "states") return `<div class="mini-diagram"><div class="diagram-row"><span class="diagram-box">GETRENNT</span><span class="diagram-arrow">→</span><span class="diagram-box">BEREIT</span><span class="diagram-arrow">→</span><span class="diagram-box">SICHER</span><span class="diagram-arrow">→</span><span class="diagram-box accent">RÜCKKEHR</span></div><div class="diagram-caption">Aktionen sind Übergänge zwischen Zuständen.</div></div>`;
  if (kind === "stack") return `<div class="stack-diagram"><div class="stack-layer">Anwendung · Bedeutung</div><div class="stack-layer">Transport · Programmkontakt</div><div class="stack-layer">Internet · Weg zum Rechner</div><div class="stack-layer">Netzzugang · lokale Übertragung</div></div>`;
  if (kind === "capsule") return `<div class="mini-diagram"><div class="diagram-row"><span class="diagram-box accent">DATEN</span><span class="diagram-arrow">⊂</span><span class="diagram-box">SEGMENT</span><span class="diagram-arrow">⊂</span><span class="diagram-box">PAKET</span><span class="diagram-arrow">⊂</span><span class="diagram-box">FRAME</span></div><div class="diagram-caption">Jede tiefere Schicht legt eine weitere Hülle an.</div></div>`;
  if (kind === "addresses") return `<div class="mini-diagram"><div class="diagram-row"><span class="diagram-box">LOKALES GERÄT</span><span class="diagram-arrow">→</span><span class="diagram-box">RECHNER</span><span class="diagram-arrow">→</span><span class="diagram-box accent">PROGRAMM</span></div><div class="diagram-caption">Ein Datenweg benötigt mehrere Arten von Adressen.</div></div>`;
  if (kind === "diagnostics") return `<div class="stack-diagram"><div class="stack-layer">Befehl nicht verstanden?</div><div class="stack-layer">Dienst nicht erreichbar?</div><div class="stack-layer">Rechnerweg falsch?</div><div class="stack-layer">Lokale Übertragung defekt?</div></div>`;
  return `<div class="osi-map"><div class="osi-cell">OSI 7–5 · anwendungsnah</div><div class="osi-brace">AUFGABEN<br>VERGLEICHEN</div><div class="osi-cell">TCP/IP Anwendung</div><div class="osi-cell">OSI 4 · Transport</div><div class="osi-brace">↔</div><div class="osi-cell">TCP/IP Transport</div><div class="osi-cell">OSI 3 · Vermittlung</div><div class="osi-brace">↔</div><div class="osi-cell">TCP/IP Internet</div><div class="osi-cell">OSI 2–1 · mediennah</div><div class="osi-brace">AUFGABEN<br>VERGLEICHEN</div><div class="osi-cell">TCP/IP Netzzugang</div></div>`;
}

function renderLesson() {
  const lesson = lessons[missions[state.current].id];
  const read = state.lessons[state.current];
  elements.lessonTitle.textContent = lesson.title;
  elements.lessonVisual.innerHTML = lessonVisual(lesson.kind);
  elements.lessonCopy.innerHTML = `
    <p>${escapeHtml(lesson.intro)}</p>
    <ul class="lesson-points">${lesson.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    <div class="lesson-context"><small>WARUM DAS WICHTIG IST</small><p>${escapeHtml(lesson.why)}</p></div>
    <div class="lesson-example"><small>ALLTAGSVERGLEICH</small><p>${escapeHtml(lesson.example)}</p></div>
    <div class="mission-question"><small>DEINE LEITFRAGE</small><strong>${escapeHtml(lesson.question)}</strong></div>
  `;
  elements.lessonConfirm.classList.toggle("done", read);
  elements.lessonConfirm.querySelector("span").textContent = read ? "Einsatzwissen aktiviert" : "Analyse abschließen und Aufgabe öffnen";
  elements.puzzleCard.classList.toggle("unlocked", read);
}

function confirmLesson() {
  state.lessons[state.current] = true;
  saveState();
  renderLesson();
  elements.hint.disabled = state.complete[state.current];
  elements.puzzleCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSignal() {
  const value = state.signals[state.current];
  elements.signalMeter.innerHTML = `<span class="signal-caption">Verbindungsstabilität</span>${Array.from({ length: 3 }, (_, i) => `<span class="signal-cell${i < value ? " on" : ""}"></span>`).join("")}`;
  elements.signalMeter.setAttribute("aria-label", `Verbindungsstabilität: ${value} von 3. Denkanstöße sind kostenlos.`);
}

function renderPuzzle() {
  const mission = missions[state.current];
  if (mission.type === "sequence") renderSequence(mission);
  if (mission.type === "categorize") renderCategorize(mission);
  if (mission.type === "quiz") renderQuiz(mission);
  if (mission.type === "dialogue") renderDialogue(mission);
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
      ${interaction.poolOrder.filter((id) => !chosen.has(id)).map((id) => `<button class="sequence-tile" type="button" data-add="${id}">${byId[id].label}</button>`).join("")}
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
  const byId = Object.fromEntries(mission.tokens.map((token) => [token.id, token]));
  const unassigned = interaction.poolOrder.map((id) => byId[id]).filter((token) => !interaction.assignments[token.id]);
  elements.puzzleArea.innerHTML = `
    <p class="puzzle-instruction">${mission.instruction}</p>
    <div class="tile-pool">
      ${unassigned.length ? unassigned.map((token) => `<button class="category-tile${interaction.selected === token.id ? " selected" : ""}" type="button" data-token="${token.id}">${token.label}</button>`).join("") : '<span class="puzzle-instruction">Alle Bausteine sind zugeordnet.</span>'}
    </div>
    <div class="bucket-grid">
      ${mission.buckets.map((bucket) => `
        <section class="bucket${interaction.selected ? " active" : ""}" data-bucket="${bucket.id}" role="button" tabindex="0" aria-label="${bucket.label}: ausgewählte Karte hier ablegen">
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
  $$('[data-bucket]').forEach((bucket) => bucket.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && interaction.selected) {
      event.preventDefault();
      interaction.assignments[interaction.selected] = bucket.dataset.bucket;
      interaction.selected = null;
      renderCategorize(mission);
    }
  }));
  $$('[data-return]').forEach((button) => button.addEventListener("click", () => {
    delete interaction.assignments[button.dataset.return];
    interaction.selected = button.dataset.return;
    renderCategorize(mission);
  }));
}

function renderQuiz(mission) {
  const question = mission.questions[interaction.question];
  const optionOrder = interaction.optionOrders[interaction.question];
  elements.puzzleArea.innerHTML = `
    <p class="puzzle-instruction">${mission.instruction}</p>
    <div class="quiz-progress">FALL ${interaction.question + 1} VON ${mission.questions.length}</div>
    <h3 class="quiz-question">${question.text}</h3>
    <div class="quiz-options">
      ${optionOrder.map((index) => `<button class="quiz-option${interaction.selected === index ? " selected" : ""}" type="button" data-option="${index}">${question.options[index]}</button>`).join("")}
    </div>
  `;
  $$('[data-option]').forEach((button) => button.addEventListener("click", () => {
    interaction.selected = Number(button.dataset.option);
    renderQuiz(mission);
  }));
}

function renderDialogue(mission) {
  const config = dialogueConfigs[mission.id];
  elements.puzzleArea.innerHTML = `
    <p class="puzzle-instruction">${mission.instruction}</p>
    <div class="dialogue-goals">
      ${config.goals.map(([key, label]) => `<span class="dialogue-goal${interaction.flags[key] ? " done" : ""}">${interaction.flags[key] ? "✓ " : "○ "}${label}</span>`).join("")}
    </div>
    <div class="terminal-shell">
      <div class="terminal-bar"><span class="terminal-lights"><i></i><i></i><i></i></span><span>TEAM7 // LIVE CHANNEL</span></div>
      <div class="terminal-history" id="terminal-history">
        ${interaction.history.map((entry) => `<div class="terminal-line ${entry.type}"><span class="who">${escapeHtml(entry.who)}</span><span class="message">${escapeHtml(entry.message)}</span></div>`).join("")}
      </div>
      <form class="terminal-input-row" id="terminal-form">
        <input class="terminal-input" id="terminal-input" type="text" autocomplete="off" spellcheck="false" aria-label="Nachricht an M.A.R.A." placeholder="Nachricht eingeben …" />
        <button class="terminal-send" type="submit">Senden</button>
      </form>
    </div>
    <div class="command-deck" aria-label="Abgefangene Befehlsfragmente">
      ${interaction.commandOrder.map((command) => `<button class="command-chip" type="button" data-command="${command}">${command}</button>`).join("")}
    </div>
  `;
  const history = $("#terminal-history");
  history.scrollTop = history.scrollHeight;
  $("#terminal-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#terminal-input");
    sendDialogueMessage(mission, input.value);
  });
  $$('[data-command]').forEach((button) => button.addEventListener("click", () => {
    const input = $("#terminal-input");
    input.value = button.dataset.command;
    input.focus();
  }));
}

function dialogueReply(missionId, command) {
  const flags = interaction.flags;
  if (command === "PING") return "PONG:LINK_OK";
  if (command === "HELLO") return "ERR:IDENTITY_MISSING";
  if (command === "HELLO:TEAM7") {
    flags.auth = true;
    return "OK:READY";
  }
  if (command === "STATUS") {
    if (!flags.auth) return "ERR:LOGIN_REQUIRED";
    flags.status = true;
    return "STATUS:RUNAWAY";
  }
  if (command === "MODE:SAFE") {
    if (!flags.auth) return "ERR:LOGIN_REQUIRED";
    flags.safe = true;
    return "OK:SAFE";
  }
  if (command === "MODE:FAST") {
    if (!flags.auth) return "ERR:LOGIN_REQUIRED";
    return "ERR:MODE_BLOCKED";
  }
  if (command === "RETURN:LAB") {
    if (!flags.auth) return "ERR:LOGIN_REQUIRED";
    if (!flags.safe) return "ERR:SAFE_MODE_REQUIRED";
    flags.returned = true;
    return "OK:RETURNING";
  }
  if (command === "QUIT") {
    if (missionId === "recall" && !(flags.auth && flags.status && flags.safe && flags.returned)) return "ERR:MISSION_ACTIVE";
    flags.quit = true;
    return "BYE:CHANNEL_CLOSED";
  }
  return command.includes(":") ? "ERR:UNKNOWN_COMMAND" : "ERR:VALUE_OR_COMMAND_UNKNOWN";
}

function sendDialogueMessage(mission, rawCommand) {
  if (state.complete[state.current]) return;
  const command = rawCommand.trim().toUpperCase();
  if (!command) return;
  interaction.history.push({ who: "TEAM7", type: "client", message: command });
  const response = dialogueReply(mission.id, command);
  if (response.startsWith("ERR:")) interaction.flags.error = true;
  interaction.history.push({ who: "M.A.R.A.", type: "mara", message: response });
  const config = dialogueConfigs[mission.id];
  const finished = config.goals.every(([key]) => interaction.flags[key]);
  renderDialogue(mission);
  if (finished) completeMission();
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

function showMissionSuccess(mission) {
  elements.feedback.innerHTML = `<strong>Mission gelöst.</strong><span>${escapeHtml(mission.success)}</span><em>${escapeHtml(missionNarrative[mission.id].after)}</em>`;
  elements.feedback.className = "feedback success mission-debrief";
  elements.missionVoice.innerHTML = `<span>LIVE // ${escapeHtml(missionNarrative[mission.id].after)}</span>`;
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
    const firstMismatch = interaction.order.findIndex((id, index) => id !== mission.sequence[index].id);
    const confirmed = firstMismatch === 0 ? "Schon der erste Schritt braucht eine andere Aufgabe." : `Die ersten ${firstMismatch} Schritte stimmen bereits.`;
    showFeedback(`${confirmed} Prüfe jetzt, welche Information als Nächstes benötigt wird – die konkrete Lösung bleibt bei dir.`, "error");
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
    const correctCount = mission.tokens.length - wrong.length;
    showFeedback(`${correctCount} von ${mission.tokens.length} Zuordnungen stimmen bereits. Suche bei den übrigen Karten nach dem tatsächlichen Ziel oder Aufgabenbereich.`, "error");
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
    showFeedback("Noch nicht. Streiche gedanklich zuerst alle Ebenen, die laut Situation bereits funktionieren, und entscheide dann zwischen den verbleibenden.", "error");
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
  showMissionSuccess(missions[state.current]);
  renderProgress();
  renderNav();
  if (!wasComplete && state.complete.every(Boolean)) showCompletion();
}

function showHint() {
  const mission = missions[state.current];
  if (!state.hints[state.current]) {
    state.hints[state.current] = true;
    saveState();
  }
  showFeedback(`${mission.hint} Denkanstöße verändern deine Verbindungsstabilität nicht.`, "hint");
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
  showPrologue();
}

$("#guided-start").addEventListener("click", () => start("guided"));
$("#expert-start").addEventListener("click", () => start("expert"));
$("#layer-course-button").addEventListener("click", () => openAcademy(null));
$("#replay-prologue").addEventListener("click", showPrologue);
$("#scene-back").addEventListener("click", () => {
  sceneIndex = Math.max(0, sceneIndex - 1);
  renderScene();
});
$("#scene-next").addEventListener("click", () => {
  if (sceneIndex === prologueScenes.length - 1) finishPrologue();
  else {
    sceneIndex += 1;
    renderScene();
  }
});
$("#scene-skip").addEventListener("click", finishPrologue);
$("#brand-button").addEventListener("click", showHero);
$("#back-to-map").addEventListener("click", showHero);
$("#academy-back-to-map").addEventListener("click", showHero);
$("#academy-next").addEventListener("click", advanceAcademy);
$("#academy-prev").addEventListener("click", () => {
  if (academyIndex === 0) return;
  academyIndex -= 1;
  initializeAcademyInteraction(academyModules[academyIndex], state.academyModules[academyIndex]);
  renderAcademy();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
$("#reset-button").addEventListener("click", resetGame);
$("#lesson-confirm").addEventListener("click", confirmLesson);
$("#check-button").addEventListener("click", checkAnswer);
$("#next-button").addEventListener("click", goNext);
$("#hint-button").addEventListener("click", showHint);
$("#close-completion").addEventListener("click", () => elements.dialog.close());
$$(".intel-tabs button").forEach((button) => button.addEventListener("click", () => {
  activeIntel = button.dataset.intel;
  renderIntel();
}));

renderProgress();
if (state.prologueSeen) showHero();
else showPrologue();
