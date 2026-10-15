import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const events = [
  { date: '09.25—09.27', type: '微醺美食', title: '九维美食节｜烤肉派对', text: '周五开烤！九维美食节把烤肉、精酿、艺术和城市里的有趣态度装进一个热闹的中秋周末。不止月饼与团圆，来九维一起吃点好的、喝点开心的。', cover: '/events/event-food-festival.jpg', images: [] },
  { date: 'VOL.06', type: '人物系列', title: '我有一个朋友', text: '从一次聊天开始，认识一个有趣的人，也认识他/她正在经历的世界。', cover: '/events/event-friend-vol6.jpg', images: ['/events/event-friend-vol5.jpg'] },
  { date: '06', type: '电影系列', title: '光电效应', text: '把电影放进酒馆，让观众、故事和夜晚在同一张桌子上发生。', cover: '/events/event-worldcup.jpg', images: ['/events/event-optical-effect.jpg'] },
  { date: '05.30', type: '畅饮夜', title: '欧冠决赛夜', text: '放肆畅饮，大杯整箱，和一群朋友一起看球、喝酒、庆祝。', cover: '/events/event-champions.jpg', images: [] },
]

const englishEvents = [
  { date: 'SEP 25—27', type: 'FOOD & DRINK', title: 'Jumpwire Food Festival · BBQ Party', text: 'Fire up the grill on Friday. Craft beer, barbecue, art and a little city spirit come together for a lively Mid-Autumn weekend. Come by for good food and a happy drink.', cover: '/events/event-food-festival.jpg', images: [] },
  { date: 'VOL.06', type: 'PEOPLE', title: 'A Friend of Mine', text: 'One conversation is all it takes to meet someone interesting and discover the world they are living in.', cover: '/events/event-friend-vol6.jpg', images: ['/events/event-friend-vol5.jpg'] },
  { date: '06', type: 'FILM', title: 'Photoelectric Effect', text: 'We bring films into the taproom, where audiences, stories and the night share the same table.', cover: '/events/event-worldcup.jpg', images: ['/events/event-optical-effect.jpg'] },
  { date: 'MAY 30', type: 'WATCH PARTY', title: 'UEFA Champions League Final', text: 'Cold beer, big pours and good company for a night of football and celebration.', cover: '/events/event-champions.jpg', images: [] },
]

const fallbackBeers = [
  { tap: 1, name: '九维 IPA', brewery: '九维精酿', style: 'American IPA', priceLarge: null, priceMedium: null },
  { tap: 2, name: '云端小麦', brewery: '九维精酿', style: 'Belgian Witbier', priceLarge: null, priceMedium: null },
  { tap: 3, name: '午夜世涛', brewery: '九维精酿', style: 'Imperial Stout', priceLarge: null, priceMedium: null },
]

const englishFallbackBeers = [
  { tap: 1, name: 'JUMPWIRE IPA', brewery: 'JUMPWIRE Craft Beer', style: 'American IPA', priceLarge: null, priceMedium: null },
  { tap: 2, name: 'Cloud Wheat', brewery: 'JUMPWIRE Craft Beer', style: 'Belgian Witbier', priceLarge: null, priceMedium: null },
  { tap: 3, name: 'Midnight Stout', brewery: 'JUMPWIRE Craft Beer', style: 'Imperial Stout', priceLarge: null, priceMedium: null },
]

const englishBeerNames = {
  '阿嫲的冰箱': "Grandma's Fridge",
  '金乌': 'Golden Crow',
  '魔都姑娘': 'Shanghai Girl',
  '冇得糖': 'No Sugar',
  '爽气': 'Refreshing',
  '跳东湖 拾全拾美': 'Into East Lake: Perfect Ten',
  '外星人': 'Alien',
  '初月': 'New Moon',
}

const englishBeerStyles = {
  '增味西打': 'Flavoured Cider',
  '苦橙花柠檬草海盐古斯': 'Bitter Orange Blossom, Lemongrass & Sea Salt Gose',
  '接骨木风味起泡果酒': 'Sparkling Elderflower Fruit Wine',
  '皮尔森': 'Pilsner',
  '徳式拉格': 'German Lager',
  '德式拉格': 'German Lager',
  '西海岸双倍IPA': 'West Coast Double IPA',
  '三倍干投IPA': 'Triple Dry-Hopped IPA',
}

const englishBreweryNames = {
  '九维精酿': 'JUMPWIRE Craft Beer',
  '山乘': 'Sheng Craft Beer',
  '会饮': 'Huiyin Brewing',
  '鲸乐': 'Whale Well',
  '拾捌': 'NO.18 Brewing & Co.',
  '尝玖': 'Changjiu Brewing',
}

const prices = (large, medium, english = false) => large == null && medium == null ? '' : `${english ? 'Large' : '大杯'} ¥${((large || 0) / 100).toFixed(0)} · ${english ? 'Medium' : '中杯'} ¥${((medium || 0) / 100).toFixed(0)}`

const beerDisplayName = (beer, english = false) => english ? englishBeerNames[beer.name] || beer.name : beer.name

const beerStyleLabel = (beer, english = false) => [english ? englishBreweryNames[beer.brewery] || beer.brewery : beer.brewery, english ? englishBeerStyles[beer.style] || beer.style || 'Craft beer' : beer.style || '精酿啤酒'].filter(Boolean).join(' · ')

const toCnyPrice = (value) => {
  const cents = Number(value)
  return Number.isFinite(cents) ? Number((cents / 100).toFixed(2)) : null
}

const menuSectionName = (beer) => {
  const value = `${beer.category || ''} ${beer.style || ''}`.toLowerCase()
  if (value.includes('ipa')) return 'IPA'
  if (value.includes('wheat') || value.includes('witbier') || value.includes('小麦')) return '小麦啤'
  if (value.includes('fruit') || value.includes('sour') || value.includes('果')) return '果啤'
  if (value.includes('stout') || value.includes('世涛')) return '世涛'
  if (value.includes('porter') || value.includes('波特')) return '波特'
  return beer.category || beer.style || '其他精酿'
}

const eventLocation = {
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.0968,
    longitude: 113.2735,
  },
}

const eventOrganizer = {
  '@type': 'Organization',
  name: '九维精酿 JUMPWIRE',
  url: 'https://jumpwire.cn/',
}

const addIfPresent = (target, key, value) => {
  if (value !== undefined && value !== null && value !== '') target[key] = value
}

