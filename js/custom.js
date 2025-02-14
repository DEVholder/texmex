// 주소 검색 버튼 클릭 이벤트 핸들러
document.getElementById('searchAddressBtn').addEventListener('click', function () {
    // 카카오(다음) 주소 검색 창 열기
    new daum.Postcode({
      oncomplete: function (data) {
        // 사용자가 선택한 주소와 추가 정보(건물명 등)를 결합
        const fullAddress = data.address; // 도로명 주소
        const extraAddress = data.buildingName ? ` (${data.buildingName})` : ''; // 추가 주소 정보
        const combinedAddress = fullAddress + extraAddress;
        
        // 주소 입력 필드에 값 설정
        const addressInput = document.getElementById('addressInput');
        addressInput.value = combinedAddress;
        
        // 유효성 검사를 위해 값이 있으면 invalid 클래스를 제거
        if (addressInput.value.trim() !== "") {
          addressInput.classList.remove('is-invalid');
        }
      }
    }).open();
  });
  
  // 지도(주소) 데이터 유효성 검사 함수 (form.js 등에서 호출 가능하도록 전역에 등록)
  window.validateMapData = function () {
    const addressInput = document.getElementById('addressInput');
    if (!addressInput || addressInput.value.trim() === "") {
      // 값이 없으면 invalid 클래스 추가 후 false 반환
      if (addressInput) {
        addressInput.classList.add("is-invalid");
      }
      return false;
    }
    return true;
  };
  