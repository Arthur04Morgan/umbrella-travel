import { FormEvent, useMemo, useState } from 'react'

type Screen = 'home' | 'map' | 'countries' | 'catalog' | 'traveler' | 'review'

const regions: Record<string, string[]> = {
  Європа: ['Україна','Франція','Італія','Іспанія','Португалія','Німеччина','Австрія','Швейцарія','Норвегія','Швеція','Фінляндія','Ісландія','Греція','Хорватія','Чехія','Польща','Нідерланди','Бельгія','Ірландія','Велика Британія'],
  Азія: ['Японія','Південна Корея','Китай','Індія','Таїланд','Вʼєтнам','Індонезія','Малайзія','Сінгапур','Філіппіни','Непал','Бутан','Шрі-Ланка','Камбоджа','Монголія','Казахстан','Узбекистан','Грузія','Туреччина','ОАЕ'],
  Африка: ['Марокко','Єгипет','Туніс','Кенія','Танзанія','ПАР','Намібія','Ботсвана','Ефіопія','Гана','Сенегал','Руанда','Уганда','Мадагаскар','Маврикій','Сейшели','Замбія','Зімбабве','Кабо-Верде','Мозамбік'],
  'Північна Америка': ['Канада','США','Мексика','Коста-Рика','Панама','Куба','Ямайка','Домінікана','Багами','Барбадос','Беліз','Гватемала','Гондурас','Сальвадор','Нікарагуа','Гренландія','Гаїті','Тринідад і Тобаго','Сент-Люсія','Антигуа і Барбуда'],
  'Південна Америка': ['Бразилія','Аргентина','Чилі','Перу','Колумбія','Болівія','Еквадор','Уругвай','Парагвай','Венесуела','Гаяна','Суринам','Французька Гвіана','Фолклендські острови','Кюрасао','Аруба','Бонайре','Південна Джорджія','Галапагоські острови','Вогняна Земля'],
  Океанія: ['Австралія','Нова Зеландія','Фіджі','Самоа','Тонга','Вануату','Палау','Тувалу','Науру','Кірибаті','Папуа-Нова Гвінея','Соломонові Острови','Маршаллові Острови','Мікронезія','Нова Каледонія','Французька Полінезія','Острови Кука','Ніуе','Гуам','Північні Маріанські Острови'],
}

const photos = [
  'https://images.unsplash.com/photo-1516900557549-41557d405adf?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1580895456895-cfdf02e4c23f?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1515693516428-3c89b92d3220?auto=format&fit=crop&w=1200&q=85',
]

const featuredCountries: Record<string, string[]> = {
  Європа: ['Франція', 'Італія', 'Норвегія'],
  Азія: ['Японія', 'Таїланд', 'ОАЕ'],
  Африка: ['Марокко', 'Кенія', 'ПАР'],
  'Північна Америка': ['Канада', 'США', 'Мексика'],
  'Південна Америка': ['Бразилія', 'Аргентина', 'Перу'],
  Океанія: ['Австралія', 'Нова Зеландія', 'Фіджі'],
}

const countryPhotos: Record<string, string> = {
  Україна: 'https://images.unsplash.com/photo-1784317344053-fbe12dc1f59a?auto=format&fit=crop&w=1600&q=88',
  Франція: 'https://images.unsplash.com/photo-1609971757431-439cf7b4141b?auto=format&fit=crop&w=1100&q=85',
  Італія: 'https://images.unsplash.com/photo-1664433451451-11337deef597?auto=format&fit=crop&w=1100&q=85',
  Норвегія: 'https://images.unsplash.com/photo-1705512604302-3dc9d171832c?auto=format&fit=crop&w=1100&q=85',
  Японія: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1100&q=85',
  Таїланд: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1100&q=85',
  ОАЕ: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1100&q=85',
  Марокко: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=1100&q=85',
  Кенія: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=85',
  ПАР: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1100&q=85',
  Канада: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1100&q=85',
  США: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1100&q=85',
  Мексика: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1100&q=85',
  Бразилія: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1100&q=85',
  Аргентина: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?auto=format&fit=crop&w=1100&q=85',
  Перу: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1100&q=85',
  Австралія: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1100&q=85',
  'Нова Зеландія': 'https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1100&q=85',
  Фіджі: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85',
}

const getCountryPhoto = (country: string) => countryPhotos[country] || `https://source.unsplash.com/featured/1600x1200/?${encodeURIComponent(`${country} country landmark travel`)}`