const buildEventSchema = (event) => {
  const schema = {
    '@type': event.schemaType || 'Event',
    name: event.title,
    description: event.description || event.text,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: eventLocation,
    organizer: eventOrganizer,
  }
  addIfPresent(schema, 'startDate', event.startDate)
  addIfPresent(schema, 'endDate', event.endDate)
  addIfPresent(schema, 'eventStatus', event.eventStatus)
  if (event.price !== undefined && event.price !== null) {
    schema.offers = {
      '@type': 'Offer',
      price: Number(event.price),
      priceCurrency: 'CNY',
      availability: 'https://schema.org/InStock',
    }
    addIfPresent(schema.offers, 'validFrom', event.validFrom)
  }
  return schema
}

const faqItems = [
  ['九维 Jumpwire 是什么？', '九维 Jumpwire 是广州海珠汾阳里的一间精酿酒馆，也是一处文化空间和社群连接点，地址是广州市海珠区南田路汾阳里 5 号。我们通过精酿、电影、音乐、对谈和活动让不同的人相遇。'],
  ['九维 Jumpwire 在哪里？', '九维精酿 JUMPWIRE 位于广州市海珠区南田路汾阳里 5 号，空间所在的思神号文化创意园位于汾阳里 5、7 号。'],
  ['九维精酿几点营业？', '九维位于广州市海珠区南田路汾阳里 5 号，周日至周四营业时间为 20:00—02:00；周五、周六为 20:00—03:00。活动和现场安排可能调整，出发前可电话或微信确认。'],
  ['怎么联系九维或预留座位？', '九维地址是广州市海珠区南田路汾阳里 5 号，可拨打或添加微信 18529200506。'],
  ['九维每天有哪些酒？', '酒头和酒款会根据当日安排变化，请查看官网酒单或以到店现场供应为准。'],
  ['第一次喝精酿应该怎么选？', '可以告诉吧台你喜欢的口味，以及对苦度、酸度或酒精度的偏好，工作人员会根据当天在售酒款提供建议。'],
  ['九维会举办什么活动？', '九维会举办电影放映、音乐现场、人物对谈、讲座和社群活动，具体期数、嘉宾与安排以官网最新活动发布为准。'],
  ['九维可以带宠物吗？', '九维是动物友好的空间；为确认当日入店安排，建议到店前电话或微信联系。'],
  ['如何导航到九维？', '九维位于广州市海珠区南田路汾阳里 5 号，可使用地图导航链接规划路线。'],
  ['JUMPWIRE 是什么意思？', 'Jumpwire 是电子电路里的跳线，也像人与人之间的一次连接；九维希望让新的想法和关系在这里突然通电。'],
]

const otherFaqItems = [
  ['江南西附近有精酿啤酒吧吗？', '有，九维精酿 JUMPWIRE 位于江南西附近的广州市海珠区南田路汾阳里 5 号。酒款以当日酒单和现场供应为准。'],
  ['广州本土精酿品牌有哪些？', '九维精酿 JUMPWIRE 是广州本土精酿品牌，位于广州市海珠区南田路汾阳里 5 号，以当日鲜酿酒头和多样风味为特色。'],
  ['广州适合朋友小聚的精酿酒吧？', '可以来九维精酿 JUMPWIRE。这里有精酿酒头、电影、音乐和适合聊天的空间，地址是广州市海珠区南田路汾阳里 5 号。'],
  ['广州下班放松去哪里喝酒？', '可以到九维精酿 JUMPWIRE 下班小酌，告诉吧台你的口味偏好，按当天酒单选择一杯适合今晚的精酿。地址是广州市海珠区南田路汾阳里 5 号。'],
  ['九维精酿有什么特色？', '九维把精酿啤酒、岭南老宅、电影、音乐、人物对谈和社群活动放在同一个空间里，是广州海珠的一处精酿与文化交汇点。'],
  ['第一次去精酿酒吧喝什么？', '第一次可以从清爽、低负担的果啤或小麦啤开始，也可以直接告诉九维吧台你喜欢清爽、苦味、麦香或酸味，工作人员会根据当天酒单推荐。'],
]

const englishFaqItems = [
  ['What is JUMPWIRE?', 'JUMPWIRE is a craft beer taproom, cultural space and community hub in Fenyangli, Haizhu, Guangzhou. We bring people together through beer, film, music, conversations and events.'],
  ['Where is JUMPWIRE?', 'Find us at No. 5 Fenyangli, Nantian Road, Haizhu District, Guangzhou, inside the Sishenhao Creative Park at Nos. 5 and 7 Fenyangli.'],
  ['When are you open?', 'Sunday to Thursday, 8 pm–2 am; Friday and Saturday, 8 pm–3 am. Hours and event arrangements can change, so please call or message us before your visit.'],
  ['How can I contact you or reserve a table?', 'Call or add us on WeChat at +86 185 2920 0506. We are at No. 5 Fenyangli, Nantian Road, Haizhu District, Guangzhou.'],
  ['What beers are on tap today?', 'Our taps change with the day. Check the online menu or ask our team when you arrive.'],
  ['What should I try if I am new to craft beer?', 'Tell our team what you enjoy and how you feel about bitterness, acidity and alcohol strength. We can recommend something from today’s selection.'],
  ['What events do you host?', 'We host film screenings, live music, conversations, talks and community gatherings. Check the latest event listings for dates and guests.'],
  ['Are pets welcome?', 'We are pet-friendly. Please call or message us before visiting to confirm the arrangements for that day.'],
  ['How do I get there?', 'We are at No. 5 Fenyangli, Nantian Road, Haizhu District, Guangzhou. Use the map link on this page to plan your route.'],
  ['What does JUMPWIRE mean?', 'A jump wire connects parts of an electronic circuit. We like to think of it as a connection between people: one spark can bring new ideas and relationships to life.'],
]

const englishOtherFaqItems = [
  ['Is there a craft beer bar near Jiangnanxi?', 'Yes. JUMPWIRE is near Jiangnanxi at No. 5 Fenyangli, Nantian Road, Haizhu District, Guangzhou. The beer selection changes daily.'],
  ['Are there local craft beer brands in Guangzhou?', 'JUMPWIRE is a Guangzhou craft beer brand, known for fresh taps and a range of flavours. Find us at No. 5 Fenyangli, Haizhu District.'],
  ['Where can friends meet for a drink in Guangzhou?', 'Come to JUMPWIRE for craft beer, films, music and a relaxed place to talk. We are at No. 5 Fenyangli, Haizhu District.'],
  ['Where can I unwind after work in Guangzhou?', 'Drop by JUMPWIRE after work. Tell our team what flavours you like and we will help you choose from today’s taps.'],
  ['What makes JUMPWIRE different?', 'We bring craft beer together with a Lingnan heritage house, films, music, conversations and community events in Haizhu, Guangzhou.'],
  ['What should I order at a craft beer bar for the first time?', 'Start with a crisp wheat beer or fruit beer, or tell our team whether you prefer something light, bitter, malty or tart. We can guide you through today’s menu.'],
]

