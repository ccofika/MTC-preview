import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './ContactPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { contactService } from '../services/contactService';
import useLanguage from '../hooks/useLanguage';

const ContactPage = () => {
  const { language, changeLanguage } = useLanguage();
  const location = useLocation();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    inquiryType: '',
    subject: '',
    message: '',
    attachment: null,
    consent: false
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle URL parameters for auto-populating form
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const product = urlParams.get('product');
    const color = urlParams.get('color');
    const profile = urlParams.get('profile');
    const shouldFocus = urlParams.get('focus') === 'contact-form';

    if (product) {
      // Build subject line with product details based on language
      let subject = '';
      if (language === 'SR') {
        subject = `Ponuda za ${product}`;
      } else if (language === 'EN') {
        subject = `Quote for ${product}`;
      } else { // DE
        subject = `Angebot für ${product}`;
      }
      
      if (color || profile) {
        subject += ' (';
        const details = [];
        if (color) {
          if (language === 'SR') {
            details.push(`Boja: ${color}`);
          } else if (language === 'EN') {
            details.push(`Color: ${color}`);
          } else { // DE
            details.push(`Farbe: ${color}`);
          }
        }
        if (profile) {
          if (language === 'SR') {
            details.push(`Profil: ${profile}`);
          } else if (language === 'EN') {
            details.push(`Profile: ${profile}`);
          } else { // DE
            details.push(`Profil: ${profile}`);
          }
        }
        subject += details.join(', ');
        subject += ')';
      }

      // Update form data
      setFormData(prev => ({
        ...prev,
        inquiryType: 'quote', // Set inquiry type to quote
        subject: subject
      }));
    }

    // Focus the form if requested
    if (shouldFocus && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
        // Focus the first input field
        const firstInput = formRef.current.querySelector('input[name="firstName"]');
        if (firstInput) {
          firstInput.focus();
        }
      }, 500);
    }
  }, [location.search, language]);


  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.inquiryType || !formData.subject || 
        !formData.message || !formData.consent) {
      setSubmitStatus('error');
      setSubmitMessage(language === 'SR' ? 
        'Molimo popunite sva obavezna polja i potvrdite saglasnost.' : 
        language === 'EN' ? 'Please fill in all required fields and confirm consent.' :
        'Bitte füllen Sie alle erforderlichen Felder aus und bestätigen Sie die Zustimmung.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'attachment' && formData[key]) {
          submitData.append('attachment', formData[key]);
        } else if (key !== 'attachment') {
          submitData.append(key, formData[key]);
        }
      });

      // Submit to backend
      const response = await contactService.submitContactForm(submitData);

      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage(language === 'SR' ? 
          'Hvala vam! Vaša poruka je uspešno poslata. Odgovoriće vam u najkraćem roku.' : 
          language === 'EN' ? 'Thank you! Your message has been sent successfully. We will respond as soon as possible.' :
          'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir werden so schnell wie möglich antworten.');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          inquiryType: '',
          subject: '',
          message: '',
          attachment: null,
          consent: false
        });
      } else {
        throw new Error(response.message || 'Submission failed');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(language === 'SR' ? 
        'Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.' : 
        language === 'EN' ? 'An error occurred while sending the message. Please try again.' :
        'Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
        title: 'Kontaktirajte nas',
        subtitle: 'Spremni smo da odgovorimo na sva vaša pitanja i pomognemo vam da pronađete najbolje rešenje'
      },
      contactInfo: {
        title: 'Kontakt informacije',
        address: {
          title: 'Adresa',
          street: 'Industrijska zona bb',
          city: '11000 Beograd',
          country: 'Srbija'
        },
        phone: {
          title: 'Telefon/Email',
          main: '+381 11 123 4567',
          sales: '+381 11 123 4568',
          service: '+381 11 123 4569',
          email: 'info@nissal.rs'
        },
        workingHours: {
          title: 'Radno vreme',
          weekdays: 'Ponedeljak-Petak: 08:00-16:00',
          saturday: 'Subota: 08:00-12:00',
          sunday: 'Nedelja: Zatvoreno'
        }
      },
      form: {
        title: 'Pošaljite nam poruku',
        subtitle: 'Popunite formu ispod i odgovoriće vam što pre',
        fields: {
          firstName: 'Ime',
          lastName: 'Prezime',
          email: 'Email adresa',
          phone: 'Telefon',
          company: 'Naziv kompanije (opcionalno)',
          position: 'Pozicija (opcionalno)',
          inquiryType: 'Tip upita',
          subject: 'Predmet',
          message: 'Poruka',
          attachment: 'Priložite fajl (opcionalno)',
          consent: 'Slažem se sa obradom ličnih podataka'
        },
        inquiryTypes: {
          general: 'Opšti upit',
          quote: 'Ponuda',
          service: 'Servis',
          complaint: 'Žalba'
        },
        submit: 'Pošalji poruku'
      },
      map: {
        title: 'Naša lokacija',
        navigation: 'Navigacija do nas'
      },
      faq: {
        title: 'Česta pitanja',
        items: [
          {
            question: 'Koliko traje izrada ponude?',
            answer: 'Standardnu ponudu izrađujemo u roku od 2-3 radna dana. Za složenije projekte rok može biti do 7 dana.'
          },
          {
            question: 'Da li radite custom rešenja?',
            answer: 'Da, specijalizovani smo za prilagođena rešenja prema specifičnim potrebama klijenata. Naš tim dizajnera radi na projektima bilo koje složenosti.'
          },
          {
            question: 'Koja je garantija na proizvode?',
            answer: 'Pružamo garantiju od 5-10 godina na proizvode, zavisno od tipa sistema. Garantija na rad je 2 godine.'
          },
          {
            question: 'Da li vršite ugradnju?',
            answer: 'Da, imamo tim sertifikovanih tehničara koji vrše profesionalnu ugradnju svih naših proizvoda.'
          },
          {
            question: 'Kako da održavam aluminijumske profile?',
            answer: 'Aluminijumski profili ne zahtevaju posebno održavanje. Dovoljno je redovno čišćenje blagim deterdžentom i vodom.'
          },
          {
            question: 'Da li radite sa građevinskim kompanijama?',
            answer: 'Da, sarađujemo sa građevinskim kompanijama na projektima različitih veličina i nudimo specijalne uslove za partnere.'
          },
          {
            question: 'Koje su opcije plaćanja?',
            answer: 'Prihvatamo plaćanje po fakturi, kartama, kao i mogućnost plaćanja na rate za veće projekte.'
          },
          {
            question: 'Da li imate reprezentativni salon?',
            answer: 'Da, imamo salon na našoj lokaciji gde možete videti uzorke svih naših proizvoda i sistema.'
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
        title: 'Contact Us',
        subtitle: 'We are ready to answer all your questions and help you find the best solution'
      },
      contactInfo: {
        title: 'Contact Information',
        address: {
          title: 'Address',
          street: 'Industrial zone bb',
          city: '11000 Belgrade',
          country: 'Serbia'
        },
        phone: {
          title: 'Phone/Email',
          main: '+381 11 123 4567',
          sales: '+381 11 123 4568',
          service: '+381 11 123 4569',
          email: 'info@nissal.rs'
        },
        workingHours: {
          title: 'Working Hours',
          weekdays: 'Monday-Friday: 08:00-16:00',
          saturday: 'Saturday: 08:00-12:00',
          sunday: 'Sunday: Closed'
        }
      },
      form: {
        title: 'Send us a message',
        subtitle: 'Fill out the form below and we will respond as soon as possible',
        fields: {
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email Address',
          phone: 'Phone',
          company: 'Company Name (optional)',
          position: 'Position (optional)',
          inquiryType: 'Inquiry Type',
          subject: 'Subject',
          message: 'Message',
          attachment: 'Attach File (optional)',
          consent: 'I agree to the processing of personal data'
        },
        inquiryTypes: {
          general: 'General Inquiry',
          quote: 'Quote Request',
          service: 'Service',
          complaint: 'Complaint'
        },
        submit: 'Send Message'
      },
      map: {
        title: 'Our Location',
        navigation: 'Get Directions'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'How long does it take to prepare a quote?',
            answer: 'We prepare standard quotes within 2-3 business days. For more complex projects, it may take up to 7 days.'
          },
          {
            question: 'Do you make custom solutions?',
            answer: 'Yes, we specialize in customized solutions according to specific client needs. Our design team works on projects of any complexity.'
          },
          {
            question: 'What is the warranty on products?',
            answer: 'We provide a 5-10 year warranty on products, depending on the system type. Work warranty is 2 years.'
          },
          {
            question: 'Do you provide installation?',
            answer: 'Yes, we have a team of certified technicians who perform professional installation of all our products.'
          },
          {
            question: 'How to maintain aluminum profiles?',
            answer: 'Aluminum profiles do not require special maintenance. Regular cleaning with mild detergent and water is sufficient.'
          },
          {
            question: 'Do you work with construction companies?',
            answer: 'Yes, we cooperate with construction companies on projects of various sizes and offer special terms for partners.'
          },
          {
            question: 'What are the payment options?',
            answer: 'We accept payment by invoice, cards, as well as installment payment options for larger projects.'
          },
          {
            question: 'Do you have a showroom?',
            answer: 'Yes, we have a showroom at our location where you can see samples of all our products and systems.'
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
        title: 'Kontaktieren Sie uns',
        subtitle: 'Wir sind bereit, Ihnen bei Ihrem nächsten Aluminiumsystem-Projekt zu helfen'
      },
      contactInfo: {
        title: 'Kontaktinformationen',
        address: {
          title: 'Adresse',
          street: 'Industriezone bb',
          city: '11000 Belgrad',
          country: 'Serbien'
        },
        phone: {
          title: 'Telefon/E-Mail',
          main: '+381 11 123 4567',
          sales: '+381 11 123 4568',
          service: '+381 11 123 4569',
          email: 'info@nissal.rs'
        },
        workingHours: {
          title: 'Arbeitszeiten',
          weekdays: 'Montag-Freitag: 08:00-16:00',
          saturday: 'Samstag: 08:00-12:00',
          sunday: 'Sonntag: Geschlossen'
        }
      },
      form: {
        title: 'Senden Sie uns eine Nachricht',
        subtitle: 'Füllen Sie das Formular aus und wir werden uns in Kürze bei Ihnen melden',
        fields: {
          firstName: 'Vorname',
          lastName: 'Nachname',
          email: 'E-Mail-Adresse',
          phone: 'Telefonnummer',
          company: 'Unternehmen (optional)',
          position: 'Position (optional)',
          inquiryType: 'Art der Anfrage',
          subject: 'Betreff',
          message: 'Nachricht',
          attachment: 'Datei anhängen (optional)',
          consent: 'Ich stimme der Verarbeitung meiner persönlichen Daten zu'
        },
        inquiryTypes: {
          general: 'Allgemeine Anfrage',
          quote: 'Angebotanfrage',
          service: 'Technische Unterstützung',
          complaint: 'Beschwerde'
        },
        submit: 'Nachricht senden'
      },
      map: {
        title: 'Finden Sie uns',
        navigation: 'Wegbeschreibung anzeigen'
      },
      faq: {
        title: 'Häufig gestellte Fragen',
        items: [
          {
            question: 'Wie lange dauert die Bearbeitung einer Anfrage?',
            answer: 'Wir antworten in der Regel innerhalb von 24 Stunden auf alle Anfragen. Bei komplexeren technischen Fragen kann es bis zu 48 Stunden dauern.'
          },
          {
            question: 'Bieten Sie kostenlose Beratung an?',
            answer: 'Ja, wir bieten kostenlose Erstberatung für alle Projekte an. Unsere Experten können Ihnen bei der Auswahl der richtigen Aluminiumsysteme helfen.'
          },
          {
            question: 'Welche Zahlungsmethoden akzeptieren Sie?',
            answer: 'Wir akzeptieren Banküberweisungen, Kreditkarten und können auch individuelle Zahlungspläne für größere Projekte arrangieren.'
          },
          {
            question: 'Liefern Sie auch außerhalb Serbiens?',
            answer: 'Ja, wir liefern in die gesamte Region des Balkans und darüber hinaus. Kontaktieren Sie uns für spezifische Informationen zu Ihrem Standort.'
          },
          {
            question: 'Wie erhalte ich ein Angebot?',
            answer: 'Sie können ein Angebot anfordern, indem Sie unser Kontaktformular ausfüllen oder uns direkt anrufen. Wir benötigen einige Details zu Ihrem Projekt, um ein genaues Angebot zu erstellen.'
          },
          {
            question: 'Welche Garantie bieten Sie auf Ihre Produkte?',
            answer: 'Wir bieten eine 5-10-jährige Garantie auf Produkte, je nach Systemtyp. Die Arbeitsgarantie beträgt 2 Jahre.'
          },
          {
            question: 'Bieten Sie auch Installation an?',
            answer: 'Ja, wir haben ein Team zertifizierter Techniker, die eine professionelle Installation aller unserer Produkte durchführen.'
          },
          {
            question: 'Haben Sie einen Ausstellungsraum?',
            answer: 'Ja, wir haben einen Ausstellungsraum an unserem Standort, wo Sie Muster aller unserer Produkte und Systeme sehen können.'
          }
        ]
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
    <div className="contact-page">
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageChange={changeLanguage} 
        content={currentContent} 
      />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{currentContent.hero.title}</h1>
            <p className="hero-subtitle">{currentContent.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section">
        <div className="container">
          <h2 className="section-title">{currentContent.contactInfo.title}</h2>
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{currentContent.contactInfo.address.title}</h3>
              <div className="contact-details">
                <p>{currentContent.contactInfo.address.street}</p>
                <p>{currentContent.contactInfo.address.city}</p>
                <p>{currentContent.contactInfo.address.country}</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 10.5C6.5 10.5 7.5 12.5 10.5 15.5C13.5 18.5 15.5 19.5 15.5 19.5L18.5 16.5C19 16 19.8 16 20.3 16.5L22.5 18.7C23.2 19.4 23.2 20.6 22.5 21.3L20.5 23.3C20.1 23.7 19.6 24 19 24C18.9 24 18.8 24 18.7 24C15.1 23.8 11.6 22.3 8.9 19.6C6.2 16.9 4.7 13.4 4.5 9.8C4.5 9.2 4.8 8.7 5.2 8.3L7.2 6.3C7.9 5.6 9.1 5.6 9.8 6.3L12 8.5C12.5 9 12.5 9.8 12 10.3L6.5 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{currentContent.contactInfo.phone.title}</h3>
              <div className="contact-details">
                <p><strong>Glavni:</strong> <a href={`tel:${currentContent.contactInfo.phone.main}`}>{currentContent.contactInfo.phone.main}</a></p>
                <p><strong>Prodaja:</strong> <a href={`tel:${currentContent.contactInfo.phone.sales}`}>{currentContent.contactInfo.phone.sales}</a></p>
                <p><strong>Servis:</strong> <a href={`tel:${currentContent.contactInfo.phone.service}`}>{currentContent.contactInfo.phone.service}</a></p>
                <p><strong>Email:</strong> <a href={`mailto:${currentContent.contactInfo.phone.email}`}>{currentContent.contactInfo.phone.email}</a></p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>{currentContent.contactInfo.workingHours.title}</h3>
              <div className="contact-details">
                <p>{currentContent.contactInfo.workingHours.weekdays}</p>
                <p>{currentContent.contactInfo.workingHours.saturday}</p>
                <p>{currentContent.contactInfo.workingHours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" ref={formRef}>
        <div className="container">
          <div className="form-content">
            <div className="form-header">
              <h2 className="section-title">{currentContent.form.title}</h2>
              <p className="form-subtitle">{currentContent.form.subtitle}</p>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Status Messages */}
              {submitStatus && (
                <div className={`form-status ${submitStatus}`}>
                  <div className="status-icon">
                    {submitStatus === 'success' ? (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </div>
                  <p className="status-message">{submitMessage}</p>
                </div>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">{currentContent.form.fields.firstName} *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">{currentContent.form.fields.lastName} *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{currentContent.form.fields.email} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{currentContent.form.fields.phone} *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">{currentContent.form.fields.company}</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="position">{currentContent.form.fields.position}</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType">{currentContent.form.fields.inquiryType} *</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Izaberite...</option>
                    <option value="general">{currentContent.form.inquiryTypes.general}</option>
                    <option value="quote">{currentContent.form.inquiryTypes.quote}</option>
                    <option value="service">{currentContent.form.inquiryTypes.service}</option>
                    <option value="complaint">{currentContent.form.inquiryTypes.complaint}</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="subject">{currentContent.form.fields.subject} *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">{currentContent.form.fields.message} *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="attachment">{currentContent.form.fields.attachment}</label>
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    onChange={handleInputChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>

                <div className="form-group full-width">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="consent">{currentContent.form.fields.consent} *</label>
                  </div>
                </div>

                <div className="form-group full-width">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading-content">
                        <svg className="loading-spinner" viewBox="0 0 24 24">
                          <circle 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeDasharray="31.416" 
                            strokeDashoffset="31.416"
                          >
                            <animate 
                              attributeName="stroke-dasharray" 
                              dur="2s" 
                              values="0 31.416;15.708 15.708;0 31.416" 
                              repeatCount="indefinite"
                            />
                            <animate 
                              attributeName="stroke-dashoffset" 
                              dur="2s" 
                              values="0;-15.708;-31.416" 
                              repeatCount="indefinite"
                            />
                          </circle>
                        </svg>
                        {language === 'SR' ? 'Šalje se...' : language === 'EN' ? 'Sending...' : 'Wird gesendet...'}
                      </span>
                    ) : (
                      currentContent.form.submit
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title">{currentContent.map.title}</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <p>Interaktivna mapa - Google Maps integration</p>
              <button className="btn btn-outline">{currentContent.map.navigation}</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">{currentContent.faq.title}</h2>
          <div className="faq-accordion">
            {currentContent.faq.items.map((item, index) => (
              <div key={index} className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{item.question}</span>
                  <div className="faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
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

export default ContactPage;