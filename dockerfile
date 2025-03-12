# # Stage 1: GitHub에서 저장소 클론
# FROM alpine/git AS clone-stage
# WORKDIR /app
# RUN git clone https://github.com/DEVholder/texmex.git

# # Stage 2: nginx를 사용하여 정적 파일 서빙
# FROM nginx:alpine
# # (선택 사항) 기본 제공되는 index 파일 삭제
# RUN rm -rf /usr/share/nginx/html/*
# # 클론한 저장소 내의 texmex 폴더를 nginx의 웹 루트로 복사합니다.
# COPY --from=clone-stage /app/texmex /usr/share/nginx/html
# nginx의 공식 이미지를 사용
FROM nginx:alpine

# 기본 제공되는 index 파일 삭제 (선택 사항)
RUN rm -rf /usr/share/nginx/html/*

# 로컬의 특정 파일 및 디렉토리만 복사
COPY index.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css/
COPY js /usr/share/nginx/html/js/
COPY images /usr/share/nginx/html/images/