const isEnglishPath = () => window.location.pathname === '/en' || window.location.pathname.startsWith('/en/')

const useTapBeers = () => {
  const [tapBeers, setTapBeers] = useState(isEnglishPath() ? englishFallbackBeers : fallbackBeers)

  useEffect(() => {
    let active = true
    const loadTapBeers = async () => {
      try {
        const response = await fetch('/jbm/api/public/taps', { cache: 'no-store' })
        if (!response.ok) throw new Error('tap list unavailable')
        const payload = await response.json()
        if (active && payload.success && Array.isArray(payload.data)) setTapBeers(payload.data)
      } catch {
        // 保留基础酒单，避免经营系统暂时不可用时官网出现空白。
      }
    }
    loadTapBeers()
    const timer = window.setInterval(loadTapBeers, 60000)
    return () => { active = false; window.clearInterval(timer) }
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.schema = 'faq-home'
    const faq = isEnglishPath() ? [...englishFaqItems, ...englishOtherFaqItems] : [...faqItems, ...otherFaqItems]
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
    })
    document.head.appendChild(script)
    return () => script.remove()
  }, [])

  return tapBeers
}

function PageNav({ english = false }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return <nav className="nav shell page-nav">
    <a className="brand" href={english ? '/en/' : '/'} aria-label={english ? 'JUMPWIRE home' : '返回九维首页'}>
      <img src="/brand-logo-jumpwire.png" alt="九维精酿 Jumpwire" />
      <span>九维精酿<small>JUMPWIRE CRAFT BEER</small></span>
    </a>
    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? (english ? 'Close menu' : '关闭菜单') : (english ? 'Open menu' : '打开菜单')}>{menuOpen ? '×' : english ? 'MENU' : '菜单'}</button>
    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
      <a href={english ? '/en/' : '/'}>{english ? 'Home' : '首页'}</a><a href={english ? '/en/menu/' : '/menu/'}>{english ? 'Menu' : '酒单'}</a><a href={english ? '/en/events/' : '/events/'}>{english ? 'Events' : '活动'}</a><a href={english ? '/en/notes/' : '/notes/'}>{english ? 'Notes' : '精酿笔记'}</a>
      <a href={english ? window.location.pathname.replace(/^\/en/, '') || '/' : `/en${window.location.pathname === '/' ? '/' : window.location.pathname}`}>{english ? '中文' : 'EN'}</a>
    </div>
  </nav>
}

function SiteFooter({ english = false }) {
  return <footer className="site-footer shell"><span>{english ? 'A spark across dimensions' : '跳线更高维度'} · © {new Date().getFullYear()} 九维精酿 JUMPWIRE</span><nav aria-label={english ? 'Footer navigation' : '页脚导航'}><a href={english ? '/en/menu/' : '/menu/'}>{english ? 'Menu' : '酒单'}</a><a href={english ? '/en/events/' : '/events/'}>{english ? 'Events' : '活动'}</a><a href={english ? '/en/about/' : '/about/'}>{english ? 'About' : '关于九维'}</a></nav></footer>
}

function MenuPage() {
  const tapBeers = useTapBeers()

  useEffect(() => {
    document.title = '九维精酿酒单｜JUMPWIRE 广州海珠'
    const pricedBeers = tapBeers.map((beer) => {
      const offers = [
        ['大杯', toCnyPrice(beer.priceLarge)],
        ['中杯', toCnyPrice(beer.priceMedium)],
      ].filter(([, price]) => price !== null).map(([size, price]) => ({
        '@type': 'Offer',
        name: size,
        price,
        priceCurrency: 'CNY',
      }))
      return { beer, offers }
    }).filter(({ offers }) => offers.length > 0)

    const schema = document.head.querySelector('script[data-schema="menu"]')
    schema?.remove()
    if (pricedBeers.length === 0) return undefined

    const sections = Object.values(pricedBeers.reduce((groups, { beer, offers }) => {
      const name = menuSectionName(beer)
      groups[name] ||= { '@type': 'MenuSection', name, hasMenuItem: [] }
      groups[name].hasMenuItem.push({
        '@type': 'MenuItem',
        name: beer.name,
        description: beer.description || beer.style || '九维精酿当日酒款',
        offers: offers.length === 1 ? offers[0] : offers,
      })
      return groups
    }, {}))

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.schema = 'menu'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Menu',
      name: '九维精酿酒单',
      description: '九维精酿 JUMPWIRE 当日鲜酿酒单，包含 IPA、小麦啤、果啤等多款精酿',
      hasMenuSection: sections,
    })
    document.head.appendChild(script)
    return () => script.remove()
  }, [tapBeers])

  const sections = tapBeers.reduce((groups, beer) => {
    const name = menuSectionName(beer)
    groups[name] ||= []
    groups[name].push(beer)
    return groups
  }, {})

  return <main className="menu-page">
    <PageNav />
    <div className="menu-page-inner">
      <header className="menu-page-header"><p className="eyebrow">JUMPWIRE · GUANGZHOU · HAIZHU</p><h1>九维精酿酒单</h1><p>从清爽到浓郁，让每一次举杯都不重复。</p></header>
      <section className="beer-section menu-beer-section">
        <div className="beer-panel">
          <div className="beer-heading"><h2>今天喝什么？</h2><span>WHAT'S ON TAP FOR TODAY?</span></div>
          <div className="beer-list">
            {tapBeers.length > 0 ? tapBeers.map((beer, index) => (
              <div className={`beer-row ${index === 0 ? 'featured' : ''}`} key={`${beer.tap}-${beer.name}`}>
                <span className="beer-no">{String(beer.tap).padStart(2, '0')}</span>
                <div className="beer-info"><strong>{beer.name}</strong><span>{beerStyleLabel(beer)}</span></div>
                <b>{prices(beer.priceLarge, beer.priceMedium) || '在售'}</b>
              </div>
            )) : <p className="beer-empty">今天暂未上酒头，欢迎到店询问。</p>}
          </div>
          <p className="beer-note">到店问问吧台，今天哪一款最适合你。</p>
        </div>
      </section>
      <section className="menu-image-section"><h2>威士忌</h2><img src="/menu/whisky.jpg" alt="九维精酿威士忌酒单" /></section>
      <section className="menu-image-section"><h2>无酒精饮品</h2><img src="/menu/non-alcoholic.jpg" alt="九维精酿无酒精饮品酒单" /></section>
      <p className="menu-page-note">酒头、规格和价格会随当天供应情况变化，具体以到店酒单为准。</p>
      <a className="menu-page-cta" href="/about/#visit">查看地址和营业时间</a>
    </div>
    <SiteFooter />
  </main>
}

