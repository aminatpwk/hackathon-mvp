import React, { useState, useEffect } from 'react';
import { Home, Package, MessageSquare, User, LogOut, Menu } from 'lucide-react';
import '../../styles/FarmerDashboard.css';
import { getProducts, addProduct, deleteProduct, updateProduct } from "../../services/api";
import Chart from 'chart.js/auto';
import {useNavigate} from 'react-router-dom';

function FarmerDashboard() {
    const [activeTab, setActiveTab] = useState('farmerdashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        emri: '',
        pershkrimi: '',
        cmimi: '',
        sasia: '',
        kategoria: '',
        origjina: ''
    });

    const navigate = useNavigate();

    const [greeting, setGreeting] = useState('');

    const handleInputChange = (e, isEditing = false) => {
        const { name, value } = e.target;
        if (isEditing) {
            setEditProduct({ ...editProduct, [name]: value });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewProduct({
            emri: '',
            pershkrimi: '',
            cmimi: '',
            sasia: '',
            kategoria: '',
            origjina: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddProduct({ ...newProduct });
        closeModal();
    };

    useEffect(() => {
        if (activeTab === 'products' || activeTab === 'farmerdashboard') {
            fetchProducts();
        }
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Miremengjes! :)');
        else if (hour < 18) setGreeting('Pershendetje! :)');
        else setGreeting('Mirembrema! :)');
    }, [activeTab]);


    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
            setError(null);
        } catch (error) {
            setError("Failed to fetch products.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            await addProduct(newProduct);
            fetchProducts();
        } catch (err) {
            setError("Failed to add product.");
        }
    };

    const handleDeleteProduct = async (productId) => {
        setProductToDelete(productId);
        setIsConfirmDeleteModalOpen(true);
    };

    const confirmDeleteProduct = async () => {
        try {
            await deleteProduct(productToDelete);
            fetchProducts();
            setIsConfirmDeleteModalOpen(false);
        } catch (error) {
            setError("Failed to delete product.");
            console.error(error);
            setIsConfirmDeleteModalOpen(false);
        }
    };

    const cancelDeleteProduct = () => {
        setIsConfirmDeleteModalOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const openEditModal = (product) => {
        setEditProduct(product);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditProduct(null);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(editProduct.product_id, editProduct);
            fetchProducts();
            closeEditModal();
        } catch (err) {
            setError("Could not update product.");
            console.error(err);
        }
    };

    useEffect(() => {
        if (activeTab === 'farmerdashboard' && products.length > 0 && !loading) {
            const ctx = document.getElementById('categoryChart')?.getContext('2d');
            if (!ctx) return;

            const categories = ['Fruta', 'Perime', 'Drithëra', 'Bulmet'];
            const categoryCounts = categories.map(
                (cat) => products.filter((p) => p.kategoria === cat).length
            );

            if (window.categoryChart instanceof Chart) {
                window.categoryChart.destroy();
            }

            window.categoryChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: categories,
                    datasets: [{
                        label: 'Kategoria',
                        data: categoryCounts,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1,
                    }],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Numri produkteve',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Kategoria',
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        }
    }, [products, loading, activeTab]);

    const totalProducts = products.length;
    const lowStock = products.filter((p) => p.sasia < 10).length;
    const totalInventoryValue = products.reduce(
        (sum, p) => sum + (p.cmimi * p.sasia || 0),
        0
    ).toFixed(2);

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="name">
                        <span className="text" onClick={() => setActiveTab('farmerdashboard')}>
                            MerrBio
                        </span>
                    </div>

                    <div className={`nav-links desktop-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                        <NavItem icon={<Home size={20} />} label="Kryefaqja" isActive={activeTab === 'farmerdashboard'}
                            onClick={() => {
                                setActiveTab('farmerdashboard');
                                setIsMobileMenuOpen(false);
                            }}/>
                        <NavItem icon={<Package size={20} />} label="Lista e Produkteve" isActive={activeTab === 'products'}
                            onClick={() => {
                                setActiveTab('products');
                                setIsMobileMenuOpen(false);
                            }}/>
                        <NavItem icon={<MessageSquare size={20} />} label="Kerkesat per blerje" isActive={activeTab === 'requests'}
                            onClick={() => {
                                setActiveTab('requests');
                                setIsMobileMenuOpen(false);}}/>
                        <NavItem icon={<LogOut size={20} />} label="Dil" isActive={false}
                            onClick={() => navigate('/merrbio')}/>
                    </div>

                    <div className="mobile-menu">
                        <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="main-content">
                <div className="content-container">
                    <h1 className="page-title">
                        {activeTab === 'farmerdashboard' && 'Kryefaqja'}
                        {activeTab === 'products' && 'Lista e Produkteve'}
                        {activeTab === 'requests' && 'Kerkesat per blerje'}
                    </h1>
                    <div className="content-box">
                        {activeTab === 'farmerdashboard' ? (
                            <div className="overview-section">
                                <h2 className="greeting">{greeting}</h2>
                                {loading ? (
                                    <p>Te dhenat po ngarkohen...</p>
                                ) : error ? (
                                    <p className="error">{error}</p>
                                ) : (
                                    <>
                                        <div className="overview-cards">
                                            <div className="overview-card">
                                                <h3>Sasia total e produkteve</h3>
                                                <p>{totalProducts}</p>
                                            </div>
                                            <div className="overview-card">
                                                <h3>Produktet nen sasine minimale</h3>
                                                <p>{lowStock} items</p>
                                            </div>
                                            <div className="overview-card">
                                                <h3>Vlera inventarit</h3>
                                                <p>{totalInventoryValue} ALL</p>
                                            </div>
                                        </div>
                                        <div className="chart-container">
                                            <h3>Statistikat</h3>
                                            <canvas id="categoryChart"></canvas>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : activeTab === 'products' ? (
                            <div className="products-section">
                                <div className="add-product-container">
                                    <button className="add-product-btn" onClick={openModal}>
                                        Shto Produkt te Ri
                                    </button>
                                </div>
                                {loading ? (
                                    <p>Te dhenat po ngarkohen...</p>
                                ) : (
                                    <table className="products-table">
                                        <thead>
                                        <tr>
                                            <th>Emri i produktit</th>
                                            <th>Pershkrimi</th>
                                            <th>Cmimi per Kg</th>
                                            <th>Sasia totale ne gjendje</th>
                                            <th>Kategoria</th>
                                            <th>Origjina e prodhimit</th>
                                            <th>Veprime</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {products.length > 0 ? (
                                            products.map((product) => (
                                                <tr key={product.product_id}>
                                                    <td data-label="Emri i produktit">{product.emri}</td>
                                                    <td data-label="Pershkrimi">{product.pershkrimi}</td>
                                                    <td data-label="Cmimi per kg">{product.cmimi}</td>
                                                    <td data-label="Sasia totale ne gjendje">{product.sasia}</td>
                                                    <td data-label="Kategoria">{product.kategoria}</td>
                                                    <td data-label="Origjina e prodhimit">{product.origjina}</td>
                                                    <td data-label="Veprime">
                                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                                            <button
                                                                className="update-btn"
                                                                onClick={() => openEditModal(product)}
                                                            >
                                                                Ndrysho
                                                            </button>
                                                            <button
                                                                className="delete-btn"
                                                                onClick={() => handleDeleteProduct(product.product_id)}
                                                            >
                                                                Fshi
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: 'center' }}>
                                                    Nuk ka produkte te regjistruara.
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        ) : (
                            <p className="placeholder-text">{activeTab}</p>
                        )}
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Shto Produkt te Ri</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Emri:
                                <input type="text" name="emri" value={newProduct.emri} onChange={handleInputChange} required/>
                            </label>
                            <label>
                                Pershkrimi:
                                <textarea name="pershkrimi" value={newProduct.pershkrimi} onChange={handleInputChange} required/>
                            </label>
                            <label>
                                Cmimi per Kg:
                                <input type="number" name="cmimi" value={newProduct.cmimi} onChange={handleInputChange} required/>
                            </label>
                            <label>
                                Sasia:
                                <input type="number" name="sasia" value={newProduct.sasia} onChange={handleInputChange} required/>
                            </label>
                            <label>
                                Kategoria:
                                <select name="kategoria" value={newProduct.kategoria} onChange={handleInputChange} required>
                                    <option value="">Zgjidh Kategorinë</option>
                                    <option value="Fruta">Fruta</option>
                                    <option value="Perime">Perime</option>
                                    <option value="Drithëra">Drithëra</option>
                                    <option value="Bulmet">Bulmet</option>
                                </select>
                            </label>
                            <label>
                                Origjina:
                                <select name="origjina" value={newProduct.origjina} onChange={handleInputChange} required>
                                    <option value="">Zgjidh Origjinën</option>
                                    <option value="Shqipëri">Shqipëri</option>
                                    <option value="Itali">Itali</option>
                                    <option value="Greqi">Greqi</option>
                                    <option value="Turqi">Turqi</option>
                                </select>
                            </label>
                            <button type="submit">Shto Produktin</button>
                            <button type="button" onClick={closeModal}>Mbyll</button>
                        </form>
                    </div>
                </div>
            )}

            {isConfirmDeleteModalOpen && (
                <div className="confirmation-modal">
                    <div className="confirmation-modal-content">
                        <h2>Fshirja e ketij produkti e ben ate te pakthyeshem.</h2>
                        <h3>Doni te vazhdoni me fshirjen?</h3>
                        <button onClick={confirmDeleteProduct}>Po, fshij produktin.</button>
                        <button onClick={cancelDeleteProduct}>Jo, anullo.</button>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Përditëso Produktin</h2>
                        <form onSubmit={handleUpdateProduct}>
                            <label>
                                Emri:
                                <input type="text"name="emri" value={editProduct.emri} onChange={(e) => handleInputChange(e, true)} required />
                            </label>
                            <label>
                                Pershkrimi:
                                <textarea name="pershkrimi" value={editProduct.pershkrimi} onChange={(e) => handleInputChange(e, true)} required/>
                            </label>
                            <label>
                                Cmimi per Kg:
                                <input type="number" name="cmimi" value={editProduct.cmimi} onChange={(e) => handleInputChange(e, true)} required/>
                            </label>
                            <label>
                                Sasia:
                                <input type="number" name="sasia" value={editProduct.sasia} onChange={(e) => handleInputChange(e, true)} required/>
                            </label>
                            <label>
                                Kategoria:
                                <select name="kategoria" value={editProduct.kategoria} onChange={(e) => handleInputChange(e, true)} required>
                                    <option value="">Zgjidh Kategorinë</option>
                                    <option value="Fruta">Fruta</option>
                                    <option value="Perime">Perime</option>
                                    <option value="Drithëra">Drithëra</option>
                                    <option value="Bulmet">Bulmet</option>
                                </select>
                            </label>
                            <label>
                                Origjina:
                                <select name="origjina" value={editProduct.origjina} onChange={(e) => handleInputChange(e, true)} required>
                                    <option value="">Zgjidh Origjinën</option>
                                    <option value="Shqipëri">Shqipëri</option>
                                    <option value="Itali">Itali</option>
                                    <option value="Greqi">Greqi</option>
                                    <option value="Turqi">Turqi</option>
                                </select>
                            </label>
                            <button type="submit">Ruaj Ndryshimet</button>
                            <button type="button" onClick={closeEditModal}>Anulo</button>
                        </form>
                    </div>
                </div>
            )}

            <footer className="footer">
                <div className="footer-content">
                    <p className="copyright">© {new Date().getFullYear()} MerrBio. Zhvilluar nga Amina.</p>
                </div>
            </footer>
        </div>
    );
}

function NavItem({ icon, label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
        >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
        </button>
    );
}

export default FarmerDashboard;