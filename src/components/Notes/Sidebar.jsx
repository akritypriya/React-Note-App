import { useState, useEffect } from "react";
import '../CSS/sidebar.css';

function Sidebar({ storedData, onDataClick, screentogglepop }) {



  const [allInfoObjects, setAllInfoObjects] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    const storedNotesInfo = JSON.parse(localStorage.getItem("NotesInfo")) || {};
    const infoArray = Object.values(storedNotesInfo);
    setAllInfoObjects(infoArray);
  }, [storedData]);

  const handlenotesadder = (info) => {
    const x = info.infogn.groupName;
    const y = info.infogn.selectedColor;

    setSelectedRadio(x);
    onDataClick({ x, y });

    if (screenWidth < 701) {
      document.querySelector('.sidebarmain').style.display = 'none';
      document.querySelector('.noteaddermainbody').style.display = 'flex';
    }
  };


  const handlePlusButtonClick = () => {
    screentogglepop();
  };

  return (
    <div className="sidebarmain">
      <div className="notesMainInfolist">
        <h1>Pocket Notes</h1>
        <button className="noteButton" onClick={handlePlusButtonClick}>+</button>
      </div>
      <div>
        {allInfoObjects.map((info, index) => (
          <div key={index}>
            <div
              className={`notesInfolist ${selectedRadio === info.infogn.groupName ? 'active' : ''}`}
              onClick={() => handlenotesadder(info)}
            >
              <div id="fill"></div>
              <input type="radio" name="sellist" id="sellist"
                checked={selectedRadio === info.infogn.groupName}
                style={{ display: "none" }}
              />
              <div
                className="initials"
                style={{ backgroundColor: `${info.infogn.selectedColor}` }}
              >
                {info.infogn.groupName.slice(0, 2).toUpperCase()}
              </div>
              <div className="notesInitial">{info.infogn.groupName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
