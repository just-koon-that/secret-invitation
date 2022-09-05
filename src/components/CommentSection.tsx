import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import useLocalStorage from '../hooks/useLocalStorage';
import api from '../utils/api';
import CommentItem from './comments/Item';
import Button from './common/Button';
import Loading from './common/Loading';

const customStyles = {
  overlay: {
    zIndex: 100,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 6,
  },
};

const initialData = {
  author: '',
  comment: '',
};

interface Comment {
  id: string;
  author: string;
  comment: string;
  likes?: number;
  createdAt: number;
  updatedAt: number;
}

interface CommentsResponse {
  total: number;
  items: Comment[];
}

const initialPage = {
  page: 0,
  limit: 5,
};

function CommentSection() {
  const [data, setData] = useState(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState(initialPage);
  const [comments, setComments] = useState<CommentsResponse | null>(null);

  const [currentLikes, setCurrentLikes] = useLocalStorage<Record<string, boolean>>('_likes', {});

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const {page, limit} = initialPage;
      const data = await api.get<CommentsResponse>(`/wapi/items?page=${page}&limit=${limit}`);

      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoreComments = async () => {
    setIsMoreLoading(true);
    try {
      const {page, limit} = pagination;
      const data = await api.get<CommentsResponse>(`/wapi/items?page=${page + 1}&limit=${limit}`);

      setComments(prevComments => ({
        total: data.total,
        items: [...prevComments?.items || [], ...data.items],
      }));

      setPagination({
        page: page + 1,
        limit,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsMoreLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleSubmitComment = async () => {
    try {
      setIsLoading(true);
      await api.put('/wapi/items', data);

      await fetchComments();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);

      handleCloseModal();
      setData(initialData);
    }
  };

  const handleChangeLike = async (id: string, like: boolean) => {
    try {
      const {likes} = await api.put<{likes: number}>(`/wapi/items/${id}/${like ? 'like' : 'unlike'}`);

      setComments(prevComments => prevComments ? ({
        ...prevComments,
        items: prevComments.items.map((item => item.id === id ? ({
          ...item,
          likes,
        }) : item)),
      }) : null);

      setCurrentLikes({
        ...currentLikes,
        [id]: like,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  const isLast = comments && (comments.items.length === comments.total);

  return (
    <div className="relative pb-32 text-2xl text-center font-custom">
      <h1 className="text-4xl font-bold mb-8">
        💌 축하 메세지 💌
      </h1>
      <div className="mb-8">
        <div className="flex flex-col gap-4 mx-8 text-left">
          {comments?.items.length === 0 ? (
            <div className="text-center my-4">
              <p>* 선착순 *</p>
              <p>1등에겐 경품이?!</p>
            </div>
          ) : comments?.items.map(comment => (
            <CommentItem
              key={comment.id}
              {...comment}
              like={currentLikes[comment.id]}
              onChangeLike={(like) => handleChangeLike(comment.id, like)}
            />
          ))}
        </div>
        {(comments && !isLast) && (
          <button
            className="text-center py-2 px-12"
            disabled={isMoreLoading}
            onClick={fetchMoreComments}
          >
            {!isMoreLoading ? '더 볼래요?' : '잠시만요...'}
          </button>
        )}
      </div>
      <Button onClick={handleOpenModal}>{(comments?.total || 0) + 1}번째 메세지 남기기 🥳</Button>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Comment Modal"
      >
        <div className="flex-col">
          <h1 className="mb-4 text-3xl font-custom">축하 메세지 남기기</h1>
          <div>
            <input
              type="text"
              name="author"
              className="border-[1px] rounded-md border-gray-300 mb-2 p-2 caret-pink-400"
              placeholder="작성자"
              onChange={handleChange}
              value={data.author}
            />
          </div>
          <textarea
            name="comment"
            className="border-[1px] rounded-md border-gray-300 mb-2 p-2 h-32 caret-pink-400 resize-none"
            placeholder="축하 메세지를 남겨주세요"
            onChange={handleChange}
            value={data.comment}
          />
          <div>
            <button className="p-2 rounded-md bg-pink-400 text-white" onClick={handleSubmitComment}>등록하기</button>
          </div>
        </div>
      </Modal>
      {isLoading && <Loading />}
    </div>
  )
}

export default CommentSection;
