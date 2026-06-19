import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, deleteAnalysis } from '../services/api';

function History() {
    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Saurav Tayade';

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            /* Webkit browsers (Chrome, Safari, Edge) */
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-track {
                background: #f1f5f9;
            }
            ::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 10px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
            }
            /* Firefox */
            html {
                scrollbar-width: thin;
                scrollbar-color: #cbd5e1 #f1f5f9;
            }
            body {
                background-color: #f8fafc;
                overflow-y: auto; /* Ensure vertical scrolling is enabled */
            }
        `;
        document.head.appendChild(style);

        fetchHistory();

        return () => {
            document.head.removeChild(style);
        };
    }, []);

const fetchHistory = async () => {
    try {
        const res = await getHistory();
        setAnalyses(Array.isArray(res.data) ? res.data : []);
        setError('');
    } catch (err) {
        if (err.response && err.response.data.includes("No resumes found")) {
            setAnalyses([]);
        } else {
            setError('Failed to load history. Please try again later.');
        }
    } finally {
        setLoading(false);
    }
};

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this analysis?')) return;
        try {
            await deleteAnalysis(id);
            setAnalyses(analyses.filter(a => a.analysisId !== id));
        } catch (err) {
            alert('Failed to delete analysis');
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#6366f1';
        return '#f59e0b';
    };

    if (loading) return <div style={styles.center}>Scanning records...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.blob1}></div>
            <div style={styles.blob2}></div>

            {/* MATCHED TOP NAVIGATION BAR */}
            <nav style={styles.topBar}>
                <h1 style={styles.logoText} onClick={() => navigate('/')}>
                    SkillGap<span style={{color: '#6366f1'}}>Analyzer</span>
                </h1>

                <div style={styles.topMenu}>
                    <button style={styles.menuLink} onClick={() => navigate('/')}>Analyzer</button>
                    <button style={{...styles.menuLink, ...styles.menuLinkActive}} onClick={() => navigate('/history')}>History</button>

                    <div style={styles.divider}></div>

                    <div style={styles.userSection}>
                        <span style={styles.welcomeText}>Welcome, <strong>{userName}</strong></span>
                        <button style={styles.logoutLink} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>

            <div style={styles.content}>
                <h2 style={styles.heading}>Analysis History</h2>
                {error && <div style={styles.error}>{error}</div>}

                {analyses.length === 0 ? (
                    <div style={styles.emptyCard}>
                        <p style={styles.emptyText}>No analysis history found.</p>
                        <button style={styles.startBtn} onClick={() => navigate('/')}>Run New Analysis</button>
                    </div>
                ) : (
                    <div style={styles.list}>
                        {analyses.map((a) => (
                            <div key={a.analysisId} style={styles.historyCard}>
                                <div style={styles.cardLeft}>
                                    <div style={{ ...styles.scoreCircle, borderColor: getScoreColor(a.matchPercentage) }}>
                                        <span style={{ color: getScoreColor(a.matchPercentage) }}>{a.matchPercentage}%</span>
                                    </div>
                                    <span style={styles.verdictTag}>{a.verdict}</span>
                                </div>
                                <div style={styles.cardMiddle}>
                                    <p style={styles.skillsLabel}>Key Skills Detected:</p>
                                    <p style={styles.skillsText}>{a.matchingSkills?.substring(0, 150)}...</p>
                                </div>
                                <div style={styles.cardRight}>
                                    <button style={styles.viewBtn} onClick={() => navigate(`/analysis/${a.analysisId}`)}>View Full Report</button>
                                    <button style={styles.deleteBtn} onClick={() => handleDelete(a.analysisId)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    // container now allows vertical overflow for the page scrollbar
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    blob1: { position: 'absolute', width: '600px', height: '600px', background: 'rgba(99, 102, 241, 0.05)', filter: 'blur(100px)', borderRadius: '50%', top: '-100px', left: '-100px', zIndex: 0 },
    blob2: { position: 'absolute', width: '700px', height: '700px', background: 'rgba(168, 85, 247, 0.05)', filter: 'blur(120px)', borderRadius: '50%', bottom: '-150px', right: '-100px', zIndex: 0 },
    center: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: '#64748b' },

    topBar: { height: '70px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', position: 'sticky', top: 0, zIndex: 100 },
    logoText: { fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '-0.5px', cursor: 'pointer' },
    topMenu: { display: 'flex', alignItems: 'center', gap: '32px' },
    menuLink: { border: 'none', background: 'none', fontSize: '14px', fontWeight: '600', color: '#64748b', cursor: 'pointer', transition: 'color 0.2s', padding: '8px 0' },
    menuLinkActive: { color: '#6366f1', borderBottom: '2px solid #6366f1' },
    divider: { width: '1px', height: '20px', backgroundColor: '#e2e8f0' },
    userSection: { display: 'flex', alignItems: 'center', gap: '20px' },
    welcomeText: { fontSize: '13px', color: '#64748b' },
    logoutLink: { border: 'none', background: 'none', fontSize: '13px', fontWeight: '700', color: '#ef4444', cursor: 'pointer' },

    content: { maxWidth: '1000px', margin: '40px auto', padding: '0 40px 80px 40px', position: 'relative', zIndex: 1 },
    heading: { fontSize: '36px', fontWeight: '800', color: '#1e293b', marginBottom: '40px', letterSpacing: '-0.025em' },
    error: { backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' },

    list: { display: 'flex', flexDirection: 'column', gap: '24px' },
    historyCard: { backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', gap: '40px' },
    cardLeft: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', minWidth: '120px' },
    scoreCircle: { width: '80px', height: '80px', borderRadius: '50%', border: '5px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '800' },
    verdictTag: { fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
    cardMiddle: { flex: 1 },
    skillsLabel: { margin: '0 0 10px 0', fontSize: '13px', color: '#6366f1', fontWeight: '800' },
    skillsText: { margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' },
    cardRight: { display: 'flex', flexDirection: 'column', gap: '12px' },
    viewBtn: { padding: '12px 24px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '14px', cursor: 'pointer', fontSize: '14px', fontWeight: '700' },
    deleteBtn: { padding: '10px 24px', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #fee2e2', borderRadius: '14px', cursor: 'pointer', fontSize: '13px' },
    emptyCard: { backgroundColor: '#fff', padding: '80px 40px', borderRadius: '32px', textAlign: 'center', border: '1px solid #e2e8f0' },
    startBtn: { marginTop: '24px', padding: '14px 32px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '700', cursor: 'pointer' }
};

export default History;