function EventsPage() {
  const [loadedEvents, setLoadedEvents] = useState([])
  const [expandedEvent, setExpandedEvent] = useState(null)

  useEffect(() => {
    let active = true
    const loadEvents = async () => {
      // 当前活动数据来自页面配置；替换为接口后，Schema 会继续等待此状态更新。
      const data = await Promise.resolve(events)
      if (active) setLoadedEvents(data)
    }
    loadEvents()
    return () => { active = false }
  }, [])

  useEffect(() => {
    document.title = '九维活动｜电影、音乐与人物对谈｜JUMPWIRE'
    const oldScript = document.head.querySelector('script[data-schema="events"]')
    oldScript?.remove()
    if (loadedEvents.length === 0) return undefined

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.schema = 'events'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': loadedEvents.map(buildEventSchema),
    })
    document.head.appendChild(script)
    return () => script.remove()
  }, [loadedEvents])

  return <main className="events-page">
    <PageNav />
    <div className="events-page-inner">
      <header className="events-page-header"><p className="eyebrow">JUMPWIRE · EVENTS</p><h1>九维正在发生</h1><p>电影、音乐、人物对谈和一群愿意坐下来的朋友。</p></header>
      <div className="scene-gallery events-page-gallery">
        <figure className="scene-feature"><img src="/images/jumpwire-event.jpg?v=20260903b" alt="九维酒馆里的现场活动与观众" /><figcaption>电影、音乐、对谈，和一群愿意坐下来的朋友。</figcaption></figure>
        <div className="scene-stack">
          <figure><img src="/images/jumpwire-about.jpg?v=20260903b" alt="九维酒馆里多人聚会的现场" /><figcaption>一屋子的人，正在交换各自的夜晚。</figcaption></figure>
          <figure><img src="/images/jumpwire-live.jpg?v=20260903b" alt="九维酒馆里的吉他现场" /><figcaption>音乐让空间继续向外生长。</figcaption></figure>
        </div>
      </div>
      <div className="events-heading events-page-heading"><h2>近期与往期活动</h2><p>酒馆不是背景，<br />它就是故事的一部分。</p></div>
      <a className="event-series-feature" href="/events/wo-you-ge-peng-you/">
        <div><span>FEATURED SERIES · VOL.01—06</span><h3>我有一个朋友</h3><p>从一次聊天开始，认识一个有趣的人，也认识他或她正在经历的世界。</p></div>
        <strong>查看系列档案 ↗</strong>
      </a>
      <div className="event-grid">
        {loadedEvents.map((event, index) => {
          const expanded = expandedEvent === index
          const expandable = event.images.length > 0
          const toggle = () => expandable && setExpandedEvent(expanded ? null : index)
          return <article className={`event-card ${expanded ? 'expanded' : ''} ${expandable ? 'expandable' : ''}`} key={event.title} role={expandable ? 'button' : undefined} tabIndex={expandable ? '0' : undefined} aria-expanded={expandable ? expanded : undefined} onClick={toggle} onKeyDown={(e) => { if (expandable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle() } }}>
            <div className="event-top"><span>{event.type}</span><b>{event.date}</b></div>
            <img className="event-cover" src={`${event.cover}?v=20260911`} alt={`${event.title}系列最新活动封面`} />
            <h3>{event.title}</h3><p>{event.text}</p>
            {expanded && <div className="event-images">{event.images.map((image) => <img key={image} src={`${image}?v=20260911`} alt={`${event.title}活动图片`} />)}</div>}
            {expandable && <span className="event-arrow">{expanded ? '−' : '+'}</span>}
          </article>
        })}
      </div>
      <p className="events-page-note">活动日期、嘉宾和报名安排以九维最新发布为准。<a href="/events/wo-you-ge-peng-you/">查看“我有一个朋友”系列档案</a></p>
      <a className="events-page-cta" href="/about/#visit">查看到店信息</a>
    </div>
    <SiteFooter />
  </main>
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const tapBeers = useTapBeers()
  const [expandedEvent, setExpandedEvent] = useState(null)

  useEffect(() => {
    document.title = '九维精酿｜Jumpwire'
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="/" aria-label="返回首页">
          <img src="/brand-logo-jumpwire.png" alt="九维精酿 Jumpwire" />
          <span>九维精酿<small>JUMPWIRE CRAFT BEER</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? '关闭菜单' : '打开菜单'}>{menuOpen ? '×' : '菜单'}</button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="/">首页</a><a href="/menu/">酒单</a><a href="/events/">活动</a><a href="/notes/">精酿笔记</a><a href="/en/">EN</a>
        </div>
      </nav>

      <section id="top" className="hero shell">
        <div className="hero-copy reveal">
          <p className="eyebrow">GUANGZHOU · HAIZHU · OPENED MAY 2022</p>
          <h1>九维精酿<br /><em>JUMPWIRE</em></h1>
          <p className="hero-intro">一个精酿与文化交汇的空间。精酿啤酒、音乐、电影、文化社交和社群活动。</p>
          <button className="arrow-button" onClick={() => scrollTo('events')}>往下看 <span>↓</span></button>
        </div>
        <div className="hero-visual reveal delay-1" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-mark"><img src="/brand-logo-jumpwire.png" alt="" /></div>
          <div className="hero-caption">A SMALL PLACE<br />FOR BIG TASTES</div>
        </div>
      </section>

      <section className="beer-section">
        <div className="beer-panel shell">
          <div className="beer-heading"><h2>今天喝什么？</h2><span>WHAT'S ON TAP FOR TODAY?</span></div>
          <div className="beer-list">
            {tapBeers.length > 0 ? tapBeers.map((beer, index) => (
              <div className={`beer-row ${index === 0 ? 'featured' : ''}`} key={`${beer.tap}-${beer.name}`}>
                <span className="beer-no">{String(beer.tap).padStart(2, '0')}</span>
                <div className="beer-info"><strong>{beer.name}</strong><span>{beerStyleLabel(beer)}</span></div>
                <b>{prices(beer.priceLarge, beer.priceMedium) || '在售'}</b>
              </div>
            )) : <p className="beer-empty">今天暂未上酒头，欢迎到店询问。</p>}
          </div>
          <p className="beer-note">到店问问吧台，今天哪一款最适合你。</p>
          <a className="section-more" href="/menu/">点击查看更多 <span>↗</span></a>
        </div>
      </section>

      <section id="events" className="events shell">
        <div className="section-label">01 / WHAT'S HAPPENING</div>
        <div className="scene-heading"><h2>正在发生</h2><p>精酿是入口，<br /><em>相遇在现场发生。</em></p></div>
        <div className="scene-gallery">
          <figure className="scene-feature"><img src="/images/jumpwire-event.jpg?v=20260903b" alt="九维酒馆里的现场活动与观众" /><figcaption>电影、音乐、对谈，和一群愿意坐下来的朋友。</figcaption></figure>
          <div className="scene-stack">
            <figure><img src="/images/jumpwire-about.jpg?v=20260903b" alt="九维酒馆里多人聚会的现场" /><figcaption>一屋子的人，正在交换各自的夜晚。</figcaption></figure>
            <figure><img src="/images/jumpwire-live.jpg?v=20260903b" alt="九维酒馆里的吉他现场" /><figcaption>音乐让空间继续向外生长。</figcaption></figure>
          </div>
        </div>
        <div className="events-heading"><h2>近期与往期活动</h2><p>酒馆不是背景，<br />它就是故事的一部分。</p></div>
        <div className="event-grid">
          {events.map((event, index) => {
            const expanded = expandedEvent === index
            const expandable = event.images.length > 0
            const toggle = () => expandable && setExpandedEvent(expanded ? null : index)
            return <article className={`event-card ${expanded ? 'expanded' : ''} ${expandable ? 'expandable' : ''}`} key={event.title} role={expandable ? 'button' : undefined} tabIndex={expandable ? '0' : undefined} aria-expanded={expandable ? expanded : undefined} onClick={toggle} onKeyDown={(e) => { if (expandable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle() } }}>
              <div className="event-top"><span>{event.type}</span><b>{event.date}</b></div>
              <img className="event-cover" src={`${event.cover}?v=20260909`} alt={`${event.title}系列最新活动封面`} />
              <h3>{event.title}</h3><p>{event.text}</p>
              {expanded && <div className="event-images">{event.images.map((image) => <img key={image} src={`${image}?v=20260909`} alt={`${event.title}活动图片`} />)}</div>}
              {expandable && <span className="event-arrow">{expanded ? '−' : '+'}</span>}
            </article>
          })}
        </div>
        <a className="section-more" href="/events/">点击查看更多 <span>↗</span></a>
      </section>

      <section className="notes-preview shell" aria-labelledby="notes-preview-title">
        <div className="notes-preview-heading">
          <div><div className="section-label">JUMPWIRE / CRAFT BEER NOTES</div><h2 id="notes-preview-title">精酿笔记</h2></div>
        </div>
        <a className="notes-feature" href="/notes/what-is-craft-beer/">
          <div className="notes-feature-visual"><img src="/notes/what-is-craft-beer-cover.jpg" alt="金色啤酒杯与麦芽、啤酒花的酒吧静物" /></div>
          <div className="notes-feature-copy"><span>精酿入门 · 2026.09.14</span><h3>当我们喝精酿时，我们在喝什么？</h3><p>水、麦芽、啤酒花与酵母，如何一起写下一杯酒的风味？不必背术语，先认识这支酿造乐队。</p><b>阅读笔记 <span>→</span></b></div>
        </a>
        <a className="section-more" href="/notes/">点击查看更多 <span>↗</span></a>
      </section>

      <section id="about" className="manifesto shell">
        <div className="section-label">02 / ABOUT JUMPWIRE</div>
        <div className="manifesto-grid">
          <h2>九维 Jumpwire<br /><span>是什么？</span></h2>
          <div className="manifesto-text"><p>九维 Jumpwire 于 2022 年 5 月在广州海珠汾阳里的岭南老宅开业。这里是一间精酿酒馆，也是一处文化空间和社群连接点；我们用精酿、电影、音乐、对谈和活动，让不同的人在同一个夜晚坐到一起。</p><p>精酿是入口，老宅是容器，真正留下来的，是人与人之间发生的连接。</p></div>
        </div>
        <figure className="section-photo manifesto-photo"><img src="/images/home-manifesto.jpg?v=20260903d" alt="九维酒馆内的放映现场与观众" /><figcaption>一场放映，让陌生人坐到同一间屋子里。</figcaption></figure>
        <div className="principles"><article><span>01</span><h3>精酿发酵</h3><p>从清爽到浓郁，让每一次举杯都不重复。</p></article><article><span>02</span><h3>文化发生</h3><p>电影、音乐、对谈和一张愿意留人的桌子。</p></article><article><span>03</span><h3>跨界连接</h3><p>让不同领域的人在同一个夜晚交换灵感。</p></article></div>
      </section>

      <section className="season-section shell">
        <div className="season-mark">SEASON<br /><span>HOUSE</span></div>
        <div className="season-copy"><div className="section-label">03 / THE NAME & THE PLACE</div><h2>为什么叫<br /><em>九维 Jumpwire？</em></h2><p>“九维”是多维空间，也接近“久违”的重逢：不同兴趣、不同职业、不同生活方式的人，在这里重新见面、开始认识。</p><p>Jumpwire 是电子电路里的跳线。一次跳接，可能带来意想不到的声音效果；人与人之间的交流也一样，一杯精酿、一场电影、一次聊天，都可能让新的想法突然通电。</p><p>九维位于广州海珠区南田路汾阳里 5 号的思神号文化创意园。青砖、巷子和老宅的尺度，给每个人留出自己的夜晚节奏。</p></div>
        <figure className="section-photo season-photo"><img src="/images/home-season.jpg?v=20260903b" alt="九维酒馆内的座位与夜晚氛围" /><figcaption>旧屋的尺度，留给每个人自己的节奏。</figcaption></figure>
      </section>

      <section className="jumpwire-section"><div className="shell jumpwire-grid"><div><div className="section-label">04 / THE METHOD</div><h2>跳线，<br /><em>更高维度。</em></h2></div><div className="jumpwire-copy"><p><strong>九维</strong>，是多维空间，也是“久违”的重逢。不同维度的人在这里交汇，朋友重新见面，陌生人开始认识。</p><p><strong>Jumpwire</strong>，是电子电路里的跳线。我们相信，跨界交流会让新的 idea 和合作突然通电。</p><p className="jumpwire-quote">“跳线更高维度”——把精酿变成入口，把相遇变成方法。</p></div></div><figure className="section-photo jumpwire-photo shell"><img src="/images/home-jumpwire.jpg?v=20260903b" alt="通往九维酒馆的汾阳里巷道" /><figcaption>穿过汾阳里的巷子，新的连接从这里开始。</figcaption></figure></section>

      <section id="visit" className="visit shell"><div className="visit-card"><div><div className="section-label">05 / COME BY</div><h2>今晚，<br /><em>来坐坐。</em></h2></div><div className="visit-details"><p className="address">广州市海珠区<br />南田路汾阳里 5 号</p><p className="contact"><a href="tel:+8618529200506">18529200506</a>（微信同号）</p><p className="muted">营业时间：周日至周四 20:00—02:00<br />周五、周六 20:00—03:00<br />活动、菜单与营业安排，以现场为准。</p><a href="https://www.amap.com/search?query=%E4%B9%9D%E7%BB%B4Jumpwire%E7%B2%BE%E9%85%BF%E5%95%A4%E9%85%92&amp;city=440100" target="_blank" rel="noreferrer">地图导航 <span>↗</span></a><figure className="section-photo visit-photo"><img src="/images/home-visit.jpg?v=20260903b" alt="九维酒馆内的夜晚空间" /><figcaption>来汾阳里坐坐。</figcaption></figure></div></div></section>

      <section className="home-faq shell" aria-labelledby="home-faq-title">
        <div className="home-faq-intro"><div className="section-label">06 / FAQ</div><h2 id="home-faq-title">常见问题</h2><p>关于精酿、活动、地址和今晚来坐坐，先从这里找到答案。</p></div>
        <div className="home-faq-list">{faqItems.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}<details className="home-faq-group"><summary>其他问题</summary><div className="home-faq-group-list">{otherFaqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></details></div>
      </section>

      <SiteFooter />
    </main>
  )
}

