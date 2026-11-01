# M.A.R.A. – Protocol Recovery

Interaktives Lernspiel für den Netzwerkunterricht. Die Anwendung führt durch drei Abschnitte:

1. Kommunikationsprotokolle erschließen
2. Das vierstufige TCP/IP-Modell anwenden
3. Die sieben OSI-Schichten den TCP/IP-Schichten zuordnen

Die Anwendung benötigt keinen Build-Schritt. Der veröffentlichte Inhalt liegt in `dist/`.
Der Lernfortschritt wird ausschließlich im `localStorage` des verwendeten Browsers gespeichert.

## Veröffentlichung

Jeder Push auf `main` veröffentlicht den Inhalt von `dist/` automatisch über GitHub Pages.
Der Workflow liegt unter `.github/workflows/deploy-pages.yml`.

## Lokal starten

```powershell
python -m http.server 8000 --directory dist
```

Anschließend `http://localhost:8000` öffnen.
