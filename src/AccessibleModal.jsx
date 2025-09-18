import {useEffect, useRef, useState} from "react";

const AccessibleModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState('');
    const inputRef = useRef(null);
    const cancelBtnRef = useRef(null);

    useEffect(() => {
        if (inputRef.current && isModalOpen) {
            inputRef.current.focus();
        }
    }, [isModalOpen, inputRef.current]);

    const toggleModal = (e) => {
        e.preventDefault();
        setIsModalOpen(prevState => !prevState);
    };

    const handleChange = (e) => {
        setAddress(e.target.value);
    };

    const cancelModal = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
        setAddress('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === inputRef.current) {
                    e.preventDefault();
                    cancelBtnRef.current.focus();
                }
            } else {
                if (document.activeElement === cancelBtnRef.current) {
                    e.preventDefault();
                    inputRef.current.focus();
                }
            }
            return;
        }
        if (e.key === 'Esc' || e.key === 'Escape') {
            e.preventDefault();
            setIsModalOpen(false);
            setAddress('');
            document.getElementById('dialog-btn')?.focus();
        }
    };

  return (
      <>
          <button
              id="dialog-btn"
              onClick={toggleModal}
          >
              Open Modal
          </button>
          <div className={`modal-overlay ${isModalOpen && 'open'}`}>
              <div
                  id="dialog"
                  role="dialog"
                  aria-labelledby="dialog-label"
                  aria-modal="true"
                  tabIndex={-1}
                  onKeyDown={handleKeyDown}
              >
                  <h1 id="dialog-label">Fill out your address</h1>
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
                          onInput={handleChange}
                          ref={inputRef}
                      />
                      <div className="btn-container">
                          <button
                              className="ui icon button send"
                              name="send"
                              onClick={cancelModal}
                          >
                              Send
                          </button>
                          <button
                              className="ui icon button cancel"
                              name="cancel"
                              onClick={cancelModal}
                              ref={cancelBtnRef}
                          >
                              Cancel
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </>
  );
};

export default AccessibleModal;