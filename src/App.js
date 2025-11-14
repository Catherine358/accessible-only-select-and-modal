import './App.css';
import {useState} from "react";
import AccessibleCheckbox from "./AccessibleCheckbox";
import AccessibleModal from "./AccessibleModal";

function App() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeDescendant, setActiveDescendant] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const options = ['Apple', 'Banana', 'Orange'];

    const select = (value) => {
        if (value) {
            setSelectedValue(value);
        }
        setIsDropdownOpen(false);
        setActiveDescendant(null);
        setActiveIndex(-1);
    };

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
            case 'Esc':
            case 'Escape':
                e.preventDefault();
                setActiveDescendant(null);
                setActiveIndex(-1);
                break;
            default:
                break;
        }
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
                  className={`dropdown-select-control ${isDropdownOpen && 'open'}
                      ${options.length === 0 && 'disabled'}`}
                  id={'only-select-dropdown'}
                  aria-labelledby={'dropdown-placeholder'}
                  disabled={options.length === 0}
                  aria-disabled={options.length === 0}
                  role="combobox"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="listbox"
                  aria-controls={'listbox'}
                  aria-activedescendant={activeDescendant}
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
                  id="listbox"
                  tabIndex={-1}
                  aria-multiselectable={false}
                  role="listbox"
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
                          id={opt}
                          onClick={() => {
                              select(opt);
                          }}
                          aria-selected={opt === selectedValue}
                      >
                          <span> {opt}</span>
                      </li>
                  )}
              </ul>
          </div>
              <AccessibleModal />
          </div>
          <AccessibleCheckbox />
          <div className="tooltip-wrapper">
              <p><span className="tooltip-container">
                  Lorem Ipsum
                  <span className="tooltip-text">Hello</span>
              </span> is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                  survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                  unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                  of Lorem Ipsum.</p>
          </div>
      </div>
  );
}

export default App;
