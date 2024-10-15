import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const AddGame = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [players, setPlayers] = useState("");
  const navigate = useNavigate();
  const buttonIsDisabled = !title || !description || !players || !categories;

  const handleAddGame = async () => {
    const response = await fetch("http://localhost:3000/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, players, categories }),
    });

    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Agregar Juego</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Cantidad de Jugadores"
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Categoría"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>
      </div>

      <button
        className="add-button"
        onClick={handleAddGame}
        disabled={buttonIsDisabled}
      >
        Agregar Juego
      </button>
    </div>
  );
};

export default AddGame;
