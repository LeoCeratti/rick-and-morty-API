export default function CharacterCard({ character }) {
  return (
    <div className="card">
      <img src={character.image} alt={character.name} />

      <h3>{character.name}</h3>

      <p><b>Gênero:</b> {character.gender}</p>
      <p><b>Origem:</b> {character.origin.name}</p>
    </div>
  );
}
