document.getElementById('startupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // 기본 폼 제출 방지

    // const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdLZNCCJ_93x0rpYTvy5UqCOoStwq-pNeW_nlrtA0CfHDANxw/formResponse';
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScQ_EazC_vVoiPXax7h1N4FsRaVnIJn3LBlnNlZXxme-Kjvkw/formResponse';
                    
    // 폼 데이터 생성
    const formData = new URLSearchParams();
    formData.append('entry.3334061', document.querySelector('input[name="name"]').value); // 성함
    formData.append('entry.765580996', document.querySelector('input[name="phone"]').value); // 연락처
    formData.append('entry.1754482202', document.querySelector('input[name="area"]').value); // 창업 희망 지역
    formData.append('entry.390486289', document.querySelector('textarea[name="details"]').value); // 상세 내용

    // Fetch API로 데이터 전송
    fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    }).then(() => {
        // 데이터 전송 후 리다이렉션
        alert('문의가 성공적으로 접수되었습니다!');
        // window.location.href = '#home'; // 리다이렉션할 URL 설정
    }).catch((error) => {
        console.error('문의 제출 중 오류 발생:', error);
        alert('문의 제출 중 문제가 발생했습니다. 다시 시도해주세요.');
    });
});