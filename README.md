# Togetherly dokumentáció

A Togetherly dokumentációs webhelye magyar nyelvű útmutatókat tartalmaz az alkalmazás felhasználói és fejlesztői számára. Az oldal VitePress-alapú, tartalma a `docs/` könyvtárban található.

## Tartalom

- `docs/` — felhasználói útmutatók és changelog
- `docs/fejlesztok/` — fejlesztői, telepítési, üzemeltetési és közreműködési útmutatók
- `.vitepress/config.mts` — az oldal nyelve, navigációja, oldalsávja és megjelenése

## Helyi fejlesztés

### Előfeltétel

- [Bun](https://bun.sh/)

### Telepítés és indítás

```bash
bun install
bun run docs:dev
```

A VitePress kiírja a terminálba a helyi előnézet címét.

## Ellenőrzés és előnézet

```bash
# A dokumentáció buildelése
bun run docs:build

# A buildelt oldal helyi előnézete
bun run docs:preview
```

## Dokumentáció szerkesztése

Részletes útmutatóért olvasd el a [közreműködési útmutatót](./docs/fejlesztok/kozremukodes.md).

1. A felhasználói útmutatókat és changelog-oldalakat a `docs/` alatt módosítsd.
2. A fejlesztői kézikönyv oldalai a `docs/fejlesztok/` könyvtárban vannak.
3. Új changelog-oldal hozzáadásakor frissítsd a `docs/changelog/index.md` fájlt és a `.vitepress/config.mts` changelog-oldalsávját is.
4. A változtatás után futtasd a `bun run docs:build` parancsot.

A parancsokban és útmutatókban használj általános példákat; ne írj bele saját gépre jellemző elérési utakat, titkokat vagy valódi hitelesítő adatokat.
