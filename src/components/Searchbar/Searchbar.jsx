const Searchbar = ({ onSubmit }) => {
  return (
    <header>
      <form onSubmit={onSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          name="search"
          type="text"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
