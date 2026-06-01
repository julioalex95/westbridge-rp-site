import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  MessageCircle,
  Star,
  Car,
  Ticket,
  Video,
  Ban,
  Scale,
  Building2,
  Home,
  CalendarDays,
  Headphones,
  ArrowRight,
  Store,
  MapPin,
  Wifi,
  WifiOff
} from "lucide-react";
import "./styles.css";

function Button({ children, href, variant = "primary", disabled = false }) {
  if (disabled) {
    return <button className={`btn ${variant}`} disabled>{children}</button>;
  }

  return (
    <a
      className={`btn ${variant}`}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function App() {
  const serverName = "Westbridge RP";
  const discordServerId = "1484919968205373681";
  const discordUrl = "https://discord.gg/GNGybDH3ex";
  const serverIp = "134.255.233.35:30310";
  const maxPlayers = 128;
  const connectUrl = `fivem://connect/${serverIp}`;
  const logoUrl = "/logo.png";

  const [playersOnline, setPlayersOnline] = useState(0);
  const [serverOnline, setServerOnline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("A carregar...");

  useEffect(() => {
    let intervalId;

    async function loadServerStatus() {
      try {
        const response = await fetch(`http://${serverIp}/players.json`, {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Servidor indisponível");
        }

        const players = await response.json();

        setPlayersOnline(Array.isArray(players) ? players.length : 0);
        setServerOnline(true);
        setLastUpdated(new Date().toLocaleTimeString("pt-PT", {
          hour: "2-digit",
          minute: "2-digit"
        }));
      } catch (error) {
        setPlayersOnline(0);
        setServerOnline(false);
        setLastUpdated("Offline");
      }
    }

    loadServerStatus();
    intervalId = setInterval(loadServerStatus, 30000);

    return () => clearInterval(intervalId);
  }, [serverIp]);

  const features = [
    { icon: <Users />, title: "Economia realista", text: "Sistema económico estável e dinâmico criado para o RP." },
    { icon: <Star />, title: "Full RP", text: "Roleplay sério e imersivo em todas as situações." },
    { icon: <Building2 />, title: "Empresas", text: "Cria ou trabalha em empresas legais e ilegais." },
    { icon: <Shield />, title: "Polícia & EMS ativos", text: "Forças de segurança e serviços médicos sempre presentes." },
    { icon: <Car />, title: "Carros exclusivos", text: "Viaturas únicas, detalhadas e preparadas para a cidade." },
    { icon: <Home />, title: "Sistema de casas", text: "Compra, decora e vive a tua vida em Westbridge." },
    { icon: <CalendarDays />, title: "Eventos da comunidade", text: "Eventos especiais para criar momentos memoráveis." },
    { icon: <Headphones />, title: "Staff ativa", text: "Equipa presente no Discord para ajudar a comunidade." }
  ];

  const supportRules = [
    { icon: <Ban />, title: "Sem reports in-game", text: "Não existem reports dentro do servidor. Todo o suporte é feito no Discord." },
    { icon: <Ticket />, title: "Tickets no Discord", text: "Todos os reports devem ser abertos através de ticket no Discord oficial." },
    { icon: <Video />, title: "Clip obrigatório", text: "É obrigatório apresentar clip/vídeo da ação no momento de abrir o ticket." },
    { icon: <Scale />, title: "Decisões justas", text: "As decisões serão tomadas com base nas provas apresentadas." }
  ];

  const mansions = [
    {
      name: "Mansão Vinewood",
      status: "Disponível",
      location: "Vinewood Hills",
      image: "",
      description: "Mansão premium com garagem, zona exterior e localização de luxo."
    },
    {
      name: "Mansão Eclipse",
      status: "Brevemente",
      location: "Zona alta da cidade",
      image: "",
      description: "Espaço exclusivo para RP familiar, empresarial ou criminal."
    }
  ];

  return (
    <main>
      <section className="hero" id="inicio">
        <div className="grid-bg" />

        <nav className="nav">
          <div className="brand">
            <img src={logoUrl} alt="Westbridge RP" />
            <span>{serverName}</span>
          </div>

          <div className="links">
            <a href="#inicio">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#regras">Regras</a>
            <a href="#suporte">Suporte</a>
            <a href="#loja-vip">Loja VIP</a>
            <a href={discordUrl} target="_blank" rel="noreferrer">Discord</a>
          </div>
        </nav>

        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="eyebrow"><span /> Bem-vindo à</div>
            <h1><em>Westbridge</em><br />RP</h1>
            <p className="tags">Full RP <b>•</b> Seriedade <b>•</b> Imersão <b>•</b> Comunidade</p>
            <p className="intro">
              A Westbridge RP oferece-te uma experiência de roleplay realista,
              imersiva e feita para quem leva o RP a sério.
            </p>
            <div className="actions">
              <Button href={connectUrl}>Conecta-te agora</Button>
              <Button href={discordUrl} variant="outline">Entra no Discord</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Card className="status-card">
              <img src={logoUrl} alt="Logo Westbridge RP" className="big-logo" />
              <div className="stats">
                <div>
                  <small>IP do servidor</small>
                  <strong>{serverIp}</strong>
                </div>
                <div>
                  <small>Jogadores online</small>
                  <strong>{playersOnline}/{maxPlayers}</strong>
                </div>
                <div className={serverOnline ? "online-box" : "offline-box"}>
                  <small>Status</small>
                  <strong>{serverOnline ? "Online" : "Offline"}</strong>
                </div>
              </div>
              <div className="live-note">
                {serverOnline ? <Wifi size={18} /> : <WifiOff size={18} />}
                Atualizado: {lastUpdated}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="section" id="sobre">
        <div className="section-title">
          <p>O que encontras</p>
          <h2>Na Westbridge RP</h2>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <Card key={feature.title} className="feature">
              <div className="icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section" id="suporte">
        <Card className="support">
          <Ticket className="support-main-icon" />
          <h2>Sistema de Suporte</h2>
          <p className="support-text">
            Na Westbridge RP não existem reports dentro da cidade.
            Todo o suporte é tratado no Discord através de ticket.
          </p>

          <div className="support-grid">
            {supportRules.map((rule) => (
              <div className="support-item" key={rule.title}>
                <div className="red-icon">{rule.icon}</div>
                <h3>{rule.title}</h3>
                <p>{rule.text}</p>
              </div>
            ))}
          </div>

          <div className="warning">
            Tickets sem clip serão automaticamente recusados.
          </div>
        </Card>
      </section>

      <section className="section two-col" id="regras">
        <Card className="rules">
          <Shield />
          <h2>Regras rápidas</h2>
          <p>
            Full RP obrigatório, respeito pela comunidade e bom senso em todas as ações.
            Metagaming, powergaming e combat logging não são permitidos.
          </p>
          <Button href={discordUrl} variant="outline">Ler regras no Discord</Button>
        </Card>

        <Card className="vip">
          <Store />
          <h2>Loja VIP</h2>
          <p>
            Consulta a loja VIP da Westbridge RP diretamente no site.
            Aqui vais encontrar mansões VIP e, futuramente, carros especiais.
          </p>
          <Button href="#loja-vip" variant="dark">Abrir Loja VIP</Button>
        </Card>
      </section>

      <section className="section" id="loja-vip">
        <div className="section-title">
          <p>Loja VIP</p>
          <h2>Mansões e carros</h2>
        </div>

        <div className="shop-tabs">
          <a href="#mansoes" className="shop-tab active">Mansões</a>
          <a href="#carros" className="shop-tab">Carros</a>
        </div>

        <div className="shop-grid" id="mansoes">
          <div className="shop-heading">
            <Home />
            <div>
              <h3>Mansões VIP</h3>
              <p>Adiciona aqui as mansões que queres apresentar diretamente no site.</p>
            </div>
          </div>

          {mansions.map((mansion) => (
            <Card key={mansion.name} className="mansion-card">
              <div className="mansion-image">
                {mansion.image ? (
                  <img src={mansion.image} alt={mansion.name} />
                ) : (
                  <Home />
                )}
              </div>
              <div className="mansion-content">
                <div className="mansion-top">
                  <h4>{mansion.name}</h4>
                  <span className={mansion.status === "Disponível" ? "available" : "soon"}>
                    {mansion.status}
                  </span>
                </div>
                <p className="mansion-location"><MapPin size={16} /> {mansion.location}</p>
                <p>{mansion.description}</p>
                <Button href={discordUrl} variant="outline">Abrir ticket</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="cars-box" id="carros">
          <Car />
          <h3>Carros VIP</h3>
          <p>
            Esta categoria fica preparada para adicionares um ou dois carros especiais no futuro.
            Sem packs VIP e sem vantagens abusivas no RP.
          </p>
          <Button disabled variant="disabled">Brevemente</Button>
        </div>
      </section>

      <section className="section">
        <div className="discord-box">
          <MessageCircle />
          <div>
            <h2>Junta-te à nossa comunidade no Discord</h2>
            <p>Entra no nosso Discord, lê as regras, abre tickets e fica a par de todas as novidades.</p>
            <small>ID do servidor: {discordServerId}</small>
          </div>
          <Button href={discordUrl}>Entrar no Discord <ArrowRight size={18} /></Button>
        </div>
      </section>

      <footer>
        <img src={logoUrl} alt="Westbridge RP" />
        <p>© 2026 {serverName}. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
