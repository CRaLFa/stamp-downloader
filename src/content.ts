const reUrl = /url\("([^"]+)/;

const getImageUrls = () => {
  const spans = document.querySelectorAll<HTMLSpanElement>('ul.FnStickerList div.FnImage > span.mdCMN09Image');
  const urls = [...spans].map((span) => {
    const bgImage = span.attributeStyleMap.get('background-image');
    if (!bgImage) {
      return undefined;
    }
    const arr = reUrl.exec(bgImage.toString());
    if (!arr) {
      return undefined;
    }
    return arr[1];
  });
  return urls.filter((url) => url !== undefined);
};

chrome.runtime.onMessage.addListener((_msg, _sender, sendResponse) => {
  sendResponse(getImageUrls());
});
