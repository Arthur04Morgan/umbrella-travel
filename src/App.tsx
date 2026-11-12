import { CSSProperties, FormEvent, useEffect, useMemo, useState } from "react"
import { embeddedAssets } from "./embedded-assets"

type Screen = "home" | "map" | "countries" | "catalog" | "traveler" | "review"
type Language = "ua" | "en"

const regions: Record<string, string[]> = {
  Європа: [
    "Україна",
    "Франція",
    "Італія",
    "Іспанія",
    "Португалія",
    "Німеччина",
    "Австрія",
    "Швейцарія",
    "Норвегія",
    "Швеція",
    "Фінляндія",
    "Ісландія",
    "Греція",
    "Хорватія",
    "Чехія",
    "Польща",
    "Нідерланди",
    "Бельгія",
    "Ірландія",
    "Велика Британія",
  ],
  Азія: [
    "Японія",
    "Південна Корея",
    "Китай",
    "Індія",
    "Таїланд",
    "Вʼєтнам",
    "Індонезія",
    "Малайзія",
    "Сінгапур",
    "Філіппіни",
    "Непал",
    "Бутан",
    "Шрі-Ланка",
    "Камбоджа",
    "Монголія",
    "Казахстан",
    "Узбекистан",
    "Грузія",
    "Туреччина",
    "ОАЕ",
  ],
  Африка: [
    "Марокко",
    "Єгипет",
    "Туніс",
    "Кенія",
    "Танзанія",
    "ПАР",
    "Намібія",
    "Ботсвана",
    "Ефіопія",
    "Гана",
    "Сенегал",
    "Руанда",
    "Уганда",
    "Мадагаскар",
    "Маврикій",
    "Сейшели",
    "Замбія",
    "Зімбабве",
    "Кабо-Верде",
    "Мозамбік",
  ],
  "Північна Америка": [
    "Канада",
    "США",
    "Мексика",
    "Коста-Рика",
    "Панама",
    "Куба",
    "Ямайка",
    "Домінікана",
    "Багами",
    "Барбадос",
    "Беліз",
    "Гватемала",
    "Гондурас",
    "Сальвадор",
    "Нікарагуа",
    "Гренландія",
    "Гаїті",
    "Тринідад і Тобаго",
    "Сент-Люсія",
    "Антигуа і Барбуда",
  ],
  "Південна Америка": [
    "Бразилія",
    "Аргентина",
    "Чилі",
    "Перу",
    "Колумбія",
    "Болівія",
    "Еквадор",
    "Уругвай",
    "Парагвай",
    "Венесуела",
    "Гаяна",
    "Суринам",
    "Французька Гвіана",
    "Фолклендські острови",
    "Кюрасао",
    "Аруба",
    "Бонайре",
    "Південна Джорджія",
    "Галапагоські острови",
    "Вогняна Земля",
  ],
  Океанія: [
    "Австралія",
    "Нова Зеландія",
    "Фіджі",
    "Самоа",
    "Тонга",
    "Вануату",
    "Палау",
    "Тувалу",
    "Науру",
    "Кірибаті",
    "Папуа-Нова Гвінея",
    "Соломонові Острови",
    "Маршаллові Острови",
    "Мікронезія",
    "Нова Каледонія",
    "Французька Полінезія",
    "Острови Кука",
    "Ніуе",
    "Гуам",
    "Північні Маріанські Острови",
  ],
}

const photos = [
  "https://images.unsplash.com/photo-1516900557549-41557d405adf?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1580895456895-cfdf02e4c23f?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1515693516428-3c89b92d3220?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1603222712687-f92e283c6b78?auto=format&fit=crop&w=1200&q=85",
]

const featuredCountries: Record<string, string[]> = {
  Європа: ["Франція", "Італія", "Норвегія"],
  Азія: ["Японія", "Таїланд", "ОАЕ"],
  Африка: ["Марокко", "Кенія", "ПАР"],
  "Північна Америка": ["Канада", "США", "Мексика"],
  "Південна Америка": ["Бразилія", "Аргентина", "Перу"],
  Океанія: ["Австралія", "Нова Зеландія", "Фіджі"],
}

