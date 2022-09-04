import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import api from '../utils/api';
import { formatDate } from '../utils/date';
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
  password?: string;
  createdAt: number;
  updatedAt: number;
}

interface CommentsResponse {
  Count: number;
  ScanCount: number;
  Items: Comment[];
}

function CommentSection() {
  const [data, setData] = useState(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await api.get<CommentsResponse>('/wapi/items');

      setComments(data.Items.sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      console.log(err);
    }
  }

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

  return (
    <div className="relative pb-32 text-2xl text-center font-custom">
      <h1 className="text-4xl font-bold mb-8">
        💌 축하 메세지 💌
      </h1>
      <div className="mb-8 mx-8 text-left">
        {comments?.map(comment => (
          <div key={comment.id} className="mb-8">
            <div className="flex pl-1">
              <h3 className="mr-2 font-extrabold">{comment.author}</h3>
              <p className="text-gray-400">
                {formatDate(comment.createdAt)}
              </p>
            </div>
            <p className="whitespace-pre-line text-gray-700">
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
      
      <Button onClick={handleOpenModal}>✉️ 메세지 남기기</Button>
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
