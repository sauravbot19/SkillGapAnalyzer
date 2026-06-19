import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/dashboard');

        const style = document.createElement('style');
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;800&display=swap');
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
            @keyframes blink { 50% { opacity: 0; } }
            .gradient-text {
                background: linear-gradient(90deg, #4f46e5, #9333ea, #4f46e5);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: shine 3s linear infinite;
            }
            @keyframes shine { to { background-position: 200% center; } }
            body { margin: 0; padding: 0; background-color: #f8fafc; }
        `;
        document.head.appendChild(style);
    }, [navigate]);

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <div style={styles.blob1}></div>
                <div style={styles.blob2}></div>

                {/* 1. NAVIGATION */}
                <nav style={styles.nav}>
                    <h1 style={styles.logoText}>SkillGap<span style={{color: '#6366f1'}}>Analyzer</span></h1>
                    <div style={styles.navRight}>
                        <button style={styles.navLink} onClick={() => navigate('/login')}>Login</button>
                        <button style={styles.navBtn} onClick={() => navigate('/register')}>Create Free Account</button>
                    </div>
                </nav>

                {/* 2. HERO SECTION */}
                <main style={styles.hero}>
                    <div style={styles.contentLeft}>
                        <div style={styles.badge}>🚀 SGP v1.0</div>
                        <h1 style={styles.headline}>
                            Your resume is good.<br/>
                            AI will make it <span className="gradient-text">undeniable</span>
                            <span style={styles.cursor}>|</span>
                        </h1>
                        <p style={styles.subheadline}>
                            Stop guessing why you aren't getting interviews. Identify exact skill gaps and optimize your profile in seconds.
                        </p>
                        <div style={styles.ctaGroup}>
                            <button
                                style={{...styles.mainBtn, ...(isHovered ? styles.mainBtnHover : {})}}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => navigate('/register')}
                            >
                                Analyze My Resume Now
                            </button>
                        </div>
                        <div style={styles.featureRow}>
                            <div style={styles.feature}>🎯 ATS Scoring</div>
                            <div style={styles.feature}>📊 Skill Mapping</div>
                            <div style={styles.feature}>📝 AI Re-writes</div>
                        </div>
                    </div>

                    <div style={styles.contentRight}>
                        <div style={styles.visualStack}>
                            <div style={{...styles.mockupMain, animation: 'float 6s ease-in-out infinite'}}>
                                <div style={styles.mockHeader}>
                                    <div style={styles.mockDots}><div style={styles.dot}></div><div style={styles.dot}></div></div>
                                    <div style={styles.mockTitle}>A.I. Constellation Map</div>
                                </div>
                                <div style={styles.mockBody}>
                                    <div style={styles.mockCenter}>
                                        <div style={styles.mockScore}>92%</div>
                                        <div style={styles.mockLabel}>MATCH</div>
                                    </div>
                                    <div style={styles.mockSkill}>React.js</div>
                                    <div style={styles.mockSkill2}>Python</div>
                                </div>
                            </div>
                            <div style={{...styles.floatingCard, top: '10%', left: '-15%', animation: 'float 5s infinite 1s'}}>
                                <div style={styles.cardVal}>+45%</div>
                                <div style={styles.cardLab}>Success</div>
                            </div>
                            <div style={{...styles.floatingCard, bottom: '10%', right: '-10%', animation: 'float 7s infinite 0.5s'}}>
                                <div style={styles.cardVal}>ATS Pass</div>
                                <div style={styles.cardLab}>Verified</div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* 3. DARK FOOTER (Optimized Structure) */}
            <footer style={styles.footerBg}>
                <div style={styles.footerContainer}>
                    <div style={styles.mainFeedbackCard}>
                        {/* Feedback Left */}
                        <div style={styles.feedbackLeft}>
                            <div style={styles.feedbackHeader}>
                                <span style={{fontSize: '20px'}}>📩</span>
                                <h3 style={styles.feedbackTitle}>User Feedback & Queries</h3>
                            </div>
                            <p style={styles.feedbackSub}>Have questions or suggestions about our ATS parsing? Share your feedback with us!</p>
                            <div style={styles.inputRow}>
                                <input style={styles.darkInput} placeholder="Your Name" />
                                <input style={styles.darkInput} placeholder="Email Address" />
                            </div>
                            <textarea style={styles.darkTextarea} placeholder="Type your message details here..." rows={4} />
                            <button style={styles.submitBtn}>✈ Submit Query</button>
                        </div>

                        {/* Optimization Right */}
                        <div style={styles.feedbackRight}>
                            <div style={styles.tipsHeader}>
                                <span style={{fontSize: '18px'}}>🪄</span>
                                <h4 style={styles.tipsTitle}>OPTIMIZE YOUR MATCHING SUCCESS</h4>
                            </div>
                            <p style={styles.tipsIntro}>To achieve the highest score alignment:</p>
                            <ul style={styles.tipList}>
                                <li style={styles.tipItem}>✅ <strong>Inject Verifiable Outcomes:</strong> Use metrics stating specific cloud-native response speed-ups.</li>
                                <li style={styles.tipItem}>✅ <strong>Align Structural Keywords:</strong> Make sure framework names match the JD formatting exactly.</li>
                            </ul>
                            <div style={styles.proTipBox}>
                                <span style={{fontSize: '16px'}}>💡</span>
                                <p style={styles.proTipText}><strong>Pro-Tip:</strong> Use the generated Resume Enhancements to upgrade your project bullets!</p>
                            </div>
                        </div>
                    </div>

                    {/* Final Bottom Bar */}
                    <div style={styles.bottomBar}>
                        <div style={styles.bottomLeft}>
                            <div style={styles.socialIcon}>in</div>
                            <div style={styles.repoLink}> Access Project Repository</div>
                        </div>
                        <div style={styles.bottomRight}>
                            <span style={styles.copyright}>© 2025 <strong>SkillGapAnalyzer</strong></span>
                            <div style={styles.vDivider}></div>
                            <span style={styles.platformTag}>ATS Resume & JD Alignment AI Platform</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const styles = {
    pageWrapper: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
    container: { minHeight: '90vh', width: '100%', position: 'relative', overflow: 'hidden', paddingBottom: '40px' },
    blob1: { position: 'absolute', width: '600px', height: '600px', background: 'rgba(99, 102, 241, 0.08)', filter: 'blur(100px)', borderRadius: '50%', top: '-250px', right: '-150px' },
    blob2: { position: 'absolute', width: '600px', height: '600px', background: 'rgba(168, 85, 247, 0.08)', filter: 'blur(100px)', borderRadius: '50%', bottom: '-150px', left: '-150px' },

    nav: { height: '70px', padding: '0 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 },
    logoText: { fontSize: '20px', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.5px' },
    navRight: { display: 'flex', alignItems: 'center', gap: '30px' },
    navLink: { background: 'none', border: 'none', fontSize: '14px', fontWeight: '600', color: '#64748b', cursor: 'pointer' },
    navBtn: { padding: '10px 24px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '700', color: '#1e293b', cursor: 'pointer', fontSize: '13px' },

    hero: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', padding: '40px 60px', alignItems: 'center', position: 'relative', zIndex: 1 },
    badge: { display: 'inline-block', padding: '6px 14px', backgroundColor: '#eef2ff', color: '#6366f1', borderRadius: '50px', fontSize: '11px', fontWeight: '800', marginBottom: '20px' },
    headline: { fontSize: '54px', fontWeight: '900', color: '#1e293b', lineHeight: 1.15, marginBottom: '24px' },
    cursor: { color: '#6366f1', animation: 'blink 1s infinite' },
    subheadline: { fontSize: '17px', color: '#64748b', lineHeight: '1.6', marginBottom: '36px', maxWidth: '500px' },
    ctaGroup: { marginBottom: '40px' },
    mainBtn: { padding: '16px 40px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '17px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 15px 30px -5px rgba(79, 70, 229, 0.3)' },
    featureRow: { display: 'flex', gap: '24px' },
    feature: { display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '13px', fontWeight: '600' },

    contentRight: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    visualStack: { position: 'relative', width: '100%', maxWidth: '380px' },
    mockupMain: { backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 40px 80px -15px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9', overflow: 'hidden' },
    mockHeader: { height: '44px', backgroundColor: '#f8fafc', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #f1f5f9' },
    mockDots: { display: 'flex', gap: '5px' },
    dot: { width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#e2e8f0' },
    mockTitle: { fontSize: '10px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' },
    mockBody: { padding: '40px 30px', textAlign: 'center', position: 'relative' },
    mockCenter: { width: '100px', height: '100px', margin: '0 auto', backgroundColor: '#6366f1', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' },
    mockScore: { fontSize: '26px', fontWeight: '900' },
    mockLabel: { fontSize: '7px', fontWeight: '700' },
    mockSkill: { position: 'absolute', top: '30px', right: '30px', padding: '6px 12px', backgroundColor: '#f1f5f9', borderRadius: '50px', fontSize: '11px', fontWeight: '700', color: '#475569' },
    mockSkill2: { position: 'absolute', bottom: '30px', left: '30px', padding: '6px 12px', backgroundColor: '#f1f5f9', borderRadius: '50px', fontSize: '11px', fontWeight: '700', color: '#475569' },
    floatingCard: { position: 'absolute', backgroundColor: '#fff', padding: '12px 18px', borderRadius: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 15px 30px -5px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9', zIndex: 5 },
    cardVal: { fontSize: '15px', fontWeight: '800' },
    cardLab: { fontSize: '10px', color: '#94a3b8' },

    // --- DARK FOOTER (Optimized) ---
    footerBg: { backgroundColor: '#05070a', color: '#fff', padding: '60px 0 20px 0', width: '100%', margin: 0 },
    footerContainer: { maxWidth: '1200px', margin: '0 auto', padding: '0 40px' },
    mainFeedbackCard: { backgroundColor: '#0a0c12', borderRadius: '24px', border: '1px solid #1e293b', padding: '40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px' },
    feedbackLeft: { display: 'flex', flexDirection: 'column' },
    feedbackHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
    feedbackTitle: { fontSize: '20px', fontWeight: '800', margin: 0 },
    feedbackSub: { fontSize: '13px', color: '#94a3b8', marginBottom: '24px' },
    inputRow: { display: 'flex', gap: '12px', marginBottom: '12px' },
    darkInput: { flex: 1, padding: '12px 16px', backgroundColor: '#05070a', border: '1px solid #1e293b', borderRadius: '10px', color: '#fff', fontSize: '13px' },
    darkTextarea: { width: '100%', padding: '12px 16px', backgroundColor: '#05070a', border: '1px solid #1e293b', borderRadius: '10px', color: '#fff', fontSize: '13px', marginBottom: '16px', boxSizing: 'border-box' },
    submitBtn: { width: 'fit-content', padding: '12px 24px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' },
    feedbackRight: { display: 'flex', flexDirection: 'column' },
    tipsHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
    tipsTitle: { fontSize: '11px', fontWeight: '800', color: '#6366f1', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace", margin: 0 },
    tipsIntro: { fontSize: '12px', color: '#94a3b8', marginBottom: '20px' },
    tipList: { listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '12px' },
    tipItem: { fontSize: '12px', color: '#e2e8f0', lineHeight: '1.4' },
    proTipBox: { padding: '16px', backgroundColor: '#05070a', border: '1px solid #1e293b', borderRadius: '12px', display: 'flex', gap: '12px' },
    proTipText: { fontSize: '11px', color: '#94a3b8', margin: 0, fontFamily: "'JetBrains Mono', monospace" },
    bottomBar: { marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    bottomLeft: { display: 'flex', alignItems: 'center', gap: '15px' },
    socialIcon: { width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#1a1d23', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' },
    repoLink: { padding: '6px 12px', backgroundColor: '#1a1d23', borderRadius: '6px', fontSize: '10px', color: '#94a3b8', fontWeight: '600' },
    bottomRight: { display: 'flex', alignItems: 'center', gap: '12px' },
    copyright: { fontSize: '12px', color: '#475569' },
    vDivider: { width: '1px', height: '12px', backgroundColor: '#1e293b' },
    platformTag: { fontSize: '10px', color: '#6366f1', fontWeight: '700' }
};

export default LandingPage;