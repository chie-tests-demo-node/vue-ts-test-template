// 异步加载css文件
export const includeCss = function (filename) {
  var head = document.getElementsByTagName("head")[0];
  var link = document.createElement("link");
  link.href = filename;
  link.rel = "stylesheet";
  link.type = "text/css";
  head.appendChild(link);
}

// 异步加载js文件
export const loadJs = function (libUrl, callback, libName) {
  if (window[libName]) {
    if (typeof callback === 'function') callback();
  }
  let head = document.getElementsByTagName("head")[0];
  let script: any = document.createElement("script");
  let isCallback = false;
  script.type = "text/javascript";
  script.src = libUrl;
  if (typeof callback == "function") {
    script.onload = script.onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState === "loaded" ||
        this.readyState === "complete"
      ) {
        if (isCallback === false && typeof callback === 'function') {
          isCallback = true;
          callback();
        }
        script.onload = script.onreadystatechange = null;
      }
    };
  }
  head.appendChild(script);
}