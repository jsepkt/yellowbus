// assets/js/charts-financials.js

document.addEventListener('DOMContentLoaded', () => {

    // Financials Page Charts
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255, 255, 255, 0.05)' }, // Subtle grid
                title: { display: true, text: 'Amount (₹ Crores)', color: '#94A3B8', font: { family: "'Plus Jakarta Sans', sans-serif" } },
                ticks: { color: '#94A3B8', font: { family: "'Plus Jakarta Sans', sans-serif" } }
            },
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                title: { display: true, text: 'Year', color: '#94A3B8', font: { family: "'Plus Jakarta Sans', sans-serif" } },
                ticks: { color: '#94A3B8', font: { family: "'Plus Jakarta Sans', sans-serif" } }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#F8FAFC', font: { family: "'Plus Jakarta Sans', sans-serif" } }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#FFD700',
                bodyColor: '#F8FAFC',
                borderColor: 'rgba(255, 215, 0, 0.3)',
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) { label += ': '; }
                        if (context.parsed.y !== null) {
                            label += `₹${context.parsed.y} Cr`;
                        }
                        return label;
                    }
                }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    // Chart 1: Revenue Growth
    const financialsRevenueChartCtx = document.getElementById('financialsRevenueGrowthChart');
    if (financialsRevenueChartCtx) {
        new Chart(financialsRevenueChartCtx, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7'],
                datasets: [{
                    label: 'Revenue',
                    data: [15, 43, 90, 160, 250, 330, 420],
                    backgroundColor: 'rgba(255, 215, 0, 0.8)', // Gold
                    borderColor: 'rgba(255, 215, 0, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                    hoverBackgroundColor: 'rgba(255, 255, 255, 0.9)',
                }]
            },
            options: {
                ...commonChartOptions,
                plugins: {
                    ...commonChartOptions.plugins,
                    legend: { display: false },
                }
            }
        });
    } else {
        console.warn('Canvas for Revenue Growth Chart not found (in charts-financials.js).');
    }

    // Chart 2: EBITDA & Net Profit Trend
    const financialsProfitabilityChartCtx = document.getElementById('financialsProfitabilityTrendChart');
    if (financialsProfitabilityChartCtx) {
        new Chart(financialsProfitabilityChartCtx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7'],
                datasets: [
                    {
                        label: 'EBITDA',
                        data: [-3, 8, 25, 50, 90, 120, 160],
                        borderColor: '#F8FAFC',    // White
                        backgroundColor: 'rgba(248, 250, 252, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#F8FAFC',
                    },
                    {
                        label: 'Net Profit (PAT)',
                        data: [-6, 1.9, 11.3, 25.1, 50.3, 67.9, 93],
                        borderColor: '#FFD700',   // Gold
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#FFD700',
                    }
                ]
            },
            options: {
                ...commonChartOptions,
                scales: {
                    ...commonChartOptions.scales,
                    y: {
                        ...commonChartOptions.scales.y,
                        beginAtZero: false,
                    }
                }
            }
        });
    } else {
        console.warn('Canvas for Profitability Trend Chart not found (in charts-financials.js).');
    }

    // Chart 3: Use of Funds Pie Chart
    const useOfFundsPieChartCtx = document.getElementById('useOfFundsPieChart');
    if (useOfFundsPieChartCtx) {
        new Chart(useOfFundsPieChartCtx, {
            type: 'pie',
            data: {
                labels: [
                    'Fleet Acquisition & Setup (₹55 Cr)',
                    'Technology Platform & IP (₹10 Cr)',
                    'Marketing & Launch (₹5 Cr)',
                    '12-Month Operational Runway (₹5 Cr)'
                ],
                datasets: [{
                    label: 'Use of Funds (₹ Crores)',
                    data: [55, 10, 5, 5],
                    backgroundColor: [
                        'rgba(255, 215, 0, 0.9)',    // Gold
                        'rgba(2, 6, 23, 0.9)',       // Dark Navy
                        'rgba(245, 158, 11, 0.9)',   // Amber
                        'rgba(148, 163, 184, 0.9)'   // Slate
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#F8FAFC',
                            font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
                            boxWidth: 18,
                            padding: 20
                        }
                    },
                    title: {
                        display: true,
                        text: 'Allocation of ₹75 Cr Seed Capital',
                        font: { size: 14, family: "'Outfit', sans-serif", weight: '500' },
                        padding: { top: 5, bottom: 15 },
                        color: '#F8FAFC'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) {
                                    label = label.split('(')[0].trim();
                                }
                                if (context.parsed !== null) {
                                    // Calculate total for percentage
                                    const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                                    const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                                    label += `: ₹${context.parsed} Cr (${percentage}%)`;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
        console.log("Pie chart instance CREATED for useOfFundsPieChart."); // Confirmation log
    } else {
        console.warn('Canvas for Use of Funds Pie Chart not found (in charts-financials.js).');
    }

}); // This is the ONLY End DOMContentLoaded for charts-financials.js