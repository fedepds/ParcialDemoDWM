import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado de los inputs
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate para manejar la navegación de rutas
import "./styles.css"; // Importa los estilos CSS

// Componente AddGame para agregar un nuevo juego
const AddGame = () => {
  // Define los estados para almacenar los valores de los campos del formulario
  const [title, setTitle] = useState(""); // Estado para almacenar el título del juego
  const [description, setDescription] = useState(""); // Estado para almacenar la descripción del juego
  const [categories, setCategories] = useState(""); // Estado para almacenar las categorías del juego
  const [players, setPlayers] = useState(""); // Estado para almacenar el número de jugadores del juego
  const navigate = useNavigate(); // Hook para redirigir al usuario a diferentes rutas

  // Variable que desactiva el botón si falta algún campo obligatorio
  const buttonIsDisabled = !title || !description || !players || !categories;

  // Función asíncrona que se ejecuta al hacer clic en "Agregar Juego"
  const handleAddGame = async () => {
    const response = await fetch("http://localhost:3000/api/games", {
      method: "POST", // Utiliza el método POST para enviar los datos
      headers: {
        "Content-Type": "application/json", // Define el tipo de contenido como JSON
      },
      body: JSON.stringify({ title, description, players, categories }), // Convierte los datos del juego en formato JSON y los envía en el cuerpo de la solicitud
    });

    if (response.ok) {
      // Si la respuesta es exitosa
      navigate("/"); // Redirige al usuario a la página principal
    }
  };

  return (
    <div>
      <h1>Agregar Juego</h1> {/* Título del formulario */}
      <div>
        <div>
          <input
            type="text"
            placeholder="Título" // Input para el título del juego
            value={title} // Valor controlado por el estado 'title'
            onChange={(e) => setTitle(e.target.value)} // Actualiza el estado cuando el usuario escribe
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Descripción" // Input para la descripción del juego
            value={description} // Valor controlado por el estado 'description'
            onChange={(e) => setDescription(e.target.value)} // Actualiza el estado cuando el usuario escribe
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Cantidad de Jugadores" // Input para la cantidad de jugadores
            value={players} // Valor controlado por el estado 'players'
            onChange={(e) => setPlayers(parseInt(e.target.value))} // Convierte el valor a número y actualiza el estado
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Categoría" // Input para las categorías del juego
            value={categories} // Valor controlado por el estado 'categories'
            onChange={(e) => setCategories(e.target.value)} // Actualiza el estado cuando el usuario escribe
          />
        </div>
      </div>
      {/* Botón para agregar el juego, desactivado si falta algún campo obligatorio */}
      <button
        className="add-button"
        onClick={handleAddGame} // Llama a handleAddGame al hacer clic
        disabled={buttonIsDisabled} // Desactiva el botón si falta algún campo
      >
        Agregar Juego {/* Texto del botón */}
      </button>
    </div>
  );
};

export default AddGame; // Exporta el componente AddGame como predeterminado
