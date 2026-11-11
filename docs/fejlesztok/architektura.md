---
outline: deep
---

# 🏗️ Architektúra és adatmodell

## 🔄 Kérésfolyamat

`src/hooks.server.ts` minden kérésnél egyedi kérésazonosítót, IP- és user-agent-környezetet állít be a naplózáshoz. Ezután a `togetherly_session` süti hashének alapján betölti a résztvevőt, a közös teret és — admin esetben — a jogosultságokat. Karbantartási módban a nem admin kéréseket korlátozza, kivéve többek között az auth, health és karbantartási útvonalakat.

## 🗄️ Adatmodell

| Entitás | Feladat |
| --- | --- |
| `couples` | közös tér és megjelenő név |
| `participants` | résztvevők, szerepek és e-mail-címek |
| `verification_codes`, `sessions` | jelszómentes belépés és munkamenetek |
| `dates`, `date_responses` | randi terve és válaszai |
| `memories`, `photos` | randihoz kötött emlékek és képek |
| `files`, `upload_sessions` | feltöltés, feldolgozás, tárolás és lomtár |
| `couple_preferences` | a tér létrehozásakor megadott ízlések |
| `app_settings` | szerveroldali beállítások |
| `logs`, `admin_notifications` | üzemeltetési naplók és riasztások |
| `changelog_entries`, `changelog_reads` | kiadási megjegyzések és olvasási állapot |
| `admin_roles`, `participant_admin_roles` | admin szerepkörök és engedélyek |

## 🔐 Autentikáció

Az ellenőrzőkód hatjegyű, SHA-256 hashként tárolódik és 10 percig él. Sikeres ellenőrzés után a szerver egy 32 véletlen byte-os token hashét tárolja; a nyers token csak a `httpOnly`, `sameSite=lax` sütiben van. A munkamenet 30 napos.

A kódkérés, ellenőrzés, újraküldés és közös tér létrehozása memóriában tárolt sebességkorlátozást használ. Ez egyetlen alkalmazáspéldányra alkalmas; több példányos futtatáshoz megosztott rate-limit tároló szükséges.

| Művelet | Korlát |
| --- | --- |
| Belépőkód kérése | 3 kérés / 15 perc |
| Belépőkód ellenőrzése | 5 próbálkozás / 15 perc |
| Kód újraküldése | 3 újraküldés / 15 perc |
| Közös tér létrehozása | 1 próbálkozás / óra |

A munkamenetsüti `secure`, `httpOnly` és `sameSite=lax` beállítású.

## 🔄 Migrációk

A Drizzle definíciókat a `schema.ts` tartalmazza, az SQL migrációk a `drizzle/` könyvtárban vannak. A `hooks.server.ts` az indulás során meghívja az `ensureMigrations()` folyamatot. Séma módosításakor generálj és ellenőrizz migrációt, majd teszteld üres és már feltöltött adatbázissal is.

## ✨ Új felhasználói funkció hozzáadása

1. Írd le a mezőket és hozzáférési szabályt a megfelelő sémában.
2. Készíts migrációt.
3. A `load` és `actions` logikában ellenőrizd a közös térhez tartozást.
4. Készíts hozzáférhető Svelte-felületet és hibaállapotot.
5. Naplózd a fontos szerveroldali műveletet; ne naplózz titkot vagy érzékeny tartalmat.
6. Frissítsd a felhasználói és ezt a fejlesztői dokumentációt.
