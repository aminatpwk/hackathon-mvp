import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ShoppingBag, X } from 'lucide-react';
import {Link, useNavigate} from "react-router-dom";

const mockProducts = [
    {
        id: 1,
        name: "Perime Organike",
        description: "Të rritura në mënyrë organike pa pesticide",
        price: 250,
        unit: "kg",
        image: "vegetable-placeholder.jpg",
        category: "Vegetables",
        city: "Korçë"
    },
    {
        id: 2,
        name: "Mjaltë Lulesh",
        description: "Mjaltë natyrale nga bletarët vendas",
        price: 800,
        unit: "500g",
        image: "honey-placeholder.jpg",
        category: "Honey",
        city: "Vlorë"
    },
    {
        id: 3,
        name: "Vaj Ulliri Extra i Virgjër",
        description: "Vaj cilësor nga ullishtat e jugut",
        price: 1200,
        unit: "liter",
        image: "olive-oil-placeholder.jpg",
        category: "Oils",
        city: "Sarandë"
    },
    {
        id: 4,
        name: "Djathë i Bardhë",
        description: "Djathë tradicional nga fermerët malësorë",
        price: 600,
        unit: "kg",
        image: "cheese-placeholder.jpg",
        category: "Dairy",
        city: "Shkodër"
    },
    {
        id: 5,
        name: "Mollë të Freskëta",
        description: "Mollë të kultivuara në klimën e freskët malore",
        price: 180,
        unit: "kg",
        image: "apple-placeholder.jpg",
        category: "Fruits",
        city: "Korçë"
    },
    {
        id: 6,
        name: "Verë Shtëpie",
        description: "Verë e prodhuar nga rrushi vendor",
        price: 800,
        unit: "750ml",
        image: "wine-placeholder.jpg",
        category: "Beverages",
        city: "Berat"
    },
    {
        id: 7,
        name: "Domate të Kuqe",
        description: "Domate të freskëta dhe të shijshme",
        price: 200,
        unit: "kg",
        image: "tomato-placeholder.jpg",
        category: "Vegetables",
        city: "Fier"
    },
    {
        id: 8,
        name: "Raki Rrushi",
        description: "Raki tradicionale shqiptare",
        price: 1500,
        unit: "750ml",
        image: "raki-placeholder.jpg",
        category: "Beverages",
        city: "Gjirokastër"
    }
];

