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
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {service.icon === 'design' && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Minimalistic blueprint/design icon */}
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M9 9h6v6H9z"/>
                        <path d="M3 9h6"/>
                        <path d="M15 9h6"/>
                        <path d="M9 3v6"/>
                        <path d="M9 15v6"/>
                        <circle cx="7.5" cy="7.5" r="0.5" fill="currentColor"/>
                        <circle cx="16.5" cy="16.5" r="0.5" fill="currentColor"/>
                      </g>
                    )}
                    {service.icon === 'production' && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Minimalistic factory/production icon */}
                        <rect x="2" y="13" width="20" height="8" rx="1"/>
                        <path d="M6 13V8l4-3 4 3v5"/>
                        <rect x="7" y="17" width="2" height="4"/>
                        <rect x="11" y="17" width="2" height="4"/>
                        <rect x="15" y="17" width="2" height="4"/>
                        <path d="M14 8h4v5"/>
                        <circle cx="20" cy="6" r="2"/>
                        <path d="M20 8v5"/>
                      </g>
                    )}
                    {service.icon === 'installation' && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Professional installation icon - building with tools */}
                        <rect x="3" y="10" width="18" height="12" rx="1"/>
                        <path d="M7 10V6l4-2 4 2v4"/>
                        <rect x="6" y="14" width="2" height="6"/>
                        <rect x="11" y="14" width="2" height="6"/>
                        <rect x="16" y="14" width="2" height="6"/>
                        <path d="M15 6h4v4"/>
                        <path d="M19 6v4"/>
                      </g>
                    )}
                    {service.icon === 'service' && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Professional service icon - wrench and gear */}
                        <path d="M8 7l4 12.25a1 1 0 0 0 1.88 0L18 7"/>
                        <path d="M5 10l14 0"/>
                        <circle cx="12" cy="5" r="2"/>
                        <path d="M8 16l8 0"/>
                        <path d="M9 13l6 0"/>
                      </g>
                    )}
                    {service.icon === 'education' && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Professional education icon - graduation cap */}
                        <path d="M2 12l10-4 10 4-10 4-10-4z"/>
                        <path d="M6 14v4c0 1 2 2 6 2s6-1 6-2v-4"/>
                        <path d="M18 12v6"/>
                        <circle cx="18" cy="19" r="1"/>
                      </g>
                    )}
                    {service.icon === 'support' && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Professional support icon - 24/7 communication */}
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        <path d="M8 12h8"/>
                        <path d="M8 16h6"/>
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
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {index === 0 && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Simple shield with checkmark */}
                        <path d="M12 2l8 3v7c0 5-3 8-8 10-5-2-8-5-8-10V5l8-3z"/>
                        <path d="M9 12l2 2 4-4"/>
                      </g>
                    )}
                    {index === 1 && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Simple tool */}
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M9 12L7 10l5-5 2 2-5 5"/>
                        <path d="M15 12l2 2-5 5-2-2 5-5"/>
                      </g>
                    )}
                    {index === 2 && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Simple package/box for parts */}
                        <rect x="3" y="8" width="18" height="12" rx="2"/>
                        <path d="M12 2l9 4v14l-9 4-9-4V6l9-4z"/>
                        <path d="M3 8l9 4 9-4"/>
                        <path d="M12 12v8"/>
                      </g>
                    )}
                    {index === 3 && (
                      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {/* Simple phone */}
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
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