
function SearchBar({ city, setCity, onSearch }) {
  return (
    <form onSubmit={onSearch}>
      <input 
        type="text" 
        placeholder="Enter city..." 
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;