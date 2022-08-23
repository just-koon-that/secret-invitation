
function ProgramSection() {
  return (
    <div className="pb-16 text-center font-custom">
      <h1 className="text-4xl font-bold mb-8">
        결혼엠티 프로그램 안내
      </h1>
      <div className="m-4 text-2xl">
        <div className="my-6">
          <p className="text-3xl underline">15:00</p>
          <p >하객분들 입장 시작, 깨알 보물찾기</p>
          <p className="text-xl">(일찍 오는 분들 보물찾기 할 수 있어요!)</p>
        </div>
        {/* <div className="h-[1px] w-16 bg-gray-300 m-auto" /> */}
        <div className="my-6">
          <p className="text-3xl underline">16:00</p>
          <p>그나마 평범한 결혼식 진행</p>
        </div>
        <div className="my-6">
          <p className="text-3xl underline">17:00</p>
          <p>대 정식 오피셜 바베큐 파티</p>
        </div>
        <div className="my-6">
          <p className="text-3xl underline">19:00</p>
          <p>1차 존잼 게임 대전</p>
          <p className="text-xl">(개인전)</p>
        </div>
        <div className="my-6">
          <p className="text-3xl underline">20:00</p>
          <p>귀가인들 쿨빠이</p>
        </div>
        <div className="my-6">
          <p className="text-3xl underline">21:00</p>
          <p>2차 대존잼 게임 대전</p>
          <p className="text-xl">(팀전 - 신랑팀 vs 신부팀)</p>
        </div>
        <div className="my-6">
          <p className="text-3xl underline">23:00</p>
          <p>부어라마셔라</p>
          <p className="text-xl">(번외 팀전 - 진정한 KU의 주인을 가린다)</p>
        </div>
      </div>
    </div>
  );
}

export default ProgramSection;
