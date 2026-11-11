// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import { NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    app.use(NolebaseGitChangelogPlugin, {
      locales: {
        'hu-HU': {
          changelog: {
            title: 'Változásnapló',
            titleId: 'valtozasnaplo',
            noData: 'Nincs friss változás.',
            lastEdited: 'Utoljára szerkesztve: {{daysAgo}}',
            lastEditedDateFnsLocaleName: 'hu',
            viewFullHistory: 'Teljes napló megtekintése',
            committedOn: ' - {{date}}',
          },
          contributors: {
            title: 'Közreműködők',
            titleId: 'kozremukodok',
            noData: 'Nincsenek közreműködők.',
          },
        },
      },
    })
  },
} satisfies Theme
