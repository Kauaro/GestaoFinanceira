import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">MinhasFinanças</h3>
          <p className="footer-description">
            Seu assistente inteligente para gestão financeira pessoal
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Desenvolvedor</h4>
          <div className="footer-developer">
            <p className="developer-name">Kauã Rodrigues</p>
            <p className="developer-role">Full Stack Developer</p>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Conecte-se</h4>
          <div className="footer-links">
            <a 
              href="https://github.com/kauaro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/kauaro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRmVgllbcpWfszDhzVqZxpGPqxKjpFkHfvKbZMRcJQlgZqfLhKMlSwqzBtLgxwpHtLhblwG"
              className="footer-link"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <a 
              href="https://seu-portfolio.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              title="Portfolio"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} MinhasFinanças. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
