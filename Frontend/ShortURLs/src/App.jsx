import IndexPage from './components/IndexPage'
import RedirectShort from './components/RedirectShort'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/shorten/:code" element={<RedirectShort />} />
      </Routes>
    </Router>
     
    </>
  )
}

export default App
