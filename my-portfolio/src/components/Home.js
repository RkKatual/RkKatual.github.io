import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styling/Home.css';
import profileImg from '../assets/profile.jpg';

const skillGroups = [
  { title: 'Programming Languages', items: ['Python', 'C', 'C++'] },
  { title: 'Cloud Platforms', items: ['Microsoft Azure'] },
  { title: 'DevOps & CI/CD', items: ['Azure Pipelines', 'GitHub Actions', 'Jenkins', 'GitHub', 'Helm', 'Kubernetes', 'Artifactory'] },
  { title: 'Security Analysis', items: ['Snyk', 'Black Duck'] },
  { title: 'Automation', items: ['Python', 'Power Automate'] },
  { title: 'Project Management', items: ['Jira'] },
  { title: 'Tools and Technologies', items: ['Linux', 'Windows', 'Visual Studio Code', 'Postman'] },
  { title: 'Core Computer Science', items: ['Data Structures & Algorithms', 'Machine Learning'] }
];

export default function Home() {
  const [imgLoaded, setImgLoaded] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // keep safe defaults on mount
    if (heroRef.current) {
      heroRef.current.style.setProperty('--px', '50%');
      heroRef.current.style.setProperty('--py', '50%');
      heroRef.current.style.setProperty('--mx', '50');
      heroRef.current.style.setProperty('--my', '50');
    }
  }, []);

  function handlePointerMove(e) {
    const el = heroRef.current || e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / (rect.width || 1)) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / (rect.height || 1)) * 100));
    // set CSS variables on the card element for performant updates
    el.style.setProperty('--px', `${x}%`);
    el.style.setProperty('--py', `${y}%`);
    el.style.setProperty('--mx', `${x}`);
    el.style.setProperty('--my', `${y}`);
  }

  function handlePointerLeave() {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty('--px', `50%`);
    el.style.setProperty('--py', `50%`);
    el.style.setProperty('--mx', `50`);
    el.style.setProperty('--my', `50`);
  }

  return (
    <main className="home full-hero">
      <section id="home" className="hero" onMouseMove={handlePointerMove} onMouseLeave={handlePointerLeave}>
        <motion.div
          ref={heroRef}
          className="hero-card glass dynamic"
          layout
          data-expanded={expanded}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="hero-left">
            <div className={`avatar avatar--large ${!imgLoaded ? 'avatar--no-img' : ''}`}>
              <img
                src={profileImg}
                alt="Ramakanta"
                className="avatar-img"
                onError={() => setImgLoaded(false)}
                onLoad={() => setImgLoaded(true)}
              />
              <span className="avatar-fallback">RK</span>
            </div>

            <div className="intro">
              <h1 className="headline">
                Cybersecurity <span className="accent">Consultant</span>
              </h1>

              <div className="profile-focus" aria-label="Professional focus">
                <div className="focus-item">
                  <span className="focus-label">Application Security</span>
                  <p>Application Security and DevSecOps, specializing in securing applications and automating security processes.</p>
                </div>
                <div className="focus-item">
                  <span className="focus-label">Cloud &amp; DevSecOps</span>
                  <p>Experienced in designing scalable security solutions using Azure, Kubernetes (AKS), and GitHub.</p>
                </div>
                <div className="focus-item">
                  <span className="focus-label">Security Automation</span>
                  <p>Strong background in integrating enterprise security platforms such as Snyk, developing automation workflows, and building centralized vulnerability management solutions.</p>
                </div>
              </div>

              <div className="hero-ctas">
                <a className="btn primary" href="#projects">See my work</a>
                <button
                  className="btn ghost"
                  onClick={() => setExpanded(s => !s)}
                  aria-expanded={expanded}
                >
                  {expanded ? 'Hide details' : 'Show details'}
                </button>
                <a
                  className="btn ghost"
                  href="/Ramakanta-Katual-CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  Download CV
                </a>
              </div>


            </div>
          </div>

          <div className="hero-right">
            <motion.div className="card-preview contact-mini-card" layout>
              <div className="preview-header">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>

              <div className="preview-body contact-mini-body">
                <span className="contact-kicker">GET IN TOUCH</span>
                <h3>Let’s connect</h3>
                <p className="contact-intro">Open to conversations about application security, DevSecOps, and cloud security.</p>
                <a className="contact-email" href="mailto:ramakantakatual789@gmail.com">ramakantakatual789@gmail.com</a>
                <div className="mini-contact-list">
                  <div className="mini-contact-row"><span>Location</span><strong>Bengaluru, India</strong></div>
                  <div className="mini-contact-row"><span>Phone</span><a href="tel:+917978929775">+91-7978929775</a></div>
                </div>
                <a className="contact-linkedin" href="https://www.linkedin.com/in/ramakanta-katual-83530514b/" target="_blank" rel="noreferrer">View LinkedIn profile <span aria-hidden="true">↗</span></a>
              </div>
            </motion.div>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  className="expanded-details"
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.32 }}
                >
                  <h4>What I do</h4>
                  <ul>
                    <li>Application security assessments and secure SDLC improvements</li>
                    <li>DevSecOps automation for Azure, AKS, GitHub, and containerized workloads</li>
                    <li>Vulnerability management and integration of platforms like Snyk</li>
                  </ul>
                  <div className="detail-cta-row">
                    <a className="btn primary" href="#projects">Explore projects</a>
                    <a className="btn ghost" href="#work">Read my work</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </section>

      <section id="work" className="content-section">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">CAREER IMPACT</p>
            <h2>Work Experience</h2>
          </div>
          <p className="section-summary">Helping engineering teams ship securely.</p>
        </div>
        <div className="experience-stats" aria-label="Experience highlights">
          <div><strong>3+</strong><span>years securing software</span></div>
          <div><strong>2</strong><span>roles at Daimler Truck</span></div>
          <div><strong>8+</strong><span>security tools in practice</span></div>
        </div>
        <div className="exp-list">
          <div className="exp-item">
            <div className="exp-header">
              <div>
                <div className="exp-meta"><strong>Consultant</strong> <span className="at">at</span> <span className="company">Daimler Truck Innovation Center India</span></div>
                <div className="exp-focus">Application Security · Vulnerability Management · Secure Development Automation</div>
              </div>
              <div className="exp-period">July 2023– Present</div>
            </div>
            <div className="chip-row" aria-label="Consultant technologies">
              {['Python', 'Snyk', 'GitHub Actions', 'Azure', 'Kubernetes'].map((item) => <span className="chip" key={item}>{item}</span>)}
            </div>
            <ul className="exp-bullets">
              <li>Standardized secure application onboarding through a scalable Snyk SAST framework.</li>
              <li>Automated SAST project setup with Python and GitHub Actions, reducing manual provisioning effort.</li>
              <li>Trained engineering teams on SSDLC and partnered on vulnerability remediation.</li>
              <li>Mapped KPI dashboard logic to track security posture, onboarding progress, and trends.</li>
            </ul>
            <details className="case-study">
              <summary>View case study</summary>
              <div className="case-study-grid">
                <div><span>Challenge</span><p>Application onboarding and security reporting needed a more consistent, scalable process.</p></div>
                <div><span>Approach</span><p>Combined Python automation, GitHub Actions, Snyk integration, and clear implementation workflows.</p></div>
                <div><span>Outcome</span><p>Reduced manual effort, improved onboarding consistency, and gave management clearer security posture insights.</p></div>
              </div>
            </details>
          </div>

          <div className="exp-item">
            <div className="exp-header">
              <div>
                <div className="exp-meta"><strong>Intern</strong> <span className="at">at</span> <span className="company">Daimler Truck Innovation Center India</span></div>
                <div className="exp-focus">Dependency Security · Data Automation</div>
              </div>
              <div className="exp-period">Feb 2023– Jun 2023</div>
            </div>
            <div className="chip-row" aria-label="Internship technologies">
              {['Black Duck', 'Excel VBA', 'Dependency Analysis'].map((item) => <span className="chip" key={item}>{item}</span>)}
            </div>
            <ul className="exp-bullets">
              <li>Analyzed third-party dependency risk with Black Duck and recommended remediation paths.</li>
              <li>Automated Excel data processing with VBA, improving accuracy and reducing repetitive work.</li>
            </ul>
            <details className="case-study">
              <summary>View case study</summary>
              <div className="case-study-grid">
                <div><span>Focus</span><p>Understand third-party dependency risk and make security analysis more repeatable.</p></div>
                <div><span>Approach</span><p>Used Black Duck research alongside Excel Macro and VBA automation.</p></div>
                <div><span>Outcome</span><p>Improved analysis accuracy while reducing repetitive data-processing work.</p></div>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="skills-section home-skills">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-items">
                {group.items.map((item) => (
                  <span className="chip" key={`${group.title}-${item}`}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="content-section">
        <h2>Projects</h2>
        <div className="project-list compact-projects">
          <article className="project-item">
            <div className="project-eyebrow">2025</div>
            <h3>Application Security Onboarding Automation</h3>
            <p>Built secure onboarding workflows for SAST platform integration, reducing manual provisioning and improving standardization for application teams.</p>
          </article>
          <article className="project-item">
            <div className="project-eyebrow">2024</div>
            <h3>DevSecOps Workflow Automation</h3>
            <p>Created GitHub Actions and Python automation pipelines to accelerate onboarding, tracking, and security triage across cloud-native projects.</p>
          </article>
        </div>
      </section>

      <section className="content-section profile-records">
        <div className="record-column">
          <h2>Certifications</h2>
          <div className="credential-grid">
            <article className="credential-card">
              <span className="credential-code">CKA</span>
              <h3>Certified Kubernetes Administrator</h3>
              <p>The Linux Foundation</p>
            </article>
            <article className="credential-card">
              <span className="credential-code">CKS</span>
              <h3>Certified Kubernetes Security Specialist</h3>
              <p>The Linux Foundation</p>
            </article>
            <article className="credential-card">
              <span className="credential-code">AZ-900</span>
              <h3>Microsoft Azure Fundamentals</h3>
            </article>
            <article className="credential-card">
              <span className="credential-code">AZ-204</span>
              <h3>Microsoft Azure Developer Associate</h3>
            </article>
          </div>
        </div>

        <div className="record-column">
          <h2>Education</h2>
          <div className="education-list">
            <article className="education-card">
              <span className="education-period">2021– 2023</span>
              <h3>M.Tech—ComputerScience</h3>
              <p>National Institute of Technology, Rourkela</p>
            </article>
            <article className="education-card">
              <span className="education-period">2016– 2020</span>
              <h3>B.Tech —ComputerScience &amp; Engineering</h3>
              <p>College of Engineering and Technology, Bhubaneswar</p>
            </article>
          </div>
        </div>
      </section>

    </main>
  );
}