const allCities = [...new Set(mockProducts.map(product => product.city))];
const allCategories = [...new Set(mockProducts.map(product => product.category))];

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const navigate = useNavigate();
    const styles = {
        container: {
            backgroundColor: '#f4f4f4',
            minHeight: '100vh',
        },
        header: {
            backgroundColor: '#235e3a',
            color: '#ffffff',
            padding: '80px 20px 40px',
            textAlign: 'center',
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
            margin: '0 auto 32px',
        },
        searchContainer: {
            display: 'flex',
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
        },
        searchInput: {
            flex: '1',
            padding: '12px 16px 12px 40px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        searchIcon: {
            position: 'absolute',
            left: '12px',
            top: '12px',
            color: '#666666',
        },
        filterButton: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#72b584',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '0 16px',
            marginLeft: '8px',
            cursor: 'pointer',
            fontWeight: '500',
        },
        filterContainer: {
            backgroundColor: '#ffffff',
            padding: '24px',
            margin: '16px auto',
            maxWidth: '900px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        filterTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#333333',
            marginBottom: '16px',
        },
        filterRow: {
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '16px',
        },
        filterGroup: {
            flex: '1',
        },
        filterLabel: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333333',
            marginBottom: '8px',
        },
        filterSelect: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
        },
        filterActions: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
        },
        button: {
            padding: '10px 16px',
            borderRadius: '4px',
            fontWeight: '500',
            cursor: 'pointer',
            border: 'none',
        },
        resetButton: {
            backgroundColor: '#f4f4f4',
            color: '#333333',
        },
        applyButton: {
            backgroundColor: '#235e3a',
            color: '#ffffff',
        },
        mainContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '32px 16px',
        },
        activeFilters: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '24px',
        },
        filterBadge: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#dbe5ea',
            color: '#235e3a',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '14px',
        },
        removeFilter: {
            marginLeft: '8px',
            cursor: 'pointer',
        },
        productsGrid: {
            display: 'grid',
            gridTemplateColumns: isDesktop
                ? 'repeat(auto-fill, minmax(270px, 1fr))'
                : 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '24px',
        },
        productCard: {
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
        },
        productCardHover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        productImage: {
            height: '180px',
            backgroundColor: '#dbe5ea',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
        productContent: {
            padding: '16px',
        },
        productCategory: {
            fontSize: '12px',
            color: '#72b584',
            textTransform: 'uppercase',
            fontWeight: '500',
            marginBottom: '8px',
        },
        productLocation: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            color: '#666666',
            marginBottom: '8px',
        },
        productTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#333333',
            marginBottom: '8px',
        },
        productDescription: {
            fontSize: '14px',
            color: '#666666',
            marginBottom: '16px',
        },
        productPrice: {
            fontSize: '18px',
            fontWeight: '700',
            color: '#235e3a',
        },
        productUnit: {
            fontSize: '14px',
            color: '#666666',
        },
        noResults: {
            textAlign: 'center',
            padding: '40px 0',
            color: '#666666',
        },
        noResultsIcon: {
            margin: '0 auto 16px',
            color: '#72b584',
        },
        noResultsTitle: {
            fontSize: '20px',
            fontWeight: '600',
            color: '#333333',
            marginBottom: '8px',
        },
        noResultsText: {
            fontSize: '16px',
            color: '#666666',
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
    };

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
    }, []);

    useEffect(() => {
        let result = [...products];

        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCity) {
            result = result.filter(product => product.city === selectedCity);
        }

        if (selectedCategory) {
            result = result.filter(product => product.category === selectedCategory);
        }

        setFilteredProducts(result);
    }, [products, searchTerm, selectedCity, selectedCategory]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleResetFilters = () => {
        setSelectedCity('');
        setSelectedCategory('');
    };

    const removeFilter = (filterType) => {
        if (filterType === 'city') {
            setSelectedCity('');
        } else if (filterType === 'category') {
            setSelectedCategory('');
        }
    };

    const [hoveredProductId, setHoveredProductId] = useState(null);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={() => navigate('/merrbio')} style = {{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: 0
                }}>
                    ← Kthehu
                </button>

                <h1 style={styles.title}>Produktet Tona</h1>
                <p style={styles.subtitle}>
                    Zgjidhni produktet më të mira bujqësore nga fermerët vendas shqiptarë
                </p>

                <div style={styles.searchContainer}>
                    <Search size={20} style={styles.searchIcon}/>
                    <input type="text" placeholder="Kërko produkte..." style={styles.searchInput} value={searchTerm} onChange={handleSearch}/>
                    <button
                        style={styles.filterButton}
                        onClick={() => setShowFilters(!showFilters)}>
                        <Filter size={20} style={{marginRight: '8px'}}/>
                        Filtro
                    </button>
                </div>
            </header>

            {showFilters && (
                <div style={styles.filterContainer}>
                    <h2 style={styles.filterTitle}>Filtro Produktet</h2>
                    <div style={styles.filterRow}>
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}>Qyteti</label>
                            <select style={styles.filterSelect} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                                <option value="">Të gjitha qytetet</option>
                                {allCities.map(city => (
                                    <option key={city} value={city}>{city}</option>))}
                            </select>
                        </div>

                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}>Kategoria</label>
                            <select
                                style={styles.filterSelect}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Të gjitha kategoritë</option>
                                {allCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={styles.filterActions}>
                        <button
                            style={{...styles.button, ...styles.resetButton}}
                            onClick={handleResetFilters}
                        >
                            Reseto
                        </button>
                        <button
                            style={{...styles.button, ...styles.applyButton}}
                            onClick={() => setShowFilters(false)}
                        >
                            Apliko Filtrat
                        </button>
                    </div>
                </div>
            )}

            <main style={styles.mainContent}>
                {(selectedCity || selectedCategory) && (
                    <div style={styles.activeFilters}>
                        <span>Filtra aktive:</span>
                        {selectedCity && (
                            <div style={styles.filterBadge}>
                                Qyteti: {selectedCity}
                                <X size={14} style={styles.removeFilter} onClick={() => removeFilter('city')}/>
                            </div>
                        )}

                        {selectedCategory && (
                            <div style={styles.filterBadge}>
                                Kategoria: {selectedCategory}
                                <X size={14} style={styles.removeFilter} onClick={() => removeFilter('category')}/>
                            </div>
                        )}
                    </div>
                )}

                {filteredProducts.length > 0 ? (
                    <div style={styles.productsGrid}>
                        {filteredProducts.map(product => (
                            <div key={product.id}
                                style={{
                                    ...styles.productCard,
                                    ...(hoveredProductId === product.id ? styles.productCardHover : {})
                                }}
                                onMouseEnter={() => setHoveredProductId(product.id)}
                                onMouseLeave={() => setHoveredProductId(null)}>
                                <div style={{
                                        ...styles.productImage,
                                        // backgroundImage: `url(${product.image})`
                                    }}/>
                                <div style={styles.productContent}>
                                    <div style={styles.productCategory}>{product.category}</div>
                                    <div style={styles.productLocation}>
                                        <span>🌍 {product.city}</span>
                                    </div>
                                    <h3 style={styles.productTitle}>{product.name}</h3>
                                    <p style={styles.productDescription}>{product.description}</p>
                                    <div>
                                        <span style={styles.productPrice}>{product.price} ALL</span>
                                        <span style={styles.productUnit}> / {product.unit}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.noResults}>
                        <ShoppingBag size={48} style={styles.noResultsIcon}/>
                        <h3 style={styles.noResultsTitle}>Nuk u gjetën produkte</h3>
                        <p style={styles.noResultsText}>
                            Ju lutemi provoni kritere të tjera kërkimi ose zgjidhi filtrat
                        </p>
                    </div>
                )}
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