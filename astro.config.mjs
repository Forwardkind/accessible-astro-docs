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
        light: './src/assets/logo-light.svg',
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
              label: 'Who This is For',
              link: '/getting-started/accessibility',
            },
            {
              label: 'How to Use This Portal',
              link: '/getting-started/accessibility-testing',
            },
            {
              label: 'Our Commitment',
              link: '/getting-started/quick-start',
            },
            {
              label: 'How to Get Involved',
              link: '/getting-started/installation',
            },
          ],
        },
        {
          label: 'About Us',
          items: [
            {
              label: 'Mission, Vision & Values',
              link: '/about-us/accessible-astro-starter',
            },
            {
              label: 'Co-op Structure & Model',
              link: '/about-us/accessible-astro-dashboard',
            },
            {
              label: 'Legal Documents & Policies',
              link: '/about-us/accessible-astro-dashboard',
            },
          ],
        },
        {
          label: 'Membership',
          items: [
            {
              label: 'About Membership',
              link: '/membership/overview',
            },
            {
              label: 'Member Benefits',
              link: '/membership/accordion',
            },
            {
              label: 'Community Expectations',
              link: '/membership/avatar',
            },
          ],
        },
        {
          label: 'Governance',
          items: [
            {
              label: 'About Governance',
              link: '/governance/how-to',
            },
            {
              label: 'Decision Making',
              link: '/governance/development',
            },
            {
              label: 'Change & Amendments',
              link: '/governance/style-guide',
            },
            {
              label: 'Accountability',
              link: '/governance/issues',
            },
            {
              label: 'Financial Transparency',
              link: '/governance/support-us',
            },
          ],
        },
        {
          label: 'Resources',
          items: [
            {
              label: 'Glossary',
              link: '/resources/showcases',
            },
            {
              label: 'Learning & Education',
              link: '/resources/showcases',
            },
            {
              label: 'Tools We Use',
              link: '/resources/showcases',
            },
            {
              label: 'Brand Guidelines',
              link: '/resources/showcases',
            },
            {
              label: 'Site Accessibility',
              link: '/resources/showcases',
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
