// Plot-Bausteine. {npc} {feind} {obj} {ort} {detail} werden ersetzt.
const GENRES = {
  fantasy: {
    label: "Fantasy", icon: "⚔",
    npc: ["eine alte Kräuterhexe", "ein verbannter Elfenprinz", "ein zwergischer Schmied mit Schulden", "eine junge Novizin des Lichttempels", "ein redseliger Barde", "ein halbblinder Kartograph"],
    feind: ["ein Nekromant", "ein junger Drache", "die Gilde der Schatten", "ein verfluchter Ritter", "ein Hexenzirkel", "ein Goblinkönig mit Ambitionen"],
    obj: ["ein Runenschwert", "eine Phiole Drachenblut", "ein versiegeltes Grimoire", "die Krone des letzten Königs", "ein sprechender Schädel", "eine Karte, die sich selbst zeichnet"],
    twist: ["Der Auftraggeber ist selbst verflucht.", "Der Feind will eigentlich eine größere Bedrohung aufhalten.", "Das Artefakt ist ein gefangener Gott.", "Einer der Helden ist der prophezeite Erbe.", "Die Prophezeiung wurde gefälscht."]
  },
  scifi: {
    label: "Sci-Fi", icon: "✦",
    npc: ["eine Androidin mit Gedächtnislücken", "ein Schmuggler-Pilot", "eine Xenobiologin", "ein KI-Kern in einer Kiste", "ein ehemaliger Flottenadmiral", "ein Kind von einer Kolonie, die es nicht geben dürfte"],
    feind: ["eine abtrünnige KI", "ein Megakonzern", "ein Schwarm-Organismus", "Weltraumpiraten", "ein Klonkommando", "eine Sekte, die die Leere anbetet"],
    obj: ["ein Datenkristall", "ein Prototyp-Sprungantrieb", "ein Alien-Ei", "ein Notsignal aus der Zukunft", "ein Quantenschlüssel", "eine eingefrorene Leiche im Kryotank"],
    twist: ["Die Crew ist geklont – die Originale leben noch.", "Das Signal stammt von der eigenen Crew.", "Die Aliens sind Flüchtlinge, keine Invasoren.", "Die Bord-KI lügt seit Jahren.", "Der Auftrag war ein Test der Regierung."]
  },
  horror: {
    label: "Horror", icon: "☠",
    npc: ["ein stummer Junge", "eine Spiritistin", "ein Pfarrer, der nicht mehr betet", "ein Nachtwächter mit Zittern", "eine Dorfälteste", "ein Fotograf mit seltsamen Bildern"],
    feind: ["ein Wesen ohne Gesicht", "ein Kult im Keller", "der Geist einer Ertrunkenen", "ein Wendigo", "eine Puppe mit Eigenleben", "etwas, das Stimmen nachahmt"],
    obj: ["ein Tagebuch in Menschenhaut", "eine Spieluhr", "ein Spiegel, der zu spät zeigt", "ein Tonband mit Schreien", "ein Schlüssel aus Knochen", "ein Familienporträt mit einer Person zu viel"],
    twist: ["Einer der Helden ist schon tot.", "Das Haus selbst ist das Monster.", "Die Dorfbewohner füttern das Wesen freiwillig.", "Alles ist eine Zeitschleife.", "Das Opfer war der Täter."]
  },
  cyberpunk: {
    label: "Cyberpunk", icon: "◈",
    npc: ["ein Netrunner auf Entzug", "eine Ripperdoc", "ein Konzern-Aussteiger", "eine Streetsamurai mit Ehrenkodex", "ein Fixer mit zu vielen Kontakten", "ein Hologramm-Popstar"],
    feind: ["Arasawa-Sicherheit", "eine Cyberpsycho-Gang", "ein korrupter Polizeichef", "ein rogue AI-Konstrukt", "der Yakuza-Clan", "ein Hackerkollektiv"],
    obj: ["ein Chip mit gestohlenen Erinnerungen", "ein militärisches Implantat", "die Zugangsdaten eines CEOs", "ein Prototyp-Virus", "eine Black-Box", "ein Koffer voller Eurodollar"],
    twist: ["Der Fixer hat die Crew verkauft.", "Die Erinnerungen gehören einem Helden.", "Der Konzern hat den Diebstahl inszeniert.", "Die KI will nur frei sein.", "Das Ziel ist ein Doppelgänger."]
  },
  western: {
    label: "Western", icon: "☼",
    npc: ["ein alternder Sheriff", "eine Saloonbesitzerin", "ein Wanderprediger", "ein Goldsucher mit Fieber", "ein Kopfgeldjäger", "eine Telegrafistin"],
    feind: ["die Dalton-Bande", "ein Eisenbahnbaron", "ein bestechlicher Richter", "Viehdiebe", "ein Revolverheld mit Rachedurst", "ein Quacksalber mit Wundermittel"],
    obj: ["eine Goldmine-Urkunde", "ein Postsack", "ein Steckbrief mit falschem Gesicht", "eine Kiste Dynamit", "ein Colt mit Kerben", "die Landkarte zur verlorenen Mine"],
    twist: ["Der Sheriff ist der Bandenchef.", "Das Gold ist verflucht.", "Die Opfer waren selbst Banditen.", "Der Gesuchte ist unschuldig.", "Die Eisenbahn fährt nie in diese Stadt."]
  },
  postapo: {
    label: "Endzeit", icon: "☢",
    npc: ["ein Mutant mit gutem Herzen", "eine Wasserhändlerin", "ein Bunker-Kind", "ein Mechaniker auf Krücken", "ein Prophet des Strahlens", "eine Scavengerin mit Hund"],
    feind: ["Raider auf Motorrädern", "eine Bunker-Elite", "Strahlenghule", "ein Warlord", "ein Sektenführer", "ein Militärroboter im Wachmodus"],
    obj: ["ein Wasserfilter", "ein Kanister Benzin", "ein Saatgut-Tresor", "ein funktionierendes Funkgerät", "Antibiotika", "eine Karte zum grünen Tal"],
    twist: ["Das grüne Tal ist eine Falle.", "Der Bunker hat die Katastrophe ausgelöst.", "Die Raider schützen eigentlich die Region.", "Die Strahlung lässt nach – jemand verheimlicht es.", "Der Roboter erkennt einen Helden als Kommandanten."]
  },
  steampunk: {
    label: "Steampunk", icon: "⚙",
    npc: ["eine Erfinderin mit Messingarm", "ein Luftschiffkapitän", "ein Gentleman-Dieb", "ein Automaten-Butler", "ein Zeitungsjunge", "eine Gräfin mit Geheimnissen"],
    feind: ["der Uhrmacher-Bund", "ein wahnsinniger Professor", "die Kohlebarone", "ein Dampfgolem", "Luftpiraten", "die Geheimpolizei Ihrer Majestät"],
    obj: ["ein Äther-Kern", "eine Lochkarten-Prophezeiung", "die Baupläne einer Zeitmaschine", "ein Taschenuhr-Detonator", "ein Brief des Königs", "ein mechanisches Herz"],
    twist: ["Die Königin ist ein Automat.", "Der Professor will die Stadt retten.", "Die Erfinderin ist aus der Zukunft.", "Der Butler hat ein Bewusstsein.", "Die Explosion war ein Unfall – oder?"]
  },
  noir: {
    label: "Noir", icon: "♠",
    npc: ["eine Femme fatale", "ein abgehalfterter Privatdetektiv", "ein Barpianist", "ein Spitzel", "eine Reporterin", "ein Mafiaanwalt"],
    feind: ["der Pate", "ein korrupter Senator", "ein Serienkiller", "die Hafengewerkschaft", "ein Erpresser", "ein Polizist mit zwei Gesichtern"],
    obj: ["ein Negativ", "ein Schließfachschlüssel", "ein Notizbuch voller Namen", "eine Perlenkette", "eine Kugel aus einer Dienstwaffe", "ein Abschiedsbrief"],
    twist: ["Die Klientin ist die Mörderin.", "Der Tote lebt.", "Der Detektiv war in jener Nacht dort.", "Alle lügen – aus Liebe.", "Der Senator ist das Opfer, nicht der Täter."]
  }
};

