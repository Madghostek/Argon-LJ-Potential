
// Data retrieved from https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/
var chart = Highcharts.chart('chart', {
    chart: {
        type: 'area'
    },
    xAxis: {
        allowDecimals: false,
    },
    title: undefined,
    legend:{ enabled:false },
    yAxis: {
        title: {
            text: 'Ilość'
        }
    },

    plotOptions: {
        area: {
            pointStart: 0,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        },
    },
    series: [{
        name: undefined,
        data: [
            1,2,5
        ],
        color: {
                linearGradient: {
                    x1: 0,
                    x2: 1,
                    y1: 0,
                    y2: 0
                },
                stops: [
                    [0, '#0000ff'],
                    [1, '#ff0000']
                ]
            }
    }]
});