import { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddDDay.css";

const ALL_CATS = ["생일", "과제", "수능", "기념일"];

function AddDDay({ currentCategory, onSave, editItem }) {
  const defaultCat = currentCategory === "전체" ? ALL_CATS[0] : currentCategory;
  const [category, setCategory] = useState(defaultCat);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setDueDate(editItem.due_date);
      setCategory(editItem.category);
    } else {
      setTitle("");
      setDueDate("");
      setCategory(defaultCat);
    }
  }, [editItem, currentCategory]);

  const options = currentCategory === "전체" ? ALL_CATS : [currentCategory];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert("제목과 날짜를 입력하세요.");
      return;
    }
    try {
      if (editItem) {
        await axios.put(`/api/todos/${editItem.id}`, {
          title,
          category,
          due_date: dueDate,
        });
        onSave({ id: editItem.id, title, category, due_date: dueDate });
      } else {
        const res = await axios.post("/api/todos", {
          title,
          category,
          due_date: dueDate,
        });
        onSave({ id: res.data.id, title, category, due_date: dueDate });
      }
      setTitle("");
      setDueDate("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(editItem ? "수정에 실패했습니다." : "추가에 실패했습니다.");
    }
  };

  return (
    <form className="add-dday-form" onSubmit={handleSubmit}>
      <input
        className="title-input"
        type="text"
        placeholder="어떤 날인가요?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="category-select-option"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={currentCategory !== "전체"}
      >
        {options.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        className="date-input"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className="add-submit-button" type="submit">
        <p>{editItem ? "수정 완료" : "추가하기"}</p>
      </button>
    </form>
  );
}

export default AddDDay;
