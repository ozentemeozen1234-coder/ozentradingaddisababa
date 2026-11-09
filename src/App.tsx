
import { useEffect, useState } from 'react'
import './App.css'
import EthiopiaPage from './EthiopiaPage'

type Language = 'en' | 'am'

const content = {
  en: {
    nav: ['Home', 'About Us', 'Our Businesses', 'Ethiopia', 'Our Locations', 'Contact'],
    heroTag: 'ETHIOPIAN ROOTS. GLOBAL AMBITION.',
    heroTitle: 'Connecting Ethiopia to Global Opportunities.',
    heroText:
      'Ozen Trading PLC is an Ethiopian multi-sector trading company focused on international trade, technology, investment and business services.',
    showcaseLabel: 'OUR SECTORS IN FOCUS',
    showcaseTitle: 'Ideas, industries and opportunities.',
    showcaseText: 'Explore the sectors that shape our business focus, from global trade and technology to Ethiopian products and development.',
    appLabel: 'A NEW WAY TO CONNECT',
    appTitle: 'The OZEN App is on the way.',
    appText: 'We are planning a dedicated digital experience to make it easier to discover OZEN services and connect with our team.',
    appStatus: 'COMING SOON',
    explore: 'Explore Our Business',
    contact: 'Contact Us',
    aboutLabel: 'WHO WE ARE',
    aboutTitle: 'Rooted in Ethiopia. Connected to the World.',
    aboutText:
      'Built on Ethiopian ambition and a commitment to trusted business relationships, Ozen Trading PLC aims to connect local opportunities with international markets.',
    visionTitle: 'Our Vision',
    visionText:
      'To become a trusted multi-sector trading and investment company contributing to Ethiopia’s economic growth and regional connections.',
    missionTitle: 'Our Mission',
    missionText:
      'To connect markets through responsible trade, quality products, technology and reliable business services.',
    businessLabel: 'WHAT WE DO',
    businessTitle: 'Our Business Portfolio',
    businessText:
      'We pursue opportunities across multiple sectors, guided by quality, professionalism and long-term partnerships.',
    businesses: [
      ['01', 'Import & Distribution', 'Connecting businesses with musical equipment, IT systems, textiles and other products from international markets.'],
      ['02', 'Export Operations', 'Promoting Ethiopian leather, footwear, textiles and related products to international markets.'],
      ['03', 'Technology & IT', 'Supporting access to computers, servers, networking and technology-related equipment.'],
      ['04', 'Real Estate & Development', 'Pursuing opportunities in real estate and industrial development.'],
      ['05', 'Railway & Transport', 'Exploring trade opportunities involving railway and tramway equipment and related parts.'],
      ['06', 'Business Services', 'Providing specialized services and business support in line with applicable licensing requirements.'],
    ],
    ethiopiaLabel: 'OUR HOME. OUR FOUNDATION.',
    ethiopiaTitle: 'Proudly Ethiopian. Open to the World.',
    ethiopiaText:
      'From Addis Ababa to Mekele, our Ethiopian roots shape our understanding of local markets, business relationships and the opportunities that connect Ethiopia with the wider world.',
    locationsTitle: 'Our Locations',
    addis: 'Addis Ababa – Head Office',
    addisAddress: 'Bole Sub-City, Woreda 04, Addis Ababa, Ethiopia',
    mekele: 'Mekele – Regional Branch',
    mekeleAddress: 'Quiha Sub-City, Woreda 02, Kebele 02, Mekele, Ethiopia',
    contactLabel: 'LET’S CONNECT',
    contactTitle: 'Let’s Build Business Opportunities Together.',
    contactText:
      'Contact our team to discuss business inquiries, partnerships and opportunities.',
    email: 'Email',
    phone: 'Phone',
    address: 'Head Office',
    footer: 'Connecting Global Markets. Delivering Trusted Solutions.',
    rights: 'All rights reserved.',
  },
  am: {
    nav: ['መነሻ', 'ስለ እኛ', 'የንግድ ዘርፎች', 'ኢትዮጵያ', 'አድራሻዎቻችን', 'ያግኙን'],
    heroTag: 'ኢትዮጵያዊ መሠረት። ዓለም አቀፍ ራዕይ።',
    heroTitle: 'ኢትዮጵያን ከዓለም አቀፍ የንግድ ዕድሎች ጋር እናገናኛለን።',
    heroText:
      'ኦዘን ትሬዲንግ ኃ/የተ/የግ/ማ በዓለም አቀፍ ንግድ፣ ቴክኖሎጂ፣ ኢንቨስትመንት እና የንግድ አገልግሎቶች ላይ የሚያተኩር ኢትዮጵያዊ ድርጅት ነው።',
    showcaseLabel: 'የምናተኩርባቸው ዘርፎች',
    showcaseTitle: 'ሀሳቦች፣ ኢንዱስትሪዎችና ዕድሎች።',
    showcaseText: 'ከዓለም አቀፍ ንግድና ቴክኖሎጂ እስከ ኢትዮጵያዊ ምርቶችና ልማት ድረስ የምናተኩርባቸውን ዘርፎች ይመልከቱ።',
    appLabel: 'አዲስ የዲጂታል ግንኙነት',
    appTitle: 'OZEN App በቅርቡ ይመጣል።',
    appText: 'የOZEN አገልግሎቶችን ለማወቅና ከቡድናችን ጋር ለመገናኘት የሚያግዝ ልዩ የዲጂታል መድረክ እያቀድን ነው።',
    appStatus: 'በቅርቡ ይመጣል',
    explore: 'የንግድ ዘርፎቻችንን ይመልከቱ',
    contact: 'ያግኙን',
    aboutLabel: 'ማን ነን?',
    aboutTitle: 'መሠረታችን ኢትዮጵያ። ግንኙነታችን ከዓለም ጋር።',
    aboutText:
      'በኢትዮጵያዊ ራዕይና በታማኝ የንግድ ግንኙነቶች መሠረት የተገነባው ኦዘን ትሬዲንግ የአገር ውስጥ የንግድ ዕድሎችን ከዓለም ገበያዎች ጋር ለማገናኘት ይሠራል።',
    visionTitle: 'ራዕያችን',
    visionText:
      'ለኢትዮጵያ የኢኮኖሚ ዕድገትና ለክልላዊ ግንኙነቶች አስተዋጽኦ የሚያደርግ ታማኝ ባለብዙ ዘርፍ የንግድና የኢንቨስትመንት ድርጅት መሆን።',
    missionTitle: 'ተልዕኳችን',
    missionText:
      'በኃላፊነት የተመራ ንግድ፣ ጥራት ያላቸው ምርቶች፣ ቴክኖሎጂና ታማኝ የንግድ አገልግሎቶች ገበያዎችን ማገናኘት።',
    businessLabel: 'ምን እንሠራለን?',
    businessTitle: 'የንግድ ዘርፎቻችን',
    businessText:
      'በጥራት፣ በሙያዊ አሠራርና በረጅም ጊዜ የንግድ ትብብር መርሆዎች በተለያዩ ዘርፎች የንግድ ዕድሎችን እንከታተላለን።',
    businesses: [
      ['01', 'ማስመጣትና ማከፋፈል', 'የሙዚቃ መሣሪያዎች፣ የIT ሥርዓቶች፣ ጨርቃጨርቅና ሌሎች ምርቶችን ከዓለም ገበያዎች ጋር ማገናኘት።'],
      ['02', 'ወደ ውጭ መላክ', 'የኢትዮጵያ የቆዳ ውጤቶችን፣ ጫማዎችንና ጨርቃጨርቅን ለዓለም ገበያ ማቅረብ።'],
      ['03', 'ቴክኖሎጂና IT', 'ኮምፒውተሮችን፣ ሰርቨሮችን፣ የኔትወርክ መሣሪያዎችንና ቴክኖሎጂ ነክ ምርቶችን ለማቅረብ መሥራት።'],
      ['04', 'ሪል እስቴትና ልማት', 'በሪል እስቴትና በኢንዱስትሪ ልማት ዘርፎች የንግድ ዕድሎችን መከታተል።'],
      ['05', 'ባቡርና ትራንስፖርት', 'ከባቡርና ትራም መሣሪያዎች እና ተያያዥ ክፍሎች ጋር የተያያዙ የንግድ ዕድሎችን መፈለግ።'],
      ['06', 'ልዩ የንግድ አገልግሎቶች', 'ከሚመለከታቸው ፈቃዶችና ሕጋዊ መስፈርቶች ጋር ተስማምተው ልዩ አገልግሎቶችን መስጠት።'],
    ],
    ethiopiaLabel: 'አገራችን። መሠረታችን።',
    ethiopiaTitle: 'በኢትዮጵያዊነታችን እንኮራለን። ለዓለም ክፍት ነን።',
    ethiopiaText:
      'ከአዲስ አበባ እስከ መቀሌ፣ ኢትዮጵያዊ መሠረታችን የአገር ውስጥ ገበያዎችን፣ የንግድ ግንኙነቶችንና ኢትዮጵያን ከዓለም ጋር የሚያገናኙ ዕድሎችን እንድንረዳ ያግዘናል።',
    locationsTitle: 'የምንገኝባቸው ቦታዎች',
    addis: 'አዲስ አበባ – ዋና መሥሪያ ቤት',
    addisAddress: 'ቦሌ ክፍለ ከተማ፣ ወረዳ 04፣ አዲስ አበባ፣ ኢትዮጵያ',
    mekele: 'መቀሌ – ክልላዊ ቅርንጫፍ',
    mekeleAddress: 'ቁሓ ክፍለ ከተማ፣ ወረዳ 02፣ ቀበሌ 02፣ መቀሌ፣ ኢትዮጵያ',
    contactLabel: 'እንገናኝ',
    contactTitle: 'አብረን የንግድ ዕድሎችን እንፍጠር።',
    contactText:
      'ስለ ንግድ ጥያቄዎች፣ ሽርክናዎችና የትብብር ዕድሎች ከቡድናችን ጋር ይገናኙ።',
    email: 'ኢሜይል',
    phone: 'ስልክ',
    address: 'ዋና መሥሪያ ቤት',
    footer: 'ዓለም አቀፍ ገበያዎችን ማገናኘት። ታማኝ መፍትሔዎችን ማቅረብ።',
    rights: 'መብቱ በሕግ የተጠበቀ ነው።',
  },
}

