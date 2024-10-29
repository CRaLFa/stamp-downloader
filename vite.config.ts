import { crx, defineManifest } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';

const manifest = defineManifest({
  manifest_version: 3,
  name: 'LINEスタンプダウンローダー',
  version: '0.1.1',
  description: 'LINE STORE からスタンプ画像を一括ダウンロードする Chrome 拡張機能です。',
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
