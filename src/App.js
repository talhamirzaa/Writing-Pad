import './App.css';
import Page from './components/Page';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Page></Page>}>
          </Route>
      </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
