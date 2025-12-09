import { useState, useEffect } from "react";
import Header from "./components/Header";
import CharacterCard from "./components/CharacterCard";
import "./App.css";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  async function loadCharacters(pageNumber) {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      const data = await response.json();

      if (data.error) {
        alert("Página inválida!");
        return;
      }

      setCharacters(data.results);
      setPage(pageNumber);
      setTotalPages(data.info.pages); 
    } catch {
      alert("Erro ao carregar dados!");
    }
  }


  useEffect(() => {
    loadCharacters(page);
  }, []);

  function gotoPage() {
    const num = Number(inputPage);
    if (!num || num < 1 || num > totalPages) {
      alert(`Digite um número entre 1 e ${totalPages}`);
      return;
    }
    loadCharacters(num);
  }

  return (
    <div className="container">
      <Header />

      <div className="pagination-box">

        <input
          type="number"
          placeholder={`Digite a página (1 a ${totalPages})`}
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
        />

        <button onClick={gotoPage}>
          Ir para página
        </button>
      </div>

      <p className="page-info">Página {page} de {totalPages}</p>

      <div className="grid">
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </div>
  );
}
