import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { FiMail, FiPhone, FiDownload } from 'react-icons/fi';

export function SocialLinks() {
  return (
    <div className="socials" aria-label="Contact and social profiles">
      <a href="https://github.com/anouar36" target="_blank" rel="noopener noreferrer" aria-label="Anouar on GitHub (opens in a new tab)" title="GitHub">
        <FaGithub className="icon" aria-hidden="true" />
      </a>
      <a href="https://www.linkedin.com/in/anouar-ech-charai/" target="_blank" rel="noopener noreferrer" aria-label="Anouar on LinkedIn (opens in a new tab)" title="LinkedIn">
        <FaLinkedinIn className="icon" aria-hidden="true" />
      </a>
      <a href="mailto:anouarechcharai@gmail.com" aria-label="Email Anouar" title="Email">
        <FiMail className="icon" aria-hidden="true" />
      </a>
      <a href="tel:+212639383709" aria-label="Call Anouar" title="Phone">
        <FiPhone className="icon" aria-hidden="true" />
      </a>
      <a href="/assets/ANOUAR_ECHCHARAI_CV_JAVA.pdf" download="ANOUAR_ECHCHARAI_CV_JAVA.pdf" aria-label="Download CV as PDF" title="Download CV">
        <FiDownload className="icon" aria-hidden="true" />
      </a>
      <span className="hand social-note">Let’s make something great ↗</span>
    </div>
  );
}