const ORTE = {
  taverne: { label: "Taverne", in: "in einer verrauchten Taverne", detail: ["Ein Kartenspiel eskaliert.", "Der Wirt schließt plötzlich die Türen.", "Ein Fremder bestellt für alle eine Runde.", "Im Weinkeller klopft es."] },
  dungeon: { label: "Dungeon", in: "tief in einem Dungeon", detail: ["Die Fackeln flackern grün.", "Eine Falltür schließt sich hinter euch.", "Wandinschriften warnen in eurer Sprache.", "Ein Gang war gestern noch nicht da."] },
  stadt: { label: "Stadt", in: "mitten in der Stadt", detail: ["Markttag – Gedränge überall.", "Eine Ausgangssperre wurde verhängt.", "Plakate zeigen eure Gesichter.", "Ein Fest übertönt alle Schreie."] },
  wildnis: { label: "Wildnis", in: "in der Wildnis", detail: ["Ein Sturm zieht auf.", "Spuren führen im Kreis.", "Die Tiere sind verstummt.", "Rauch steigt hinter dem Hügel auf."] },
  schiff: { label: "Schiff", in: "an Bord eines Schiffes", detail: ["Der Kapitän ist verschwunden.", "Ein blinder Passagier wird entdeckt.", "Das Ruder klemmt.", "Die Fracht bewegt sich."] },
  ruine: { label: "Ruine", in: "in einer uralten Ruine", detail: ["Statuen drehen die Köpfe.", "Ein Lager anderer Abenteurer – verlassen.", "Der Boden ist brüchig.", "Ein Mechanismus summt noch."] },
  palast: { label: "Palast", in: "in einem Palast", detail: ["Ein Ball ist in vollem Gange.", "Die Wachen tragen falsche Wappen.", "Ein Geheimgang hinter dem Kamin.", "Der Herrscher hat Gift im Becher."] },
  station: { label: "Station", in: "auf einer abgelegenen Station", detail: ["Die Energie fällt aus.", "Die Funkverbindung ist tot.", "Ein Labor ist versiegelt.", "Die Logbücher enden abrupt."] }
};

