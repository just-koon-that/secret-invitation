import '../css/content.css';

import {useEffect, useRef} from 'react';
import Button from './common/Button';
import {findWayInKakao, findWayInNaver} from '../utils/map';
import parkingZoneImage from '../assets/images/parking-zone.jpeg';

const SPOT_LAT = 37.5959568282511;
const SPOT_LNG = 127.610119081614;
const SPOT_ID = 13087095;
const SPOT_NAME = '양평 포레스트펜션';

const SHUTTLE_URL = 'https://shuttle.kakaomobility.com/shuttles/135689';

function LocationSection() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakaoMaps = (window as any).kakao?.maps;
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
  };

  const openShuttleTicket = () => {
    window.open(SHUTTLE_URL);
  };

  return (
    <div className="text-center text-lg font-custom">
      <div className="mb-16">
        <h1 className="text-3xl mb-8">
          어디로 가야하죠~ 기경씨
        </h1>
        <div>
          <p className="font-bold underline">장소</p>
          <p>양평 포레스트펜션 (경기도 양평군 석산로 777)</p>
          <p className="text-xl">* 깊은 산속 주의 *</p>
        </div>
        <div className="mx-4 my-8">
          <div ref={mapRef} className="h-96 w-full" />
        </div>
        <div className="flex justify-center gap-x-2 my-4">
          <Button onClick={() => findWayInKakao(SPOT_ID)}>
            카카오 길찾기
          </Button>
          <Button onClick={() => findWayInNaver({lat: SPOT_LAT, lng: SPOT_LNG, dname: SPOT_NAME})}>
            네이버 길찾기
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl mb-8">
          자차
        </h2>
        <div>
          <p>펜션 도착 시 바로 입구에 주차장이 있습니다!</p>
          <p>만약 주차장이 꽉 찼다면,</p>
          <p>펜션 입구 근처 도로 갓길에 주차 가능합니다.</p>
          <div className="mx-4 my-8">
            <img src={parkingZoneImage} alt="Parking Zone" />
          </div>
          <p>{`당일에 오시면, 친절히 안내드리겠습니다 >3<`}</p>
          <p>
            (신랑의 발렛을 원할 시, <span className="underline">546만원</span>)
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl mb-8">
          남의 차
        </h2>
        <div className="mb-8">
          <div className="mb-4">
            <p className="font-bold underline">시간</p>
            <p>2020.10.15 14:00</p>
          </div>
          <div className="mb-4">
            <p className="font-bold underline">장소</p>
            <p>왕십리역 2호선 0출구 앞</p>  
            <p>
              (<span className="underline">"안지윤 신부"</span> 하객 이라고 표시된 18인승 미니버스)
            </p>
          </div>
          
        </div>
        <Button onClick={openShuttleTicket}>
          승차권 보러가기
        </Button>
      </div>
    </div>
  )
}

export default LocationSection;
