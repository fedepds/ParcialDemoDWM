import React, { useEffect, useState } from "react"; // Importa React, los hooks useEffect y useState
import "./styles.css"; // Importa los estilos de la página
import Card from "../../Components/Card/Card"; // Importa el componente Card que se utilizará para mostrar cada juego
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate para manejar la navegación de rutas

// Función asíncrona para obtener los juegos desde la API
const getGames = async () => {
  const gamesFetch = await fetch("http://localhost:3000/api/games"); // Realiza una solicitud fetch a la API para obtener los juegos
  const games = await gamesFetch.json(); // Convierte la respuesta a formato JSON
  return games; // Retorna los juegos obtenidos
};

// Componente principal Home
const Home = () => {
  const [games, setGames] = useState([]); // Define el estado 'games' para almacenar los juegos obtenidos
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda
  const [filteredGames, setFilteredGames] = useState([]); // Estado para almacenar los juegos filtrados
  const navigate = useNavigate(); // Hook para redirigir al usuario a diferentes rutas

  // Función para refrescar la lista de juegos obteniendo los más recientes desde la API
  const refreshGames = async () => {
    const updatedGames = await getGames(); // Obtiene los juegos actualizados
    setGames(updatedGames); // Actualiza el estado con los nuevos juegos
    setFilteredGames(updatedGames); // Inicializa los juegos filtrados con todos los juegos
  };

  // Hook useEffect que se ejecuta una vez al cargar el componente para obtener los juegos iniciales
  useEffect(() => {
    refreshGames(); // Llama a refreshGames cuando el componente se monta
  }, []); // Se ejecuta solo una vez, ya que el array de dependencias está vacío

  // Función para manejar el filtro de búsqueda
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase(); // Convierte el término de búsqueda a minúsculas
    setSearchTerm(searchValue); // Actualiza el estado del término de búsqueda

    // Filtra los juegos basados en el título
    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(searchValue)
    );
    setFilteredGames(filtered); // Actualiza el estado con los juegos filtrados
  };

  // Función para manejar el click en el botón "Agregar Juego", redirige a la página de agregar juegos
  const handleAddGameClick = () => {
    navigate("/addGame"); // Navega a la ruta "/addGame"
  };

  return (
    <div>
      <div className="home-title-wrapp">
        <h1>Juegos COI</h1> {/* Título principal */}
        <button onClick={handleAddGameClick} className="add-game-button">
          Agregar Juego {/* Botón para agregar un juego */}
        </button>
      </div>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {filteredGames.length ? ( // Si hay juegos filtrados disponibles, los muestra en formato de tarjetas
        <div className="home-grid-cards">
          {filteredGames.map((game) => (
            <Card
              key={game.id} // Se asigna una key única a cada tarjeta basada en el id del juego
              title={game.title} // Pasa el título del juego como prop
              id={game.id} // Pasa el id del juego como prop
              refreshGames={refreshGames} // Pasa la función refreshGames como prop para refrescar los juegos si es necesario
            />
          ))}
        </div>
      ) : (
        <div className="home-no-games">No hay juegos para mostrar</div> // Mensaje cuando no hay juegos disponibles
      )}
    </div>
  );
};

export default Home; // Exporta el componente Home como predeterminado
