import '../css/content.css';

import { useEffect, useRef } from 'react';
import Button from './common/Button';
import { findWayInKakao, findWayInNaver } from '../utils/map';

const SPOT_LAT = 37.5959568282511;
const SPOT_LNG = 127.610119081614;
const SPOT_ID = 13087095;
const SPOT_NAME = '양평 포레스트펜션';

function LocationSection() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakaoMaps = (window as any).kakao.maps;
    if (mapRef.current && kakaoMaps) {
      const map = new kakaoMaps.Map(mapRef.current, {
        center: new kakaoMaps.LatLng(SPOT_LAT, SPOT_LNG),
	      level: 4,
        draggable: false,
      });

      const marker = new kakaoMaps.Marker({
        map: map, 
        position: new kakaoMaps.LatLng(SPOT_LAT, SPOT_LNG),
      });

      const onClose = () => overlay.setMap(null);
      
      const overlay = new kakaoMaps.CustomOverlay({
        content: getOverlayContent(onClose),
        position: marker.getPosition(),    
      });

      kakaoMaps.event.addListener(marker, 'click', () => {
        overlay.setMap(map);
      });
    }
  }, []);

  // useEffect(() => {
  //   const kakaoMaps = (window as any).kakao.maps;
  //   if (kakaoMaps) {
  //     console.log(kakaoMaps.services);
  //     const ps = new kakaoMaps.services.Places();

  //     ps.keywordSearch('양평 포레스트펜션', (data: any) => {
  //       console.log(data);
  //     });
  //   }

  // }, []);

  const getOverlayContent = (closeFn: any) => {
    const content = document.createElement('div');
    content.setAttribute('class', 'wrap');

    const info = document.createElement('div');
    info.setAttribute('class', 'info');

    const title = document.createElement('div');
    title.setAttribute('class', 'title');
    title.innerText = SPOT_NAME;

    const closeButton = document.createElement('div');
    closeButton.setAttribute('class', 'close');
    closeButton.addEventListener('click', closeFn);

    title.appendChild(closeButton);

    const body = document.createElement('div');
    body.setAttribute('class', 'body');
    body.innerHTML = `
      <div class="desc">
        <div class="ellipsis">경기 양평군 단월면 석산로 777</div>
        <div class="jibun ellipsis">(지번) 단월면 산음리 604-3</div>
      </div>
    `;

    info.appendChild(title);
    info.appendChild(body);
    content.appendChild(info);

    return content;
  }
  return (
    <div className="mb-16">
      <h1 className="text-3xl font-nanum text-center mb-8">
        어디로 가야하죠~ 기경씨
      </h1>
      <p className="text-lg font-nanum text-center">
        장소: 양평 포레스트펜션 (경기도 양평군 석산로 777)
      </p>
      <p className="text-lg font-nanum text-center">
        *깊은 산속 주의*
      </p>
      <div className="m-4">
        <div ref={mapRef} className="h-96 w-full"></div>
      </div>
      <div className="flex justify-center gap-x-2 my-4">
        <Button onClick={() => findWayInKakao(SPOT_ID)}>
          카카오 길찾기
        </Button>
        <Button onClick={() => findWayInNaver({lat: SPOT_LAT, lng: SPOT_LNG, dname: SPOT_NAME})}>
          네이버 길찾기
        </Button>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-nanum text-center mb-4">
          자차
        </h2>
        <p className="text-lg font-nanum text-center">
          펜션 도착 시 바로 입구에 주차장이 있습니다!
        </p>
        <p className="text-lg font-nanum text-center">
          만약 주차장이 꽉 찼다면,
        </p>
        <p className="text-lg font-nanum text-center">
          펜션 입구 근처 도로 갓길에 주차 가능합니다.
        </p>
        <div className="h-4"></div> 
        {/* TODO: 주차장 이미지 */}
        <p className="text-lg font-nanum text-center">
          {`당일에 오시면, 친절히 안내드리겠습니다 >3<`}
        </p>
        <p className="text-lg font-nanum text-center">
          (신랑의 발렛을 원할 시, <span className="font-black">546만원</span>)
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-nanum text-center mb-4">
          남의 차
        </h2>
        <div className="max-w-xs m-auto">
          <p className="text-lg font-nanum">
            시간: 2020.10.15 14:00
          </p>
          <p className="text-lg font-nanum">
            장소: 왕십리역 2호선 0출구 앞 
          </p>
          <p className="text-lg font-nanum">
            (<span className="underline">안지윤 신부</span> 하객 이라고 표시된 18인승 미니버스)
          </p>
        </div>
        {/* TODO: 탑승권 이미지 첨부 */}
      </div>
    </div>
  )
}

export default LocationSection;
