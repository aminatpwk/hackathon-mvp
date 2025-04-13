import React, {useState} from 'react';
import '../../styles/RegisterForm.css';
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

    const [errors, setErrors] = useState({});

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
            const response = await fetch('http://localhost/My%20projects/Portfolio%20site/merrbio-farmerdashboard/merrbio/php/api/register.php',{
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
        <div className = "register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Bashkohu ne MerrBio</h2>
                <div className="form-group">
                    <label htmlFor="emri">Emri juaj</label>
                    <input type="text" id="emri" name="emri" value={formData.emri} onChange={handleChange}
                           placeholder="Emri" className={errors.emri ? 'error-input' : ''}/>
                    {errors.emri && <span className="error-message">{errors.emri}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="mbiemri">Mbiemri juaj</label>
                    <input type="text" id="mbiemri" name="mbiemri" value={formData.mbiemri} onChange={handleChange}
                           placeholder="Mbiemri" className={errors.mbiemri ? 'error-input' : ''}/>
                    {errors.mbiemri && <span className="error-message">{errors.mbiemri}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="qyteti">Qyteti prej nga vini</label>
                    <input type="text" id="qyteti" name="qyteti" value={formData.qyteti} onChange={handleChange}
                           placeholder="Qyteti" className={errors.qyteti ? 'error-input' : ''}/>
                    {errors.qyteti && <span className="error-message">{errors.qyteti}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="roli">Roli juaj</label>
                    <select id="roli" name="roli" value={formData.roli} onChange={handleChange} className={errors.roli ? 'error-input' : ''}>
                        <option value="fermer">Fermer</option>
                        <option value="bleres">Bleres</option>
                    </select>
                    {errors.roli && <span className="error-message">{errors.roli}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                           placeholder="Jepni e-mail tuaj" className={errors.email ? 'error-input' : ''}/>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Nr kontakti</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                           placeholder="Jepni nje nr telefoni" className={errors.phone ? 'error-input' : ''}/>
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password}
                           onChange={handleChange}  placeholder="Vendosni nje password" className={errors.password ? 'error-input' : ''}/>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <button type="submit" className="submit-button">
                    Regjistrohu
                </button>
                {errors.success && <div className="success-message">{errors.success}</div>}
                {errors.error && <div className="error-message general-error">{errors.error}</div>}
            </form>
        </div>
    );
};

export default RegisterForm;