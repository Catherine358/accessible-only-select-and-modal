import {useState} from 'react';
const AccessibleCheckbox = () => {
    const initialState = {
        coffee: false,
        tea: false,
        matcha: false
    };
    const [checkboxesState, setCheckboxesState] = useState(initialState);

    const toggleCheckbox = (checkboxKey) => {
        setCheckboxesState((prevState) => {
            return {
              ...initialState,
              [checkboxKey]: !prevState[checkboxKey]
            };
        });
    };

    const handleKeyDown = (e, checkboxKey) => {
        if (e.key === 'Space' || e.key === ' ') {
            e.preventDefault();
            toggleCheckbox(checkboxKey);
        }
    };

    return (
        <div className="card">
            <h1 id="checkbox-group-label">Drinks I wanna drink today</h1>
            <div
                role="group"
                aria-labelledby="checkbox-group-label"
            >
                {Object.entries(checkboxesState).map(([key, value]) => (
                    <div
                        key={key}
                        role="checkbox"
                        aria-checked={value}
                        tabIndex="0"
                        onClick={() => toggleCheckbox(key)}
                        onKeyDown={(e) => handleKeyDown(e, key)}
                    >
                        <span className="checkbox-visual"></span>
                        <span className="checkbox-label">{key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccessibleCheckbox;