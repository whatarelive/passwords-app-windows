import { MdSearch } from "react-icons/md";
// import { useSearchParams } from "react-router";

const Search = () => {
  // const [searchParams, setSearchParams ] = useSearchParams();

  const handleChange = () => {}

  return (
    <div 
      className={`flex w-full px-2 items-center text-neutral-400 border border-neutral-400 rounded-md 
      bg-transparent focus-within:border-white focus-within:text-white transition-all`}
    >
      <MdSearch size={18}/>
      <input 
        type="text"
        onChange={handleChange}
        placeholder="Ingrese lo que dessea buscar"
        className="p-2 w-full focus-visible:outline-none text-white"
      />
    </div>
  )
}

export default Search;