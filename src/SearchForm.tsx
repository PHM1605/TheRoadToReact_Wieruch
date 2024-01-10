import React from 'react';
import { InputWithLabel } from "./InputWithLabel";

type SearchFormProps = {
  searchTerm:string; 
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm = (
    {searchTerm, onSearchInput, onSearchSubmit}: SearchFormProps) => (
    //console.log("RENDERING SEARCH FORM") ||
    <form onSubmit={onSearchSubmit} className="searchForm">
      <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={onSearchInput}>
        Search:
      </InputWithLabel>
      <button type="submit" disabled={!searchTerm} className="button buttonLarge">Submit</button>
    </form>
);
export default SearchForm;