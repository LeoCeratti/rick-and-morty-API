import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import "./Home.css";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [inputPage, setInputPage] = useState("");

  async function fetchCharacters(pageNumber) {
    setLoading(true);

    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      const data = await res.json();

      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  function goToPage() {
    const num = Number(inputPage);

    if (num >= 1 && num <= totalPages) {
      setPage(num);
    } else {
      alert(`Escolha um número entre 1 e ${totalPages}`);
    }
  }

  return (
    <div className="container">
      <h1 className="header">Rick and Morty - Personagens</h1>

      <div className="pagination-box">
        <input
          type="number"
          placeholder={`1 a ${totalPages}`}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
        />
        <button onClick={goToPage}>Ir</button>
      </div>

      <p className="page-info">
        Página {page} de {totalPages}
      </p>

      {loading && <p style={{ textAlign: "center" }}>Carregando...</p>}

      <div className="grid">
        {!loading &&
          characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
      </div>
    </div>
  );
}

export default Home;
