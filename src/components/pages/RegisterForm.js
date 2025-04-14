import React, {useState} from 'react';
// import '../../styles/RegisterForm.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 16px',
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: '30px',
        fontWeight: '800',
        color: '#333333',
        marginBottom: '24px',
    },
    formGroup: {
        marginBottom: '16px',
        textAlign: 'left',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#333333',
        marginBottom: '8px',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#dbe5ea',
        fontSize: '16px',
        color: '#333333',
        backgroundColor: '#fafafa',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    select: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#dbe5ea',
        fontSize: '16px',
        color: '#333333',
        backgroundColor: '#fafafa',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        appearance: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
    },
    errorInput: {
        borderColor: '#e74c3c',
    },
    errorMessage: {
        color: '#e74c3c',
        fontSize: '12px',
        marginTop: '4px',
        display: 'block',
    },
    successMessage: {
        color: '#72b584',
        fontSize: '14px',
        marginTop: '16px',
    },
    submitButton: {
        backgroundColor: '#42784e',
        color: '#ffffff',
        padding: '12px 32px',
        borderRadius: '6px',
        fontSize: '18px',
        fontWeight: '500',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease, transform 0.2s ease',
        width: '100%',
        marginTop: '16px',
    },
    loginLink: {
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
        width: '100%',
        marginTop: '16px',
        textAlign: 'center',
        display: 'inline-block',
        textDecoration: 'none',
    },
};

