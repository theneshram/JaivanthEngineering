css_content = """/* ============================================
   JAIVANTH ENGINEERING - PROFESSIONAL STYLING
   ============================================ */

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
    --primary-blue: #0A3D62;
    --secondary-blue: #1E5F8B;
    --accent-orange: #F39C12;
    --accent-orange-dark: #D68910;
    --white: #FFFFFF;
    --bg-light-grey: #F4F6F8;
    --border-grey: #D1D5DB;
    --text-grey: #5A5A5A;
    --dark-charcoal: #1C1F26;
    --primary-color: #0A3D62;
    --secondary-color: #1E5F8B;
    --accent-color: #F39C12;
    --dark-color: #1C1F26;
    --light-color: #F4F6F8;
    --gray-color: #5A5A5A;
    --gradient-2: linear-gradient(135deg, #0A3D62 0%, #1E5F8B 100%);
    --timeline-green: #45a94a;
    --timeline-green-dark: #2f8a34;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 10px 24px rgba(0, 0, 0, 0.15);
    --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);
}

html { scroll-behavior: smooth; }
body { font-family: 'Inter', sans-serif; line-height: 1.6; color: var(--text-grey); background-color: var(--white); overflow-x: hidden; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

h1 { font-family: 'Poppins', sans-serif; font-size: 44px; font-weight: 600; line-height: 1.2; letter-spacing: 0.5px; color: var(--primary-blue); }
h2 { font-family: 'Poppins', sans-serif; font-size: 36px; font-weight: 600; line-height: 1.3; letter-spacing: 0.5px; color: var(--primary-blue); margin-bottom: 0.5rem; }
h3 { font-family: 'Poppins', sans-serif; font-size: 28px; font-weight: 500; color: var(--primary-blue); margin-bottom: 0.75rem; }
h4 { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 500; color: var(--primary-blue); }
p { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.6; color: var(--text-grey); margin-bottom: 1rem; }

.navbar { position: fixed; top: 0; left: 0; right: 0; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(10px); box-shadow: var(--shadow-sm); z-index: 1000; transition: all 0.3s ease; }
.navbar.scrolled { box-shadow: var(--shadow-md); }
.nav-wrapper { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
.logo { display: flex; align-items: center; gap: 12px; font-size: 1.5rem; font-weight: 700; font-family: 'Poppins', sans-serif; color: var(--primary-blue); }
.logo i { font-size: 32px; color: var(--accent-orange); }
.nav-links { display: flex; gap: 2rem; align-items: center; }
.nav-links a { text-decoration: none; color: var(--primary-blue); font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 15px; transition: color 0.3s ease; position: relative; }
.nav-links a:after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--accent-orange); transition: width 0.3s ease; }
.nav-links a:hover:after { width: 100%; }
.nav-links a:hover { color: var(--accent-orange); }
.hamburger { display: none; flex-direction: column; cursor: pointer; gap: 5px; }
.hamburger span { width: 25px; height: 3px; background: var(--primary-blue); border-radius: 3px; transition: all 0.3s ease; }

.btn { padding: 14px 32px; border-radius: 6px; border: none; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; display: inline-block; text-decoration: none; font-family: 'Poppins', sans-serif; transition: all 0.3s ease; }
.btn-primary { background-color: var(--accent-orange); color: var(--white); }
.btn-primary:hover { background-color: var(--accent-orange-dark); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.btn-secondary { background-color: transparent; color: var(--accent-orange); border: 2px solid var(--accent-orange); }
.btn-secondary:hover { background-color: var(--accent-orange); color: var(--white); transform: translateY(-2px); }

.hero-carousel { position: relative; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-top: 60px; }
.hero-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.8s ease; background: var(--gradient-2); }
.hero-slide.active { opacity: 1; }
.hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 61, 98, 0.75); z-index: 1; }
.hero-content { position: relative; z-index: 2; text-align: center; color: var(--white); padding: 40px; max-width: 900px; }
.hero-content h1 { color: var(--white); font-size: 52px; margin-bottom: 20px; }
.hero-content p { color: rgba(255, 255, 255, 0.9); font-size: 20px; margin-bottom: 40px; }
.hero-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
.hero-dots { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; z-index: 10; }
.dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255, 255, 255, 0.5); cursor: pointer; transition: all 0.3s ease; }
.dot.active { background: var(--accent-orange); width: 30px; border-radius: 6px; }

.intro-section { padding: 80px 0; background: var(--white); }
.intro-content { max-width: 800px; margin: 0 auto 60px; text-align: center; }
.intro-content h2 { margin-bottom: 30px; }
.intro-content p { font-size: 16px; line-height: 1.8; }
.highlights-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
.highlight-card { background: var(--bg-light-grey); padding: 40px 30px; border-radius: 8px; text-align: center; border-top: 4px solid var(--accent-orange); }
.highlight-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
.highlight-card i { font-size: 48px; color: var(--accent-orange); margin-bottom: 20px; }
.highlight-card h3 { font-size: 24px; margin-bottom: 8px; }
.highlight-card p { font-size: 14px; color: var(--text-grey); margin-bottom: 0; }

.section-header { text-align: center; margin-bottom: 60px; }
.section-header h2 { margin-bottom: 10px; }
.section-header p { font-size: 16px; color: var(--accent-orange); font-weight: 500; }

.about-section { padding: 80px 0; background: var(--bg-light-grey); }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.strengths-list { list-style: none; display: flex; flex-direction: column; gap: 15px; }
.strengths-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 16px; }
.strengths-list i { color: var(--accent-orange); font-weight: bold; margin-top: 4px; flex-shrink: 0; }

.vision-mission { padding: 80px 0; background: var(--white); }
.vision-mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.vm-card { padding: 40px; border-radius: 8px; }
.vm-card.vision { background: linear-gradient(135deg, rgba(10, 61, 98, 0.05), rgba(243, 156, 18, 0.05)); border-left: 4px solid var(--primary-blue); }
.vm-card.mission { background: linear-gradient(135deg, rgba(243, 156, 18, 0.05), rgba(10, 61, 98, 0.05)); border-left: 4px solid var(--accent-orange); }
.vm-card i { font-size: 48px; margin-bottom: 20px; }
.vm-card.vision i { color: var(--primary-blue); }
.vm-card.mission i { color: var(--accent-orange); }
.vm-card h3 { margin-bottom: 20px; }
.vm-card ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.vm-card li { line-height: 1.7; }

.capabilities-section { padding: 80px 0; background: var(--bg-light-grey); }
.capabilities-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-bottom: 60px; }
.capability-card { background: var(--white); padding: 30px; border-radius: 8px; text-align: center; border-bottom: 4px solid var(--accent-orange); }
.capability-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
.capability-card h3 { margin-bottom: 12px; }
.capability-card p { font-size: 14px; color: var(--text-grey); margin-bottom: 0; }
.cold-forging-specs { background: var(--white); padding: 40px; border-radius: 8px; box-shadow: var(--shadow-md); }
.cold-forging-specs h3 { text-align: center; margin-bottom: 40px; }
.specs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
.spec-item { display: flex; flex-direction: column; padding: 20px; background: var(--bg-light-grey); border-radius: 6px; }
.spec-label { font-weight: 600; color: var(--primary-blue); margin-bottom: 8px; font-family: 'Poppins', sans-serif; }
.spec-value { color: var(--text-grey); font-size: 15px; }

.machinery-section { padding: 80px 0; background: var(--white); }
.machinery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.machinery-list, .infrastructure-list { background: var(--bg-light-grey); padding: 40px; border-radius: 8px; }
.machinery-list h3, .infrastructure-list h3 { margin-bottom: 30px; }
.machinery-list ul, .infrastructure-list ul { list-style: none; display: flex; flex-direction: column; gap: 16px; }
.machinery-list li, .infrastructure-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; }
.machinery-list i, .infrastructure-list i { color: var(--accent-orange); font-weight: bold; flex-shrink: 0; margin-top: 3px; }

.products-section { padding: 80px 0; background: var(--bg-light-grey); }
.products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
.product-category { background: var(--white); padding: 35px; border-radius: 8px; box-shadow: var(--shadow-md); }
.product-category:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
.product-category h3 { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.product-category i { font-size: 28px; color: var(--accent-orange); }
.product-category ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.product-category li { padding-left: 24px; position: relative; color: var(--text-grey); font-size: 15px; line-height: 1.6; }
.product-category li:before { content: '→'; position: absolute; left: 0; color: var(--accent-orange); font-weight: bold; }

.materials-section { padding: 80px 0; background: var(--white); }
.materials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.material-item { background: var(--bg-light-grey); padding: 30px 20px; border-radius: 8px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.material-item:hover { transform: translateY(-6px); background: var(--primary-blue); color: var(--white); box-shadow: var(--shadow-lg); }
.material-item i { font-size: 32px; color: var(--accent-orange); }
.material-item:hover i { color: var(--white); }
.material-item span { font-weight: 500; font-size: 15px; }

.quality-section { padding: 80px 0; background: var(--bg-light-grey); }
.quality-content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.quality-main { background: var(--white); padding: 40px; border-radius: 8px; box-shadow: var(--shadow-md); }
.iso-badge { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-dark)); color: var(--white); padding: 12px 24px; border-radius: 30px; margin-bottom: 20px; font-weight: 600; font-family: 'Poppins', sans-serif; }
.iso-badge i { font-size: 24px; }
.quality-main h2 { margin-bottom: 30px; }
.secondary-processes h3 { margin-bottom: 30px; }
.processes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.process-item { background: var(--white); padding: 20px; border-radius: 6px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm); }
.process-item:hover { transform: translateX(6px); box-shadow: var(--shadow-md); }
.process-item i { color: var(--accent-orange); font-size: 20px; flex-shrink: 0; }
.process-item span { color: var(--text-grey); font-size: 14px; font-weight: 500; }

.customers-section { padding: 80px 0; background: var(--white); }
.customers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 40px; }
.customer-logo { display: flex; align-items: center; justify-content: center; padding: 40px; background: var(--bg-light-grey); border-radius: 8px; min-height: 150px; }
.customer-logo:hover { background: var(--primary-blue); transform: scale(1.05); box-shadow: var(--shadow-lg); }
.customer-logo .placeholder { background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue)); color: var(--white); width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: 600; font-size: 18px; }

.contact-section { padding: 80px 0; background: var(--bg-light-grey); }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.contact-info { display: flex; flex-direction: column; gap: 30px; }
.contact-item { display: flex; gap: 20px; }
.contact-item i { font-size: 32px; color: var(--accent-orange); flex-shrink: 0; margin-top: 4px; }
.contact-item h4 { margin-bottom: 8px; }
.contact-item p { margin-bottom: 0; font-size: 15px; }
.contact-item a { color: var(--accent-orange); text-decoration: none; }
.contact-item a:hover { color: var(--accent-orange-dark); }
.contact-form { background: var(--white); padding: 40px; border-radius: 8px; box-shadow: var(--shadow-md); }
.contact-form h3 { margin-bottom: 30px; text-align: center; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: var(--primary-blue); font-family: 'Poppins', sans-serif; font-size: 14px; }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px 16px; border: 1px solid var(--border-grey); border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 14px; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--accent-orange); box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.1); }
.form-group textarea { resize: vertical; }
.contact-form .btn { width: 100%; margin-top: 10px; }

.footer { background: var(--dark-charcoal); color: rgba(255, 255, 255, 0.9); padding: 60px 0 20px; }
.footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 40px; }
.footer-section h4 { color: var(--white); margin-bottom: 20px; font-family: 'Poppins', sans-serif; }
.footer-section p { color: rgba(255, 255, 255, 0.8); font-size: 14px; }
.footer-section ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-section a { color: rgba(255, 255, 255, 0.8); text-decoration: none; font-size: 14px; }
.footer-section a:hover { color: var(--accent-orange); }
.footer-bottom { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; text-align: center; font-size: 13px; color: rgba(255, 255, 255, 0.6); }

@media (max-width: 768px) {
    .hamburger { display: flex; }
    .nav-links { position: absolute; top: 100%; left: 0; right: 0; background: var(--white); flex-direction: column; max-height: 0; overflow: hidden; padding: 0; box-shadow: var(--shadow-md); }
    .nav-links.active { max-height: 400px; padding: 20px 0; }
    .nav-links a { padding: 12px 20px; border-bottom: 1px solid var(--border-grey); }
    h1 { font-size: 32px; }
    h2 { font-size: 26px; }
    .hero-content h1 { font-size: 32px; }
    .hero-content p { font-size: 16px; }
    .hero-buttons { flex-direction: column; }
    .btn { width: 100%; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .vision-mission-grid { grid-template-columns: 1fr; }
    .machinery-grid { grid-template-columns: 1fr; }
    .quality-content { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
    h1 { font-size: 24px; }
    h2 { font-size: 20px; }
    h3 { font-size: 18px; }
    p { font-size: 14px; }
}
"""

with open("src/styles.css", "w") as f:
    f.write(css_content)

print("✅ CSS file created successfully!")
