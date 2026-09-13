# React CRUD API Demo — Implementation Plan

## 1. Objective

Build a minimal Service Management dashboard for a microteaching audition.

The application demonstrates:

- React consuming a REST API
- `GET` request to retrieve services
- `POST` request to create a service
- HTTP request headers
- HTTP request body
- JSON serialization
- HTTP status codes
- Browser Network inspection

The application does **not** need to be production-ready.

---

# 2. Tech Stack

## Frontend

- React
- Vite
- JavaScript
- Basic CSS

## Backend

- Node.js
- Express.js

## Data

- In-memory JavaScript array

## Not Required

- Database
- Authentication
- Redux
- React Query
- TypeScript
- Deployment
- Complex UI
- Full CRUD implementation

---

# 3. Project Structure

```text
dibimbing-crud-demo/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ServiceList.jsx
│   │   │   └── ServiceForm.jsx
│   │   │
│   │   ├── services/
│   │   │   └── serviceApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── data/
│   │   └── services.js
│   │
│   ├── routes/
│   │   └── serviceRoutes.js
│   │
│   ├── app.js
│   └── package.json
│
└── README.md
````

 Keep the architecture simple.

---

 # 4\. Application UI

 The application only needs one page.

 ## Dashboard

```
┌──────────────────────────────────────────────┐
│ Service Management             [+ Add]       │
├──────────────────────────────────────────────┤
│                                              │
│ Service                  Price               │
│ ──────────────────────────────────────────── │
│ Web Development          Rp5.000.000         │
│ UI/UX Design             Rp3.000.000         │
│                                              │
└──────────────────────────────────────────────┘
```

 ## Add Service Form

```
┌─────────────────────────────┐
│ Add Service                 │
│                             │
│ Name                        │
│ [_______________________]   │
│                             │
│ Price                       │
│ [_______________________]   │
│                             │
│       [Cancel] [Create]     │
└─────────────────────────────┘
```

 Do not spend significant time on visual design.

 The UI exists to support the teaching demonstration.

---

 # 5\. Initial Data

 Create an in-memory array:

```
const services = [
  {
    id: 1,
    name: "Web Development",
    price: 5000000
  },
  {
    id: 2,
    name: "UI/UX Design",
    price: 3000000
  }
];
```

---

 # 6\. Backend API

 ## GET `/api/services`

 Purpose:

 Retrieve all services.

 ### Request

```
GET /api/services
```

 No request body is required.

 ### Response

 Status:

```
200 OK
```

 Body:

```
[
  {
    "id": 1,
    "name": "Web Development",
    "price": 5000000
  },
  {
    "id": 2,
    "name": "UI/UX Design",
    "price": 3000000
  }
]
```

---

 ## POST `/api/services`

 Purpose:

 Create a new service.

 ### Request

```
POST /api/services
```

 Header:

```
Content-Type: application/json
```

 Body:

```
{
  "name": "Mobile App Development",
  "price": 7000000
}
```

 ### Response

 Status:

```
201 Created
```

 Body:

```
{
  "id": 3,
  "name": "Mobile App Development",
  "price": 7000000
}
```

---

 # 7\. Backend Validation

 Keep validation minimal.

 Required fields:

 - `name`
- `price`

 If invalid:

```
400 Bad Request
```

 Example:

```
{
  "message": "Name and price are required"
}
```

 Do not build complex validation.

---

 # 8\. Backend Implementation

 ## Express setup

 Create:

```
server/app.js
```

 Requirements:

 - Create Express application
- Enable `express.json()`
- Register `/api/services`
- Start server

 Example structure:

```
const express = require("express");

const app = express();

app.use(express.json());

app.use("/api/services", serviceRoutes);

app.listen(3000, () => {
  console.log("API running on port 3000");
});
```

---

 # 9\. GET Endpoint Implementation

 Create:

```
server/routes/serviceRoutes.js
```

 Implement:

```
GET /api/services
```

 Return the current services array.

 Expected flow:

```
GET Request
     ↓
Express Route
     ↓
services array
     ↓
JSON Response
```

---

 # 10\. POST Endpoint Implementation

 Implement:

```
POST /api/services
```

 Read:

```
req.body
```

 Example:

```
const { name, price } = req.body;
```

 Validate the data.

 Generate a new ID.

 Add the new service to the array.

 Return:

```
201 Created
```

 Expected flow:

```
POST Request
     ↓
Request Headers
     ↓
Request Body
     ↓
Express
     ↓
Create service
     ↓
201 Created
     ↓
JSON Response
```

---

 # 11\. Frontend API Layer

 Create:

```
client/src/services/serviceApi.js
```

 Implement two functions:

```
getServices()
```

 and:

```
createService(service)
```

---

 ## GET Function

 Conceptually:

```
export async function getServices() {
  const response = await fetch("/api/services");

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
}
```

---

 ## POST Function

 Conceptually:

```
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
```

 This function is especially important for the teaching demonstration.

---

 # 12\. React Service List

 Create:

```
client/src/components/ServiceList.jsx
```

 Responsibilities:

 1. Fetch services when the component loads.
2. Store services in React state.
3. Display services in a table.

 Conceptual flow:

```
Component Mounts
      ↓
getServices()
      ↓
GET /api/services
      ↓
Response
      ↓
setServices()
      ↓
