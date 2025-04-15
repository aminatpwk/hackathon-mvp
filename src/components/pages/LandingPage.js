import React, { useState } from 'react';
import { Menu, X, ChevronDown, Tractor, Sun, Users, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import background from '../../assets/background.jpg';
import perime from '../../assets/perime_organike2.jpg';
import mjalti from '../../assets/mjalti.jpg';
import ullinjte from '../../assets/ulliri.jpg';
import aboutusimage from '../../assets/rreth_neth_background.jpg';

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
    },
    section: {
        padding: '48px 16px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    sectionGreen: {
        backgroundColor: '#235e3a',
        color: '#dbe5ea',
        padding: '48px 16px',
    },
    sectionWhite: {
        backgroundColor: '#ffffff',
        padding: '48px 16px',
    },
    sectionLightGray: {
        backgroundColor: '#f4f4f4',
        padding: '48px 16px',
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '24px',
        marginTop: '48px',
    },
    gridDesktop: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
        marginTop: '48px',
    },
    nav: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        position: 'absolute',
        width: '100%',
        zIndex: 10,
    },
    navContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    navLinksDesktop: {
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
    },
    navLink: {
        padding: '8px 12px',
        borderRadius: '4px',
        fontWeight: '500',
        color: '#ffffff',
        textDecoration: 'none',
        transition: 'color 0.3s ease, transform 0.2s ease',
    },
    loginButton: {
        backgroundColor: '#72b584',
        color: '#ffffff',
        padding: '8px 16px',
        borderRadius: '6px',
        fontWeight: '500',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease, transform 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    mobileMenuButton: {
        color: '#dbe5ea',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    mobileMenu: {
        backgroundColor: '#295e47',
        padding: '8px 0 12px',
    },
    mobileMenuItem: {
        padding: '8px 12px',
        borderRadius: '4px',
        display: 'block',
        color: '#ffffff',
        textDecoration: 'none',
        margin: '4px 8px',
        transition: 'background-color 0.3s ease',
    },
    hero: {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#235e3a',
        color: '#ffffff',
        textAlign: 'center',
        padding: '96px 16px',
        position: 'relative',
        maxHeight: '800px',
    },
    heroContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        maxHeight: '800px',
    },
    heroTitle: {
        fontSize: '36px',
        fontWeight: '800',
        marginBottom: '16px',
    },
    heroSubtitle: {
        fontSize: '20px',
        color: '#dbe5ea',
        marginBottom: '40px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
    },
    primaryButton: {
        backgroundColor: '#72b584',
        color: '#ffffff',
        padding: '12px 32px',
        borderRadius: '6px',
        fontSize: '18px',
        fontWeight: '500',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease, transform 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
    },
    secondaryButton: {
        backgroundColor: '#ffffff',
        color: '#235e3a',
        padding: '12px 32px',
        borderRadius: '6px',
        fontSize: '18px',
        fontWeight: '500',
        border: '2px solid #235e3a',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease, transform 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
    },
    featureCard: {
        backgroundColor: '#f4f4f4',
        padding: '24px',
        borderRadius: '8px',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    featureIcon: {
        backgroundColor: '#dbe5ea',
        color: '#235e3a',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 16px',
        transition: 'transform 0.3s ease',
    },
    featureTitle: {
        fontSize: '20px',
        fontWeight: '500',
        color: '#333333',
        marginBottom: '8px',
    },
    featureDescription: {
        color: '#666666',
    },
    productCard: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    productImage: {
        height: '192px',
        backgroundColor: '#dbe5ea',
    },
    productContent: {
        padding: '24px',
    },
    productTitle: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#333333',
        marginBottom: '4px',
    },
    productDescription: {
        color: '#666666',
        marginBottom: '16px',
    },
    productLink: {
        color: '#72b584',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        border: 'none',
        background: 'none',
        transition: 'color 0.3s ease',
    },
    aboutGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        marginTop: '48px',
    },
    aboutGridDesktop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '32px',
        marginTop: '48px',
    },
    aboutImage: {
        height: '256px',
        backgroundColor: '#dbe5ea',
        borderRadius: '8px',
        flex: '1',
    },
    aboutContent: {
        flex: '1',
    },
    aboutTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: '16px',
    },
    aboutText: {
        color: '#666666',
        marginBottom: '16px',
    },
    aboutStat: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '24px',
    },
    aboutStatIcon: {
        backgroundColor: '#dbe5ea',
        color: '#235e3a',
        padding: '8px',
        borderRadius: '50%',
        marginRight: '12px',
    },
    aboutStatText: {
        color: '#333333',
        fontWeight: '500',
    },
    footer: {
        backgroundColor: '#1a472d',
        color: '#ffffff',
        padding: '32px 16px',
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
    showMoreSection:{
        padding: '16px',
        backgroundColor: '#fafafa',
        borderTop: '1px solid #e0e0e0',
        fontSize: '14px',
        color: '#333333',
    },
    showMoreTitle: {
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: '8px',
        color: '#235e3a',
    },
    showMoreText: {
        color: '#666666',
        marginBottom: '12px',
    },
    priceInfo: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#72b584',
        marginBottom: '12px',
    },
    review: {
        borderTop: '1px solid #e0e0e0',
        paddingTop: '12px',
        marginTop: '12px',
    },
    reviewText: {
        fontStyle: 'italic',
        color: '#666666',
    },
};

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const showMoreVariants = {
    hidden: {height: 0, opacity: 0},
    visible: {height: 'auto', opacity: 1, transition: {duration: 0.3, ease: 'easeOut'}},
};

