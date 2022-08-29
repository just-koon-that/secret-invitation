import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import api from '../utils/api';
import Button from './common/Button';

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
      await api.put('/wapi/items', data);

      await fetchComments();
    } catch (err) {
      console.log(err);
    } finally {
      handleCloseModal();
      setData(initialData);
    }
  };

  return (
    <div className="pb-32 text-2xl text-center font-custom">
      <h1 className="text-4xl font-bold mb-8">
        💌 축하 메세지 💌
      </h1>
      <div className="mb-8">
        {comments?.map(comment => (
          <div key={comment.id}>
            {comment.author}: {comment.comment}
          </div>
        ))}
      </div>
      
      <Button onClick={handleOpenModal}>✉️ 메세지 남기기</Button>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex-col">
          <div>
            <input
              type="text"
              name="author"
              className="border border-gray-400 mb-2 p-2"
              placeholder="이름"
              onChange={handleChange}
              value={data.author}
            />
          </div>
          <input
            type="text"
            name="comment"
            className="border border-gray-400 mb-2 p-2"
            placeholder="축하 메세지를 남겨주세요"
            onChange={handleChange}
            value={data.comment}
          />
          <div>
            <button className="p-2 bg-gray-300 text-white" onClick={handleSubmitComment}>등록하기</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CommentSection;
