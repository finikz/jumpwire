import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const seriesPath = path.join(root, 'public/events/wo-you-ge-peng-you')
const siteUrl = 'https://jumpwire.cn'
const seriesUrl = `${siteUrl}/events/wo-you-ge-peng-you/`
const posterBase = '/events/wo-you-ge-peng-you/posters'

const events = [
  {
    vol: '01',
    slug: 'esther',
    guest: '吖史 Esther',
    theme: '不必时刻紧绷：当代年轻人，如何给自己制造松弛感',
    dateLabel: '2026 年 7 月 31 日',
    timeLabel: '20:30',
    dateIso: '2026-07-31T20:30:00+08:00',
    cover: `${posterBase}/vol-01-esther.jpg`,
    intro: '海报介绍 Esther 拥有几种看似不相干的身份：产业地产高管、捏捏收藏家，以及一位“宝藏隐藏歌手”。这一期从当代年轻人的紧绷感出发，聊聊我们如何给自己制造一点松弛感。',
    points: [
      '松弛感究竟是一种状态，还是可以被练习的生活方法？',
      '工作、收藏、唱歌等不同身份，如何在同一个人身上共存？',
      '在持续被要求“更快、更好”的生活里，怎样给自己留出喘息的空间？',
    ],
    description: '九维精酿 JUMPWIRE「我有一个朋友」第 1 期，嘉宾吖史 Esther，围绕当代年轻人的紧绷感与松弛感，聊工作、兴趣和如何给自己制造喘息空间。',
  },
  {
    vol: '02',
    slug: 'vika',
    guest: 'Vika',
    theme: '聚光灯熄灭后，于 AI 浪潮重建自我',
    dateLabel: '2026 年 8 月 7 日',
    timeLabel: '20:30',
    dateIso: '2026-08-07T20:30:00+08:00',
    cover: `${posterBase}/vol-02-vika.jpg`,
    intro: 'Vika 曾经站在聚光灯下，也正在 AI 短剧行业里寻找新的位置。这一期不只谈“转型”，更谈一个人在熟悉的光环褪去之后，如何面对变化、重新出发。',
    points: [
      '从模特行业进入 AI 短剧，身份变化带来了哪些新的可能？',
      '当原有经验不再自动兑换成优势，如何重新建立自己的位置？',
      '面对行业冲击与技术浪潮，什么才是一个人真正带得走的能力？',
    ],
    description: '九维精酿 JUMPWIRE「我有一个朋友」第 2 期，嘉宾 Vika（前模特、AI 短剧从业者），讨论光环褪去之后如何面对行业变化并重新出发。',
  },
  {
    vol: '03',
    slug: 'aze-tattoo',
    guest: '阿泽（南田路董亚千）',
    theme: '我给九维纹个身',
    dateLabel: '2026 年 8 月 14 日',
    timeLabel: '20:30',
    dateIso: '2026-08-14T20:30:00+08:00',
    cover: `${posterBase}/vol-03-aze.jpg`,
    intro: '阿泽是一位纹身师。这一期从肌肤之下、纹路背后的故事聊起：为什么有人想给自己留点纪念？一幅图案怎样从好奇、犹豫，变成身体上的长期记忆？',
    points: [
      '刺青与纹身之间，藏着哪些关于身体、记忆和自我表达的故事？',
      '第一次想纹身的人，通常在犹豫什么、期待什么？',
      '纹身师如何听懂一个人的想法，再把它变成可以留在身上的图案？',
    ],
    offer: '不设门票，低消任意一杯饮品。',
    signup: '报名：18529200506（微信同号）',
    description: '九维精酿 JUMPWIRE「我有一个朋友」第 3 期，嘉宾阿泽（南田路董亚千），以纹身为入口，聊肌肤之下与纹路背后的故事。',
  },
  {
    vol: '04',
    slug: 'guo-daxiong',
    guest: '郭大雄',
    theme: '你给猫狗买的粮，是安慰剂还是真心话？',
    dateLabel: '2026 年 8 月 28 日',
    timeLabel: '20:30',
    dateIso: '2026-08-28T20:30:00+08:00',
    cover: `${posterBase}/vol-04-guo-daxiong.jpg`,
    intro: '郭大雄长期在宠物行业与创业投资之间工作。这一期从一袋宠物粮出发，把宠物食品的成本、养宠人的焦虑，以及“我们愿意为陪伴花多少钱”放到同一张桌子上。',
    points: [
      '宠物粮的成本与价格，怎样影响我们对“好”的判断？',
      '养宠人的焦虑从哪里来，又是如何被消费选择放大的？',
      '给宠物花钱，到底是在购买功能、安心，还是一种陪伴关系？',
    ],
    description: '九维精酿 JUMPWIRE「我有一个朋友」第 4 期，嘉宾郭大雄（宠业创投家），从宠物粮与养宠消费聊宠物行业、成本和养宠人的焦虑。',
  },
  {
    vol: '05',
    slug: 'kelly',
    guest: 'Kelly',
    theme: '好看的东西，如何在现实里生长？',
    dateLabel: '日期未在海报标注',
    timeLabel: '',
    cover: `${posterBase}/vol-05-kelly.jpg`,
    intro: 'Kelly 出生于广州，曾在英国学习 Fashion Design 与 Branding，后来走进设计师品牌的现实现场。这一期聊审美如何进入现实，也聊喜欢的事如何慢慢长成一份工作。',
    points: [
      '从广州到英国，再到设计师品牌现场，审美如何变成工作语言？',
      '“好看”之外，品牌运营还要面对哪些现实问题？',
      '喜欢的事情怎样经过长期实践，慢慢长成可持续的工作？',
    ],
    offer: '不设门票，低消任意一杯饮品。',
    signup: '报名：18529200506（微信同号）',
    description: '九维精酿 JUMPWIRE「我有一个朋友」第 5 期，嘉宾 Kelly（品牌运营），从广州、英国与设计师品牌现场出发，讨论审美如何进入现实并长成工作。',
  },
  {
    vol: '06',
    slug: 'olivia-mo',
    guest: 'Olivia Mo',
    theme: '怎么不被 AI 抢饭碗',
    dateLabel: '2026 年 9 月 11 日',
    timeLabel: '21:00',
    dateIso: '2026-09-11T21:00:00+08:00',
    cover: `${posterBase}/vol-06-olivia-mo.jpg`,
    intro: 'Olivia Mo 的经历横跨机器人开发与应用、大数据分析、数据挖掘、大学教学、科研管理、云业务与国有企业管理，也曾参与澳门智慧城市智囊团。这一期从一个很直接的问题开始：怎么不被 AI 抢饭碗？',
    points: [
      'AI 真正改变的，是哪些工作环节，而不只是哪些岗位名称？',
      '机器人、数据分析和数据挖掘，如何从技术名词进入普通人的工作现场？',
      '面对技术变化，个人应该补什么能力，又该保留什么不可替代的部分？',
    ],
    description: '九维精酿 JUMPWIRE「我有一个朋友」第 6 期，嘉宾 Olivia Mo，围绕 AI、机器人、数据分析与职业变化，讨论普通人如何面对技术浪潮。',
  },
]

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const locationSchema = {
  '@type': 'Place',
  name: '九维精酿 JUMPWIRE',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '南田路汾阳里 5 号',
    addressLocality: '广州市',
    addressRegion: '广东省',
    postalCode: '510240',
    addressCountry: 'CN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 23.0968, longitude: 113.2735 },
}