const countryPhotos: Record<string, string> = {
  Україна:
    "https://images.unsplash.com/photo-1784317344053-fbe12dc1f59a?auto=format&fit=crop&w=1600&q=88",
  Франція:
    "https://images.unsplash.com/photo-1609971757431-439cf7b4141b?auto=format&fit=crop&w=1100&q=85",
  Італія:
    "https://images.unsplash.com/photo-1664433451451-11337deef597?auto=format&fit=crop&w=1100&q=85",
  Норвегія:
    "https://images.unsplash.com/photo-1705512604302-3dc9d171832c?auto=format&fit=crop&w=1100&q=85",
  Японія:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1100&q=85",
  Таїланд:
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1100&q=85",
  ОАЕ: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1100&q=85",
  Марокко:
    "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=1100&q=85",
  Кенія:
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1100&q=85",
  ПАР: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1100&q=85",
  Канада:
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1100&q=85",
  США: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1100&q=85",
  Мексика:
    "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1100&q=85",
  Бразилія:
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1100&q=85",
  Аргентина:
    "https://images.unsplash.com/photo-1531761535209-180857e963b9?auto=format&fit=crop&w=1100&q=85",
  Перу: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1100&q=85",
  Австралія:
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1100&q=85",
  "Нова Зеландія":
    "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1100&q=85",
  Фіджі:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85",
}

const getCountryPhoto = (country: string) =>
  countryPhotos[country] ||
  `https://source.unsplash.com/featured/1600x1200/?${encodeURIComponent(`${country} country landmark travel`)}`

const regionEnglish: Record<string, string> = {
  Європа: "Europe",
  Азія: "Asia",
  Африка: "Africa",
  "Північна Америка": "North America",
  "Південна Америка": "South America",
  Океанія: "Oceania",
}

