// useRef() -> "use Reference "does not cause re-renders when its value changes. When you want a component to "remember" some information, but you don't want that information to trigger new renders: animations, handdling focus. useRef returns ref object with a single current property initially set to the initial value you provided.
import { useRef, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./App.css";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;

function App() {
  console.log("key", import.meta.env.VITE_API_KEY);
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setImages(data.results);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
  };
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };
  return (
    <div className="container">
      <h1 className="title">Image Search</h1>
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          {/* Form.Control represents input field */}
          <Form.Control
            type="search"
            placeholder="Enter something to search"
            className="search-input"
            ref={searchInput}
          />
        </Form>
      </div>
      <div className="filters">
        <div onClick={() => handleSelection("nature")}>Nature</div>
        <div onClick={() => handleSelection("birds")}>Birds</div>
        <div onClick={() => handleSelection("cats")}>Cats</div>
        <div onClick={() => handleSelection("shoes")}>Shoes</div>
      </div>
      <div className="images">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className="image"
          />
        ))}
      </div>
    </div>
  );
}

export default App;
