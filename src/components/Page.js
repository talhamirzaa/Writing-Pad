import React,{useState} from 'react';
import './Page.css';

const fonts = [
    'Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New',
    'Trebuchet MS', 'Comic Sans MS', 'Impact', 'Lucida Console',
    'Cursive','Tahoma', 'Palatino Linotype', 'Gill Sans', 'Bookman',
    'Century Gothic', 'Frank Ruhl Libre', 'Muli', 'Lato', 
    'Montserrat', 'Raleway', 'Roboto', 'Open Sans',
    'Arial Black', 'Lucida Handwriting', 'Chalkboard SE', 
     'Garamond', 'Baskerville', 'Palatino', 
    'Book Antiqua', 'Segoe UI', 'Arial Narrow', 'Helvetica',
    'Futura', 'Playfair Display', 
    'Oswald', 'Poppins', 'Pangram', 'Dancing Script',
    'Source Sans Pro', 'Noto Sans', 'Ubuntu', 'Cabin',
    'Quicksand', 'Lobster', 'Roboto Condensed',
    'Overpass', 'Droid Sans', 'PT Sans', 'Titillium Web',
    'Brush Script MT', 'Lucida Handwriting', 'Pacifico', 
    'Dancing Script', 'Great Vibes', 'Satisfy', 'Allura'
  ];

