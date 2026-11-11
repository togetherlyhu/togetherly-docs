---
outline: deep
---

# ⚙️ Helyi fejlesztés és üzemeltetés

## Előfeltételek

- Bun 1.x;
- PostgreSQL 16, vagy Docker Compose-os PostgreSQL;
- működő SMTP-fiók;
- Cloudflare R2-kompatibilis objektumtár a fájlfeltöltésekhez;
- FFmpeg, ha nem Dockerben futtatod és videófeldolgozást használsz.

## Helyi indítás

```powershell
cd C:\projektek\togetherly
Copy-Item .env.example .env
bun install
docker compose up -d db
bun run db:push
bun dev
```

A Vite fejlesztői szerver alapértelmezés szerint a terminálban jelzett helyi címen érhető el. A Docker Compose az adatbázist a `5432`, az alkalmazáskonténert a `3000` porton publikálja.

## Környezeti változók

| Csoport | Változók | Megjegyzés |
| --- | --- | --- |
| Adatbázis | `DATABASE_URL` | Kötelező PostgreSQL-kapcsolat |
| E-mail | `SMTP_HOST`, `SMTP_FROM_EMAIL` | Kötelező az e-mail-küldéshez |
| SMTP beállítások | `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_NAME` | A port alapértéke `587`, a `SMTP_SECURE` alapértéke `false`, a küldő neve `Togetherly` |
| Alkalmazás | `APP_BASE_URL` | Kötelező; a publikus alap URL, e-mailes hivatkozásokhoz is |
| Admin | `ADMIN_EMAIL` | Opcionális; a megadott e-mail-cím automatikusan admin szerepet kaphat |
| Verzió | `APP_VERSION`, `GIT_SHA` | Opcionális telepítési verzió- és commitazonosító |
| Naplózás | `LOG_FORMAT` | `text` az alapértelmezett; `json` strukturált naplózáshoz |
| Emlékek | `MAX_MEMORIES_PER_DATE` | `0` vagy üres érték esetén nincs randinkénti korlát |
| R2 tárhely | `R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | Kötelező; az `R2_REGION` alapértéke `auto`, az `R2_ACCOUNT_ID` opcionális |
| CDN | `CDN_BASE_URL` | Opcionális, ha külön CDN-en szolgálod ki a fájlokat |

A feltöltési beállításokkal módosítható többek között a HTTP-kérés méretkorlátja (`BODY_SIZE_LIMIT`), a multipart részek mérete (`MULTIPART_PART_SIZE_MB`), a maximális képméret (`MAX_IMAGE_SIZE_MB`), videóméret (`MAX_VIDEO_SIZE_MB`), páronkénti tárhelykeret (`MAX_COUPLE_STORAGE_GB`) és az aláírt URL-ek érvényessége. A feldolgozási párhuzamosság és a videó-átkódolás beállításai szintén környezeti változókkal szabályozhatók. A teljes lista és alapértékek a `.env.example` és a `src/lib/server/config/env.ts` fájlokban találhatók.

Dockerben a `BODY_SIZE_LIMIT` alapértéke `50M`. Ez az egy HTTP-kérés (például egy feltöltési rész) méretére vonatkozik, nem a teljes fájlra; a teljes képméretet és videóméretet külön feltöltési korlát szabályozza. Ha növeled a `MULTIPART_PART_SIZE_MB` értékét, ellenőrizd, hogy a kérésméret-korlát annál nagyobb legyen.

::: danger Titkok kezelése
`.env` fájlt, SMTP-jelszót, R2-kulcsot vagy adatbázis-kapcsolati jelszót soha ne commitolj és ne írj bele felhasználói dokumentációba vagy kliensoldali kódba.
:::

## Gyakori parancsok

| Parancs | Feladat |
| --- | --- |
| `bun dev` | fejlesztői szerver hot reloaddal |
| `bun run build` | éles build |
| `bun run preview` | éles build helyi előnézete |
| `bun run check` | Svelte/TypeScript ellenőrzés |
| `bun run lint` | Prettier és ESLint ellenőrzés |
| `bun run format` | formázás |
| `bun run db:generate` | migráció generálása a séma alapján |
| `bun run db:migrate` | migráció futtatása |
| `bun run db:push` | séma szinkronizálása fejlesztéshez |
| `bun run db:studio` | Drizzle Studio |

## Konténeres futtatás

A teljes alkalmazás és az adatbázis indítása:

```powershell
docker compose up -d
```

A Compose a PostgreSQL-t a `5432`, az alkalmazást a `3000` porton teszi elérhetővé. A `Dockerfile` több lépcsőben épít: Bun-nal fordít, majd egy vékony futtatóképben indítja a `build/index.js` fájlt. A futtatókép FFmpeget is telepít. A Docker health check 30 másodpercenként a `GET /api/health` végpontot hívja.

Az indításkor a szerver ellenőrzi az adatbázist, lefuttatja a nyilvántartott migrációkat, majd elindítja az időzített takarítási feladatokat.

::: warning Docker-adatbázis jelszó
A Compose fejlesztői alapértelmezett PostgreSQL-jelszava nem biztonságos éles használatra. Éles vagy megosztott környezetben adj meg egyedi, erős `POSTGRES_PASSWORD` értéket, és gondoskodj róla, hogy az alkalmazás `DATABASE_URL` értéke ugyanazokat a hitelesítő adatokat használja.
:::
