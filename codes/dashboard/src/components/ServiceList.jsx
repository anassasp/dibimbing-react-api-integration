function ServiceList({ services, loading, error, onEdit, onDelete }) {
  if (loading) {
    return <p className="status-message">Loading services...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  if (services.length === 0) {
    return <p className="status-message">No services found.</p>;
  }

  // Format price to Indonesian Rupiah
  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  return (
    <table id="services-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service) => (
          <tr key={service.id}>
            <td>{service.name}</td>
            <td>{formatPrice(service.price)}</td>
            <td className="actions-cell">
              <button
                className="btn btn-icon btn-edit"
                onClick={() => onEdit(service)}
                title="Edit"
              >
                ✏️
              </button>
              <button
                className="btn btn-icon btn-delete"
                onClick={() => onDelete(service.id)}
                title="Delete"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ServiceList;
