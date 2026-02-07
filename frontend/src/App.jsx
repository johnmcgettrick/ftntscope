import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/shop")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error fetching shop:", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Fortnite Shop</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
      }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              border: item.isNew ? "3px solid #00ff99" : "1px solid #ccc",
              padding: 10,
              borderRadius: 8,
              background: "#111",
              color: "#fff"
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: "100%", borderRadius: 6 }}
            />
            <h3>{item.name}</h3>
            <p>{item.price} V-Bucks</p>
            {item.isNew && (
              <span style={{
                display: "inline-block",
                padding: "4px 8px",
                background: "#00ff99",
                color: "#000",
                borderRadius: 4,
                fontWeight: "bold"
              }}>
                NEW
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;