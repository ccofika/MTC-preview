import React, { useState } from 'react';
import './AboutPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLanguage from '../hooks/useLanguage';

const AboutPage = () => {
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
        title: 'O kompaniji Nissal',
        subtitle: 'Vaš pouzdan partner za aluminijumske sisteme'
      },
      timeline: {
        title: 'Naša istorija',
        events: [
          {
            year: '2008',
            title: 'Osnivanje kompanije',
            description: 'Osnovana je kompanija Nissal sa fokusом na aluminijumske profile.'
          },
          {
            year: '2012',
            title: 'Proširenje proizvodnje',
            description: 'Nabavka novih mašina i proširenje proizvodnih kapaciteta.'
          },
          {
            year: '2015',
            title: 'ISO sertifikacija',
            description: 'Dobijanje ISO 9001:2015 sertifikata za kvalitet.'
          },
          {
            year: '2018',
            title: 'Regionalno širenje',
            description: 'Otvaranje predstavništava u regionu i novi partneri.'
          },
          {
            year: '2020',
            title: 'Digitalna transformacija',
            description: 'Implementacija savremenih tehnologija i sistema.'
          },
          {
            year: '2024',
            title: 'Lider na tržištu',
            description: 'Postali smo jedan od vodećih proizvođača u regionu.'
          }
        ]
      },
      mission: {
        title: 'Misija, Vizija, Vrednosti',
        mission: {
          title: 'Misija',
          description: 'Proizvodimo visokokvalitetne aluminijumske sisteme koji zadovoljavaju potrebe modernog graditeljstva, pružajući inovativna rešenja i neprekidnu podršku našim klijentima.'
        },
        vision: {
          title: 'Vizija',
          description: 'Biti vodeći proizvođač aluminijumskih sistema u regionu, prepoznat po inovativnosti, kvalitetu i pouzdanosti, doprinoseći održivom razvoju gradnje.'
        },
        values: {
          title: 'Vrednosti',
          description: 'Kvalitet, inovacija, poštenje, odgovornost prema klijentima i životnoj sredini, timski rad i kontinuirano usavršavanje su osnove naše poslovne filosofije.'
        }
      },
      team: {
        title: 'Naš tim',
        subtitle: 'Stručni tim koji čini srce naše kompanije',
        members: [
          {
            name: 'Marko Petrović',
            position: 'Generalni direktor',
            department: 'Rukovodstvo',
            bio: 'Više od 20 godina iskustva u industriji aluminijuma. Vodi kompaniju ka novim visinama.',
            image: '/images/about/team2.jpg'
          },
          {
            name: 'Ana Jovanović',
            position: 'Tehnički direktor',
            department: 'Rukovodstvo', 
            bio: 'Ekspert za tehnička rešenja sa dugogodišnjim iskustvom u razvoju proizvoda.',
            image: '/images/about/team1.jpg'
          },
          {
            name: 'Stefan Nikolić',
            position: 'Šef proizvodnje',
            department: 'Proizvodnja',
            bio: 'Odgovoran za kvalitet proizvodnje i optimizaciju proizvodnih procesa.',
            image: '/images/about/team3.jpg'
          },
          {
            name: 'Milica Stojanović',
            position: 'Šef dizajna',
            department: 'Dizajn',
            bio: 'Kreativni um koji dizajnira inovativna i funkcionalna rešenja.',
            image: '/images/about/team5.jpg'
          },
          {
            name: 'Nikola Mitrović',
            position: 'Šef prodaje',
            department: 'Prodaja',
            bio: 'Gradi dugoročne partnerske odnose sa klijentima širom regiona.',
            image: '/images/about/team4.jpg'
          },
          {
            name: 'Jelena Radić',
            position: 'Šef servisa',
            department: 'Servis',
            bio: 'Osigurava vrhunsku podršku i servis za sve naše proizvode.',
            image: '/images/about/team6.jpg'
          }
        ]
      },
      facility: {
        title: 'Fabrika i kapaciteti',
        location: {
          title: 'Lokacija',
          address: 'Industrijska zona bb, 11000 Beograd, Srbija'
        },
        specs: [
          {
            title: 'Proizvodni prostor',
            value: '5,000 m²',
            icon: 'building'
          },
          {
            title: 'Skladišni prostor',
            value: '2,000 m²', 
            icon: 'warehouse'
          },
          {
            title: 'Dnevni kapacitet',
            value: '500 m profila',
            icon: 'production'
          },
          {
            title: 'Mesečna proizvodnja',
            value: '15,000 m',
            icon: 'calendar'
          }
        ],
        equipment: {
          title: 'Oprema i tehnologije',
          items: [
            'CNC mašine za preciznu obradu',
            'Automatske linije za eloksiranje',
            'Savremeni sistemi za lakiranje',
            'Kontrola kvaliteta u realnom vremenu'
          ]
        }
      },
      certificates: {
        title: 'Sertifikati i standardi',
        subtitle: 'Posvećeni smo najvišim standardima kvaliteta',
        items: [
          {
            name: 'ISO 9001:2015',
            description: 'Sistem managementa kvaliteta',
            image: '/images/sertifikat1.png'
          },
          {
            name: 'CE Marking',
            description: 'Usklađenost sa EU standardima',
            image: '/images/sertifikat2.png'
          },
          {
            name: 'SRPS ISO 14001',
            description: 'Sistem upravljanja životnom sredinom',
            image: '/images/sertifikat3.png'
          },
          {
            name: 'OHSAS 18001',
            description: 'Bezbednost i zdravlje na radu',
            image: '/images/sertifikat4.png'
          }
        ],
        qualityControl: {
          title: 'Kontrola kvaliteta',
          steps: [
            'Kontrola sirovine pri prijemu',
            'Monitoring proizvodnog procesa',
            'Finalna kontrola gotovih proizvoda',
            'Testiranje u akregistovanoj laboratoriji'
          ]
        }
      },
      partnerships: {
        title: 'Partnerstva',
        suppliers: {
          title: 'Ključni dobavljači',
          companies: [
            { name: 'Hydro Aluminium', logo: '/images/partner1.png' },
            { name: 'Schüco', logo: '/images/partner2.png' },
            { name: 'KÖMMERLING', logo: '/images/partner3.jpg' },
            { name: 'Technal', logo: '/images/partner4.png' }
          ]
        },
        institutions: {
          title: 'Članstvo u institucijama',
          organizations: [
            'Privredna komora Srbije',
            'Udruženje proizvođača aluminijuma',
            'Green Building Council Serbia',
            'Evropska asocijacija za aluminijum'
          ]
        }
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
        title: 'About Nissal Company',
        subtitle: 'Your reliable partner for aluminum systems'
      },
      timeline: {
        title: 'Our History',
        events: [
          {
            year: '2008',
            title: 'Company Foundation',
            description: 'Nissal company was founded with focus on aluminum profiles.'
          },
          {
            year: '2012',
            title: 'Production Expansion',
            description: 'Acquisition of new machinery and expansion of production capacity.'
          },
          {
            year: '2015',
            title: 'ISO Certification',
            description: 'Obtained ISO 9001:2015 quality certificate.'
          },
          {
            year: '2018',
            title: 'Regional Expansion',
            description: 'Opening regional offices and new partnerships.'
          },
          {
            year: '2020',
            title: 'Digital Transformation',
            description: 'Implementation of modern technologies and systems.'
          },
          {
            year: '2024',
            title: 'Market Leader',
            description: 'Became one of the leading manufacturers in the region.'
          }
        ]
      },
      mission: {
        title: 'Mission, Vision, Values',
        mission: {
          title: 'Mission',
          description: 'We manufacture high-quality aluminum systems that meet the needs of modern construction, providing innovative solutions and continuous support to our clients.'
        },
        vision: {
          title: 'Vision',
          description: 'To be the leading manufacturer of aluminum systems in the region, recognized for innovation, quality and reliability, contributing to sustainable construction development.'
        },
        values: {
          title: 'Values',
          description: 'Quality, innovation, honesty, responsibility towards clients and environment, teamwork and continuous improvement are the foundations of our business philosophy.'
        }
      },
      team: {
        title: 'Our Team',
        subtitle: 'Professional team that makes the heart of our company',
        members: [
          {
            name: 'Marko Petrović',
            position: 'CEO',
            department: 'Management',
            bio: 'Over 20 years of experience in aluminum industry. Leads the company to new heights.',
            image: '/images/team/ceo.jpg'
          },
          {
            name: 'Ana Jovanović',
            position: 'CTO',
            department: 'Management',
            bio: 'Technical solutions expert with extensive experience in product development.',
            image: '/images/team/cto.jpg'
          },
          {
            name: 'Stefan Nikolić',
            position: 'Production Manager',
            department: 'Production',
            bio: 'Responsible for production quality and optimization of production processes.',
            image: '/images/team/production.jpg'
          },
          {
            name: 'Milica Stojanović',
            position: 'Design Manager',
            department: 'Design',
            bio: 'Creative mind that designs innovative and functional solutions.',
            image: '/images/team/design.jpg'
          },
          {
            name: 'Nikola Mitrović',
            position: 'Sales Manager',
            department: 'Sales',
            bio: 'Builds long-term partnerships with clients across the region.',
            image: '/images/team/sales.jpg'
          },
          {
            name: 'Jelena Radić',
            position: 'Service Manager',
            department: 'Service',
            bio: 'Ensures excellent support and service for all our products.',
            image: '/images/team/service.jpg'
          }
        ]
      },
      facility: {
        title: 'Facility and Capacity',
        location: {
          title: 'Location',
          address: 'Industrial zone bb, 11000 Belgrade, Serbia'
        },
        specs: [
          {
            title: 'Production space',
            value: '5,000 m²',
            icon: 'building'
          },
          {
            title: 'Storage space',
            value: '2,000 m²',
            icon: 'warehouse'
          },
          {
            title: 'Daily capacity',
            value: '500 m profiles',
            icon: 'production'
          },
          {
            title: 'Monthly production',
            value: '15,000 m',
            icon: 'calendar'
          }
        ],
        equipment: {
          title: 'Equipment and Technologies',
          items: [
            'CNC machines for precision processing',
            'Automatic anodizing lines',
            'Modern painting systems',
            'Real-time quality control'
          ]
        }
      },
      certificates: {
        title: 'Certificates and Standards',
        subtitle: 'We are committed to the highest quality standards',
        items: [
          {
            name: 'ISO 9001:2015',
            description: 'Quality management system',
            image: '/images/certificates/iso-9001.png'
          },
          {
            name: 'CE Marking',
            description: 'Compliance with EU standards',
            image: '/images/certificates/ce-marking.png'
          },
          {
            name: 'SRPS ISO 14001',
            description: 'Environmental management system',
            image: '/images/certificates/iso-14001.png'
          },
          {
            name: 'OHSAS 18001',
            description: 'Occupational health and safety',
            image: '/images/certificates/ohsas.png'
          }
        ],
        qualityControl: {
          title: 'Quality Control',
          steps: [
            'Raw material control upon receipt',
            'Production process monitoring',
            'Final control of finished products',
            'Testing in accredited laboratory'
          ]
        }
      },
      partnerships: {
        title: 'Partnerships',
        suppliers: {
          title: 'Key Suppliers',
          companies: [
            { name: 'Hydro Aluminium', logo: '/images/partners/hydro.png' },
            { name: 'Schüco', logo: '/images/partners/schuco.png' },
            { name: 'KÖMMERLING', logo: '/images/partners/kommerling.png' },
            { name: 'Technal', logo: '/images/partners/technal.png' }
          ]
        },
        institutions: {
          title: 'Institutional Memberships',
          organizations: [
            'Chamber of Commerce of Serbia',
            'Aluminum Manufacturers Association',
            'Green Building Council Serbia',
            'European Aluminium Association'
          ]
        }
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
        title: 'Über die Firma Nissal',
        subtitle: 'Ihr zuverlässiger Partner für Aluminiumsysteme'
      },
      timeline: {
        title: 'Unsere Geschichte',
        events: [
          {
            year: '2008',
            title: 'Firmengründung',
            description: 'Die Firma Nissal wurde mit Fokus auf Aluminiumprofile gegründet.'
          },
          {
            year: '2012',
            title: 'Produktionserweiterung',
            description: 'Anschaffung neuer Maschinen und Erweiterung der Produktionskapazitäten.'
          },
          {
            year: '2015',
            title: 'ISO-Zertifizierung',
            description: 'Erhalt des ISO 9001:2015 Qualitätszertifikats.'
          },
          {
            year: '2018',
            title: 'Regionale Expansion',
            description: 'Eröffnung von Niederlassungen in der Region und neue Partner.'
          },
          {
            year: '2020',
            title: 'Digitale Transformation',
            description: 'Implementierung moderner Technologien und Systeme.'
          },
          {
            year: '2024',
            title: 'Marktführer',
            description: 'Wir sind einer der führenden Hersteller in der Region geworden.'
          }
        ]
      },
      mission: {
        title: 'Mission, Vision, Werte',
        mission: {
          title: 'Mission',
          description: 'Wir produzieren hochwertige Aluminiumsysteme, die den Anforderungen des modernen Bauwesens entsprechen und bieten innovative Lösungen und kontinuierliche Unterstützung für unsere Kunden.'
        },
        vision: {
          title: 'Vision',
          description: 'Der führende Hersteller von Aluminiumsystemen in der Region zu sein, anerkannt für Innovation, Qualität und Zuverlässigkeit, und zur nachhaltigen Entwicklung des Bauwesens beizutragen.'
        },
        values: {
          title: 'Werte',
          description: 'Qualität, Innovation, Ehrlichkeit, Verantwortung gegenüber Kunden und Umwelt, Teamarbeit und kontinuierliche Verbesserung sind die Grundlagen unserer Geschäftsphilosophie.'
        }
      },
      team: {
        title: 'Unser Team',
        subtitle: 'Professionelles Team, das das Herz unseres Unternehmens bildet',
        members: [
          {
            name: 'Marko Petrović',
            position: 'Geschäftsführer',
            department: 'Management',
            bio: 'Über 20 Jahre Erfahrung in der Aluminiumindustrie. Führt das Unternehmen zu neuen Höhen.',
            image: '/images/about/team2.jpg'
          },
          {
            name: 'Ana Jovanović',
            position: 'Technischer Direktor',
            department: 'Management',
            bio: 'Expertin für technische Lösungen mit langjähriger Erfahrung in der Produktentwicklung.',
            image: '/images/about/team1.jpg'
          },
          {
            name: 'Stefan Nikolić',
            position: 'Produktionsleiter',
            department: 'Produktion',
            bio: 'Verantwortlich für Produktionsqualität und Optimierung der Produktionsprozesse.',
            image: '/images/about/team3.jpg'
          },
          {
            name: 'Milica Stojanović',
            position: 'Designleiterin',
            department: 'Design',
            bio: 'Kreativer Kopf, der innovative und funktionale Lösungen entwirft.',
            image: '/images/about/team5.jpg'
          },
          {
            name: 'Nikola Mitrović',
            position: 'Vertriebsleiter',
            department: 'Vertrieb',
            bio: 'Baut langfristige Partnerschaften mit Kunden in der ganzen Region auf.',
            image: '/images/about/team4.jpg'
          },
          {
            name: 'Jelena Radić',
            position: 'Serviceleiterin',
            department: 'Service',
            bio: 'Sorgt für erstklassigen Support und Service für alle unsere Produkte.',
            image: '/images/about/team6.jpg'
          }
        ]
      },
      facility: {
        title: 'Fabrik und Kapazitäten',
        location: {
          title: 'Standort',
          address: 'Industriezone bb, 11000 Belgrad, Serbien'
        },
        specs: [
          {
            title: 'Produktionsfläche',
            value: '5.000 m²',
            icon: 'building'
          },
          {
            title: 'Lagerfläche',
            value: '2.000 m²',
            icon: 'warehouse'
          },
          {
            title: 'Tageskapazität',
            value: '500 m Profile',
            icon: 'production'
          },
          {
            title: 'Monatsproduktion',
            value: '15.000 m',
            icon: 'calendar'
          }
        ],
        equipment: {
          title: 'Ausrüstung und Technologien',
          items: [
            'CNC-Maschinen für Präzisionsbearbeitung',
            'Automatische Eloxierungslinien',
            'Moderne Lackieranlagen',
            'Qualitätskontrolle in Echtzeit'
          ]
        }
      },
      certificates: {
        title: 'Zertifikate und Standards',
        subtitle: 'Wir sind höchsten Qualitätsstandards verpflichtet',
        items: [
          {
            name: 'ISO 9001:2015',
            description: 'Qualitätsmanagementsystem',
            image: '/images/sertifikat1.png'
          },
          {
            name: 'CE Kennzeichnung',
            description: 'Europäische Konformität',
            image: '/images/sertifikat2.png'
          },
          {
            name: 'SRPS ISO 14001',
            description: 'Umweltmanagementsystem',
            image: '/images/sertifikat3.png'
          },
          {
            name: 'OHSAS 18001',
            description: 'Arbeitsschutz und Gesundheit',
            image: '/images/sertifikat4.png'
          }
        ],
        qualityControl: {
          title: 'Qualitätskontrolle',
          steps: [
            'Rohstoffkontrolle bei der Annahme',
            'Überwachung des Produktionsprozesses',
            'Endkontrolle der fertigen Produkte',
            'Prüfung in akkreditiertem Labor'
          ]
        }
      },
      partnerships: {
        title: 'Partnerschaften',
        suppliers: {
          title: 'Hauptlieferanten',
          companies: [
            { name: 'Hydro Aluminium', logo: '/images/partner1.png' },
            { name: 'Schüco', logo: '/images/partner2.png' },
            { name: 'KÖMMERLING', logo: '/images/partner3.jpg' },
            { name: 'Technal', logo: '/images/partner4.png' }
          ]
        },
        institutions: {
          title: 'Mitgliedschaft in Institutionen',
          organizations: [
            'Handelskammer Serbien',
            'Aluminiumhersteller-Verband',
            'Green Building Council Serbia',
            'Europäischer Aluminium-Verband'
          ]
        }
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
    <div className="about-page">
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageChange={changeLanguage} 
        content={currentContent} 
      />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{currentContent.hero.title}</h1>
              <p className="hero-subtitle">{currentContent.hero.subtitle}</p>
            </div>
            <div className="hero-image">
              <img src="/images/about/about-hero.jpg" alt="Nissal Company" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">{currentContent.timeline.title}</h2>
          <div className="timeline">
            {currentContent.timeline.events.map((event, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{event.year}</div>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
                <div className="timeline-marker"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="mission-section">
        <div className="container">
          <h2 className="section-title">{currentContent.mission.title}</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{currentContent.mission.mission.title}</h3>
              <p>{currentContent.mission.mission.description}</p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>{currentContent.mission.vision.title}</h3>
              <p>{currentContent.mission.vision.description}</p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.61A5.5 5.5 0 0 0 16.5 2.03A5.5 5.5 0 0 0 12 5.5A5.5 5.5 0 0 0 7.5 2.03A5.5 5.5 0 0 0 3.16 4.61A5.5 5.5 0 0 0 2 8.5A5.5 5.5 0 0 0 5.5 14H7V21H17V14H18.5A5.5 5.5 0 0 0 22 8.5A5.5 5.5 0 0 0 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{currentContent.mission.values.title}</h3>
              <p>{currentContent.mission.values.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.team.title}</h2>
            <p className="section-subtitle">{currentContent.team.subtitle}</p>
          </div>
          <div className="team-grid">
            {currentContent.team.members.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-overlay">
                    <div className="team-department">{member.department}</div>
                  </div>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-position">{member.position}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="facility-section">
        <div className="container">
          <h2 className="section-title">{currentContent.facility.title}</h2>
          
          <div className="facility-content">
            <div className="facility-location">
              <h3>{currentContent.facility.location.title}</h3>
              <p>{currentContent.facility.location.address}</p>
            </div>

            <div className="facility-specs">
              {currentContent.facility.specs.map((spec, index) => (
                <div key={index} className="spec-card">
                  <div className="spec-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="spec-content">
                    <h4>{spec.title}</h4>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="facility-equipment">
              <h3>{currentContent.facility.equipment.title}</h3>
              <ul className="equipment-list">
                {currentContent.facility.equipment.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="certificates-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.certificates.title}</h2>
            <p className="section-subtitle">{currentContent.certificates.subtitle}</p>
          </div>

          <div className="certificates-grid">
            {currentContent.certificates.items.map((cert, index) => (
              <div key={index} className="certificate-card">
                <div className="certificate-image">
                  <img src={cert.image} alt={cert.name} />
                </div>
                <div className="certificate-content">
                  <h3>{cert.name}</h3>
                  <p>{cert.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="quality-control">
            <h3>{currentContent.certificates.qualityControl.title}</h3>
            <div className="quality-steps">
              {currentContent.certificates.qualityControl.steps.map((step, index) => (
                <div key={index} className="quality-step">
                  <div className="step-number">{index + 1}</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="partnerships-section">
        <div className="container">
          <h2 className="section-title">{currentContent.partnerships.title}</h2>
          
          <div className="partnerships-content">
            <div className="suppliers-section">
              <h3>{currentContent.partnerships.suppliers.title}</h3>
              <div className="suppliers-grid">
                {currentContent.partnerships.suppliers.companies.map((company, index) => (
                  <div key={index} className="supplier-card">
                    <img src={company.logo} alt={company.name} />
                  </div>
                ))}
              </div>
            </div>

            <div className="institutions-section">
              <h3>{currentContent.partnerships.institutions.title}</h3>
              <ul className="institutions-list">
                {currentContent.partnerships.institutions.organizations.map((org, index) => (
                  <li key={index}>{org}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default AboutPage;