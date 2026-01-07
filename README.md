#  GitHub Live-Tracker

A high-performance Chrome extension that integrates a real-time online status dashboard directly into the GitHub UI. Built to bridge the gap between static learning and real-world application.

##  Where it appears
The extension is context-aware and integrates seamlessly into the GitHub interface:
- **Profile Pages:** The "Friends Online" dashboard appears exclusively on GitHub profile pages.
- **Placement:** Look for the glowing button at the **bottom-left sidebar**, right under the user's bio and details (`.vcard-details`).

##  Features

- **Live Activity Tracking:** Syncs with Firebase Realtime Database to show who is currently active.
- **Smart Sorting:** Automatically prioritizes "Active" users at the top, followed by "Recently Offline" users.
- **Time-Ago Indicators:** Displays human-readable timestamps (e.g., *Active now*, *5m ago*, *2h ago*) by calculating device time-drift.
- **Privacy-First:** Only tracks and displays status for users within your `following` list.
- **Performance Optimized:** Uses `Promise.all` for parallel fetching from GitHub and Firebase, ensuring zero UI lag.

##  How it works (The Tech)
Instead of practicing with static JSON files, this project interacts with the **Live GitHub DOM**:
1. **Heartbeat:** Every 60 seconds, it sends a "pulse" to Firebase with your current timestamp.
2. **Dynamic Injection:** It monitors the page for specific GitHub CSS classes to inject the dashboard.
3. **Async Logic:** Handles complex asynchronous state management to merge API data with real-time database records.

## 📥 Installation

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/github-live-tracker.git](https://github.com/YOUR_USERNAME/github-live-tracker.git)

```

2. **Load in Chrome:**
* Go to `chrome://extensions/`.
* Enable **Developer mode**.
* Click **Load unpacked** and select the project folder.


3. **Usage:** - Refresh any GitHub profile page.
* Click the **Friends Online** button at the bottom left to toggle the sidebar.

