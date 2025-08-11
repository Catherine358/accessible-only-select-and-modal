import {useState} from 'react';
const AccessibleCheckbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
      setIsChecked((prevState) => !prevState);
    };

   const handleKeyDown = (e) => {
       if (e.key === 'Space' || e.key === ' ') {
           e.preventDefault();
           toggleCheckbox();
       }
   };

    return (
        <div className="card">
            <h1 id="id-group-label">Settings</h1>
            <div
                role="checkbox"
                aria-checked={isChecked}
                tabIndex="0"
                aria-labelledby="id-group-label"
                onClick={toggleCheckbox}
                onKeyDown={handleKeyDown}
            >
                <span className="checkbox-visual"></span>
                <span className="checkbox-label"> Enable dark mode</span>
            </div>
        </div>
    );
};

export default AccessibleCheckbox;