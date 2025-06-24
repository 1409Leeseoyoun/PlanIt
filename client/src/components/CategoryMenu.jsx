import { useRef, useEffect, useState } from "react";
import "../css/CategoryMenu.css";

const TAB_LABELS = (currentCategory) => [
  currentCategory === "전체" ? "나의 PlanIt" : "모두보기",
  "남은 디데이",
  "지난 디데이",
  "디데이 추가하기",
];

function CategoryMenu({ currentCategory, activeIndex, onChange }) {
  const menuRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [maxWidth, setMaxWidth] = useState(0);

  const labels = TAB_LABELS(currentCategory);

  useEffect(() => {
    const widths = menuRefs.current.map((el) => el?.offsetWidth || 0);
    setMaxWidth(Math.max(...widths));
  }, [labels]);

  useEffect(() => {
    const el = menuRefs.current[activeIndex];
    if (el) {
      const left = el.offsetLeft + (el.offsetWidth - maxWidth) / 2;
      setIndicatorStyle({ left: `${left}px`, width: `${maxWidth}px` });
    }
  }, [activeIndex, maxWidth]);

  return (
    <div className="menu-content">
      <div className="menu">
        {labels.map((label, i) => (
          <div
            key={label}
            className={`menu-item ${i === activeIndex ? "active" : ""}`}
            ref={(el) => (menuRefs.current[i] = el)}
            onClick={() => onChange(i)}
          >
            <p>{label}</p>
          </div>
        ))}
        <div className="tab-bar" style={indicatorStyle}></div>
      </div>
    </div>
  );
}

export default CategoryMenu;
