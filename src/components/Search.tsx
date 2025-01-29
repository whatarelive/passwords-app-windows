import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router";

const Search = () => {
  const [searchParams, setSearchParams ] = useSearchParams();

  const handleChange = () => {}

  return (
    <div className="flex p-2 items-center">
      <MdSearch size={24} className="text-black"/>
      <input 
        type="text"
        onChange={handleChange}
        placeholder="Ingrese lo que dessea buscar"
        className="p-2 border border-gray-200 rounded-md bg-transparent focus-visible:border-green-400 focus-visible:outline-none"
      />
    </div>
  )
}

export default Search;