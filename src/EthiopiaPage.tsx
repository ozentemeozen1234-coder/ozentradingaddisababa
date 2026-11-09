import { useEffect, useMemo, useState } from 'react'

type Language = 'en' | 'am'

type Article = {
  id: number
  category: string
  title: string
  amTitle: string
  summary: string
  amSummary: string
}

type EthiopiaPhoto = {
  title: string
  amTitle: string
  image: string
  alt: string
  credit: string
  source: string
}

const articles: Article[] = [
  { id: 1, category: 'History', title: 'The Ancient Kingdom of Aksum', amTitle: 'የጥንቷ አክሱም መንግሥት', summary: 'Explore the history, trade networks and monumental stelae of one of the great civilizations of the Horn of Africa.', amSummary: 'በአፍሪካ ቀንድ ከነበሩ ታላላቅ ሥልጣኔዎች አንዷን የአክሱምን ታሪክ፣ የንግድ ግንኙነቶችና ሐውልቶች ይመልከቱ።' },
  { id: 2, category: 'History', title: 'Lalibela: Architecture Carved in Stone', amTitle: 'ላሊበላ፦ በድንጋይ የተቀረጸ ሥነ-ሕንፃ', summary: 'A closer look at the remarkable rock-hewn churches and the heritage surrounding them.', amSummary: 'ድንቅ የድንጋይ ውስጥ የተቀረጹ አብያተ ክርስቲያናትንና ቅርሳቸውን እንመለከታለን።' },
  { id: 3, category: 'People & Culture', title: 'The Many Languages of Ethiopia', amTitle: 'የኢትዮጵያ ብዙ ቋንቋዎች', summary: 'Discover the country’s linguistic diversity and the communities that keep their languages thriving.', amSummary: 'የአገሪቱን የቋንቋ ብዝሃነትና ቋንቋዎቻቸውን የሚጠብቁ ማኅበረሰቦችን ያውቁ።' },
  { id: 4, category: 'People & Culture', title: 'Coffee: A Ceremony of Welcome', amTitle: 'ቡና፦ የአቀባበል ሥነ-ሥርዓት', summary: 'Learn about the coffee ceremony as a tradition of hospitality, conversation and community.', amSummary: 'የቡና ሥነ-ሥርዓትን እንደ እንግዳ አቀባበል፣ ውይይትና ማኅበራዊ ትስስር ወግ ይወቁ።' },
  { id: 5, category: 'Music', title: 'Krar, Masenqo and Begena', amTitle: 'ክራር፣ ማሲንቆና በገና', summary: 'Meet some of Ethiopia’s distinctive traditional instruments and the musical traditions around them.', amSummary: 'የኢትዮጵያን ልዩ ባህላዊ የሙዚቃ መሣሪያዎችና የሙዚቃ ወጎቻቸውን ያውቁ።' },
  { id: 6, category: 'Nature', title: 'The Simien Mountains', amTitle: 'የሰሜን ተራሮች', summary: 'Discover dramatic highland landscapes and the importance of protecting unique ecosystems.', amSummary: 'ድንቅ የደጋ መልክዓ ምድሮችንና ልዩ የተፈጥሮ ሥርዓቶችን መጠበቅ ያለውን ጠቀሜታ ይመልከቱ።' },
  { id: 7, category: 'Nature', title: 'The Great Rift Valley and Its Lakes', amTitle: 'ታላቁ ስምጥ ሸለቆና ሐይቆቹ', summary: 'A journey through the landscapes, lakes and biodiversity of the Rift Valley.', amSummary: 'የስምጥ ሸለቆን መልክዓ ምድር፣ ሐይቆችና የሕይወት ብዝሃነት እንቃኛለን።' },
  { id: 8, category: 'Heritage & Travel', title: 'Harar: A Walled City of Heritage', amTitle: 'ሐረር፦ ቅርስ የተሸከመች ግንብ ከተማ', summary: 'Explore the historic city, its architecture, markets and living cultural traditions.', amSummary: 'ታሪካዊቷን ከተማ፣ ሥነ-ሕንፃዋን፣ ገበያዎቿንና ሕያው ባህሎቿን ይመልከቱ።' },
  { id: 9, category: 'Heritage & Travel', title: 'Gondar and Its Historic Castles', amTitle: 'ጎንደርና ታሪካዊ ቤተ-መንግሥቶቿ', summary: 'An introduction to the castles and cultural legacy of the historic city of Gondar.', amSummary: 'የጎንደርን ቤተ-መንግሥቶችና ታሪካዊ ቅርሶች እንቃኛለን።' },
  { id: 10, category: 'Economy & Opportunity', title: 'Ethiopian Coffee in Global Markets', amTitle: 'የኢትዮጵያ ቡና በዓለም ገበያ', summary: 'Understand the place of Ethiopian coffee in international trade and the value chain.', amSummary: 'የኢትዮጵያ ቡና በዓለም አቀፍ ንግድና በምርት ሰንሰለት ያለውን ሚና ይመልከቱ።' },
  { id: 11, category: 'Economy & Opportunity', title: 'Textiles, Cotton and Creative Enterprise', amTitle: 'ጨርቃጨርቅ፣ ጥጥና የፈጠራ ንግድ', summary: 'Explore opportunities across textile production, design, skills and responsible trade.', amSummary: 'በጨርቃጨርቅ ምርት፣ ዲዛይን፣ ክህሎትና ኃላፊነት ባለው ንግድ ያሉ ዕድሎችን ያስሱ።' },
  { id: 12, category: 'Modern Ethiopia', title: 'Young Innovators and the Digital Future', amTitle: 'ወጣት ፈጣሪዎችና ዲጂታል የወደፊት ዕድል', summary: 'A look at entrepreneurship, technology and the ideas shaping tomorrow.', amSummary: 'ሥራ ፈጠራን፣ ቴክኖሎጂንና የነገውን ዓለም የሚቀርጹ ሐሳቦችን እንመለከታለን።' },
]