const RegisterForm = () =>{
    const [formData, setFormData] = useState({
        emri: '',
        mbiemri: '',
        qyteti: '',
        roli: 'fermer',
        email: '',
        phone: '',
        password: '',
    });

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!formData.emri) {
            newErrors.emri = 'Ju lutem vendosni emrin!';
        } else if (!/^[A-Za-z]{2,}$/.test(formData.emri)) {
            newErrors.emri = 'Emri duhet te jete te pakten dy karaktere dhe te mos perfshije numra apo shenja.';
        }

        if (!formData.mbiemri) {
            newErrors.mbiemri = 'Ju lutem vendosni mbiemrin!';
        } else if (!/^[A-Za-z]{2,}$/.test(formData.mbiemri)) {
            newErrors.mbiemri = 'Mbiemri duhet te jete te pakten dy karaktere dhe te mos perfshije numra apo shenja.';
        }

        if (!formData.qyteti) {
            newErrors.qyteti = 'Ju lutem vendosni qytetin!';
        } else if (!/^[A-Za-z\s]{2,}$/.test(formData.qyteti)) {
            newErrors.qyteti = 'Qyteti duhet te jete te pakten dy karaktere i gjate.';
        }

        if (!['fermer', 'bleres'].includes(formData.roli)) {
            newErrors.roli = 'Ju lutem specifikoni rolin tuaj!';
        }

        if (!formData.email) {
            newErrors.email = 'Ju lutem vendosni e-mail!';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'E-mail nuk eshte ne formatin e duhur.';
        }

        if (!formData.phone) {
            newErrors.phone = 'Ju lutem vendosni nje numer kontakti!';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
            newErrors.phone = 'Numri i telefonit duhet te jete me 10 numra.';
        }

        if (!formData.password) {
            newErrors.password = 'Ju lutem vendosni fjalekalimin!';
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
            newErrors.password = 'Password duhet te jete te pakten 8 karaktere i gjate dhe te perfshije te pakten nje shkronje ose nje numer.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try{
            const response = await fetch('http://localhost/My%20projects/hackathon-fti2025/php/api/register.php',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if(response.ok){
                setFormData({
                    emri: '',
                    mbiemri: '',
                    qyteti: '',
                    roli: 'fermer',
                    email: '',
                    phone: '',
                    password: '',
                });
                setErrors({ success: result.success || 'Regjistrimi u krye me sukses!' });
            }else{
                setErrors(result.errors || { error: result.error || 'Regjistrimi nuk mund te kryhej :(' });
            }
        }catch(error){
            setErrors({ error: 'Gabim, ju lutem provoni perseri.' });
        }
    };

    return (
        <div style={styles.container}>
            <button onClick={() => navigate('/merrbio')} style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'none',
                border: 'none',
                color: '#286506',
                cursor: 'pointer',
                fontSize: '16px',
                padding: 0}}>
                ← Kthehu
            </button>
            <motion.form style={styles.form} onSubmit={handleSubmit} variants={formVariants} initial="hidden" animate="visible">
                <h2 style={styles.title}>Bashkohu në MerrBio</h2>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="emri">Emri juaj</label>
                    <input
                        type="text"
                        id="emri"
                        name="emri"
                        value={formData.emri}
                        onChange={handleChange}
                        placeholder="Emri"
                        style={{...styles.input, ...(errors.emri ? styles.errorInput : {})}}
                        onFocus={(e) => (e.target.style.borderColor = '#72b584')}
                        onBlur={(e) => (e.target.style.borderColor = errors.emri ? '#e74c3c' : '#dbe5ea')}/>
                    {errors.emri && <span style={styles.errorMessage}>{errors.emri}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="mbiemri">Mbiemri juaj</label>
                    <input
                        type="text"
                        id="mbiemri"
                        name="mbiemri"
                        value={formData.mbiemri}
                        onChange={handleChange}
                        placeholder="Mbiemri"
                        style={{...styles.input, ...(errors.mbiemri ? styles.errorInput : {})}}
                        onFocus={(e) => (e.target.style.borderColor = '#72b584')}
                        onBlur={(e) => (e.target.style.borderColor = errors.mbiemri ? '#e74c3c' : '#dbe5ea')}/>
                    {errors.mbiemri && <span style={styles.errorMessage}>{errors.mbiemri}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="qyteti">Qyteti prej nga vini</label>
                    <input
                        type="text"
                        id="qyteti"
                        name="qyteti"
                        value={formData.qyteti}
                        onChange={handleChange}
                        placeholder="Qyteti"
                        style={{...styles.input, ...(errors.qyteti ? styles.errorInput : {})}}
                        onFocus={(e) => (e.target.style.borderColor = '#72b584')}
                        onBlur={(e) => (e.target.style.borderColor = errors.qyteti ? '#e74c3c' : '#dbe5ea')}/>
                    {errors.qyteti && <span style={styles.errorMessage}>{errors.qyteti}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="roli">Roli juaj</label>
                    <select
                        id="roli"
                        name="roli"
                        value={formData.roli}
                        onChange={handleChange}
                        style={{...styles.select, ...(errors.roli ? styles.errorInput : {})}}
                        onFocus={(e) => (e.target.style.borderColor = '#72b584')}
                        onBlur={(e) => (e.target.style.borderColor = errors.roli ? '#e74c3c' : '#dbe5ea')}>
                        <option value="fermer">Fermer</option>
                        <option value="bleres">Blerës</option>
                    </select>
                    {errors.roli && <span style={styles.errorMessage}>{errors.roli}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Jepni e-mail tuaj"
                        style={{...styles.input, ...(errors.email ? styles.errorInput : {})}}
                        onFocus={(e) => (e.target.style.borderColor = '#72b584')}
                        onBlur={(e) => (e.target.style.borderColor = errors.email ? '#e74c3c' : '#dbe5ea')}/>
                    {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="phone">Nr kontakti</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Jepni një nr telefoni"
                        style={{...styles.input, ...(errors.phone ? styles.errorInput : {})}}
                        onFocus={(e) => (e.target.style.borderColor = '#72b584')}
                        onBlur={(e) => (e.target.style.borderColor = errors.phone ? '#e74c3c' : '#dbe5ea')}/>
                    {errors.phone && <span style={styles.errorMessage}>{errors.phone}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="password">Fjalëkalimi</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Vendosni një fjalëkalim"
                        style={{...styles.input, ...(errors.password ? styles.errorInput : {})}}
                        onFocus={(e) => (e.target.style.borderColor = '#72b584')}
                        onBlur={(e) => (e.target.style.borderColor = errors.password ? '#e74c3c' : '#dbe5ea')}/>
                    {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
                </div>

                <motion.button type="submit" style={styles.submitButton}
                               whileHover={{scale: 1.05, backgroundColor: '#bdb627'}} whileTap={{scale: 0.95}}>
                    Regjistrohu
                </motion.button>
                {errors.success && <div style={styles.successMessage}>{errors.success}</div>}
                {errors.error && <div style={styles.errorMessage}>{errors.error}</div>}

                <motion.div
                    whileHover={{scale: 1.05, backgroundColor: '#f4f4f4'}}
                    whileTap={{scale: 0.95}}>
                    <a href="#" style={styles.loginLink} onClick={(e) => {
                        e.preventDefault();
                        // navigate('/login');
                    }}>
                        Hyr
                    </a>
                </motion.div>
            </motion.form>
        </div>
    );
};

export default RegisterForm;