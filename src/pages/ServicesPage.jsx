import React, { useState } from 'react';
import './ServicesPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLanguage from '../hooks/useLanguage';

const ServicesPage = () => {
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
            <div className="hero-icon">
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
                      <path d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                    {service.icon === 'production' && (
                      <path d="M9 12L11 14L15 10 M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                    {service.icon === 'installation' && (
                      <path d="M14.7 6.3C16.2 7.8 16.2 10.3 14.7 11.8L11.8 14.7C10.3 16.2 7.8 16.2 6.3 14.7C4.8 13.2 4.8 10.7 6.3 9.2L9.2 6.3C10.7 4.8 13.2 4.8 14.7 6.3Z M17.7 9.3L14.7 6.3 M10.7 16.3L7.7 13.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                    {service.icon === 'service' && (
                      <path d="M14.5 4H20C20.5523 4 21 4.44772 21 5V7C21 7.55228 20.5523 8 20 8H14.5M14.5 4V8M14.5 4H4C3.44772 4 3 4.44772 3 5V7C3 7.55228 3.44772 8 4 8H14.5M14.5 8V20C14.5 20.5523 14.0523 21 13.5 21H5C4.44772 21 4 20.5523 4 20V16M14.5 8H20C20.5523 8 21 8.44772 21 9V19C21 19.5523 20.5523 20 20 20H14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                    {service.icon === 'education' && (
                      <path d="M22 10V6C22 5.44772 21.5523 5 21 5H3C2.44772 5 2 5.44772 2 6V10C2 10.5523 2.44772 11 3 11H21C21.5523 11 22 10.5523 22 10Z M7 19H17M9 15V19M15 15V19M2 15L12 10L22 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                    {service.icon === 'support' && (
                      <path d="M21 15C21 15.5523 20.5523 16 20 16V20C20 20.5523 19.5523 21 19 21H17C16.4477 21 16 20.5523 16 20V16H8V20C8 20.5523 7.55228 21 7 21H5C4.44772 21 4 20.5523 4 20V16C3.44772 16 3 15.5523 3 15V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V15Z M7 8H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                    <path d="M9 12L11 14L15 10M12 3L14 8L19 8L15.5 12L17 17L12 14L7 17L8.5 12L5 8L10 8L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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