---
layout: page
title: 🤝 Csapatunk
description: Ismerd meg a Togetherly mögött álló csapatot és közösséget.
---

<script setup>
import {
  VPTeamMembers,
  VPTeamPage,
  VPTeamPageSection,
  VPTeamPageTitle,
} from 'vitepress/theme'

const leadership = [
  {
    avatar: 'https://github.com/matyii.png',
    name: 'Kristóf Mátyás',
    title: 'CEO',
    links: [
      {
        icon: 'github',
        link: 'https://github.com/matyii',
        ariaLabel: 'GitHub-profil',
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>',
        },
        link: 'mailto:matyas@togetherly.hu',
        ariaLabel: 'E-mail küldése',
      },
    ],
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>🤝 Csapatunk</template>
    <template #lead>
      A Togetherly mögött egy elkötelezett csapat és egy segítőkész közösség áll.
    </template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>👑 Vezetőség</template>
    <template #members>
      <VPTeamMembers size="small" :members="leadership" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>💻 Fejlesztők</template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>🧪 Hibatesztelők</template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>💬 Támogatás</template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>🙌 Segítők</template>
    <template #members>
      <div class="team-helper-card">
        <span class="team-helper-card__avatar" aria-hidden="true">?</span>
        <h3>Te is segíthetsz!</h3>
        <p>
          Hálásak vagyunk minden segítségért. Köszönjük, hogy hozzájárulsz a
          Togetherlyhez!
        </p>
      </div>
    </template>
  </VPTeamPageSection>
</VPTeamPage>

<style scoped>
.team-contact {
  margin: 12px 0 0;
  text-align: center;
}

.team-helper-card {
  box-sizing: border-box;
  max-width: 320px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.team-helper-card__avatar {
  display: grid;
  width: 72px;
  height: 72px;
  margin: 0 auto 16px;
  place-items: center;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 40px;
  font-weight: 700;
}

.team-helper-card h3 {
  margin: 0;
  border: 0;
  font-size: 16px;
}

.team-helper-card p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