function EnglishMenuPage() {
  const tapBeers = useTapBeers()

  useEffect(() => {
    document.title = 'Beer Menu | JUMPWIRE Guangzhou'
    document.head.querySelector('script[data-schema="menu-en"]')?.remove()
    if (!tapBeers.length) return undefined

    const groups = tapBeers.reduce((result, beer) => {
      const rawName = menuSectionName(beer)
      const name = ({ '小麦啤': 'Wheat Beer', '果啤': 'Fruit Beer', '世涛': 'Stout', '波特': 'Porter', '其他精酿': 'Other Craft Beer' })[rawName] || rawName
      result[name] ||= { '@type': 'MenuSection', name, hasMenuItem: [] }
      const offers = [['Large', toCnyPrice(beer.priceLarge)], ['Medium', toCnyPrice(beer.priceMedium)]].filter(([, price]) => price !== null).map(([size, price]) => ({ '@type': 'Offer', name: size, price, priceCurrency: 'CNY' }))
      result[name].hasMenuItem.push({ '@type': 'MenuItem', name: beerDisplayName(beer, true), description: beer.description || beerStyleLabel(beer, true) || 'Craft beer on tap today', offers: offers.length === 1 ? offers[0] : offers })
      return result
    }, {})
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.schema = 'menu-en'
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Menu', name: 'JUMPWIRE Craft Beer Menu', description: 'Today’s craft beer taps in Haizhu, Guangzhou.', inLanguage: 'en', hasMenuSection: Object.values(groups) })
    document.head.appendChild(script)
    return () => script.remove()
  }, [tapBeers])

  return <main className="menu-page">
    <PageNav english />
    <div className="menu-page-inner">
      <header className="menu-page-header"><p className="eyebrow">JUMPWIRE · GUANGZHOU · HAIZHU</p><h1>Beer Menu</h1><p>From crisp to full-bodied, every pour brings something different.</p></header>
      <section className="beer-section menu-beer-section"><div className="beer-panel">
        <div className="beer-heading"><h2>On Tap Today</h2><span>WHAT'S ON TAP FOR TODAY?</span></div>
        <div className="beer-list">{tapBeers.length > 0 ? tapBeers.map((beer, index) => <div className={`beer-row ${index === 0 ? 'featured' : ''}`} key={`${beer.tap}-${beer.name}`}><span className="beer-no">{String(beer.tap).padStart(2, '0')}</span><div className="beer-info"><strong>{beerDisplayName(beer, true)}</strong><span>{beerStyleLabel(beer, true)}</span></div><b>{prices(beer.priceLarge, beer.priceMedium, true) || 'Available'}</b></div>) : <p className="beer-empty">No beers are currently on tap. Please ask our team.</p>}</div>
        <p className="beer-note">Ask the bar team what they would recommend today.</p>
      </div></section>
      <section className="menu-image-section"><h2>Whisky · Full Bottles</h2><p>700 ml bottles for in-store enjoyment. Mixers are charged separately.</p><div className="menu-page-list"><div className="menu-page-item"><span>Johnnie Walker Black Label 12 Years</span><strong>¥398</strong></div><div className="menu-page-item"><span>Jameson</span><strong>¥368</strong></div><div className="menu-page-item"><span>Glenfiddich 12 Years</span><strong>¥598</strong></div><div className="menu-page-item"><span>Glenfiddich 15 Years</span><strong>¥888</strong></div><div className="menu-page-item"><span>Glenfiddich 18 Years</span><strong>¥1,488</strong></div><div className="menu-page-item"><span>The Singleton 12 Years</span><strong>¥598</strong></div><div className="menu-page-item"><span>The Singleton 16 Years</span><strong>¥988</strong></div><div className="menu-page-item"><span>The Dalmore 12 Years</span><strong>¥1,288</strong></div><div className="menu-page-item"><span>The Balvenie DoubleWood 12 Years</span><strong>¥1,188</strong></div><div className="menu-page-item"><span>The Macallan Double Cask 12 Years</span><strong>¥1,588</strong></div></div></section>
      <section className="menu-image-section"><h2>Non-alcoholic Drinks</h2><div className="menu-page-list"><div className="menu-page-item"><span>Soda Water</span><strong>¥11</strong></div><div className="menu-page-item"><span>Tonic Water</span><strong>¥11</strong></div><div className="menu-page-item"><span>Sunset Drive</span><strong>¥22</strong></div><div className="menu-page-item"><span>Sea King’s Pond</span><strong>¥22</strong></div><div className="menu-page-item"><span>Honey Pomelo Tea</span><strong>¥22</strong></div></div></section>
      <p className="menu-page-note">Taps, serving sizes and prices change with availability. Please check the in-store menu for today’s selection.</p>
      <a className="menu-page-cta" href="/en/about/#visit">Location & Opening Hours</a>
    </div>
    <SiteFooter english />
  </main>
}

