import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado del modal
import "./styles.css"; // Importa los estilos CSS
import { useNavigate } from "react-router-dom"; // Importa useNavigate para manejar la navegación de rutas
import EditModal from "./EditModal"; // Importa el componente EditModal para editar juegos

// Función asíncrona para eliminar un juego por su ID
const deleteGame = async (id) => {
  const gameDelete = await fetch("http://localhost:3000/api/games/" + id, {
    method: "DELETE", // Utiliza el método DELETE para eliminar el juego
  });

  return gameDelete; // Retorna la respuesta de la eliminación
};

// Componente Card para mostrar los detalles del juego y ofrecer opciones de edición/eliminación
const Card = ({
  title, // Título del juego
  id, // ID del juego
  refreshGames, // Función para refrescar la lista de juegos después de una modificación
  description, // Descripción del juego
  players, // Cantidad de jugadores del juego
  categories, // Categoría del juego
}) => {
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar si el modal de edición está abierto

  // Función para manejar el clic en "Detalle", navega a la página de detalles del juego
  const handleDetailsClick = () => {
    navigate(`/details/${id}`); // Redirige a la página de detalles del juego según su ID
  };

  // Función para manejar el clic en "Borrar", elimina el juego y actualiza la lista
  const handleDeleteClick = async () => {
    const response = await deleteGame(id); // Llama a deleteGame para eliminar el juego
    if (response.ok) {
      refreshGames(); // Si la respuesta es exitosa, refresca la lista de juegos
    }
  };

  // Función para abrir el modal de edición
  const handleEditClick = () => {
    setIsModalOpen(true); // Cambia el estado para abrir el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false); // Cambia el estado para cerrar el modal
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>{" "}
        {/* Muestra el título del juego */}
        <div className="card-wrapp-buttons">
          {/* Botón para ver los detalles del juego */}
          <button className="card-button" onClick={handleDetailsClick}>
            Detalle
          </button>
          {/* Botón para borrar el juego */}
          <button className="card-button" onClick={handleDeleteClick}>
            Borrar
          </button>
          {/* Botón para editar el juego */}
          <button className="card-button" onClick={handleEditClick}>
            Editar
          </button>
        </div>
      </div>
      {/* Si el modal está abierto, renderiza el componente EditModal */}
      {isModalOpen && (
        <EditModal
          id={id} // Pasa el ID del juego al modal de edición
          currentTitle={title} // Pasa el título actual del juego
          currentDescription={description} // Pasa la descripción actual del juego
          currentPlayers={players} // Pasa la cantidad de jugadores actual
          currentCategories={categories} // Pasa las categorías actuales del juego
          refreshGames={refreshGames} // Función para refrescar la lista de juegos
          closeModal={closeModal} // Función para cerrar el modal
        />
      )}
    </div>
  );
};

export default Card; // Exporta el componente Card como predeterminado
