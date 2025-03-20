import { Link } from "react-router-dom";

const Perso = ({ elem }) => {
  //console.log(elem);

  return (
    <div className="ContainerFiche">
      <Link to={`/Comicsbyperso/${elem._id}`}>
        <div className="Fiche">
          <h2>{elem.name}</h2>
          <p>{elem.description}</p>
        </div>

        <img
          src={`${elem.thumbnail.path}/portrait_incredible.${elem.thumbnail.extension}`}
          alt="img du perso"
        />
      </Link>
    </div>
  );
};

export default Perso;
