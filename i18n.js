// Translations. Keys used by [data-i18n] (text) and [data-i18n-html] (trusted markup from this file only).
const LANGS = { vi: "VI", en: "EN", zh: "中文" };
const HTML_LANG = { vi: "vi", en: "en", zh: "zh-Hans" };

const I18N = {
  vi: {
    "meta.title": "Kiều Khánh Duy Anh · Video Editor & Content Creator",
    "top.tagline": "Video Editor & Content Creator với nền tảng Công nghệ Thông tin, xây dựng hệ thống nội dung đa nền tảng tạo ra doanh thu thực tế.",
    "hero.marquee": "Video Editor & Content Creator",
    "nav.home": "Trang chủ", "nav.projects": "Dự án", "nav.skills": "Kỹ năng", "nav.about": "Giới thiệu",
    "nav.education": "Học vấn", "nav.contact": "Liên hệ", "nav.email": "Gửi email",

    "intro.lead": "Xuất thân từ Công nghệ Thông tin, tôi kết hợp tư duy logic, dữ liệu và AI để xây dựng hệ thống nội dung đa nền tảng, từ con số 0 đến doanh thu thực tế.",
    "intro.note": "“Tôi không chỉ làm content, tôi tạo ra doanh thu từ content.” Hơn 2 năm thực chiến trên TikTok, YouTube và Facebook.",
    "intro.more": "Thêm về tôi",
    "works.title": "Dự án nổi bật",
    "works.note": "Những hệ thống kênh tôi đã xây dựng và vận hành, đo bằng lượt xem, đơn hàng và doanh thu thực tế.",
    "works.explore": "Xem thêm",

    "skills.title": "Kỹ năng tiếp lửa đam mê",
    "skill.video.title": "Quay & Dựng Video",
    "skill.video.desc": "Biên tập, dựng và thiết kế video chuyên nghiệp, đảm bảo chất lượng hình ảnh và âm thanh.",
    "skill.video.p4": "Tối ưu source video",
    "skill.content.title": "Content & Social Media",
    "skill.content.desc": "Xây dựng nội dung theo dữ liệu người dùng, tối ưu lượt xem và chuyển đổi bán hàng.",
    "skill.content.p1": "Content đa nền tảng", "skill.content.p2": "Ý tưởng & Kịch bản",
    "skill.content.p3": "Vận hành & Phân tích kênh",
    "skill.ai.title": "AI Tools",
    "skill.ai.desc": "Ứng dụng AI vào quy trình sản xuất nội dung để tăng hiệu suất và mở rộng quy mô.",
    "skill.soft.title": "Kỹ năng mềm & Ngoại ngữ",
    "skill.soft.desc": "Đọc hiểu tài liệu chuyên ngành tiếng Anh, giao tiếp cơ bản, phối hợp tốt trong team.",
    "skill.soft.p1": "Làm việc nhóm", "skill.soft.p2": "Phối hợp liên phòng ban", "skill.soft.p3": "Quản lý tiến độ",
    "skill.soft.p4": "Xử lý tình huống", "skill.soft.p5": "Tiếng Anh trung cấp",
    "skill.edu.title": "FPT Polytechnic",
    "skill.edu.desc": "Công nghệ Thông tin, tốt nghiệp loại Giỏi. Nền tảng tư duy logic và xử lý dữ liệu cho sáng tạo nội dung.",
    "skill.cert.title": "Chứng chỉ & Hoạt động",
    "skill.cert.desc": "NIC x Google: Google AI (2026). Ban Truyền Thông, Văn phòng Đoàn Hội FPT Polytechnic (2021 - 2023).",

    "projects.title": "chào mừng đến với thế giới các kênh và dự án tôi đã xây dựng",

    "contact.mono": "Tạm thời vậy thôi.",
    "contact.title": "Bạn có dự án trong đầu?<br>Cùng trao đổi nhé",
    "contact.cta": "Liên hệ ngay",
    "contact.email": "Email:", "contact.phone": "Điện thoại", "contact.location": "Địa điểm",
    "contact.city": "Hà Nội, Việt Nam",
    "lightbox.close": "Đóng",
    "evidence.title": "Bằng chứng",
    "evidence.source": "Nguồn: Portfolio.pdf, trang {page}",
  },

  en: {
    "meta.title": "Kieu Khanh Duy Anh · Video Editor & Content Creator",
    "top.tagline": "Video Editor & Content Creator with an IT background, building multi-platform content systems that drive real revenue.",
    "hero.marquee": "Video Editor & Content Creator",
    "nav.home": "Home", "nav.projects": "Projects", "nav.skills": "Skills", "nav.about": "About",
    "nav.education": "Education", "nav.contact": "Contact", "nav.email": "Send email",

    "intro.lead": "Coming from Information Technology, I combine logic, data and AI to build multi-platform content systems, from zero to real revenue.",
    "intro.note": "“I don't just make content, I turn content into revenue.” Over 2 years of hands-on work on TikTok, YouTube and Facebook.",
    "intro.more": "More about me",
    "works.title": "Impressive Works",
    "works.note": "Channel systems I have built and run, measured by views, orders and real revenue.",
    "works.explore": "Explore more",

    "skills.title": "Skills that fuel my passion",
    "skill.video.title": "Filming & Video Editing",
    "skill.video.desc": "Professional editing and video design, with clean picture and sound quality.",
    "skill.video.p4": "Source footage optimization",
    "skill.content.title": "Content & Social Media",
    "skill.content.desc": "Data-driven content built around audience behavior, optimized for views and sales conversion.",
    "skill.content.p1": "Multi-platform content", "skill.content.p2": "Ideas & Scripts",
    "skill.content.p3": "Channel operations & analytics",
    "skill.ai.title": "AI Tools",
    "skill.ai.desc": "Using AI across the content workflow to boost output and scale production.",
    "skill.soft.title": "Soft Skills & Languages",
    "skill.soft.desc": "Reads English technical material, basic English conversation, works well across teams.",
    "skill.soft.p1": "Teamwork", "skill.soft.p2": "Cross-team collaboration", "skill.soft.p3": "Time management",
    "skill.soft.p4": "Problem solving", "skill.soft.p5": "Intermediate English",
    "skill.edu.title": "FPT Polytechnic",
    "skill.edu.desc": "Information Technology, graduated with Distinction. A base in logic and data handling for content creation.",
    "skill.cert.title": "Certificates & Activities",
    "skill.cert.desc": "NIC x Google: Google AI (2026). Communications team, FPT Polytechnic Youth Union Office (2021 - 2023).",

    "projects.title": "welcome to my realm of channels and projects built from zero",

    "contact.mono": "That's all for now.",
    "contact.title": "Got a project in mind?<br>Let’s talk",
    "contact.cta": "Get in touch",
    "contact.email": "Email:", "contact.phone": "Phone", "contact.location": "Location",
    "contact.city": "Hanoi, Vietnam",
    "lightbox.close": "Close",
    "evidence.title": "Evidence",
    "evidence.source": "Source: Portfolio.pdf, page {page}",
  },

  zh: {
    "meta.title": "Kiều Khánh Duy Anh · 视频剪辑师 & 内容创作者",
    "top.tagline": "拥有信息技术背景的视频剪辑师与内容创作者，打造能带来真实收入的多平台内容体系。",
    "hero.marquee": "视频剪辑师 & 内容创作者",
    "nav.home": "首页", "nav.projects": "项目", "nav.skills": "技能", "nav.about": "关于我",
    "nav.education": "教育背景", "nav.contact": "联系", "nav.email": "发送邮件",

    "intro.lead": "我出身信息技术专业，结合逻辑思维、数据与 AI，从零搭建多平台内容体系，并将其转化为真实收入。",
    "intro.note": "“我不只是做内容，我用内容创造收入。” 在 TikTok、YouTube 和 Facebook 上拥有 2 年以上实战经验。",
    "intro.more": "更多关于我",
    "works.title": "精选作品",
    "works.note": "我搭建并运营过的频道体系，以播放量、订单和真实收入来衡量。",
    "works.explore": "查看更多",

    "skills.title": "点燃热情的技能",
    "skill.video.title": "拍摄与视频剪辑",
    "skill.video.desc": "专业的视频剪辑与设计，确保画面和声音质量。",
    "skill.video.p4": "素材优化",
    "skill.content.title": "内容与社交媒体",
    "skill.content.desc": "基于用户数据打造内容，优化播放量与销售转化。",
    "skill.content.p1": "多平台内容", "skill.content.p2": "创意与脚本",
    "skill.content.p3": "频道运营与数据分析",
    "skill.ai.title": "AI 工具",
    "skill.ai.desc": "将 AI 应用于内容生产流程，提升效率并扩大规模。",
    "skill.soft.title": "软技能与语言",
    "skill.soft.desc": "能阅读英文专业资料，具备基础英语沟通能力，善于团队协作。",
    "skill.soft.p1": "团队合作", "skill.soft.p2": "跨部门协作", "skill.soft.p3": "进度管理",
    "skill.soft.p4": "问题处理", "skill.soft.p5": "中级英语",
    "skill.edu.title": "FPT Polytechnic",
    "skill.edu.desc": "信息技术专业，优秀毕业。为内容创作打下逻辑思维与数据处理基础。",
    "skill.cert.title": "证书与活动",
    "skill.cert.desc": "NIC x Google：Google AI（2026）。FPT Polytechnic 团委办公室宣传部（2021 - 2023）。",

    "projects.title": "欢迎来到我从零打造的频道与项目世界",

    "contact.mono": "暂时就这些。",
    "contact.title": "有项目想法吗？<br>一起聊聊吧",
    "contact.cta": "联系我",
    "contact.email": "邮箱：", "contact.phone": "电话", "contact.location": "所在地",
    "contact.city": "越南河内",
    "lightbox.close": "关闭",
    "evidence.title": "数据截图",
    "evidence.source": "来源：Portfolio.pdf 第 {page} 页",
  },
};

