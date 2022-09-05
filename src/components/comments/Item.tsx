// import {useEffect, useRef} from 'react';
// import lottie from 'lottie-web';
import {formatDate} from '../../utils/date';
import {Comment} from '../../types';
import {ReactComponent as HeartFilledIcon} from '../../assets/icons/heart-filled.svg';
import {ReactComponent as HeartOutlinedIcon} from '../../assets/icons/heart-outlined.svg';

interface ItemProps extends Comment {
  like: boolean;
  onChangeLike: (like: boolean) => void;
}

const ICON_SIZE = 20;

function CommentItem({id, author, comment, likes = 0, like, onChangeLike, createdAt}: ItemProps) {
  // const heartRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (!heartRef.current) {
  //     return;
  //   }
  //   lottie.destroy();

  //   lottie.loadAnimation({
  //     container: heartRef.current,
  //     renderer: 'svg',
  //     animationData: require(`../../assets/lotties/twitter-heart.json`),
  //   }).play();
  // }, []);

  return (
    <div className="relative">
      <div className="flex pl-1">
        <h3 className="mr-2 font-extrabold">{author}</h3>
        <p className="text-gray-400">
          {formatDate(createdAt)}
        </p>
      </div>
      <p className="whitespace-pre-line text-gray-700">
        {comment}
      </p>
      <div className="absolute top-0 right-2 flex items-center">
        <p className="text-gray-500 mb-1 mr-2">{likes}</p>
        <button onClick={() => onChangeLike(!like)}>
          {like ? (
            <HeartFilledIcon width={ICON_SIZE} height={ICON_SIZE} />
          ) : (
            <HeartOutlinedIcon width={ICON_SIZE} height={ICON_SIZE} />
          )}
        </button>
        {/* <div className="w-16 h-16" ref={heartRef} /> */}
      </div>
    </div>
  );
}

export default CommentItem;