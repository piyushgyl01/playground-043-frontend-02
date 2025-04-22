import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, loading, error, refetch } = useFetch(
    `${import.meta.env.VITE_API_URL}/manhwas`
  );

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this manhwa?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/manhwas/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          refetch();
        }
      } catch (error) {
        alert(`Error deleting manga: ${error.message}`);
        console.error(error);
      }
    }
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manhwa List</h2>
        <Link className="btn btn-success" to="/post">
          Add New Manhwa
        </Link>
      </div>

      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="alert alert-danger">{error}</div>
        </div>
      )}

      {data && data.length === 0 && !loading && !error && (
        <div className="alert alert-info">
          No manhwa found. Add a new one to get started!
        </div>
      )}

      <div className="row">
        {data &&
          data.length > 0 &&
          data.map((manhwa) => (
            <div className="col-md-12 mb-4 list-group" key={manhwa._id}>
              <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {manhwa.title} by {manhwa.author}
                  </h5>
                  <small className="text-body-secondary">
                    {new Date(manhwa.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <p className="mb-1">{manhwa.description}</p>
                <Link
                  className="btn btn-primary me-2 mt-2"
                  to={`/details/${manhwa._id}`}
                >
                  View Details
                </Link>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDelete(manhwa._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
