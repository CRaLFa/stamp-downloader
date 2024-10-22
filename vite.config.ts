import { crx, defineManifest } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Stamp Downloader',
  version: '0.0.1',
  description: 'Download LINE stamp images',
  icons: {},
  action: {
    default_icon: {},
    default_popup: 'popup.html',
  },
  content_scripts: [
    {
      js: ['src/content.ts'],
      matches: ['https://store.line.me/stickershop/product/*'],
    },
  ],
  permissions: ['activeTab'],
});

export default defineConfig({
  plugins: [
    crx({ manifest }),
  ],
});
