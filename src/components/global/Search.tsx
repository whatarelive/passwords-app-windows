import { useAccountsStore } from '@/store/accounts-store';
import { useEffect, useState } from 'react';
import { MdSearch, MdClose } from 'react-icons/md';

const Search = () => {
  const [ textValue, setTextValue ] = useState<string>("");
  const { getAccounts, searchAccounts } = useAccountsStore();
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const value = event.target.value;

    if (value.length > 0) {
      setTextValue(value);
    } else {
      setTextValue("");
    }
  }

  useEffect(() => {
    if (textValue.length > 0) {
      searchAccounts(textValue);
    } else {
      getAccounts();
    }
  }, [textValue])

  return (
    <div 
      className={`flex w-full px-2 items-center text-neutral-400 border border-neutral-400 rounded-md 
      bg-transparent focus-within:border-white focus-within:text-white transition-all`}
    >
      <MdSearch size={18}/>
      <input 
        type="text"
        value={textValue}
        onChange={handleChange}
        placeholder="Ingrese lo que dessea buscar"
        className="p-2 w-full focus-visible:outline-none text-white"
      />

      { 
        textValue && (
          <MdClose size={18} className='cursor-pointer' onClick={() => setTextValue("")}/>
        ) 
      }
    </div>
  )
}

export default Search;