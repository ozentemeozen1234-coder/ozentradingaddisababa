
import { useState } from 'react'
import './App.css'

type Language = 'en' | 'am'

const content = {
  en: {
    nav: ['Home', 'About Us', 'Our Businesses', 'Our Locations', 'Contact'],
    heroTag: 'ETHIOPIAN ROOTS. GLOBAL AMBITION.',
    heroTitle: 'Connecting Ethiopia to Global Opportunities.',
    heroText:
      'Ozen Trading PLC is an Ethiopian multi-sector trading company focused on international trade, technology, investment and business services.',
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
    nav: ['መነሻ', 'ስለ እኛ', 'የንግድ ዘርፎች', 'አድራሻዎቻችን', 'ያግኙን'],
    heroTag: 'ኢትዮጵያዊ መሠረት። ዓለም አቀፍ ራዕይ።',
    heroTitle: 'ኢትዮጵያን ከዓለም አቀፍ የንግድ ዕድሎች ጋር እናገናኛለን።',
    heroText:
      'ኦዘን ትሬዲንግ ኃ/የተ/የግ/ማ በዓለም አቀፍ ንግድ፣ ቴክኖሎጂ፣ ኢንቨስትመንት እና የንግድ አገልግሎቶች ላይ የሚያተኩር ኢትዮጵያዊ ድርጅት ነው።',
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

const icons = ['↗', '⇧', '⌘', '⌂', '⇄', '◇']
const currentYear = new Date().getFullYear()
function App() {
  const [language, setLanguage] = useState<Language>('en')
  const t = content[language]

  return (
    <main className={language === 'am' ? 'site amharic' : 'site'}>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Ozen Trading home">
          <span className="brand-mark">O</span>
          <span className="brand-name">
            OZEN <small>TRADING PLC</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          {t.nav.map((item, index) => (
            <a key={item} href={['#home', '#about', '#business', '#locations', '#contact'][index]}>
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
      </header>

      <section className="hero-section" id="home">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow">
            <span className="ethiopian-stripe" />
            {t.heroTag}
          </span>
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
          <span className="brand-name">OZEN <small>TRADING PLC</small></span>
        </a>
        <p>{t.footer}</p>
        <span>© {currentYear} Ozen Trading PLC. {t.rights}</span>
      </footer>
    </main>
  )
}

export default App
