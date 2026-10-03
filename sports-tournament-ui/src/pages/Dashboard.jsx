import { useEffect, useState } from "react";

function Dashboard({ onNavigate }) {

    const [tournaments, setTournaments] = useState([]);
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [matches, setMatches] = useState([]);

    const [loading, setLoading] = useState(true);

    // ================================
    // LOAD DATA FROM SPRING BOOT
    // ================================

    useEffect(() => {

        const loadDashboardData = async () => {

            try {

                const [
                    tournamentsResponse,
                    teamsResponse,
                    playersResponse,
                    matchesResponse
                ] = await Promise.all([

                    fetch("http://localhost:8080/api/tournaments"),

                    fetch("http://localhost:8080/api/teams"),

                    fetch("http://localhost:8080/api/players"),

                    fetch("http://localhost:8080/api/matches")

                ]);


                const tournamentsData =
                    await tournamentsResponse.json();

                const teamsData =
                    await teamsResponse.json();

                const playersData =
                    await playersResponse.json();

                const matchesData =
                    await matchesResponse.json();


                setTournaments(tournamentsData);

                setTeams(teamsData);

                setPlayers(playersData);

                setMatches(matchesData);

            }

            catch (error) {

                console.error(
                    "Unable to load dashboard data:",
                    error
                );

            }

            finally {

                setLoading(false);

            }

        };


        loadDashboardData();

    }, []);


    // ================================
    // LOADING
    // ================================

    if (loading) {

        return (
            <div className="page-container">

                <div className="loading-message">

                    Loading dashboard...

                </div>

            </div>
        );

    }


    // ================================
    // DASHBOARD
    // ================================

    return (

        <div className="dashboard-container">


            {/* =====================================
          HERO SECTION
      ===================================== */}

            <section className="dashboard-hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        🏆 SPORTS MANAGEMENT
                    </div>


                    <h1>
                        Welcome back, Admin 👋
                    </h1>


                    <p>
                        Manage your tournaments, teams, players
                        and matches from one powerful dashboard.
                    </p>


                    <div className="hero-stats">

                        <div>

                            <strong>
                                {tournaments.length}
                            </strong>

                            <span>
                Tournaments
              </span>

                        </div>


                        <div>

                            <strong>
                                {teams.length}
                            </strong>

                            <span>
                Teams
              </span>

                        </div>


                        <div>

                            <strong>
                                {players.length}
                            </strong>

                            <span>
                Players
              </span>

                        </div>

                    </div>

                </div>


                <div className="hero-icon">

                    🏆

                </div>

            </section>



            {/* =====================================
          STAT CARDS
      ===================================== */}

            <section className="dashboard-cards">


                {/* TOURNAMENTS */}

                <div
                    className="dashboard-card tournament-card"
                    onClick={() => onNavigate("tournaments")}
                >

                    <div className="card-icon">
                        🏆
                    </div>

                    <div className="card-content">

            <span>
              Total Tournaments
            </span>

                        <strong>
                            {tournaments.length}
                        </strong>

                        <small>
                            Active tournaments
                        </small>

                    </div>

                    <div className="card-arrow">
                        →
                    </div>

                </div>



                {/* TEAMS */}

                <div
                    className="dashboard-card team-card"
                    onClick={() => onNavigate("teams")}
                >

                    <div className="card-icon">
                        👥
                    </div>

                    <div className="card-content">

            <span>
              Total Teams
            </span>

                        <strong>
                            {teams.length}
                        </strong>

                        <small>
                            Registered teams
                        </small>

                    </div>

                    <div className="card-arrow">
                        →
                    </div>

                </div>



                {/* PLAYERS */}

                <div
                    className="dashboard-card player-card"
                    onClick={() => onNavigate("players")}
                >

                    <div className="card-icon">
                        🏃
                    </div>

                    <div className="card-content">

            <span>
              Total Players
            </span>

                        <strong>
                            {players.length}
                        </strong>

                        <small>
                            Registered players
                        </small>

                    </div>

                    <div className="card-arrow">
                        →
                    </div>

                </div>



                {/* MATCHES */}

                <div
                    className="dashboard-card match-card"
                    onClick={() => onNavigate("matches")}
                >

                    <div className="card-icon">
                        ⚽
                    </div>

                    <div className="card-content">

            <span>
              Total Matches
            </span>

                        <strong>
                            {matches.length}
                        </strong>

                        <small>
                            Scheduled matches
                        </small>

                    </div>

                    <div className="card-arrow">
                        →
                    </div>

                </div>

            </section>



            {/* =====================================
          LOWER SECTION
      ===================================== */}

            <section className="dashboard-grid">


                {/* =================================
            RECENT TOURNAMENTS
        ================================= */}

                <div className="dashboard-panel">

                    <div className="panel-header">

                        <div>

              <span className="panel-label">
                TOURNAMENTS
              </span>

                            <h2>
                                Recent Tournaments
                            </h2>

                            <p>
                                Latest tournaments in your system
                            </p>

                        </div>


                        <div className="panel-icon">
                            🏆
                        </div>

                    </div>


                    <div className="panel-list">

                        {tournaments.length === 0 ? (

                            <div className="empty-dashboard">
                                No tournaments found.
                            </div>

                        ) : (

                            tournaments.slice(0, 5).map((tournament) => (

                                <div
                                    key={tournament.id}
                                    className="dashboard-list-item clickable-dashboard-item"
                                    onClick={() =>
                                        onNavigate("tournaments")
                                    }
                                >

                                    <div className="list-icon tournament-icon">
                                        🏆
                                    </div>


                                    <div className="list-info">

                                        <strong>
                                            {tournament.name}
                                        </strong>

                                        <span>
                      📍 {tournament.location}
                    </span>

                                    </div>


                                    <div className="list-date">

                                        {tournament.startDate}

                                    </div>

                                </div>

                            ))

                        )}

                    </div>


                    <button
                        className="view-all-button"
                        onClick={() =>
                            onNavigate("tournaments")
                        }
                    >

                        View all tournaments →

                    </button>

                </div>



                {/* =================================
            RECENT MATCHES
        ================================= */}

                <div className="dashboard-panel">

                    <div className="panel-header">

                        <div>

              <span className="panel-label">
                MATCH CENTER
              </span>

                            <h2>
                                Recent Matches
                            </h2>

                            <p>
                                Monitor tournament fixtures
                            </p>

                        </div>


                        <div className="panel-icon">
                            ⚽
                        </div>

                    </div>


                    <div className="panel-list">

                        {matches.length === 0 ? (

                            <div className="empty-dashboard">

                                No matches scheduled.

                            </div>

                        ) : (

                            matches.slice(0, 5).map((match) => (

                                <div
                                    key={match.id}
                                    className="dashboard-list-item clickable-dashboard-item"
                                    onClick={() =>
                                        onNavigate("matches")
                                    }
                                >

                                    <div className="list-icon match-icon">
                                        ⚽
                                    </div>


                                    <div className="list-info">

                                        <strong>
                                            {match.team1}
                                        </strong>

                                        <span>
                      vs {match.team2}
                    </span>

                                    </div>


                                    <div className="match-status">

                    <span
                        className={
                            match.status === "Completed"
                                ? "status-completed"
                                : "status-upcoming"
                        }
                    >

                      {match.status}

                    </span>

                                        <small>
                                            {match.matchDate}
                                        </small>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>


                    <button
                        className="view-all-button"
                        onClick={() =>
                            onNavigate("matches")
                        }
                    >

                        View all matches →

                    </button>

                </div>

            </section>



            {/* =====================================
          QUICK NAVIGATION
      ===================================== */}

            <section className="quick-actions">

                <div className="quick-header">

                    <div>

            <span className="panel-label">
              QUICK ACTIONS
            </span>

                        <h2>
                            Manage Your Tournament
                        </h2>

                    </div>

                </div>


                <div className="quick-buttons">


                    <button
                        onClick={() => onNavigate("tournaments")}
                    >
                        <span>🏆</span>

                        <div>
                            <strong>
                                Tournaments
                            </strong>

                            <small>
                                Manage tournaments
                            </small>
                        </div>

                        <b>→</b>

                    </button>



                    <button
                        onClick={() => onNavigate("teams")}
                    >
                        <span>👥</span>

                        <div>
                            <strong>
                                Teams
                            </strong>

                            <small>
                                Manage teams
                            </small>
                        </div>

                        <b>→</b>

                    </button>



                    <button
                        onClick={() => onNavigate("players")}
                    >
                        <span>🏃</span>

                        <div>
                            <strong>
                                Players
                            </strong>

                            <small>
                                Manage players
                            </small>
                        </div>

                        <b>→</b>

                    </button>



                    <button
                        onClick={() => onNavigate("matches")}
                    >
                        <span>⚽</span>

                        <div>
                            <strong>
                                Matches
                            </strong>

                            <small>
                                Manage matches
                            </small>
                        </div>

                        <b>→</b>

                    </button>


                </div>

            </section>

        </div>

    );

}

export default Dashboard;