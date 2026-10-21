# VYBE — Ultimate Music Player

VYBE is a local-first browser music player. It is built with plain HTML, CSS and JavaScript and does not need a frontend build step or any npm packages.

## Starten

**Voraussetzung:** Node.js 18 oder neuer.

1. Entpacke den Ordner `ultimate_music_player`.
2. Öffne ihn in Visual Studio Code.
3. Öffne das Terminal in diesem Ordner.
4. Führe `npm start` aus.
5. Öffne **http://127.0.0.1:4173** im Browser.
6. Beende den lokalen Server später mit `Ctrl+C`.

Du kannst den Ordner auch mit einer VS-Code-Erweiterung wie Live Server öffnen. Der lokale Server aus diesem Projekt ist aber bereits enthalten. Starte die Website nicht per Doppelklick auf `index.html`: `localhost` ist zuverlässiger für IndexedDB und den Service Worker.

## Enthaltene Funktionen

- Dark-first UI, optionales Light Theme, Akzentfarben, Animationen mit Reduce-Motion-Einstellung sowie responsive PC-/Tablet-/Mobile-Layouts.
- Lokale Audio-Importe über Dateiauswahl oder Drag-and-drop; mehrere Dateien, Duplikatprüfung anhand Name und Dateigröße, Ermittlung der Audiodauer soweit der Browser dies unterstützt.
- Speicherung von Metadaten, Playlists, Favoriten, Wiedergabeverlauf und Warteschlange in IndexedDB; Einstellungen werden zusätzlich in localStorage gespeichert.
- Songs abspielen, pausieren, vorheriger/nächster Titel, Such-/Zeitregler, Lautstärke, Stummschaltung, Shuffle, Repeat off/all/one, Queue mit Entfernen und Sortieren, Sleep Timer.
- Eigene Playlists erstellen, umbenennen, Cover setzen, Tracks hinzufügen/entfernen, per Buttons oder Drag-and-drop sortieren, löschen.
- YouTube-Einzelvideos per Link speichern und mit dem offiziellen YouTube IFrame Player abspielen; unterstützt übliche `watch`, `youtu.be`, `shorts`, `embed` und `live`-Links.
- Best-effort Metadatenabruf über den YouTube-oEmbed-Endpunkt; Titel und Kanal können manuell eingegeben werden, falls der Abruf blockiert wird.
- Suche über lokal gespeicherte Track- und Playlist-Metadaten, Trackmenüs, Favoriten, Historie, Songdetails, JSON-Export und JSON-Import.
- Media Session, Tastaturkürzel, PWA-Manifest und Offline-Caching der App-Shell auf unterstützten Browsern.

## Was nicht automatisch möglich ist

- **YouTube-Playlist-Import:** Der Import aller Videos einer kompletten Playlist ist nicht eingerichtet. Dafür muss ein YouTube Data API v3-Schlüssel konfiguriert werden. Es wird absichtlich kein API-Schlüssel im Frontend versteckt oder vorgetäuscht. Einzelne Videolinks können ohne diesen Schlüssel gespeichert werden.
- **YouTube-Einbettung:** Manche Videos erlauben kein eingebettetes Abspielen oder sind regional/privat/nicht verfügbar. VYBE umgeht solche Einschränkungen nicht. Öffne das Video in solchen Fällen direkt auf YouTube.
- **Hintergrundwiedergabe:** Sie hängt von Browser, Gerät, Energieeinstellungen und YouTube ab. Sie ist nicht auf jedem Smartphone garantiert.
- **Cloud-Synchronisierung/Accounts:** Es ist kein Backend eingerichtet. Bibliothek und Einstellungen werden nur lokal in diesem Browser gespeichert.
- **Audio-Metadaten/Cover:** Die Grundversion liest keine eingebetteten ID3-/FLAC-Cover aus. Der Dateiname wird als Titel verwendet; Dauer wird abgefragt, soweit der Browser die Datei lesen kann. Cover für Playlists lassen sich selbst auswählen.
- **JSON-Backup:** Exportiert Bibliotheksmetadaten, Playlistdaten, Favoriten, Verlauf, Queue und Einstellungen. Lokale Audio-Binärdaten werden nicht in die JSON-Datei aufgenommen. Nach Wiederherstellung müssen solche Audio-Dateien gegebenenfalls erneut importiert werden.
- **Offline:** Der Service Worker cached nur die App-Shell. YouTube und externe Thumbnails brauchen Internet; installierte PWA bedeutet nicht automatisch Offline-Zugriff auf YouTube.

## Wo Daten gespeichert werden

- `IndexedDB` unter der Browser-Origin `http://127.0.0.1:4173`: Trackdaten, Playlists, Favoriten, Verlauf, Queue und lokale Audio-Blobs.
- `localStorage`: kleinere Einstellungen wie Theme, Akzentfarbe, Lautstärke und letzter Bereich.
- Nichts wird zu einem VYBE-Server hochgeladen. Der lokale Webserver liefert nur die statischen Dateien aus.
- Wenn du Browserdaten dieser Origin löschst, kann die lokale Bibliothek ebenfalls gelöscht werden. Exportiere vor einer Browserbereinigung ein Backup.

## Bedienung

- `Space`: Play/Pause
- `←` / `→`: 10 Sekunden zurück/vor
- `↑` / `↓`: Lautstärke +/− 5
- `N` / `P`: nächster/vorheriger Titel
- `M`: stummschalten
- `F`: aktuellen Titel favorisieren
- `Ctrl+K` bzw. `⌘K`: Suche fokussieren

Tastenkürzel werden ignoriert, während du in Textfeldern schreibst.

## Kompatibilität und Tests

Am besten in einem aktuellen Desktop-Browser testen. Eingebettetes YouTube benötigt Internet. Audioformate hängen von der Browser-Unterstützung ab. `npm start` startet einen einfachen lokalen statischen Server auf `127.0.0.1:4173`; es gibt keine Backend-API und keine externen npm-Abhängigkeiten.
