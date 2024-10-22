const reUrl = /url\("([^"]+)/;

const getImageUrls = () => {
  const spans = document.querySelectorAll<HTMLSpanElement>('ul.FnStickerList div.FnImage > span.mdCMN09Image');
  const urls = [...spans].map((span) => {
    if (!span.attributeStyleMap.has('background-image')) {
      return null;
    }
    const arr = reUrl.exec(span.attributeStyleMap.get('background-image')!.toString());
    return arr ? arr[1] : null;
  });
  return urls.filter((url) => url !== null);
};

chrome.runtime.onMessage.addListener((_msg, _sender, sendResponse) => {
  sendResponse(getImageUrls());
});