Render Table
```

---

 # 13\. React Service Form

 Create:

```
client/src/components/ServiceForm.jsx
```

 Fields:

```
Name
Price
```

 On submit:

```
Form Submit
     ↓
Create service object
     ↓
createService()
     ↓
POST /api/services
     ↓
201 Created
     ↓
Update service list
```

 Example service object:

```
{
  name: "Mobile App Development",
  price: 7000000
}
```

---

 # 14\. Minimal React State

 Use only basic React state.

 Example:

```
const [services, setServices] = useState([]);
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

 No external state management library.

---

 # 15\. After Successful POST

 When the API returns the new service:

```
POST
 ↓
201 Created
 ↓
New Service
 ↓
Update React State
 ↓
Render New Row
```

 Example:

```
const newService = await createService({
  name,
  price: Number(price)
});

setServices(prev => [...prev, newService]);
```

 Clear the form afterward.

---

 # 16\. Browser Network Demonstration

 This is a key part of the audition.

 Open:

```
Chrome DevTools
→ Network
```

 ## Demonstrate GET

 Refresh the page.

 Select:

```
GET /api/services
```

 Show:

```
Request Method: GET
Status Code: 200 OK
Response: JSON
```

---

 ## Demonstrate POST

 Create:

```
Mobile App Development
Rp7.000.000
```

 Select:

```
POST /api/services
```

 Show:

 ### Request Method

```
POST
```

 ### Request Header

```
Content-Type: application/json
```

 ### Request Payload

```
{
  "name": "Mobile App Development",
  "price": 7000000
}
```

 ### Response

```
201 Created
```

 ### Response Body

```
{
  "id": 3,
  "name": "Mobile App Development",
  "price": 7000000
}
```

 This should be the main technical demonstration.

---

 # 17\. Intentional Debugging Challenge

 Prepare one temporary bug for the teaching session.

 Incorrect:

```
body: service
```

 Correct:

```
body: JSON.stringify(service)
```

 Ask:

 > "Can you spot what's wrong with this request?"

 Expected explanation:

```
service is a JavaScript object.

The request body needs to contain JSON.

JSON.stringify()
converts the JavaScript object
into a JSON string.
```

 Then fix the code and demonstrate the successful request.

---

 # 18\. CRUD Conceptual Summary

 The application only implements GET and POST.

 However, explain the complete CRUD mapping:

```
CREATE → POST
READ   → GET
UPDATE → PATCH
DELETE → DELETE
```

 Clarify:

 > "For today's session, we're implementing READ and CREATE. UPDATE and DELETE follow the same API communication principles."

---

 # 19\. Demo Script

 ## Opening

 Show the dashboard.

 Say:

 > "Imagine we're building a simple admin dashboard where an admin can manage the company's services."

 Then ask:

 > "If these services aren't hard-coded in React, where do you think they come from?"

---

 ## READ

 Refresh the page.

 Show the Network tab.

 Say:

 > "Let's see what actually happens."

 Show:

```
GET /api/services
200 OK
```

 Explain:

```
React
→ GET request
→ API
→ JSON response
→ React state
→ UI
```

---

 ## CREATE

 Click:

```
+ Add Service
```

 Enter:

```
Mobile App Development
7000000
```

 Before submitting, ask:

 > "What do we need to send to the API?"

 Then submit.

 Show:

```
POST /api/services
```

 Open the request payload.

 Explain:

```
Method
Headers
Body
```

---

 ## Debugging

 Show the broken:

```
body: service
```

 Ask:

 > "Why might this cause a problem?"

 Let the audience answer.

 Reveal:

```
body: JSON.stringify(service)
```

---

 ## Closing

 Show:

```
CREATE → POST
READ   → GET
UPDATE → PATCH
DELETE → DELETE
```

 Finish with:

 > "Don't just memorize the HTTP methods. Understand what you're sending, where you're sending it, and what the server sends back."

---

 # 20\. Testing Checklist

 Before the audition, verify:

 ## Backend

 - [ ] Server starts successfully
- [ ] `GET /api/services` works
- [ ] `POST /api/services` works
- [ ] Invalid POST returns `400`
- [ ] Successful POST returns `201`

 ## Frontend

 - [ ] Dashboard loads
- [ ] Services appear
- [ ] Add form works
- [ ] New service appears immediately
- [ ] Form clears after submission
- [ ] Error doesn't crash the app

 ## DevTools

 - [ ] GET request visible
- [ ] GET response visible
- [ ] POST request visible
- [ ] Request headers visible
- [ ] Request payload visible
- [ ] Response status visible
- [ ] Response body visible

 ## Presentation

 - [ ] Opening question prepared
- [ ] GET explanation prepared
- [ ] POST explanation prepared
- [ ] `headers` explanation prepared
- [ ] `body` explanation prepared
- [ ] `JSON.stringify()` explanation prepared
- [ ] Debugging challenge prepared
- [ ] CRUD recap prepared

---

 # 21\. Scope Rule

 If you are running out of time:

 ## Keep

```
GET
POST
Request Headers
Request Body
Response
Network Tab
```

 ## Remove

```
PATCH
DELETE
Search
Fancy UI
Animations
Database
Authentication
Advanced React patterns
```

 The goal is not to build a complete application.

 The goal is to build a **small working application that makes your teaching concrete**.
