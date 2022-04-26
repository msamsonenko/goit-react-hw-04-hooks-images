import { useState } from 'react';
import {
  SearchBarContainer,
  SearchForm,
  SerachFormBtn,
  SearchFormInput,
} from './SearchBar.styled';
import { ImSearch } from 'react-icons/im';

export default function SearchBar({ onSubmit }) {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = e => {
    setUserInput(e.currentTarget.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit(userInput);
    reset();
  };
  const reset = () => {
    return setUserInput('');
  };
  return (
    <SearchBarContainer onSubmit={onFormSubmit}>
      <SearchForm>
        <SerachFormBtn type="submit">
          <ImSearch />
        </SerachFormBtn>

        <SearchFormInput
          onChange={handleInputChange}
          value={userInput}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBarContainer>
  );
}
