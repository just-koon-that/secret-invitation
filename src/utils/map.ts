
export const findWayInKakao = (id: number) => {
  window.open(`https://map.kakao.com/link/to/${id}`);
};

interface FindWayInNaverProps {
  lat: number;
  lng: number;
  dname: string;
}

export const findWayInNaver = ({lat, lng, dname}: FindWayInNaverProps) => {
  window.open(`nmap://route/car?dlat=${lat}2&dlng=${lng}&dname=${encodeURI(dname)}`)
};