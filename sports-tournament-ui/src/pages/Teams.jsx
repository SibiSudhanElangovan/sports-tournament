import { useEffect, useState } from "react";
import axios from "axios";

function Teams() {

    // ==============================
    // STATE
    // ==============================

    const [teams, setTeams] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        coach: "",
        city: ""
    });


    // ==============================
    // BACKEND URL
    // ==============================

    const API_URL = "http://localhost:8080/api/teams";


    // ==============================
    // GET ALL TEAMS
    // ==============================

    const fetchTeams = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(API_URL);

            setTeams(response.data);

        } catch (err) {

            console.error("GET TEAMS ERROR:", err);

            setError("Unable to connect to Spring Boot backend.");

        } finally {

            setLoading(false);

        }
    };


    // ==============================
    // LOAD TEAMS WHEN PAGE OPENS
    // ==============================

    useEffect(() => {

        fetchTeams();

    }, []);


    // ==============================
    // INPUT CHANGE
    // ==============================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };


    // ==============================
    // OPEN ADD FORM
    // ==============================

    const handleAddClick = () => {

        setEditingId(null);

        setFormData({
            name: "",
            coach: "",
            city: ""
        });

        setError("");
        setSuccess("");

        setShowForm(true);
    };


    // ==============================
    // OPEN EDIT FORM
    // ==============================

    const handleEdit = (team) => {

        setEditingId(team.id);

        setFormData({
            name: team.name,
            coach: team.coach,
            city: team.city
        });

        setError("");
        setSuccess("");

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==============================
    // CANCEL FORM
    // ==============================

    const handleCancel = () => {

        setShowForm(false);

        setEditingId(null);

        setFormData({
            name: "",
            coach: "",
            city: ""
        });

        setError("");
    };


    // ==============================
    // SAVE / UPDATE TEAM
    // ==============================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // ==============================
        // VALIDATION
        // ==============================

        if (
            formData.name.trim() === "" ||
            formData.coach.trim() === "" ||
            formData.city.trim() === ""
        ) {

            setError("Please fill in all fields.");

            return;
        }


        try {

            // ==============================
            // UPDATE
            // ==============================

            if (editingId !== null) {

                await axios.put(
                    `${API_URL}/${editingId}`,
                    formData
                );

                setSuccess("Team updated successfully.");

            }

                // ==============================
                // CREATE
            // ==============================

            else {

                await axios.post(
                    API_URL,
                    formData
                );

                setSuccess("Team added successfully.");
            }


            // ==============================
            // GET FRESH DATA FROM DATABASE
            // ==============================

            await fetchTeams();


            // ==============================
            // RESET FORM
            // ==============================

            setFormData({
                name: "",
                coach: "",
                city: ""
            });

            setEditingId(null);

            setShowForm(false);

        } catch (err) {

            console.error("SAVE/UPDATE ERROR:", err);

            if (err.response) {

                setError(
                    `Backend error: ${err.response.status}`
                );

            } else {

                setError(
                    "Unable to connect to Spring Boot backend."
                );
            }
        }
    };


    // ==============================
    // DELETE TEAM
    // ==============================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this team?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");


            console.log("Deleting team ID:", id);


            // ==============================
            // DELETE FROM BACKEND
            // ==============================

            await axios.delete(
                `${API_URL}/${id}`
            );


            console.log("Delete successful");


            // ==============================
            // GET FRESH DATA FROM DATABASE
            // ==============================

            await fetchTeams();


            setSuccess("Team deleted successfully.");


            // ==============================
            // CLOSE EDIT FORM IF NEEDED
            // ==============================

            if (editingId === id) {

                setShowForm(false);

                setEditingId(null);

                setFormData({
                    name: "",
                    coach: "",
                    city: ""
                });
            }

        } catch (err) {

            console.error("DELETE ERROR:", err);

            if (err.response) {

                setError(
                    `Unable to delete team. Backend returned ${err.response.status}.`
                );

            } else {

                setError(
                    "Unable to connect to Spring Boot backend."
                );
            }
        }
    };


    // ==============================
    // JSX
    // ==============================

    return (

        <div className="page-container">


            {/* ==============================
                PAGE HEADER
            ============================== */}

            <div className="page-header">

                <div>

                    <h1>Teams</h1>

                    <p>
                        Manage tournament teams.
                    </p>

                </div>


                <button
                    type="button"
                    className="primary-button"
                    onClick={handleAddClick}
                >
                    + Add Team
                </button>

            </div>


            {/* ==============================
                SUCCESS MESSAGE
            ============================== */}

            {success && (

                <div className="success-message">

                    {success}

                </div>

            )}


            {/* ==============================
                ERROR MESSAGE
            ============================== */}

            {error && (

                <div className="error-message">

                    {error}

                </div>

            )}


            {/* ==============================
                ADD / EDIT FORM
            ============================== */}

            {showForm && (

                <div className="form-card">

                    <div className="form-header">

                        <h2>

                            {editingId !== null
                                ? "Edit Team"
                                : "Add Team"}

                        </h2>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">


                            {/* TEAM NAME */}

                            <div className="form-group">

                                <label>
                                    Team Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter team name"
                                />

                            </div>


                            {/* COACH */}

                            <div className="form-group">

                                <label>
                                    Coach
                                </label>

                                <input
                                    type="text"
                                    name="coach"
                                    value={formData.coach}
                                    onChange={handleChange}
                                    placeholder="Enter coach name"
                                />

                            </div>


                            {/* CITY */}

                            <div className="form-group">

                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                />

                            </div>

                        </div>


                        {/* FORM BUTTONS */}

                        <div className="form-actions">

                            <button
                                type="submit"
                                className="primary-button"
                            >

                                {editingId !== null
                                    ? "Update Team"
                                    : "Save Team"}

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


            {/* ==============================
                LOADING
            ============================== */}

            {loading && (

                <div className="loading-message">

                    Loading teams...

                </div>

            )}


            {/* ==============================
                TEAM TABLE
            ============================== */}

            {!loading && teams.length > 0 && (

                <div className="table-card">

                    <table>

                        <thead>

                        <tr>

                            <th>ID</th>

                            <th>Team Name</th>

                            <th>Coach</th>

                            <th>City</th>

                            <th>Actions</th>

                        </tr>

                        </thead>


                        <tbody>

                        {teams.map((team) => (

                            <tr key={team.id}>

                                <td>
                                    {team.id}
                                </td>


                                <td className="team-name">
                                    {team.name}
                                </td>


                                <td>
                                    {team.coach}
                                </td>


                                <td>
                                    {team.city}
                                </td>


                                <td>

                                    <div className="action-buttons">


                                        {/* EDIT */}

                                        <button
                                            type="button"
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(team)
                                            }
                                        >
                                            Edit
                                        </button>


                                        {/* DELETE */}

                                        <button
                                            type="button"
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(team.id)
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


            {/* ==============================
                NO TEAMS
            ============================== */}

            {!loading &&
                teams.length === 0 &&
                !error && (

                    <div className="empty-state">

                        <h3>
                            No teams found
                        </h3>

                        <p>
                            Click "+ Add Team" to create your first team.
                        </p>

                    </div>

                )}

        </div>
    );
}

export default Teams;