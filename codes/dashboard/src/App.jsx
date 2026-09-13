import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ServiceList from "./components/ServiceList";
import ServiceForm from "./components/ServiceForm";
import "./index.css";

// DUMMY DATA FOR STARTER CODE
const initialServices = [
  { id: 1, name: "Web Development", price: 5000000 },
  { id: 2, name: "UI/UX Design", price: 3000000 }
];

function App() {
  // const queryClient = useQueryClient();

  // TEMPORARY LOCAL STATE (Remove once useQuery is wired)
  const [services, setServices] = useState(initialServices);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // TODO 1: Fetch services (READ) using useQuery
  // const { data: services, isLoading, isError } = useQuery({ ... })

  // TODO 2: Create service (CREATE) using useMutation
  // const createMutation = useMutation({ ... })
  function handleCreateService(serviceData) {
    // TEMPORARY LOCAL FIX:
    const newService = { ...serviceData, id: Date.now() };
    setServices((prev) => [...prev, newService]);
    setShowForm(false);
  }

  // TODO 3: Update service (UPDATE) using useMutation
  // const updateMutation = useMutation({ ... })
  function handleUpdateService(serviceData) {
    // TEMPORARY LOCAL FIX:
    setServices((prev) =>
      prev.map((s) => (s.id === editingService.id ? { ...serviceData, id: editingService.id } : s))
    );
    setEditingService(null);
  }

  // TODO 4: Delete service (DELETE) using useMutation
  // const deleteMutation = useMutation({ ... })
  function handleDeleteService(id) {
    if (!confirm("Are you sure you want to delete this service?")) return;

    // TEMPORARY LOCAL FIX:
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  // Open edit form
  function handleEdit(service) {
    setEditingService(service);
  }

  // Close any open form
  function handleCloseForm() {
    setShowForm(false);
    setEditingService(null);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Service Management</h1>
        <button
          id="add-service-btn"
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Add
        </button>
      </header>

      <main className="main">
        <ServiceList
          services={services}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDeleteService}
        />
      </main>

      {showForm && (
        <ServiceForm
          onSubmit={handleCreateService}
          onCancel={handleCloseForm}
        />
      )}

      {editingService && (
        <ServiceForm
          onSubmit={handleUpdateService}
          onCancel={handleCloseForm}
          initialData={editingService}
        />
      )}
    </div>
  );
}

export default App;
