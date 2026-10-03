import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Tournaments from "./pages/Tournaments";
import Matches from "./pages/Matches";

import "./App.css";


function App() {

  const [activePage, setActivePage] = useState("dashboard");


  const renderPage = () => {

    switch (activePage) {

      case "dashboard":

        return (
            <Dashboard
                onNavigate={setActivePage}
            />
        );


      case "tournaments":

        return <Tournaments />;


      case "teams":

        return <Teams />;


      case "players":

        return <Players />;


      case "matches":

        return <Matches />;


      default:

        return (
            <Dashboard
                onNavigate={setActivePage}
            />
        );

    }

  };


  return (

      <div className="app">


        {/* ================= HEADER ================= */}

        <header className="top-header">


          <div className="brand">

          <span className="brand-icon">
            🏆
          </span>

            <span>
            Sportify
          </span>

          </div>



          <div className="header-title">

            <h1>
              Sports Tournament Management
            </h1>

            <p>
              Manage your complete tournament system
            </p>

          </div>



          <div className="admin-profile">

            <div className="admin-icon">
              👤
            </div>

            <div>

              <strong>
                Admin
              </strong>

              <span>
              Administrator
            </span>

            </div>

          </div>


        </header>



        {/* ================= MAIN ================= */}

        <div className="main-layout">


          {/* ================= SIDEBAR ================= */}

          <aside className="sidebar">

            <nav>


              <button
                  className={`nav-item ${
                      activePage === "dashboard"
                          ? "active"
                          : ""
                  }`}
                  onClick={() =>
                      setActivePage("dashboard")
                  }
              >

              <span>
                📊
              </span>

                Dashboard

              </button>



              <button
                  className={`nav-item ${
                      activePage === "tournaments"
                          ? "active"
                          : ""
                  }`}
                  onClick={() =>
                      setActivePage("tournaments")
                  }
              >

              <span>
                🏆
              </span>

                Tournaments

              </button>



              <button
                  className={`nav-item ${
                      activePage === "teams"
                          ? "active"
                          : ""
                  }`}
                  onClick={() =>
                      setActivePage("teams")
                  }
              >

              <span>
                👥
              </span>

                Teams

              </button>



              <button
                  className={`nav-item ${
                      activePage === "players"
                          ? "active"
                          : ""
                  }`}
                  onClick={() =>
                      setActivePage("players")
                  }
              >

              <span>
                🏃
              </span>

                Players

              </button>



              <button
                  className={`nav-item ${
                      activePage === "matches"
                          ? "active"
                          : ""
                  }`}
                  onClick={() =>
                      setActivePage("matches")
                  }
              >

              <span>
                ⚽
              </span>

                Matches

              </button>


            </nav>

          </aside>



          {/* ================= CONTENT ================= */}

          <main className="content">

            {renderPage()}

          </main>


        </div>

      </div>

  );

}


export default App;