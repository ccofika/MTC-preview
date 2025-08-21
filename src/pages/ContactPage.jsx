import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './ContactPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { contactService } from '../services/contactService';
import useLanguage from '../hooks/useLanguage';
import { MapPin, Phone, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';

const ContactPage = () => {
  const { language, changeLanguage } = useLanguage();
  const location = useLocation();
  const formRef = useRef(null);
  const faqSectionRef = useRef(null);
  const faqItemsRef = useRef([]);
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
  const [faqVisible, setFaqVisible] = useState(false);

  // Handle URL parameters for auto-populating form
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const product = urlParams.get('product');
    const color = urlParams.get('color');
    const profile = urlParams.get('profile');
    const inquiryType = urlParams.get('inquiryType');
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
        inquiryType: inquiryType || 'quote', // Use inquiryType from URL or default to quote
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

  // Optimized FAQ Animation System
  useEffect(() => {
    const faqSection = faqSectionRef.current;
    if (!faqSection) return;

    // Simple intersection observer for FAQ visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !faqVisible) {
            setFaqVisible(true);
            // No setTimeout - let CSS handle stagger
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(faqSection);

    return () => {
      observer.disconnect();
    };
  }, [faqVisible]);

  // Simple FAQ toggle - Original smooth animation
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };


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
          street: 'Mtc Nissal Centrala Gandijeva 235/13',
          city: '11073 Beograd',
          street2: 'Bulevar Sv. Cara Konstantina bb',
          city2: 'Niš',
          country: 'Srbija'
        },
        phone: {
          title: 'Telefon/Email',
          centrala: '+381 18 415 63 32',
          finansije1: '062 210 598',
          finansije2: '064 844 3847',
          email: 'office@mtc.co.rs',
          centralaLabel: 'Centrala',
          finansijeLabel: 'Finansije'
        },
        workingHours: {
          title: 'Radno vreme',
          weekdays: 'Ponedeljak i Petak: 08:00-16:00',
          saturday: 'Subota: Zatvoreno',
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
          complaint: 'Žalba',
          'upit za boju': 'Upit za boju'
        },
        selectLabel: 'Izaberite...',
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
          address: 'Gandijeva 235/13, 11073 Beograd',
          phone: '+381 18 415 63 32',
          email: 'office@mtc.co.rs',
          workingHours: 'Ponedeljak i Petak'
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
        },
        company: {
          description: 'Vrhunski aluminijumski sistemi za modernu gradnju. Kvalitet, inovacija i pouzdanost od 2008. godine.'
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
          street: 'Mtc Nissal Centrala Gandijeva 235/13',
          city: '11073 Belgrade',
          street2: 'Bulevar Sv. Cara Konstantina bb',
          city2: 'Niš',
          country: 'Serbia'
        },
        phone: {
          title: 'Phone/Email',
          centrala: '+381 18 415 63 32',
          finansije1: '062 210 598',
          finansije2: '064 844 3847',
          email: 'office@mtc.co.rs',
          centralaLabel: 'Main Office',
          finansijeLabel: 'Finance'
        },
        workingHours: {
          title: 'Working Hours',
          weekdays: 'Monday and Friday: 08:00-16:00',
          saturday: 'Saturday: Closed',
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
          complaint: 'Complaint',
          'upit za boju': 'Color Inquiry'
        },
        selectLabel: 'Select...',
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
          address: 'Gandijeva 235/13, 11073 Belgrade',
          phone: '+381 18 415 63 32',
          email: 'office@mtc.co.rs',
          workingHours: 'Monday and Friday'
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
        },
        company: {
          description: 'Premium aluminum systems for modern construction. Quality, innovation and reliability since 2008.'
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
          street: 'Mtc Nissal Centrala Gandijeva 235/13',
          city: '11073 Belgrad',
          street2: 'Bulevar Sv. Cara Konstantina bb',
          city2: 'Niš',
          country: 'Serbien'
        },
        phone: {
          title: 'Telefon/E-Mail',
          centrala: '+381 18 415 63 32',
          finansije1: '062 210 598',
          finansije2: '064 844 3847',
          email: 'office@mtc.co.rs',
          centralaLabel: 'Zentrale',
          finansijeLabel: 'Finanzen'
        },
        workingHours: {
          title: 'Arbeitszeiten',
          weekdays: 'Montag und Freitag: 08:00-16:00',
          saturday: 'Samstag: Geschlossen',
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
          complaint: 'Beschwerde',
          'upit za boju': 'Farbanfrage'
        },
        selectLabel: 'Wählen Sie...',
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
          address: 'Gandijeva 235/13, 11073 Belgrad',
          phone: '+381 18 415 63 32',
          email: 'office@mtc.co.rs',
          workingHours: 'Montag und Freitag'
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
        },
        company: {
          description: 'Premium Aluminiumsysteme für moderne Bauwesen. Qualität, Innovation und Zuverlässigkeit seit 2008.'
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
                <MapPin size={32} />
              </div>
              <h3>{currentContent.contactInfo.address.title}</h3>
              <div className="contact-details">
                <p><strong>Beograd:</strong></p>
                <p>{currentContent.contactInfo.address.street}</p>
                <p>{currentContent.contactInfo.address.city}</p>
                <p><strong>Niš:</strong></p>
                <p>{currentContent.contactInfo.address.street2}</p>
                <p>{currentContent.contactInfo.address.city2}</p>
                <p>{currentContent.contactInfo.address.country}</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <Phone size={32} />
              </div>
              <h3>{currentContent.contactInfo.phone.title}</h3>
              <div className="contact-details">
                <p><strong>{currentContent.contactInfo.phone.centralaLabel}:</strong> <a href={`tel:${currentContent.contactInfo.phone.centrala}`}>{currentContent.contactInfo.phone.centrala}</a></p>
                <p><strong>{currentContent.contactInfo.phone.finansijeLabel}:</strong> <a href={`tel:${currentContent.contactInfo.phone.finansije1}`}>{currentContent.contactInfo.phone.finansije1}</a></p>
                <p><strong>{currentContent.contactInfo.phone.finansijeLabel}:</strong> <a href={`tel:${currentContent.contactInfo.phone.finansije2}`}>{currentContent.contactInfo.phone.finansije2}</a></p>
                <p><strong>Email:</strong> <a href={`mailto:${currentContent.contactInfo.phone.email}`}>{currentContent.contactInfo.phone.email}</a></p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <Clock size={32} />
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
                      <CheckCircle size={24} />
                    ) : (
                      <XCircle size={24} />
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
                    <option value="">{currentContent.form.selectLabel}</option>
                    <option value="general">{currentContent.form.inquiryTypes.general}</option>
                    <option value="quote">{currentContent.form.inquiryTypes.quote}</option>
                    <option value="service">{currentContent.form.inquiryTypes.service}</option>
                    <option value="complaint">{currentContent.form.inquiryTypes.complaint}</option>
                    <option value="upit za boju">{currentContent.form.inquiryTypes['upit za boju']}</option>
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
                        <Loader size={20} className="loading-spinner" />
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
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2896.3456789!2d21.8958333!3d43.3209444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b0c1234567890%3A0x1234567890abcdef!2sBulevar%20Sv.%20Cara%20Konstantina%20bb%2C%20Ni%C5%A1%2C%20Serbia!5e0!3m2!1sen!2srs!4v1234567890123!5m2!1sen!2srs"
                width="100%" 
                height="400" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="MTC Nissal Location - Niš"
              ></iframe>
              <a 
                href="https://maps.app.goo.gl/3jHU1MT6ordQvYDG6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{marginTop: '1rem'}}
              >
                {currentContent.map.navigation}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Stable Version */}
      {/* <section 
        className={`faq-section ${faqVisible ? 'visible' : ''}`}
        ref={faqSectionRef}
      >
        <div className="container">
          <h2 className="section-title">{currentContent.faq.title}</h2>
          
          <div className="faq-accordion">
            {currentContent.faq.items.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}
                ref={el => faqItemsRef.current[index] = el}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{item.question}</span>
                  <div className="faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M6 9L12 15L18 9" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
                
                <div 
                  className="faq-answer" 
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default ContactPage;