const organizerSchema = {
  '@type': 'Organization',
  name: '九维精酿 JUMPWIRE',
  url: `${siteUrl}/`,
}

const seriesSchema = {
  '@type': 'EventSeries',
  '@id': `${seriesUrl}#series`,
  name: '我有一个朋友',
  description: '九维精酿 JUMPWIRE 人物对谈系列，从一次聊天开始，认识一个有趣的人，也认识他或她正在经历的世界。',
  url: seriesUrl,
  organizer: organizerSchema,
  location: locationSchema,
}

const eventSchema = (event) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${siteUrl}/events/wo-you-ge-peng-you/${event.slug}/#event`,
    name: `我有一个朋友 · ${event.guest}：${event.theme}`,
    description: event.description,
    image: `${siteUrl}${event.cover}`,
    url: `${siteUrl}/events/wo-you-ge-peng-you/${event.slug}/`,
    eventStatus: 'https://schema.org/EventCompleted',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    performer: { '@type': 'Person', name: event.guest },
    location: locationSchema,
    organizer: organizerSchema,
    isPartOf: { '@id': `${seriesUrl}#series` },
  }
  if (event.dateIso) schema.startDate = event.dateIso
  return schema
}

const sharedStyle = `<style>
.series-page,.event-detail{max-width:980px}.series-hero{padding:34px 0 56px;border-bottom:1px solid #46544b}.series-hero h1{max-width:760px}.series-hero p{max-width:720px}.series-list{display:grid;gap:18px;margin-top:38px}.series-card{display:grid;grid-template-columns:180px 1fr;gap:26px;padding:18px;border:1px solid #46544b;background:#141d17;text-decoration:none;color:#eef2e8;transition:border-color .2s,transform .2s}.series-card:hover{border-color:#d8e87b;transform:translateY(-3px)}.series-card img{width:100%;aspect-ratio:3/4;object-fit:cover;background:#0b100c}.series-card h2{margin:8px 0 12px;font-size:30px}.series-card .meta,.event-meta{color:#d8e87b;font:12px/1.6 'DM Mono',monospace;letter-spacing:.05em}.series-card p{margin:0;color:#b3beb2}.event-detail header{padding:34px 0 34px;border-bottom:1px solid #46544b}.event-detail header h1{max-width:840px}.event-detail .lede{max-width:780px;font-size:22px;color:#d4dbd2}.event-poster{display:block;width:min(100%,620px);margin:42px auto 54px;border:1px solid #46544b;background:#0b100c}.event-detail h2{margin-top:44px}.event-detail ul{padding-left:1.3em}.event-detail li{margin:10px 0}.event-note{padding:16px;border-left:2px solid #d8e87b;color:#b3beb2}.event-navigation{display:flex;justify-content:space-between;gap:18px;margin-top:56px;padding-top:24px;border-top:1px solid #46544b}.event-navigation a{max-width:48%;text-decoration:none}.event-navigation span{display:block;color:#9eaa9f;font-size:13px;margin-bottom:4px}.event-navigation strong{font-size:16px}@media(max-width:640px){.series-card{grid-template-columns:104px 1fr;gap:16px;padding:12px}.series-card h2{font-size:21px;margin:4px 0 8px}.series-card p{font-size:14px;line-height:1.65}.event-detail .lede{font-size:18px}.event-navigation{display:block}.event-navigation a{display:block;max-width:none;margin-top:18px}}
</style>`

