import React, { useEffect, useRef } from 'react';
import './EcologyPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLanguage from '../hooks/useLanguage';
import { Sun, RotateCcw, Trash2, Zap } from 'lucide-react';

const EcologyPage = () => {
  const { language, changeLanguage } = useLanguage();
  const heroIconRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroIconRef.current) {
        const rect = heroIconRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.01;
        const deltaY = (e.clientY - centerY) * 0.01;
        
        heroIconRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
            description: 'Koristimo obnovljive izvore energije',
            duration: '1-2 meseca',
            impact: 'Niska emisija CO2'
          },
          {
            title: 'Korišćenje',
            description: 'Dugotrajnost proizvoda od aluminijuma',
            duration: '50+ godina',
            impact: 'Energetska efikasnost'
          },
          {
            title: 'Reciklaža',
            description: 'Maksimalna reciklaža aluminijuma',
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
            value: '1250t',
            unit: 'CO2',
            description: 'Smanjili smo godišnju emisiju CO2'
          },
          {
            value: '1200',
            unit: 'KWp',
            description: 'Aktivnih solarnih panela'
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
            description: 'We use renewable energy sources',
            duration: '1-2 months',
            impact: 'Low CO2 emissions'
          },
          {
            title: 'Usage',
            description: 'Durability of aluminum products',
            duration: '50+ years',
            impact: 'Energy efficiency'
          },
          {
            title: 'Recycling',
            description: 'Maximum aluminum recycling',
            duration: 'Infinite',
            impact: '95% less energy'
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
            value: '1250t',
            unit: 'CO2',
            description: 'We reduced annual CO2 emissions'
          },
          {
            value: '1200',
            unit: 'KWp',
            description: 'Active solar panels'
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
            description: 'Wir nutzen erneuerbare Energiequellen',
            duration: '1-2 Monate',
            impact: 'Niedrige CO2-Emissionen'
          },
          {
            title: 'Nutzung',
            description: 'Langlebigkeit von Aluminiumprodukten',
            duration: '50+ Jahre',
            impact: 'Energieeffizienz'
          },
          {
            title: 'Recycling',
            description: 'Maximales Aluminiumrecycling',
            duration: 'Unendlich',
            impact: '95% weniger Energie'
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
            value: '1250t',
            unit: 'CO2',
            description: 'Wir haben die jährlichen CO2-Emissionen reduziert'
          },
          {
            value: '1200',
            unit: 'KWp',
            description: 'Aktive Solarpanels'
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
            <div className="hero-icon" ref={heroIconRef}>
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
                  {pillar.icon === 'solar' && <Sun size={32} />}
                  {pillar.icon === 'recycle' && <RotateCcw size={32} />}
                  {pillar.icon === 'waste' && <Trash2 size={32} />}
                  {pillar.icon === 'efficiency' && <Zap size={32} />}
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
                    <span className="phase-impact">{phase.impact}</span>
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


      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default EcologyPage;