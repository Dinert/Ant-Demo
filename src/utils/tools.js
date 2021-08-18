export default {
  copyText(value, callback) {
    var input = document.createElement("textarea");
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.value = JSON.stringify(value);
    input.select();
    document.execCommand("Copy") &&
      typeof callback === "function" &&
      callback();
    input.remove();
  },
  exportData(content, filename) {
    var eleLink = document.createElement("a");
    eleLink.download = filename;
    eleLink.style.display = "none";
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  }
};
