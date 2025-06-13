import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Activity1 from './Component/Activity1/Activity1';
import Activity2 from './Component/Activity2';
import Header from './Component/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/activity1" element={<Activity1 />} />
        <Route path="/activity2" element={<Activity2 />} />
      </Routes>
    </Router>
  );
}

export default App;