function Umbrella({ spinning = false }: { spinning?: boolean }) {
  return <div className={`umbrella ${spinning ? 'spinning' : ''}`} aria-hidden="true"><img src="/assets/umbrella-mark.png" alt="" /></div>
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState(() => localStorage.getItem('region') || 'Європа')
  const [country, setCountry] = useState(() => localStorage.getItem('country') || 'Україна')
  const [slide, setSlide] = useState(0)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [notice, setNotice] = useState('')
  const [loadingCopy, setLoadingCopy] = useState({ title: 'Формуємо ваш маршрут', detail: 'Зʼєднуємо точки на мапі світу' })
  const regionCountries = regions[region]
  const cardCountries = featuredCountries[region]
  const visible = useMemo(() => [0, 1, 2].map(i => cardCountries[(slide + i) % cardCountries.length]), [cardCountries, slide])

  const go = (next: Screen, selectedCountry = country) => {
    if (next === screen || loading) return
    const copy: Record<Screen, { title: string; detail: string }> = {
      home: { title: 'Повертаємося до початку', detail: 'Готуємо нову подорож' },
      map: { title: 'Відкриваємо мапу світу', detail: 'Шукаємо ваш наступний напрямок' },
      countries: { title: 'Добираємо країни', detail: `Відкриваємо найкращі напрямки регіону ${region}` },
      catalog: { title: 'Відкриваємо весь світ', detail: 'Збираємо 120 країн в одному каталозі' },
      traveler: { title: 'Формуємо ваш маршрут', detail: `Готуємо подорож до країни ${selectedCountry}` },
      review: { title: 'Зберігаємо ваші враження', detail: 'Готуємо форму для вашої історії' },
    }
    setLoadingCopy(copy[next]); setLoading(true)
    window.setTimeout(() => { setScreen(next); setLoading(false); setNotice(''); window.scrollTo(0, 0) }, 5000)
  }
  const chooseRegion = (name: string) => {
    const firstCountry = featuredCountries[name][0]
    setRegion(name); setCountry(firstCountry); setSlide(0)
    localStorage.setItem('region', name); localStorage.setItem('country', firstCountry); go('countries')
  }
  const chooseCountry = (name: string) => { setCountry(name); localStorage.setItem('country', name); setNotice(`Обрано: ${name}`) }
  const submit = (event: FormEvent, message: string) => { event.preventDefault(); setNotice(message) }

  return <main className="app">
    {loading && <div className="loader"><Umbrella spinning /><p>{loadingCopy.title}</p><span>{loadingCopy.detail}</span><div className="progress"><b /></div></div>}
    <header className={screen === 'home' ? 'over-hero' : ''}>
      <button className="brand" onClick={() => go('home')}><img className="brandmark" src="/assets/umbrella-mark.png" alt="" /><span>UMBRELLA<small>CORPORATION</small></span></button>
      <nav><button className={screen === 'map' || screen === 'countries' ? 'active' : ''} onClick={() => go('map')}>Напрямки</button><button className={screen === 'catalog' ? 'active' : ''} onClick={() => go('catalog')}>Усі країни</button><button className={screen === 'traveler' ? 'active' : ''} onClick={() => go('traveler')}>Моя подорож</button><button className={screen === 'review' ? 'active' : ''} onClick={() => go('review')}>Залишити відгук</button></nav><div className="lang">UA⌄</div>
    </header>
    {screen === 'home' && <section className="home"><div className="home-copy"><p className="eyebrow">ПОДОРОЖІ ПОЗА МЕЖАМИ ЗВИЧНОГО</p><h1>Umbrella<br/>Corporation</h1><p className="lead">Світ чекає. Незалежно від погоди.</p><p className="hero-note">Від дощових вулиць Європи до далеких островів Океанії.<br/>Знайдіть місце, яке стане вашою наступною історією.</p><button className="primary" onClick={() => go('map')}>Почати подорож <span>→</span></button></div><div className="home-stats"><b>06<small>регіонів світу</small></b><b>120<small>країн для відкриття</small></b></div><div className="home-foot"><span>BEYOND THE EVERYDAY</span><span>Знайомство</span><span><b>01</b> / 06</span></div></section>}
    {screen === 'map' && <section className="screen"><div className="section-head"><div><p className="eyebrow">01 / ОБЕРІТЬ РЕГІОН</p><h2>Куди покличе світ?</h2></div><p>Оберіть регіон на супутниковій мапі,<br/>щоб відкрити доступні країни.</p></div><div className="world">{Object.keys(regions).map((r, i) => <button key={r} className={`pin pin-${i}`} onClick={() => chooseRegion(r)}><i/><span>{r}</span><small>{regions[r].length} напрямків</small></button>)}<div className="coordinates">SAT VIEW · 34.8832° N / 18.3347° E</div></div></section>}
    {screen === 'countries' && <section className="screen"><div className="section-head"><div><p className="eyebrow">02 / ОБЕРІТЬ КРАЇНУ</p><h2>Відкрийте {region === 'Європа' ? 'Європу' : region}</h2></div><p>Гортайте добірку та оберіть країну,<br/>яка стане вашою наступною історією.</p></div><div className="carousel"><button className="arrow" onClick={() => setSlide((slide - 1 + cardCountries.length) % cardCountries.length)}>←</button><div className="cards">{visible.map((name, i) => <button key={name} onClick={() => { chooseCountry(name); go('traveler', name) }} className={`country-card ${country === name ? 'selected' : ''}`}><img src={getCountryPhoto(name)} alt={name}/><span className="card-no">0{i + 1}</span><div><small>{region} · Авторський маршрут</small><h3>{name}</h3><p>{i === 0 ? 'Міста, що не сплять' : i === 1 ? 'За межами відомого' : 'Подорож крізь час'}</p></div><b>ОБРАТИ ↗</b></button>)}</div><button className="arrow" onClick={() => setSlide((slide + 1) % cardCountries.length)}>→</button></div><div className="bottom-action"><span>Не знайшли потрібну країну?</span><button className="primary" onClick={() => go('catalog')}>Обрати серед 120 країн →</button></div></section>}
    {screen === 'catalog' && <section className="screen catalog-screen"><div className="section-head"><div><p className="eyebrow">КАТАЛОГ НАПРЯМКІВ</p><h2>Увесь світ. Ваш вибір.</h2></div><p>120 країн / 6 регіонів</p></div><div className="catalog">{Object.entries(regions).map(([r,list]) => <div className="region-list" key={r}><div className="region-title"><h3>{r}</h3><small>20 КРАЇН</small></div><div>{list.map(name => <button key={name} className={country === name ? 'chosen' : ''} onClick={() => { setRegion(r); localStorage.setItem('region',r); chooseCountry(name) }}>{name}<b>{country === name ? '✓' : '+'}</b></button>)}</div></div>)}</div><div className="floating-next"><span>{notice || `${region} / ${country}`}</span><button className="primary" onClick={() => go('traveler')}>Заповнити анкету →</button></div></section>}
    {screen === 'traveler' && <section className="screen form-screen"><div className="form-photo" style={{backgroundImage:`url("${getCountryPhoto(country)}")`}}><div><p className="eyebrow">ВАШ НАПРЯМОК</p><h2>{country}</h2><span>{region}</span></div></div><div className="form-wrap"><p className="eyebrow">04 / АНКЕТА МАНДРІВНИКА</p><h2>Розкажіть нам<br/>про вашу подорож</h2><form onSubmit={e => submit(e,'Анкету прийнято. Ми звʼяжемося з вами найближчим часом.')}><label>ОБРАНА КРАЇНА<input value={country} readOnly/></label><label>ВАШЕ ІМʼЯ<input required placeholder="Імʼя та прізвище"/></label><label>ТЕЛЕФОН АБО EMAIL<input required placeholder="+380 або your@email.com"/></label><div className="row"><label>ПОЧАТОК ПОДОРОЖІ<input required type="date"/></label><label>ЗАВЕРШЕННЯ<input required type="date"/></label></div><label>КІЛЬКІСТЬ МАНДРІВНИКІВ<input required type="number" min="1" max="20" defaultValue="2"/></label><button className="primary">Надіслати анкету →</button></form>{notice && <div className="success">{notice}</div>}</div></section>}
    {screen === 'review' && <section className="screen review-screen"><div className="review-photo"><div><small>ПОДОРОЖ МИНАЄ. ВРАЖЕННЯ ЗАЛИШАЮТЬСЯ.</small><h2>Деякі історії<br/>хочеться розповісти.</h2><p>Дякуємо, що відкриваєте світ разом із нами.</p></div></div><div className="review-content"><p className="eyebrow">ВАШІ ВРАЖЕННЯ МАЮТЬ ЗНАЧЕННЯ</p><h2>Якою була ваша подорож?</h2><p className="review-intro">Поділіться тим, що запамʼяталося.<br/>Ваш досвід допомагає нам ставати кращими.</p><form className="review-form" onSubmit={e => submit(e,'Дякуємо. Ваш відгук успішно надіслано.')}><label>ВАШЕ ІМʼЯ<input required placeholder="Як до вас звертатися?"/></label><label>ВАША ОЦІНКА<div className="rating-row"><div className="stars" onMouseLeave={() => setHoverRating(0)}>{[1,2,3,4,5].map(n => { const active=n<=(hoverRating||rating); return <button type="button" key={n} className={active?'on':''} onMouseEnter={() => setHoverRating(n)} onClick={() => setRating(n)}>{active?'★':'☆'}</button> })}</div><span>{rating ? `${rating} / 5` : 'Оберіть оцінку'}</span></div></label><label>КОМЕНТАР<textarea required rows={5} placeholder="Поділіться вашими враженнями..."/></label><button className="primary">Надіслати відгук ↗</button>{notice && <div className="success">{notice}</div>}</form></div></section>}
  </main>
}
