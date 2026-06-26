import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await register(form.name, form.email, form.password, form.password_confirmation);
            navigate('/dashboard');
            // } catch (err) {
            //     const data = err.response?.data;
            //     if (data?.errors) {
            //         setErrors(data.errors);
            //     } else {
            //         setErrors({ general: data?.message || 'Kuch galat hua, dobara try karein.' });
            //     }
            // } finally {
        } catch (err) {
            const data = err.data;

            if (data?.errors) {
                setErrors(data.errors);
            } else {
                setErrors({
                    general: data?.message || "Kuch galat hua, dobara try karein.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">⚡</div>
                    <h1>Account banayein</h1>
                    <p>Shuru karein bilkul free mein</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {errors.general && (
                        <div className="alert alert-error">{errors.general}</div>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">Pura naam</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Ali Ahmed"
                            value={form.name}
                            onChange={handleChange}
                            className={errors.name ? 'input-error' : ''}
                            autoComplete="name"
                        />
                        {errors.name && <span className="field-error">{errors.name[0] || errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="aap@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                            autoComplete="email"
                        />
                        {errors.email && <span className="field-error">{errors.email[0] || errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Kam se kam 8 characters"
                            value={form.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                            autoComplete="new-password"
                        />
                        {errors.password && <span className="field-error">{errors.password[0] || errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirmation">Password confirm karein</label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            placeholder="••••••••"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            className={errors.password_confirmation ? 'input-error' : ''}
                            autoComplete="new-password"
                        />
                        {errors.password_confirmation && (
                            <span className="field-error">{errors.password_confirmation[0] || errors.password_confirmation}</span>
                        )}
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <span className="spinner-sm" /> : 'Register karein'}
                    </button>
                </form>

                <p className="auth-footer">
                    Pehle se account hai?{' '}
                    <Link to="/login">Login karein</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