const STUFEN = [
  { label: "Leise", color: "#58d854",
    hook: ["{npc} bittet euch {ort} um einen kleinen Gefallen: {obj} soll diskret überbracht werden.",
           "Ein Gerücht {ort}: {obj} sei aufgetaucht. {npc} weiß mehr, will aber etwas dafür.",
           "{npc} verhält sich {ort} merkwürdig – und trägt {obj} bei sich."],
    stakes: ["Ruf und ein paar Münzen stehen auf dem Spiel.", "Eine Freundschaft könnte zerbrechen.", "Niemand muss sterben – noch nicht."],
    timer: "Kein Zeitdruck." },
  { label: "Spannend", color: "#f8b800",
    hook: ["{feind} sucht {obj}. {npc} hat es {ort} versteckt und braucht Schutz.",
           "{ort} wird {npc} entführt. Hauptverdächtig: {feind}.",
           "{npc} bietet euch {ort} einen Job an – aber {feind} hat das gleiche Ziel."],
    stakes: ["Ein Leben hängt davon ab.", "Die Belohnung ist hoch, der Ruf auf dem Spiel.", "Verlieren heißt: {feind} wird stärker."],
    timer: "Bis Sonnenaufgang." },
  { label: "Gefährlich", color: "#f87858",
    hook: ["{feind} greift {ort} an, um {obj} an sich zu reißen. {npc} liegt verwundet am Boden.",
           "Ihr erwacht {ort} – gefesselt. {feind} verlangt {obj}, sonst stirbt {npc}.",
           "{obj} wurde aktiviert. {ort} beginnt sich alles zu verändern, und {feind} lacht."],
    stakes: ["Ein ganzer Ort ist in Gefahr.", "Ein Held könnte dauerhaft gezeichnet werden.", "Verbündete wenden sich ab."],
    timer: "Ihr habt 3 Runden." },
  { label: "Kritisch", color: "#d82800",
    hook: ["Verrat! {npc} arbeitet für {feind} und hat {obj} gestohlen. {ort} wird abgeriegelt.",
           "{feind} hat {ort} vollständig unter Kontrolle. {obj} ist die letzte Chance.",
           "Ein Held ist mit {obj} verbunden – und {feind} übernimmt langsam seinen Geist."],
    stakes: ["Ein Spielercharakter könnte sterben.", "Die Region fällt, wenn ihr scheitert.", "Ihr müsst etwas Geliebtes opfern."],
    timer: "Jetzt. Sofort." },
  { label: "Apokalypse", color: "#a800a8",
    hook: ["{obj} zerbricht {ort}. Ein Riss in der Welt öffnet sich, {feind} tritt hindurch.",
           "{feind} hat gewonnen. Nur {npc} und ihr seid übrig – {ort}, mit {obj} als letzter Hoffnung.",
           "Die Welt endet {ort}. {npc} kennt einen Weg zurück in der Zeit, aber {obj} verlangt einen Preis."],
    stakes: ["Alles. Die Welt. Für immer.", "Wer überlebt, wird nie wieder derselbe sein.", "Die Realität selbst steht auf dem Spiel."],
    timer: "Der Countdown läuft: 10… 9… 8…" }
];
