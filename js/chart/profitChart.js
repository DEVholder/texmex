// 동적 로딩 + callback 형태로 Chart.js와 플러그인 로드
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => callback && callback();
    script.onerror = () => console.error(`${src} 로드 실패`);
    document.head.appendChild(script);
}

  // 차트 생성 함수
function profitChart() {
    // 플러그인 등록 (글로벌로 로드된 Chart, ChartDataLabels 사용)
    Chart.register(ChartDataLabels);

    const ctx = document.getElementById('profitChart').getContext('2d');
    const data = {
        labels: ['재료비','영업순이익','플랫폼','인건비','쿠폰 광고','공과금'],
        datasets: [{
            data: [30,21,27,15,5,2],
            backgroundColor: ['#1b352f','#3fc36b','#1f3c2c','#213827','#8fa692','#7a6f62'],
            borderWidth: 0,
            hoverOffset: 10
        }]
    };

    const options = {
        cutout: '30%',
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
                color: '#fff',
                font: ctx => {
                    const lbl = ctx.chart.data.labels[ctx.dataIndex];
                    return (lbl === '영업순이익')
                    ? { size: 40, weight: 'bold' }
                    : { size: 20, weight: 'bold' };
                },
                anchor: ctx => 'center', // 모든 라벨을 섹터 중심에
                align: ctx => 'center',  // 모든 라벨을 섹터 중심에
                offset: 0,               // 바깥으로 밀지 않음
                padding: 0,
                textAlign: 'center',
                clamp: true,
                display: 'auto', // 겹치면 자동으로 숨김
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    if (label === '영업순이익') {
                    return ['영업순이익', value + '%'];
                    }
                    return [label, value + '%'];
                }
            }
        }
    };  

    new Chart(ctx, {
        type: 'doughnut',
        data,
        options
    });
}

  // Chart.js → 플러그인 순으로 로드 후 차트 실행
loadScript('https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js', () => {
    loadScript('https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.js', profitChart);
});
