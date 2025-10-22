import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone,
  MapPin
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    produto: [
      { name: "Recursos", href: "#recursos" },
      { name: "Preços", href: "#precos" },
      { name: "Integrações", href: "#integracoes" },
      { name: "API", href: "#api" },
      { name: "Changelog", href: "#changelog" }
    ],
    empresa: [
      { name: "Sobre Nós", href: "#sobre" },
      { name: "Blog", href: "#blog" },
      { name: "Carreiras", href: "#carreiras" },
      { name: "Imprensa", href: "#imprensa" },
      { name: "Parceiros", href: "#parceiros" }
    ],
    suporte: [
      { name: "Central de Ajuda", href: "#ajuda" },
      { name: "Documentação", href: "#docs" },
      { name: "Status", href: "#status" },
      { name: "Contato", href: "#contato" },
      { name: "Comunidade", href: "#comunidade" }
    ],
    legal: [
      { name: "Privacidade", href: "#privacidade" },
      { name: "Termos de Uso", href: "#termos" },
      { name: "Cookies", href: "#cookies" },
      { name: "LGPD", href: "#lgpd" },
      { name: "Segurança", href: "#seguranca" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">G</span>
                </div>
                <span className="text-xl font-bold">GentaHub</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                A plataforma all-in-one para gestão de marketing que combina IA generativa, 
                analytics avançado e automação inteligente para maximizar seus resultados.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>contato@gentahub.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+55 (11) 9999-9999</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>São Paulo, SP - Brasil</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Produto */}
              <div className="space-y-4">
                <h3 className="font-semibold">Produto</h3>
                <ul className="space-y-3">
                  {footerLinks.produto.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Empresa */}
              <div className="space-y-4">
                <h3 className="font-semibold">Empresa</h3>
                <ul className="space-y-3">
                  {footerLinks.empresa.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suporte */}
              <div className="space-y-4">
                <h3 className="font-semibold">Suporte</h3>
                <ul className="space-y-3">
                  {footerLinks.suporte.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h3 className="font-semibold">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 GentaHub. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Feito com ❤️ no Brasil</span>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span>Todos os sistemas operacionais</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

