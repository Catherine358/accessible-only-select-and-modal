import './App.css';
import {useState, useEffect, useRef} from "react";

function App() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeDescendant, setActiveDescendant] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const options = ['Apple', 'Banana', 'Orange'];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState('');
    const inputRef = useRef(null);
    const closeBtnRef = useRef(null);

    const select = (value) => {
        if (value) {
            setSelectedValue(value);
        }
        setIsDropdownOpen(false);
        setActiveDescendant(null);
        setActiveIndex(-1);
    };

    useEffect(() => {
        if (inputRef && isModalOpen) {
            inputRef.current.focus();
        }
    }, [inputRef, isModalOpen]);

    const handleKeyDown = (e) => {
        const isNavKey = [
            'ArrowUp',
            'ArrowDown',
            'Up',
            'Down',
            'Home',
            'End',
        ].includes(e.key);
        const firstIndex = 0;
        const lastIndex = options.length - 1;

        const updateIndex = (index) => {
            setActiveIndex(index);
            setActiveDescendant(options[index]?.id);
        };

        if (!isDropdownOpen) {
            if (isNavKey) {
                e.preventDefault();
                setIsDropdownOpen(true);

                if (['ArrowUp', 'Up', 'Home'].includes(e.key)) {
                    updateIndex(firstIndex);
                } else if (['End'].includes(e.key)) {
                    updateIndex(lastIndex);
                }
            }
            return;
        }

        switch (e.key) {
            case 'ArrowUp':
            case 'Up':
                e.preventDefault();
                if (e.altKey) {
                    select(options[activeIndex]);
                    break;
                }
                const prevIndex = activeIndex <= 0 ? 0 : activeIndex - 1;
                updateIndex(prevIndex);
                break;
            case 'ArrowDown':
            case 'Down':
                e.preventDefault();
                const nextIndex =
                    activeIndex + 1 === options.length ? activeIndex : activeIndex + 1;
                updateIndex(nextIndex);
                break;
            case 'Home':
            case 'PageUp':
                e.preventDefault();
                updateIndex(firstIndex);
                break;
            case 'End':
            case 'PageDown':
                e.preventDefault();
                updateIndex(lastIndex);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                select(options[activeIndex]);
                break;
            case 'Tab':
                select(options[activeIndex]);
                break;
            case 'Escape':
            case 'Esc':
                e.preventDefault();
                setIsDropdownOpen(false);
                setActiveDescendant(null);
                setActiveIndex(-1);
                break;
            default:
                break;
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === inputRef.current) {
                    e.preventDefault();
                    closeBtnRef.current.focus();
                }
            } else {
                if (document.activeElement === closeBtnRef.current) {
                    e.preventDefault();
                    inputRef.current.focus();
                }
            }
        }
        if (e.key === 'Escape') {
            setIsModalOpen(false);
            setAddress('');
            document.getElementById('dialog-btn')?.focus();
        }
    };

    const onChangeHandler = (e) => {
        setAddress(e.target.value);
    };

  return (
      <div className="App">
          <div>
          <div
              className={`dropdown-select-container
                  ${isDropdownOpen && 'open'}`}
          >
              <button
                  onClick={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(prevState => !prevState);
                  }}
                  role="combobox"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="listbox"
                  className={`dropdown-select-control ${isDropdownOpen && 'open'}
                      ${options.length === 0 && 'disabled'}`}
                  id={'only-select-dropdown'}
                  aria-controls={'listbox'}
                  aria-activedescendant={activeDescendant}
                  disabled={options.length === 0}
                  aria-disabled={options.length === 0}
                  onKeyDown={handleKeyDown}
              >
                      <span id={'dropdown-placeholder'} className="dropdown-select__placeholder">
            {selectedValue ? selectedValue : 'Choose Fruit'}
          </span>
              </button>
              <ul
                  className={`menu transition visible'
                      ${isDropdownOpen && 'open'}`}
                  aria-labelledby={'dropdown-placeholder'}
                  role="listbox"
                  id="listbox"
                  tabIndex={-1}
                  aria-multiselectable={false}
              >
                  {options.map((opt, index) =>
                      <li
                          key={opt}
                          role="option"
                          className={`item
                                  ${index === activeIndex && 'focused'}
                                  ${
                              opt === selectedValue && 'selected'
                          }
                              `}
                          aria-selected={index === activeIndex}
                          id={opt}
                          onClick={() => {
                              select(opt);
                          }}
                          aria-selected={option === selectedValue}
                      >
                          <span> {opt}</span>
                      </li>
                  )}
              </ul>
          </div>
          <button
              id={'dialog-btn'}
              onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(prevState => !prevState);
          }}>
              Open Modal
          </button>
              <div className={`modal-overlay ${isModalOpen && 'open'}`}>
          <div
              role="dialog"
              id="dialog"
              aria-labelledby="dialog-label"
              aria-modal="true"
          >
              <h6 id="dialog-label">Fill out your address</h6>
              <form
                  className="form"
                  onSubmit={(e) => e.preventDefault()}
              >
                  <label id="label" htmlFor="input">
                      Address:
                  </label>
                  <input
                      id="input"
                      type="text"
                      maxLength="50"
                      value={address}
                      onInput={onChangeHandler}
                      ref={inputRef}
                      onKeyDown={handleInputKeyDown}
                  />
                  <div className="btn-container">
                      <button
                          className="ui icon button send"
                          name="send"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(false);
                            setAddress('');
                          }}
                          onKeyDown={handleInputKeyDown}
                      >
                          Send
                      </button>
                      <button
                          className="ui icon button cancel"
                          name="cancel"
                          onClick={(e) => {
                              e.preventDefault();
                              setIsModalOpen(false);
                          }}
                          ref={closeBtnRef}
                          onKeyDown={handleInputKeyDown}
                      >
                         Cancel
                      </button>
                  </div>
              </form>
          </div>
              </div>
          </div>
      </div>
  );
}

export default App;
