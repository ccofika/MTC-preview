import React, { useState, useEffect, useRef } from 'react';
import './AboutPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLanguage from '../hooks/useLanguage';

const AboutPage = () => {
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
        title: 'O kompaniji Nissal',
        subtitle: 'Vaš pouzdan partner za aluminijumske sisteme'
      },
      videoSection: {
        title: 'SAZNAJ VIŠE O NAMA'
      },
      companyStory: {
        title: 'Naša priča',
        description: 'Kao logičan sled poslovnog širenja, MTC je proširio delatnost kupovinom i pokretanjem proizvodnje aluminijumskih poluproizvoda u vidu aluminijumskih profila za Ritter Energie und Umwelttechnik GmbH & Co. KG, Elka-Tenturatibe GmbH, Geze D.O.O. i druge.',
        year2020: {
          label: 'godina',
          description: 'Preuzima se pogon presaonice – presa 1500t za ekstruziju aluminijumskih profila, POZ, pogon mašinske obrade gde se vrši prefabrikacija profila.'
        },
        year2022: {
          label: 'godina',
          description: 'Kompanija otkupljuje kompletne proizvodne kapacitete NISSAL-a. Time je kompanija svojoj proizvodnoj delatnosti dodala livnicu i izvlačionicu koja proizvodi šipke u raznim legurama po zahtevu.'
        },
        year2023: {
          label: 'godina',
          description: 'Imenо dodaje naziv NISSAL i nastavlja sa radom kao MTC NISSAL. Kompanija garantuje ispunjenje svih zahteva klijenata kroz isporuku proizvoda najvišeg kvaliteta.'
        },
        stats: {
          domestic: 'PRIHOD NA DOMAĆEM TRŽIŠTU',
          foreign: 'PRIHOD NA INO TRŽIŠTU',
          employees: 'BROJ ZAPOSLENIH'
        }
      },
      aluminumProduction: {
        description: 'Kompanija garantuje ispunjenje svih zahteva klijenata kroz isporuku proizvoda najvišeg kvaliteta.',
        details: 'U prilog ovome govore i sertifikati koje MTC|NISSAL poseduje – ISO 9001, ISO 14001, ISO 45001, Qulicoat i Qualanod.',
        capacity: 'Godišnji proizvodni kapacitet fabrike je do 3000t ekstrudiranih profila, 2400t eloksiranih profila i do 960t plastificiranih profila. Kompanija MTC NISSAL će nastojati da na što savremeniji i profesionalniji način proizvodi kvalitetne proizvode, pružajući podršku svojim klijentima, uz brigu o zaštiti životne sredine i visok stepen socijalne odgovornosti.'
      },
      timeline: {
        title: 'Naša istorija',
        events: [
          {
            year: '1955',
            title: 'Formiranje preduzeća',
            description: 'Formira se preduzeće u državnoj svojini pod imenom PREDUZEĆE ZA IZRADU I PRERADU OBOJENIH METALA "MORAVA".',
            image: '/images/timeline/1955.jpeg'
          },
          {
            year: '1958',
            title: 'Nova naziv kompanije',
            description: 'Preduzeće menja naziv u PREDUZEĆE ZA IZRADU I PRERADU OBOJENIH METALA "ĐURO SALAJ". Preduzeće ovim dobija zahtevnost premijalom revolucionarni borcu za prava radnika. 544 radnika',
            image: '/images/timeline/1958.jpeg'
          },
          {
            year: '1986',
            title: 'Novo brend ime',
            description: 'Kompanija dobija novo brend ime "NISSAL"',
            image: '/images/timeline/1986.jpg'
          },
          {
            year: '2003',
            title: 'Privatizacija',
            description: 'Kompanija "NISSAL" prelazi u privatno vlasništvo procesom privatizacije.',
            image: '/images/timeline/2003.jpg'
          },
          {
            year: '2008',
            title: 'Rekonstrukcija i proširenje',
            description: 'Kompanija "NISSAL" vrši rekonstrukciju svojih pogona i proširuje proizvodnju nabavkom nove prese 3000 MT',
            image: '/images/timeline/2008.png'
          },
          {
            year: '2013',
            title: 'Strategijsko partnerstvo',
            description: 'Kompanija "NISSAL" dobija poslovnog partnera Privredno društvo "Newmet International AG" iz Švajcarske',
            image: '/images/timeline/2013.png'
          },
          {
            year: '2017',
            title: 'Osnivanje MTC',
            description: 'Osnivanje kompanije MTC',
            image: '/images/timeline/2017.png'
          },
          {
            year: '2020',
            title: 'Preuzimanje proizvodnje',
            description: 'MTC preuzima od "NISSAL"-a proizvodnju profila, površinsku zaštitu i mašinsku obradu profila.',
            image: '/images/timeline/2020.jpg'
          },
          {
            year: '2022',
            title: 'Proširenje kapaciteta',
            description: 'Kompanija MTC je izvršila proširenje proizvodnje preuzimanjem od NISSAL-a proizvodnju šipke na presi 3000 MT i livnice. Kompanija zapošljava 293 radnika',
            image: '/images/timeline/2022.jpg'
          },
          {
            year: '2023',
            title: 'MTC NISSAL',
            description: 'Kompanija od 01. septembra 2023. godine posluje pod imenom MTC NISSAL. Kompanija zapošljava 269 radnika',
            image: '/images/timeline/2023.png'
          }
        ]
      },
      certificates: {
        title: 'Sertifikati i standardi',
        subtitle: 'Posvećeni smo najvišim standardima kvaliteta',
        items: [
          {
            name: 'ISO 9001:2015',
            description: 'Sistem managementa kvaliteta',
            image: '/images/sertifikat1.png',
            pdf: '/documents/qms-certificate.pdf'
          },
          {
            name: 'ISO 45001:2018',
            description: 'Sistem upravljanja bezbednošću i zdravljem na radu',
            image: '/images/sertifikat2.png',
            pdf: '/documents/ohs-certificate.pdf'
          },
          {
            name: 'ISO 14001:2015',
            description: 'Sistem upravljanja životnom sredinom',
            image: '/images/sertifikat3.png',
            pdf: '/documents/ems-certificate.pdf'
          },
          {
            name: 'EN 15088:2005',
            description: 'Aluminijum i aluminijumske legure',
            image: '/images/sertifikat4.png',
            pdf: '/documents/iso-15088-certificate.pdf'
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
      videoSection: {
        title: 'LEARN MORE ABOUT US'
      },
      companyStory: {
        title: 'Our Story',
        description: 'As a logical sequence of business expansion, MTC expanded its business by purchasing and starting the production of aluminum semi-finished products in the form of aluminum profiles for Ritter Energie und Umwelttechnik GmbH & Co. KG, Elka-Tenturatibe GmbH, Geze D.O.O. and others.',
        year2020: {
          label: 'year',
          description: 'Taking over the press plant – 1500t press for aluminum profile extrusion, surface treatment plant, machining plant where profile prefabrication is performed.'
        },
        year2022: {
          label: 'year',
          description: 'The company acquires complete production capacities of NISSAL. Thus, the company added to its production activity a foundry and drawing mill that produces rods in various alloys on demand.'
        },
        year2023: {
          label: 'year',
          description: 'Added the name NISSAL and continues to work as MTC NISSAL. The company guarantees fulfillment of all client requirements through delivery of highest quality products.'
        },
        stats: {
          domestic: 'DOMESTIC MARKET REVENUE',
          foreign: 'FOREIGN MARKET REVENUE',
          employees: 'NUMBER OF EMPLOYEES'
        }
      },
      aluminumProduction: {
        description: 'The company guarantees fulfillment of all client requirements through delivery of highest quality products.',
        details: 'In support of this are the certificates that MTC|NISSAL possesses – ISO 9001, ISO 14001, ISO 45001, Qulicoat and Qualanod.',
        capacity: 'The annual production capacity of the factory is up to 3000t extruded profiles, 2400t anodized profiles and up to 960t plasticized profiles. MTC NISSAL company will strive to produce quality products in the most modern and professional way, providing support to its clients, with care for environmental protection and a high level of social responsibility.'
      },
      timeline: {
        title: 'Our History',
        events: [
          {
            year: '1955',
            title: 'Company Formation',
            description: 'Formation of a state-owned enterprise under the name ENTERPRISE FOR PRODUCTION AND PROCESSING OF COLORED METALS "MORAVA".',
            image: '/images/timeline/1955.jpeg'
          },
          {
            year: '1958',
            title: 'Company Rename',
            description: 'The enterprise changes its name to ENTERPRISE FOR PRODUCTION AND PROCESSING OF COLORED METALS "ĐURO SALAJ". The enterprise receives a request for premium revolutionary fighter for workers rights. 544 workers',
            image: '/images/timeline/1958.jpeg'
          },
          {
            year: '1986',
            title: 'New Brand Name',
            description: 'The company gets a new brand name "NISSAL"',
            image: '/images/timeline/1986.jpg'
          },
          {
            year: '2003',
            title: 'Privatization',
            description: 'Company "NISSAL" transitions to private ownership through the privatization process.',
            image: '/images/timeline/2003.jpg'
          },
          {
            year: '2008',
            title: 'Reconstruction and Expansion',
            description: 'Company "NISSAL" reconstructs its facilities and expands production by purchasing a new 3000 MT press',
            image: '/images/timeline/2008.png'
          },
          {
            year: '2013',
            title: 'Strategic Partnership',
            description: 'Company "NISSAL" gets a business partner Private Company "Newmet International AG" from Switzerland',
            image: '/images/timeline/2013.png'
          },
          {
            year: '2017',
            title: 'MTC Foundation',
            description: 'Foundation of MTC company',
            image: '/images/timeline/2017.png'
          },
          {
            year: '2020',
            title: 'Production Takeover',
            description: 'MTC takes over from "NISSAL" the production of profiles, surface protection and machining of profiles.',
            image: '/images/timeline/2020.jpg'
          },
          {
            year: '2022',
            title: 'Capacity Expansion',
            description: 'MTC company expanded production by taking over from NISSAL the production of rods on a 3000 MT press and foundry. The company employs 293 workers',
            image: '/images/timeline/2022.jpg'
          },
          {
            year: '2023',
            title: 'MTC NISSAL',
            description: 'Since September 1, 2023, the company operates under the name MTC NISSAL. The company employs 269 workers',
            image: '/images/timeline/2023.png'
          }
        ]
      },
      certificates: {
        title: 'Certificates and Standards',
        subtitle: 'We are committed to the highest quality standards',
        items: [
          {
            name: 'ISO 9001:2015',
            description: 'Quality management system',
            image: '/images/sertifikat1.png',
            pdf: '/documents/qms-certificate.pdf'
          },
          {
            name: 'ISO 45001:2018',
            description: 'Occupational health and safety management system',
            image: '/images/sertifikat2.png',
            pdf: '/documents/ohs-certificate.pdf'
          },
          {
            name: 'ISO 14001:2015',
            description: 'Environmental management system',
            image: '/images/sertifikat3.png',
            pdf: '/documents/ems-certificate.pdf'
          },
          {
            name: 'EN 15088:2005',
            description: 'Aluminium and aluminium alloys',
            image: '/images/sertifikat4.png',
            pdf: '/documents/iso-15088-certificate.pdf'
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
      videoSection: {
        title: 'ERFAHREN SIE MEHR ÜBER UNS'
      },
      companyStory: {
        title: 'Unsere Geschichte',
        description: 'Als logische Folge der Geschäftserweiterung erweiterte MTC sein Geschäft durch den Kauf und die Aufnahme der Produktion von Halbfertigprodukten aus Aluminium in Form von Aluminiumprofilen für Ritter Energie und Umwelttechnik GmbH & Co. KG, Elka-Tenturatibe GmbH, Geze D.O.O. und andere.',
        year2020: {
          label: 'Jahr',
          description: 'Übernahme des Pressenwerks – 1500t Presse für Aluminiumprofilextrusion, Oberflächenbehandlungsanlage, Bearbeitungswerk, wo Profilvorfertigung durchgeführt wird.'
        },
        year2022: {
          label: 'Jahr',
          description: 'Das Unternehmen erwirbt komplette Produktionskapazitäten von NISSAL. Somit fügte das Unternehmen seiner Produktionstätigkeit eine Gießerei und ein Ziehwerk hinzu, das Stangen in verschiedenen Legierungen auf Anfrage produziert.'
        },
        year2023: {
          label: 'Jahr',
          description: 'Fügte den Namen NISSAL hinzu und arbeitet weiterhin als MTC NISSAL. Das Unternehmen garantiert die Erfüllung aller Kundenanforderungen durch die Lieferung von Produkten höchster Qualität.'
        },
        stats: {
          domestic: 'UMSATZ IM HEIMISCHEN MARKT',
          foreign: 'UMSATZ IM AUSLANDSMARKT',
          employees: 'ANZAHL DER MITARBEITER'
        }
      },
      aluminumProduction: {
        description: 'Das Unternehmen garantiert die Erfüllung aller Kundenanforderungen durch die Lieferung von Produkten höchster Qualität.',
        details: 'Unterstützt werden diese durch die Zertifikate, die MTC|NISSAL besitzt – ISO 9001, ISO 14001, ISO 45001, Qulicoat und Qualanod.',
        capacity: 'Die jährliche Produktionskapazität der Fabrik beträgt bis zu 3000t extrudierte Profile, 2400t eloxierte Profile und bis zu 960t plastifizierte Profile. Das Unternehmen MTC NISSAL wird bestrebt sein, Qualitätsprodukte auf modernste und professionellste Weise zu produzieren, seinen Kunden Unterstützung zu bieten, mit Sorge für den Umweltschutz und einem hohen Maß an sozialer Verantwortung.'
      },
      timeline: {
        title: 'Unsere Geschichte',
        events: [
          {
            year: '1955',
            title: 'Unternehmensgründung',
            description: 'Gründung eines staatlichen Unternehmens unter dem Namen UNTERNEHMEN FÜR PRODUKTION UND VERARBEITUNG VON FARBMETALLEN "MORAVA".',
            image: '/images/timeline/1955.jpeg'
          },
          {
            year: '1958',
            title: 'Umbenennung des Unternehmens',
            description: 'Das Unternehmen ändert seinen Namen in UNTERNEHMEN FÜR PRODUKTION UND VERARBEITUNG VON FARBMETALLEN "ĐURO SALAJ". Das Unternehmen erhält eine Anforderung für Premium-Revolutionskämpfer für Arbeiterrechte. 544 Arbeiter',
            image: '/images/timeline/1958.jpeg'
          },
          {
            year: '1986',
            title: 'Neuer Markenname',
            description: 'Das Unternehmen erhält einen neuen Markennamen "NISSAL"',
            image: '/images/timeline/1986.jpg'
          },
          {
            year: '2003',
            title: 'Privatisierung',
            description: 'Das Unternehmen "NISSAL" geht durch den Privatisierungsprozess in Privatbesitz über.',
            image: '/images/timeline/2003.jpg'
          },
          {
            year: '2008',
            title: 'Rekonstruktion und Erweiterung',
            description: 'Das Unternehmen "NISSAL" rekonstruiert seine Anlagen und erweitert die Produktion durch den Kauf einer neuen 3000 MT Presse',
            image: '/images/timeline/2008.png'
          },
          {
            year: '2013',
            title: 'Strategische Partnerschaft',
            description: 'Das Unternehmen "NISSAL" erhält einen Geschäftspartner Privatunternehmen "Newmet International AG" aus der Schweiz',
            image: '/images/timeline/2013.png'
          },
          {
            year: '2017',
            title: 'MTC Gründung',
            description: 'Gründung des Unternehmens MTC',
            image: '/images/timeline/2017.png'
          },
          {
            year: '2020',
            title: 'Produktionsübernahme',
            description: 'MTC übernimmt von "NISSAL" die Produktion von Profilen, Oberflächenschutz und Bearbeitung von Profilen.',
            image: '/images/timeline/2020.jpg'
          },
          {
            year: '2022',
            title: 'Kapazitätserweiterung',
            description: 'Das Unternehmen MTC erweiterte die Produktion durch Übernahme der Stangenproduktion auf einer 3000 MT Presse und Gießerei von NISSAL. Das Unternehmen beschäftigt 293 Arbeiter',
            image: '/images/timeline/2022.jpg'
          },
          {
            year: '2023',
            title: 'MTC NISSAL',
            description: 'Seit dem 1. September 2023 firmiert das Unternehmen unter dem Namen MTC NISSAL. Das Unternehmen beschäftigt 269 Arbeiter',
            image: '/images/timeline/2023.png'
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
      certificates: {
        title: 'Zertifikate und Standards',
        subtitle: 'Wir sind höchsten Qualitätsstandards verpflichtet',
        items: [
          {
            name: 'ISO 9001:2015',
            description: 'Qualitätsmanagementsystem',
            image: '/images/sertifikat1.png',
            pdf: '/documents/qms-certificate.pdf'
          },
          {
            name: 'ISO 45001:2018',
            description: 'Arbeitsschutz- und Gesundheitsmanagementsystem',
            image: '/images/sertifikat2.png',
            pdf: '/documents/ohs-certificate.pdf'
          },
          {
            name: 'ISO 14001:2015',
            description: 'Umweltmanagementsystem',
            image: '/images/sertifikat3.png',
            pdf: '/documents/ems-certificate.pdf'
          },
          {
            name: 'EN 15088:2005',
            description: 'Aluminium und Aluminiumlegierungen',
            image: '/images/sertifikat4.png',
            pdf: '/documents/iso-15088-certificate.pdf'
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
        <div className="hero-background">
          <img src="/images/header/onama-background.jpg" alt="" className="background-image" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{currentContent.hero.title}</h1>
              <p className="hero-subtitle">{currentContent.hero.subtitle}</p>
            </div>
            <div className="hero-icon" ref={heroIconRef}>
              <img src="/images/header/onama-icon.png" alt="About Us Icon" className="icon-image" />
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
                <div className={`timeline-hexagon-container ${index % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-hexagon">
                    <img src={event.image} alt={`${event.year} - ${event.title}`} className="timeline-image" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.videoSection.title}</h2>
          </div>
          <div className="video-content">
            <div className="video-wrapper">
              <iframe 
                width="100%" 
                height="400" 
                src="https://www.youtube.com/embed/pY_7ZOf6MbM" 
                title="MTC Metals Trading Company" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="company-story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>{currentContent.companyStory.title}</h2>
              <p className="story-description">{currentContent.companyStory.description}</p>
              
              <div className="story-timeline">
                <div className="story-item">
                  <div className="story-year">2020. {currentContent.companyStory.year2020.label}</div>
                  <p className="story-detail">{currentContent.companyStory.year2020.description}</p>
                </div>
                <div className="story-item">
                  <div className="story-year">2022. {currentContent.companyStory.year2022.label}</div>
                  <p className="story-detail">{currentContent.companyStory.year2022.description}</p>
                </div>
                <div className="story-item">
                  <div className="story-year">2023. {currentContent.companyStory.year2023.label}</div>
                  <p className="story-detail">{currentContent.companyStory.year2023.description}</p>
                </div>
              </div>
            </div>
            
            <div className="story-stats">
              <div className="stat-item">
                <div className="stat-number">31%</div>
                <div className="stat-label">{currentContent.companyStory.stats.domestic}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">69%</div>
                <div className="stat-label">{currentContent.companyStory.stats.foreign}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">204</div>
                <div className="stat-label">{currentContent.companyStory.stats.employees}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aluminum Production Section */}
      <section className="aluminum-production-section">
        <div className="container">
          <div className="production-content">
            <div className="production-image">
              <img src="/images/aluminum-profile.jpg" alt="Aluminum Profile Production" />
            </div>
            <div className="production-text">
              <p className="production-description">{currentContent.aluminumProduction.description}</p>
              <p className="production-details">{currentContent.aluminumProduction.details}</p>
              <p className="production-capacity">{currentContent.aluminumProduction.capacity}</p>
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
              <div 
                key={index} 
                className="certificate-card clickable-certificate"
                onClick={() => window.open(cert.pdf, '_blank')}
                style={{ cursor: 'pointer' }}
              >
                <div className="certificate-image">
                  <img src={cert.image} alt={cert.name} />
                </div>
                <div className="certificate-content">
                  <h3>{cert.name}</h3>
                  <p>{cert.description}</p>
                  <div className="certificate-action">
                    <span className="view-certificate">📄 {
                      language === 'SR' ? 'Pregled sertifikata' :
                      language === 'EN' ? 'View Certificate' :
                      'Zertifikat anzeigen'
                    }</span>
                  </div>
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


      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default AboutPage;