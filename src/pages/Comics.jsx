import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Comic from "../components/Comic";

const Comics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--lz6cdjn4gtmc.code.run/comics"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        return { message: error.response };
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
              <Comic key={index} elem={elem} />
            </>
          );
        })}
      </div>
    </main>
  );
};

export default Comics;
