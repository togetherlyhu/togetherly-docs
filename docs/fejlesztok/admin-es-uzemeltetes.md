---
outline: deep
---

# Adminisztráció és hibaelhárítás

## Admin jogosultságok

Az admin felület a `/admin` alatt érhető el. Az `ADMIN_EMAIL` konfigurációs értékkel megadott e-mail-címhez tartozó felhasználó automatikus admin szerepet kaphat. A rendszer szerepköralapú engedélyeket is kezel; ha egy régebbi adminnak még nincs konkrét szerepe, a kompatibilitási ág teljes admin engedélykészletet ad neki.

Az engedélyek között szerepelnek felhasználói, páros, tartalmi, analitikai, napló-, értesítési, rendszer-, beállítás- és adminisztrátorkezelési műveletek. Minden admin útvonalon `requirePermission` ellenőrzést kell használni, nem csak menüpont-elrejtést.

## Admin funkciók

- párok, résztvevők, randik és emlékek áttekintése és kezelése;
- fájlok, meghívások és rendszerértesítések kezelése;
- változásnapló bejegyzéseinek szerkesztése és publikálása;
- naplók, rendszerállapot és analitika megtekintése;
- alkalmazásbeállítások, például karbantartási mód és alap URL módosítása.

::: danger Törlési hatás
Egy pár vagy résztvevő adminisztratív törlése kaszkádosan eltávolíthat kapcsolódó munkameneteket, ellenőrzőkódokat, preferenciákat, randikat, emlékeket és fotóadatokat. Éles adat törlése előtt ellenőrizd a célt és legyen helyreállítási terv.
:::

## Naplózás

A naplózó szolgáltatás kategóriát, eseményt, szintet és kéréskörnyezetet kezel. A `LOG_FORMAT` értéke `text` vagy `json`. A JSON formátum gépi feldolgozáshoz célszerű. A naplók érzékeny adatot is tartalmazhatnak, például IP-címet és user-agentet; hozzáférésüket és megőrzésüket ennek megfelelően kezeld.

## Karbantartási mód

Karbantartáskor a hook a nem admin kéréseket a karbantartási oldalra vagy 503-as JSON válaszra tereli. Az `/auth`, `/maintenance`, `/api/health` és `/admin` útvonalak kivételt képeznek. Bekapcsolás után ellenőrizd külön a normál felhasználói, admin és health-check viselkedést.

## Hibaelhárítási sorrend

1. Hívd meg a `/api/health` végpontot: külön látszik az adatbázis és objektumtár állapota.
2. Nézd meg az admin rendszerállapot és napló oldalát; keresd a kérésazonosítót és az időpontot.
3. Ellenőrizd a kötelező környezeti változókat és az SMTP/R2 hozzáférést.
4. Feltöltési hibánál ellenőrizd a fájltípust, méretet, tárhelykvótát, aláírt URL lejáratát és az R2 CORS-beállításait.
5. Adatbázis-séma hibánál ellenőrizd a migrációs naplót és futtasd a projekt által támogatott migrációs folyamatot.

## Éles kiadás ellenőrzőlista

- `bun run check`, `bun run lint` és `bun run build` sikeres;
- az adatbázis migrációi alkalmazva vannak;
- az SMTP-ből érkezik belépőkód és meghívó;
- a `/api/health` adatbázis- és tárhelyellenőrzése zöld;
- kép- és videófeltöltés, megtekintés, letöltés és lomtár ellenőrizve;
- normál felhasználó nem ér el admin útvonalat;
- karbantartási mód és visszakapcsolása tesztelve;
- titkos értékek nincsenek logban, kliensbundle-ben vagy repositoryban.
