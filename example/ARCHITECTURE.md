# Chatbot Architecture Documentation

## 📁 Folder Structure

```
project-root/
├── index.html           # Main HTML file with UI layout
├── style.css            # Styling and sentiment-based colors
├── scripts/
│   ├── script.js        # UI interaction handler
│   ├── analysis.js      # Input analysis and sentiment detection
│   └── server.js        # Simulated database and query logic
└── ARCHITECTURE.md      # This file
```

---

## 🏗 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     index.html (UI Layer)                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Chat Display | User Input Box | Send Button           │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │   script.js (UI Handler)     │
        │  • Handle button clicks      │
        │  • Update DOM elements       │
        │  • Call analysis & database  │
        └─────┬────────────────────┬───┘
              │                    │
              ▼                    ▼
    ┌─────────────────┐   ┌──────────────────┐
    │ analysis.js     │   │ server.js        │
    │ • Parse input   │   │ • Query database │
    │ • Sentiment     │   │ • Format result  │
    │ • Build query   │   │ • Return data    │
    └─────────────────┘   └──────────────────┘
              │                    │
              └────────┬───────────┘
                       ▼
        ┌──────────────────────────────┐
        │   style.css (Styling)        │
        │  • Background color update   │
        │  • Based on sentiment flag   │
        └──────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

```
User Input
    │
    ▼
┌─────────────────────────────────┐
│ script.js                       │
│ • Get user message from DOM     │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│ analysis.js                     │
│ • analyzeInput(message)         │
│ • determineSentiment()          │
│ • parseQuery()                  │
│ Returns: {                      │
│   queryParams: {...},           │
│   sentiment: 'positive'         │
│ }                               │
└──────────┬──────────────────────┘
           │
           ├─────────────────────┐
           │                     │
           ▼                     ▼
┌────────────────────┐   ┌──────────────────┐
│ queryDatabase()    │   │ updateSentiment()│
│ server.js          │   │ script.js        │
│ Returns: data      │   │ Update bg color  │
└──────────┬─────────┘   └──────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│ formatResponse()                │
│ server.js                       │
│ Converts data to readable text  │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│ displayBotMessage()             │
│ script.js                       │
│ • Update DOM with response      │
│ • Scroll to bottom              │
└─────────────────────────────────┘
```

---

## 📋 Module Responsibilities

### index.html
- Defines the HTML structure
- Contains chat display area, input field, and send button
- Links external CSS and JavaScript files
- No business logic

### style.css
- Styles the UI components
- Handles sentiment-based background colors:
  - `sentiment-positive` → Pink (#FFB6D9)
  - `sentiment-neutral` → White
  - `sentiment-negative` → Light Blue (#ADD8E6)
- Responsive design for mobile/desktop

### scripts/script.js
- **UI Event Handler**
  - Listens for button clicks and Enter key
  - Reads user input from DOM
  - Displays messages in chat box
  
- **Integration Layer**
  - Calls `analyzeInput()` from analysis.js
  - Calls `queryDatabase()` from server.js
  - Calls `formatResponse()` from server.js
  - Calls `updateSentiment()` to change background

- **Utility Functions**
  - `escapeHtml()` prevents XSS attacks
  - `scrollToBottom()` auto-scrolls chat

### scripts/analysis.js
- **Input Parser**
  - `parseQuery()` extracts facility name and intent
  - `extractKeyword()` identifies search keywords
  
- **Sentiment Analyzer**
  - `determineSentiment()` classifies as positive/neutral/negative
  - Counts positive and negative keywords
  - Returns sentiment flag

### scripts/server.js
- **Simulated Database**
  - `facilities` array stores 3 hardcoded childcare facilities
  - Each facility has: capacity, available slots, waiting list, hours
  
- **Query Engine**
  - `queryDatabase()` handles three query types:
    - `all_facilities`: Return all facilities
    - `specific_facility`: Return one facility
    - `keyword`: Search across all facilities
  
- **Response Formatter**
  - `formatResponse()` converts data to readable text
  - Returns Japanese phrase if no data found

---

## 🧪 Data Structure

Each facility contains:
```javascript
{
  id: 'facility_a',
  name: 'Facility A',
  capacity: 50,
  available_slots: 12,
  waiting_children: 3,
  hours: '08:00 - 18:00'
}
```

---

## 🚀 Execution Flow Example

**User types:** "What is the capacity of Facility A?"

1. **script.js** captures input and calls `analyzeInput()`
2. **analysis.js** processes:
   - Detects "facility a" → `facility: 'facility_a'`
   - Detects "capacity" → `type: 'keyword'`
   - Sentiment check: neutral (no positive/negative words)
   - Returns: `{ queryParams: {...}, sentiment: 'neutral' }`
3. **script.js** calls `updateSentiment('neutral')` → background stays white
4. **script.js** calls `queryDatabase()` with query params
5. **server.js** finds Facility A and returns data
6. **server.js** formats as readable text
7. **script.js** displays bot response in chat

---

## 🔒 Security Considerations

- `escapeHtml()` prevents XSS by sanitizing user input before displaying
- No external API calls; all data is local
- No authentication needed (demo application)

---

## 📦 Dependencies

**No third-party libraries are used**

Only vanilla JavaScript, HTML, and CSS.