const header = `<nav class="site-nav" aria-label="网站导航"><a class="site-brand" href="/" aria-label="九维精酿首页"><img src="/brand-logo-jumpwire.png" alt="" /><span>九维精酿<small>JUMPWIRE CRAFT BEER</small></span></a><div class="site-nav-links"><a href="/">首页</a><a href="/menu/">酒单</a><a href="/events/">活动</a><a href="/notes/">精酿笔记</a></div></nav>`
const footer = `<footer class="site-footer"><span>跳线更高维度 · © 2026 九维精酿 JUMPWIRE</span><nav aria-label="页脚导航"><a href="/menu/">酒单</a><a href="/events/">活动</a><a href="/about/">关于九维</a></nav></footer>`

const documentHtml = ({ title, description, canonical, schema, body }) => `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="/seo-page.css"><link rel="stylesheet" href="/about/about.css">${sharedStyle}<title>${escapeHtml(title)}</title><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body>${header}${body}${footer}<script src="/image-watermark.js" defer></script></body></html>`

const dateText = (event) => event.timeLabel ? `${event.dateLabel} · ${event.timeLabel}` : event.dateLabel

const seriesItems = [...events].reverse().map((event, index) => `<a class="series-card" href="/events/wo-you-ge-peng-you/${event.slug}/"><img src="${event.cover}" alt="我有一个朋友第 ${event.vol} 期 ${escapeHtml(event.guest)} 活动海报"><div><div class="meta">VOL.${event.vol} · ${escapeHtml(dateText(event))}</div><h2>${escapeHtml(event.guest)}：${escapeHtml(event.theme)}</h2><p>${escapeHtml(event.description)}</p></div></a>`).join('')
const itemList = [...events].reverse().map((event, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Event', '@id': `${siteUrl}/events/wo-you-ge-peng-you/${event.slug}/#event`, name: `我有一个朋友 · ${event.guest}：${event.theme}`, url: `${siteUrl}/events/wo-you-ge-peng-you/${event.slug}/`, image: `${siteUrl}${event.cover}` } }))

const seriesBody = `<main class="series-page"><a class="back" href="/events/">← 返回活动列表</a><header class="series-hero"><p class="eyebrow">JUMPWIRE · EVENT SERIES</p><h1>我有一个朋友</h1><p>从一次聊天开始，认识一个有趣的人，也认识他或她正在经历的世界。</p><p>这是九维精酿 JUMPWIRE 的人物对谈系列。我们邀请不同领域的人坐下来，聊工作、选择、变化、兴趣和那些不一定适合被写进简历的部分。</p></header><section><h2>期数档案</h2><p class="muted">按期数倒序排列。点击每张卡片，查看嘉宾、主题与活动信息。</p><div class="series-list">${seriesItems}</div></section><p class="event-note">具体期数、嘉宾、时间和报名安排，以九维最新发布为准。活动地点：广州市海珠区南田路汾阳里 5 号。</p></main>`
const seriesSchemaGraph = { '@context': 'https://schema.org', '@graph': [seriesSchema, { '@type': 'ItemList', name: '我有一个朋友活动期数', itemListElement: itemList }] }
fs.writeFileSync(path.join(seriesPath, 'index.html'), documentHtml({ title: '我有一个朋友｜九维精酿 JUMPWIRE 人物对谈系列', description: '我有一个朋友是九维精酿 JUMPWIRE 的人物对谈系列。查看吖史 Esther、Vika、阿泽、郭大雄、Kelly、Olivia Mo 等嘉宾的每期档案。', canonical: seriesUrl, schema: seriesSchemaGraph, body: seriesBody }))

for (const [index, event] of events.entries()) {
  const eventUrl = `${seriesUrl}${event.slug}/`
  const schema = eventSchema(event)
  const pointsHtml = event.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')
  const older = events[index - 1]
  const newer = events[index + 1]
  const navigation = `<nav class="event-navigation" aria-label="系列期数导航">${older ? `<a href="/events/wo-you-ge-peng-you/${older.slug}/"><span>上一期</span><strong>VOL.${older.vol} · ${escapeHtml(older.guest)}</strong></a>` : '<span></span>'}${newer ? `<a href="/events/wo-you-ge-peng-you/${newer.slug}/"><span>下一期</span><strong>VOL.${newer.vol} · ${escapeHtml(newer.guest)}</strong></a>` : '<a href="/events/wo-you-ge-peng-you/"><span>返回系列</span><strong>查看全部期数 →</strong></a>'}</nav>`
  const body = `<main class="event-detail"><a class="back" href="/events/wo-you-ge-peng-you/">← 返回“我有一个朋友”系列</a><header><p class="eyebrow">JUMPWIRE · VOL.${event.vol}</p><h1>${escapeHtml(event.theme)}</h1><p class="lede">${escapeHtml(event.description)}</p></header><img class="event-poster" src="${event.cover}" alt="我有一个朋友第 ${event.vol} 期，嘉宾 ${escapeHtml(event.guest)} 的活动海报"><section><h2>嘉宾是谁</h2><p>${escapeHtml(event.intro)}</p></section><section><h2>这期聊什么</h2><ul>${pointsHtml}</ul></section><section><h2>现场亮点</h2><p class="muted">暂未整理现场亮点。</p></section><section><h2>来九维坐坐</h2><p>活动结束了，话题没有结束。九维精酿 JUMPWIRE 位于广州市海珠区南田路汾阳里 5 号，欢迎到店继续聊。</p><a class="cta" href="/about/#visit">查看到店信息 ↗</a></section>${navigation}</main>`
  fs.mkdirSync(path.join(seriesPath, event.slug), { recursive: true })
  fs.writeFileSync(path.join(seriesPath, event.slug, 'index.html'), documentHtml({ title: `我有一个朋友 · ${event.guest}：${event.theme}｜九维精酿 JUMPWIRE`, description: event.description, canonical: eventUrl, schema, body }))
}

console.log(`Generated ${events.length + 1} pages.`)