const showcaseSlides = [
  {
    title: 'Global Trade & Logistics',
    amTitle: 'ዓለም አቀፍ ንግድና ሎጂስቲክስ',
    description: 'Connecting markets through import, export and trade opportunities.',
    amDescription: 'በማስመጣት፣ በመላክና በንግድ ዕድሎች ገበያዎችን ማገናኘት።',
    image: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1600&q=85',
    alt: 'Cargo containers and global shipping logistics',
  },
  {
    title: 'Technology & IT',
    amTitle: 'ቴክኖሎጂና IT',
    description: 'Technology infrastructure, computing and network solutions.',
    amDescription: 'የቴክኖሎጂ መሠረተ ልማት፣ ኮምፒውተርና የኔትወርክ መፍትሔዎች።',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85',
    alt: 'Modern server racks in a data center',
  },
  {
    title: 'Ethiopian Products & Textiles',
    amTitle: 'የኢትዮጵያ ምርቶችና ጨርቃጨርቅ',
    description: 'Showcasing the potential of Ethiopian leather, footwear and textiles.',
    amDescription: 'የኢትዮጵያን የቆዳ ውጤቶች፣ ጫማዎችና ጨርቃጨርቅ ዕድሎች ማሳየት።',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=85',
    alt: 'Textile materials and fabric production',
  },
  {
    title: 'Real Estate & Development',
    amTitle: 'ሪል እስቴትና ልማት',
    description: 'Exploring opportunities in property and industrial development.',
    amDescription: 'በሪል እስቴትና በኢንዱስትሪ ልማት የሚገኙ ዕድሎችን መከታተል።',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    alt: 'Contemporary commercial architecture',
  },
  {
    title: 'Railway & Industrial Equipment',
    amTitle: 'ባቡርና የኢንዱስትሪ መሣሪያዎች',
    description: 'Discovering equipment and infrastructure-related trade opportunities.',
    amDescription: 'ከመሣሪያዎችና ከመሠረተ ልማት ጋር የተያያዙ የንግድ ዕድሎችን መፈለግ።',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=85',
    alt: 'Railway track and train infrastructure',
  },
]

