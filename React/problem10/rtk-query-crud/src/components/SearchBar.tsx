interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const SearchBar = ({
  search,
  setSearch,
}: SearchBarProps) => {
  return (
    <input
      type="text"
      placeholder="Search Posts..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  );
};

export default SearchBar;