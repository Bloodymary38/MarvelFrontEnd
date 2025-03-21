import { useState, useEffect } from "react";
import axios from "axios";
import Perso from "../components/Perso";

const Persos = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recherche
  const [searchQuery, setSearchQuery] = useState(""); // Stocke la saisie de l'utilisateur
  const [queryToSearch, setQueryToSearch] = useState(""); // Stocke la requête actuelle

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [itemsPerPage] = useState(14); // Nombre d'éléments par page

  // Fonction pour récupérer les persos
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const skip = (currentPage - 1) * itemsPerPage; // Calcul du skip
      const response = await axios.get(
        `https://site--marvel-backend--lz6cdjn4gtmc.code.run/characters?name=${queryToSearch}&skip=${skip}&limit=${itemsPerPage}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
    setIsLoading(false);
  };

  // Charger les persos au démarrage et quand `queryToSearch` change ou la page change
  useEffect(() => {
    fetchData();
  }, [queryToSearch, currentPage]); // S'exécute à l'initialisation et après une recherche ou quand la page change

  // Met à jour la requête au clic sur le bouton
  const handleSearch = () => {
    setCurrentPage(1); // Réinitialise à la première page lors de la recherche
    setQueryToSearch(searchQuery);
  };

  // Gérer le changement de page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <main>
      {/* Barre de recherche + bouton */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher un personnage..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Rechercher
        </button>
      </div>

      {/* Résultats */}
      {isLoading ? (
        <p>Chargement...</p>
      ) : data && data.results ? (
        <section>
          <div className="ContainerDeFiches">
            {data.results.length > 0 ? (
              data.results.map((elem, index) => (
                <Perso key={index} elem={elem} />
              ))
            ) : (
              <p>Aucun personnage trouvé.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <span className="pagination-span">Page {currentPage}</span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={data && data.results.length < itemsPerPage} // Désactive si moins d'éléments que la page
            >
              Suivant
            </button>
          </div>
        </section>
      ) : (
        <p>Aucune donnée disponible.</p>
      )}
    </main>
  );
};

export default Persos;
