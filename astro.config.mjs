// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import icon from 'astro-icon'
import sentry from '@sentry/astro'
import dotenv from 'dotenv'
import vue from '@astrojs/vue'
import { enhanceConfigForWorkspace } from './scripts/workspace-config.js'

dotenv.config()

// Vite configuration with environment variables
const viteConfig = {
  // Make environment variables available to client-side code
  define: {
    'import.meta.env.GITHUB_TOKEN': JSON.stringify(process.env.GITHUB_TOKEN),
  },
}

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/': 'getting-started/introduction', // Redirects the root URL
  },
  vite: enhanceConfigForWorkspace(viteConfig),
  integrations: [
    starlight({
      title: 'Accessible Astro Documentation',
      logo: {
        light: './src/assets/forwardkind-logo.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      editLink: {
        baseUrl: 'https://github.com/incluud/astro-docs/edit/main/',
      },
      components: {
        Head: './src/components/Head.astro',
      },
      sidebar: [
        {
          label: 'Getting started',
          items: [
            {
              label: 'Introduction',
              link: '/getting-started/introduction',
            },
            {
              label: 'How to use this portal',
              link: '/getting-started/how-to-use-this-portal',
            },
            {
              label: 'How to get involved',
              link: '/getting-started/how-to-get-involved',
            },
          ],
        },
        {
          label: 'About Us',
          items: [
            {
              label: 'Mission, Vision & Values',
              link: '/about-us/mission-vision-values',
            },
            {
              label: 'Co-op Structure & Model',
              link: '/about-us/coop-structure-model',
            },
            {
              label: 'Legal Documents & Policies',
              link: '/about-us/legal-documents-policies',
            },
          ],
        },
        {
          label: 'Membership',
          items: [
            {
              label: 'About Membership',
              link: '/membership/about-membership',
            },
            {
              label: 'Member Benefits',
              link: '/membership/member-benefits',
            },
            {
              label: 'Community Expectations',
              link: '/membership/community-expectations',
            },
          ],
        },
        {
          label: 'Governance',
          items: [
            {
              label: 'About Governance',
              link: '/governance/about-governance',
            },
            {
              label: 'Decision Making',
              link: '/governance/decision-making',
            },
            {
              label: 'Change & Amendments',
              link: '/governance/change-amendments',
            },
            {
              label: 'Accountability',
              link: '/governance/accountability',
            },
            {
              label: 'Financial Transparency',
              link: '/governance/financial-transparency',
            },
          ],
        },
        {
          label: 'Resources',
          items: [
            {
              label: 'Glossary',
              link: '/resources/glossary',
            },
            {
              label: 'Learning & Education',
              link: '/resources/learning-education',
            },
            {
              label: 'Tools We Use',
              link: '/resources/tools-we-use',
            },
            {
              label: 'Brand Guidelines',
              link: '/resources/brand-guidelines',
            },
            {
              label: 'Site Accessibility',
              link: '/resources/site-accessibility',
            },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
    icon(),
    sentry({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT,
      sourceMapsUploadOptions: {
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
    vue(),
  ],
})
