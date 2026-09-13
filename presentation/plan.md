Create a modern, professional 12-slide PowerPoint for a 15–20 minute microteaching audition for a Frontend Mentor position at Dibimbing.

TOPIC:
“React CRUD & API Integration — Building a Service Management Dashboard”

AUDIENCE:
Beginner–intermediate React students.

CORE APPROACH:
Use ONE realistic use case throughout the entire session:

An admin needs to manage services:
- View services
- Add service
- Edit service
- Delete service

The presentation should teach React + REST API integration through this use case.

IMPORTANT:
Use VERY LITTLE TEXT.

Slides should be visual teaching aids, NOT lecture notes.

Each slide should contain:
- One clear idea
- Short labels
- Code snippets
- Diagrams
- UI mockups
- Interactive questions

Do NOT use paragraphs.
Do NOT put explanations that should be spoken by the mentor onto the slides.

TECHNICAL FOCUS:
- React useState
- React useEffect
- Form handling
- fetch()
- GET
- POST
- HTTP headers
- Request body
- JSON.stringify()
- Response
- HTTP status codes
- React state update
- CRUD → HTTP methods

==================================================
SLIDE 1 — THE USE CASE
==================================================

Title:

“Service Management Dashboard”

Show a clean dashboard UI:

Services

Web Development       Rp5.000.000
UI/UX Design          Rp3.000.000

[ + Add Service ]

Question at bottom:

“Where does this data come from?”

Minimal text.

==================================================
SLIDE 2 — THE REQUIREMENT
==================================================

Title:

“What does the admin need?”

Show four visual actions:

👁 View
＋ Add
✎ Edit
🗑 Delete

Do not explain CRUD yet.

Animate each action appearing.

==================================================
SLIDE 3 — READ
==================================================

Title:

“Let’s start with READ”

Show:

```text
React
  ↓
GET /api/services
  ↓
API
  ↓
JSON
  ↓
UI
