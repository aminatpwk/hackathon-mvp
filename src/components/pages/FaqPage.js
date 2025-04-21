import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function FAQPage() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const navigate = useNavigate();
    const [expandedFaq, setExpandedFaq] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleFaq = (index) => {
        if (expandedFaq === index) {
            setExpandedFaq(null);
        } else {
            setExpandedFaq(index);
        }
    };

    const styles = {
        container: {
            backgroundColor: '#f4f4f4',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            backgroundColor: '#235e3a',
            color: '#ffffff',
            padding: '80px 20px 40px',
            textAlign: 'center',
            position: 'relative',
        },
        title: {
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '16px',
        },
        subtitle: {
            fontSize: '18px',
            color: '#dbe5ea',
            maxWidth: '800px',
            margin: '0 auto',
        },
        backButton: {
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
        },
        mainContent: {
            flex: 1,
            maxWidth: '800px',
            margin: '0 auto',
            padding: '32px 16px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            marginTop: '-20px',
            marginBottom: '32px',
        },
        sectionTitle: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#235e3a',
            marginBottom: '24px',
            paddingBottom: '8px',
            borderBottom: '2px solid #dbe5ea',
        },
        faqItem: {
            marginBottom: '16px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #dbe5ea',
        },
        faqQuestion: {
            backgroundColor: '#f8f8f8',
            padding: '16px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: '600',
            color: '#235e3a',
        },
        faqAnswer: {
            padding: '16px',
            backgroundColor: '#ffffff',
            lineHeight: '1.6',
            color: '#333333',
        },
        searchContainer: {
            marginBottom: '32px',
        },
        searchInput: {
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            border: '2px solid #dbe5ea',
            borderRadius: '8px',
            outline: 'none',
        },
        searchInputFocus: {
            borderColor: '#235e3a',
        },
        categorySection: {
            marginBottom: '32px',
        },
        footer: {
            backgroundColor: '#1a472d',
            color: '#ffffff',
            padding: '32px 16px',
            marginTop: 'auto',
        },
        footerContent: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        footerGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '32px',
        },
        footerGridDesktop: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
        },
        footerTitle: {
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '8px',
        },
        footerText: {
            color: '#72b584',
            marginBottom: '16px',
        },
        footerList: {
            listStyle: 'none',
            padding: '0',
            margin: '8px 0',
        },
        footerListItem: {
            marginBottom: '8px',
            color: '#72b584',
        },
        footerLink: {
            color: '#72b584',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
        },
        contactSection: {
            marginTop: '40px',
            padding: '24px',
            backgroundColor: '#f5f9f6',
            borderRadius: '8px',
            border: '1px solid #dbe5ea',
            textAlign: 'center',
        },
        contactTitle: {
            fontSize: '20px',
            fontWeight: '600',
            color: '#235e3a',
            marginBottom: '16px',
        },
        contactText: {
            marginBottom: '16px',
        },
        contactButton: {
            backgroundColor: '#235e3a',
            color: '#ffffff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-block',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease',
        },
        contactButtonHover: {
            backgroundColor: '#1a472d',
        },
    };

    const faqCategories = [
        {
            title: "Të Përgjithshme",
            faqs: [
                {
                    question: "Çfarë është MerrBio?",
                    answer: "MerrBio është një platformë online që lidh drejtpërdrejt fermerët vendas me konsumatorët. Misioni ynë është të promovojmë bujqësinë e qëndrueshme, të reduktojmë ndërmjetësit, dhe të sigurojmë që produktet organike të freskëta të arrijnë në shtëpitë e konsumatorëve."
                },
                {
                    question: "Si funksionon MerrBio?",
                    answer: "MerrBio lejon fermerët të krijojnë profile për të listuar produktet e tyre bujqësore, ndërsa konsumatorët mund të shfletojnë produktet, të bëjnë porosi, dhe të komunikojnë direkt me fermerët."
                },
                {
                    question: "A është MerrBio i disponueshëm në të gjithë Shqipërinë?",
                    answer: "Po, MerrBio është i disponueshëm si aplikacion për platformat web dhe celular. "
                }
            ]
        },
        {
            title: "Për Konsumatorët",
            faqs: [
                {
                    question: "Si mund të bëj një porosi në MerrBio?",
                    answer: "Për të bërë një porosi, fillimisht duhet të krijoni një llogari në platformën tonë. Pasi të keni krijuar llogarinë, mund të shfletoni produktet sipas kategorive ose fermerëve, të bëni kërkesa për blerje pranë fermerëve dhe të merrni feedback prej tyre. "
                },
                {
                    question: "Si garantohet cilësia e produkteve?",
                    answer: "Të gjithë fermerët në platformën tonë i nënshtrohen një procesi verifikimi përpara se të lejohen të shesin. Ne kryejmë kontrolle të rregullta të cilësisë dhe kërkojmë nga fermerët të ndjekin praktika të qëndrueshme bujqësore. Gjithashtu, sistemi ynë i vlerësimeve dhe komenteve ju lejon të shihni përvojat e konsumatorëve të tjerë me secilin fermer."
                }
            ]
        },
        {
            title: "Për Fermerët",
            faqs: [
                {
                    question: "Si mund të bëhem shitës në MerrBio?",
                    answer: "Për t'u bërë një shitës në platformën tonë, duhet të regjistroheni për një llogari fermeri, të plotësoni formën e aplikimit që përfshin detaje për fermën tuaj dhe produktet që kultivoni, dhe të prisni procesin tonë të verifikimit. Pasi të miratoheni, mund të filloni të listoni produktet tuaja për shitje."
                },
                {
                    question: "Sa shpesh mund të përditësoj inventarin tim?",
                    answer: "Ju mund të përditësoni inventarin tuaj në çdo kohë dhe sa herë që dëshironi. Ju inkurajojmë të mbani listën e produkteve tuaja të përditësuar për të reflektuar disponueshmërinë aktuale dhe çmimet."
                }
            ]
        },
        {
            title: "Problemet dhe Zgjidhjet",
            faqs: [
                {
                    question: "Çfarë ndodh nëse nuk jam i kënaqur me cilësinë e produkteve?",
                    answer: "Nëse nuk jeni të kënaqur me cilësinë e produkteve të marra, ju lutemi të na njoftoni brenda 24 orëve nga marrja e porosisë. Ne do të punojmë me ju dhe fermerin për të gjetur një zgjidhje të përshtatshme, që mund të përfshijë zëvendësimin e produktit ose rimbursimin."
                },
                {
                    question: "Si mund të anuloj një porosi?",
                    answer: "Ju mund të anuloni një porosi brenda 2 orëve pas vendosjes së saj pa asnjë penalitet. Për të anuluar një porosi, hyni në llogarinë tuaj, shkoni te 'Porositë e Mia' dhe klikoni butonin 'Anulo'. Pas kalimit të periudhës 2-orëshe, anulimi mund të mos jetë i mundur nëse fermeri ka filluar përgatitjen e porosisë."
                }
            ]
        },
        {
            title: "Aspekte Teknike",
            faqs: [
                {
                    question: "Si mund të ndryshoj informacionin e llogarisë time?",
                    answer: "Për të ndryshuar informacionin e llogarisë suaj, hyni në platformë, klikoni në ikonën e profilit tuaj në këndin e sipërm të djathtë, dhe zgjidhni 'Cilësimet e Llogarisë'. Nga aty, mund të përditësoni detajet personale, informacionin e pagesës, dhe preferencat e njoftimeve."
                },
                {
                    question: "Kam probleme teknike me platformën. Çfarë duhet të bëj?",
                    answer: "Nëse hasni ndonjë problem teknik, ju lutemi të kontrolloni fillimisht lidhjen tuaj të internetit dhe të përditësoni shfletuesin ose aplikacionin në versionin më të fundit. Nëse problema vazhdon, na kontaktoni në amina.sokoli@fti.edu.al duke përfshirë detaje të problemit dhe pamje ekrani nëse është e mundur."
                }
            ]
        }
    ];

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate(-1)} style={styles.backButton}>
                    <ArrowLeft size={16} /> Kthehu
                </button>

                <h1 style={styles.title}>Pyetje të Shpeshta (FAQ)</h1>
                <p style={styles.subtitle}>
                    Gjithçka që duhet të dini për platformën MerrBio
                </p>
            </header>

            <main style={styles.mainContent}>
                <div style={styles.searchContainer}>
                    <input type="text" placeholder="Kërkoni një pyetje..." style={styles.searchInput}
                        onFocus={(e) => e.target.style.borderColor = '#235e3a'}
                        onBlur={(e) => e.target.style.borderColor = '#dbe5ea'}/>
                </div>

                {faqCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} style={styles.categorySection}>
                        <h2 style={styles.sectionTitle}>{category.title}</h2>

                        {category.faqs.map((faq, faqIndex) => {
                            const globalIndex = categoryIndex * 100 + faqIndex;
                            return (
                                <div key={faqIndex} style={styles.faqItem}>
                                    <div style={styles.faqQuestion} onClick={() => toggleFaq(globalIndex)}>
                                        <span>{faq.question}</span>
                                        {expandedFaq === globalIndex ?
                                            <ChevronUp size={20} /> :
                                            <ChevronDown size={20} />
                                        }
                                    </div>
                                    {expandedFaq === globalIndex && (
                                        <div style={styles.faqAnswer}>
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}

                <div style={styles.contactSection}>
                    <h3 style={styles.contactTitle}>Nuk gjetët përgjigje për pyetjen tuaj?</h3>
                    <p style={styles.contactText}>
                        Kontaktoni direkt me ekipin tonë të mbështetjes dhe do t'ju përgjigjemi sa më shpejt të jetë e mundur.
                    </p>
                </div>
            </main>

            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <div style={isDesktop ? styles.footerGridDesktop : styles.footerGrid}>
                        <div>
                            <h3 style={styles.footerTitle}>MerrBio</h3>
                            <p style={styles.footerText}>
                                Lidhja juaj me bujqësinë shqiptare
                            </p>
                            <p style={styles.footerText}>
                                © {new Date().getFullYear()} MerrBio. Zhvilluar nga Amina.
                            </p>
                        </div>

                        <div>
                            <h3 style={styles.footerTitle}>Kontakti</h3>
                            <ul style={styles.footerList}>
                                <li style={styles.footerListItem}>Email: amina.sokoli@fti.edu.al</li>
                            </ul>
                        </div>

                        <div>
                            <h3 style={styles.footerTitle}>Lidhje</h3>
                            <ul style={styles.footerList}>
                                <li style={styles.footerListItem}>
                                    <Link to="/terms" style={styles.footerLink}
                                          onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                                          onMouseLeave={(e) => (e.target.style.color = '#72b584')}>
                                        Kushtet e Përdorimit
                                    </Link>
                                </li>
                                <li style={styles.footerListItem}>
                                    <Link to="/privacy" style={styles.footerLink}
                                          onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                                          onMouseLeave={(e) => (e.target.style.color = '#72b584')}>
                                        Politika e Privatësisë
                                    </Link>
                                </li>
                                <li style={styles.footerListItem}>
                                    <Link to="/blog" style={styles.footerLink}
                                          onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                                          onMouseLeave={(e) => (e.target.style.color = '#72b584')}>
                                        Blog
                                    </Link>
                                </li>
                                <li style={styles.footerListItem}>
                                    <Link to="/faq" style={{...styles.footerLink, color: '#ffffff'}}
                                          onMouseLeave={(e) => (e.target.style.color = '#ffffff')}>
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}