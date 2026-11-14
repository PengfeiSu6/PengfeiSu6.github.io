/* ==========================================================================
   site.js — 全站共享身份字段绑定
   --------------------------------------------------------------------------
   本文件不含任何内容。它只把 data/profile.js 中的共享字段
   （姓名、身份简介、邮箱、页脚文案）写入各页面的 [data-field] / [data-href]
   挂载点，使 7 个页面的作者栏与页脚保持一处维护。

   页面正文（个人简介、论文、项目、经历等）是静态 HTML，
   与 academicpages 生成的页面一致，不依赖 JS 即可阅读。

   加载顺序：data/profile.js -> assets/js/site.js -> assets/js/main.min.js
   site.js 同步执行完毕后再由主题 JS 计算 greedy-nav 宽度，避免测量偏差。
   ========================================================================== */
(function () {
  var profile = window.SITE_PROFILE || {};
  var home = document.body.getAttribute("data-home") || "index.html";

  function forEach(selector, callback) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), callback);
  }

  forEach("[data-field]", function (el) {
    var value = profile[el.getAttribute("data-field")];
    if (value !== undefined && value !== null && value !== "") {
      el.textContent = value;
    }
  });

  forEach("[data-href]", function (el) {
    var key = el.getAttribute("data-href");
    var value = key === "home" ? home : profile[key];
    if (value) {
      el.setAttribute("href", value);
    }
  });
}());
