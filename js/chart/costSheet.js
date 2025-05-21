// cost-table.js

// 1. 스타일 문자열 정의 (컴포넌트에만 적용되도록 .cost-table-section 기준)
const costTableStyle = `
.cost-table-section {
  width: 100%;
  max-width: 540px;
  margin: 100px auto 0;
  background: transparent;
  padding: 0;
}
.cost-table-note {
  text-align: right;
  font-size: 0.96em;
  color: #444;
  margin-bottom: 10px;
  margin-right: 4px;
  letter-spacing: -0.5px;
}
.cost-table {
  width: 100%;
  border-collapse: collapse;
  background: transparent;
  font-size: 1.14rem;
  margin-bottom: 0;
}
.cost-table th, .cost-table td {
  text-align: left;
  padding: 13px 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
  background: transparent;
}
.cost-table tr {
  border-bottom: 1.5px solid #bfb3a6;
}
.cost-table tr:last-child {
  border-bottom: none;
}
.cost-table td {
  text-align: right;
  font-family: 'Noto Sans KR', sans-serif;
  background: transparent;
}
.cost-table .cost-total-row th,
.cost-table .cost-total-row td {
  background: #232a32;
  color: #fff;
  font-weight: bold;
  font-size: 1.19em;
  text-align: left;
  padding: 15px 12px;
  border-radius: 0;
  letter-spacing: 0;
}
.cost-table .cost-total-row td {
  text-align: right;
}
.cost-table th {
  font-weight: 600;
}
`;

// 2. 스타일을 <style> 태그로 동적으로 삽입
function injectStyle(css) {
  const styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);
}

// 3. 표 데이터 정의
const costData = [
  { item: "가맹비", cost: 200 },
  { item: "보증금", cost: 300 },
  { item: "교육비", cost: 200 },
  { item: "주방기기", cost: 200 },
  { item: "주방집기", cost: 100 },
  { item: "인테리어", cost: 1000 },
  { item: "간판", cost: 150 },
  { item: "포스기", cost: 10 }
];

// 4. 합계 계산
const costTabletotalCost = costData.reduce((sum, row) => sum + row.cost, 0);

// 5. 표 렌더링 함수
function renderCostTable(data, total) {
  const table = document.getElementById('cost-table');
  let html = "<tbody>";
  data.forEach(row => {
    html += `<tr>
      <th>${row.item}</th>
      <td>${row.cost.toLocaleString()}</td>
    </tr>`;
  });
  // 합계 행
  html += `<tr class="cost-total-row">
    <th>합계</th>
    <td>${total.toLocaleString()}</td>
  </tr>`;
  html += "</tbody>";
  table.innerHTML = html;
}

// 6. DOMContentLoaded 시점에 스타일 삽입 및 테이블 렌더링
document.addEventListener('DOMContentLoaded', function() {
  injectStyle(costTableStyle);
  renderCostTable(costData, costTabletotalCost);
});