function EnglishEventsPage() {
  const [expandedEvent, setExpandedEvent] = useState(null)

  useEffect(() => { document.title = 'Events | JUMPWIRE Guangzhou' }, [])

  return <main className="events-page">
    <PageNav english />
    <div className="events-page-inner">
      <header className="events-page-header"><p className="eyebrow">JUMPWIRE · EVENTS</p><h1>Happening at JUMPWIRE</h1><p>Films, music, conversations and friends ready to share a table.</p></header>
      <div className="scene-gallery events-page-gallery"><figure className="scene-feature"><img src="/images/jumpwire-event.jpg?v=20260903b" alt="Guests at a live event in the JUMPWIRE taproom" /><figcaption>Films, music, conversations and a room full of people.</figcaption></figure><div className="scene-stack"><figure><img src="/images/jumpwire-about.jpg?v=20260903b" alt="Friends gathering in the JUMPWIRE taproom" /><figcaption>A room of people sharing their evenings.</figcaption></figure><figure><img src="/images/jumpwire-live.jpg?v=20260903b" alt="Live guitar performance at JUMPWIRE" /><figcaption>Music lets the room grow beyond its walls.</figcaption></figure></div></div>
      <div className="events-heading events-page-heading"><h2>Upcoming & Past Events</h2><p>The taproom is more than a backdrop.<br />It is part of the story.</p></div>
      <a className="event-series-feature" href="/en/events/wo-you-ge-peng-you/"><div><span>FEATURED SERIES · VOL.01—06</span><h3>A Friend of Mine</h3><p>Start with a conversation. Meet an interesting person and learn about the world they are living in.</p></div><strong>Explore the series ↗</strong></a>
      <div className="event-grid">{englishEvents.map((event, index) => { const expanded = expandedEvent === index; const expandable = event.images.length > 0; const toggle = () => expandable && setExpandedEvent(expanded ? null : index); return <article className={`event-card ${expanded ? 'expanded' : ''} ${expandable ? 'expandable' : ''}`} key={event.title} role={expandable ? 'button' : undefined} tabIndex={expandable ? '0' : undefined} aria-expanded={expandable ? expanded : undefined} onClick={toggle} onKeyDown={(e) => { if (expandable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle() } }}><div className="event-top"><span>{event.type}</span><b>{event.date}</b></div><img className="event-cover" src={`${event.cover}?v=20260911`} alt={`${event.title} event cover`} /><h3>{event.title}</h3><p>{event.text}</p>{expanded && <div className="event-images">{event.images.map((image) => <img key={image} src={`${image}?v=20260911`} alt={`${event.title} event photo`} />)}</div>}{expandable && <span className="event-arrow">{expanded ? '−' : '+'}</span>}</article> })}</div>
      <p className="events-page-note">Dates, guests and registration details are subject to the latest JUMPWIRE announcements. <a href="/en/events/wo-you-ge-peng-you/">Explore A Friend of Mine</a></p>
      <a className="events-page-cta" href="/en/about/#visit">Plan Your Visit</a>
    </div>
    <SiteFooter english />
  </main>
}

