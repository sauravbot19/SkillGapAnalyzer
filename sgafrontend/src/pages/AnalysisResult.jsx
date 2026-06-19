import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysis } from '../services/api';

function AnalysisResult() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'User';

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'auto';

        const fetchAnalysis = async () => {
            try {
                const res = await getAnalysis(id);
                setAnalysis(res.data);
            } catch (err) {
                setError('Failed to load analysis result');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalysis();

        return () => {
            document.body.style.overflow = 'hidden';
        };
    }, [id]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#6366f1';
        return '#f59e0b';
    };

    if (loading) return <div style={resStyles.center}>AI is compiling your report...</div>;
    if (error) return <div style={resStyles.center}>{error}</div>;

    const matchingSkills = analysis.matchingSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
    const missingSkills = analysis.missingSkills?.split(',').map(s => s.trim()).filter(Boolean) || [];
    const suggestions = analysis.suggestions
        ?.split(/(?<!\w\.\w)(?<![A-Z][a-z]\.)(?<=\.)\s/)
        .map(s => s.trim())
        .filter(s => s.length > 10) || [];

    return (
        <div style={resStyles.appContainer}>
            <div style={resStyles.blob1}></div>

            {/* 1. MATCHED TOP NAVIGATION BAR */}
            <nav style={resStyles.topBar}>
                <h1 style={resStyles.logoText} onClick={() => navigate('/')}>
                    SkillGap<span style={{color: '#6366f1'}}>Analyzer</span>
                </h1>

                <div style={resStyles.topMenu}>
                    <button style={resStyles.menuLink} onClick={() => navigate('/')}>Analyzer</button>
                    <button style={resStyles.menuLink} onClick={() => navigate('/history')}>History</button>

                    <div style={resStyles.divider}></div>

                    <div style={resStyles.userSection}>
                        <span style={resStyles.welcomeText}>Welcome, <strong>{userName}</strong></span>
                        <button style={resStyles.logoutLink} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>

            {/* 2. CONTENT AREA */}
            <main style={resStyles.content}>
                <div style={resStyles.header}>
                    <h2 style={resStyles.heading}>Semantic Alignment Report</h2>
                    <p style={resStyles.subheading}>Analysis ID: #{id?.substring(0, 8)}</p>
                </div>

                <div style={resStyles.grid}>
                    {/* Summary Card */}
                    <div style={resStyles.summaryCard}>
                        <div style={resStyles.scoreSection}>
                            <div style={{...resStyles.scoreRing, borderColor: getScoreColor(analysis.matchPercentage)}}>
                                <span style={{...resStyles.scoreBig, color: getScoreColor(analysis.matchPercentage)}}>
                                    {analysis.matchPercentage}%
                                </span>
                            </div>
                            <div style={resStyles.verdictBox}>
                                <span style={resStyles.verdictLabel}>Match Verdict</span>
                                <h4 style={{...resStyles.verdictText, color: getScoreColor(analysis.matchPercentage)}}>
                                    {analysis.verdict}
                                </h4>
                            </div>
                        </div>

                        <div style={resStyles.lineDivider}></div>
                    </div>

                    {/* Skills Grid */}
                    <div style={resStyles.skillsContainer}>
                        <div style={resStyles.panel}>
                            <h3 style={resStyles.panelTitle}>✅ Matched Skills</h3>
                            <div style={resStyles.skillCloud}>
                                {matchingSkills.map((skill, i) => (
                                    <span key={i} style={resStyles.pillGreen}>{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div style={resStyles.panel}>
                            <h3 style={resStyles.panelTitle}>⚠️ Missing Skills</h3>
                            <div style={resStyles.skillCloud}>
                                {missingSkills.length > 0 ? missingSkills.map((skill, i) => (
                                    <span key={i} style={resStyles.pillRed}>{skill}</span>
                                )) : <span style={resStyles.pillGreen}>No skill gaps found!</span>}
                            </div>
                        </div>
                    </div>

                    {/* Detailed Roadmap */}
                    <div style={{...resStyles.panel, gridColumn: 'span 2'}}>
                        <h3 style={resStyles.panelTitle}>Suggestions</h3>
                        <div style={resStyles.roadmapList}>
                            {suggestions.slice(1).map((s, i) => (
                                <div key={i} style={resStyles.roadmapItem}>
                                    <span style={resStyles.stepNum}>{i + 1}</span>
                                    <p style={resStyles.stepText}>{s}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={resStyles.footer}>
                    <button style={resStyles.primaryBtn} onClick={() => navigate('/')}>Analyze Another Resume</button>
                </div>
            </main>
        </div>
    );
}

const resStyles = {
    appContainer: {
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: "'Inter', sans-serif",
        position: 'relative'
    },
    blob1: { position: 'absolute', width: '600px', height: '600px', background: 'rgba(99, 102, 241, 0.05)', filter: 'blur(100px)', borderRadius: '50%', top: '-100px', right: '-100px', zIndex: 0 },
    center: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: '#64748b' },

    topBar: { height: '70px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', position: 'sticky', top: 0, zIndex: 100 },
    logoText: { fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '-0.5px', cursor: 'pointer' },
    topMenu: { display: 'flex', alignItems: 'center', gap: '32px' },
    menuLink: { border: 'none', background: 'none', fontSize: '14px', fontWeight: '600', color: '#64748b', cursor: 'pointer', transition: 'color 0.2s', padding: '8px 0' },
    divider: { width: '1px', height: '20px', backgroundColor: '#e2e8f0' },
    userSection: { display: 'flex', alignItems: 'center', gap: '20px' },
    welcomeText: { fontSize: '13px', color: '#64748b' },
    logoutLink: { border: 'none', background: 'none', fontSize: '13px', fontWeight: '700', color: '#ef4444', cursor: 'pointer' },

    content: { maxWidth: '1100px', margin: '0 auto', padding: '40px', position: 'relative', zIndex: 1 },
    header: { marginBottom: '40px' },
    heading: { fontSize: '32px', fontWeight: '800', color: '#1e293b', marginBottom: '8px', letterSpacing: '-0.025em' },
    subheading: { color: '#94a3b8', fontSize: '13px', fontFamily: 'monospace' },

    grid: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' },
    summaryCard: { backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)' },
    scoreSection: { display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' },
    scoreRing: { width: '100px', height: '100px', borderRadius: '50%', border: '6px solid', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    scoreBig: { fontSize: '28px', fontWeight: '900' },
    verdictBox: { display: 'flex', flexDirection: 'column' },
    verdictLabel: { fontSize: '12px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' },
    verdictText: { fontSize: '20px', fontWeight: '800', margin: '4px 0 0 0' },
    lineDivider: { height: '1px', backgroundColor: '#f1f5f9', margin: '0 0 24px 0' },
    sectionTitle: { fontSize: '13px', fontWeight: '800', color: '#1e293b', marginBottom: '12px' },
    insightText: { fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: 0 },

    skillsContainer: { display: 'flex', flexDirection: 'column', gap: '24px' },
    panel: { backgroundColor: '#fff', borderRadius: '24px', padding: '28px', border: '1px solid #e2e8f0' },
    panelTitle: { fontSize: '15px', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.05em', textAlign: 'left' },
    skillCloud: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
    pillGreen: { padding: '8px 16px', backgroundColor: '#f0fdf4', color: '#10b981', borderRadius: '50px', fontSize: '13px', fontWeight: '700' },
    pillRed: { padding: '8px 16px', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '50px', fontSize: '13px', fontWeight: '700' },

    roadmapList: { display: 'flex', flexDirection: 'column', gap: '20px' },
    roadmapItem: { display: 'flex', gap: '16px', alignItems: 'flex-start' },
    stepNum: { width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: '#6366f1', flexShrink: 0 },
    stepText: { margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' },

    footer: { marginTop: '48px', textAlign: 'center' },
    primaryBtn: { padding: '16px 32px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)' }
};

export default AnalysisResult;