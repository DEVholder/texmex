document.getElementById('startupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // 기본 폼 제출 방지
  
    let valid = true; // 전체 유효성 상태
  
    // 각 필드 요소 가져오기
    const nameField = document.querySelector('input[name="name"]');
    const phoneField = document.querySelector('input[name="phone"]');
    const areaField = document.querySelector('input[name="area"]');
    const detailsField = document.querySelector('textarea[name="details"]');
  
    // 필수 필드 유효성 검사
    if (nameField.value.trim() === "") {
      nameField.classList.add("is-invalid");
      valid = false;
    } else {
      nameField.classList.remove("is-invalid");
    }
  
    if (phoneField.value.trim() === "") {
      phoneField.classList.add("is-invalid");
      valid = false;
    } else {
      phoneField.classList.remove("is-invalid");
    }
  
    if (areaField.value.trim() === "") {
      areaField.classList.add("is-invalid");
      valid = false;
    } else {
      areaField.classList.remove("is-invalid");
    }
  
    if (detailsField.value.trim() === "") {
      detailsField.classList.add("is-invalid");
      valid = false;
    } else {
      detailsField.classList.remove("is-invalid");
    }
  
    // custom.js에 정의된 지도 관련 데이터 유효성 검사 호출 (해당 함수가 정의되어 있다면)
    if (typeof validateMapData === "function") {
      if (!validateMapData()) {
        valid = false;
      }
    }
  
    // 유효하지 않은 경우 사용자에게 알리고 제출 중단
    if (!valid) {
      alert("모든 필수 필드를 올바르게 입력해 주세요.");
      return;
    }
  
    // 유효성 검사 통과 시, 구글 폼으로 전송할 폼 데이터 생성
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScQ_EazC_vVoiPXax7h1N4FsRaVnIJn3LBlnNlZXxme-Kjvkw/formResponse';
    const formData = new URLSearchParams();
    formData.append('entry.3334061', nameField.value);   // 성함
    formData.append('entry.765580996', phoneField.value);  // 연락처
    formData.append('entry.1754482202', areaField.value);  // 창업 희망 지역
    formData.append('entry.390486289', detailsField.value); // 상세 내용
  
    // Fetch API로 데이터 전송 (no-cors 모드)
    fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })
      .then(() => {
        alert("문의가 성공적으로 접수되었습니다!");
        // 필요시 리다이렉션 설정
        // window.location.href = '#home';
      })
      .catch((error) => {
        console.error("문의 제출 중 오류 발생:", error);
        alert("문의 제출 중 문제가 발생했습니다. 다시 시도해주세요.");
      });
  });
  