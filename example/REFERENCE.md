# Task: Generate a Simple Chatbot Web Application Based on a Template

Please generate a very simple chatbot web application based on an existing basic web template in the parent folder (HTML + CSS + JavaScript).

---

## 🎯 Application Purpose

The app provides information about **three childcare facilities** in a specific region.

Each facility has the following data:
- Capacity (maximum number of children)
- Available slots
- Waiting list count
- Available childcare hours

---

## ✅ Functional Requirements

### 1. Chat Functionality
- The app should accept user input via a text box
- A submit button sends the input
- The app responds with relevant information based on the user’s question

### 2. Response Logic
- If the question matches available data:
  → Return the corresponding answer
- If no matching information exists:
  → Respond with:  
  **"すみません、わかりません" (Sorry, I don't know)**
- If a user expresses gratitude, say “you're welcome
- If they say a greeting or farewell, return the greeting.

---

### 3. Sentiment Analysis
- Determine whether the user input is:
  - Positive
  - Neutral
  - Negative

- Reflect the result by changing the background color:
  - Positive → Pink
  - Neutral → White
  - Negative → Light Blue

---

## 🧩 Application UI (Single Page)

The app should remain on a single page and include:

project-root/
├── index.html
├── style.css
└── scripts/
    ├── script.js
    ├── analysis.js
    └── server.js

---

## 📜 File Responsibilities

### index.html
- Defines UI layout
- Links CSS and scripts

---

### style.css
- Basic styling
- Background color changes based on sentiment

---

### scripts/script.js
- Handles UI interactions
- Sends user input to analysis and server logic
- Updates UI with response
- Changes background color based on sentiment flag

---

### scripts/analysis.js
Responsible for:
1. Parsing user input
2. Generating a query for the database (server.js)
3. Performing sentiment analysis:
   - Positive / Neutral / Negative classification
4. Returning:
   - Query parameters
   - Sentiment flag

---

### scripts/server.js
Responsible for:
- Simulated database (in-memory data is fine)
- Query execution
- Returning appropriate childcare facility data

---

## 🧠 Data Example (Hardcoded)

Use 3 facilities like:
- Facility A
- Facility B
- Facility C

Each should include:
- capacity
- available slots
- waiting children
- available hours

---

## 📊 Diagrams

Please include the following diagrams in text-based format (e.g., Mermaid or ASCII):

### 1. Class/Architecture Diagram
Show relationships between:
- script.js
- analysis.js
- server.js

---

### 2. Flow Diagram
Illustrate:
User input → Analysis → Query → Response → UI update

---

## 🔌 Third-Party Dependencies

- Mention any external libraries used
- If none are used, explicitly state:
  → "No third-party libraries are used"

If any dependencies exist:
- Provide a `requirements.txt` or equivalent list

---

## 🧾 Output Requirements

Your response must include:
1. Folder structure
2. Full code for all files
3. Diagrams
4. Dependency list

---

## ⚠️ Constraints

- Keep the implementation simple and beginner-friendly
- Use only vanilla JavaScript (no frameworks)
- No backend server required (simulate everything locally)
- Code must be runnable in a browser directly

