---
outline: deep
---

# Helyi fejlesztés és üzemeltetés

## Előfeltételek

- Bun 1.x;
- PostgreSQL 16, vagy Docker Compose-os PostgreSQL;
- működő SMTP-fiók;
- Cloudflare R2-kompatibilis objektumtár a fájlfeltöltésekhez;
- FFmpeg, ha nem Dockerben futtatod és videófeldolgozást használsz.

## Helyi indítás

```powershell
cd C:\code\togetherly
Copy-Item .env.example .env
bun install
docker compose up -d db
bun run db:push
bun dev
```

A Vite fejlesztői szerver alapértelmezés szerint a terminálban jelzett helyi címen érhető el. A Docker Compose az adatbázist a `5432`, az alkalmazáskonténert a `3000` porton publikálja.

## Környezeti változók

| Csoport | Kötelező értékek | Cél |
| --- | --- | --- |
| Adatbázis | `DATABASE_URL` | PostgreSQL-kapcsolat |
| E-mail | `SMTP_HOST`, `SMTP_FROM_EMAIL` | belépőkódok és meghívók küldése |
| Alkalmazás | `APP_BASE_URL` | külső hivatkozások, e-mailes URL-ek |
| Tárhely | `R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` | médiafájlok tárolása |

Az opcionális feltöltési változók korlátozzák többek között a kép- és videóméretet, a páronkénti tárhelyet, az aláírt URL-ek és feltöltési munkamenetek idejét. Az aktuális, teljes lista és alapértékek a `.env.example` és `src/lib/server/config/env.ts` fájlokban vannak.

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

A `Dockerfile` több lépcsőben épít: Bun-nal fordít, majd egy vékony futtatóképben indítja a `build/index.js` fájlt. A futtatókép FFmpeget is telepít. A health check a `GET /api/health` végpontot hívja.

Az indításkor a szerver ellenőrzi az adatbázist, lefuttatja a nyilvántartott migrációkat, majd elindítja az időzített takarítási feladatokat.
