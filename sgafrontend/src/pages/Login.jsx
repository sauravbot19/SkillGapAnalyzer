import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // New state for visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await login(form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userName', res.data.name);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.blob1}></div>
            <div style={styles.blob2}></div>

            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>SkillGap<span style={{color: '#6366f1'}}>Analyzer</span></h2>
                    <p style={styles.subtitle}>Welcome back! Please enter your details.</p>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        {/* Wrapper for positioning the toggle button */}
                        <div style={styles.passwordWrapper}>
                            <input
                                style={{...styles.input, paddingRight: '45px'}} // Extra padding for the button
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.toggleButton}
                            >
                                {showPassword ? (
                                    /* Simple "Eye Closed" Icon */
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    /* Simple "Eye" Icon */
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        style={{
                            ...styles.button,
                            ...(isHovered ? styles.buttonHover : {}),
                            ...(loading ? styles.buttonDisabled : {})
                        }}
                        type="submit"
                        disabled={loading}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <p style={styles.linkText}>
                    Don't have an account? <Link to="/register" style={styles.link}>Create an account</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden'
    },
    blob1: {
        position: 'absolute', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.15)',
        filter: 'blur(80px)', borderRadius: '50%', top: '-50px', left: '-50px'
    },
    blob2: {
        position: 'absolute', width: '400px', height: '400px', background: 'rgba(168, 85, 247, 0.15)',
        filter: 'blur(100px)', borderRadius: '50%', bottom: '-100px', right: '-100px'
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)',
        padding: '48px 40px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '440px', zIndex: 1
    },
    header: { textAlign: 'center', marginBottom: '32px' },
    title: { color: '#1e293b', marginBottom: '8px', fontSize: '32px', fontWeight: '800' },
    subtitle: { color: '#64748b', fontSize: '15px' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    field: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { textAlign: 'left', fontWeight: '500', color: '#334155', fontSize: '14px' },
    passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
    toggleButton: {
        position: 'absolute',
        right: '12px',
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        transition: 'color 0.2s',
        zIndex: 2
    },
    input: {
        width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '12px',
        fontSize: '15px', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s ease'
    },
    button: {
        width: '100%', padding: '14px', backgroundColor: '#4f46e5', color: '#fff',
        border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
        cursor: 'pointer', marginTop: '10px', transition: 'all 0.2s ease',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)'
    },
    buttonHover: { backgroundColor: '#4338ca', transform: 'translateY(-1px)' },
    buttonDisabled: { backgroundColor: '#9ca3af', cursor: 'not-allowed' },
    error: {
        backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '12px',
        marginBottom: '24px', fontSize: '14px', border: '1px solid #fee2e2', textAlign: 'center'
    },
    linkText: { textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '14px' },
    link: { color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }
};

export default Login;