const myUsername = document.querySelector('meta[name="user-login"]')?.content?.toLowerCase();

if (myUsername) {
    const updateStatus = () => {
        fetch(`https://github-online-tracker-default-rtdb.firebaseio.com/users/${myUsername}.json`, {
            method: 'PUT',
            body: JSON.stringify({ last_seen: Date.now() })
        });
    };
    updateStatus();
    setInterval(updateStatus, 3000);
}

async function checkOnlineUsers() {
    try {
        const response = await fetch(`https://github-online-tracker-default-rtdb.firebaseio.com/users.json`);
        const data = await response.json();
        if (!data) return;

        const allUsers = {};
        Object.keys(data).forEach(key => {
            allUsers[key.toLowerCase()] = data[key];
        });

        const links = document.querySelectorAll('a[data-hovercard-type="user"], a.author, .author, a.Link--primary.text-bold');

        links.forEach(link => {
            const username = link.textContent.trim().replace('@', '').toLowerCase();

            if (allUsers[username]) {
                const lastSeen = allUsers[username].last_seen;
                const isOnline = (Date.now() - lastSeen) < 60000;
                const existingDot = link.querySelector('.online-dot');

                if (isOnline) {
                    if (!existingDot) {
                        const dot = document.createElement('span');
                        dot.className = 'online-dot';
                        link.appendChild(dot);
                    }
                } else if (existingDot) {
                    existingDot.remove();
                }
            }
        });
    } catch (e) { console.error(e); }
}

setInterval(checkOnlineUsers, 5000);