// Project data shared by the Home and Projects grids and the detail dialog.
// `evidence` screenshots come from Portfolio.pdf; `page` is the PDF page they appear on.
const PROJECTS = [
  {
    id: "mido",
    cover: "edu-content",
    evidence: [],
    date: { vi: "02/2026 - Hiện tại", en: "02/2026 - Present", zh: "2026/02 - 至今" },
    vi: {
      title: "Mido-Media · Hệ thống kênh YouTube",
      meta: "11.000 USD/tháng · 75.000 subscribers trong 1 năm",
      role: "Video Editor",
      bullets: [
        "Xây dựng và phát triển hệ thống kênh YouTube theo chiến lược nội dung của công ty.",
        "Biên tập, dựng video chuyên nghiệp từ kịch bản của team Content, đảm bảo chất lượng hình ảnh và âm thanh.",
        "Phối hợp tối ưu kịch bản, xử lý và tuyển chọn source hình ảnh/video.",
      ],
      stats: [["$11K", "doanh thu/tháng"], ["75K", "subscribers trong 1 năm"]],
    },
    en: {
      title: "Mido-Media · YouTube channel network",
      meta: "USD 11,000/month · 75,000 subscribers in 1 year",
      role: "Video Editor",
      bullets: [
        "Built and grew a network of YouTube channels following the company's content strategy.",
        "Edited and designed videos from the content team's scripts, keeping picture and sound quality high.",
        "Helped refine scripts and selected and processed source footage.",
      ],
      stats: [["$11K", "revenue/month"], ["75K", "subscribers in 1 year"]],
    },
    zh: {
      title: "Mido-Media · YouTube 频道矩阵",
      meta: "每月 11,000 美元 · 一年内 75,000 订阅",
      role: "视频剪辑师",
      bullets: [
        "按照公司内容战略搭建并发展 YouTube 频道矩阵。",
        "根据内容团队脚本进行专业剪辑与设计，保证画面和声音质量。",
        "协助优化脚本，处理并筛选图片和视频素材。",
      ],
      stats: [["$11K", "月收入"], ["75K", "一年订阅数"]],
    },
  },
  {
    id: "hq",
    cover: "hq-views-2025-07",
    evidence: [
      { img: "hq-views-2025-07", page: 13, cap: { vi: "31,1 triệu lượt xem Facebook, tháng 7/2025", en: "31.1M Facebook views, July 2025", zh: "2025年7月 Facebook 播放量 3110 万" } },
      { img: "hq-earn-2025-08-a", page: 11, cap: { vi: "Thu nhập ước tính $4,3K (một page), tháng 8/2025", en: "Estimated earnings $4.3K (one page), August 2025", zh: "2025年8月单个专页预估收入 $4.3K" } },
      { img: "hq-earn-2025-07", page: 13, cap: { vi: "Thu nhập ước tính $2,2K, tháng 7/2025", en: "Estimated earnings $2.2K, July 2025", zh: "2025年7月预估收入 $2.2K" } },
      { img: "hq-earn-2025-08-b", page: 11, cap: { vi: "Thu nhập ước tính $1,8K, tháng 8/2025", en: "Estimated earnings $1.8K, August 2025", zh: "2025年8月预估收入 $1.8K" } },
      { img: "hq-earn-2025-08-d", page: 12, cap: { vi: "Thu nhập ước tính $1,6K, tháng 8/2025", en: "Approximate earnings $1.6K, August 2025", zh: "2025年8月预估收入 $1.6K" } },
      { img: "hq-earn-2025-08-c", page: 12, cap: { vi: "Thu nhập ước tính $1,4K, tháng 8/2025", en: "Approximate earnings $1.4K, August 2025", zh: "2025年8月预估收入 $1.4K" } },
      { img: "hq-kpi-miya-b", page: 10, cap: { vi: "Bảng KPI page Miya: 84,3 triệu reach, 57,4 triệu lượt xem 3s", en: "Miya page KPI sheet: 84.3M reach, 57.4M 3-second views", zh: "Miya 专页 KPI 表：触达 8430 万，3 秒播放 5740 万" } },
      { img: "hq-kpi-miya-a", page: 9, cap: { vi: "Bảng KPI theo ngày của page Miya", en: "Daily KPI sheet for the Miya page", zh: "Miya 专页每日 KPI 表" } },
      { img: "hq-page-miya", page: 9, cap: { vi: "Page Miya: 328K người theo dõi", en: "Miya page: 328K followers", zh: "Miya 专页：32.8 万粉丝" } },
      { img: "hq-page-chibokay", page: 8, cap: { vi: "Page Chibokay: 982K người theo dõi", en: "Chibokay page: 982K followers", zh: "Chibokay 专页：98.2 万粉丝" } },
      { img: "hq-page-cellmovie", page: 8, cap: { vi: "Page Cell Movie Review: 821K người theo dõi", en: "Cell Movie Review page: 821K followers", zh: "Cell Movie Review 专页：82.1 万粉丝" } },
      { img: "hq-page-skyfinz", page: 8, cap: { vi: "Page SKYFINz: 800K người theo dõi", en: "SKYFINz page: 800K followers", zh: "SKYFINz 专页：80 万粉丝" } },
      { img: "hq-page-micahoya", page: 8, cap: { vi: "Page MicaHoya.TV: 645K người theo dõi", en: "MicaHoya.TV page: 645K followers", zh: "MicaHoya.TV 专页：64.5 万粉丝" } },
      { img: "hq-page-gsbird", page: 8, cap: { vi: "Page GsBird: 571K người theo dõi", en: "GsBird page: 571K followers", zh: "GsBird 专页：57.1 万粉丝" } },
    ],
    date: { vi: "02/2024 - 02/2026", en: "02/2024 - 02/2026", zh: "2024/02 - 2026/02" },
    vi: {
      title: "HQ Group · Fanpage review phim",
      meta: "4.000 - 5.000 USD/tháng · Top 1 doanh thu team",
      role: "Social Media & Video Content Executive",
      bullets: [
        "Xây dựng hệ thống Fanpage review phim, tăng traffic trong nước và quốc tế.",
        "Sản xuất và tối ưu video content có lượt xem cao, hoàn thành mục tiêu doanh thu.",
        "Vận hành Fanpage, phân tích dữ liệu và báo cáo hằng ngày, cải tiến nội dung bằng AI Tools.",
      ],
      stats: [["31,1M", "lượt xem Facebook, 07/2025"], ["$4-5K", "doanh thu/tháng"], ["Top 1", "doanh thu tháng toàn team"]],
    },
    en: {
      title: "HQ Group · Movie review Fanpages",
      meta: "USD 4,000 - 5,000/month · #1 monthly revenue in team",
      role: "Social Media & Video Content Executive",
      bullets: [
        "Built a network of movie review Fanpages, growing domestic and international traffic.",
        "Produced and optimized high-view video content and hit revenue targets.",
        "Ran the Fanpages with daily data analysis and reports, improving content with AI tools.",
      ],
      stats: [["31.1M", "Facebook views, Jul 2025"], ["$4-5K", "revenue/month"], ["#1", "monthly revenue in team"]],
    },
    zh: {
      title: "HQ Group · 电影解说粉丝专页",
      meta: "每月 4,000 - 5,000 美元 · 团队月收入第一",
      role: "社交媒体与视频内容专员",
      bullets: [
        "搭建电影解说粉丝专页矩阵，提升国内外流量。",
        "制作并优化高播放量视频内容，完成收入目标。",
        "运营粉丝专页，每日进行数据分析与汇报，并借助 AI 工具改进内容。",
      ],
      stats: [["3110万", "Facebook 播放量（2025年7月）"], ["$4-5K", "月收入"], ["第一", "团队月收入排名"]],
    },
  },
  {
    id: "tygy",
    cover: "tygy-tiktok",
    phone: true,
    evidence: [
      { img: "tygy-fb", page: 7, cap: { vi: "Facebook Tổng Kho Nhạc Cụ TYGY: 55K người theo dõi", en: "TYGY Facebook: 55K followers", zh: "TYGY Facebook：5.5 万粉丝" } },
      { img: "tygy-tiktok", page: 7, cap: { vi: "TikTok Nhạc Cụ TYGY Music: 1.801 follower, 18,1K lượt thích", en: "TYGY TikTok: 1,801 followers, 18.1K likes", zh: "TYGY TikTok：1,801 粉丝，1.81 万点赞" } },
      { img: "tygy-yt", page: 7, cap: { vi: "YouTube @nhaccutygy5999: 1,35K người đăng ký, 389 video", en: "YouTube @nhaccutygy5999: 1.35K subscribers, 389 videos", zh: "YouTube @nhaccutygy5999：1,350 订阅，389 个视频" } },
    ],
    date: { vi: "08/2023 - 01/2024", en: "08/2023 - 01/2024", zh: "2023/08 - 2024/01" },
    vi: {
      title: "TYGY Music · TikTok Shop",
      meta: "~15 đơn/ngày từ TikTok Shop & Shopee",
      role: "Social Media & Video Content Executive",
      bullets: [
        "Xây dựng kênh TikTok, YouTube, Facebook từ con số 0 theo hành vi Target Audience.",
        "Sản xuất video ngắn thu hút leads, kết hợp giải trí và bán hàng trực tiếp.",
        "Tối ưu quy trình TikTok Shop và Shopee, tăng tỉ lệ chuyển đổi thực tế.",
      ],
      stats: [["15", "đơn/ngày từ nội dung"], ["55K", "người theo dõi Facebook"]],
    },
    en: {
      title: "TYGY Music · TikTok Shop",
      meta: "~15 orders/day from TikTok Shop & Shopee",
      role: "Social Media & Video Content Executive",
      bullets: [
        "Built TikTok, YouTube and Facebook channels from zero around the target audience's behavior.",
        "Produced short videos that attract leads, mixing entertainment with direct selling.",
        "Optimized the TikTok Shop and Shopee flow to raise real conversion.",
      ],
      stats: [["15", "orders/day from content"], ["55K", "Facebook followers"]],
    },
    zh: {
      title: "TYGY Music · TikTok 小店",
      meta: "TikTok 小店与 Shopee 日均约 15 单",
      role: "社交媒体与视频内容专员",
      bullets: [
        "根据目标受众行为，从零搭建 TikTok、YouTube、Facebook 频道。",
        "制作吸引潜在客户的短视频，将娱乐与直接销售相结合。",
        "优化 TikTok 小店与 Shopee 流程，提升实际转化率。",
      ],
      stats: [["15", "单/天（来自内容）"], ["5.5万", "Facebook 粉丝"]],
    },
  },
  {
    id: "s365",
    cover: "365-tiktok",
    phone: true,
    light: true,
    evidence: [
      { img: "365-fb", page: 6, cap: { vi: "Facebook Thể thao 365: 17K người theo dõi", en: "Thể thao 365 Facebook: 17K followers", zh: "Thể thao 365 Facebook：1.7 万粉丝" } },
      { img: "365-yt", page: 6, cap: { vi: "YouTube @thethao365thethao: 5,23K người đăng ký", en: "YouTube @thethao365thethao: 5.23K subscribers", zh: "YouTube @thethao365thethao：5,230 订阅" } },
      { img: "365-tiktok", page: 6, cap: { vi: "TikTok Thể Thao 365 Store: 3.238 follower, 50K lượt thích", en: "Thể Thao 365 Store TikTok: 3,238 followers, 50K likes", zh: "Thể Thao 365 Store TikTok：3,238 粉丝，5 万点赞" } },
    ],
    date: null,
    vi: {
      title: "Thể Thao 365 · Content & Sales",
      meta: "Xây kênh TikTok, Facebook, YouTube từ con số 0",
      role: "Social Media & Content Executive",
      bullets: [
        "Sản xuất nội dung đa nền tảng (TikTok, Facebook).",
        "Tối ưu nội dung theo hành vi người dùng.",
        "Hỗ trợ tăng traffic và chuyển đổi bán hàng.",
      ],
      stats: [["17K", "người theo dõi Facebook"], ["5,23K", "subscriber YouTube"]],
    },
    en: {
      title: "Thể Thao 365 · Content & Sales",
      meta: "Built TikTok, Facebook and YouTube channels from zero",
      role: "Social Media & Content Executive",
      bullets: [
        "Produced multi-platform content (TikTok, Facebook).",
        "Optimized content around user behavior.",
        "Helped grow traffic and sales conversion.",
      ],
      stats: [["17K", "Facebook followers"], ["5.23K", "YouTube subscribers"]],
    },
    zh: {
      title: "Thể Thao 365 · 内容与销售",
      meta: "从零搭建 TikTok、Facebook、YouTube 频道",
      role: "社交媒体与内容专员",
      bullets: [
        "制作多平台内容（TikTok、Facebook）。",
        "根据用户行为优化内容。",
        "协助提升流量与销售转化。",
      ],
      stats: [["1.7万", "Facebook 粉丝"], ["5,230", "YouTube 订阅"]],
    },
  },
];

const LANG_KEY = "duyanh-lang";

function getLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl && I18N[fromUrl]) return fromUrl;
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && I18N[saved]) return saved;
  } catch {}
  return "vi";
}

function t(key, lang = getLang()) {
  return I18N[lang][key] ?? I18N.vi[key] ?? key;
}
