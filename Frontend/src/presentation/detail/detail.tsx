import { useState } from "react";

export const TodoApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Todo作成</button>

      {isModalOpen && (
        <div className="modal">
          <TodoForm onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

const TodoForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで Todo 作成処理
    console.log({ title, dueDate });
    onClose(); // 作成後にモーダルを閉じる
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Todo作成</h2>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">作成</button>
      <button type="button" onClick={onClose}>キャンセル</button>
    </form>
  );
};
