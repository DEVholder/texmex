// profitSheet.js - 영업이익 표 생성

(function() {
  // 1. 스타일 문자열 정의 (고유 이름으로 충돌 방지)
  const profitTableStyle = `
    .profit-table-section {
      width: 100%;
      max-width: 540px;
      margin: 0 auto;
      background: transparent;
      padding: 0;
    }
    .profit-table {
      width: 100%;
      border-collapse: collapse;
      background: transparent;
      font-size: 1.15rem;
      margin-bottom: 0;
    }
    .profit-table th, .profit-table td {
      padding: 14px 10px;
      font-weight: 500;
      letter-spacing: -0.5px;
      background: transparent;
    }
    .profit-table th {
      text-align: center;
      font-weight: 600;
    }
    .profit-table td {
      text-align: center;
      font-family: 'Noto Sans KR', sans-serif;
    }
    .profit-table tr {
      border-bottom: 1px solid #bfb3a6;
    }
    .profit-table tr:last-child {
      border-bottom: none;
    }
    .profit-margin-row {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      width: 100%;
      background: transparent;
    }
    .profit-margin-label {
      flex: 1.2;
      background: #232a32;
      color: #fff;
      font-weight: bold;
      font-size: 1.1em;
      text-align: center;
      padding: 16px 0;
    }
    .profit-margin-value {
      flex: 2;
      background: #232a32;
      color: #fff;
      font-weight: bold;
      font-size: 1.1em;
      text-align: center;
      padding: 16px 0;
    }
    .profit-margin-rate {
      flex: 1;
      background: #217b2b;
      color: #fff;
      font-weight: bold;
      font-size: 1.4em;
      text-align: center;
      padding: 16px 0;
    }
    .profit-table-desc {
      margin-top: 24px;
      font-size: 0.95em;
      color: #222;
      text-align: center;
      line-height: 1.6;
      opacity: 0.85;
      background: transparent;
    }
  `;

  // 2. 스타일 삽입 함수
  function injectStyle(css) {
    const styleTag = document.createElement('style');
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  }

  // 3. 표 데이터 정의 (이미지와 동일하게)
  const profitData = [
    { item: "총 매출", value: 64052730, percentage: "100%" },
    { item: "재료비", value: 19343924, percentage: "30%" },
    { item: "플랫폼 수수료", value: 17294237, percentage: "27%" },
    { item: "인건비", value: 9639935, percentage: "15%" },
    { item: "쿠폰 광고비", value: 3202636, percentage: "5%" },
    { item: "공과금", value: 1345107, percentage: "2%" }
  ];

  // 4. 마진 계산
  const profitTotalSales = profitData[0].value;
  const profitExpenses = profitData.slice(1).reduce((sum, row) => sum + row.value, 0);
  const profitMargin = profitTotalSales - profitExpenses;
  const profitMarginRate = "21%";

  // 5. 표 렌더링 함수
  function renderProfitTable() {
    const table = document.getElementById('profit-table');
    if (!table) return;

    let html = "<thead><tr><th>구분</th><th>금액</th><th>비율</th></tr></thead><tbody>";
    profitData.forEach(row => {
      html += `<tr>
        <th>${row.item}</th>
        <td>${row.value.toLocaleString()}원</td>
        <td>${row.percentage}</td>
      </tr>`;
    });
    html += "</tbody>";
    table.innerHTML = html;
    
    // 마진율 박스 값 설정
    const marginValueEl = document.getElementById('profit-margin-value');
    const marginRateEl = document.getElementById('profit-margin-rate');
    if (marginValueEl) marginValueEl.textContent = profitMargin.toLocaleString() + '원';
    if (marginRateEl) marginRateEl.textContent = profitMarginRate;
  }

  // 6. DOM 로드 완료 시 실행
  document.addEventListener('DOMContentLoaded', function() {
    injectStyle(profitTableStyle);
    renderProfitTable();
  });
})(); // 즉시실행함수로 변수 스코프 격리
