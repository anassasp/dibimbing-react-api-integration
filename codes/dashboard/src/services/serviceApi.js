export async function getServices() {
  const response = await fetch("/api/services");

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
}

export async function createService(service) {
  const response = await fetch("/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(service)
  });

  if (!response.ok) {
    throw new Error("Failed to create service");
  }

  return response.json();
}

export async function updateService(id, service) {
  const response = await fetch(`/api/services/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(service)
  });

  if (!response.ok) {
    throw new Error("Failed to update service");
  }

  return response.json();
}

export async function deleteService(id) {
  const response = await fetch(`/api/services/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete service");
  }

  return response.json();
}
