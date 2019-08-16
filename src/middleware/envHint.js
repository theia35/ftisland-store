export function envHint (version) {
  try {
    let el = document.createElement('div');
    el.className = 'env-hint-dev';
    //eslint-disable-next-line
    el.textContent = `開發環境版本：${__BUILD_VERSION__} 日期：${__BUILD_DATE__}`;
    el.style = `
      position: fixed;
      top: 0;
      left: 0;
      font-size: 12px;
      z-index: 99;
      color: red;
      opacity: 0.7;
      text-shadow: 0px 0px white;
    `;
    document.body.appendChild(el);
  } catch (error) {
    console.error(error);
  }
}
