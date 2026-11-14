/* ==========================================================================
   个人主页 / 唯一内容数据源
   --------------------------------------------------------------------------
   数据来源：《英国卡迪夫大学_电气工程_苏鹏飞_1025.pdf》（3 页）
   本文件是全站唯一内容入口；改文案不需要动 index.html / CSS / JS。

   ── 标记含义 ────────────────────────────────────────────────────────────
   [原文]     简历中直接可核实的客观信息，逐字或压缩表述录入
   [归纳]     对简历同一段落做概括，未添加任何新事实
   [功能文案] 页面功能性说明文字（如联系提示），非个人事实
   [未提供]   简历中不存在 → 保持 null / 空数组，页面自动隐藏该位置，不编造

   ── 工作方式 ────────────────────────────────────────────────────────────
   SITE_CONFIG.skeletonMode = false （当前）启用资料；
   改为 true 可随时回到纯占位骨架。
   不改文件也可预览：?mode=skeleton / ?mode=filled、?hints=on / ?hints=off。

   ── 字段与页面位置对照 ──────────────────────────────────────────────────
   brand, name, role, org, location, avatar, links -> 左侧作者卡 + 顶栏
   heroTitle, heroLead, heroFocus, heroStatus      -> 01 首页介绍
   aboutText, aboutEducation, aboutWork, aboutOutputs -> 02 关于我
   experience  -> 03 经历        projects     -> 04 项目
   publications / patents / awards / services     -> 05 成果与荣誉
   skills      -> 06 技能        contactIntro, contact, footerName -> 07 联系 / 页脚
   ========================================================================== */

window.SITE_CONFIG = {
  /* 阶段开关：false = 启用下方资料（当前）；true = 回到纯占位骨架 */
  skeletonMode: false,

  /* 填充态默认隐藏开发标记，页面呈现为正式主页；
     骨架态默认显示。两者都可用 ?hints=on/off 或页面右下角按钮覆盖。 */
  showFillHints: true
};

