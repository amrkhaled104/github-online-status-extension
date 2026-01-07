# 🔥 GitHub Live-Tracker

A lightweight Chrome extension that allows you to track the real-time online status of the developers you follow on GitHub.

## 🚀 Features

- **Real-Time Tracking:** Syncs with a Firebase Realtime Database to provide up-to-date status for active users.
- **Following-Only Filter:** Respects your privacy by only displaying status updates for users in your `following` list.
- **Heartbeat System:** Automatically updates your status every 60 seconds to keep your presence accurate for others.
- **Interactive UI:** A sleek, non-intrusive interface that blends perfectly with GitHub’s design, featuring a "Fire Glow" hover effect.
- **Smart Grace Window:** Uses a 120-second threshold to handle network jitter and device time-drift, ensuring accurate "Online" indicators.

## 🛠️ Setup & Installation

Follow these steps to get the extension running on your local machine:

### 1. Clone the Repository
Open your terminal and run the following command:
```bash
git clone [https://github.com/YOUR_USERNAME/github-live-tracker.git](https://github.com/YOUR_USERNAME/github-live-tracker.git)
```

### 2. Load the Extension in Chrome

* Open Google Chrome and navigate to `chrome://extensions/`.
* Enable **Developer mode** (toggle switch in the top right corner).
* Click the **Load unpacked** button.
* Select the project folder.

### 3. Start Tracking

* Go to any [GitHub](https://github.com) page.
* Look for the **Friends Online** button at the bottom left of your screen.
* Click it to see who is currently active!

---