const ethiopiaPhotos: EthiopiaPhoto[] = [
  {
    title: 'Coffee Ceremony in Lalibela',
    amTitle: 'በላሊበላ የቡና ሥነ-ሥርዓት',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Coffee_ceremony%2C_Lalibela.jpg?width=1600',
    alt: 'Traditional Ethiopian coffee ceremony in Lalibela',
    credit: 'Niels Van Iperen · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Coffee_ceremony,_Lalibela.jpg',
  },
  {
    title: 'Bet Abba Libanos, Lalibela',
    amTitle: 'ቤተ አባ ሊባኖስ፣ ላሊበላ',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Churches_of_Lalibela_-_Bet_Abba_Libanos.jpg?width=1600',
    alt: 'Rock-hewn church of Bet Abba Libanos in Lalibela, Ethiopia',
    credit: 'Damien Halleux Radermecker · CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Churches_of_Lalibela_-_Bet_Abba_Libanos.jpg',
  },
  {
    title: 'Bet Medhane Alem Church',
    amTitle: 'ቤተ መድኃኔ ዓለም ቤተ ክርስቲያን',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bet_Medhane_Alem_church_Lalibela.jpg?width=1400',
    alt: 'Bet Medhane Alem rock-hewn church in Lalibela',
    credit: 'Giustino · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Bet_Medhane_Alem_church_Lalibela.jpg',
  },
  {
    title: 'Highland Mountains of Lalibela',
    amTitle: 'የላሊበላ ደጋማ ተራሮች',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/View_of_Mountains%2C_Facing_Northwest_from_Lalibela.jpg?width=1600',
    alt: 'Mountain landscape viewed from Lalibela, Ethiopia',
    credit: 'RNLockwood · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:View_of_Mountains,_Facing_Northwest_from_Lalibela.jpg',
  },
  {
    title: 'Lalibela Town Skyline',
    amTitle: 'የላሊበላ ከተማ እይታ',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Skyline_Lalibela_01.jpg?width=1600',
    alt: 'Townscape of Lalibela in the Ethiopian highlands',
    credit: 'Armin Hamm · CC BY-SA 2.5',
    source: 'https://commons.wikimedia.org/wiki/File:Skyline_Lalibela_01.jpg',
  },
  {
    title: 'Landscape Around Lalibela',
    amTitle: 'በላሊበላ ዙሪያ ያለው መልክዓ ምድር',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lalibela_Ethiopia_landscape_%286%29.jpg?width=1600',
    alt: 'Landscape and settlement around Lalibela, Ethiopia',
    credit: 'Radosław Botev · CC BY 3.0 PL',
    source: 'https://commons.wikimedia.org/wiki/File:Lalibela_Ethiopia_landscape_(6).jpg',
  },
  {
    title: 'Northern Stelae Park, Aksum',
    amTitle: 'የሰሜን ሐውልቶች ፓርክ፣ አክሱም',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/ET_Axum_asv2018-01_img37_Stelae_Park.jpg?width=1600',
    alt: 'Ancient stelae at the Northern Stelae Park in Aksum, Tigray',
    credit: 'A.Savin · Free Art License',
    source: 'https://commons.wikimedia.org/wiki/File:ET_Axum_asv2018-01_img37_Stelae_Park.jpg',
  },
  {
    title: 'Simien Mountains',
    amTitle: 'የሰሜን ተራሮች',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Simien_mountains.jpg?width=1600',
    alt: 'Mountain scenery in the Simien Mountains of Ethiopia',
    credit: 'Indrik myneur · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Simien_mountains.jpg',
  },
  {
    title: 'Aksum, Ethiopia',
    amTitle: 'አክሱም፣ ኢትዮጵያ',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Axum%2C_Ethiopia_%2827167570040%29.jpg?width=1600',
    alt: 'View of Aksum in northern Ethiopia',
    credit: 'Mike Cotterill · CC0 1.0',
    source: 'https://commons.wikimedia.org/wiki/File:Axum,_Ethiopia_(27167570040).jpg',
  },
]

