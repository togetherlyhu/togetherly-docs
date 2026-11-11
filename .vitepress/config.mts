
import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { defineConfig } from 'vitepress'

import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

const hasGitRepository = existsSync(join(process.cwd(), '.git'))

// ==========================================
// TOGETHERLY DOCUMENTATION
// togetherly.hu
// ==========================================

export default defineConfig({
  srcDir: 'docs',

  // Site identity
  lang: 'hu-HU',
  title: 'Togetherly Docs',
  description:
    'A Togetherly dokumentációja - minden, amit a közös pillanatok megtervezéséről, megőrzéséről és megéléséről tudni érdemes.',
  cleanUrls: true,
  // Metadata and branding
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#e8749e' }],
    ['meta', { name: 'author', content: 'Togetherly' }],
    ['meta', { name: 'application-name', content: 'Togetherly' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Togetherly' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Togetherly' }],
    ['meta', { property: 'og:title', content: 'Togetherly Docs' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Minden információ a Togetherly használatáról és funkcióiról.',
      },
    ],
    ['meta', { property: 'og:image', content: '/logo.png' }],

    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'Togetherly Docs' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content: 'A Togetherly hivatalos dokumentációja.',
      },
    ],
  ],

  sitemap: {
    hostname: 'https://docs.togetherly.hu'
  },



  vite: {
    plugins: hasGitRepository
      ? [
          GitChangelog({
            repoURL: () => 'https://github.com/togetherlyhu/togetherly-docs',
            mapAuthors: [
              {
                name: 'matyii',
                username: 'matyii',
                mapByNameAliases: ['matyii'],
              },
            ],
          }),
          GitChangelogMarkdownSection(),
        ]
      : [],
  },


  // ==========================================
  // THEME CONFIGURATION
  // ==========================================

  themeConfig: {
    // Logo
    logo: '/logo.png',
    siteTitle: 'Togetherly Docs',

    // Navigation
    nav: [
      {
        text: 'Kezdőlap',
        link: '/',
      },
      {
        text: 'Felhasználóknak',
        link: '/elso-lepesek',
      },
      {
        text: 'Fejlesztőknek',
        link: '/fejlesztok/attekintes',
      },
      {
        text: 'Csapatunk',
        link: '/csapatunk',
      },
      {
        text: 'Changelog',
        link: '/changelog/',
      },
      {
        text: 'togetherly.hu',
        link: 'https://togetherly.hu',
      },
    ],

    // Sidebar
    sidebar: [
      {
        text: '🚀 Kezdetek',
        collapsed: false,
        items: [
          { text: 'Üdvözlünk', link: '/welcome' },
          { text: 'Csapatunk', link: '/csapatunk' },
        ],
      },
      {
        text: '👥 Felhasználói útmutató',
        collapsed: false,
        items: [
          {
            text: 'Első lépések',
            link: '/elso-lepesek',
          },
          {
            text: 'Bejelentkezés és közös tér',
            link: '/fiok-es-kozos-ter',
          },
          {
            text: 'Randi tervezése',
            link: '/randi-tervezese',
          },
          {
            text: 'Naptár és randiállapotok',
            link: '/naptar-es-randik',
          },
          {
            text: 'Emlékek és galéria',
            link: '/emlekek-es-galeria',
          },
          {
            text: 'Profil és beállítások',
            link: '/profil-es-beallitasok',
          },
          {
            text: 'Gyakori kérdések',
            link: '/gyik',
          },
        ],
      },
      {
        text: '💻 Fejlesztői kézikönyv',
        collapsed: false,
        items: [
          { text: 'Áttekintés', link: '/fejlesztok/attekintes' },
          { text: 'Helyi fejlesztés és üzemeltetés', link: '/fejlesztok/telepites' },
          { text: 'Architektúra és adatmodell', link: '/fejlesztok/architektura' },
          { text: 'API, feltöltések és integrációk', link: '/fejlesztok/api-es-feltoltesek' },
          { text: 'Adminisztráció és hibaelhárítás', link: '/fejlesztok/admin-es-uzemeltetes' },
          { text: 'Közreműködés a dokumentációban', link: '/fejlesztok/kozremukodes' },
        ],
      },
      {
        text: '🎉 Changelog',
        collapsed: false,
        items: [
          { text: 'Áttekintés', link: '/changelog/' },
          { text: 'v0.2.2', link: '/changelog/v0-2-2' },
          { text: 'v0.2.1', link: '/changelog/v0-2-1' },
          { text: 'v0.2.0', link: '/changelog/v0-2-0' },
          { text: 'v0.1.2', link: '/changelog/v0-1-2' },
          { text: 'v0.1.1', link: '/changelog/v0-1-1' },
          { text: 'v0.1.0', link: '/changelog/v0-1-0' },
          { text: 'v0.0.1', link: '/changelog/v0-0-1' },
        ],
      },
    ],

    // Search
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Keresés',
                buttonAriaLabel: 'Keresés',
              },
              modal: {
                noResultsText: 'Nincs találat erre:',
                resetButtonTitle: 'Keresés törlése',
                footer: {
                  selectText: 'Kiválasztás',
                  navigateText: 'Navigálás',
                  closeText: 'Bezárás',
                },
              },
            },
          },
        },
      },
    },

    // Table of contents
    outline: {
      label: 'Ezen az oldalon',
      level: [2, 3],
    },

    // Last updated
    lastUpdated: {
      text: 'Utolsó frissítés',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },

    // Edit links
    editLink: {
      pattern:
        'https://github.com/togetherlyhu/togetherly-docs/edit/main/docs/:path',
      text: 'Oldal szerkesztése GitHubon',
    },

    // Social links
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/togetherlyhu',
      },
    ],


    // Back to top
    returnToTopLabel: 'Vissza az oldal tetejére',

    // Sidebar labels
    sidebarMenuLabel: 'Menü',

    // Dark mode switch
    darkModeSwitchLabel: 'Megjelenés',

    // Mobile menu
    docFooter: {
      prev: 'Előző oldal',
      next: 'Következő oldal',
    },
  },
})