export default function LandingPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const navigate = useNavigate();

    const [openProduct, setOpenProduct] = useState(null);
    const toggleShowMore = (index) => {
        setOpenProduct(openProduct === index ? null : index);
    };

    const products = [
        {
            img: perime,
            title: 'Perime Organike',
            desc: 'Të rritura në mënyrë organike nga fermerët vendas në Korçë',
            details: {
                description: 'Këto perime organike përfshijnë domate, kastraveca dhe speca, të kultivuara pa pesticide në fushat e Korçës.',
                price: '€3/kg',
                review: { text: 'Perime fantastike, shije e vërtetë! – Ana, Korçë', rating: 4.5 },
            },
        },
        {
            img: mjalti,
            title: 'Mjaltë Shqiptare',
            desc: 'Mjaltë natyrale nga bletarët e Vlorës dhe Beratit',
            details: {
                description: 'Mjaltë 100% natyrale, e mbledhur nga lulet e egra të maleve të Vlorës dhe Beratit.',
                price: '€8/500g',
                review: { text: 'Shija më e mirë e mjaltës që kam provuar! – Sokol, Tiranë', rating: 5 },
            },
        },
        {
            img: ullinjte,
            title: 'Vaj Ulliri',
            desc: 'Vaj ulliri ekstra i virgjër nga ullishtat e jugut të Shqipërisë',
            details: {
                description: 'Vaj ulliri i shtrydhur ftohtë, i prodhuar nga ullinjtë e varietetit Kalinjot në Himarë.',
                price: '€12/L',
                review: { text: 'Vaj i mrekullueshëm për sallata! – Ema, Durrës', rating: 4.8 },
            },
        },
    ];

    const updateMedia = () => {
        setIsDesktop(window.innerWidth >= 768);
    };

    React.useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    return (
        <div style={styles.container}>
            <nav style={styles.nav}>
                <div style={styles.navContent}>
                    <div style={styles.logo}>MerrBio</div>
                    {isDesktop ? (
                        <div style={styles.navLinksDesktop}>
                            <a href="#products" style={styles.navLink}
                               onMouseEnter={(e) => (e.target.style.color = '#72b584')}
                               onMouseLeave={(e) => (e.target.style.color = '#ffffff')}>
                                Produktet
                            </a>
                            <a href="#about" style={styles.navLink}
                               onMouseEnter={(e) => (e.target.style.color = '#72b584')}
                               onMouseLeave={(e) => (e.target.style.color = '#ffffff')}>
                                Rreth Nesh
                            </a>
                            <button
                                style={styles.loginButton}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#bdb627';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#72b584';
                                    e.target.style.transform = 'scale(1)';
                                }}
                                onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
                                onMouseUp={(e) => (e.target.style.transform = 'scale(1.05)')}
                                onClick = {() => navigate('/hyr')}>
                                Hyr
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={styles.mobileMenuButton}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {!isDesktop && isMobileMenuOpen && (
                        <motion.div
                            style={styles.mobileMenu}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}>
                            <a href="#products" style={styles.mobileMenuItem}
                               onClick={() => setIsMobileMenuOpen(false)}
                               onMouseEnter={(e) => (e.target.style.backgroundColor = '#72b584')}
                               onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}>
                                Produktet
                            </a>
                            <a href="#about" style={styles.mobileMenuItem}
                               onClick={() => setIsMobileMenuOpen(false)}
                               onMouseEnter={(e) => (e.target.style.backgroundColor = '#72b584')}
                               onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}>
                                Rreth Nesh
                            </a>
                            <button
                                style={{ ...styles.mobileMenuItem, ...styles.loginButton }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#bdb627')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#72b584')}>
                                Hyr
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <motion.div
                style={styles.hero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}>
                <div style={styles.heroContent}>
                    <motion.h1
                        style={styles.heroTitle}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}>
                        Lidhja Juaj me Bujqësinë Shqiptare
                    </motion.h1>
                    <motion.p
                        style={styles.heroSubtitle}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}>
                        Produktet më të mira bujqësore nga fermerët vendas për konsumatorët shqiptarë
                    </motion.p>
                    <div style={styles.buttonContainer}>
                        <motion.button
                            style={styles.primaryButton}
                            whileHover={{ scale: 1.05, backgroundColor: '#bdb627' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/products')}>
                            Shiko Produktet
                        </motion.button>
                        <motion.button
                            style={styles.secondaryButton}
                            whileHover={{ scale: 1.05, backgroundColor: '#f4f4f4' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}>
                            Bëhu Anëtar
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <motion.div
                style={styles.sectionWhite}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}>
                <div style={styles.section}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#333333', marginBottom: '16px' }}>
                            Pse të zgjidhni MerrBio?
                        </h2>
                        <p style={{ fontSize: '20px', color: '#666666', maxWidth: '768px', margin: '0 auto' }}>
                            Ne lidhim fermerët shqiptarë me konsumatorët për të siguruar produkte të freskëta dhe cilësore.
                        </p>
                    </div>

                    <div style={isDesktop ? styles.gridDesktop : styles.grid}>
                        {[
                            { icon: Tractor, title: 'Për Fermerët', desc: 'Tregoni produktet tuaja në një platformë të dedikuar dhe lidhuni drejtpërdrejt me konsumatorët.' },
                            { icon: ShoppingBag, title: 'Për Konsumatorët', desc: 'Blini produkte të freskëta dhe cilësore direkt nga fermerët vendas në zonën tuaj.' },
                            { icon: Sun, title: 'Bujqësi e Qëndrueshme', desc: 'Mbështesim praktikat e qëndrueshme bujqësore për të mbrojtur tokën dhe mjedisin tonë.' },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                style={styles.featureCard}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ transform: 'translateY(-8px)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
                                <motion.div
                                    style={styles.featureIcon}
                                    whileHover={{ transform: 'rotate(360deg)' }}
                                    transition={{ duration: 0.5 }}>
                                    <feature.icon size={32} />
                                </motion.div>
                                <h3 style={styles.featureTitle}>{feature.title}</h3>
                                <p style={styles.featureDescription}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                id="products"
                style={styles.sectionLightGray}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}>
                <div style={styles.section}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#333333', marginBottom: '16px' }}>
                            Produkte të Zgjedhura
                        </h2>
                        <p style={{ fontSize: '20px', color: '#666666', maxWidth: '768px', margin: '0 auto' }}>
                            Zbuloni produktet më të mira sezonale nga fermerët shqiptarë
                        </p>
                    </div>

                    <div style={isDesktop ? styles.gridDesktop : styles.grid}>
                        {products.map((product, index) => (
                            <motion.div
                                key={index}
                                style={styles.productCard}
                                variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ transform: 'translateY(-8px)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    style={{ ...styles.productImage, objectFit: 'cover', width: '100%' }}/>
                                <div style={styles.productContent}>
                                    <h3 style={styles.productTitle}>{product.title}</h3>
                                    <p style={styles.productDescription}>{product.desc}</p>
                                    <motion.button
                                        style={styles.productLink}
                                        whileHover={{ color: '#235e3a' }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleShowMore(index)}>
                                        {openProduct === index ? 'Fshih' : 'Shiko më shumë'} <ChevronDown size={16} />
                                    </motion.button>
                                </div>
                                <AnimatePresence>
                                    {openProduct === index && (
                                        <motion.div
                                            style={styles.showMoreSection}
                                            variants={showMoreVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden">
                                            <div style={styles.showMoreTitle}>Detaje Produkti</div>
                                            <p style={styles.showMoreText}>{product.details.description}</p>

                                            <div style={styles.priceInfo}>Çmimi: {product.details.price}</div>

                                            <div style={styles.review}>
                                                <div style={styles.showMoreTitle}>Vlerësim</div>
                                                <p style={styles.reviewText}>{product.details.review.text}</p>
                                                <p style={styles.showMoreText}>Vlerësimi: {product.details.review.rating}/5</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ ...styles.flexCenter, marginTop: '48px' }}>
                        <motion.button
                            style={styles.primaryButton}
                            whileHover={{ scale: 1.05, backgroundColor: '#bdb627' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/products')}>
                            Shiko të gjitha produktet
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <motion.div
                id="about"
                style={styles.sectionWhite}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}>
                <div style={styles.section}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#333333' }}>
                            Rreth Nesh
                        </h2>
                    </div>

                    <div style={isDesktop ? styles.aboutGridDesktop : styles.aboutGrid}>
                        <motion.img
                            src={aboutusimage}
                            alt="Rreth Nesh"
                            style={{ ...styles.aboutImage, objectFit: 'cover', width: '100%' }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}/>
                        <motion.div
                            style={styles.aboutContent}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}>
                            <h3 style={styles.aboutTitle}>Misioni Ynë</h3>
                            <p style={styles.aboutText}>
                                MerrBio është krijuar për të lidhur fermerët shqiptarë me konsumatorët, duke promovuar
                                bujqësinë e qëndrueshme dhe ekonominë lokale. Ne besojmë se çdo shqiptar meriton
                                produkte të freskëta dhe cilësore, dhe çdo fermer meriton një platformë për të shfaqur
                                punën e tij.
                            </p>
                            <p style={styles.aboutText}>
                                E nisur në vitin 2025, platforma jonë synon të mbulojë të gjithë Shqipërinë, duke
                                ndihmuar qindra fermerë të sheshin produktet e tyre dhe mijëra konsumatorë të blejnë
                                ushqime cilësore.
                            </p>
                            <div style={styles.aboutStat}>
                                <div style={styles.aboutStatIcon}>
                                    <Users size={24} />
                                </div>
                                <p style={styles.aboutStatText}>Mbi 500 fermerë të regjistruar</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                style={styles.sectionGreen}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}>
                <div style={{ ...styles.section, textAlign: 'center' }}>
                    <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
                        Gati për t'u bashkuar me MerrBio?
                    </h2>
                    <p style={{ fontSize: '20px', color: '#dbe5ea', maxWidth: '768px', margin: '0 auto 32px' }}>
                        Regjistrohuni sot për të filluar të shisni ose blini produktet më të mira bujqësore në Shqipëri
                    </p>
                    <div style={styles.flexCenter}>
                        <motion.button
                            style={styles.secondaryButton}
                            whileHover={{ scale: 1.05, backgroundColor: '#f4f4f4' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}>
                            Regjistrohu Tani
                        </motion.button>
                    </div>
                </div>
            </motion.div>

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