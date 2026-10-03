import { useEffect, useState } from "react";
import axios from "axios";

function Players() {

    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        role: "",
        teamId: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const PLAYER_API = "http://localhost:8080/api/players";
    const TEAM_API = "http://localhost:8080/api/teams";


    // =========================
    // GET PLAYERS
    // =========================

    const fetchPlayers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(PLAYER_API);

            setPlayers(response.data);

        } catch (err) {

            console.error(err);
            setError("Unable to connect to Spring Boot backend.");

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // GET TEAMS
    // =========================

    const fetchTeams = async () => {

        try {

            const response = await axios.get(TEAM_API);

            setTeams(response.data);

        } catch (err) {

            console.error(err);

        }
    };


    useEffect(() => {

        fetchPlayers();
        fetchTeams();

    }, []);


    // =========================
    // INPUT
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // =========================
    // ADD
    // =========================

    const handleAddPlayer = () => {

        setEditingId(null);

        setFormData({
            name: "",
            age: "",
            role: "",
            teamId: ""
        });

        setError("");
        setMessage("");

        setShowForm(true);
    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (player) => {

        setEditingId(player.id);

        setFormData({
            name: player.name,
            age: player.age,
            role: player.role,
            teamId: player.teamId
        });

        setError("");
        setMessage("");

        setShowForm(true);
    };


    // =========================
    // SAVE / UPDATE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setMessage("");

            const data = {
                name: formData.name,
                age: Number(formData.age),
                role: formData.role,
                teamId: Number(formData.teamId)
            };

            if (editingId === null) {

                await axios.post(
                    PLAYER_API,
                    data
                );

                setMessage("Player added successfully.");

            } else {

                await axios.put(
                    `${PLAYER_API}/${editingId}`,
                    data
                );

                setMessage("Player updated successfully.");

            }

            setFormData({
                name: "",
                age: "",
                role: "",
                teamId: ""
            });

            setEditingId(null);
            setShowForm(false);

            fetchPlayers();

        } catch (err) {

            console.error(err);

            setError("Failed to save player.");

        }
    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this player?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setMessage("");

            await axios.delete(
                `${PLAYER_API}/${id}`
            );

            setMessage("Player deleted successfully.");

            fetchPlayers();

        } catch (err) {

            console.error(err);

            setError("Failed to delete player.");

        }
    };


    // =========================
    // TEAM NAME
    // =========================

    const getTeamName = (teamId) => {

        const team = teams.find(
            (t) => t.id === teamId
        );

        return team ? team.name : "Unknown Team";
    };


    // =========================
    // CANCEL
    // =========================

    const handleCancel = () => {

        setShowForm(false);
        setEditingId(null);

        setFormData({
            name: "",
            age: "",
            role: "",
            teamId: ""
        });

        setError("");

    };


    return (

        <div className="page-container">

            {/* HEADER */}

            <div className="page-header">

                <div>

                    <h1>Players</h1>

                    <p>
                        Manage players and their teams.
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={handleAddPlayer}
                >
                    + Add Player
                </button>

            </div>


            {/* SUCCESS */}

            {message && (

                <div className="success-message">
                    {message}
                </div>

            )}


            {/* ERROR */}

            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {/* FORM */}

            {showForm && (

                <div className="form-card">

                    <div className="form-header">

                        <h2>
                            {editingId === null
                                ? "Add Player"
                                : "Edit Player"}
                        </h2>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">


                            <div className="form-group">

                                <label>Player Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter player name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Age</label>

                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Enter age"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Role</label>

                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="Batsman / Bowler"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Team</label>

                                <select
                                    name="teamId"
                                    value={formData.teamId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Team
                                    </option>

                                    {teams.map((team) => (

                                        <option
                                            key={team.id}
                                            value={team.id}
                                        >
                                            {team.name}
                                        </option>

                                    ))}

                                </select>

                            </div>


                        </div>


                        <div className="form-actions">

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                {editingId === null
                                    ? "Save Player"
                                    : "Update Player"}
                            </button>


                            <button
                                type="button"
                                className="secondary-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* TABLE */}

            {loading ? (

                <div className="loading-message">
                    Loading players...
                </div>

            ) : players.length === 0 ? (

                <div className="empty-state">

                    <h3>No players found</h3>

                    <p>
                        Add your first player to get started.
                    </p>

                </div>

            ) : (

                <div className="table-card">

                    <table>

                        <thead>

                        <tr>

                            <th>ID</th>
                            <th>Player</th>
                            <th>Age</th>
                            <th>Role</th>
                            <th>Team</th>
                            <th>Actions</th>

                        </tr>

                        </thead>


                        <tbody>

                        {players.map((player) => (

                            <tr key={player.id}>

                                <td>
                                    {player.id}
                                </td>

                                <td className="team-name">
                                    {player.name}
                                </td>

                                <td>
                                    {player.age}
                                </td>

                                <td>
                                    {player.role}
                                </td>

                                <td>
                                    {getTeamName(player.teamId)}
                                </td>

                                <td>

                                    <div className="action-buttons">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(player)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(player.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );
}

export default Players;