# GitHub Live-Tracker

A Chrome extension designed to solve a simple problem: knowing which of your followed developers are currently active on GitHub.

## Where it appears

The "Friends Online" dashboard integrates directly into the GitHub sidebar. It becomes visible whenever you visit any of the main profile sections:

* Overview
* Repositories
* Stars
* Projects
It is located on the left-hand sidebar, specifically positioned under the user profile details.

## Core Features

* Real-time status updates using Firebase.
* Intelligent sorting that keeps active users at the top of the list.
* Dynamic time-ago indicators showing exactly when a user was last seen (e.g., 10s ago, 5m ago, 2h ago).
* Privacy-focused filtering that only tracks users in your following list.

## Development Context

This project was built to move beyond practicing Fetch API on static JSON files. It focuses on real-world implementation challenges:

* Data Synchronization: Using Promise.all to fetch GitHub and Firebase data concurrently to ensure zero UI lag.
* Time Synchronization: Implementing logic to calculate time-drift between different devices for accurate "Active Now" status.
* State Management: Handling asynchronous status updates (Heartbeats) every 60 seconds without affecting page performance.

##  Setup & Installation

Follow these steps to get the extension running on your local machine:

### 1. Clone the Repository
Open your terminal and run the following command:
```bash
git clone [https://github.com/amrkhaled104/github-online-status-extension](https://github.com/amrkhaled104/github-online-status-extension)

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

