// 버튼 클릭 이벤트
document.getElementById('searchAddressBtn').addEventListener('click', function () {
    // 카카오 주소 검색 창 열기
    new daum.Postcode({
        oncomplete: function (data) {
        // 사용자가 선택한 주소
        const fullAddress = data.address; // 도로명 주소
        const extraAddress = data.buildingName ? ` (${data.buildingName})` : ''; // 상세 주소 정보 (건물명 등)
        // 입력 필드에 주소 설정
        document.getElementById('addressInput').value = fullAddress + extraAddress;
    }
    }).open();
});