import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const palette = [
  "#60a5fa",
  "#a855f7",
  "#22c55e",
  "#f97316",
  "#f59e0b",
  "#ec4899",
  "#0ea5e9",
  "#6366f1",
];

function Reports() {
  const [mixedData, setMixedData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);
  const [countBarData, setCountBarData] = useState(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/charts/reports-chart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data || [];
      if (!data.length) return;

      const labels = data.map((r) => r.year_label);
      const dealCounts = data.map((r) => Number(r.deal_count));
      const dealValues = data.map((r) => Number(r.deal_value_billion));

      const barColors = labels.map((_, i) => palette[i % palette.length]);

      // 1) Mixed main chart
      setMixedData({
        labels,
        datasets: [
          {
            type: "line",
            label: "Deal Count",
            data: dealCounts,
            yAxisID: "yCount",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
            borderColor: "#111827",
            pointBackgroundColor: "#111827",
          },
          {
            type: "bar",
            label: "Deal Value (in $bn)",
            data: dealValues,
            yAxisID: "yValue",
            backgroundColor: barColors,
            hoverBackgroundColor: barColors,
            borderRadius: 4,
          },
        ],
      });

      // 2) Doughnut – funding share
      setDoughnutData({
        labels,
        datasets: [
          {
            label: "Share of total funding",
            data: dealValues,
            backgroundColor: barColors,
            hoverBackgroundColor: barColors,
            borderWidth: 0,
          },
        ],
      });

      // 3) Small bar – deal counts
      setCountBarData({
        labels,
        datasets: [
          {
            label: "Deal Count",
            data: dealCounts,
            backgroundColor: "#4b9cff",
            borderRadius: 4,
          },
        ],
      });

      // 4) KPI metrics – ALWAYS global totals + latest period
      const totalFunding = dealValues.reduce((s, v) => s + v, 0);
      const totalDeals = dealCounts.reduce((s, v) => s + v, 0);

      const latest = data[data.length - 1]; // H1 2025
      const prev = data.length > 1 ? data[data.length - 2] : null;

      const latestFunding = Number(latest.deal_value_billion);
      const prevFunding = prev ? Number(prev.deal_value_billion) : null;

      const growthPct =
        prevFunding && prevFunding > 0
          ? ((latestFunding - prevFunding) / prevFunding) * 100
          : null;

      setMetrics({
        totalFunding,
        totalDeals,
        latestFunding,
        growthPct,
      });
    };

    fetchData().catch(console.error);
  }, []);

  const mixedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "GenAI VC Investments, 2018 – June ’25 by Deal Volume and Value",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            if (ctx.dataset.label === "Deal Count") {
              return `Deal Count: ${ctx.parsed.y}`;
            }
            return `Deal Value: $${ctx.parsed.y.toFixed(1)}b`;
          },
        },
      },
    },
    scales: {
      yCount: {
        position: "left",
        beginAtZero: true,
        title: { display: true, text: "Deal Count" },
      },
      yValue: {
        position: "right",
        beginAtZero: true,
        title: { display: true, text: "Deal Value (USD billions)" },
        grid: { drawOnChartArea: false },
      },
      x: {
        title: { display: true, text: "Year / Period" },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Share of Total GenAI Funding by Period",
      },
    },
  };

  const countBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Deal Count by Year / Period",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Deal Count" },
      },
      x: {
        title: { display: true, text: "Year / Period" },
      },
    },
  };

  return (
    <section className="card reports-page" aria-labelledby="reports-heading">
      <h2 id="reports-heading">Reports – GenAI Funding Overview</h2>

      {/* KPI cards */}
      <div className="reports-metrics">
        <div className="metric-card">
          <h3>Deal Value</h3>
          <p className="metric-main">
            {metrics ? `$${metrics.totalFunding.toFixed(1)}B` : "Loading..."}
          </p>
          <p className="metric-sub">2018 – H1 2025 cumulative</p>
        </div>
        <div className="metric-card">
          <h3>Deal Count</h3>
          <p className="metric-main">
            {metrics ? metrics.totalDeals.toLocaleString() : "Loading..."}
          </p>
          <p className="metric-sub">Across all periods</p>
        </div>
        <div className="metric-card">
          <h3>Funding Change</h3>
          <p className="metric-main">
            {metrics ? `$${metrics.latestFunding.toFixed(1)}B` : "Loading..."}
          </p>
          <p className="metric-sub">
            {metrics && metrics.growthPct != null
              ? `H1 2025 vs 2024: ${
                  metrics.growthPct >= 0 ? "+" : ""
                }${metrics.growthPct.toFixed(1)}%`
              : "H1 2025 vs 2024"}
          </p>
        </div>
      </div>

      {/* Charts layout */}
      <div className="reports-layout">
        <div className="reports-main-chart">
          {mixedData ? (
            <Bar
              role="img"
              aria-label="Mixed chart showing GenAI deal value and deal counts over time"
              data={mixedData}
              options={mixedOptions}
            />
          ) : (
            <p>Loading chart…</p>
          )}
        </div>

        <div className="reports-side-charts">
          <div className="small-card">
            {doughnutData ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <p>Loading chart…</p>
            )}
          </div>
          <div className="small-card">
            {countBarData ? (
              <Bar data={countBarData} options={countBarOptions} />
            ) : (
              <p>Loading chart…</p>
            )}
          </div>
        </div>
      </div>

      {/* Text summary / insight */}
      <p className="reports-footnote">
        This dashboard summarizes EY’s Generative AI VC funding data from 2018
        through the first half of 2025. The main chart shows how deal value has
        climbed from just a few billion dollars in 2018 to almost $50B in H1
        2025, with a particularly sharp acceleration from 2021 onward. Deal
        activity (deal count) also grew steadily and peaked in 2024 before
        easing slightly in H1 2025, suggesting fewer but larger deals. The
        donut view highlights how recent years—especially 2023, 2024 and H1
        2025—now account for the majority of cumulative funding, while the
        lower bar chart confirms that deal volumes have expanded each year even
        as ticket sizes have grown.
      </p>
    </section>
  );
}

export default Reports;
