function Dashboard() {
  return (
    <section className="card dashboard-card" aria-labelledby="dashboard-heading">
      <header className="dashboard-header">
        <h2 id="dashboard-heading">Overview – Generative AI Innovations</h2>
        <p className="dashboard-subtitle">
          A snapshot of how global venture capital is flowing into Generative AI as of H1&nbsp;2025.
        </p>
      </header>

      {/* Highlight metric tiles */}
      <div className="dashboard-metrics">
        <div className="dashboard-metric-tile">
          <p className="metric-label">Total GenAI VC Funding (H1 2025)</p>
          <p className="metric-value">$49.2B</p>
          <p className="metric-note">Already above full-year 2024 total of $44.2B</p>
        </div>

        <div className="dashboard-metric-tile">
          <p className="metric-label">Deal Activity Shift</p>
          <p className="metric-value">-25%</p>
          <p className="metric-note">Fewer deals as investors back fewer, larger late-stage rounds</p>
        </div>

        <div className="dashboard-metric-tile">
          <p className="metric-label">Ireland Start-up AI Adoption</p>
          <p className="metric-value">63%</p>
          <p className="metric-note">Using AI today; 36% embed AI into core business models</p>
        </div>
      </div>

      <h3 className="dashboard-section-title">Key investment insights</h3>

      <p>
        In the first half of 2025, global venture capital investment in generative AI reached{" "}
        <strong>$49.2&nbsp;billion</strong>, already surpassing the total for all of 2024{" "}
        (<strong>$44.2&nbsp;billion</strong>) and more than double 2023 levels (
        <strong>$21.3&nbsp;billion</strong>). At the same time, the number of deals has fallen by almost{" "}
        <strong>25%</strong>, as investors concentrate on fewer, larger, late-stage rounds.
      </p>

      <p>
        Average late-stage deal size has jumped to more than <strong>$1.55&nbsp;billion</strong>, up from
        about $0.48&nbsp;billion in 2024. The US now accounts for <strong>97%</strong> of global GenAI deal
        value, with Europe, the Middle East and Africa contributing roughly <strong>2%</strong>. Of the
        world’s 39 recognised GenAI unicorns, <strong>29 are based in the US</strong>, only{" "}
        <strong>3 in Europe</strong> and <strong>2 in Israel</strong>, highlighting a significant regional
        imbalance.
      </p>

      <p>
        For Ireland specifically, AI adoption among startups is strong: about <strong>63%</strong> are
        already using AI and <strong>36%</strong> embed it at the core of their business models. This
        dashboard uses these EY insights to track how GenAI investment is evolving and where opportunities
        and risks are emerging.
      </p>

      {/* NEW — Technical Overview Paragraph */}
      <h3 className="dashboard-section-title">Technical Overview of This Dashboard</h3>

      <p>
        This platform is built using a modern full-stack architecture. The frontend runs on{" "}
        <strong>React + Vite</strong> for high-performance rendering, with reusable UI components styled using
        custom CSS. The backend API is powered by <strong>Node.js and Express</strong>, providing secure
        authentication, routing, and data handling. User sessions are managed through{" "}
        <strong>JWT-based authentication</strong>, while state is maintained via a global{" "}
        <strong>AuthContext</strong>. For deployment, the project is structured to support modern cloud
        environments such as AWS or Azure, and the entire application follows a modular, scalable design
        suitable for production workloads.
      </p>

      <footer className="dashboard-source">
        Source:{" "}
        <a
          href="https://www.ey.com/en_ie/newsroom/2025/06/generative-ai-vc-funding-49-2b-h1-2025-ey-report"
          target="_blank"
          rel="noopener noreferrer"
        >
          Global Venture Capital investment in Generative AI 
        </a>
      </footer>
    </section>
  );
}

export default Dashboard;
