import { useState, useEffect } from "react";

function ServiceForm({ onSubmit, onCancel, initialData }) {
  const isEditing = !!initialData;
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price.toString());
    }
  }, [initialData]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !price) {
      setError("Name and price are required");
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({ name: name.trim(), price: Number(price) });
      setName("");
      setPrice("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="service-form-overlay" className="overlay" onClick={onCancel}>
      <form
        id="service-form"
        className="form-card"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{isEditing ? "Edit Service" : "Add Service"}</h2>

        {error && <p className="form-error">{error}</p>}

        <label htmlFor="service-name">Name</label>
        <input
          id="service-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Mobile App Development"
          autoFocus
        />

        <label htmlFor="service-price">Price</label>
        <input
          id="service-price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. 7000000"
        />

        <div className="form-actions">
          <button
            id="cancel-btn"
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            id="submit-btn"
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting
              ? (isEditing ? "Saving..." : "Creating...")
              : (isEditing ? "Save" : "Create")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServiceForm;