window.SITE_PROFILE = {

  /* ================================================================ 作者卡 */
  /* [原文] 姓名由文件名与论文署名 Su, P. 一致确认 */
  brand: "苏鹏飞",
  name: "苏鹏飞",
  footerName: "苏鹏飞",

  /* [原文] 2025.09 - 至今 大湾区大学与清华大学深圳研究院博士后站 博士后 */
  role: "博士后",
  org: "大湾区大学与清华大学深圳研究院博士后站",

  /* [未提供] 简历只有籍贯（河南省安阳市），没有现居 / 工作城市。
     填充态下此元素带 data-optional，会自动隐藏而不显示「待补充」。 */
  location: null,

  /* [功能文案] 简历未提供照片，使用姓名首字生成文字徽标（视觉元素，非个人信息）。
     拿到照片后直接改成图片路径字符串即可，例如 "assets/images/avatar.jpg"。 */
  avatar: { initial: "苏" },

  /* [未提供] 简历没有 GitHub / Google Scholar / ORCID / 个人主页链接。
     该容器带 data-optional，填充态下自动隐藏。
     需要时格式：[{ label: "GitHub", url: "https://..." }] */
  links: [],

  /* ============================================================ 01 首页介绍 */
  /* [归纳] 仅使用简历中的身份、教育经历与项目关键词组织表述 */
  heroTitle: "苏鹏飞 · 电气工程博士",
  heroLead:
    "现任大湾区大学与清华大学深圳研究院博士后站博士后，2021–2025 年于英国卡迪夫大学攻读电气工程博士。" +
    "研究围绕工业负荷灵活性、炼钢流程多目标优化排产、混合储能与需求响应，以及面向净零电力系统的多能源协同展开。",
  heroFocus: "工业负荷灵活性 · 炼钢流程优化排产 · 混合储能与需求响应 · 多能源系统协同",

  /* [原文] 当前任职状态 */
  heroStatus: "博士后 · 2025.09 至今",

  /* ============================================================== 02 关于我 */
  /* [归纳] 全部事实来自简历「教育背景」「工作经历」「项目经历」「科研成果」 */
  aboutText:
    "电气工程博士，现任大湾区大学与清华大学深圳研究院博士后站博士后。博士阶段就读于英国卡迪夫大学，" +
    "导师为周越、吴建中、Meysam Qadrdan；此前为天津大学电气工程硕士、东北电力大学电气工程及其自动化学士，" +
    "并曾任职于阳光电源股份有限公司。研究聚焦工业流程灵活性与低碳电力系统的协同优化：" +
    "主持英国工程与自然科学研究理事会项目子课题 1 项，深度参与欧盟「欧洲地平线」、国家重点研发计划等重大项目 3 项；" +
    "累计发表 SCI/EI 检索论文 10 余篇，受理国家发明专利 9 项，其中授权 3 项。",

  /* [原文归纳] 来源：简历「教育背景」 */
  aboutEducation:
    "英国卡迪夫大学 电气工程 博士（2021.01–2025.06，导师：周越、吴建中、Meysam Qadrdan）；" +
    "天津大学 电气工程 硕士（2017.09–2020.01）；" +
    "东北电力大学 电气工程及其自动化 学士（2013.09–2017.06）",

  /* [原文归纳] 来源：简历「工作经历」 */
  aboutWork:
    "大湾区大学与清华大学深圳研究院博士后站 博士后（2025.09–至今）；" +
    "阳光电源股份有限公司 电气工程师（2020.07–2021.01）",

  /* [原文] 来源：简历「科研成果」总述 */
  aboutOutputs: "累计发表 SCI/EI 检索论文 10 余篇；受理国家发明专利 9 项，其中授权 3 项",

  /* ================================================================ 03 经历 */
  /* [原文] 来源：简历「教育背景」「工作经历」，按时间倒序 */
  experience: [
    { period: "2025.09 – 至今", role: "博士后", org: "大湾区大学与清华大学深圳研究院博士后站" },
    {
      period: "2021.01 – 2025.06", role: "博士 · 电气工程", org: "英国卡迪夫大学",
      detail: "导师：周越、吴建中、Meysam Qadrdan"
    },
    { period: "2020.07 – 2021.01", role: "电气工程师", org: "阳光电源股份有限公司" },
    { period: "2017.09 – 2020.01", role: "硕士 · 电气工程", org: "天津大学" },
    { period: "2013.09 – 2017.06", role: "学士 · 电气工程及其自动化", org: "东北电力大学" }
  ],

  /* ================================================================ 04 项目 */
  /* [原文归纳] 来源：简历「项目经历」3 项。只填简历中确实给出的项目链接。 */
  projects: [
    {
      period: "2019.03 – 2026.09",
      title: "SUSTAIN Manufacturing Hub（SUSTAIN 制造中心）",
      role: "可行性研究项目子课题负责人 · EP/S018107/1",
      summary:
        "英国工程与自然科学基金会资助项目。负责子课题 1「基于炼钢流程机制的钢厂多目标日前排产优化」，" +
        "开发电炉炼钢流程能量管理算法并协助部署于钢厂数字孪生测试平台；" +
        "相关成果获项目年会最佳海报奖。",
      link: null
    },
    {
      period: "2022.12 – 2025.11",
      title: "FlexCHESS · 基于互联互通的混合储能系统的灵活性服务",
      role: "技术骨干 · 欧盟「欧洲地平线」101096946",
      summary:
        "研究工业流程灵活性与储能系统结合的混合储能系统及其在电网灵活性服务中的应用；" +
        "相关成果在 IEEE PES ISGT Europe、IEEE EI2 会议作口头报告。",
      link: "https://cordis.europa.eu/project/id/101096946"
    },
    {
      period: "2020.03 – 2024.03",
      title: "MC2 · 信息物理融合的城市能源系统分区协调控制",
      role: "技术骨干 · NSFC–EPSRC 国际合作重点项目 EP/T021969/1",
      summary:
        "负责工业负荷灵活性评估及参与电网需求侧响应服务潜力研究；" +
        "与 SUSTAIN 合作开发面向炼钢厂智能灵活运营的数字孪生方法。",
      link: "https://gtr.ukri.org/projects?ref=EP%2FT021969%2F1#/tabOverview"
    }
  ],

  /* ========================================================== 05 成果与荣誉 */
  /* [原文] 来源：简历「科研成果 · 学术论文」代表性成果 5 篇。
     期刊卷期、影响因子与引用数按简历原文录入，未做外部核对。 */
  publications: [
    {
      authors: "Su, P., Zhou, Y., Li, H., Perez, H. and Wu, J.",
      title: "Decarbonisation Pathways for a Steel Plant within an Evolving Hydrogen Driven Regional Energy System",
      venue: "Energy Conversion and Management · Accepted",
      note: "SCI · IF=11.8 · 中科院一区 Top"
    },
    {
      authors: "Su, P., Zhou, Y., Li, H., Perez, H. and Wu, J.",
      title: "Cost-Effective Scheduling of a Hydrogen-based Iron and Steel Plant Supplied by a Grid-assisted Renewable Energy System",
      venue: "Applied Energy, vol. 384 · 2025.04",
      note: "SCI · IF=12.2 · 引用 27 · 中科院一区 TOP"
    },
    {
      authors: "Su, P., Zhou, Y. and Wu, J.",
      title: "Multi-Objective Scheduling of a Steelmaking Plant Integrated with Renewable Energy Sources and Energy Storage Systems: Balancing Costs, Emissions and Make-span",
      venue: "Journal of Cleaner Production, vol. 14, no. 4, pp. 2709–2722 · 2023.07",
      note: "SCI · IF=10.7 · 引用 66 · 中科院一区 TOP"
    },
    {
      authors: "Su, P. and Zhou, Y.",
      title: "Demand Response from Steelmaking Process Coordinated with Energy Storage Systems",
      venue: "IEEE PES Innovative Smart Grid Technologies Europe (ISGT EUROPE), pp. 1–5 · 2023",
      note: "EI · 会议口头报告"
    },
    {
      authors: "Su, P. and Zhou, Y.",
      title: "Optimal Scheduling of Steelmaking Process Considering Multiple Electricity Bill Components",
      venue: "IEEE Conference on Energy Internet and Energy System Integration (EI²), pp. 4287–4291 · 2023",
      note: "EI · 会议口头报告"
    }
  ],

  /* [原文] 来源：简历「发明专利」代表性成果 4 项 */
  patents: [
    {
      title: "炼钢生产调度优化方法、装置和程序产品",
      authors: "陈戈、苏鹏飞、邓浩然",
      id: "中国 · 2026-09-18",
      status: "已受理"
    },
    {
      title: "光伏逆变器故障检测方法、设备及介质",
      authors: "苏鹏飞、吕建党、高超、张锐",
      id: "CN112731022B · 2023-06-23",
      status: "已授权"
    },
    {
      title: "光伏逆变器的状态检测方法、装置及计算机可读存储介质",
      authors: "苏鹏飞、杨宗军、李凡",
      id: "CN113092900B · 2023-04-07",
      status: "已授权"
    },
    {
      title: "一种户用微网能量路由器能量管理单元的本地控制方法",
      authors: "王丹、马喜然、苏鹏飞",
      id: "CN110535190B · 2023-05-05",
      status: "已授权"
    }
  ],

  /* [原文] 来源：简历「荣誉奖项」 */
  awards: [
    { year: "2026", title: "IEEE I&CPS Asia 2026 杰出组织奖" },
    { year: "2026", title: "ICSCGE 2026 最佳审稿人" },
    { year: "2024", title: "Sustainability in Steel SUSTAIN Conference 最佳海报奖" },
    { year: "2020", title: "国家留学基金委 公派留学奖学金" },
    { year: "2020", title: "阳光电源–阳光智维科技子公司技术部 季度之星" },
    { year: "2020", title: "天津大学 优秀毕业生" },
    { year: "2019", title: "《电力建设》期刊 优秀论文奖" },
    { year: "2018", title: "「互联网+」大学生创新创业大赛（基于区块链的互联网创新）华北赛区二等奖" }
  ],

  /* [原文] 来源：简历「学术兼职」 */
  services: [
    { text: "IEEE Member、CIGRE UK NGN Member" },
    { text: "Electronics、《中国电力》等国内外专刊特约编辑" },
    { text: "IEEE EI² 2026、IEEE I&CPS Asia 2026 等会议特别分会主席" },
    { text: "IEEE EI² 2026 特别分会受邀报告" },
    { text: "Applied Energy、Journal of Cleaner Production、Energy 等学术期刊审稿人" }
  ],

  /* ================================================================ 06 技能 */
  /* [归纳] 简历没有独立的技能清单。以下标签全部提取自「项目经历」「科研成果」中
     反复出现的方法、系统与协作场景关键词，未添加软件 / 编程语言等简历未提及的能力。
     如本人希望补充具体工具与语言，直接向 items 追加即可。 */
  skills: [
    {
      group: "研究与建模",
      items: ["多目标优化排产", "工业负荷灵活性评估", "需求响应策略建模", "能量管理算法", "数字孪生方法"]
    },
    {
      group: "系统与技术方向",
      items: ["炼钢流程建模与调度", "混合储能系统", "可再生能源与储能协同", "城市多能源系统", "净零电力系统"]
    },
    {
      group: "科研项目协作",
      items: ["英国 EPSRC 项目子课题", "欧盟「欧洲地平线」计划", "中英国际合作重点项目", "产学研合作与工业部署"]
    }
  ],

  /* ================================================================ 07 联系 */
  /* [功能文案] 页面联系说明，不涉及个人事实 */
  contactIntro: "如需学术交流、项目合作或索取研究材料，可通过以下方式联系。",

  /* [原文] 邮箱。
     手机号 13353648768 亦见于简历，默认不在公开主页展示；
     如需公开，取消下方注释条目即可。 */
  contact: [
    { label: "邮箱", value: "aca_spf@163.com", href: "mailto:aca_spf@163.com" }
    // { label: "电话", value: "13353648768", href: "tel:13353648768" }
  ]
};

/* ==========================================================================
   维护提示
   --------------------------------------------------------------------------
   · 简历中「代表性论文 5 篇 / 发明专利 4 项 / 荣誉奖项 8 项 / 学术兼职 5 条」
     已全部录入「成果与荣誉」分区；简历总述为论文 10 余篇、专利受理 9 项授权 3 项，
     如需补全其余条目，按同样结构向对应数组追加即可。
   · 论文卷期、影响因子、引用数按简历原文录入，正式对外前建议与出版方核对。
   · 仍未提供的信息：现居城市、照片、个人主页 / GitHub / Scholar / ORCID 链接、
     具体软件工具与语言能力。这些位置在填充态自动隐藏或保持占位，不会编造。
   ========================================================================== */
