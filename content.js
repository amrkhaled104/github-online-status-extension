const myUsername = document.querySelector('meta[name="user-login"]')?.content;

if (myUsername) {
    console.log("Extension started for user:", myUsername);

    setInterval(() => {
        fetch(`https://github-online-tracker-default-rtdb.firebaseio.com/users/${myUsername}.json`, {
            method: 'PUT',
            body: JSON.stringify({ last_seen: Date.now() })
        }).then(() => console.log("Status updated to Firebase"));
    }, 30000);
}

async function checkOnlineUsers() {
    try {
        const response = await fetch(`https://github-online-tracker-default-rtdb.firebaseio.com/users.json`);
        const allUsers = await response.json();

        if (!allUsers) return;

        const links = document.querySelectorAll('a.author, a[data-hovercard-type="user"], .author');

        links.forEach(link => {
            const username = link.textContent.trim().replace('@', '');

            if (allUsers[username]) {
                const lastSeen = allUsers[username].last_seen;
                const isOnline = (Date.now() - lastSeen) < 60000;

                if (isOnline && !link.querySelector('.online-dot')) {
                    const dot = document.createElement('span');
                    dot.className = 'online-dot';
                    link.appendChild(dot);
                }
            }
        });
    } catch (e) {
        console.error("Firebase fetch error:", e);
    }
}

setInterval(checkOnlineUsers, 10000);