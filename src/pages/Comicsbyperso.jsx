import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Comicsbyperso = () => {
  const { id } = useParams();
  console.log("id : ", id);

  const [comics, setComics] = useState([]);
  const [allComics, setAllComics] = useState([]); // ✅ Stockage correct
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAll, setIsLoadingAll] = useState(true);

  // ✅ Charger tous les comics
  useEffect(() => {
    const fetchDataAll = async () => {
      try {
        const responseAll = await axios.get(
          "https://site--marvel-backend--lz6cdjn4gtmc.code.run/comics"
        );
        setAllComics(responseAll.data.results);
        setIsLoadingAll(false);
      } catch (error) {
        console.error("Erreur de chargement des comics :", error);
      }
    };

    fetchDataAll();
  }, []);

  // ✅ Charger le personnage
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
  }, []); // ✅ Déclenchement lorsque `id` change

  // ✅ Filtrer les comics APRÈS chargement des données
  useEffect(() => {
    if (!isLoading && !isLoadingAll && data && allComics.length > 0) {
      //   const filtered = allComics.filter((comic) =>
      //     data.results[0].comics.includes(comic._id)
      //   );

      const filtered = [];

      console.log("data.comics[0] = " + data.comics[0]);
      console.log("allComics[0]._id = " + allComics[0]._id);

      //   for (let i = 0; i < allComics.length; i++) {
      //     for (let j = 0; j < data.comics.length; i++) {
      //       if (data.comics[j] === allComics[0]._id) {
      //         filtered.push(allComics[0]);
      //       }
      //     }
      //   }

      //   for (let i = 0; i < allComics.length; i++) {
      //     console.log("data.comics[0] " + data.comics[0]);

      //     if (data.comics.includes(allComics[i]._id)) {
      //       filtered.push(allComics[i]);
      //     }
      //   }

      setComics(filtered);

      console.log({ filtered });

      console.log({ data });

      console.log({ allComics });

      ///
    }
  }, [isLoading, isLoadingAll, data, allComics]); // ✅ Exécuté quand les données sont chargées

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <div className="ContainerFiche">
      <div className="Fiche">
        <p>fin traiteùent</p>

        {/* {comics.length > 0 ? (
          comics.map((comic, index) => (
            <div key={index}>
              <h3>{comic.title}</h3>
              <p>{comic.description}</p>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                width="150"
              />
            </div>
          ))
        ) : (
          <p>Aucun comic trouvé pour ce personnage.</p>
        )} */}
      </div>
    </div>
  );
};

export default Comicsbyperso;
