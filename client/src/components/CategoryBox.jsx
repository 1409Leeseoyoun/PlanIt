import "../css/CategoryBox.css";

function CategoryBox({ name, setCurrentCategory, currentCategory }) {
  return (
    <div
      className={`category-box ${
        currentCategory === name ? "hoverd-category-box" : ""
      }`}
      onClick={() => {
        setCurrentCategory(name);
      }}
    >
      <p className="category-name">{name}</p>
    </div>
  );
}

export default CategoryBox;
