import Navbar from './components/Navbar'
import Content from './components/Content'
import Sidebar from './components/Sidebar'
import './App.css'
import Player from './components/Player'

function App() {
  return (
    <div className="app-root m-0 p-0 vh-100">
      <div className="row gx-0 h-8">
        <div className="col-12">
          <Navbar />
        </div>
      </div>
      <div className="row gx-1 h-82 p-1">
        <div className="col-md-4 col-lg-3 h-100" id="sidebar-container">
          <Sidebar />
        </div>
        <div className="col-12 col-md-8 col-lg-9 h-100">
          <Content />
        </div>
      </div>
      <div className="row gx-0 h-10">
        <div className="col-12">
          <Player />
        </div>
      </div>
    </div>
  )
}

export default App
