import { useEffect, useState } from "react";
import axios from "axios";
import CategoryBox from "./components/CategoryBox";
import CategoryMenu from "./components/CategoryMenu";
import AddDDay from "./components/AddDDay";
import List from "./components/List";
import "./App.css";

const ALL = 0,
  REMAIN = 1,
  PAST = 2,
  ADD = 3;

function App() {
  const [todos, setTodos] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("전체");
  const [activeTab, setActiveTab] = useState(ALL);
  const [editItem, setEditItem] = useState(null);

  const calcDiff = ({ due_date, category }) => {
    const today = new Date();
    const due = new Date(due_date);
    if (category === "생일") {
      let next = new Date(today.getFullYear(), due.getMonth(), due.getDate());
      if (next < today) next.setFullYear(today.getFullYear() + 1);
      return Math.ceil((next - today) / (1000 * 60 * 60 * 24));
    }
    return Math.floor((due - today) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    axios
      .get("/api/todos")
      .then((res) =>
        setTodos(res.data.map((item) => ({ ...item, diff: calcDiff(item) })))
      );
  }, []);

  const handleSave = (item) => {
    if (editItem) {
      setTodos((prev) => {
        const filtered = prev.filter((t) => t.id !== item.id);
        return [{ ...item, diff: calcDiff(item) }, ...filtered];
      });
    } else {
      setTodos((prev) => [...prev, { ...item, diff: calcDiff(item) }]);
    }
    setEditItem(null);
    setActiveTab(ALL);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setCurrentCategory(item.category);
    setActiveTab(ADD);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1 className="app-name">PlanIt</h1>

      <div className="category-select-content">
        {["전체", "생일", "과제", "수능", "기념일"].map((name) => (
          <CategoryBox
            key={name}
            name={name}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
        ))}
      </div>

      <CategoryMenu
        currentCategory={currentCategory}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === ADD ? (
        <AddDDay
          currentCategory={currentCategory}
          onSave={handleSave}
          editItem={editItem}
        />
      ) : (
        <List
          todos={todos}
          currentCategory={currentCategory}
          filterMode={activeTab}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
