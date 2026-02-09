import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rarity, setRarity] = useState("");
  const [showNewOnly, setShowNewOnly] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/shop")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading shop…</p>;

  const filteredItems = rarity
  ? items.filter(i => i.rarity === rarity)
  : items;

  const visibleItems = filteredItems.filter(item =>
    showNewOnly ? item.isNew : true
  );  

  return (
    <div style={{ padding: 20 }}>
      <h1>Fortnite Shop</h1>

      <FilterBar rarity={rarity} setRarity={setRarity} />

      <label style={{ marginLeft: 20 }}>
        <input
          type="checkbox"
          checked={showNewOnly}
          onChange={() => setShowNewOnly(!showNewOnly)}
        />
        Show new items only
      </label>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
      }}>
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}

const rarityColors = {
  common: "#8e8e8e",
  uncommon: "#1eff00",
  rare: "#0070dd",
  epic: "#a335ee",
  legendary: "#ff8000"
};

function FilterBar({ rarity, setRarity }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <select
        value={rarity}
        onChange={e => setRarity(e.target.value)}
        style={{ padding: 8, fontSize: 16 }}
      >
        <option value="">All Rarities</option>
        <option value="common">Common</option>
        <option value="uncommon">Uncommon</option>
        <option value="rare">Rare</option>
        <option value="epic">Epic</option>
        <option value="legendary">Legendary</option>
      </select>
    </div>
  );
}

function ItemCard({ item }) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        borderRadius: 12,
        padding: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        border: `2px solid ${rarityColors[item.rarity] || "#444"}`,
        transition: "transform 0.15s ease",
        cursor: "pointer"
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        style={{ width: "100%", borderRadius: 8 }}
      />

      <h3 style={{ marginTop: 10 }}>{item.name}</h3>
      <p style={{ margin: 0 }}>{item.price} V-Bucks</p>

      {item.isNew && (
        <div
          style={{
            marginTop: 8,
            display: "inline-block",
            padding: "4px 8px",
            background: "#00ff99",
            color: "#000",
            borderRadius: 4,
            fontWeight: "bold"
          }}
        >
          NEW
        </div>
      )}
    </div>
  );
}

export default App;