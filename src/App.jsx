// useRef() -> "use Reference "does not cause re-renders when its value changes. When you want a component to "remember" some information, but you don't want that information to trigger new renders: animations, handdling focus. useRef returns ref object with a single current property initially set to the initial value you provided.
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import "./App.css";

function App() {
  const searchInput = useRef(null);
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
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
    </div>
  );
}

export default App;
