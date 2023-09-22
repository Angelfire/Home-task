import { useState, useEffect, ChangeEvent, useRef } from "react";

import "./Autocomplete.css";

interface AutoCompleteProps {
  data: string[];
}
interface AutoCompleteState {
  inputValue: string;
  filteredData: string[];
  isOpen: boolean;
  selectedItemIndex: number;
  error: string | null;
}

function AutoComplete({ data }: AutoCompleteProps) {
  const [state, setState] = useState<AutoCompleteState>({
    inputValue: "",
    filteredData: [],
    isOpen: true,
    selectedItemIndex: -1,
    error: null,
  });

  const autoCompleteRef = useRef<HTMLDivElement | null>(null);

  const filterData = async (inputValue: string) => {
    // Simulate an API call with a 100ms delay using a Promise and setTimeout.
    await new Promise((resolve) => setTimeout(resolve, 100));

    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredData;
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const letterRegex = /^[A-Za-z]+$/;

    if (inputValue === "" || letterRegex.test(inputValue)) {
      // If the input is empty or contains only letters, update the state
      const filteredData = await filterData(inputValue);

      setState({
        inputValue,
        filteredData,
        isOpen: true,
        selectedItemIndex: -1,
        error: null,
      });
    } else {
      setState({
        ...state,
        error: "Please enter only letters.",
      });
    }
  };

  const handleItemSelect = (selectedItem: string) => {
    setState({
      ...state,
      inputValue: selectedItem,
      isOpen: false,
    });
  };

  const handleOutsideClick = (event: MouseEvent) => {
    // Check if the autoCompleteRef is defined and the click target is not inside it
    if (
      autoCompleteRef.current &&
      !autoCompleteRef.current.contains(event.target as Node)
    ) {
      // If the click is outside the component, close the AutoComplete dropdown
      setState({
        ...state,
        isOpen: false,
      });
    }
  };

  useEffect(() => {
    // Add a mousedown event listener to the entire document.
    document.addEventListener("mousedown", handleOutsideClick);

    // Return a cleanup function that removes the event listener when
    // the AutoComplete component unmounts or when the dependency array is empty.
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const highlightMatch = (text: string) => {
    // Extract the current input value and convert both text and input value to lowercase.
    const { inputValue } = state;
    const lowerText = text.toLowerCase();
    const lowerInputValue = inputValue.toLowerCase();

    // Find the starting index of the matching part in the lowercase text.
    const startIndex = lowerText.indexOf(lowerInputValue);

    if (startIndex !== -1) {
      // Split the text into three parts: before the match, the matched text, and after the match.
      const beforeMatch = text.slice(0, startIndex);
      const matchedText = text.slice(
        startIndex,
        startIndex + inputValue.length
      );
      const afterMatch = text.slice(startIndex + inputValue.length);

      return (
        <>
          {beforeMatch}
          <span className="highlight">{matchedText}</span>
          {afterMatch}
        </>
      );
    }

    // If no match found, return the original text.
    return text;
  };

  return (
    <div className="auto-complete" ref={autoCompleteRef}>
      <input
        type="text"
        value={state.inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {state.error && <p className="error">{state.error}</p>}
      {state.isOpen && (
        <ul className="auto-complete-results">
          {state.filteredData.map((item, index) => (
            <li
              key={item}
              className={index === state.selectedItemIndex ? "selected" : ""}
              onClick={() => handleItemSelect(item)}
            >
              {highlightMatch(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
