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


// 이미지 자동 슬라이드 구현
const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let currentIndex = 0;
const slideInterval = 5000; // 5초

function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlidePosition();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlidePosition();
}

rightArrow.addEventListener('click', nextSlide);
leftArrow.addEventListener('click', prevSlide);

setInterval(nextSlide, slideInterval); // 자동 슬라이드

// 버튼 클릭 이벤트
document.getElementById('searchAddressBtn').addEventListener('click', function () {
    // 카카오 주소 검색 창 열기
    new daum.Postcode({
        oncomplete: function (data) {
        // 사용자가 선택한 주소
        const fullAddress = data.address; // 도로명 주소
        const extraAddress = data.buildingName ? ` (${data.buildingName})` : ''; // 상세 주소 정보 (건물명 등)
        // 입력 필드에 주소 설정
        document.getElementById('entry.665767111').value = fullAddress + extraAddress;
    }
    }).open();
});



document.getElementById('startupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // 기본 폼 제출 방지

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdLZNCCJ_93x0rpYTvy5UqCOoStwq-pNeW_nlrtA0CfHDANxw/formResponse';
                    
    // 폼 데이터 생성
    const formData = new URLSearchParams();
    formData.append('entry.1398247081', document.querySelector('input[name="entry.1398247081"]').value); // 성함
    formData.append('entry.754440326', document.querySelector('input[name="entry.754440326"]').value); // 연락처
    formData.append('entry.665767111', document.querySelector('input[name="entry.665767111"]').value); // 창업 희망 지역
    formData.append('entry.975881929', document.querySelector('textarea[name="entry.975881929"]').value); // 상세 내용

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