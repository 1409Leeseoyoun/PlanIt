// client/src/components/List.jsx
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../css/List.css";

export default function List({
  todos,
  currentCategory,
  filterMode,
  onEdit,
  onDelete,
}) {
  const [openId, setOpenId] = useState(null);

  const filtered = todos.filter((item) => {
    if (currentCategory !== "전체" && item.category !== currentCategory)
      return false;
    if (filterMode === 1) return item.diff >= 0;
    if (filterMode === 2) return item.diff < 0;
    return true;
  });

  return (
    <div className="dday-list">
      {filtered.map((item) => {
        const label = item.diff >= 0 ? `D-${item.diff}` : `D+${-item.diff + 1}`;
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className="dday-content"
            style={{ position: "relative" }}
          >
            <div className="title-content">
              <p className="title">{item.title}</p>
              <p className="category">{item.category}</p>
            </div>
            <div className="d-day">{label}</div>
            <BsThreeDotsVertical
              size={20}
              className="three-dots"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              style={{ position: "absolute", right: 10, cursor: "pointer" }}
            />
            {isOpen && (
              <div
                className="edit-menu-content"
                style={{ position: "absolute", right: -130 }}
              >
                <button className="edit-menu" onClick={() => onEdit(item)}>
                  수정하기
                </button>
                <button className="edit-menu" onClick={() => onDelete(item.id)}>
                  삭제하기
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
