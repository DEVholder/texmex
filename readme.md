# Texmex

유지보수 비용을 최소한으로 하는 텍스멕스 창업문의 웹 페이지 구현

html, css, js만 이용하여 구현하여 html만 호스팅하면 되게끔 설계
다른 라이브러리는 cdn 방식을 적극 이용

## 페이지 구성
1. header
    브랜드 로고와 페이지의 각 섹션부분의 빠른 이동을 위한 navbar
2. home
    대표 사진들로 자동 슬라이드 구현하고 그 위에 인사말과 창업문의 바로가기 버튼 존재
3. 메뉴
    대표 메뉴 11가지를 자동 슬라이드로 구현
4. 소개
    1. 창업 비용 차트
        창업에 필요한 비용을 표 시트로 정리
    2. 지점 소개
        현재 영업중인 지점에 대한 소개
5. 창업문의
    창업 문의 폼 작성 + 유튜브 소개 영상
6. footer
    기업 정보 기재

## 기능 구현
### 1.창업 문의
1. 다음지도 api
다음 지도 api를 사용하여 주소 입력을 원할하게 구현

2. 청업문의 Form 구현
유지보수비용을 최소화하기 위해 프론트앤드만으로 정보를 수집하고 
백앤드의 경우 구글 Form을 활용함. 
웹페이지에서 입력한 정보를 구글 form으로 REST API 형식으로 정보를 전송하여 제출하게 구현


## 메뉴 목록
1. 오리지날파히타
2. 폴드포크파히타
3. 쉬림프파히타
4. 파히타샘플러
5. 비프,포크,치킨타코
6. 1인파히타
7. 퀘사디아4조각
8. 퀘사디아10인치
9. 눈꽃치즈옥수수
10. 샐러드
11. 나초