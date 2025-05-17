// assets/js/charts-financials.js

document.addEventListener('DOMContentLoaded', () => {

    // Financials Page Charts
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true, // Default, can be overridden
                title: { display: true, text: 'Amount (₹ Crores)', font: { family: "'Inter', sans-serif" } },
                ticks: { font: { family: "'Inter', sans-serif" } }
            },
            x: {
                title: { display: true, text: 'Year', font: { family: "'Inter', sans-serif" } },
                ticks: { font: { family: "'Inter', sans-serif" } }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: { font: { family: "'Inter', sans-serif" } }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
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
                    backgroundColor: 'rgba(23, 58, 94, 0.8)', // var(--primary-medium) with alpha
                    borderColor: 'rgba(10, 25, 47, 1)',     // var(--primary-dark)
                    borderWidth: 1,
                    borderRadius: 4,
                    hoverBackgroundColor: 'rgba(255, 191, 0, 0.9)', // var(--accent-main) on hover
                }]
            },
            options: {
                ...commonChartOptions,
                plugins: {
                    ...commonChartOptions.plugins,
                    legend: { display: false }, // Only one dataset
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
                        borderColor: 'rgba(23, 58, 94, 1)',    // var(--primary-medium)
                        backgroundColor: 'rgba(23, 58, 94, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: 'rgba(23, 58, 94, 1)',
                    },
                    {
                        label: 'Net Profit (PAT)',
                        data: [-6, 1.9, 11.3, 25.1, 50.3, 67.9, 93],
                        borderColor: 'rgba(255, 191, 0, 1)',   // var(--accent-main)
                        backgroundColor: 'rgba(255, 191, 0, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: 'rgba(255, 191, 0, 1)',
                    }
                ]
            },
            options: {
                ...commonChartOptions,
                scales: {
                    ...commonChartOptions.scales,
                    y: {
                        ...commonChartOptions.scales.y,
                        beginAtZero: false, // Allow negative values for initial years' losses
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
            type: 'pie', // Could also be 'doughnut'
            data: {
                labels: [
                    'Fleet Acquisition & Setup (₹55 Cr)',
                    'Technology Platform & IP (₹10 Cr)',
                    'Marketing & Launch (₹5 Cr)',
                    '12-Month Operational Runway (₹5 Cr)'
                ],
                datasets: [{
                    label: 'Use of Funds (₹ Crores)',
                    data: [55, 10, 5, 5], // Corresponds to the labels
                    backgroundColor: [
                        'rgba(10, 25, 47, 0.8)',    // var(--primary-dark)
                        'rgba(23, 58, 94, 0.8)',    // var(--primary-medium)
                        'rgba(255, 191, 0, 0.8)',   // var(--accent-main)
                        'rgba(233, 236, 239, 0.8)'  // var(--neutral-light)
                    ],
                    borderColor: [ // Added distinct, visible borders for better separation
                        'rgba(248, 249, 250, 1)', // var(--neutral-lightest) - solid white for contrast
                        'rgba(248, 249, 250, 1)',
                        'rgba(248, 249, 250, 1)',
                        'rgba(108, 117, 125, 1)'  // var(--neutral-dark) for light slice border
                    ],
                    borderWidth: 2, // Made border slightly thicker
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Important for controlling size via CSS
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: "'Inter', sans-serif", size: 11 }, // Slightly larger font
                            boxWidth: 18, // Slightly larger box
                            padding: 20  // More padding
                        }
                    },
                    title: {
                        display: true, // Let's display a title via Chart.js for this one
                        text: 'Allocation of ₹75 Cr Seed Capital',
                        font: { size: 14, family: "'Poppins', sans-serif", weight: '500' }, // Use Poppins for chart title
                        padding: { top: 5, bottom: 15 },
                        color: '#495057' // var(--neutral-dark)
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
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