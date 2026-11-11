---
outline: deep
---

# 🤝 Közreműködés a dokumentációban

Szívesen fogadunk javításokat, pontosításokat és új útmutatókat. A dokumentáció forrása a repó `docs/` könyvtára; az oldal VitePress segítségével készül.

## 💡 Milyen változtatások hasznosak?

- elavult vagy pontatlan leírás javítása;
- hiányzó lépések, magyarázatok és gyakori kérdések hozzáadása;
- nehezen érthető szöveg egyszerűsítése;
- hibás hivatkozások, elgépelések és formázási problémák javítása.

Ha egy alkalmazásfunkció működése nem egyértelmű, ellenőrizd a Togetherly alkalmazás aktuális viselkedését, vagy jelezd a bizonytalanságot a változtatás leírásában. Ne dokumentálj feltételezést tényként.

## 🔄 Munkafolyamat

1. Nyiss egy hibajegyet, ha előbb egyeztetni szeretnél a változtatásról, vagy ha nagyobb útmutatót tervezel.
2. Készíts egy külön ágat a módosításaidnak.
3. Szerkeszd a megfelelő Markdown-fájlt a `docs/` alatt. A fejlesztői útmutatók a `docs/fejlesztok/`, a kiadási jegyzetek a `docs/changelog/` könyvtárban találhatók.
4. Új oldalnál adj neki egyértelmű fájlnevet, és vedd fel a `.vitepress/config.mts` megfelelő oldalsávjába. Új changelog-oldalnál frissítsd a `docs/changelog/index.md` listáját is.
5. Helyben ellenőrizd az oldalt, majd futtasd a buildet.
6. Küldj pull requestet, amelyben röviden leírod a változtatást és az elvégzett ellenőrzéseket.

## ✅ Helyi ellenőrzés

```bash
bun install
bun run docs:dev
```

Az előnézetben nézd meg a módosított oldalt és az érintett hivatkozásokat. Ezután futtasd a teljes dokumentációs buildet:

```bash
bun run docs:build
```

## 🛡️ Írási és adatvédelmi irányelvek

- A dokumentáció nyelve magyar; fogalmazz közérthetően, következetesen és tömören.
- A felhasználói útmutatók a Togetherly felületén látható elnevezéseket használják.
- Kódpéldák legyenek rövidek és működőképesek; az elérési utak általános példák legyenek, ne a saját géped könyvtárai.
- Ne adj hozzá jelszót, tokent, személyes adatot, valódi e-mail-címet vagy más titkot. Képernyőképen is takard ki az ilyen adatokat.
- A felhasználói leírásokban ne szerepeljenek belső megvalósítási részletek, kivéve, ha azok az olvasónak szükségesek.
- Őrizd meg a meglévő Markdown-formázást és a címeknél használt emoji-stílust.
