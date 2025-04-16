import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function PrivacyPolicyPage() {
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
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '24px',
        },
        tableHead: {
            backgroundColor: '#dbe5ea',
        },
        tableHeader: {
            padding: '12px',
            textAlign: 'left',
            borderBottom: '2px solid #235e3a',
            color: '#235e3a',
            fontWeight: '600',
        },
        tableCell: {
            padding: '12px',
            borderBottom: '1px solid #ddd',
            verticalAlign: 'top',
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate(-1)} style={styles.backButton}>
                    <ArrowLeft size={16} /> Kthehu
                </button>
                <h1 style={styles.title}>Politikat e Privatësisë</h1>
                <p style={styles.subtitle}>
                    Si i mbledhim, përdorim dhe mbrojmë të dhënat tuaja personale
                </p>
            </header>

            <main style={styles.mainContent}>
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>1. Hyrje</h2>
                    <p style={styles.paragraph}>
                        Mirë se vini në platformën MerrBio! Privatësia e të dhënave tuaja personale është një prioritet për ne. Kjo politikë privatësie shpjegon se si mbledhim, përdorim, dhe mbrojmë informacionin tuaj kur përdorni platformën tonë.
                    </p>
                    <p style={styles.paragraph}>
                        Duke përdorur platformën MerrBio, ju pranoni praktikat e përshkruara në këtë politikë. Nëse nuk pajtoheni me këtë politikë, ju lutemi të mos përdorni platformën tonë.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>2. Informacioni që Mbledhim</h2>
                    <p style={styles.paragraph}>
                        Gjatë përdorimit të platformës sonë, ne mund të mbledhim llojet e mëposhtme të informacionit:
                    </p>

                    <table style={styles.table}>
                        <thead style={styles.tableHead}>
                        <tr>
                            <th style={styles.tableHeader}>Lloji i Informacionit</th>
                            <th style={styles.tableHeader}>Përshkrimi</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={styles.tableCell}><span style={styles.emphasis}>Të dhënat personale</span></td>
                            <td style={styles.tableCell}>Emri, mbiemri, adresa e-mail, numri i telefonit</td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}><span style={styles.emphasis}>Të dhënat e llogarisë</span></td>
                            <td style={styles.tableCell}>Emri i përdoruesit, fjalëkalimi (i kriptuar), profili </td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}><span style={styles.emphasis}>Të dhënat e transaksioneve</span></td>
                            <td style={styles.tableCell}>Detajet e kërkesave për blerje, produktet e zgjedhura, komunikimet me fermerët/klientët</td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}><span style={styles.emphasis}>Të dhënat automatike</span></td>
                            <td style={styles.tableCell}>Cookies, të dhënat e përdorimit të faqes</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>3. Si e Përdorim Informacionin Tuaj</h2>
                    <p style={styles.paragraph}>
                        Ne përdorim informacionin e mbledhur për qëllimet e mëposhtme:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Të ofrojmë, mirëmbajmë dhe përmirësojmë platformën tonë</li>
                        <li style={styles.listItem}>Të përpunojmë transaksionet dhe të lehtësojmë komunikimin midis fermerëve dhe klientëve</li>
                        <li style={styles.listItem}>Të personalizojmë përvojën tuaj të përdorimit dhe të ofrojmë përmbajtje të përshtatur</li>
                        <li style={styles.listItem}>Të zbulojmë dhe parandalojmë aktivitetet mashtruese ose të paligjshme</li>
                        <li style={styles.listItem}>Të përmbushim detyrimet ligjore</li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>4. Ndarja e Informacionit</h2>
                    <p style={styles.paragraph}>
                        Nuk do të shesim, tregtojmë ose japim me qira informacionin tuaj personal palëve të treta pa pëlqimin tuaj. Ne mund të ndajmë informacionin tuaj në situatat e mëposhtme:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            <span style={styles.emphasis}>Me Fermerët dhe Konsumatorët:</span> Për të lehtësuar transaksionet në platformë, ne ndajmë informacionin e nevojshëm midis fermerëve dhe konsumatorëve (p.sh., emri, informacioni i kontaktit, detajet e kërkesës).
                        </li>
                        <li style={styles.listItem}>
                            <span style={styles.emphasis}>Me Ofruesit e Shërbimeve:</span> Ne mund të angazhojmë kompani dhe individë të tretë për të kryer shërbime në emrin tonë (p.sh., analiza, përpunimi i pagesave, shërbimet e emailit).
                        </li>
                        <li style={styles.listItem}>
                            <span style={styles.emphasis}>Për Përputhshmërinë Ligjore:</span> Ne mund të zbulojmë informacionin tuaj kur jemi të detyruar me ligj ose në përgjigje të proceseve të vlefshme ligjore.
                        </li>
                        <li style={styles.listItem}>
                            <span style={styles.emphasis}>Për Mbrojtjen:</span> Ne mund të ndajmë informacione për të mbrojtur të drejtat, pronën ose sigurinë e platformës sonë, përdoruesve tanë ose të tjerëve.
                        </li>
                    </ul>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>5. Sigurinë e të Dhënave</h2>
                    <p style={styles.paragraph}>
                        Ne zbatojmë masa të arsyeshme sigurie për të mbrojtur informacionin tuaj personal nga humbja, keqpërdorimi dhe aksesi i paautorizuar. Këto masa përfshijnë:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Enkriptimin e të dhënave të ndjeshme si fjalëkalimet</li>
                        <li style={styles.listItem}>Protokollet SSL për transmetimin e sigurt të të dhënave</li>
                        <li style={styles.listItem}>Akses të kufizuar për të dhënat personale vetëm për personelin e autorizuar</li>
                        <li style={styles.listItem}>Përditësime dhe vlerësime të rregullta të sistemeve tona të sigurisë</li>
                    </ul>
                    <p style={styles.paragraph}>
                        Megjithatë, asnjë metodë e transmetimit të internetit ose ruajtjes elektronike nuk është 100% e sigurt. Ndërsa përpiqemi të përdorim mjete të përshtatshme për të mbrojtur informacionin tuaj personal, ne nuk mund të garantojmë sigurinë absolute të tij.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>6. Të Drejtat Tuaja të Privatësisë</h2>
                    <p style={styles.paragraph}>
                        Ju keni të drejta të caktuara në lidhje me informacionin tuaj personal, përfshirë:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Të drejtën për të aksesuar informacionin tuaj personal që ne mbajmë</li>
                        <li style={styles.listItem}>Të drejtën për të korrigjuar informacionin e pasaktë</li>
                        <li style={styles.listItem}>Të drejtën për të fshirë të dhënat tuaja personale (në rrethana të caktuara)</li>
                        <li style={styles.listItem}>Të drejtën për të kufizuar përpunimin e të dhënave tuaja</li>
                        <li style={styles.listItem}>Të drejtën për të kundërshtuar përpunimin e të dhënave tuaja</li>
                        <li style={styles.listItem}>Të drejtën për të tërhequr pëlqimin në çdo kohë</li>
                    </ul>
                    <p style={styles.paragraph}>
                        Për të ushtruar ndonjë nga këto të drejta, ju lutemi na kontaktoni duke përdorur detajet e kontaktit të dhëna në fund të kësaj politike.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>7. Ruajtja e të Dhënave</h2>
                    <p style={styles.paragraph}>
                        Ne do të ruajmë informacionin tuaj personal vetëm për aq kohë sa është e nevojshme për qëllimet e përcaktuara në këtë politikë privatësie, ose siç kërkohet për të përmbushur detyrimet tona ligjore.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>8. Cookies dhe Teknologjitë e Ngjashme</h2>
                    <p style={styles.paragraph}>
                        Platforma jonë përdor cookies dhe teknologji të ngjashme për të përmirësuar përvojën tuaj të përdorimit. Cookies janë skedarë të vegjël teksti që vendosen në pajisjen tuaj kur vizitoni faqen tonë të internetit.
                    </p>
                    <p style={styles.paragraph}>
                        Ne përdorim cookies për qëllimet e mëposhtme:
                    </p>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>Të mundësojmë funksionalitetin thelbësor të platformës</li>
                        <li style={styles.listItem}>Të kujtojmë preferencat tuaja</li>
                        <li style={styles.listItem}>Të analizojmë se si përdorni platformën për ta përmirësuar atë</li>
                    </ul>
                    <p style={styles.paragraph}>
                        Ju mund të kontrolloni përdorimin e cookies përmes cilësimeve të shfletuesit tuaj. Megjithatë, çaktivizimi i cookies mund të ndikojë në funksionalitetin e platformës.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>9. Fëmijët dhe Privatësia</h2>
                    <p style={styles.paragraph}>
                        Platforma jonë nuk është e destinuar për fëmijët nën moshën 16 vjeç dhe ne nuk mbledhim me vetëdije informacion personal nga fëmijët nën 16 vjeç. Nëse jeni prind ose kujdestar dhe besoni se fëmija juaj na ka dhënë informacion personal, ju lutemi na kontaktoni dhe ne do të marrim masa për të hequr këtë informacion.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>10. Ndryshimet në Politikën e Privatësisë</h2>
                    <p style={styles.paragraph}>
                        Ne mund të përditësojmë këtë politikë privatësie herë pas here. Ndryshimet do të hyjnë në fuqi menjëherë pas publikimit të politikës së përditësuar në platformë. Ne ju inkurajojmë të rishikoni rregullisht këtë politikë për të qenë të informuar për mënyrën se si mbrojmë informacionin tuaj.
                    </p>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>11. Na Kontaktoni</h2>
                    <p style={styles.paragraph}>
                        Nëse keni pyetje ose shqetësime lidhur me këtë politikë privatësie, ju lutemi na kontaktoni:
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
                                    <Link to="/terms" style={styles.footerLink}
                                          onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                                          onMouseLeave={(e) => (e.target.style.color = '#72b584')}>
                                        Kushtet e Përdorimit
                                    </Link>
                                </li>
                                <li style={styles.footerListItem}>
                                    <Link to="/privacy" style={{...styles.footerLink, color: '#ffffff'}}
                                          onMouseLeave={(e) => (e.target.style.color = '#ffffff')}>
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