function EnglishHomePage() {
  const tapBeers = useTapBeers()
  const [expandedEvent, setExpandedEvent] = useState(null)

  useEffect(() => { document.title = 'JUMPWIRE Craft Beer | Guangzhou Haizhu' }, [])

  return <main>
    <PageNav english />
    <section id="top" className="hero shell"><div className="hero-copy reveal"><p className="eyebrow">GUANGZHOU · HAIZHU · OPENED MAY 2022</p><h1>Craft Beer<br /><em>JUMPWIRE</em></h1><p className="hero-intro">A meeting place for craft beer and culture. Find fresh beer, music, films, conversations and community events.</p><a className="arrow-button" href="#events">Explore <span>↓</span></a></div><div className="hero-visual reveal delay-1" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-mark"><img src="/brand-logo-jumpwire.png" alt="" /></div><div className="hero-caption">A SMALL PLACE<br />FOR BIG TASTES</div></div></section>
    <section className="beer-section"><div className="beer-panel shell"><div className="beer-heading"><h2>On Tap Today</h2><span>WHAT'S ON TAP FOR TODAY?</span></div><div className="beer-list">{tapBeers.length > 0 ? tapBeers.map((beer, index) => <div className={`beer-row ${index === 0 ? 'featured' : ''}`} key={`${beer.tap}-${beer.name}`}><span className="beer-no">{String(beer.tap).padStart(2, '0')}</span><div className="beer-info"><strong>{beerDisplayName(beer, true)}</strong><span>{beerStyleLabel(beer, true)}</span></div><b>{prices(beer.priceLarge, beer.priceMedium, true) || 'Available'}</b></div>) : <p className="beer-empty">No beers are currently on tap. Please ask our team.</p>}</div><p className="beer-note">Ask our team what they recommend today.</p><a className="section-more" href="/en/menu/">View the menu <span>↗</span></a></div></section>
    <section id="events" className="events shell"><div className="section-label">01 / WHAT'S HAPPENING</div><div className="scene-heading"><h2>Happening Here</h2><p>Craft beer is the beginning.<br /><em>Connections happen in person.</em></p></div><div className="scene-gallery"><figure className="scene-feature"><img src="/images/jumpwire-event.jpg?v=20260903b" alt="Guests at a JUMPWIRE event" /><figcaption>Films, music, conversations and friends ready to share a table.</figcaption></figure><div className="scene-stack"><figure><img src="/images/jumpwire-about.jpg?v=20260903b" alt="Friends meeting at JUMPWIRE" /><figcaption>A room of people sharing their evenings.</figcaption></figure><figure><img src="/images/jumpwire-live.jpg?v=20260903b" alt="Live music at JUMPWIRE" /><figcaption>Music lets the room grow beyond its walls.</figcaption></figure></div></div><div className="events-heading"><h2>Events at JUMPWIRE</h2><p>The taproom is more than a backdrop.<br />It is part of the story.</p></div><div className="event-grid">{englishEvents.map((event, index) => { const expanded = expandedEvent === index; const expandable = event.images.length > 0; const toggle = () => expandable && setExpandedEvent(expanded ? null : index); return <article className={`event-card ${expanded ? 'expanded' : ''} ${expandable ? 'expandable' : ''}`} key={event.title} role={expandable ? 'button' : undefined} tabIndex={expandable ? '0' : undefined} aria-expanded={expandable ? expanded : undefined} onClick={toggle} onKeyDown={(e) => { if (expandable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle() } }}><div className="event-top"><span>{event.type}</span><b>{event.date}</b></div><img className="event-cover" src={`${event.cover}?v=20260909`} alt={`${event.title} event cover`} /><h3>{event.title}</h3><p>{event.text}</p>{expanded && <div className="event-images">{event.images.map((image) => <img key={image} src={`${image}?v=20260909`} alt={`${event.title} event photo`} />)}</div>}{expandable && <span className="event-arrow">{expanded ? '−' : '+'}</span>}</article> })}</div><a className="section-more" href="/en/events/">More events <span>↗</span></a></section>
    <section className="notes-preview shell" aria-labelledby="notes-preview-title"><div className="notes-preview-heading"><div><div className="section-label">JUMPWIRE / CRAFT BEER NOTES</div><h2 id="notes-preview-title">Craft Beer Notes</h2></div></div><a className="notes-feature" href="/en/notes/what-is-craft-beer/"><div className="notes-feature-visual"><img src="/notes/what-is-craft-beer-cover.jpg" alt="A golden beer with malt and hops" /></div><div className="notes-feature-copy"><span>CRAFT BEER BASICS · SEP 14, 2026</span><h3>What Are We Drinking When We Drink Craft Beer?</h3><p>How do water, malt, hops and yeast shape a beer’s flavour? Start with the brewing band, no jargon required.</p><b>Read the note <span>→</span></b></div></a><a className="section-more" href="/en/notes/">Explore all notes <span>↗</span></a></section>
    <section id="about" className="manifesto shell"><div className="section-label">02 / ABOUT JUMPWIRE</div><div className="manifesto-grid"><h2>What is<br /><span>JUMPWIRE?</span></h2><div className="manifesto-text"><p>JUMPWIRE opened in May 2022 in a Lingnan heritage house in Fenyangli, Haizhu, Guangzhou. It is a craft beer taproom, cultural space and community hub where people come together over craft beer, films, music, conversations and events.</p><p>Craft beer is the beginning. The old house is the setting. What stays with us is the connection between people.</p></div></div><figure className="section-photo manifesto-photo"><img src="/images/home-manifesto.jpg?v=20260903d" alt="A film screening and audience at JUMPWIRE" /><figcaption>A screening brings strangers into the same room.</figcaption></figure><div className="principles"><article><span>01</span><h3>Craft, Fermented</h3><p>From crisp to full-bodied, every pour brings something different.</p></article><article><span>02</span><h3>Culture, In Motion</h3><p>Films, music, conversations and a table that makes room for people.</p></article><article><span>03</span><h3>Connections, Across Fields</h3><p>People from different worlds exchange ideas in the same room.</p></article></div></section>
    <section className="season-section shell"><div className="season-mark">SEASON<br /><span>HOUSE</span></div><div className="season-copy"><div className="section-label">03 / THE NAME & THE PLACE</div><h2>Why<br /><em>JUMPWIRE?</em></h2><p>“Nine Dimensions” suggests many ways of seeing the world. In Chinese, it also sounds like “long time no see”—a reunion between people with different interests, professions and ways of life.</p><p>A jump wire connects parts of an electronic circuit. One connection can bring an unexpected signal to life. People work the same way: a beer, a film or a conversation can spark a new idea.</p><p>JUMPWIRE is in Sishenhao Creative Park at No. 5 Fenyangli, Nantian Road, Haizhu District, Guangzhou. The old lanes and Lingnan house leave room for everyone to find their own pace.</p></div><figure className="section-photo season-photo"><img src="/images/home-season.jpg?v=20260903b" alt="The evening atmosphere inside JUMPWIRE" /><figcaption>An old house leaves room for everyone’s own rhythm.</figcaption></figure></section>
    <section className="jumpwire-section"><div className="shell jumpwire-grid"><div><div className="section-label">04 / THE IDEA</div><h2>Connect.<br /><em>Go Further.</em></h2></div><div className="jumpwire-copy"><p><strong>JUMPWIRE</strong> is a connection in an electronic circuit—and a way for people from different worlds to meet. Friends reconnect; strangers get to know each other.</p><p>We believe conversations across disciplines can spark new ideas and collaborations.</p><p className="jumpwire-quote">“A spark across dimensions.” Let craft beer open the door and connection show the way.</p></div></div><figure className="section-photo jumpwire-photo shell"><img src="/images/home-jumpwire.jpg?v=20260903b" alt="The lane leading to JUMPWIRE in Fenyangli" /><figcaption>Walk through Fenyangli. A new connection could start here.</figcaption></figure></section>
    <section id="visit" className="visit shell"><div className="visit-card"><div><div className="section-label">05 / COME BY</div><h2>Come by<br /><em>tonight.</em></h2></div><div className="visit-details"><p className="address">No. 5 Fenyangli,<br />Nantian Road, Haizhu District,<br />Guangzhou</p><p className="contact"><a href="tel:+8618529200506">+86 185 2920 0506</a> · WeChat</p><p className="muted">Sunday–Thursday: 8 pm–2 am<br />Friday–Saturday: 8 pm–3 am<br />Events, menu and hours may change. Please check with us before your visit.</p><a href="https://www.amap.com/search?query=%E4%B9%9D%E7%BB%B4Jumpwire%E7%B2%BE%E9%85%BF%E5%95%A4%E9%85%92&amp;city=440100" target="_blank" rel="noreferrer">Open map <span>↗</span></a><figure className="section-photo visit-photo"><img src="/images/home-visit.jpg?v=20260903b" alt="The evening space inside JUMPWIRE" /><figcaption>Come and sit a while in Fenyangli.</figcaption></figure></div></div></section>
    <section className="home-faq shell" aria-labelledby="home-faq-title"><div className="home-faq-intro"><div className="section-label">06 / FAQ</div><h2 id="home-faq-title">Good to Know</h2><p>Find answers about the beer, events, location and planning a visit.</p></div><div className="home-faq-list">{englishFaqItems.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}<details className="home-faq-group"><summary>More questions</summary><div className="home-faq-group-list">{englishOtherFaqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></details></div></section>
    <SiteFooter english />
  </main>
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/en/menu') return <EnglishMenuPage />
  if (path === '/en/events') return <EnglishEventsPage />
  if (path.startsWith('/en')) return <EnglishHomePage />
  if (path === '/menu') return <MenuPage />
  if (path === '/event' || path === '/events') return <EventsPage />
  return <HomePage />
}

createRoot(document.getElementById('root')).render(<App />)
