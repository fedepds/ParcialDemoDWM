import { useState } from "react"; // Importa el hook useState para manejar el estado de los inputs
import "./EditModal.css"; // Importa los estilos específicos para el modal

// Función asíncrona para actualizar los datos de un juego
const updateGames = async (id, title, description, players, categories) => {
  const gameEdit = await fetch("http://localhost:3000/api/games/" + id, {
    method: "PUT", // Método PUT para actualizar un juego existente
    headers: {
      "Content-Type": "application/json", // Define que se envía JSON
    },
    body: JSON.stringify({
      title, // Pasa el título actualizado
      description, // Pasa la descripción actualizada
      players, // Pasa la cantidad de jugadores actualizada
      categories, // Pasa las categorías actualizadas
    }),
  });
  return gameEdit; // Retorna la respuesta de la solicitud
};

// Componente EditModal para editar la información de un juego
const EditModal = ({
  currentTitle, // Título actual del juego
  id, // ID del juego
  refreshGames, // Función para refrescar la lista de juegos tras la actualización
  currentDescription, // Descripción actual del juego
  currentPlayers, // Cantidad de jugadores actual del juego
  currentCategories, // Categorías actuales del juego
  closeModal, // Función para cerrar el modal
}) => {
  // Estados para almacenar los nuevos valores introducidos por el usuario
  const [newTitle, setNewTitle] = useState(currentTitle); // Estado para el nuevo título
  const [newDescription, setNewDescription] = useState(currentDescription); // Estado para la nueva descripción
  const [newPlayers, setNewPlayers] = useState(currentPlayers); // Estado para la nueva cantidad de jugadores
  const [newCategories, setNewCategories] = useState(currentCategories); // Estado para las nuevas categorías

  // Función para manejar el clic en "Guardar cambios"
  const handleEditClick = async () => {
    const response = await updateGames(
      id, // ID del juego a actualizar
      newTitle, // Nuevo título
      newDescription, // Nueva descripción
      newPlayers, // Nueva cantidad de jugadores
      newCategories // Nuevas categorías
    );
    if (response.ok) {
      refreshGames(); // Refresca la lista de juegos si la actualización fue exitosa
      closeModal(); // Cierra el modal
    }
  };

  return (
    <div className="modal-overlay">
      {" "}
      {/* Capa superpuesta del modal */}
      <div className="modal-content">
        {" "}
        {/* Contenido del modal */}
        <h2>Editar Juego</h2> {/* Título del modal */}
        {/* Input para el nuevo título */}
        <input
          type="text"
          placeholder="Título"
          value={newTitle} // Muestra el nuevo título o el actual
          onChange={(e) => setNewTitle(e.target.value)} // Actualiza el estado del título cuando el usuario escribe
        />
        {/* Input para la nueva descripción */}
        <input
          type="text"
          placeholder="Descripción"
          value={newDescription} // Muestra la nueva descripción o la actual
          onChange={(e) => setNewDescription(e.target.value)} // Actualiza el estado de la descripción
        />
        {/* Input para la nueva cantidad de jugadores */}
        <input
          type="number"
          placeholder="Cantidad de jugadores"
          value={newPlayers} // Muestra la cantidad de jugadores actual o nueva
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value >= 0) {
              setNewPlayers(value); // Actualiza el estado de jugadores si el valor es válido
            }
          }}
        />
        {/* Input para las nuevas categorías */}
        <input
          type="text"
          placeholder="Categorías"
          value={newCategories} // Muestra las categorías actuales o nuevas
          onChange={(e) => setNewCategories(e.target.value)} // Actualiza el estado de las categorías
        />
        {/* Botón para guardar los cambios y actualizar el juego */}
        <button onClick={handleEditClick}>Guardar cambios</button>
        {/* Botón para cerrar el modal sin guardar cambios */}
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal; // Exporta el componente EditModal como predeterminado
