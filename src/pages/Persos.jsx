import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Perso from "../components/Perso";

const Persos = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--lz6cdjn4gtmc.code.run/characters"
        );

        //console.log(response.data.results);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main>
      <div className="ContainerDeFiches">
        {data.results.map((elem, index) => {
          return (
            <>
              <Perso elem={elem} />
            </>
          );
        })}
      </div>
    </main>
  );
};

export default Persos;
