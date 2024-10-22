import { crx, defineManifest } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Stamp Downloader',
  version: '0.0.1',
  description: 'Download LINE stamp images',
  icons: {
    64: 'res/icon-64.png',
  },
  action: {
    default_icon: {
      64: 'res/icon-64.png',
    },
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
