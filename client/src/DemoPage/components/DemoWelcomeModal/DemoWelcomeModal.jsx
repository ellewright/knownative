import React, { useState, useEffect, useRef } from 'react';
import './DemoWelcomeModal.css';
import DemoModal from '../DemoModal/DemoModal';

const DemoWelcomeModal = ({ onSubmit, isOpen, onClose, textSelection, setTextSelection }) => {
  const focusInputRef = useRef(null);
  const [pageCount, setPageCount] = useState(1);

  const [importedTextData, setImportedTextData] = useState({
    id: 4,
    title: "",
    content: "",
    source: ""
  });

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImportedTextData({
      ...importedTextData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (textSelection === "imported") {
      localStorage.setItem("text", JSON.stringify(importedTextData));
    };

    onSubmit(textSelection);
  };

  const onRadioChange = (e) => {
    setTextSelection(e.target.value);
  };

  return (
    <DemoModal hasCloseBtn={false} isOpen={isOpen} onClose={onClose} hasEscKeyExit={false}>
      <div className="dialog-padding">
        {/* Modal Page 1 */}
        {pageCount === 1 ? (
          <div className="page-one">
            <div className="progress-div">
              <div className="progress-dashes dashes-active"></div>
              <div className="progress-dashes dashes-inactive"></div>
              <div className="progress-dashes dashes-inactive"></div>
            </div>
            <h1 className="welcome-modal">Welcome to KnowNative!</h1>
            <p>KnowNative can help you read and study articles written in Mandarin.</p>
            <p>
              We&apos;ll help you choose a{' '}
              <span className="welcome-modal-bold">sample article</span> for this demo based on your
              language level. No prior knowledge of Mandarin is needed to explore this demo!
            </p>
          </div>
        ) : (
          ''
        )}

        {/* Modal Page 2 */}
        {pageCount === 2 ? (
          <div className="page-two">
            <div className="progress-div">
              <div className="progress-dashes dashes-active"></div>
              <div className="progress-dashes dashes-active"></div>
              <div className="progress-dashes dashes-inactive"></div>
            </div>
            <h1 className="welcome-modal">Choose your text</h1>
            <p>Select a text based on proficiency, or import your own.</p>
            <form>
              <label className="welcome-modal" htmlFor="beginnerRadioButton">
                <div
                  className={`radio-div beginner-div
                   ${textSelection === 'beginner' ? 'active-radio-div' : ''}`}>
                  <input
                    className="welcome-modal"
                    type="radio"
                    value="beginner"
                    id="beginnerRadioButton"
                    checked={textSelection === 'beginner'}
                    onChange={onRadioChange}
                  />
                  <h3>Beginner</h3>
                  <span>TOCFL 1-2</span>
                  <p>
                    You have no knowledge of Mandarin, or you can understand simple words and
                    phrases.
                  </p>
                </div>
              </label>

              <label className="welcome-modal" htmlFor="intermediateRadioButton">
                <div
                  className={`radio-div intermediate-div
                   ${textSelection === 'intermediate' ? 'active-radio-div' : ''}`}>
                  <input
                    className="welcome-modal"
                    type="radio"
                    value="intermediate"
                    id="intermediateRadioButton"
                    checked={textSelection === 'intermediate'}
                    onChange={onRadioChange}
                  />
                  <h3>Intermediate</h3>
                  <span>TOCFL 3-4</span>
                  <p>
                    You can read and understand articles related to familiar topics, such as family,
                    hobbies and travel.
                  </p>
                </div>
              </label>
              <label className="welcome-modal" htmlFor="advancedRadioButton">
                <div
                  className={`radio-div advanced-div
                   ${textSelection === 'advanced' ? 'active-radio-div' : ''}`}>
                  <input
                    className="welcome-modal"
                    type="radio"
                    value="advanced"
                    id="advancedRadioButton"
                    checked={textSelection === 'advanced'}
                    onChange={onRadioChange}
                  />
                  <h3>Advanced</h3>
                  <span>TOCFL 5-6</span>
                  <p>
                    You can read and understand the content of newspapers, magazines and other
                    articles on complex topics.
                  </p>
                </div>
              </label>
              <label className="welcome-modal" htmlFor="importedTextRadioButton">
                <div
                  className={`radio-div imported-div
                   ${textSelection === 'imported' ? 'active-radio-div' : ''}`}>
                  <input
                    className="welcome-modal"
                    type="radio"
                    value="imported"
                    id="importedTextRadioButton"
                    checked={textSelection === "imported"}
                    onChange={onRadioChange}
                  />
                  <h3>Import Text</h3>
                </div>
              </label>
            </form>
          </div>
        ) : (
          ''
        )}

        {/* Modal Page 3 */}
        {pageCount === 3 && textSelection !== "imported" ? (
          <div className="page-three">
            <div className="progress-div">
              <div className="progress-dashes dashes-active"></div>
              <div className="progress-dashes dashes-active"></div>
              <div className="progress-dashes dashes-active"></div>
            </div>
            <h1 className="welcome-modal">Great!</h1>
            <p>
              Let&apos;s get started with a{' '}
              <span id="textChoice" className="welcome-modal-bold">
                {textSelection}
              </span>
              -level text.
            </p>
            <p>
              You can choose a different text at any time using the Library icon in the left
              toolbar.
            </p>
          </div>
        ) : pageCount === 3 ? (
          // import text form
          <form>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a title for the text..."
              value={importedTextData.title}
              onChange={handleChange}
              required
            />
            <label htmlFor="source">Source</label>
            <input
              type="text"
              id="source"
              name="source"
              placeholder="Enter the URL of the text..."
              value={importedTextData.source}
              onChange={handleChange}
            />
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              placeholder="Paste in a text you would like to read..."
              value={importedTextData.content}
              onChange={handleChange}
              required
            />
          </form>
        ) : (
          ''
        )}

        {/* Conditionally render buttons depending on pageState */}
        <div className="button-div">
          {pageCount === 3 ? (
            <button className="exit next welcome-modal" onClick={handleSubmit}>
              Let&apos;s go!
            </button>
          ) : (
            ''
          )}

          {pageCount !== 3 ? (
            <button
              className="dialog-two next welcome-modal"
              onClick={() => setPageCount((pageCount) => pageCount + 1)}>
              Next
            </button>
          ) : (
            ''
          )}

          {pageCount !== 1 ? (
            <button
              className="dialog-three back welcome-modal"
              onClick={() => setPageCount((pageCount) => pageCount - 1)}>
              Back
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </DemoModal>
  );
};

export default DemoWelcomeModal;
