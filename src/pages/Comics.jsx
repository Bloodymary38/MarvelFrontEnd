import { useState, useEffect } from "react";
import axios from "axios";
import Comic from "../components/Comic";

const Comics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recherche
  const [searchQuery, setSearchQuery] = useState(""); // Stocke la saisie de l'utilisateur
  const [queryToSearch, setQueryToSearch] = useState(""); // Stocke la requête actuelle

  // Pagination
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [itemsPerPage] = useState(14); // Nombre d'éléments par page

  // Fonction pour récupérer les comics
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const skip = (currentPage - 1) * itemsPerPage; // Calcul du skip
      const response = await axios.get(
        `https://site--marvel-backend--lz6cdjn4gtmc.code.run/comics?title=${queryToSearch}&skip=${skip}&limit=${itemsPerPage}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
    setIsLoading(false);
  };

  // Charger les comics au démarrage, quand `queryToSearch` change ou la page change
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
          placeholder="Rechercher un comic..."
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
                <Comic key={index} elem={elem} />
              ))
            ) : (
              <p>Aucun comic trouvé.</p>
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
            <span>Page {currentPage}</span>
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

export default Comics;