const icons = ['↗', '⇧', '⌘', '⌂', '⇄', '◇']
const currentYear = new Date().getFullYear()
function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [activeSlide, setActiveSlide] = useState(0)
  const [showEthiopiaPage, setShowEthiopiaPage] = useState(
    typeof window !== 'undefined' && ['#ethiopia', '#heritage-stories'].includes(window.location.hash),
  )
  const t = content[language]

  useEffect(() => {
    const syncPage = () => setShowEthiopiaPage(['#ethiopia', '#heritage-stories'].includes(window.location.hash))
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % showcaseSlides.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  const currentSlide = showcaseSlides[activeSlide]

  if (showEthiopiaPage) {
    return <EthiopiaPage language={language} onLanguageChange={() => setLanguage(language === 'en' ? 'am' : 'en')} />
  }

  return (
    <main className={language === 'am' ? 'site amharic' : 'site'}>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Ozen Trading home">
          <span className="brand-mark">O</span>
          <span className={`brand-name ${language === 'am' ? 'amharic-brand' : ''}`}>
            {language === 'am' ? 'ኦዜን ትሬዲንግ' : 'OZEN TRADING'}
            <small>{language === 'am' ? 'ኋ/የተ/የግ/ማህበር' : 'PLC'}</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          {t.nav.map((item, index) => (
            <a key={item} href={['#home', '#about', '#business', '#ethiopia', '#locations', '#contact'][index]}>
              {item}
            </a>
          ))}
        </nav>

        <button
          className="language-button"
          type="button"
          onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
          aria-label="Change website language"
        >
          {language === 'en' ? 'አማ' : 'EN'}
        </button>
        <a className="app-link" href="#app">
          <span>OZEN App</span>
          <small>{t.appStatus}</small>
        </a>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow">
            <span className="ethiopian-stripe" />
            {t.heroTag}
          </span>
          <div className={`hero-company-name ${language === 'am' ? 'amharic-brand' : ''}`}>
            {language === 'am' ? 'ኦዜን ትሬዲንግ ኋ/የተ/የግ/ማህበር' : 'OZEN TRADING PLC'}
          </div>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#business">{t.explore} <span>↗</span></a>
            <a className="button button-outline" href="#contact">{t.contact}</a>
          </div>
        </div>
        <div className="hero-side-note">
          <span>ETHIOPIA</span>
          <span className="side-line" />
          <span>GLOBAL TRADE</span>
        </div>
        <div className="hero-bottom">
          <span>ADDIS ABABA · MEKELE</span>
          <span>EST. WITH AMBITION</span>
        </div>
      </section>

      <section className="showcase-section section-wrap" aria-label="Ozen business sectors">
        <div className="showcase-heading">
          <span className="section-label">{t.showcaseLabel}</span>
          <h2>{t.showcaseTitle}</h2>
          <p>{t.showcaseText}</p>
        </div>
        <div className="showcase-feature">
          <img src={currentSlide.image} alt={currentSlide.alt} />
          <div className="showcase-overlay">
            <span className="showcase-count">0{activeSlide + 1} / 0{showcaseSlides.length}</span>
            <h3>{language === 'am' ? currentSlide.amTitle : currentSlide.title}</h3>
            <p>{language === 'am' ? currentSlide.amDescription : currentSlide.description}</p>
          </div>
          <div className="showcase-controls">
            <button type="button" aria-label="Previous image" onClick={() => setActiveSlide((activeSlide - 1 + showcaseSlides.length) % showcaseSlides.length)}>‹</button>
            <button type="button" aria-label="Next image" onClick={() => setActiveSlide((activeSlide + 1) % showcaseSlides.length)}>›</button>
          </div>
        </div>
        <div className="showcase-dots" aria-label="Choose an image">
          {showcaseSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={index === activeSlide ? 'active' : ''}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeSlide}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="about-section section-wrap" id="about">
        <div className="section-heading">
          <span className="section-label">{t.aboutLabel}</span>
          <h2>{t.aboutTitle}</h2>
        </div>
        <div className="about-content">
          <p className="lead-text">{t.aboutText}</p>
          <div className="values-grid">
            <article className="value-card">
              <span className="value-symbol">◎</span>
              <h3>{t.visionTitle}</h3>
              <p>{t.visionText}</p>
            </article>
            <article className="value-card">
              <span className="value-symbol">✳</span>
              <h3>{t.missionTitle}</h3>
              <p>{t.missionText}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="business-section" id="business">
        <div className="section-wrap">
          <div className="section-heading business-heading">
            <span className="section-label">{t.businessLabel}</span>
            <h2>{t.businessTitle}</h2>
            <p>{t.businessText}</p>
          </div>
          <div className="business-grid">
            {t.businesses.map(([number, title, description], index) => (
              <article className="business-card" key={number}>
                <div className="business-card-top">
                  <span className="business-number">{number}</span>
                  <span className="business-icon">{icons[index]}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="card-rule" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ethiopia-section">
        <div className="ethiopia-decoration" aria-hidden="true">ኢትዮጵያ</div>
        <div className="section-wrap ethiopia-content">
          <span className="section-label">{t.ethiopiaLabel}</span>
          <h2>{t.ethiopiaTitle}</h2>
          <p>{t.ethiopiaText}</p>
          <div className="ethiopia-tags">
            <span>ADDIS ABABA</span>
            <span>MEKELE</span>
            <span>ETHIOPIA</span>
          </div>
          <a className="button button-gold ethiopia-explore" href="#ethiopia">
            {language === 'am' ? 'የኢትዮጵያን ታሪክና ባህል ያስሱ' : 'Explore Ethiopia’s Heritage'} <span>↗</span>
          </a>
        </div>
      </section>

      <section className="locations-section section-wrap" id="locations">
        <div className="section-heading">
          <span className="section-label">WHERE WE ARE</span>
          <h2>{t.locationsTitle}</h2>
        </div>
        <div className="locations-grid">
          <article className="location-card">
            <span className="location-index">01 / HEAD OFFICE</span>
            <h3>{t.addis}</h3>
            <p>{t.addisAddress}</p>
          </article>
          <article className="location-card">
            <span className="location-index">02 / REGIONAL BRANCH</span>
            <h3>{t.mekele}</h3>
            <p>{t.mekeleAddress}</p>
          </article>
        </div>
      </section>

      <section className="app-section" id="app">
        <div className="section-wrap app-layout">
          <div className="app-copy">
            <span className="section-label">{t.appLabel}</span>
            <h2>{t.appTitle}</h2>
            <p>{t.appText}</p>
            <span className="app-status">{t.appStatus}</span>
          </div>
          <div className="app-visual" aria-hidden="true">
            <div className="app-phone app-phone-back"><span className="app-phone-mark">O</span><span>OZEN</span><small>TRADING PLC</small></div>
            <div className="app-phone app-phone-front"><span className="app-phone-mark">O</span><span>OZEN</span><small>YOUR BUSINESS, CONNECTED</small><i /><i /><i /></div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-wrap contact-layout">
          <div className="contact-intro">
            <span className="section-label">{t.contactLabel}</span>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
          </div>
          <div className="contact-details">
            <div>
              <span>{t.email}</span>
              <a href="mailto:ozentradingplc.ethio@gmail.com">ozentradingplc.ethio@gmail.com</a>
            </div>
            <div>
              <span>{t.phone}</span>
              <a href="tel:+251910507112">+251 91 050 7112</a>
              <a href="tel:+251962627848">+251 96 262 7848</a>
            </div>
            <div>
              <span>{t.address}</span>
              <p>Bole Sub-City, Woreda 04, Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">O</span>
          <span className={`brand-name ${language === 'am' ? 'amharic-brand' : ''}`}>
            {language === 'am' ? 'ኦዜን ትሬዲንግ' : 'OZEN TRADING'}
            <small>{language === 'am' ? 'ኋ/የተ/የግ/ማህበር' : 'PLC'}</small>
          </span>
        </a>
        <p>{t.footer}</p>
        <span>© {currentYear} Ozen Trading PLC. {t.rights}</span>
      </footer>
    </main>
  )
}

export default App
