import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Comicsbyperso = () => {
  const { id } = useParams();
  console.log("id : ", id);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [isLoadingComics, setIsLoadingComics] = useState(true);

  // Charger le personnage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--lz6cdjn4gtmc.code.run/character/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur de chargement du personnage :", error);
      }
    };

    fetchData();
  }, [id]);

  // Charger les comics après le chargement du personnage
  useEffect(() => {
    if (!data || !data.comics) return; // Vérifier que les données sont chargées

    const fetchComics = async () => {
      try {
        const comicsData = await Promise.all(
          data.comics.map(async (comicId) => {
            const response = await axios.get(
              `https://site--marvel-backend--lz6cdjn4gtmc.code.run/comic/${comicId}`
            );
            return response.data;
          })
        );

        setComics(comicsData);
        setIsLoadingComics(false);
      } catch (error) {
        console.error("Erreur de chargement des comics :", error);
      }
    };

    fetchComics();
  }, [data]);

  return isLoading ? (
    <p>Chargement du personnage...</p>
  ) : isLoadingComics ? (
    <p>Chargement des comics...</p>
  ) : (
    <main>
      <div className="PersoName">{data.name}</div>

      <div className="ContainerDeFiches">
        {comics.length > 0 ? (
          comics.map((comic, index) => (
            <div className="ContainerFiche" key={index}>
              <div className="Fiche">
                <h2>{comic.title}</h2>
                <p>{comic.description}</p>
              </div>
              <div className="Fiche">
                <img
                  src={
                    comic.thumbnail.path +
                    "/portrait_xlarge" +
                    "." +
                    comic.thumbnail.extension
                  }
                  alt={comic.title}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Aucun comic trouvé pour ce personnage.</p>
        )}
      </div>
    </main>
  );
};

export default Comicsbyperso;