const articlePhotoByCategory: Record<string, string> = {
  History: ethiopiaPhotos[6].image,
  'People & Culture': ethiopiaPhotos[0].image,
  Music: ethiopiaPhotos[0].image,
  Nature: ethiopiaPhotos[7].image,
  'Heritage & Travel': ethiopiaPhotos[1].image,
  'Economy & Opportunity': ethiopiaPhotos[4].image,
  'Modern Ethiopia': ethiopiaPhotos[8].image,
}

const categories = ['All', 'History', 'People & Culture', 'Music', 'Nature', 'Heritage & Travel', 'Economy & Opportunity', 'Modern Ethiopia']

const amCategories: Record<string, string> = {
  All: 'ሁሉም',
  History: 'ታሪክ',
  'People & Culture': 'ሕዝብና ባህል',
  Music: 'ሙዚቃ',
  Nature: 'ተፈጥሮ',
  'Heritage & Travel': 'ቅርስና ቱሪዝም',
  'Economy & Opportunity': 'ኢኮኖሚና ዕድሎች',
  'Modern Ethiopia': 'ዘመናዊ ኢትዮጵያ',
}

type Props = { language: Language; onLanguageChange: () => void }

export default function EthiopiaPage({ language, onLanguageChange }: Props) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [activePhoto, setActivePhoto] = useState(0)
  const isAm = language === 'am'

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % ethiopiaPhotos.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [])

  const visibleArticles = useMemo(() => articles.filter((article) => {
    const matchesCategory = category === 'All' || article.category === category
    const title = isAm ? article.amTitle : article.title
    const summary = isAm ? article.amSummary : article.summary
    const matchesSearch = `${title} ${summary}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  }), [category, search, isAm])

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      window.alert(isAm ? 'የገጹ ሊንክ ተቀድቷል።' : 'Page link copied.')
    } catch {
      window.prompt(isAm ? 'ይህን ሊንክ ይቅዱ፦' : 'Copy this page link:', window.location.href)
    }
  }

  return (
    <main className={`heritage-page ${isAm ? 'amharic' : ''}`}>
      <header className="heritage-header">
        <a className="brand" href="#home" aria-label="OZEN Trading home">
          <span className="brand-mark">O</span>
          <span className={`brand-name ${isAm ? 'amharic-brand' : ''}`}>
            {isAm ? 'ኦዜን ትሬዲንግ' : 'OZEN TRADING'}
            <small>{isAm ? 'ኋ/የተ/የግ/ማህበር' : 'PLC'}</small>
          </span>
        </a>
        <div className="heritage-header-actions">
          <a className="heritage-back" href="#home">{isAm ? '← ወደ ዋናው ገጽ' : '← Back to OZEN'}</a>
          <button className="language-button" type="button" onClick={onLanguageChange}>{isAm ? 'EN' : 'አማ'}</button>
        </div>
      </header>

      <section className="heritage-hero">
        <div className="heritage-hero-copy">
          <span className="heritage-kicker">OZEN CONNECT PRESENTS · ETHIOPIA</span>
          <h1>{isAm ? 'ኢትዮጵያ፦ ቅርሳችን፣ ኩራታችን፣ የወደፊት ተስፋችን' : 'Ethiopia: Our Heritage, Our Pride, Our Future'}</h1>
          <p>{isAm ? 'የኢትዮጵያን ታሪክ፣ ሕዝቦች፣ ባህሎች፣ ተፈጥሮና የወደፊት ዕድሎች በእውቀት፣ በአክብሮትና በጥንቃቄ እናቀርባለን።' : 'Discover Ethiopia’s history, peoples, cultures, landscapes and future opportunities through carefully prepared stories rooted in respect, curiosity and credible research.'}</p>
          <a className="button button-gold" href="#heritage-stories">{isAm ? 'ታሪኮቹን ያስሱ' : 'Explore the stories'} <span>↓</span></a>
        </div>
      </section>


      <section className="heritage-gallery-section" aria-label={isAm ? 'የኢትዮጵያ ፎቶ ማዕከል' : 'Ethiopia photo gallery'}>
        <div className="heritage-gallery-wrap">
          <div className="heritage-gallery-heading">
            <span className="section-label">{isAm ? 'እውነተኛ የኢትዮጵያ ምስሎች' : 'REAL PHOTOGRAPHY FROM ETHIOPIA'}</span>
            <h2>{isAm ? 'ኢትዮጵያን በምስል ያግኙ።' : 'Experience Ethiopia in photographs.'}</h2>
            <p>{isAm ? 'ታሪካዊ ቦታዎችን፣ ባህልንና የተፈጥሮ ውበትን በእውነተኛ ፎቶዎች ይመልከቱ።' : 'Explore heritage sites, culture and landscapes through real photographs with source and photographer credits.'}</p>
          </div>
          <div className="heritage-photo-carousel">
            <img
              key={ethiopiaPhotos[activePhoto].image}
              src={ethiopiaPhotos[activePhoto].image}
              alt={ethiopiaPhotos[activePhoto].alt}
              loading="lazy"
            />
            <div className="heritage-photo-shade" />
            <div className="heritage-photo-caption">
              <span>{String(activePhoto + 1).padStart(2, '0')} / {String(ethiopiaPhotos.length).padStart(2, '0')}</span>
              <h3>{isAm ? ethiopiaPhotos[activePhoto].amTitle : ethiopiaPhotos[activePhoto].title}</h3>
              <a href={ethiopiaPhotos[activePhoto].source} target="_blank" rel="noreferrer">
                {isAm ? 'የፎቶ ምንጭና ፈቃድ' : 'Photo source & license'} · {ethiopiaPhotos[activePhoto].credit}
              </a>
            </div>
            <div className="heritage-photo-controls">
              <button type="button" aria-label={isAm ? 'ቀዳሚ ፎቶ' : 'Previous photo'} onClick={() => setActivePhoto((activePhoto - 1 + ethiopiaPhotos.length) % ethiopiaPhotos.length)}>‹</button>
              <button type="button" aria-label={isAm ? 'ቀጣይ ፎቶ' : 'Next photo'} onClick={() => setActivePhoto((activePhoto + 1) % ethiopiaPhotos.length)}>›</button>
            </div>
          </div>
          <div className="heritage-photo-dots">
            {ethiopiaPhotos.map((photo, index) => (
              <button
                key={photo.title}
                type="button"
                className={index === activePhoto ? 'active' : ''}
                aria-label={`${isAm ? 'ፎቶ' : 'Photo'} ${index + 1}`}
                aria-pressed={index === activePhoto}
                onClick={() => setActivePhoto(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="heritage-film-section">
        <div className="heritage-film-wrap">
          <div>
            <span className="section-label">{isAm ? 'የኦዜን ማስተዋወቂያ ፊልም' : 'OZEN ETHIOPIA FILM'}</span>
            <h2>{isAm ? 'የኢትዮጵያን ታሪክና ውበት በቪዲዮ እናቀርባለን።' : 'Ethiopia’s story, brought to life on film.'}</h2>
            <p>{isAm ? 'የኦዜን የማስተዋወቂያ ቪዲዮ በምርት ዝግጅት ላይ ነው። የተረጋገጡ ምስሎችን፣ ታሪኮችንና የኩባንያውን ራዕይ አካትተን እናዘጋጃለን።' : 'The official OZEN promotional film is planned for production. It will bring together verified footage, Ethiopia’s stories and the company’s vision.'}</p>
            <span className="heritage-film-status">{isAm ? 'በዝግጅት ላይ' : 'COMING SOON'}</span>
          </div>
          <div className="heritage-film-poster" role="img" aria-label={isAm ? 'የኢትዮጵያ የቪዲዮ ማስተዋወቂያ ምስል' : 'Ethiopia promotional film preview'}>
            <span className="heritage-film-play" aria-hidden="true">▶</span>
            <span>{isAm ? 'የኢትዮጵያ ታሪክ' : 'DISCOVER ETHIOPIA'}</span>
          </div>
        </div>
      </section>

      <section className="heritage-section">
        <div className="heritage-intro">
          <span className="section-label">{isAm ? 'የኢትዮጵያ ብዝሃ ሀብት' : 'A COUNTRY OF MANY STORIES'}</span>
          <h2>{isAm ? 'አንድ አገር፤ ብዙ ታሪኮች፣ ባህሎችና ውበቶች።' : 'One country. Many histories, cultures and landscapes.'}</h2>
          <p>{isAm ? 'ኢትዮጵያ ብዙ ሕዝቦች፣ ቋንቋዎች፣ የእምነት ወጎችና የአካባቢ ልዩነቶች ያሏት አገር ናት። ይህ ገጽ ያንን ብዝሃነት በአክብሮት ያቀርባል።' : 'Ethiopia is home to many peoples, languages, faith traditions and regional identities. This editorial space celebrates that diversity without reducing the country to a single story.'}</p>
        </div>
        <div className="heritage-category-grid">
          {[
            ['01', 'History & Civilization', 'From ancient kingdoms to living heritage.', 'ታሪክና ሥልጣኔ', 'ከጥንታዊ መንግሥታት እስከ ሕያው ቅርሶች።'],
            ['02', 'People & Culture', 'Languages, communities and traditions.', 'ሕዝብና ባህል', 'ቋንቋዎች፣ ማኅበረሰቦችና ወጎች።'],
            ['03', 'Music & Instruments', 'Sounds, instruments and musical heritage.', 'ሙዚቃና መሣሪያዎች', 'ድምፆች፣ መሣሪያዎችና የሙዚቃ ቅርስ።'],
            ['04', 'Nature & Landscapes', 'Mountains, lakes, valleys and biodiversity.', 'ተፈጥሮና መልክዓ ምድር', 'ተራሮች፣ ሐይቆች፣ ሸለቆዎችና ብዝሃ ሕይወት።'],
            ['05', 'Heritage & Travel', 'Historic places and responsible tourism.', 'ቅርስና ቱሪዝም', 'ታሪካዊ ቦታዎችና ኃላፊነት ያለው ቱሪዝም።'],
            ['06', 'Economy & Future', 'Trade, innovation and new opportunities.', 'ኢኮኖሚና የወደፊት ዕድል', 'ንግድ፣ ፈጠራና አዳዲስ ዕድሎች።'],
          ].map(([number, title, description, amTitle, amDescription]) => (
            <a className="heritage-category" href="#heritage-stories" key={number}>
              <span>{number} / OZEN HERITAGE</span>
              <h3>{isAm ? amTitle : title}</h3>
              <p>{isAm ? amDescription : description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="heritage-story-section" id="heritage-stories">
        <div className="heritage-story-wrap">
          <div className="heritage-story-head">
            <div>
              <span className="section-label">{isAm ? 'የኦዜን የኢትዮጵያ ታሪኮች' : 'OZEN ETHIOPIA STORIES'}</span>
              <h2>{isAm ? 'ያስሱ፣ ይማሩ፣ ያጋሩ።' : 'Explore. Learn. Share.'}</h2>
            </div>
            <input className="heritage-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={isAm ? 'ታሪክ ይፈልጉ...' : 'Search stories...'} aria-label="Search Ethiopia stories" />
          </div>
          <div className="heritage-filter-row">
            {categories.map((item) => (
              <button className={`heritage-filter ${category === item ? 'active' : ''}`} key={item} type="button" onClick={() => setCategory(item)}>
                {isAm ? amCategories[item] : item}
              </button>
            ))}
          </div>
          <div className="heritage-article-grid">
            {visibleArticles.map((article) => (
              <article className="heritage-article" key={article.id}>
                <div className="heritage-article-art">
                  <img
                    src={articlePhotoByCategory[article.category] || ethiopiaPhotos[0].image}
                    alt={isAm ? article.amTitle : article.title}
                    loading="lazy"
                  />
                  <span>OZEN CONNECT · ETHIOPIA {String(article.id).padStart(2, '0')}</span>
                </div>
                <div className="heritage-article-body">
                  <small>{isAm ? amCategories[article.category] : article.category}</small>
                  <h3>{isAm ? article.amTitle : article.title}</h3>
                  <p>{isAm ? article.amSummary : article.summary}</p>
                  <div className="heritage-article-actions">
                    <span>{isAm ? 'የኦዜን ኤዲቶሪያል ተከታታይ' : 'OZEN Editorial Series'}</span>
                    <button className="heritage-filter" type="button" onClick={copyShareLink}>{isAm ? 'አጋራ ↗' : 'Share ↗'}</button>
                  </div>
                </div>
              </article>
            ))}
            {visibleArticles.length === 0 && <div className="heritage-empty">{isAm ? 'የሚፈልጉት ጽሑፍ አልተገኘም።' : 'No stories match your search.'}</div>}
          </div>
          <div className="heritage-editorial-note">
            {isAm
              ? 'የኦዜን የኢትዮጵያ ኤዲቶሪያል ፕሮግራም ከ100 በላይ ጽሑፎችን፣ የፎቶ ታሪኮችንና የባህል መግለጫዎችን ለማዘጋጀት ታቅዷል። ይህ የመጀመሪያ የይዘት ምርጫ ነው፤ ተጨማሪ ጽሑፎች በምርምርና በማረጋገጫ ሂደት ይጨመራሉ።'
              : 'OZEN’s Ethiopia editorial programme is planned to grow to 100+ researched articles, photo stories and cultural features. This is the initial curated collection; additional stories will be published after editorial research and fact-checking.'}
          </div>
        </div>
      </section>

      <section className="heritage-community">
        <h2>{isAm ? 'ኢትዮጵያን አብረን እናውቅ።' : 'Discover Ethiopia with OZEN.'}</h2>
        <p>{isAm ? 'OZEN Trading PLC የኢትዮጵያን ታሪክና ባህል በአክብሮት ለማቅረብና የአገሪቱን የንግድ ዕድሎች ከዓለም ጋር ለማገናኘት ይፈልጋል።' : 'OZEN Trading PLC is proud to present stories about Ethiopia’s heritage while working to connect the country’s business opportunities with global markets.'}</p>
        <a className="button button-gold" href="#contact">{isAm ? 'ከOZEN ጋር ይገናኙ' : 'Connect with OZEN'} <span>↗</span></a>
      </section>
      <footer className="heritage-footer">
        <span>© {new Date().getFullYear()} {isAm ? 'ኦዜን ትሬዲንግ' : 'OZEN TRADING PLC'}</span>
        <span>{isAm ? 'ኢትዮጵያ፦ ቅርሳችን፣ ኩራታችን።' : 'Ethiopia: Our Heritage, Our Pride.'}</span>
        <a href="#home">{isAm ? 'ወደ ዋናው ገጽ ↑' : 'Back to OZEN ↑'}</a>
      </footer>
    </main>
  )
}
