import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

function Summary() {
  // === STATE FOR SUMMARY-CHART API ===
  const [fundingChartData, setFundingChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // === 1. Fetch funding trend from /api/charts/summary-chart ===
  useEffect(() => {
    const fetchSummaryChart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMsg("You are not logged in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "http://localhost:3000/api/charts/summary-chart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rows = res.data || [];

        if (!rows.length) {
          setErrorMsg("No summary chart data available.");
          setLoading(false);
          return;
        }

        // Map DB rows -> labels + data
        const labels = rows.map((r) => r.period_label);
        const values = rows.map((r) => Number(r.funding_billion));

        setFundingChartData({
          labels,
          datasets: [
            {
              label: "Global GenAI VC funding (USD billions)",
              data: values,
              borderColor: "rgba(99, 102, 241, 0.7)",
              backgroundColor: "rgba(129, 140, 248, 0.15)",
              pointBackgroundColor: "#4f46e5",
              pointBorderColor: "#fff",
              pointRadius: 6,
              pointHoverRadius: 8,
              tension: 0.35,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching summary-chart data:", err);
        setErrorMsg("Error loading summary chart data.");
        setLoading(false);
      }
    };

    fetchSummaryChart();
  }, []);

  const fundingOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(209, 213, 219, 0.4)" },
      },
      x: {
        ticks: { color: "#6b7280" },
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        labels: { color: "#374151" },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.parsed.y.toFixed(1)}B`,
        },
      },
    },
  };

  // === 2. Other charts can stay as static for now ===

  const dealCountData = {
    labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "H1 2025"],
    datasets: [
      {
        label: "Global GenAI deal count",
        data: [230, 260, 310, 420, 580, 760, 820, 410],
        backgroundColor: "rgba(96, 165, 250, 0.8)",
        borderRadius: 6,
        maxBarThickness: 32,
      },
    ],
  };

  const dealCountOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#6b7280" },
        grid: { color: "rgba(209, 213, 219, 0.4)" },
      },
      x: {
        ticks: { color: "#6b7280", maxRotation: 0, minRotation: 0 },
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const regionData = {
    labels: ["US", "Europe", "Middle East & Africa", "Israel"],
    datasets: [
      {
        data: [70, 15, 10, 5],
        backgroundColor: [
          "rgba(59, 130, 246, 0.9)",
          "rgba(16, 185, 129, 0.9)",
          "rgba(251, 191, 36, 0.9)",
          "rgba(244, 114, 182, 0.9)",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const regionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    cutout: "65%",
  };

  const momentumScore = 86;

  return (
    <section className="card summary-page" aria-labelledby="summary-heading">
      {/* HEADER */}
      <div className="summary-header">
        <div>
          <h2 id="summary-heading">
            Summary – Global Generative AI VC Funding
          </h2>
          <p className="summary-subtitle">
            Advanced AI Insights Dashboard – a high-level view of how global
            GenAI venture funding has accelerated from 2023 to the first half
            of 2025.
          </p>
        </div>

        {/* KPI CARDS (still static text, which is fine) */}
        <div className="summary-stats">
          <div className="summary-stat-card">
            <span className="summary-stat-label">H1 2025 Funding</span>
            <span className="summary-stat-value">$49.2B</span>
            <span className="summary-stat-footnote">Global GenAI VC</span>
          </div>
          <div className="summary-stat-card">
            <span className="summary-stat-label">2024 vs 2023</span>
            <span className="summary-stat-value">+107%</span>
            <span className="summary-stat-footnote">$21.3B → $44.2B</span>
          </div>
          <div className="summary-stat-card">
            <span className="summary-stat-label">H1 2025 vs 2024</span>
            <span className="summary-stat-value">+11%</span>
            <span className="summary-stat-footnote">full-year 2024</span>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="summary-layout">
        {/* LEFT: CHART COLUMN */}
        <div className="summary-charts-column">
          <div className="summary-chart">
            <h3 className="summary-mini-heading">YoY funding trend</h3>
            <p className="summary-mini-subtitle">
              Funding has more than doubled since 2023, with the curve starting
              to flatten in H1 2025.
            </p>

            {loading && <p>Loading chart…</p>}
            {errorMsg && !loading && (
              <p className="error-text" role="alert">
                {errorMsg}
              </p>
            )}
            {!loading && !errorMsg && fundingChartData && (
              <div style={{ height: "260px", marginTop: "0.75rem" }}>
                <Line data={fundingChartData} options={fundingOptions} />
              </div>
            )}
          </div>

          <div className="summary-chart">
            <h3 className="summary-mini-heading">Deal count dynamics</h3>
            <p className="summary-mini-subtitle">
              Deals peaked in 2023–24 and begin to taper in H1 2025 as the
              market shifts toward larger, late-stage rounds.
            </p>
            <div style={{ height: "220px", marginTop: "0.75rem" }}>
              <Bar data={dealCountData} options={dealCountOptions} />
            </div>
          </div>
        </div>

        {/* RIGHT: INSIGHTS + REGION + GAUGE */}
        <aside className="summary-side-panel">
          <h3 className="summary-side-heading">Region breakdown</h3>
          <div className="summary-region-row">
            <div className="summary-region-chart">
              <Doughnut data={regionData} options={regionOptions} />
            </div>
            <ul className="summary-region-legend">
              <li>
                <span className="region-dot region-dot--us" />
                <span>US – ~70% of GenAI VC value</span>
              </li>
              <li>
                <span className="region-dot region-dot--eu" />
                <span>Europe – 15%, growing but still behind</span>
              </li>
              <li>
                <span className="region-dot region-dot--mea" />
                <span>Middle East &amp; Africa – emerging hubs</span>
              </li>
              <li>
                <span className="region-dot region-dot--il" />
                <span>Israel – specialised, high-intensity ecosystem</span>
              </li>
            </ul>
          </div>

          <div className="summary-forecast">
            <h4 className="summary-forecast-heading">
              Forecasts &amp; outlook
            </h4>
            <ul className="summary-bullets">
              <li>
                Funding likely remains high but grows at a slower, more
                sustainable rate after the 2023–24 surge.
              </li>
              <li>
                Deployment-focused companies (infrastructure, copilots, domain
                AI) are expected to capture the bulk of new capital.
              </li>
              <li>
                Regional imbalances persist, but Europe and MEA are projected to
                gain share as local ecosystems mature.
              </li>
            </ul>
          </div>

          <div className="summary-gauge-card">
            <div className="summary-gauge-header">
              <span className="summary-gauge-label">GenAI Market Momentum</span>
              <span className="summary-gauge-score">{momentumScore}/100</span>
            </div>
            <div className="summary-gauge-track" aria-hidden="true">
              <div
                className="summary-gauge-fill"
                style={{ width: `${momentumScore}%` }}
              />
            </div>
            <p className="summary-gauge-caption">
              A composite indicator combining funding growth, deal volumes and
              late-stage activity. Scores above 80 suggest a strong but more
              selective investment environment.
            </p>
          </div>
        </aside>
      </div>
      <p className="summary-source">
        The trends shown above are based on EY’s 2025 Generative AI VC funding report
        covering global investments from 2023 through H1 2025.
      </p>
    </section>
  );
}

export default Summary;
