const reUrl = /url\("([^"]+)/;

const getImageUrls = () => {
  const spans = document.querySelectorAll<HTMLSpanElement>('ul.FnStickerList div.FnImage > span.mdCMN09Image');
  const urls = [...spans].map((span) => {
    const bgImage = span.attributeStyleMap.get('background-image');
    if (!bgImage) {
      return null;
    }
    const arr = reUrl.exec(bgImage.toString());
    return arr ? arr[1] : null;
  });
  return urls.filter((url) => !!url);
};

chrome.runtime.onMessage.addListener((_msg, _sender, sendResponse) => {
  sendResponse(getImageUrls());
});
