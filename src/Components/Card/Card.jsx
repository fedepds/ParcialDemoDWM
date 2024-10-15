import React, { useState } from "react"; // Agrega useState aquí
import "./styles.css";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";

const deleteGame = async (id) => {
  const gameDelete = await fetch("http://localhost:3000/api/games/" + id, {
    method: "DELETE",
  });

  return gameDelete;
};

const Card = ({
  title,
  id,
  refreshGames,
  description,
  players,
  categories,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Ahora useState está definido

  const handleDetailsClick = () => {
    navigate(`/details/${id}`);
  };

  const handleDeleteClick = async () => {
    const response = await deleteGame(id);
    if (response.ok) {
      refreshGames();
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <div className="card-wrapp-buttons">
          <button className="card-button" onClick={handleDetailsClick}>
            Detalle
          </button>
          <button className="card-button" onClick={handleDeleteClick}>
            Borrar
          </button>
          <button className="card-button" onClick={handleEditClick}>
            Editar
          </button>
        </div>
      </div>
      {isModalOpen && (
        <EditModal
          id={id}
          currentTitle={title}
          currentDescription={description}
          currentPlayers={players}
          currentCategories={categories}
          refreshGames={refreshGames}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Card;
