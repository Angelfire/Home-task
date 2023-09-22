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
}

function AutoComplete({ data }: AutoCompleteProps) {
  const [state, setState] = useState<AutoCompleteState>({
    inputValue: "",
    filteredData: [],
    isOpen: true,
    selectedItemIndex: -1,
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
    const filteredData = await filterData(inputValue);

    setState({
      inputValue,
      filteredData,
      isOpen: true,
      selectedItemIndex: -1,
    });
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const abortController = new AbortController();

  //     try {
  //       const response = await fetch("https://rickandmortyapi.com/api/character", {
  //         signal: abortController.signal, // Pass the signal to the fetch request
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       const characterNames = data.results.map((character) => character.name);
  //       setFilteredData(characterNames);
  //     } catch (error) {
  //       if (error.name === "AbortError") {
  //         console.log("Fetch aborted");
  //       } else {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };

  //   if (inputValue) {
  //     fetchData();
  //   } else {
  //     setFilteredData([]); // Clear the list when input is empty
  //   }

  //   return () => {
  //     abortController.abort(); // Abort the fetch when the component unmounts
  //   };
  // }, [inputValue]);

  // This useEffect handles adding and removing a click event listener
  // to detect clicks outside the AutoComplete component.
  useEffect(() => {
    // Add a mousedown event listener to the entire document.
    document.addEventListener("mousedown", handleOutsideClick);

    // Return a cleanup function that removes the event listener when
    // the AutoComplete component unmounts or when the dependency array is empty.
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="auto-complete" ref={autoCompleteRef}>
      <input
        type="text"
        value={state.inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {state.isOpen && (
        <ul className="auto-complete-results">
          {state.filteredData.map((item, index) => (
            <li
              key={item}
              className={index === state.selectedItemIndex ? "selected" : ""}
              onClick={() => handleItemSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
