import { useState, useEffect } from 'react';
import CreateNote from './CreateNote';
import NoteSection from './NoteSection';
import Sidebar from './Sidebar';
import "../CSS/notes.css"


export default function Notes() {

  const [storedData, setStoredData] = useState(null);
  const [selectedX, setSelectedX] = useState({ x: "", y: "" });
  const [noteView, setNoteView] = useState(false);  // false to keep popup hidden (default)

  // to handle note selection from Sidebar
  const handleNoteSelection = ({ x, y }) => {
    setSelectedX({ x, y });
  };

  // Function to handle form submission in CreateNote
  const handleFormSubmit = ({ groupName, selectedColor }) => {
    setStoredData({ groupName, selectedColor });
    setNoteView(false); // Close popup after form submission
  };

  // Toggle function for opening and closing the CreateNote popup
  const handletoggle = () => {
    setNoteView(prevState => !prevState); // Toggle popup visibility
  };

  // Check if "NotesInfo" in localStorage is empty on first load
  useEffect(() => {
    const storedNotesInfo = localStorage.getItem("NotesInfo");
    if (!storedNotesInfo) {
      // If "NotesInfo" is not found in localStorage, set popup to remain closed
      setNoteView(false);
    }
  }, []);

  return (
    <div className='mainbody'>
      {/* CreateNote popup will show based on showPopup state */}
      {noteView && (
        <CreateNote 
          onFormSubmit={handleFormSubmit} 
          Notetogglepops={handletoggle} // Make sure togglepops closes the popup when called
        />
      )}
      {/* Sidebar passes down storedData and handles data click */}
      <Sidebar 
        storedData={storedData} 
        onDataClick={handleNoteSelection} 
        screentogglepop={handletoggle} // Pass toggle function for the `+` button
      />
      {/* NoteSection renders the selected note group */}
      <NoteSection selectedX={selectedX} />
    </div>
  );
}
