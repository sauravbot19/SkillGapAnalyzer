import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume, startAnalysis } from '../services/api';

function Dashboard() {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'User';
    const fileInputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [activeMenu, setActiveMenu] = useState('analyzer');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.type === 'application/pdf') {
            setFile(selected);
            setError('');
        }
    };

    const handleRunAnalysis = async (e) => {
        e.preventDefault();
        if (!file) { setError('Please select a PDF resume'); return; }
        if (!jobDescription.trim()) { setError('Please provide a Job Description'); return; }

        setLoading(true);
        setError('');

        try {
            // Step 1: Upload PDF to S3
            const formData = new FormData();
            formData.append('file', file);
            const uploadRes = await uploadResume(formData);
            const resumeId = uploadRes.data.id;

            // Step 2: Run AI Analysis
            const analysisRes = await startAnalysis({ resumeId, jobDescription });
            const analysisId = analysisRes.data.analysisId;

            // Step 3: Redirect to result page
            navigate(`/analysis/${analysisId}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Analysis failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');
            body { overflow: hidden; margin: 0; }
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
            @keyframes pulse { 0% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.6; } 100% { transform: scale(1); opacity: 0.3; } }
        `;
        document.head.appendChild(style);
    }, []);

    return (
        <div style={styles.appContainer}>
            <nav style={styles.topBar}>
                <h1 style={styles.logoText} onClick={() => navigate('/')}>SkillGap<span style={{color: '#6366f1'}}>Analyzer</span></h1>
                <div style={styles.topMenu}>
                    <button style={{...styles.menuLink, ...(activeMenu === 'analyzer' ? styles.menuLinkActive : {})}} onClick={() => setActiveMenu('analyzer')}>Analyzer</button>
                    <button style={{...styles.menuLink, ...(activeMenu === 'history' ? styles.menuLinkActive : {})}} onClick={() => navigate('/history')}>History</button>
                    <div style={styles.divider}></div>
                    <div style={styles.userSection}>
                        <span style={styles.welcomeText}>Welcome, <strong>{userName}</strong></span>
                        <button style={styles.logoutLink} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>

            <main style={styles.workspace}>
                <section style={styles.panel}>
                    <div style={styles.panelHeader}>
                        <h3 style={styles.panelTitle}>Setup & Configuration</h3>
                        <div style={styles.badge}>v1.0 Engine</div>
                    </div>

                    <div style={styles.scrollArea}>
                        {error && <div style={styles.errorBanner}>{error}</div>}
                        <div style={styles.inputGroup}>
                            <label style={styles.fieldLabel}>SOURCE RESUME</label>
                            <input type="file" ref={fileInputRef} style={{display: 'none'}} accept=".pdf" onChange={handleFileChange} />
                            <div
                                style={{...styles.dropzone, ...(file ? styles.dropzoneSuccess : {})}}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <span style={{fontSize: '24px'}}>{file ? '✅' : '📄'}</span>
                                <p style={styles.dropText}>{file ? file.name : 'Select Resume (PDF)'}</p>
                                <p style={styles.dropSub}>AI will parse your skills and experience</p>
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.fieldLabel}>TARGET JOB DESCRIPTION</label>
                            <textarea
                                style={styles.textarea}
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste Job Description here..."
                                rows={8}
                            />
                        </div>
                    </div>

                    <div style={styles.panelFooter}>
                        <button
                            style={{...styles.primaryBtn, opacity: loading ? 0.7 : 1}}
                            onClick={handleRunAnalysis}
                            disabled={loading}
                        >
                            {loading ? '⚡ Analyzing...' : '⚡ Run Analysis'}
                        </button>
                    </div>
                </section>

                <section style={{...styles.panel, backgroundColor: '#fcfcfd'}}>
                    <div style={styles.panelHeader}>
                        <h3 style={styles.panelTitle}>AI Analysis Dashboard</h3>
                        <span style={styles.liveTag}>REAL-TIME MAPPING</span>
                    </div>

                    <div style={styles.visualSpace}>
                        <div style={styles.constellationWrap}>
                            <svg style={styles.svgLines} viewBox="0 0 500 400">
                                <line x1="250" y1="200" x2="100" y2="80" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5" />
                                <line x1="250" y1="200" x2="400" y2="80" stroke="#e2e8f0" strokeWidth="1.5" />
                                <line x1="250" y1="200" x2="100" y2="320" stroke="#e2e8f0" strokeWidth="1.5" />
                                <line x1="250" y1="200" x2="400" y2="320" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5" />
                                <line x1="250" y1="200" x2="50" y2="200" stroke="#e2e8f0" strokeWidth="1.5" />
                                <line x1="250" y1="200" x2="450" y2="200" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3" />
                            </svg>
                            <div style={styles.coreScore}>
                                <div style={styles.pulse}></div>
                                <div style={styles.scoreCircle}><span style={styles.percent}>84%</span><span style={styles.matchTxt}>MATCH</span></div>
                            </div>
                            <div style={{...styles.floatNode, top: '40px', left: '80px', animation: 'float 4s infinite'}}>⚛️ React</div>
                            <div style={{...styles.floatNode, top: '40px', right: '80px', animation: 'float 3.5s infinite 0.5s'}}>🐍 Python</div>
                            <div style={{...styles.floatNode, bottom: '60px', left: '80px', animation: 'float 4.5s infinite 1s', opacity: 0.7}}>☁️ AWS</div>
                            <div style={{...styles.floatNode, bottom: '60px', right: '80px', animation: 'float 5s infinite 0.2s', opacity: 0.7}}>🐘 SQL</div>
                        </div>
                    </div>

                    <div style={styles.confidenceContainer}>
                        <div style={styles.confidenceBox}>
                            <div style={styles.confHeader}>
                                <span style={styles.confTitle}>Match Target Confidence</span>
                                <div style={styles.confStatus}><span style={styles.dot}></span>READY</div>
                            </div>
                            <p style={styles.confText}>Upload your resume file and target job description to map out specific gaps and trigger custom tech recommendations instantly!</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

const styles = {
    appContainer: { height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" },
    topBar: { height: '70px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', zIndex: 100 },
    logoText: { fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: 0, cursor: 'pointer' },
    topMenu: { display: 'flex', alignItems: 'center', gap: '32px' },
    menuLink: { border: 'none', background: 'none', fontSize: '14px', fontWeight: '600', color: '#64748b', cursor: 'pointer', padding: '8px 0' },
    menuLinkActive: { color: '#6366f1', borderBottom: '2px solid #6366f1' },
    divider: { width: '1px', height: '20px', backgroundColor: '#e2e8f0' },
    userSection: { display: 'flex', alignItems: 'center', gap: '20px' },
    welcomeText: { fontSize: '13px', color: '#64748b' },
    logoutLink: { border: 'none', background: 'none', fontSize: '13px', fontWeight: '700', color: '#ef4444', cursor: 'pointer' },
    workspace: { flex: 1, display: 'grid', gridTemplateColumns: '450px 1fr', padding: '24px', gap: '24px', overflow: 'hidden' },
    panel: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    panelHeader: { padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    panelTitle: { fontSize: '13px', fontWeight: '800', color: '#1e293b', margin: 0, textTransform: 'uppercase' },
    badge: { fontSize: '10px', padding: '4px 12px', backgroundColor: '#f1f5f9', borderRadius: '20px', fontWeight: '700', color: '#6366f1' },
    liveTag: { color: '#10b981', fontSize: '11px', fontWeight: '800' },
    scrollArea: { flex: 1, padding: '24px', overflowY: 'auto' },
    errorBanner: { padding: '12px', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '12px', marginBottom: '16px', fontSize: '13px', border: '1px solid #fee2e2' },
    inputGroup: { marginBottom: '28px' },
    fieldLabel: { fontSize: '10px', fontWeight: '800', color: '#6366f1', marginBottom: '12px', display: 'block' },
    dropzone: { border: '1.5px dashed #cbd5e1', borderRadius: '18px', padding: '24px', textAlign: 'center', backgroundColor: '#fcfcfd', cursor: 'pointer' },
    dropzoneSuccess: { borderColor: '#10b981', backgroundColor: '#f0fdf4' },
    dropText: { fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '8px 0 0 0' },
    dropSub: { fontSize: '11px', color: '#94a3b8', margin: 0 },
    textarea: { width: '100%', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '18px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', backgroundColor: '#333333' },
    panelFooter: { padding: '24px', borderTop: '1px solid #f1f5f9' },
    primaryBtn: { width: '100%', padding: '16px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' },
    visualSpace: { flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    constellationWrap: { width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    svgLines: { position: 'absolute', width: '100%', height: '100%' },
    floatNode: { position: 'absolute', padding: '8px 18px', backgroundColor: '#fff', borderRadius: '50px', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: '700', color: '#475569', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', zIndex: 5 },
    coreScore: { position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    pulse: { position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#6366f1', animation: 'pulse 2s infinite' },
    scoreCircle: { width: '90px', height: '90px', backgroundColor: '#6366f1', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' },
    percent: { fontSize: '24px', fontWeight: '900' },
    matchTxt: { fontSize: '8px', fontWeight: '800' },
    confidenceContainer: { padding: '24px' },
    confidenceBox: { backgroundColor: '#05070a', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b' },
    confHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    confTitle: { fontFamily: "'JetBrains Mono', monospace", color: '#94a3b8', fontSize: '12px' },
    confStatus: { display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '12px', fontWeight: '800' },
    dot: { width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%' },
    confText: { color: '#ffffff', fontSize: '14px', lineHeight: '1.6', margin: 0, opacity: 0.9 }
};

export default Dashboard;