const countryEnglish: Record<string, string> = {
  Україна: "Ukraine",
  Франція: "France",
  Італія: "Italy",
  Іспанія: "Spain",
  Португалія: "Portugal",
  Німеччина: "Germany",
  Австрія: "Austria",
  Швейцарія: "Switzerland",
  Норвегія: "Norway",
  Швеція: "Sweden",
  Фінляндія: "Finland",
  Ісландія: "Iceland",
  Греція: "Greece",
  Хорватія: "Croatia",
  Чехія: "Czechia",
  Польща: "Poland",
  Нідерланди: "Netherlands",
  Бельгія: "Belgium",
  Ірландія: "Ireland",
  "Велика Британія": "United Kingdom",
  Японія: "Japan",
  "Південна Корея": "South Korea",
  Китай: "China",
  Індія: "India",
  Таїланд: "Thailand",
  Вʼєтнам: "Vietnam",
  Індонезія: "Indonesia",
  Малайзія: "Malaysia",
  Сінгапур: "Singapore",
  Філіппіни: "Philippines",
  Непал: "Nepal",
  Бутан: "Bhutan",
  "Шрі-Ланка": "Sri Lanka",
  Камбоджа: "Cambodia",
  Монголія: "Mongolia",
  Казахстан: "Kazakhstan",
  Узбекистан: "Uzbekistan",
  Грузія: "Georgia",
  Туреччина: "Turkey",
  ОАЕ: "UAE",
  Марокко: "Morocco",
  Єгипет: "Egypt",
  Туніс: "Tunisia",
  Кенія: "Kenya",
  Танзанія: "Tanzania",
  ПАР: "South Africa",
  Намібія: "Namibia",
  Ботсвана: "Botswana",
  Ефіопія: "Ethiopia",
  Гана: "Ghana",
  Сенегал: "Senegal",
  Руанда: "Rwanda",
  Уганда: "Uganda",
  Мадагаскар: "Madagascar",
  Маврикій: "Mauritius",
  Сейшели: "Seychelles",
  Замбія: "Zambia",
  Зімбабве: "Zimbabwe",
  "Кабо-Верде": "Cape Verde",
  Мозамбік: "Mozambique",
  Канада: "Canada",
  США: "USA",
  Мексика: "Mexico",
  "Коста-Рика": "Costa Rica",
  Панама: "Panama",
  Куба: "Cuba",
  Ямайка: "Jamaica",
  Домінікана: "Dominican Republic",
  Багами: "Bahamas",
  Барбадос: "Barbados",
  Беліз: "Belize",
  Гватемала: "Guatemala",
  Гондурас: "Honduras",
  Сальвадор: "El Salvador",
  Нікарагуа: "Nicaragua",
  Гренландія: "Greenland",
  Гаїті: "Haiti",
  "Тринідад і Тобаго": "Trinidad and Tobago",
  "Сент-Люсія": "Saint Lucia",
  "Антигуа і Барбуда": "Antigua and Barbuda",
  Бразилія: "Brazil",
  Аргентина: "Argentina",
  Чилі: "Chile",
  Перу: "Peru",
  Колумбія: "Colombia",
  Болівія: "Bolivia",
  Еквадор: "Ecuador",
  Уругвай: "Uruguay",
  Парагвай: "Paraguay",
  Венесуела: "Venezuela",
  Гаяна: "Guyana",
  Суринам: "Suriname",
  "Французька Гвіана": "French Guiana",
  "Фолклендські острови": "Falkland Islands",
  Кюрасао: "Curaçao",
  Аруба: "Aruba",
  Бонайре: "Bonaire",
  "Південна Джорджія": "South Georgia",
  "Галапагоські острови": "Galápagos Islands",
  "Вогняна Земля": "Tierra del Fuego",
  Австралія: "Australia",
  "Нова Зеландія": "New Zealand",
  Фіджі: "Fiji",
  Самоа: "Samoa",
  Тонга: "Tonga",
  Вануату: "Vanuatu",
  Палау: "Palau",
  Тувалу: "Tuvalu",
  Науру: "Nauru",
  Кірибаті: "Kiribati",
  "Папуа-Нова Гвінея": "Papua New Guinea",
  "Соломонові Острови": "Solomon Islands",
  "Маршаллові Острови": "Marshall Islands",
  Мікронезія: "Micronesia",
  "Нова Каледонія": "New Caledonia",
  "Французька Полінезія": "French Polynesia",
  "Острови Кука": "Cook Islands",
  Ніуе: "Niue",
  Гуам: "Guam",
  "Північні Маріанські Острови": "Northern Mariana Islands",
}

