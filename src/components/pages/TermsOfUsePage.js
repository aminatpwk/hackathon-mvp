import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function TermsOfUsePage() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        section: {
            marginBottom: '32px',
        },
        sectionTitle: {
            fontSize: '24px',
            fontWeight: '600',
            color: '#235e3a',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '2px solid #dbe5ea',
        },
        paragraph: {
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#333333',
            marginBottom: '16px',
        },
        list: {
            marginLeft: '20px',
            marginBottom: '16px',
        },
        listItem: {
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#333333',
            marginBottom: '8px',
        },
        emphasis: {
            fontWeight: '600',
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
        lastUpdated: {
            fontSize: '14px',
            color: '#666666',
            fontStyle: 'italic',
            marginTop: '32px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate(-1)} style={styles.backButton}>
                    <ArrowLeft size={16} /> Kthehu
                </button>

                <h1 style={styles.title}>Kushtet e Përdorimit</h1>
                <p style={styles.subtitle}>
                    Ju lutemi të lexoni me kujdes kushtet e mëposhtme përpara se të përdorni platformën tonë
                </p>
            </header>

            <main style={styles.mainContent}>
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>1. Hyrje</h2>
                    <p style={styles.paragraph}>
                        Mirë se vini në platformën MerrBio! Këto kushte përcaktojnë rregullat dhe rregulloret për përdorimin e platformës MerrBio.
                    </p>
                    <p style={styles.paragraph}>
                        Duke hyrë në këtë platformë, ne supozojmë që ju pranoni këto kushte. Mos vazhdoni të përdorni MerrBio nëse nuk pranoni të merrni të gjitha kushtet e përcaktuara në këtë faqe.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>2. Përkufizime</h2>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            <span style={styles.emphasis}>"Përdorues"</span> i referohet individit që hyn në këtë platformë dhe është në përputhje me këto Kushte të Përdorimit.
                        </li>
                        <li style={styles.listItem}>
                            <span style={styles.emphasis}>"Fermer"</span> i referohet përdoruesve që ofrojnë produkte bujqësore në platformë.
                        </li>
                        <li style={styles.listItem}>
                            <span style={styles.emphasis}>"Konsumator"</span> i referohet përdoruesve që blejnë ose kërkojnë të blejnë produkte bujqësore nga platforma.
                        </li>
                        <li style={styles.listItem}>
                            <span style={styles.emphasis}>"Përmbajtja"</span> i referohet të gjitha informacioneve, teksteve, imazheve dhe çdo materiali tjetër që shfaqet në platformën MerrBio.
                        </li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>3. Regjistrimi dhe Llogaritë</h2>
                    <p style={styles.paragraph}>
                        Për të përdorur pjesë të caktuara të platformës MerrBio, mund t'ju kërkohet të krijoni një llogari. Ju jeni përgjegjës për ruajtjen e konfidencialitetit të llogarisë dhe fjalëkalimit tuaj dhe për kufizimin e aksesit në llogarinë tuaj.
                    </p>
                    <p style={styles.paragraph}>
                        Ju pranoni të merrni përgjegjësi për të gjitha aktivitetet që ndodhin nën llogarinë dhe fjalëkalimin tuaj. Nëse besoni se ka pasur ndonjë shkelje të sigurisë, ju lutemi njoftoni menjëherë administratën tonë.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>4. Produktet dhe Transaksionet</h2>
                    <p style={styles.paragraph}>
                        MerrBio shërben si një platformë që lidh fermerët me konsumatorët. Ne nuk jemi përgjegjës për cilësinë e produkteve të ofruara nga fermerët në platformën tonë.
                    </p>
                    <p style={styles.paragraph}>
                        Fermerët janë përgjegjës për saktësinë e përshkrimeve të produkteve, çmimeve dhe informacioneve të tjera të lidhura me produktet e tyre. Konsumatorët duhet të kontrollojnë me kujdes informacionin para se të bëjnë një kërkesë për blerje.
                    </p>
                    <p style={styles.paragraph}>
                        MerrBio nuk është përgjegjës për çdo mosmarrëveshje që mund të lindë midis konsumatorëve dhe fermerëve lidhur me transaksionet e tyre.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>5. Të Drejtat dhe Kufizimet</h2>
                    <p style={styles.paragraph}>
                        Përdoruesit nuk duhet të angazhohen në asnjë aktivitet që:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Është i paligjshëm ose promovon aktivitete të paligjshme</li>
                        <li style={styles.listItem}>Shkel të drejtat e pronësisë intelektuale të çdo pale të tretë</li>
                        <li style={styles.listItem}>Është mashtrues, çorientues ose i pasaktë</li>
                        <li style={styles.listItem}>Është ofendues, kërcënues, diskriminues ose përmban gjuhë të papërshtatshme</li>
                        <li style={styles.listItem}>Tenton të manipulojë ose ndërhyjë në funksionalitetin e platformës</li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>6. Privatësia dhe të Dhënat Personale</h2>
                    <p style={styles.paragraph}>
                        Politika jonë e Privatësisë shpjegon se si ne mbledhim, përdorim dhe mbrojmë informacionin tuaj personal kur përdorni platformën tonë. Duke përdorur MerrBio, ju pranoni praktikat e përshkruara në Politikën tonë të Privatësisë.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>7. Ndryshimet në Kushtet e Përdorimit</h2>
                    <p style={styles.paragraph}>
                        Ne rezervojmë të drejtën të ndryshojmë këto kushte të përdorimit në çdo kohë. Ne do të njoftojmë përdoruesit për çdo ndryshim duke përditësuar datën e "Përditësimit të fundit" në fund të kësaj faqe.
                    </p>
                    <p style={styles.paragraph}>
                        Është përgjegjësia juaj të kontrolloni periodikisht për ndryshime. Përdorimi i vazhdueshëm i platformës pas postimit të ndryshimeve do të përbëjë pranimin tuaj të kushteve të reja.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>8. Përfundimi i Përdorimit</h2>
                    <p style={styles.paragraph}>
                        Ne mund të ndërpresim ose pezullojmë aksesin tuaj menjëherë, pa njoftim paraprak ose përgjegjësi, për çdo arsye, duke përfshirë pa kufizim nëse shkelni Kushtet e Përdorimit.
                    </p>
                    <p style={styles.paragraph}>
                        Pas përfundimit, e drejta juaj për të përdorur platformën do të pushojë menjëherë.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>9. Kontakti</h2>
                    <p style={styles.paragraph}>
                        Nëse keni pyetje në lidhje me këto Kushte të Përdorimit, ju lutemi na kontaktoni:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Email: amina.sokoli@fti.edu.al</li>
                        <li style={styles.listItem}>Telefon: +355 69 XXX XXXX</li>
                    </ul>
                </div>

                <p style={styles.lastUpdated}>Përditësimi i fundit: 16 Prill, 2025</p>
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
                                    <Link to="/terms" style={{...styles.footerLink, color: '#ffffff'}}
                                          onMouseLeave={(e) => (e.target.style.color = '#ffffff')}>
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
                                    <Link to="/faq" style={styles.footerLink}
                                          onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                                          onMouseLeave={(e) => (e.target.style.color = '#72b584')}>
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