export default function Page() {
    const [textboxes, setTextboxes] = useState([]);
    const [selectedTextbox, setSelectedTextbox] = useState(null);
    const [fontSize, setFontSize] = useState(22);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    
    const handleAddTextbox = () => {
      const newTextbox = { id: Date.now(), text: 'New Text', fontSize, fontFamily, style: { top: 50, left: 50 }, bold: false, italic: false, underline: false, justify: false };
      setTextboxes([...textboxes, newTextbox]);
      setHistory([...history, [...textboxes, newTextbox]]);
      setHistoryIndex(historyIndex + 1);
    };
  
    const handleSelectTextbox = (id) => {
      setSelectedTextbox(textboxes.find(tb => tb.id === id));
    };

    const updateTextbox = (updatedTextbox) => {
      const updatedTextboxes = textboxes.map(tb => (tb.id === updatedTextbox.id ? updatedTextbox : tb));
      setTextboxes(updatedTextboxes);
      setHistory([...history.slice(0, historyIndex + 1), updatedTextboxes]);
      setHistoryIndex(historyIndex + 1);
    };
  
    const handleFontChange = (e) => {
      if (selectedTextbox) {
        const updatedTextbox = { ...selectedTextbox, fontFamily: e.target.value };
        updateTextbox(updatedTextbox);
      }
    };
  
    const handleSizeChange = (change) => {
      if (selectedTextbox) {
        const newSize = fontSize + change;
        const updatedTextbox = { ...selectedTextbox, fontSize: newSize < 0 ? 0 : newSize };
        setFontSize(updatedTextbox.fontSize);
        updateTextbox(updatedTextbox);
      }
    };
  
    const handleFontSizeInput = (e) => {
      const size = parseInt(e.target.value, 10);
      if (size >= 0 && size <= 100) {
        if (selectedTextbox) {
          const updatedTextbox = { ...selectedTextbox, fontSize: size };
          setFontSize(size);
          updateTextbox(updatedTextbox);
        }
      }
    };
  
    
  
    const handleTextFormat = (format) => {
      if (selectedTextbox) {
        const updatedTextbox = { ...selectedTextbox, [format]: !selectedTextbox[format] };
        updateTextbox(updatedTextbox);
      }
    };
  
    const handleUndo = () => {
      if (historyIndex > 0) {
        
        setHistoryIndex(historyIndex - 1);
        setTextboxes(history[historyIndex - 1]);
      }
    };
  
    const handleRedo = () => {
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setTextboxes(history[historyIndex + 1]);
      }
    };
  
    const handleDragStart = (e, id) => {
      e.dataTransfer.setData('text/plain', id);
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const updatedTextbox = textboxes.find(tb => tb.id === parseInt(id));
      if (updatedTextbox) {
        const newTextboxes = textboxes.map(tb => {
          if (tb.id === updatedTextbox.id) {
            const rect = e.target.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            return { ...tb, style: { top: offsetY, left: offsetX } };
          }
          return tb;
        });
        setTextboxes(newTextboxes);
      }
    };
  

  return (
    <div className="mx-4 my-2">
        <div className="d-flex flex-column" style={{ height: '96vh' }}>
        
            {/* Item 1 */}
            <div className="flex-fill d-flex justify-content-between align-items-center shadow" style={{ height: '15%' }}>
                <div className=''>
                  <img className="w-50 mx-2" src="/site_logo.jpg" alt="logo" />
                </div>
                <div></div>
                <div></div>
                <div className="d-flex flex-row mx-5">
                <button className="btn btn-outline-light border-0 d-flex flex-column p-0" onClick={handleUndo}><img className="w-25 align-self-center" src="https://img.icons8.com/?size=100&id=j0VQjpNrzL7e&format=png&color=737373" alt="undo icon" /><h6 className="align-self-center" style={{color:'#737373'}}>undo</h6></button>
                <button className="btn btn-outline-light border-0 mx-1 d-flex flex-column p-0" onClick={handleRedo}><img id="rdo_img" className="w-25 align-self-center" src="https://img.icons8.com/?size=100&id=j0VQjpNrzL7e&format=png&color=737373" alt="undo icon" /><h6 className="align-self-center" style={{color:'#737373'}}>redo</h6></button>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                
            </div>

                {/* item 2 */}
                <div className="flex-fill" style={{height: '70%',backgroundColor: '#E8E8E8'}}>
                <div className="text-area shadow-lg mx-auto my-2" style={{ position: 'relative',height: '95%', width:'50%',backgroundColor: '#E8E8E8'}} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                    
                    {textboxes.map(tb => (
                    <div
                        key={tb.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, tb.id)}
                        onClick={() => handleSelectTextbox(tb.id)}
                        style={{
                        position: 'absolute',
                        top: tb.style.top,
                        left: tb.style.left,
                        backgroundColor: 'transparent',
                        fontSize: tb.fontSize,
                        fontFamily: tb.fontFamily,
                        fontWeight: tb.bold ? 'bold' : 'normal',
                        fontStyle: tb.italic ? 'italic' : 'normal',
                        textDecoration: tb.underline ? 'underline' : 'none',
                        textAlign: tb.justify ? 'justify' : 'left'
                        }}
                    >
                        <input
                        type="text"
                        value={tb.text}
                        onChange={(e) => {
                            const updatedTextbox = { ...tb, text: e.target.value };
                            updateTextbox(updatedTextbox);
                            e.target.style.width = `${e.target.scrollWidth}px`;
                        }}
                        style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            width: 'auto',
                            fontSize: tb.fontSize,
                            fontFamily: tb.fontFamily,
                            fontWeight: tb.bold ? 'bold' : 'normal',
                            fontStyle: tb.italic ? 'italic' : 'normal',
                            textDecoration: tb.underline ? 'underline' : 'none',
                            textAlign: tb.justify ? 'justify' : 'left'
                        }}
                        />
                    </div>
                    ))}
                </div>
                </div>
           

            {/* Item 3 */}
            <div className="flex-fill d-flex justify-content-center align-items-center shadow-sm" style={{ height: '10%' }}>
                <select className="form-select border-0 shadow-sm mx-2 rounded-pill h-50 py-0" style={{width:'15%',fontSize:'12px'}} onChange={handleFontChange} value={selectedTextbox?.fontFamily || ''}>
                {fonts.map(font => <option key={font} value={font}>{font}</option>)}
                </select>
            
                
                <div className="input-group d-flex shadow-sm mx-2 rounded-pill " style={{width:'fit-content', color:'black'}}>
                <button className="btn btn-sm shadow-sm btn-light border-0 rounded-end rounded-pill py-0 px-1 fs-6" onClick={() => handleSizeChange(-2)}><i className="bi bi-dash-lg" style={{color:'black'}}></i></button>
                <input type="number" value={fontSize} onChange={handleFontSizeInput} className="form-control px-1 h-25 fw-bold border-0" style={{ width: '27px',border:'none',fontSize:'11px'}} />
                <button className="btn btn-sm shadow-sm btn-light border-0 rounded-start rounded-pill py-0 px-1 fs-6" onClick={() => handleSizeChange(2)}><i className="bi bi-plus-lg" style={{color:'black'}}></i></button>
                </div>

                <div className="mx-4">
                <button className="btn btn-sm p-0 fs-6 " onClick={() => handleTextFormat('bold')}><i className="bi bi-type-bold"></i></button>
                <button className="btn btn-sm p-0 fs-6 mx-1" onClick={() => handleTextFormat('italic')}><i className="bi bi-type-italic"></i></button>
                <button className="btn btn-sm p-0 fs-6 mx-1" onClick={() => handleTextFormat('justify')}><i className="bi bi-justify"></i></button>
                <button className="btn btn-sm p-0 fs-6 mx-1" onClick={() => handleTextFormat('underline')}><i className="bi bi-type-underline"></i></button>
                </div>
            </div>
      
      {/* Item 4 */}
      <div className="flex-fill align-self-center " style={{ height: '10%'}}>
        <button type="button" className="mybtn btn btn-sm rounded-pill bi bi-fonts mt-3 py-0 px-2 fs-5" onClick={handleAddTextbox} style={{ backgroundColor: '#E0E0E0', color:'black' }}>
         <span className='butn-text'><sup>Add text</sup></span></button>
      </div>
    </div>
      
    </div>
  )
}
