import React from 'react';
import './EcologyPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLanguage from '../hooks/useLanguage';

const EcologyPage = () => {
  const { language, changeLanguage } = useLanguage();

  const content = {
    SR: {
      nav: {
        home: 'Početna',
        products: 'Proizvodi',
        services: 'Usluge',
        projects: 'Projekti',
        about: 'O nama',
        ecology: 'Ekologija',
        contact: 'Kontakt'
      },
      hero: {
        title: 'Održiva proizvodnja i ekologija',
        subtitle: 'Posvećeni smo zaštiti životne sredine kroz odgovoran pristup proizvodnji aluminijumskih sistema'
      },
      sustainability: {
        title: 'Naš pristup održivosti',
        subtitle: 'Kroz svaki korak naše proizvodnje, vodimo računa o uticaju na životnu sredinu',
        pillars: [
          {
            title: 'Zelena energija',
            description: 'Koristimo obnovljive izvore energije, smanjujući ugljenik otisak.',
            icon: 'solar',
            percentage: '85%',
            label: 'obnovljive energije'
          },
          {
            title: 'Reciklaža materijala',
            description: 'Aluminijum je 100% recikažabilan bez gubitka kvaliteta.',
            icon: 'recycle',
            percentage: '100%', 
            label: 'recikažabilnost'
          },
          {
            title: 'Smanjenje otpada',
            description: 'Optimizovali smo proces proizvodnje i smanjili otpad.',
            icon: 'waste',
            percentage: '45%',
            label: 'smanjenje otpada'
          },
          {
            title: 'Energetska efikasnost',
            description: 'Naši sistemi doprinose energetskoj efikasnosti zgrada.',
            icon: 'efficiency',
            percentage: '30%',
            label: 'ušteda energije'
          }
        ]
      },
      lifecycle: {
        title: 'Životni ciklus aluminijuma',
        subtitle: 'Aluminijum je jedan od najodržijih materijala u građevinarstvu',
        phases: [
          {
            title: 'Proizvodnja',
            description: 'Čista energija u proizvodnji',
            duration: '1-2 meseca',
            impact: 'Niska emisija CO₂'
          },
          {
            title: 'Korišćenje',
            description: 'Dugotrajnost 50+ godina',
            duration: '50+ godina',
            impact: 'Energetska efikasnost'
          },
          {
            title: 'Reciklaža',
            description: 'Potpuna reciklaža materijala',
            duration: 'Beskonačno',
            impact: '95% manje energije'
          }
        ]
      },
      certifications: {
        title: 'Ekološki sertifikati',
        subtitle: 'Ponosni smo na naše međunarodne standarde zaštite životne sredine',
        items: [
          {
            name: 'ISO 14001:2015',
            description: 'Sistem upravljanja životnom sredinom',
            year: '2018',
            image: '/images/certificates/iso-14001.png'
          },
          {
            name: 'LEED Certified',
            description: 'Zeleno građenje i energetska efikasnost',
            year: '2020',
            image: '/images/certificates/leed.png'
          },
          {
            name: 'BREEAM Excellent',
            description: 'Vrhunski ekološki standard za zgrade',
            year: '2021',
            image: '/images/certificates/breeam.png'
          },
          {
            name: 'Cradle to Cradle',
            description: 'Cirkulacija materijala i održiva dizajna',
            year: '2022',
            image: '/images/certificates/c2c.png'
          }
        ]
      },
      initiatives: {
        title: 'Naše zelene inicijative',
        subtitle: 'Aktivno učestvujemo u projektima zaštite životne sredine',
        projects: [
          {
            title: 'Solarna elektrana',
            description: 'Pokriva 70% naših energetskih potreba.',
            impact: '1.2 MW kapacitet',
            status: 'završeno',
            image: '/images/placeholder/solar-energy.png'
          },
          {
            title: 'Program za reciklažu',
            description: 'Besplatno preuzimamo stare konstrukcije.',
            impact: '150 tona recikliranog materijala',
            status: 'aktivno',
            image: '/images/placeholder/recycling.jpg'
          }
        ]
      },
      benefits: {
        title: 'Ekološke prednosti aluminijuma',
        subtitle: 'Zašto je aluminijum najbolji izbor za održivu gradnju',
        advantages: [
          {
            title: 'Dugovečnost',
            description: 'Aluminijumski profili traju preko 50 godina bez korozije ili degradacije.',
            benefit: '50+ godina'
          },
          {
            title: 'Recikažabilnost',
            description: 'Može se reciklirati beskonačno bez gubitka kvaliteta materijala.',
            benefit: '100% reciklaža'
          },
          {
            title: 'Energetska efikasnost',
            description: 'Odličnna termička izolacija smanjuje potrebu za grejanjem i hlađenjem.',
            benefit: '30% uštede'
          },
          {
            title: 'Niska emisija',
            description: 'Moderna proizvodnja koristi obnovljivu energiju i čiste tehnologije.',
            benefit: '60% manje CO₂'
          },
          {
            title: 'Bez održavanja',
            description: 'Ne zahteva farbanje, lakiranje ili druga hemijska tretirana.',
            benefit: 'Nula hemikalija'
          },
          {
            title: 'Lagačnost',
            description: 'Lagan materijal smanjuje opterećenje konstrukcije i transport.',
            benefit: '3x lakši od čelika'
          }
        ]
      },
      impact: {
        title: 'Naš ekološki uticaj',
        subtitle: 'Merljivi rezultati naše posvećenosti zaštiti prirode',
        metrics: [
          {
            value: '2,500',
            unit: 'tona CO₂',
            description: 'Smanjili smo emisiju ugljenika u 2023. godini'
          },
          {
            value: '850',
            unit: 'MWh',
            description: 'Proizvedeno iz solarnih panela na našoj fabrici'
          },
          {
            value: '15,000',
            unit: 'm³',
            description: 'Ušteda vode kroz reciklažu i čišćenje'
          },
          {
            value: '95%',
            unit: 'otpada',
            description: 'Uspešno recikliran ili ponovo iskorišćen'
          }
        ]
      },
      footer: {
        contact: {
          title: 'Kontakt informacije',
          address: 'Industrijska zona bb, 11000 Beograd',
          phone: '+381 11 123 4567',
          email: 'info@nissal.rs',
          workingHours: 'Pon-Pet: 08:00-16:00'
        },
        quickLinks: {
          title: 'Brzi linkovi',
          products: 'Proizvodi',
          services: 'Usluge',
          projects: 'Projekti',
          contact: 'Kontakt'
        },
        social: {
          title: 'Pratite nas',
          facebook: 'Facebook',
          instagram: 'Instagram',
          linkedin: 'LinkedIn'
        },
        certificates: {
          title: 'Sertifikati i partneri'
        }
      }
    },
    EN: {
      nav: {
        home: 'Home',
        products: 'Products',
        services: 'Services',
        projects: 'Projects',
        about: 'About',
        ecology: 'Ecology',
        contact: 'Contact'
      },
      hero: {
        title: 'Sustainable Production and Ecology',
        subtitle: 'We are committed to environmental protection through responsible approach to aluminum systems manufacturing'
      },
      sustainability: {
        title: 'Our Approach to Sustainability',
        subtitle: 'Through every step of our production, we consider the environmental impact',
        pillars: [
          {
            title: 'Green Energy',
            description: 'We use renewable energy sources in our production, reducing carbon footprint by 60%.',
            icon: 'solar',
            percentage: '85%',
            label: 'renewable energy'
          },
          {
            title: 'Material Recycling',
            description: 'Aluminum is 100% recyclable. Our products can be completely recycled without quality loss.',
            icon: 'recycle',
            percentage: '100%',
            label: 'recyclability'
          },
          {
            title: 'Waste Reduction',
            description: 'We optimized production process and reduced waste by 45% in the last three years.',
            icon: 'waste', 
            percentage: '45%',
            label: 'waste reduction'
          },
          {
            title: 'Energy Efficiency',
            description: 'Our aluminum systems contribute to building energy efficiency through better insulation.',
            icon: 'efficiency',
            percentage: '30%',
            label: 'energy savings'
          }
        ]
      },
      lifecycle: {
        title: 'Aluminum Lifecycle',
        subtitle: 'Aluminum is one of the most sustainable materials in construction',
        phases: [
          {
            title: 'Production',
            description: 'Using clean energy in the production process',
            duration: '1-2 months',
            impact: 'Low CO₂ emissions'
          },
          {
            title: 'Transport',
            description: 'Optimized logistics routes to reduce transportation',
            duration: '1-7 days',
            impact: 'Minimal fuel consumption'
          },
          {
            title: 'Installation',
            description: 'Fast and efficient installation without harmful materials',
            duration: '1-3 days',
            impact: 'No emissions during installation'
          },
          {
            title: 'Usage',
            description: 'Durability of 50+ years with minimal maintenance',
            duration: '50+ years',
            impact: 'Building energy efficiency'
          },
          {
            title: 'Recycling',
            description: 'Complete recycling without material property loss',
            duration: 'Infinite',
            impact: '95% less energy for recycling'
          }
        ]
      },
      certifications: {
        title: 'Environmental Certifications',
        subtitle: 'We are proud of our international environmental protection standards',
        items: [
          {
            name: 'ISO 14001:2015',
            description: 'Environmental management system',
            year: '2018',
            image: '/images/certificates/iso-14001.png'
          },
          {
            name: 'LEED Certified',
            description: 'Green building and energy efficiency',
            year: '2020',
            image: '/images/certificates/leed.png'
          },
          {
            name: 'BREEAM Excellent',
            description: 'Premium environmental standard for buildings',
            year: '2021',
            image: '/images/certificates/breeam.png'
          },
          {
            name: 'Cradle to Cradle',
            description: 'Material circulation and sustainable design',
            year: '2022',
            image: '/images/certificates/c2c.png'
          }
        ]
      },
      initiatives: {
        title: 'Our Green Initiatives',
        subtitle: 'We actively participate in environmental protection projects',
        projects: [
          {
            title: 'Tree Planting Program',
            description: 'For every completed project, we plant 10 trees in the local community.',
            impact: '2,500 trees planted',
            status: 'active',
            image: '/images/placeholder/tree-planting.jpg'
          },
          {
            title: 'Solar Power Plant',
            description: 'We built a solar power plant that covers 70% of our energy needs.',
            impact: '1.2 MW installed capacity',
            status: 'completed',
            image: '/images/placeholder/solar-energy.png'
          },
          {
            title: 'Recycling Program',
            description: 'We provide free pickup of old aluminum structures for recycling.',
            impact: '150 tons of recycled aluminum',
            status: 'active',
            image: '/images/placeholder/recycling.jpg'
          },
          {
            title: 'Employee Education',
            description: 'Regular training of employees on environmental standards and proper material handling.',
            impact: '100% employees trained',
            status: 'active',
            image: '/images/placeholder/worker-education.jpg'
          }
        ]
      },
      benefits: {
        title: 'Environmental Benefits of Aluminum',
        subtitle: 'Why aluminum is the best choice for sustainable construction',
        advantages: [
          {
            title: 'Durability',
            description: 'Aluminum profiles last over 50 years without corrosion or degradation.',
            benefit: '50+ years'
          },
          {
            title: 'Recyclability',
            description: 'Can be recycled infinitely without material quality loss.',
            benefit: '100% recycling'
          },
          {
            title: 'Energy Efficiency',
            description: 'Excellent thermal insulation reduces need for heating and cooling.',
            benefit: '30% savings'
          },
          {
            title: 'Low Emissions',
            description: 'Modern production uses renewable energy and clean technologies.',
            benefit: '60% less CO₂'
          },
          {
            title: 'No Maintenance',
            description: 'Does not require painting, varnishing or other chemical treatments.',
            benefit: 'Zero chemicals'
          },
          {
            title: 'Lightweight',
            description: 'Light material reduces structural load and transportation.',
            benefit: '3x lighter than steel'
          }
        ]
      },
      impact: {
        title: 'Our Environmental Impact',
        subtitle: 'Measurable results of our commitment to nature protection',
        metrics: [
          {
            value: '2,500',
            unit: 'tons CO₂',
            description: 'We reduced carbon emissions in 2023'
          },
          {
            value: '850',
            unit: 'MWh',
            description: 'Generated from solar panels at our factory'
          },
          {
            value: '15,000',
            unit: 'm³',
            description: 'Water savings through recycling and purification'
          },
          {
            value: '95%',
            unit: 'waste',
            description: 'Successfully recycled or reused'
          }
        ]
      },
      footer: {
        contact: {
          title: 'Contact Information',
          address: 'Industrial zone bb, 11000 Belgrade',
          phone: '+381 11 123 4567',
          email: 'info@nissal.rs',
          workingHours: 'Mon-Fri: 08:00-16:00'
        },
        quickLinks: {
          title: 'Quick Links',
          products: 'Products',
          services: 'Services',
          projects: 'Projects',
          contact: 'Contact'
        },
        social: {
          title: 'Follow Us',
          facebook: 'Facebook',
          instagram: 'Instagram',
          linkedin: 'LinkedIn'
        },
        certificates: {
          title: 'Certificates and Partners'
        }
      }
    },
    DE: {
      nav: {
        home: 'Startseite',
        products: 'Produkte',
        services: 'Dienstleistungen',
        projects: 'Projekte',
        about: 'Über uns',
        ecology: 'Ökologie',
        contact: 'Kontakt'
      },
      hero: {
        title: 'Nachhaltige Produktion und Ökologie',
        subtitle: 'Wir sind dem Umweltschutz durch verantwortungsvolle Herstellung von Aluminiumsystemen verpflichtet'
      },
      sustainability: {
        title: 'Unser Nachhaltigkeitsansatz',
        subtitle: 'Bei jedem Schritt unserer Produktion achten wir auf die Umweltauswirkungen',
        pillars: [
          {
            title: 'Grüne Energie',
            description: 'Wir nutzen erneuerbare Energiequellen in unserer Produktion und reduzieren den CO₂-Fußabdruck um 60%.',
            icon: 'solar',
            percentage: '85%',
            label: 'erneuerbare Energie'
          },
          {
            title: 'Materialrecycling',
            description: 'Aluminium ist zu 100% recycelbar. Unsere Produkte können vollständig ohne Qualitätsverlust recycelt werden.',
            icon: 'recycle',
            percentage: '100%',
            label: 'Recycelbarkeit'
          },
          {
            title: 'Abfallreduzierung',
            description: 'Wir haben den Produktionsprozess optimiert und den Abfall in den letzten drei Jahren um 45% reduziert.',
            icon: 'waste',
            percentage: '45%',
            label: 'Abfallreduzierung'
          },
          {
            title: 'Energieeffizienz',
            description: 'Unsere Aluminiumsysteme tragen durch bessere Isolierung zur Energieeffizienz von Gebäuden bei.',
            icon: 'efficiency',
            percentage: '30%',
            label: 'Energieeinsparung'
          }
        ]
      },
      lifecycle: {
        title: 'Lebenszyklus von Aluminium',
        subtitle: 'Aluminium ist eines der nachhaltigsten Materialien im Bauwesen',
        phases: [
          {
            title: 'Produktion',
            description: 'Verwendung sauberer Energie im Produktionsprozess',
            duration: '1-2 Monate',
            impact: 'Niedrige CO₂-Emissionen'
          },
          {
            title: 'Transport',
            description: 'Optimierte Logistikrouten zur Reduzierung des Transports',
            duration: '1-7 Tage',
            impact: 'Minimaler Kraftstoffverbrauch'
          },
          {
            title: 'Installation',
            description: 'Schnelle und effiziente Installation ohne schädliche Materialien',
            duration: '1-3 Tage',
            impact: 'Keine Emissionen während der Installation'
          },
          {
            title: 'Nutzung',
            description: 'Langlebigkeit von 50+ Jahren mit minimaler Wartung',
            duration: '50+ Jahre',
            impact: 'Energieeffizienz des Gebäudes'
          },
          {
            title: 'Recycling',
            description: 'Vollständiges Recycling ohne Verlust der Materialeigenschaften',
            duration: 'Unendlich',
            impact: '95% weniger Energie für Recycling'
          }
        ]
      },
      certifications: {
        title: 'Umweltzertifikate',
        subtitle: 'Wir sind stolz auf unsere internationalen Umweltschutzstandards',
        items: [
          {
            name: 'ISO 14001:2015',
            description: 'Umweltmanagementsystem',
            year: '2018',
            image: '/images/certificates/iso-14001.png'
          },
          {
            name: 'LEED Zertifiziert',
            description: 'Grünes Bauen und Energieeffizienz',
            year: '2020',
            image: '/images/certificates/leed.png'
          },
          {
            name: 'BREEAM Excellent',
            description: 'Premium-Umweltstandard für Gebäude',
            year: '2021',
            image: '/images/certificates/breeam.png'
          },
          {
            name: 'Cradle to Cradle',
            description: 'Materialkreislauf und nachhaltiges Design',
            year: '2022',
            image: '/images/certificates/c2c.png'
          }
        ]
      },
      initiatives: {
        title: 'Unsere grünen Initiativen',
        subtitle: 'Wir beteiligen uns aktiv an Umweltschutzprojekten',
        projects: [
          {
            title: 'Baumpflanzungsprogramm',
            description: 'Für jedes abgeschlossene Projekt pflanzen wir 10 Bäume in der lokalen Gemeinde.',
            impact: '2,500 gepflanzte Bäume',
            status: 'aktivno',
            image: '/images/placeholder/tree-planting.jpg'
          },
          {
            title: 'Solarkraftwerk',
            description: 'Wir haben ein Solarkraftwerk gebaut, das 70% unserer Energiebedürfnisse deckt.',
            impact: '1,2 MW installierte Kapazität',
            status: 'završeno',
            image: '/images/placeholder/solar-energy.png'
          },
          {
            title: 'Recyclingprogramm',
            description: 'Wir bieten kostenlosen Abtransport alter Aluminiumkonstruktionen zum Recycling.',
            impact: '150 Tonnen recyceltes Aluminium',
            status: 'aktivno',
            image: '/images/placeholder/recycling.jpg'
          },
          {
            title: 'Mitarbeiterbildung',
            description: 'Regelmäßige Schulung der Mitarbeiter zu Umweltstandards und ordnungsgemäßem Materialumgang.',
            impact: '100% der Mitarbeiter geschult',
            status: 'aktivno',
            image: '/images/placeholder/worker-education.jpg'
          }
        ]
      },
      benefits: {
        title: 'Ökologische Vorteile von Aluminium',
        subtitle: 'Warum Aluminium die beste Wahl für nachhaltiges Bauen ist',
        advantages: [
          {
            title: 'Langlebigkeit',
            description: 'Aluminiumprofile halten über 50 Jahre ohne Korrosion oder Verschlechterung.',
            benefit: '50+ Jahre'
          },
          {
            title: 'Recycelbarkeit',
            description: 'Kann unendlich oft ohne Qualitätsverlust recycelt werden.',
            benefit: '100% Recycling'
          },
          {
            title: 'Energieeffizienz',
            description: 'Ausgezeichnete Wärmedämmung reduziert den Bedarf an Heizung und Kühlung.',
            benefit: '30% Einsparungen'
          },
          {
            title: 'Niedrige Emissionen',
            description: 'Moderne Produktion nutzt erneuerbare Energien und saubere Technologien.',
            benefit: '60% weniger CO₂'
          },
          {
            title: 'Wartungsfrei',
            description: 'Erfordert kein Streichen, Lackieren oder andere chemische Behandlungen.',
            benefit: 'Null Chemikalien'
          },
          {
            title: 'Leichtgewicht',
            description: 'Leichtes Material reduziert strukturelle Belastung und Transport.',
            benefit: '3x leichter als Stahl'
          }
        ]
      },
      impact: {
        title: 'Unsere Umweltauswirkungen',
        subtitle: 'Messbare Ergebnisse unseres Engagements für den Naturschutz',
        metrics: [
          {
            value: '2,500',
            unit: 'Tonnen CO₂',
            description: 'Wir haben die Kohlenstoffemissionen im Jahr 2023 reduziert'
          },
          {
            value: '850',
            unit: 'MWh',
            description: 'Erzeugt durch Solarpanels in unserer Fabrik'
          },
          {
            value: '15,000',
            unit: 'm³',
            description: 'Wassereinsparungen durch Recycling und Reinigung'
          },
          {
            value: '95%',
            unit: 'Abfall',
            description: 'erfolgreich recycelt oder wiederverwendet'
          }
        ]
      },
      future: {
        title: 'Zukunftspläne',
        subtitle: 'Unsere Verpflichtung für eine grünere Zukunft',
        goals: [
          {
            title: 'Kohlenstoffneutralität bis 2030',
            description: 'Vollständige Umstellung auf erneuerbare Energien und Kompensation aller Emissionen',
            target: '2030'
          },
          {
            title: 'Null Abfall bis 2028',
            description: 'Implementierung einer Kreislaufwirtschaft ohne Abfall',
            target: '2028'
          },
          {
            title: 'Grüne Innovation',
            description: 'Entwicklung neuer umweltfreundlicher Aluminiumlegierungen und Produktionstechniken',
            target: '2026'  
          }
        ]
      },
      cta: {
        title: 'Gemeinsam für eine nachhaltige Zukunft',
        subtitle: 'Wählen Sie Nissal für umweltverantwortliche Aluminiumlösungen',
        primaryButton: 'Mehr über Nachhaltigkeit',
        secondaryButton: 'Kontakt aufnehmen'
      },
      footer: {
        contact: {
          title: 'Kontaktinformationen',
          address: 'Industriezone bb, 11000 Belgrad',
          phone: '+381 11 123 4567',
          email: 'info@nissal.rs',
          workingHours: 'Mo-Fr: 08:00-16:00'
        },
        quickLinks: {
          title: 'Schnelllinks',
          products: 'Produkte',
          services: 'Dienstleistungen',
          projects: 'Projekte',
          contact: 'Kontakt'
        },
        social: {
          title: 'Folgen Sie uns',
          facebook: 'Facebook',
          instagram: 'Instagram',
          linkedin: 'LinkedIn'
        },
        certificates: {
          title: 'Zertifikate und Partner'
        }
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="ecology-page">
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageChange={changeLanguage} 
        content={currentContent} 
      />

      {/* Hero Section */}
      <section className="ecology-hero">
        <div className="hero-background">
          <img src="/images/header/ecology-background.jpg" alt="" className="background-image" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{currentContent.hero.title}</h1>
              <p className="hero-subtitle">{currentContent.hero.subtitle}</p>
            </div>
            <div className="hero-icon">
              <img src="/images/header/ecology-icon.png" alt="Ecology Icon" className="icon-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Pillars Section */}
      <section className="sustainability-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.sustainability.title}</h2>
            <p className="section-subtitle">{currentContent.sustainability.subtitle}</p>
          </div>
          <div className="sustainability-grid">
            {currentContent.sustainability.pillars.map((pillar, index) => (
              <div key={index} className="sustainability-card">
                <div className="sustainability-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {pillar.icon === 'solar' && (
                      <path d="M12 2V4M12 20V22M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M2 12H4M20 12H22M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22M12 7C14.76 7 17 9.24 17 12S14.76 17 12 17S7 14.76 7 12S9.24 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                    {pillar.icon === 'recycle' && (
                      <path d="M7 19H17L19 21H5L7 19ZM12 2L14 4H10L12 2ZM14.5 16.5L16 15H8L9.5 16.5H14.5ZM19 9L17 7V11L19 9ZM5 9L7 11V7L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                    {pillar.icon === 'waste' && (
                      <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                    {pillar.icon === 'efficiency' && (
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                  </svg>
                </div>
                <div className="sustainability-stats">
                  <div className="stat-number">{pillar.percentage}</div>
                  <div className="stat-label">{pillar.label}</div>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle Section */}
      <section className="lifecycle-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.lifecycle.title}</h2>
            <p className="section-subtitle">{currentContent.lifecycle.subtitle}</p>
          </div>
          <div className="lifecycle-timeline">
            {currentContent.lifecycle.phases.map((phase, index) => (
              <div key={index} className="lifecycle-phase">
                <div className="phase-number">{index + 1}</div>
                <div className="phase-content">
                  <h3>{phase.title}</h3>
                  <p className="phase-description">{phase.description}</p>
                  <div className="phase-meta">
                    <span className="phase-duration">{phase.duration}</span>
                    <span className="phase-impact">{phase.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Benefits Section - HIDDEN as requested by user */}
      {/*
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.benefits.title}</h2>
            <p className="section-subtitle">{currentContent.benefits.subtitle}</p>
          </div>
          <div className="benefits-grid">
            {currentContent.benefits.advantages.map((advantage, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-header">
                  <h3>{advantage.title}</h3>
                  <div className="benefit-value">{advantage.benefit}</div>
                </div>
                <p>{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Green Initiatives Section - HIDDEN as requested by user */}
      {/*
      <section className="initiatives-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.initiatives.title}</h2>
            <p className="section-subtitle">{currentContent.initiatives.subtitle}</p>
          </div>
          <div className="initiatives-grid">
            {currentContent.initiatives.projects.map((project, index) => (
              <div key={index} className="initiative-card">
                <div className="initiative-image">
                  <img src={project.image} alt={project.title} />
                  <div className="initiative-status">
                    <span className={`status-badge ${project.status}`}>
                      {project.status === 'active' ? 'Aktivno' : 'Završeno'}
                    </span>
                  </div>
                </div>
                <div className="initiative-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="initiative-impact">{project.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Environmental Impact Metrics */}
      <section className="impact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.impact.title}</h2>
            <p className="section-subtitle">{currentContent.impact.subtitle}</p>
          </div>
          <div className="impact-metrics">
            {currentContent.impact.metrics.map((metric, index) => (
              <div key={index} className="impact-metric">
                <div className="metric-value">
                  <span className="metric-number">{metric.value}</span>
                  <span className="metric-unit">{metric.unit}</span>
                </div>
                <p className="metric-description">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Certifications */}
      <section className="certifications-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.certifications.title}</h2>
            <p className="section-subtitle">{currentContent.certifications.subtitle}</p>
          </div>
          <div className="certifications-grid">
            {currentContent.certifications.items.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="certification-image">
                  <img src={cert.image} alt={cert.name} />
                </div>
                <div className="certification-content">
                  <h3>{cert.name}</h3>
                  <p>{cert.description}</p>
                  <div className="certification-year">Od {cert.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default EcologyPage;