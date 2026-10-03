import { useEffect, useState } from "react";
import axios from "axios";

function Matches() {

    const API_URL =
        "http://localhost:8080/api/matches";

    const [matches, setMatches] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        team1: "",
        team2: "",
        matchDate: "",
        venue: "",
        status: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // GET

    const fetchMatches = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await axios.get(API_URL);

            setMatches(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to connect to Spring Boot backend."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchMatches();

    }, []);


    // INPUT

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // ADD

    const handleAdd = () => {

        setEditingId(null);

        setFormData({
            team1: "",
            team2: "",
            matchDate: "",
            venue: "",
            status: "Upcoming"
        });

        setError("");
        setMessage("");

        setShowForm(true);
    };


    // EDIT

    const handleEdit = (match) => {

        setEditingId(match.id);

        setFormData({
            team1: match.team1,
            team2: match.team2,
            matchDate: match.matchDate,
            venue: match.venue,
            status: match.status
        });

        setError("");
        setMessage("");

        setShowForm(true);
    };


    // SAVE / UPDATE

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setMessage("");

            if (editingId === null) {

                await axios.post(
                    API_URL,
                    formData
                );

                setMessage(
                    "Match scheduled successfully."
                );

            } else {

                await axios.put(
                    `${API_URL}/${editingId}`,
                    formData
                );

                setMessage(
                    "Match updated successfully."
                );

            }

            setShowForm(false);
            setEditingId(null);

            setFormData({
                team1: "",
                team2: "",
                matchDate: "",
                venue: "",
                status: ""
            });

            fetchMatches();

        } catch (err) {

            console.error(err);

            setError(
                "Failed to save match."
            );

        }
    };


    // DELETE

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this match?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setMessage("");

            await axios.delete(
                `${API_URL}/${id}`
            );

            setMessage(
                "Match deleted successfully."
            );

            fetchMatches();

        } catch (err) {

            console.error(err);

            setError(
                "Failed to delete match."
            );

        }
    };


    // CANCEL

    const handleCancel = () => {

        setShowForm(false);
        setEditingId(null);

        setFormData({
            team1: "",
            team2: "",
            matchDate: "",
            venue: "",
            status: ""
        });

        setError("");

    };


    return (

        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>Matches</h1>

                    <p>
                        Schedule and manage tournament matches.
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={handleAdd}
                >
                    + Schedule Match
                </button>

            </div>


            {message && (

                <div className="success-message">
                    {message}
                </div>

            )}


            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {showForm && (

                <div className="form-card">

                    <div className="form-header">

                        <h2>
                            {editingId === null
                                ? "Schedule Match"
                                : "Edit Match"}
                        </h2>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Team 1</label>

                                <input
                                    type="text"
                                    name="team1"
                                    value={formData.team1}
                                    onChange={handleChange}
                                    placeholder="Enter Team 1"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Team 2</label>

                                <input
                                    type="text"
                                    name="team2"
                                    value={formData.team2}
                                    onChange={handleChange}
                                    placeholder="Enter Team 2"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Date</label>

                                <input
                                    type="date"
                                    name="matchDate"
                                    value={formData.matchDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Venue</label>

                                <input
                                    type="text"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    placeholder="Enter venue"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Status</label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Status
                                    </option>

                                    <option value="Upcoming">
                                        Upcoming
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div className="form-actions">

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                {editingId === null
                                    ? "Save Match"
                                    : "Update Match"}
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


            {loading ? (

                <div className="loading-message">
                    Loading matches...
                </div>

            ) : matches.length === 0 ? (

                <div className="empty-state">

                    <h3>No matches found</h3>

                    <p>
                        Schedule your first match to get started.
                    </p>

                </div>

            ) : (

                <div className="table-card">

                    <table>

                        <thead>

                        <tr>

                            <th>ID</th>
                            <th>Team 1</th>
                            <th>Team 2</th>
                            <th>Date</th>
                            <th>Venue</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                        </thead>


                        <tbody>

                        {matches.map((match) => (

                            <tr key={match.id}>

                                <td>
                                    {match.id}
                                </td>

                                <td className="team-name">
                                    {match.team1}
                                </td>

                                <td className="team-name">
                                    {match.team2}
                                </td>

                                <td>
                                    {match.matchDate}
                                </td>

                                <td>
                                    {match.venue}
                                </td>

                                <td>
                                    {match.status}
                                </td>

                                <td>

                                    <div className="action-buttons">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(match)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(match.id)
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

export default Matches;