const translations = {
  ua: {
    directions: "Напрямки",
    allCountries: "Усі країни",
    myTrip: "Моя подорож",
    leaveReview: "Залишити відгук",
    heroEyebrow: "ПОДОРОЖІ ПОЗА МЕЖАМИ ЗВИЧНОГО",
    heroLead: "Світ чекає. Незалежно від погоди.",
    heroNote: "Від дощових вулиць Європи до далеких островів Океанії.",
    heroNote2: "Знайдіть місце, яке стане вашою наступною історією.",
    start: "Почати подорож",
    regionsWorld: "регіонів світу",
    countriesDiscover: "країн для відкриття",
    introduction: "Знайомство",
    chooseRegion: "ОБЕРІТЬ РЕГІОН",
    mapTitle: "Куди покличе світ?",
    mapText: "Оберіть регіон на супутниковій мапі,",
    mapText2: "щоб відкрити доступні країни.",
    destinations: "напрямків",
    mapAlt: "Карта материків світу",
    chooseCountry: "ОБЕРІТЬ КРАЇНУ",
    discover: "Відкрийте",
    countryText: "Гортайте добірку та оберіть країну,",
    countryText2: "яка стане вашою наступною історією.",
    back: "Назад",
    next: "Далі",
    authoredRoute: "Авторський маршрут",
    cardLines: [
      "Міста, що не сплять",
      "За межами відомого",
      "Подорож крізь час",
    ],
    selected: "ОБРАНО",
    select: "ОБРАТИ",
    missingCountry: "Не знайшли потрібну країну?",
    choose120: "Обрати серед 120 країн",
    catalogEyebrow: "КАТАЛОГ НАПРЯМКІВ",
    catalogTitle: "Увесь світ. Ваш вибір.",
    catalogText: "Оберіть будь-яку країну — вибір",
    catalogText2: "збережеться для вашої анкети.",
    countriesCount: "20 КРАЇН",
    fillForm: "Заповнити анкету",
    yourDestination: "ВАШ НАПРЯМОК",
    travelerForm: "АНКЕТА МАНДРІВНИКА",
    travelerTitle: "Розкажіть нам",
    travelerTitle2: "про вашу подорож",
    selectedCountry: "ОБРАНА КРАЇНА",
    yourName: "ВАШЕ ІМʼЯ",
    namePlaceholder: "Імʼя та прізвище",
    contact: "ТЕЛЕФОН АБО EMAIL",
    contactPlaceholder: "+380 або your@email.com",
    tripStart: "ПОЧАТОК ПОДОРОЖІ",
    tripEnd: "ЗАВЕРШЕННЯ",
    travelers: "КІЛЬКІСТЬ МАНДРІВНИКІВ",
    sendForm: "Надіслати анкету",
    formSuccess: "Анкету прийнято. Ми звʼяжемося з вами найближчим часом.",
    reviewKicker: "ПОДОРОЖ МИНАЄ. ВРАЖЕННЯ ЗАЛИШАЮТЬСЯ.",
    storyTitle: "Деякі історії",
    storyTitle2: "хочеться розповісти.",
    thanks: "Дякуємо, що відкриваєте світ разом із нами.",
    impressions: "ВАШІ ВРАЖЕННЯ МАЮТЬ ЗНАЧЕННЯ",
    reviewTitle: "Якою була ваша подорож?",
    reviewIntro: "Поділіться тим, що запамʼяталося.",
    reviewIntro2: "Ваш досвід допомагає нам ставати кращими.",
    reviewNamePlaceholder: "Як до вас звертатися?",
    rating: "ВАША ОЦІНКА",
    chooseRating: "Оберіть оцінку",
    comment: "КОМЕНТАР",
    commentPlaceholder: "Поділіться вашими враженнями...",
    sendReview: "Надіслати відгук",
    reviewSuccess: "Дякуємо. Ваш відгук успішно надіслано.",
    selectedNotice: "Обрано",
  },
  en: {
    directions: "Destinations",
    allCountries: "All countries",
    myTrip: "My trip",
    leaveReview: "Leave a review",
    heroEyebrow: "TRAVEL BEYOND THE ORDINARY",
    heroLead: "The world awaits. Whatever the weather.",
    heroNote:
      "From the rainy streets of Europe to the distant islands of Oceania.",
    heroNote2: "Find the place that will become your next story.",
    start: "Start the journey",
    regionsWorld: "world regions",
    countriesDiscover: "countries to discover",
    introduction: "Introduction",
    chooseRegion: "CHOOSE A REGION",
    mapTitle: "Where will the world call you?",
    mapText: "Choose a region on the satellite map",
    mapText2: "to discover available countries.",
    destinations: "destinations",
    mapAlt: "Satellite map of the world",
    chooseCountry: "CHOOSE A COUNTRY",
    discover: "Discover",
    countryText: "Browse the selection and choose the country",
    countryText2: "that will become your next story.",
    back: "Previous",
    next: "Next",
    authoredRoute: "Signature itinerary",
    cardLines: [
      "Cities that never sleep",
      "Beyond the familiar",
      "A journey through time",
    ],
    selected: "SELECTED",
    select: "SELECT",
    missingCountry: "Could not find your country?",
    choose120: "Choose from 120 countries",
    catalogEyebrow: "DESTINATION CATALOG",
    catalogTitle: "The whole world. Your choice.",
    catalogText: "Choose any country — your selection",
    catalogText2: "will be saved for your travel form.",
    countriesCount: "20 COUNTRIES",
    fillForm: "Complete the form",
    yourDestination: "YOUR DESTINATION",
    travelerForm: "TRAVELER FORM",
    travelerTitle: "Tell us about",
    travelerTitle2: "your journey",
    selectedCountry: "SELECTED COUNTRY",
    yourName: "YOUR NAME",
    namePlaceholder: "First and last name",
    contact: "PHONE OR EMAIL",
    contactPlaceholder: "Phone number or your@email.com",
    tripStart: "TRIP START",
    tripEnd: "TRIP END",
    travelers: "NUMBER OF TRAVELERS",
    sendForm: "Send the form",
    formSuccess: "Your form has been received. We will contact you shortly.",
    reviewKicker: "THE JOURNEY ENDS. THE MEMORIES REMAIN.",
    storyTitle: "Some stories",
    storyTitle2: "are worth sharing.",
    thanks: "Thank you for discovering the world with us.",
    impressions: "YOUR EXPERIENCE MATTERS",
    reviewTitle: "How was your journey?",
    reviewIntro: "Share what stayed with you.",
    reviewIntro2: "Your experience helps us become better.",
    reviewNamePlaceholder: "How should we address you?",
    rating: "YOUR RATING",
    chooseRating: "Choose a rating",
    comment: "COMMENT",
    commentPlaceholder: "Share your experience...",
    sendReview: "Send review",
    reviewSuccess: "Thank you. Your review has been submitted.",
    selectedNotice: "Selected",
  },
} as const

