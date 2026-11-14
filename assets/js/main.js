/* ==========================================================================
   个人主页 / 交互与数据绑定层
   --------------------------------------------------------------------------
   职责：
   1. 把 data/profile.js 的内容绑定到 [data-field] 与 [data-list] 挂载点
   2. 维护「待补充」状态统计与分区进度标记
   3. 顶部导航的滚动高亮、移动端折叠菜单、填充标记开关

   约定：
   - 值为 null / 空字符串 / 空数组时：骨架态保留占位；填充态若元素带
     data-optional 则自动隐藏，否则继续显示占位，绝不生成推断内容
   - 所有注入文本均经 HTML 转义
   - 新增内容类型只需在 renderers 注册同名模板，其余逻辑无需改动
   ========================================================================== */
(function () {
  "use strict";

  var config = Object.assign(
    { skeletonMode: true, showFillHints: true },
    window.SITE_CONFIG || {}
  );
  var profile = window.SITE_PROFILE || {};
  var query = new URLSearchParams(window.location.search);

  /* 不改文件即可预览：?mode=skeleton / ?mode=filled */
  if (query.get("mode") === "filled") config.skeletonMode = false;
  if (query.get("mode") === "skeleton") config.skeletonMode = true;

  /** 骨架模式下统一返回空值，页面保持 100% 占位 */
  function valueOf(key) {
    return config.skeletonMode ? null : profile[key];
  }

  function isFilled(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (Array.isArray(value)) return value.length > 0;
    return true;
  }

  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* --------------------------------------------------------------------------
     列表模板：一个 data-list 值对应一个渲染函数
     -------------------------------------------------------------------------- */
  var renderers = {
    links: function (item) {
      return '<li><a href="' + esc(item.url) + '" rel="noopener noreferrer">' +
             esc(item.label) + "</a></li>";
    },

    experience: function (item) {
      return '<li class="timeline__item">' +
               '<span class="timeline__period">' + esc(item.period) + "</span>" +
               '<span class="timeline__role">' + esc(item.role) + "</span>" +
               '<span class="timeline__org">' + esc(item.org) + "</span>" +
               (item.detail ? '<span class="timeline__detail">' + esc(item.detail) + "</span>" : "") +
             "</li>";
    },

    projects: function (item) {
      return '<article class="card">' +
               '<p class="card__period">' + esc(item.period) + "</p>" +
               '<h3 class="card__title">' + esc(item.title) + "</h3>" +
               '<p class="card__role">' + esc(item.role) + "</p>" +
               '<p class="card__summary">' + esc(item.summary) + "</p>" +
               (item.link
                 ? '<a class="card__link" href="' + esc(item.link) +
                   '" target="_blank" rel="noopener noreferrer">项目链接 ↗</a>'
                 : "") +
             "</article>";
    },

    publications: function (item, index) {
      var num = ("0" + (index + 1)).slice(-2);
      return '<li class="publication">' +
               '<span class="publication__index">' + num + "</span>" +
               '<div class="publication__body">' +
                 '<p class="publication__title">' + esc(item.title) + "</p>" +
                 '<p class="publication__authors">' + esc(item.authors) + "</p>" +
                 '<p class="publication__venue">' + esc(item.venue) + "</p>" +
                 '<p class="publication__note">' + esc(item.note) + "</p>" +
               "</div>" +
             "</li>";
    },

    patents: function (item) {
      return '<li class="compact-list__item">' +
               '<span class="compact-list__badge">' + esc(item.status) + "</span>" +
               '<div>' +
                 '<p class="compact-list__title">' + esc(item.title) + "</p>" +
                 '<p class="compact-list__meta">' + esc(item.authors) + " · " + esc(item.id) + "</p>" +
               "</div>" +
             "</li>";
    },

    awards: function (item) {
      return '<li class="compact-list__item">' +
               '<span class="compact-list__year">' + esc(item.year) + "</span>" +
               '<span class="compact-list__text">' + esc(item.title) + "</span>" +
             "</li>";
    },

    services: function (item) {
      return '<li class="compact-list__item">' +
               '<span class="compact-list__dot" aria-hidden="true"></span>' +
               '<span class="compact-list__text">' + esc(item.text) + "</span>" +
             "</li>";
    },

    skills: function (group) {
      var tags = (group.items || []).map(function (name) {
        return '<span class="skill-tag">' + esc(name) + "</span>";
      }).join("");
      return '<div class="skill-group">' +
               '<h3 class="skill-group__title">' + esc(group.group) + "</h3>" +
               '<p class="skill-group__tags">' + tags + "</p>" +
             "</div>";
    },

    contact: function (item) {
      var value = item.href
        ? '<a href="' + esc(item.href) + '">' + esc(item.value) + "</a>"
        : esc(item.value);
      return '<li class="contact-list__item">' +
               '<span class="contact-list__label">' + esc(item.label) + "</span>" +
               '<span class="contact-list__value">' + value + "</span>" +
             "</li>";
    }
  };

  /** 绑定所有单值字段 */
  function applyFields() {
    document.querySelectorAll("[data-field]").forEach(function (el) {
      var key = el.dataset.field;
      var value = valueOf(key);

      if (!isFilled(value)) {
        if (!config.skeletonMode && el.hasAttribute("data-optional")) el.hidden = true;
        return;
      }

      if (key === "avatar") {
        if (typeof value === "string") {
          el.innerHTML = '<img src="' + esc(value) + '" alt="' + esc(profile.name || "个人照片") + '">';
          el.classList.add("has-image");
        } else if (value && value.initial) {
          el.innerHTML = '<span class="avatar__initial">' + esc(value.initial) + "</span>";
          el.classList.add("has-initial");
        }
      } else {
        el.textContent = value;
      }
      el.classList.remove("is-placeholder");
    });
  }

  /** 渲染所有列表型区块 */
  function applyLists() {
    document.querySelectorAll("[data-list]").forEach(function (container) {
      var key = container.dataset.list;
      var items = valueOf(key);
      var render = renderers[key];
      if (!render || !isFilled(items)) {
        if (!config.skeletonMode && container.hasAttribute("data-optional")) container.hidden = true;
        return;
      }
      container.innerHTML = items.map(render).join("");
    });
  }

  /** 统计待补充项（排除因 data-optional 已隐藏的元素） */
  function pendingNodes(root) {
    return Array.prototype.filter.call(
      (root || document).querySelectorAll(".is-placeholder"),
      function (node) { return !node.closest("[hidden]"); }
    );
  }

  function refreshStatus() {
    var total = pendingNodes().length;
    document.querySelectorAll(".pending-total").forEach(function (el) {
      el.textContent = String(total);
    });

    document.querySelectorAll("[data-section]").forEach(function (section) {
      var badge = section.querySelector("[data-section-status]");
      if (!badge) return;
      var pending = pendingNodes(section).length;
      if (pending === 0) {
        badge.textContent = "已填充";
        badge.classList.add("is-done");
      } else {
        badge.textContent = "待补充 " + pending + " 处";
        badge.classList.remove("is-done");
      }
    });
  }

  /* --------------------------------------------------------------------------
     顶部导航
     -------------------------------------------------------------------------- */
  function initNavigation() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "收起导航菜单" : "展开导航菜单");
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    links.forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setOpen(false);
    });

    // 滚动高亮：按文档顺序取第一个处于观察区内的分区
    var sections = Array.prototype.slice.call(document.querySelectorAll(".section[id]"));
    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    var visible = {};
    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
      var current = sections.find(function (section) { return visible[section.id]; });
      if (current) setActive(current.id);
    }, { rootMargin: "-25% 0px -65% 0px", threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* --------------------------------------------------------------------------
     填充标记开关：骨架态默认显示，填充态默认隐藏（呈现正式主页）
     -------------------------------------------------------------------------- */
  function initHints() {
    var button = document.getElementById("toggle-hints");
    var on;
    if (query.get("hints") === "off") on = false;
    else if (query.get("hints") === "on") on = true;
    else on = Boolean(config.skeletonMode) && config.showFillHints !== false;

    function apply(state) {
      document.body.dataset.hints = state ? "on" : "off";
      if (button) {
        button.textContent = state ? "隐藏填充标记" : "显示填充标记";
        button.setAttribute("aria-pressed", String(state));
      }
    }
    apply(on);
    if (button) {
      button.addEventListener("click", function () {
        on = !on;
        apply(on);
      });
    }
  }

  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /** 页面标题、页脚与提示条随「骨架 / 内容」模式切换 */
  function initModeNote() {
    var isSkeleton = Boolean(config.skeletonMode);
    var label = document.getElementById("dev-mode-label");
    var footerMeta = document.getElementById("footer-meta");

    document.title = isSkeleton
      ? "个人主页 · 基础框架（骨架阶段）"
      : (profile.name ? profile.name + " · 个人主页" : "个人主页");
    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", isSkeleton
        ? "个人主页基础框架（骨架阶段）：结构与样式已就位，内容待由简历填充。"
        : (profile.name ? profile.name + " · 电气工程博士、博士后，研究工业负荷灵活性与低碳电力系统协同优化；含经历、项目、成果与联系方式。" : "个人主页"));
    }
    if (label) label.textContent = isSkeleton ? "骨架阶段" : "内容预览";
    if (footerMeta) {
      footerMeta.textContent = isSkeleton
        ? "骨架版本 · 内容尚未填充"
        : "内容由 data/profile.js 统一维护";
    }
    document.querySelectorAll("[data-note]").forEach(function (el) {
      el.hidden = (el.dataset.note === "skeleton") ? !isSkeleton : isSkeleton;
    });
  }

  function boot() {
    initModeNote();
    applyFields();
    applyLists();
    refreshStatus();
    initNavigation();
    initHints();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
