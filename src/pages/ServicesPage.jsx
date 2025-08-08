import React, { useState, useEffect, useRef } from 'react';
import './ServicesPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLanguage from '../hooks/useLanguage';

const ServicesPage = () => {
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
        title: 'Kompletan servis od ideje do realizacije',
        subtitle: 'Pružamo sveobuhvatnu podršku kroz sve faze vašeg projekta'
      },
      services: {
        title: 'Naše usluge',
        items: [
          {
            id: 1,
            title: 'Konsultacije i projektovanje',
            description: 'Stručne konsultacije i tehnička analiza',
            process: ['Analiza', 'Predlog', 'Projekat'],
            buttonText: 'Zakaži konsultacije',
            icon: 'design'
          },
          {
            id: 2,
            title: 'Proizvodnja na meru',
            description: 'Prilagođena rešenja za vaše potrebe',
            process: ['Specifikacija', 'Proizvodnja', 'Kontrola'],
            buttonText: 'Zatraži ponudu',
            icon: 'production'
          },
          {
            id: 3,
            title: 'Ugradnja i montaža',
            description: 'Profesionalna montaža sertifikovanih tehničara',
            process: ['Priprema', 'Montaža', 'Testiranje'],
            buttonText: 'Saznaj više',
            icon: 'installation'
          }
        ]
      },
      workflow: {
        title: 'Proces rada',
        subtitle: 'Kako funkcioniše naša saradnja',
        steps: [
          { number: 1, title: 'Konsultacije', description: 'Razgovor o potrebama i zahtevima' },
          { number: 2, title: 'Merenje', description: 'Precizno merenje objekta' },
          { number: 3, title: 'Ponuda', description: 'Detaljna ponuda sa specifikacijama' },
          { number: 4, title: 'Proizvodnja', description: 'Izrada proizvoda prema projektu' },
          { number: 5, title: 'Ugradnja', description: 'Profesionalna montaža' },
          { number: 6, title: 'Servis', description: 'Kontinuirana podrška' }
        ]
      },
      guarantees: {
        title: 'Naše garantije',
        subtitle: 'Pouzdanost koju možete očekivati',
        items: [
          {
            title: 'Garantija na proizvod',
            value: '5-10 godina',
            description: 'Zavisno od tipa sistema i uslova korišćenja'
          },
          {
            title: 'Garantija na rad',
            value: '2 godine',
            description: 'Na sve izvršene radove montaže i instalacije'
          },
          {
            title: 'Servis delova',  
            value: '15+ godina',
            description: 'Dugoročna dostupnost rezervnih delova'
          },
          {
            title: 'Tehnička podrška',
            value: '24/7',
            description: 'Uvek dostupna tehnička podrška'
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
        title: 'Complete service from idea to realization',
        subtitle: 'We provide comprehensive support through all phases of your project'
      },
      services: {
        title: 'Our Services',
        items: [
          {
            id: 1,
            title: 'Consulting and Design',
            description: 'Expert consultations, technical analysis and project development tailored to your needs',
            process: ['Analysis', 'Proposal', 'Project'],
            buttonText: 'Schedule Consultation',
            icon: 'design'
          },
          {
            id: 2,
            title: 'Custom Manufacturing',
            description: 'Custom solutions adapted to specific needs and project requirements',
            process: ['Specification', 'Production', 'Control'],
            buttonText: 'Request Quote',
            icon: 'production'
          },
          {
            id: 3,
            title: 'Installation and Assembly',
            description: 'Professional installation by certified technicians with years of experience',
            process: ['Preparation', 'Assembly', 'Testing'],
            buttonText: 'Learn More',
            icon: 'installation'
          },
          {
            id: 4,
            title: 'Service and Maintenance',
            description: 'Regular maintenance, repairs and parts replacement for long-lasting system operation',
            process: ['Inspection', 'Diagnosis', 'Resolution'],
            buttonText: 'Call Service',
            icon: 'service'
          },
          {
            id: 5,
            title: 'Training and Support',
            description: 'Training for proper handling and maintenance of aluminum systems',
            process: ['Analysis', 'Training', 'Certificate'],
            buttonText: 'Book Training',
            icon: 'education'
          },
          {
            id: 6,
            title: 'Technical Support',
            description: '24/7 technical support for all our products and problem solving',
            process: ['Contact', 'Diagnosis', 'Resolution'],
            buttonText: 'Contact Us',
            icon: 'support'
          }
        ]
      },
      workflow: {
        title: 'Work Process',
        subtitle: 'How our collaboration works',
        steps: [
          { number: 1, title: 'Consultation', description: 'Discussion about needs and requirements' },
          { number: 2, title: 'Measurement', description: 'Precise object measurement' },
          { number: 3, title: 'Quote', description: 'Detailed quote with specifications' },
          { number: 4, title: 'Production', description: 'Product manufacturing according to project' },
          { number: 5, title: 'Installation', description: 'Professional assembly' },
          { number: 6, title: 'Service', description: 'Continuous support' }
        ]
      },
      guarantees: {
        title: 'Our Guarantees',
        subtitle: 'Reliability you can expect',
        items: [
          {
            title: 'Product Warranty',
            value: '5-10 years',
            description: 'Depending on system type and usage conditions'
          },
          {
            title: 'Installation Warranty',
            value: '2 years',
            description: 'Complete warranty on work quality'
          },
          {
            title: 'Parts Service',  
            value: '15+ years',
            description: 'Long-term availability of spare parts'
          },
          {
            title: 'Technical Support',
            value: '24/7',
            description: 'Always available technical support'
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
        title: 'Kompletter Service von der Idee bis zur Realisierung',
        subtitle: 'Wir bieten umfassende Unterstützung in allen Phasen Ihres Projekts'
      },
      services: {
        title: 'Unsere Dienstleistungen',
        items: [
          {
            id: 1,
            title: 'Beratung und Projektierung',
            description: 'Fachberatung, technische Analyse und Projekterstellung nach Ihren Bedürfnissen',
            process: ['Analyse', 'Vorschlag', 'Projekt'],
            buttonText: 'Beratung vereinbaren',
            icon: 'design'
          },
          {
            id: 2,
            title: 'Maßanfertigung',
            description: 'Individuelle Lösungen angepasst an spezifische Projektanforderungen',
            process: ['Spezifikation', 'Fertigung', 'Kontrolle'],
            buttonText: 'Angebot anfordern',
            icon: 'production'
          },
          {
            id: 3,
            title: 'Einbau und Montage',
            description: 'Professionelle Montage durch zertifizierte Techniker mit langjähriger Erfahrung',
            process: ['Vorbereitung', 'Montage', 'Prüfung'],
            buttonText: 'Mehr erfahren',
            icon: 'installation'
          },
          {
            id: 4,
            title: 'Service und Wartung',
            description: 'Regelmäßige Wartung, Reparaturen und Ersatzteilservice für langlebige Systeme',
            process: ['Überprüfung', 'Diagnose', 'Lösung'],
            buttonText: 'Service anrufen',
            icon: 'service'
          },
          {
            id: 5,
            title: 'Schulung und Support',
            description: 'Schulungen für ordnungsgemäße Bedienung und Wartung von Aluminiumsystemen',
            process: ['Analyse', 'Schulung', 'Zertifikat'],
            buttonText: 'Schulung buchen',
            icon: 'education'
          },
          {
            id: 6,
            title: 'Technischer Support',
            description: '24/7 technischer Support für alle unsere Produkte und Problemlösungen',
            process: ['Kontakt', 'Diagnose', 'Lösung'],
            buttonText: 'Kontaktieren',
            icon: 'support'
          }
        ]
      },
      workflow: {
        title: 'Arbeitsprozess',
        subtitle: 'Wie unsere Zusammenarbeit funktioniert',
        steps: [
          { number: 1, title: 'Beratung', description: 'Gespräch über Bedürfnisse und Anforderungen' },
          { number: 2, title: 'Vermessung', description: 'Präzise Vermessung des Objekts' },
          { number: 3, title: 'Angebot', description: 'Detailliertes Angebot mit Spezifikationen' },
          { number: 4, title: 'Fertigung', description: 'Herstellung der Produkte nach Projektvorgaben' },
          { number: 5, title: 'Einbau', description: 'Professionelle Montage' },
          { number: 6, title: 'Service', description: 'Kontinuierliche Unterstützung' }
        ]
      },
      guarantees: {
        title: 'Unsere Garantien',
        subtitle: 'Zuverlässigkeit, die Sie erwarten können',
        items: [
          {
            title: 'Produktgarantie',
            value: '5-10 Jahre',
            description: 'Je nach Systemtyp und Nutzungsbedingungen'
          },
          {
            title: 'Montagegarantie',
            value: '2 Jahre',
            description: 'Vollständige Garantie auf Arbeitsqualität'
          },
          {
            title: 'Ersatzteilservice',  
            value: '15+ Jahre',
            description: 'Langfristige Verfügbarkeit von Ersatzteilen'
          },
          {
            title: 'Technischer Support',
            value: '24/7',
            description: 'Jederzeit verfügbare technische Unterstützung'
          }
        ]
      },
      cta: {
        title: 'Bereit für Ihr nächstes Projekt?',
        subtitle: 'Kontaktieren Sie uns für ein kostenloses Beratungsgespräch',
        primaryButton: 'Beratung vereinbaren',
        secondaryButton: 'Angebot anfordern'
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
    <div className="services-page">
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageChange={changeLanguage} 
        content={currentContent} 
      />

      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-background">
          <img src="/images/header/usluge-background.jpg" alt="" className="background-image" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{currentContent.hero.title}</h1>
              <p className="hero-subtitle">{currentContent.hero.subtitle}</p>
            </div>
            <div className="hero-icon" ref={heroIconRef}>
              <img src="/images/header/usluge-icon.png" alt="Services Icon" className="icon-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-grid-section">
        <div className="container">
          <h2 className="section-title">{currentContent.services.title}</h2>
          <div className="services-grid">
            {currentContent.services.items.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {service.icon === 'design' && (
                      <g>
                        {/* Sophisticated architectural design icon with layered elements */}
                        <defs>
                          <linearGradient id="designGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.6)"/>
                          </linearGradient>
                        </defs>
                        {/* Blueprint base */}
                        <rect x="8" y="12" width="48" height="36" rx="4" fill="rgba(255,255,255,0.1)" stroke="currentColor" strokeWidth="1.5"/>
                        {/* Design layers */}
                        <path d="M32 8L48 16L32 24L16 16L32 8Z" fill="url(#designGrad)" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16 20L32 28L48 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M16 26L32 34L48 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        {/* Ruler/measurement tools */}
                        <rect x="12" y="52" width="40" height="4" rx="2" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="16" cy="54" r="1.5" fill="currentColor"/>
                        <circle cx="32" cy="54" r="1.5" fill="currentColor"/>
                        <circle cx="48" cy="54" r="1.5" fill="currentColor"/>
                        {/* Compass accent */}
                        <circle cx="48" cy="16" r="6" fill="rgba(255,255,255,0.1)" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M46 14L50 18L48 20L44 16L46 14Z" fill="currentColor"/>
                      </g>
                    )}
                    {service.icon === 'production' && (
                      <g>
                        {/* Advanced manufacturing/gear system */}
                        <defs>
                          <radialGradient id="prodGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.8)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.3)"/>
                          </radialGradient>
                        </defs>
                        {/* Main gear */}
                        <circle cx="32" cy="32" r="18" fill="url(#prodGrad)" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="32" cy="32" r="8" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1.5"/>
                        {/* Gear teeth */}
                        <g>
                          {Array.from({length: 8}).map((_, i) => (
                            <rect 
                              key={i}
                              x="30" 
                              y="10" 
                              width="4" 
                              height="8" 
                              rx="2"
                              fill="currentColor"
                              transform={`rotate(${i * 45} 32 32)`}
                            />
                          ))}
                        </g>
                        {/* Secondary gears */}
                        <circle cx="18" cy="18" r="8" fill="rgba(255,255,255,0.15)" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="46" cy="46" r="8" fill="rgba(255,255,255,0.15)" stroke="currentColor" strokeWidth="1.5"/>
                        {/* Quality control checkmark */}
                        <path d="M28 30L31 33L38 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        {/* Precision elements */}
                        <rect x="4" y="30" width="12" height="4" rx="2" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                        <rect x="48" y="30" width="12" height="4" rx="2" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                      </g>
                    )}
                    {service.icon === 'installation' && (
                      <g>
                        {/* Professional installation with tools */}
                        <defs>
                          <linearGradient id="installGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.8)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.4)"/>
                          </linearGradient>
                        </defs>
                        {/* Building/frame structure */}
                        <rect x="16" y="12" width="32" height="40" rx="2" fill="rgba(255,255,255,0.1)" stroke="currentColor" strokeWidth="2"/>
                        <rect x="20" y="16" width="24" height="32" rx="1" fill="url(#installGrad)" stroke="currentColor" strokeWidth="1"/>
                        {/* Window frames */}
                        <rect x="22" y="18" width="8" height="12" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                        <rect x="34" y="18" width="8" height="12" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                        <rect x="22" y="34" width="8" height="12" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                        <rect x="34" y="34" width="8" height="12" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                        {/* Professional tools */}
                        <g transform="rotate(-30 12 20)">
                          <rect x="8" y="18" width="8" height="4" rx="2" fill="currentColor"/>
                          <circle cx="12" cy="20" r="3" fill="rgba(255,255,255,0.3)" stroke="currentColor" strokeWidth="1"/>
                        </g>
                        {/* Level tool */}
                        <rect x="6" y="44" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="14" cy="45.5" r="1" fill="currentColor"/>
                        {/* Installation progress indicator */}
                        <path d="M52 16L56 20L54 22L48 16L52 16Z" fill="currentColor"/>
                        <circle cx="52" cy="19" r="6" fill="rgba(255,255,255,0.1)" stroke="currentColor" strokeWidth="1.5"/>
                      </g>
                    )}
                    {service.icon === 'service' && (
                      <g>
                        {/* Premium service and maintenance */}
                        <defs>
                          <radialGradient id="serviceGrad" cx="50%" cy="50%" r="60%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.2)"/>
                          </radialGradient>
                        </defs>
                        {/* Service badge/shield */}
                        <path d="M32 8L44 12L44 28C44 36 38 44 32 48C26 44 20 36 20 28L20 12L32 8Z" fill="url(#serviceGrad)" stroke="currentColor" strokeWidth="2"/>
                        {/* Premium service elements */}
                        <circle cx="32" cy="24" r="8" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M28 24L31 27L36 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        {/* Technical tools */}
                        <g transform="translate(48, 16)">
                          <rect x="0" y="0" width="12" height="20" rx="6" fill="rgba(255,255,255,0.15)" stroke="currentColor" strokeWidth="1.5"/>
                          <circle cx="6" cy="6" r="2" fill="currentColor"/>
                          <rect x="2" y="12" width="8" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
                          <rect x="3" y="16" width="6" height="1" rx="0.5" fill="rgba(255,255,255,0.3)"/>
                        </g>
                        {/* Service wrench */}
                        <g transform="rotate(45 12 48)">
                          <rect x="8" y="44" width="8" height="20" rx="4" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                          <circle cx="12" cy="48" r="3" fill="rgba(255,255,255,0.3)" stroke="currentColor" strokeWidth="1"/>
                        </g>
                        {/* 24/7 indicator */}
                        <text x="32" y="38" textAnchor="middle" fontSize="6" fill="currentColor" fontWeight="bold">24/7</text>
                      </g>
                    )}
                    {service.icon === 'education' && (
                      <g>
                        {/* Advanced training and education */}
                        <defs>
                          <linearGradient id="eduGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.8)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.3)"/>
                          </linearGradient>
                        </defs>
                        {/* Graduation cap */}
                        <path d="M32 12L52 20L32 28L12 20L32 12Z" fill="url(#eduGrad)" stroke="currentColor" strokeWidth="2"/>
                        <path d="M48 22L48 32C48 34 42 38 32 38C22 38 16 34 16 32L16 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        {/* Tassel */}
                        <circle cx="48" cy="24" r="2" fill="currentColor"/>
                        <path d="M48 26L50 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="50" cy="32" r="1.5" fill="currentColor"/>
                        {/* Certificate/diploma */}
                        <rect x="8" y="44" width="20" height="14" rx="2" fill="rgba(255,255,255,0.15)" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="10" y="46" width="16" height="2" rx="1" fill="rgba(255,255,255,0.3)"/>
                        <rect x="10" y="50" width="12" height="1" rx="0.5" fill="rgba(255,255,255,0.2)"/>
                        <rect x="10" y="52" width="14" height="1" rx="0.5" fill="rgba(255,255,255,0.2)"/>
                        <rect x="10" y="54" width="10" height="1" rx="0.5" fill="rgba(255,255,255,0.2)"/>
                        {/* Award seal */}
                        <circle cx="46" cy="48" r="8" fill="rgba(255,255,255,0.1)" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M42 48L45 51L50 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        {/* Knowledge transfer arrows */}
                        <path d="M34 20L38 24L34 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M30 20L26 24L30 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                    )}
                    {service.icon === 'support' && (
                      <g>
                        {/* Premium technical support system */}
                        <defs>
                          <radialGradient id="supportGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.2)"/>
                          </radialGradient>
                        </defs>
                        {/* Support headset */}
                        <path d="M32 16C38 16 44 22 44 28L44 36C44 38 42 40 40 40L36 40C34 40 32 38 32 36L32 32L32 32C32 32 30 32 28 32L28 36C28 38 26 40 24 40L20 40C18 40 16 38 16 36L16 28C16 22 22 16 28 16" fill="url(#supportGrad)" stroke="currentColor" strokeWidth="2"/>
                        {/* Microphone */}
                        <rect x="28" y="34" width="8" height="12" rx="4" fill="rgba(255,255,255,0.3)" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="30" y="46" width="4" height="6" fill="currentColor"/>
                        <rect x="26" y="50" width="12" height="2" rx="1" fill="currentColor"/>
                        {/* Support signals/waves */}
                        <g opacity="0.6">
                          <path d="M8 28C8 20 14 14 22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                          <path d="M56 28C56 20 50 14 42 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                          <path d="M12 28C12 24 16 20 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                          <path d="M52 28C52 24 48 20 44 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        </g>
                        {/* Connection indicators */}
                        <circle cx="10" cy="12" r="2" fill="currentColor"/>
                        <circle cx="54" cy="12" r="2" fill="currentColor"/>
                        <circle cx="10" cy="44" r="2" fill="currentColor"/>
                        <circle cx="54" cy="44" r="2" fill="currentColor"/>
                        {/* Status indicator */}
                        <circle cx="48" cy="24" r="3" fill="rgba(0,255,100,0.8)" stroke="currentColor" strokeWidth="1"/>
                        <text x="48" y="26" textAnchor="middle" fontSize="4" fill="currentColor" fontWeight="bold">●</text>
                      </g>
                    )}
                  </svg>
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-process">
                    {service.process.map((step, index) => (
                      <span key={index} className="process-step">
                        {step}
                        {index < service.process.length - 1 && <span className="process-arrow">→</span>}
                      </span>
                    ))}
                  </div>
                  <button className="btn btn-primary service-btn">{service.buttonText}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section - HIDDEN as requested by user */}
      {/*
      <section className="workflow-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.workflow.title}</h2>
            <p className="section-subtitle">{currentContent.workflow.subtitle}</p>
          </div>
          <div className="workflow-steps">
            {currentContent.workflow.steps.map((step, index) => (
              <div key={step.number} className="workflow-step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < currentContent.workflow.steps.length - 1 && (
                  <div className="step-connector">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Guarantees Section */}
      <section className="guarantees-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.guarantees.title}</h2>
            <p className="section-subtitle">{currentContent.guarantees.subtitle}</p>
          </div>
          <div className="guarantees-grid">
            {currentContent.guarantees.items.map((guarantee, index) => (
              <div key={index} className="guarantee-card">
                <div className="guarantee-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {index === 0 && (
                      <g>
                        {/* Product Warranty - Premium shield with layers */}
                        <defs>
                          <linearGradient id="warrantyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.4)"/>
                          </linearGradient>
                        </defs>
                        <path d="M32 8L48 14L48 32C48 42 40 50 32 54C24 50 16 42 16 32L16 14L32 8Z" fill="url(#warrantyGrad)" stroke="currentColor" strokeWidth="2"/>
                        <path d="M32 16L42 20L42 32C42 38 38 42 32 46C26 42 22 38 22 32L22 20L32 16Z" fill="rgba(255,255,255,0.3)" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M26 30L30 34L38 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="32" cy="32" r="12" fill="rgba(255,255,255,0.1)" stroke="currentColor" strokeWidth="1"/>
                        <text x="32" y="50" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="bold">5-10</text>
                      </g>
                    )}
                    {index === 1 && (
                      <g>
                        {/* Installation Warranty - Tools and quality */}
                        <defs>
                          <radialGradient id="installWarrantyGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.8)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.3)"/>
                          </radialGradient>
                        </defs>
                        <circle cx="32" cy="32" r="22" fill="url(#installWarrantyGrad)" stroke="currentColor" strokeWidth="2"/>
                        <g transform="rotate(-45 32 32)">
                          <rect x="28" y="18" width="8" height="28" rx="4" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1.5"/>
                          <circle cx="32" cy="24" r="4" fill="currentColor"/>
                          <rect x="30" y="36" width="4" height="8" rx="2" fill="rgba(255,255,255,0.3)"/>
                        </g>
                        <g transform="rotate(45 32 32)">
                          <rect x="22" y="28" width="20" height="8" rx="4" fill="rgba(255,255,255,0.3)" stroke="currentColor" strokeWidth="1"/>
                          <circle cx="38" cy="32" r="3" fill="currentColor"/>
                        </g>
                        <path d="M20 44L24 48L30 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <text x="32" y="56" textAnchor="middle" fontSize="6" fill="currentColor" fontWeight="bold">2 YRS</text>
                      </g>
                    )}
                    {index === 2 && (
                      <g>
                        {/* Parts Service - Mechanical components */}
                        <defs>
                          <linearGradient id="partsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.2)"/>
                          </linearGradient>
                        </defs>
                        <circle cx="32" cy="32" r="20" fill="url(#partsGrad)" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="32" cy="32" r="8" fill="rgba(255,255,255,0.3)" stroke="currentColor" strokeWidth="1.5"/>
                        {Array.from({length: 6}).map((_, i) => (
                          <rect 
                            key={i}
                            x="30" 
                            y="10" 
                            width="4" 
                            height="10" 
                            rx="2"
                            fill="currentColor"
                            transform={`rotate(${i * 60} 32 32)`}
                          />
                        ))}
                        <g transform="translate(48, 20)">
                          <rect x="0" y="0" width="8" height="16" rx="4" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                          <circle cx="4" cy="8" r="2" fill="currentColor"/>
                        </g>
                        <g transform="translate(8, 36)">
                          <rect x="0" y="0" width="16" height="8" rx="4" fill="rgba(255,255,255,0.2)" stroke="currentColor" strokeWidth="1"/>
                          <circle cx="8" cy="4" r="1.5" fill="currentColor"/>
                        </g>
                        <text x="32" y="58" textAnchor="middle" fontSize="5" fill="currentColor" fontWeight="bold">15+</text>
                      </g>
                    )}
                    {index === 3 && (
                      <g>
                        {/* Technical Support - 24/7 Communication */}
                        <defs>
                          <radialGradient id="supportGuaranteeGrad" cx="50%" cy="50%" r="60%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                            <stop offset="100%" stopColor="rgba(255,255,255,0.2)"/>
                          </radialGradient>
                        </defs>
                        <circle cx="32" cy="32" r="22" fill="url(#supportGuaranteeGrad)" stroke="currentColor" strokeWidth="2"/>
                        <path d="M32 18C38 18 44 24 44 30L44 38C44 40 42 42 40 42L36 42C34 42 32 40 32 38L32 34C32 34 30 34 28 34L28 38C28 40 26 42 24 42L20 42C18 42 16 40 16 38L16 30C16 24 22 18 28 18" fill="rgba(255,255,255,0.3)" stroke="currentColor" strokeWidth="1.5"/>
                        <rect x="28" y="36" width="8" height="10" rx="4" fill="rgba(255,255,255,0.4)" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="32" cy="48" r="2" fill="currentColor"/>
                        <g opacity="0.7">
                          <path d="M12 30C12 22 18 16 26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                          <path d="M52 30C52 22 46 16 38 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        </g>
                        <circle cx="48" cy="26" r="3" fill="rgba(0,255,100,0.8)" stroke="currentColor" strokeWidth="1"/>
                        <text x="32" y="58" textAnchor="middle" fontSize="5" fill="currentColor" fontWeight="bold">24/7</text>
                      </g>
                    )}
                  </svg>
                </div>
                <div className="guarantee-content">
                  <h3 className="guarantee-title">{guarantee.title}</h3>
                  <div className="guarantee-value">{guarantee.value}</div>
                  <p className="guarantee-description">{guarantee.description}</p>
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

export default ServicesPage;