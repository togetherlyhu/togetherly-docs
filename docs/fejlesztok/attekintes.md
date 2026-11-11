---
outline: deep
---

# 💻 Fejlesztői áttekintés

Ez a dokumentáció a `togetherly` kódbázis 2026. novemberi állapotát írja le. A Togetherly egy SvelteKit-alapú, magyar nyelvű alkalmazás párok közös randitervezéséhez, emlékeihez és médiájához.

## Technológiai alapok

| Terület | Megoldás |
| --- | --- |
| Webalkalmazás | SvelteKit 2, Svelte 5 runes, TypeScript |
| Stílus | Tailwind CSS 4 és komponensszintű CSS |
| Futási környezet | Bun / Node-kompatibilis SvelteKit build |
| Adatbázis | PostgreSQL 16, Drizzle ORM, `pg` driver |
| E-mail | Nodemailer + SMTP |
| Objektumtár | Cloudflare R2, AWS S3 SDK-kompatibilis kliens |
| Médiafeldolgozás | Sharp, FFmpeg a konténerben |
| Naptár | `ical-generator`, ICS és Google Naptár-hivatkozás |
| Ikonok és animáció | Lucide, Motion for Svelte |
| Kódminőség | TypeScript, Svelte Check, ESLint, Prettier |

## Fő alkalmazási területek

- **Belépés:** e-mailes, hatjegyű, időkorlátos ellenőrzőkód; nincsenek jelszavak.
- **Közös tér:** `couples` és `participants` entitások határolják a párok adatait.
- **Randik:** 12 lépéses varázsló, randiállapotok, naptárnézet és export.
- **Emlékek és média:** randihoz kötött emlékek, valamint közös galéria képeknek és videóknak.
- **Üzemeltetés:** admin felület, jogosultságok, értesítések, naplózás, rendszerállapot és karbantartási mód.

## Fontos belépési pontok

| Hely | Szerepe |
| --- | --- |
| `src/hooks.server.ts` | indítási egészségellenőrzés, migráció, munkamenet, karbantartási kapu |
| `src/lib/server/db/schema.ts` | Drizzle séma és entitások |
| `src/lib/server/services/` | autentikáció, e-mail, naptár, feltöltés, feldolgozás, naplózás |
| `src/routes/` | SvelteKit oldalak, szerveroldali betöltők és form actionök |
| `src/lib/data/questions.ts` | randitervező magyar szövegei és opciói |
| `drizzle/` | verziózott SQL migrációk |

## Alapelvek

Az alkalmazás pár-központú: a randik és fájlok `coupleId` alapján vannak elhatárolva. Az adatot érintő oldalak a szerveroldali `locals.participant` és `locals.couple` kontextusra támaszkodnak. Új funkciónál ezt a hozzáférés-ellenőrzést a szerveren is meg kell tartani; a kliensoldali elrejtés önmagában nem jogosultsági védelem.

Folytatás: [helyi fejlesztés és telepítés](/fejlesztok/telepites).
