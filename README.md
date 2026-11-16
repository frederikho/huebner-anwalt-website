# Website Rechtsanwalt Dr. jur. Andreas Hübner

Statische Website, derzeit erreichbar unter **https://huebneradvocate.com**.

Kein Build-Schritt, kein Framework, keine Datenbank, keine Server-Logik — reines
HTML, CSS und etwas JavaScript. Die Dateien können unverändert auf jeden
Webspace gelegt werden.

## Aufbau

```
index.html                  Startseite (alle Abschnitte auf einer Seite)
gluecksspielrecht.html      Unterseite Glücksspielrecht
veroeffentlichungen.html    Archiv der Veröffentlichungen und Medienbeiträge
impressum.html              Impressum
datenschutz.html            Datenschutzerklärung
widerruf.html               Widerrufsbelehrung
CNAME                       Wunschdomain für GitHub Pages (siehe unten)

assets/
  style.css                 gesamtes Layout, ein einziges Stylesheet
  i18n.js                   Umschalter Deutsch / Englisch
  i18n-data.js              sämtliche Übersetzungen
  hero.jpg                  Titelbild
  distilex-icon.svg
  images/                   Standort- und Kanzleibilder
  images/publikationen/     Abbildungen im Veröffentlichungsarchiv
                            (gross/ enthält die Fassung für die Detailansicht)

raw/                        Archivkopien der früheren Jimdo-Seite, nur als
                            Referenz — für den Betrieb nicht erforderlich
```

## Texte ändern

Die Seiten sind zweisprachig. Jedes übersetzte Element trägt ein Attribut
`data-i18n="schlüssel"`, der deutsche Text steht direkt im HTML, die englische
Fassung in `assets/i18n-data.js`, nach Seite gruppiert.

**Wichtig:** Wird ein Text im HTML geändert, muss der zugehörige Eintrag in
`i18n-data.js` mitgeändert werden — sonst springt die Seite beim Sprachwechsel
auf den alten Stand zurück. Attribute wie `alt` oder `content` werden über
`data-i18n-attr="alt:schlüssel"` übersetzt.

Die Sprache wird aus der Browsereinstellung abgeleitet und in `localStorage`
unter `siteLang` gemerkt.

## Hosting

### Variante A — beliebiger Webspace

Alle Dateien per FTP in das Wurzelverzeichnis legen. Es wird nichts weiter
benötigt. Die Datei `CNAME` ist dann überflüssig und kann gelöscht werden.

### Variante B — GitHub Pages (aktueller Stand)

So läuft die Seite bisher: kostenlos, ohne eigenen Server.

1. Öffentliches Repository anlegen und die Dateien hineinlegen.
2. Unter `Settings → Pages` als Quelle den Branch `main`, Ordner `/ (root)`
   wählen.
3. Unter `Settings → Pages → Custom domain` die Domain eintragen. GitHub
   schreibt den Wert in die Datei `CNAME` im Repository — beides muss
   übereinstimmen.
4. `Enforce HTTPS` aktivieren, sobald das Zertifikat ausgestellt ist (dauert
   meist wenige Minuten).

Beim Hostingwechsel zu GitHub Pages müssen beim Domainanbieter folgende
DNS-Einträge gesetzt sein:

| Typ   | Name | Wert |
|-------|------|------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | `BENUTZERNAME.github.io` |

Beim `CNAME`-Eintrag für `www` ist der GitHub-Benutzername desjenigen
einzutragen, dem das Repository gehört.

## Lokal ansehen

Ein Doppelklick auf `index.html` genügt für einen ersten Eindruck. Weil der
Sprachumschalter `localStorage` verwendet, ist ein kleiner lokaler Server
sauberer:

```
python3 -m http.server 8000
```

Danach `http://localhost:8000` im Browser öffnen.

## Externe Abhängigkeiten

Einzige Abhängigkeit sind die Schriften **Libre Caslon Text** und
**Source Sans 3** von Google Fonts, eingebunden über `<link>` im Kopf jeder
Seite. Sollen gar keine Daten an Google fließen, können die Schriftdateien
heruntergeladen, in `assets/` abgelegt und per `@font-face` eingebunden werden.

Weitere Dienste, Tracker, Cookies oder Analyse-Werkzeuge sind nicht eingebunden.