function Umbrella({
  spinning = false,
  canopyOnly = false,
}: {
  spinning?: boolean
  canopyOnly?: boolean
}) {
  return (
    <div
      className={`umbrella ${spinning ? "spinning" : ""} ${
        canopyOnly ? "canopy-only" : ""
      }`}
      aria-hidden="true"
    >
      <img src={embeddedAssets.umbrellaMark} alt="" />
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [language, setLanguage] = useState<Language>(() =>
    localStorage.getItem("language") === "en" ? "en" : "ua",
  )
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState(
    () => localStorage.getItem("region") || "Європа",
  )
  const [country, setCountry] = useState(
    () => localStorage.getItem("country") || "Україна",
  )
  const [slide, setSlide] = useState(0)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [notice, setNotice] = useState("")
  const [loadingCopy, setLoadingCopy] = useState({
    title: "Формуємо ваш маршрут",
    detail: "Зʼєднуємо точки на мапі світу",
  })

  const c = translations[language]
  const regionName = (name: string) =>
    language === "en" ? regionEnglish[name] : name
  const countryName = (name: string) =>
    language === "en" ? countryEnglish[name] : name
  const cardCountries = featuredCountries[region]
  const visible = useMemo(
    () =>
      [0, 1, 2].map((i) => cardCountries[(slide + i) % cardCountries.length]),
    [cardCountries, slide],
  )

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language === "en" ? "en" : "uk"
  }, [language])

  const go = (next: Screen, selectedCountry = country) => {
    if (next === screen || loading) return
    const copy: Record<Language, Record<Screen, {
      title: string
      detail: string
    }>> = {
      ua: {
        home: {
          title: "Повертаємося до початку",
          detail: "Готуємо нову подорож",
        },
        map: {
          title: "Відкриваємо мапу світу",
          detail: "Шукаємо ваш наступний напрямок",
        },
        countries: {
          title: "Добираємо країни",
          detail: `Відкриваємо найкращі напрямки регіону ${region}`,
        },
        catalog: {
          title: "Відкриваємо весь світ",
          detail: "Збираємо 120 країн в одному каталозі",
        },
        traveler: {
          title: "Формуємо ваш маршрут",
          detail: `Готуємо подорож до країни ${selectedCountry}`,
        },
        review: {
          title: "Зберігаємо ваші враження",
          detail: "Готуємо форму для вашої історії",
        },
      },
      en: {
        home: {
          title: "Returning to the beginning",
          detail: "Preparing a new journey",
        },
        map: {
          title: "Opening the world map",
          detail: "Searching for your next destination",
        },
        countries: {
          title: "Selecting countries",
          detail: `Opening the best destinations in ${regionName(region)}`,
        },
        catalog: {
          title: "Opening the whole world",
          detail: "Bringing 120 countries into one catalog",
        },
        traveler: {
          title: "Creating your itinerary",
          detail: `Preparing your journey to ${countryName(selectedCountry)}`,
        },
        review: {
          title: "Saving your memories",
          detail: "Preparing a form for your story",
        },
      },
    }
    setLoadingCopy(copy[language][next])
    setLoading(true)
    window.setTimeout(() => {
      setScreen(next)
      setLoading(false)
      setNotice("")
      window.scrollTo(0, 0)
    }, 500)
  }
  const chooseRegion = (name: string) => {
    const firstCountry = featuredCountries[name][0]
    setRegion(name)
    setCountry(firstCountry)
    setSlide(0)
    localStorage.setItem("region", name)
    localStorage.setItem("country", firstCountry)
    go("countries")
  }
  const chooseCountry = (name: string) => {
    setCountry(name)
    localStorage.setItem("country", name)
    setNotice(`${c.selectedNotice}: ${countryName(name)}`)
  }
  const submit = (event: FormEvent, message: string) => {
    event.preventDefault()
    setNotice(message)
  }

  return (
    <main className="app">
      {loading && (
        <div className="loader">
          <Umbrella spinning canopyOnly />
          <p>{loadingCopy.title}</p>
          <span>{loadingCopy.detail}</span>
          <div className="progress">
            <b />
          </div>
        </div>
      )}

      <header className={screen === "home" ? "over-hero" : ""}>
        <button className="brand" onClick={() => go("home")}>
          <img className="brandmark" src={embeddedAssets.umbrellaMark} alt="" />
          <span>
            UMBRELLA<small>CORPORATION</small>
          </span>
        </button>
        <nav>
          <button
            className={
              screen === "map" || screen === "countries" ? "active" : ""
            }
            onClick={() => go("map")}
          >
            {c.directions}
          </button>
          <button
            className={screen === "catalog" ? "active" : ""}
            onClick={() => go("catalog")}
          >
            {c.allCountries}
          </button>
          <button
            className={screen === "traveler" ? "active" : ""}
            onClick={() => go("traveler")}
          >
            {c.myTrip}
          </button>
          <button
            className={screen === "review" ? "active" : ""}
            onClick={() => go("review")}
          >
            {c.leaveReview}
          </button>
        </nav>
        <label className="lang">
          <span className="sr-only">
            {language === "en" ? "Language" : "Мова"}
          </span>
          <select
            value={language}
            onChange={(event) => {
              setLanguage(event.target.value as Language)
              setNotice("")
            }}
            aria-label={language === "en" ? "Select language" : "Оберіть мову"}
          >
            <option value="ua">UA</option>
            <option value="en">EN</option>
          </select>
        </label>
      </header>

      {screen === "home" && (
        <section
          className="home"
          style={
            {
              "--hero-image": `url("${embeddedAssets.heroRainUmbrella}")`,
            } as CSSProperties
          }
        >
          <div className="rain" />
          <div className="home-copy">
            <p className="eyebrow">{c.heroEyebrow}</p>
            <h1>
              Umbrella
              <br />
              Corporation
            </h1>
            <p className="lead">{c.heroLead}</p>
            <p className="hero-note">
              {c.heroNote}
              <br />
              {c.heroNote2}
            </p>
            <button className="primary" onClick={() => go("map")}>
              {c.start} <span>→</span>
            </button>
          </div>
          <div className="hero-umbrella">
            <Umbrella />
          </div>
          <div className="home-stats">
            <b>
              06<small>{c.regionsWorld}</small>
            </b>
            <b>
              120<small>{c.countriesDiscover}</small>
            </b>
          </div>
          <div className="home-foot">
            <span>BEYOND THE EVERYDAY</span>
            <span>{c.introduction}</span>
            <span>
              <b>01</b> / 06
            </span>
          </div>
        </section>
      )}

      {screen === "map" && (
        <section className="screen map-screen">
          <div className="section-head">
            <div>
              <p className="eyebrow">01 / {c.chooseRegion}</p>
              <h2>{c.mapTitle}</h2>
            </div>
            <p>
              {c.mapText}
              <br />
              {c.mapText2}
            </p>
          </div>
          <div className="world">
            <img
              className="world-map"
              src={embeddedAssets.worldMap}
              alt={c.mapAlt}
            />
            {Object.keys(regions).map((r, i) => (
              <button
                key={r}
                className={`pin pin-${i}`}
                onClick={() => chooseRegion(r)}
              >
                <i />
                <span>{regionName(r)}</span>
                <small>
                  {regions[r].length} {c.destinations}
                </small>
              </button>
            ))}
            <div className="coordinates">
              SATELLITE VIEW · BLUE MARBLE / NATURAL EARTH
            </div>
          </div>
        </section>
      )}

      {screen === "countries" && (
        <section className="screen country-screen">
          <div className="section-head">
            <div>
              <p className="eyebrow">02 / {c.chooseCountry}</p>
              <h2>
                {c.discover}{" "}
                {language === "ua" && region === "Європа"
                  ? "Європу"
                  : regionName(region)}
              </h2>
            </div>
            <p>
              {c.countryText}
              <br />
              {c.countryText2}
            </p>
          </div>
          <div className="carousel">
            <button
              className="arrow left"
              aria-label={c.back}
              onClick={() =>
                setSlide(
                  (slide - 1 + cardCountries.length) % cardCountries.length,
                )
              }
            >
              ←
            </button>
            <div className="cards">
              {visible.map((name, i) => (
                <button
                  key={name}
                  onClick={() => {
                    chooseCountry(name)
                    go("traveler", name)
                  }}
                  className={`country-card ${
                    country === name ? "selected" : ""
                  }`}
                >
                  <img
                    src={getCountryPhoto(name)}
                    alt={
                      language === "en"
                        ? `Travel to ${countryName(name)}`
                        : `Подорож до країни ${name}`
                    }
                  />
                  <span className="card-no">
                    0{((slide + i) % cardCountries.length) + 1}
                  </span>
                  <div>
                    <small>
                      {regionName(region)} · {c.authoredRoute}
                    </small>
                    <h3>{countryName(name)}</h3>
                    <p>{c.cardLines[i]}</p>
                  </div>
                  <b>{country === name ? c.selected : c.select} ↗</b>
                </button>
              ))}
            </div>
            <button
              className="arrow right"
              aria-label={c.next}
              onClick={() => setSlide((slide + 1) % cardCountries.length)}
            >
              →
            </button>
          </div>
          <div className="bottom-action">
            <span>{c.missingCountry}</span>
            <button className="primary" onClick={() => go("catalog")}>
              {c.choose120} →
            </button>
          </div>
        </section>
      )}

      {screen === "catalog" && (
        <section className="screen catalog-screen">
          <div className="section-head">
            <div>
              <p className="eyebrow">{c.catalogEyebrow}</p>
              <h2>{c.catalogTitle}</h2>
            </div>
            <p>
              {c.catalogText}
              <br />
              {c.catalogText2}
            </p>
          </div>
          <div className="catalog">
            {Object.entries(regions).map(([r, list], index) => (
              <div className="region-list" key={r}>
                <div className="region-title">
                  <span>0{index + 1}</span>
                  <h3>{regionName(r)}</h3>
                  <small>{c.countriesCount}</small>
                </div>
                <div>
                  {list.map((name, i) => (
                    <button
                      key={name}
                      className={country === name ? "chosen" : ""}
                      onClick={() => {
                        setRegion(r)
                        localStorage.setItem("region", r)
                        chooseCountry(name)
                      }}
                    >
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {countryName(name)}
                      <b>{country === name ? "✓" : "+"}</b>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="floating-next">
            <span>
              {notice || `${regionName(region)} / ${countryName(country)}`}
            </span>
            <button className="primary" onClick={() => go("traveler")}>
              {c.fillForm} →
            </button>
          </div>
        </section>
      )}

      {screen === "traveler" && (
        <section className="screen form-screen">
          <div
            className="form-photo"
            style={{ backgroundImage: `url("${getCountryPhoto(country)}")` }}
          >
            <div>
              <p className="eyebrow">{c.yourDestination}</p>
              <h2>{countryName(country)}</h2>
              <span>{regionName(region)}</span>
            </div>
          </div>
          <div className="form-wrap">
            <p className="eyebrow">04 / {c.travelerForm}</p>
            <h2>
              {c.travelerTitle}
              <br />
              {c.travelerTitle2}
            </h2>
            <form onSubmit={(e) => submit(e, c.formSuccess)}>
              <label>
                {c.selectedCountry}
                <input value={countryName(country)} readOnly />
              </label>
              <label>
                {c.yourName}
                <input required placeholder={c.namePlaceholder} />
              </label>
              <label>
                {c.contact}
                <input required placeholder={c.contactPlaceholder} />
              </label>
              <div className="row">
                <label>
                  {c.tripStart}
                  <input required type="date" />
                </label>
                <label>
                  {c.tripEnd}
                  <input required type="date" />
                </label>
              </div>
              <label>
                {c.travelers}
                <input
                  required
                  type="number"
                  min="1"
                  max="20"
                  defaultValue="2"
                />
              </label>
              <button className="primary" type="submit">
                {c.sendForm} →
              </button>
            </form>
            {notice && <div className="success">{notice}</div>}
          </div>
        </section>
      )}

      {screen === "review" && (
        <section className="screen review-screen">
          <div
            className="review-photo"
            style={
              {
                "--review-image": `url("${embeddedAssets.reviewManUmbrella}")`,
              } as CSSProperties
            }
          >
            <div>
              <small>{c.reviewKicker}</small>
              <h2>
                {c.storyTitle}
                <br />
                {c.storyTitle2}
              </h2>
              <p>{c.thanks}</p>
            </div>
          </div>
          <div className="review-content">
            <p className="eyebrow">{c.impressions}</p>
            <h2>{c.reviewTitle}</h2>
            <p className="review-intro">
              {c.reviewIntro}
              <br />
              {c.reviewIntro2}
            </p>
            <form
              className="review-form"
              onSubmit={(e) => submit(e, c.reviewSuccess)}
            >
              <label>
                {c.yourName}
                <input required placeholder={c.reviewNamePlaceholder} />
              </label>
              <label>
                {c.rating}
                <div className="rating-row">
                  <div className="stars" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((n) => {
                      const active = n <= (hoverRating || rating)
                      return (
                        <button
                          type="button"
                          key={n}
                          className={active ? "on" : ""}
                          onMouseEnter={() => setHoverRating(n)}
                          onFocus={() => setHoverRating(n)}
                          onBlur={() => setHoverRating(0)}
                          onClick={() => setRating(n)}
                          aria-label={
                            language === "en" ? `${n} out of 5` : `${n} з 5`
                          }
                        >
                          {active ? "★" : "☆"}
                        </button>
                      )
                    })}
                  </div>
                  <span>{rating ? `${rating} / 5` : c.chooseRating}</span>
                </div>
              </label>
              <label>
                {c.comment}
                <textarea
                  required
                  rows={5}
                  placeholder={c.commentPlaceholder}
                />
              </label>
              <button className="primary" type="submit">
                {c.sendReview} <span>↗</span>
              </button>
              {notice && <div className="success">{notice}</div>}
            </form>
          </div>
        </section>
      )}
    </main>
  )
}
