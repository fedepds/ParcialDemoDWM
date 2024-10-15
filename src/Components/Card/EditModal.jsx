import { useState } from "react";
import "./EditModal.css";

const updateGames = async (id, title, description, players, categories) => {
  const gameEdit = await fetch("http://localhost:3000/api/games/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      players,
      categories,
    }),
  });
  return gameEdit;
};

const EditModal = ({
  currentTitle,
  id,
  refreshGames,
  currentDescription,
  currentPlayers,
  currentCategories,
  closeModal,
}) => {
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [newDescription, setNewDescription] = useState(currentDescription);
  const [newPlayers, setNewPlayers] = useState(currentPlayers);
  const [newCategories, setNewCategories] = useState(currentCategories);

  const handleEditClick = async () => {
    const response = await updateGames(
      id,
      newTitle,
      newDescription,
      newPlayers,
      newCategories
    );
    if (response.ok) {
      refreshGames();
      closeModal();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Juego</h2>
        <input
          type="text"
          placeholder="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad de jugadores"
          value={newPlayers}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value >= 0) {
              setNewPlayers(value);
            }
          }}
        />
        <input
          type="text"
          placeholder="Categorías"
          value={newCategories}
          onChange={(e) => setNewCategories(e.target.value)}
        />
        <button onClick={handleEditClick}>Guardar cambios</button>
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal;
