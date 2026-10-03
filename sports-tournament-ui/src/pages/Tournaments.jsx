import { useEffect, useState } from "react";
import axios from "axios";

function Tournaments() {

    const API_URL =
        "http://localhost:8080/api/tournaments";

    const [tournaments, setTournaments] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        startDate: "",
        endDate: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // GET

    const fetchTournaments = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await axios.get(API_URL);

            setTournaments(response.data);

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

        fetchTournaments();

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
            name: "",
            location: "",
            startDate: "",
            endDate: ""
        });

        setError("");
        setMessage("");

        setShowForm(true);
    };


    // EDIT

    const handleEdit = (tournament) => {

        setEditingId(tournament.id);

        setFormData({
            name: tournament.name,
            location: tournament.location,
            startDate: tournament.startDate,
            endDate: tournament.endDate
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
                    "Tournament added successfully."
                );

            } else {

                await axios.put(
                    `${API_URL}/${editingId}`,
                    formData
                );

                setMessage(
                    "Tournament updated successfully."
                );

            }

            setShowForm(false);
            setEditingId(null);

            setFormData({
                name: "",
                location: "",
                startDate: "",
                endDate: ""
            });

            fetchTournaments();

        } catch (err) {

            console.error(err);

            setError(
                "Failed to save tournament."
            );

        }
    };


    // DELETE

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this tournament?"
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
                "Tournament deleted successfully."
            );

            fetchTournaments();

        } catch (err) {

            console.error(err);

            setError(
                "Failed to delete tournament."
            );

        }
    };


    // CANCEL

    const handleCancel = () => {

        setShowForm(false);
        setEditingId(null);

        setFormData({
            name: "",
            location: "",
            startDate: "",
            endDate: ""
        });

        setError("");

    };


    return (

        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>Tournaments</h1>

                    <p>
                        Manage your sports tournaments.
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={handleAdd}
                >
                    + Add Tournament
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
                                ? "Add Tournament"
                                : "Edit Tournament"}
                        </h2>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Tournament Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter tournament name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Location</label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Start Date</label>

                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>End Date</label>

                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-actions">

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                {editingId === null
                                    ? "Save Tournament"
                                    : "Update Tournament"}
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
                    Loading tournaments...
                </div>

            ) : tournaments.length === 0 ? (

                <div className="empty-state">

                    <h3>No tournaments found</h3>

                    <p>
                        Add your first tournament to get started.
                    </p>

                </div>

            ) : (

                <div className="table-card">

                    <table>

                        <thead>

                        <tr>

                            <th>ID</th>
                            <th>Tournament</th>
                            <th>Location</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>

                        </tr>

                        </thead>


                        <tbody>

                        {tournaments.map(
                            (tournament) => (

                                <tr key={tournament.id}>

                                    <td>
                                        {tournament.id}
                                    </td>

                                    <td className="team-name">
                                        {tournament.name}
                                    </td>

                                    <td>
                                        {tournament.location}
                                    </td>

                                    <td>
                                        {tournament.startDate}
                                    </td>

                                    <td>
                                        {tournament.endDate}
                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="edit-button"
                                                onClick={() =>
                                                    handleEdit(tournament)
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        tournament.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )
                        )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );
}

export default Tournaments;