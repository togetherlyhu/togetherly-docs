---
outline: deep
---

# API, feltöltések és integrációk

Az API-k elsődlegesen a Togetherly saját klienséhez készültek; nincsenek stabil, külső fejlesztőknek verziózott publikus API-ként deklarálva. Külső kliens előtt vezess be külön API-szerződést, autentikációs modellt, verziózást és jogosultságkezelést.

## Rendszer- és naptárvégpontok

| Végpont | Módszer | Cél |
| --- | --- | --- |
| `/api/health` | `GET` | PostgreSQL- és objektumtár-ellenőrzés; `200` vagy `503` |
| `/api/calendar/[planId]` | `GET` | ICS naptárfájl előállítása egy randihoz |
| `/api/events` | `GET` | kliensoldali szerver-sent events kapcsolat |
| `/api/client-errors` | `POST` | klienshibák fogadása |

A health válasz tartalmazza az állapotot, időbélyeget, verziót, valamint külön adatbázis- és storage-ellenőrzést. Ne tedd ezt a végpontot érzékeny belső hibaüzenetek nyilvános forrásává.

## Feltöltési folyamat

A média multipart feltöltéssel kerül az R2-be. A folyamatot a kliensoldali `src/lib/client/upload.ts` használja.

1. `POST /api/upload/init` JSON törzzsel: `fileName`, `fileSize`, `mimeType`, `entityType`, opcionális `entityId`.
2. A szerver ellenőrzi a belépett résztvevőt és közös teret, sebességkorlátot alkalmaz, létrehoz egy fájl- és feltöltési munkamenet-rekordot, majd visszaadja a feltöltéshez szükséges adatokat.
3. A kliens feltölti a részeket az aláírt URL-ekre és gyűjti az ETag értékeket.
4. `POST /api/upload/complete` JSON törzzsel: `uploadSessionId` és a nem üres `parts` tömb, amely minden eleménél szerepel `partNumber` és `etag`.
5. A szerver befejezi a multipart feltöltést, majd a háttérfeldolgozás létrehozza a szükséges változatokat és metaadatokat.

### Feltöltési korlátok és érvényesség

A szerveroldali konfiguráció alapértékei szerint a maximális képméret 10 MB, videóméret 100 MB, a páronkénti tárhely 5 GB. Az `init` végpont a páronkénti feltöltési sebességet is korlátozza. Ezek telepítésenként módosíthatók, ezért a kliens ne feltételezzen rögzített értékeket.

A validáció támogatott formátumai jelenleg JPEG, PNG, HEIC, MP4 és MOV. A szerver a fájl tényleges bájtsorát is ellenőrzi, nem csak a böngésző által küldött MIME-típust. A víruskeresés ClamAV-val próbál futni; ha a bináris nem érhető el, a jelenlegi megvalósítás figyelmeztetést naplóz és a szkennelést átugorja.

## Fájlműveletek

| Végpont | Módszer | Művelet |
| --- | --- | --- |
| `/api/files/[fileId]` | `GET` | saját közös térhez tartozó fájl metaadata |
| `/api/files/[fileId]` | `DELETE` | alapértelmezésben soft delete; `?permanent=true` esetén végleges törlés |
| `/api/files/[fileId]` | `POST` | lomtárból visszaállítás |
| `/api/files/[fileId]/url` | `GET` | időkorlátos megtekintési vagy letöltési URL |
| `/api/files/trash` | `GET` | lomtár listája |
| `/api/files/quota` | `GET` | tárhelyhasználat és keret |

Minden fájlvégpont a `coupleId` alapján ellenőrzi, hogy a kért elem a belépett felhasználó közös teréhez tartozik-e. Ezt új végpontban is kötelező megtartani.

## Háttérmunka és takarítás

Az indítás után fél perccel, majd óránként fut a takarító. Lezárja a lejárt feltöltési munkameneteket, eltávolítja a lejárt lomtárban lévő objektumokat, és hibásnak jelöli az egy óránál régebb óta függő feldolgozásokat.

::: warning Megosztott futtatási környezet
A háttérfolyamat alkalmazáspéldányonként indul. Horizontális skálázásnál gondoskodj egyetlen ütemezőről vagy elosztott zárról, különben ugyanaz a feladat több példányban is lefuthat.
:::
