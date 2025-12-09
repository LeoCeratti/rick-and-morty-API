import "../styles/CharacterCard.css";

export default function CharacterCard({ character }) {
  function onError(e) {
    e.currentTarget.src = "https://via.placeholder.com/300x300?text=No+Image";
  }

  return (
    <div className="card">
      <img
        src={character.image}
        alt={character.name}
        loading="lazy"
        onError={onError}
      />

      <h3>{character.name}</h3>

      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Espécie:</strong> {character.species}</p>

      <p><strong>Gênero:</strong> {character.gender}</p>
      <p><strong>Origem:</strong> {character.origin?.name}</p>
    </div>
  );
}
