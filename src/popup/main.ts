import JSZip from 'jszip';
import './style.css';

type StampImage = {
  id: string;
  blob: Blob;
};

const PRODUCT_URL = 'https://store.line.me/stickershop/product/';

const RE_PRODUCT_ID = /product\/(\d+)/;
const RE_IMAGE_ID = /sticker\/(\d+)/;

const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({
    currentWindow: true,
    active: true,
  });
  return tabs[0];
};

const getProductId = (tab: chrome.tabs.Tab) => {
  if (!tab.url) {
    throw new Error('Failed to get tab URL');
  }
  const arr = RE_PRODUCT_ID.exec(tab.url);
  if (!arr) {
    throw new Error('Failed to get product ID');
  }
  return arr[1];
};

const fetchImages = async (urls: string[]) => {
  const images = await Promise.all(urls.map(async (url) => {
    const arr = RE_IMAGE_ID.exec(url);
    if (!arr) {
      return null;
    }
    const res = await fetch(url);
    if (!res.ok || res.status !== 200) {
      return null;
    }
    return <StampImage> {
      id: arr[1],
      blob: await res.blob(),
    };
  }));
  return images.filter((img) => img !== null);
};

const zipImages = (images: StampImage[]) => {
  const zip = new JSZip();
  images.forEach((img) => zip.file(`${img.id}.png`, img.blob));
  return zip.generateAsync({ type: 'blob' });
};

const downloadZip = (zip: Blob, name: string) => {
  const zipUrl = URL.createObjectURL(zip);
  setTimeout(() => URL.revokeObjectURL(zipUrl), 1000);
  const a = document.createElement('a');
  a.href = zipUrl;
  a.download = name;
  a.click();
};

(async () => {
  const dlButton = document.querySelector<HTMLButtonElement>('#download')!;
  const currentTab = await getCurrentTab();

  dlButton.addEventListener('click', async () => {
    try {
      const productId = getProductId(currentTab);
      const imageUrls = await chrome.tabs.sendMessage<any, string[]>(currentTab.id!, null);
      const images = await fetchImages(imageUrls);
      const zip = await zipImages(images);
      downloadZip(zip, `${productId}.zip`);
    } catch (err) {
      // console.error(err);
      window.alert('ダウンロードに失敗しました。\nページを再読み込みしてから再度お試しください。');
    }
  });

  if (!currentTab.url || !currentTab.url.startsWith(PRODUCT_URL)) {
    dlButton.disabled = true;
  }
})();
