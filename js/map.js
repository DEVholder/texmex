function loadKakaoMapScript(callback) {
    const configScript = document.createElement("script");
    configScript.src = "../../config.js";
    document.head.appendChild(configScript);

    configScript.onload = function () {
        if (typeof KAKAO_API_KEY !== "undefined") {
            console.log("KAKAO API Key Loaded:");

            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
            script.onload = callback; // 콜백 함수 호출
            document.head.appendChild(script);
        } else {
            console.error("KAKAO API Key not found in config.js!");
        }
    };
    configScript.onerror = function () {
        console.error("Failed to load config.js!");
    };
}


// 지점 데이터
const branches = [
    { id: 1, name: "텍스멕스 서초점", address: "서울 서초구 사임당로12길 17 A동 102호", lat: 37.4883, lng: 127.0171 },
    { id: 2, name: "텍스멕스 왕십리점", address: "서울 성동구 마장로 137", lat: 37.5678250213489, lng: 127.025053595952 },
    { id: 3, name: "텍스멕스 장안점", address: "서울 동대문구 답십리로 318 1층", lat: 37.5718995927236, lng: 127.07557816414 },
    { id: 4, name: "텍스멕스 잠실점", address: "서울 송파구 백제고분로32길 6-33 1층 103호", lat: 37.501682105649, lng: 127.093815702097 },
    { id: 5, name: "텍스멕스 천호점", address: "서울 강동구 구천면로36길 21 1층", lat: 37.5426748134349, lng: 127.132803332103 }
];

let map;
let markers = [];

// 카카오맵 초기화 함수
function initKakaoMap() {
    kakao.maps.load(function() {
        console.log("카카오맵 SDK 로드 완료");
        initMap();
        createBranchList();
        document.querySelector('.loading').style.display = 'none';
    });
}

function initMap() {
    const seoulCenter = new kakao.maps.LatLng(37.5665, 126.9780);
    const mapContainer = document.getElementById('map');
    const mapOption = { center: seoulCenter, level: 9 };
    map = new kakao.maps.Map(mapContainer, mapOption);
    map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    map.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
    branches.forEach(branch => addMarker(branch));
}

function addMarker(branch) {
    const position = new kakao.maps.LatLng(branch.lat, branch.lng);
    const marker = new kakao.maps.Marker({ position: position, map: map });
    const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:8px;font-size:12px;width:150px;text-align:center;">
                    <div style="font-weight:bold;font-size:14px;margin-bottom:5px;color:black;">${branch.name}</div>
                    <div style="font-size:11px;color:#777;">${branch.address}</div>
                </div>`
    });
    kakao.maps.event.addListener(marker, 'click', function() {
        closeAllInfowindows();
        infowindow.open(map, marker);
        highlightBranchItem(branch.id);
        map.panTo(position);
    });
    markers.push({ marker, infowindow, branchId: branch.id });
}

function closeAllInfowindows() {
    markers.forEach(item => item.infowindow.close());
}

function createBranchList() {
    const branchListElement = document.getElementById('branchList');
    branches.forEach(branch => {
        const branchItem = document.createElement('div');
        branchItem.className = 'branch-item';
        branchItem.setAttribute('data-id', branch.id);
        branchItem.innerHTML = `<div class="branch-name">${branch.name}</div>
                                <div class="branch-address">${branch.address}</div>`;
        branchItem.addEventListener('click', function() {
            const branchId = parseInt(this.getAttribute('data-id'));
        
            // 이미 활성화되어 있는 경우
            if (this.classList.contains('active')) {
                // 활성화된 하이라이트 제거
                this.classList.remove('active');
                // 모든 인포윈도우 닫기
                closeAllInfowindows();
                // 지도 초기 좌표와 확대비율로 리셋
                const seoulCenter = new kakao.maps.LatLng(37.5665, 126.9780);
                map.setLevel(9);
                map.panTo(seoulCenter);
                return;
            }
            
            // 활성화되지 않은 경우 기존 로직 수행
            const markerObj = markers.find(item => item.branchId === branchId);
            if (markerObj) {
                closeAllInfowindows();
                map.setLevel(7);
                markerObj.infowindow.open(map, markerObj.marker);
                map.panTo(markerObj.marker.getPosition());
                highlightBranchItem(branchId);
            }
        });
        branchListElement.appendChild(branchItem);
    });
}

function highlightBranchItem(branchId) {
    document.querySelectorAll('.branch-item').forEach(item => item.classList.remove('active'));
    const selectedItem = document.querySelector(`.branch-item[data-id="${branchId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 카카오맵 API 로드 후 초기화 실행
loadKakaoMapScript(initKakaoMap);
