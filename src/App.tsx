import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Videoform from "./Videoform";
import Videolist from "./Videolist";

const App = () => {
  return (
    <div
      className="App"
      // style={{
      //   background: "#cb4db2",
      // }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Videoform />} />
          <Route path="/videos" element={<Videolist />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
