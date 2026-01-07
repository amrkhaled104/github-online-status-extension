window.addEventListener('load', () => {
    const myUsername = document.querySelector('meta[name="user-login"]')?.content?.toLowerCase();

    if (myUsername) {
        const updateStatus = async () => {
            try {
                await fetch(`https://github-online-tracker-default-rtdb.firebaseio.com/users/${myUsername}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({ last_seen: Date.now() })
                });
            } catch (e) { console.log("Status update failed - offline mode"); }
        };
        updateStatus();
        setInterval(updateStatus, 60000);
    }

    if (document.querySelector('.vcard-details')) {
        createOnlineDashboard(myUsername);
    }
});

async function refreshFriends(myUsername) {
    const list = document.getElementById('friends-list');
    const countLabel = document.getElementById('online-count');
    if (!list) return;

    list.innerHTML = "<div style='text-align:center; padding:20px; color:gray; font-size:12px;'>Loading...</div>";

    try {
        const [followingRes, firebaseRes] = await Promise.all([
            fetch(`https://api.github.com/users/${myUsername}/following?per_page=100`),
            fetch(`https://github-online-tracker-default-rtdb.firebaseio.com/users.json`)
        ]);

        const followingData = await followingRes.json();
        const firebaseData = await firebaseRes.json();
        const followingNames = new Set(followingData.map(u => u.login.toLowerCase()));

        const now = Date.now();
        let allUsers = [];
        let seenNames = new Set();

        for (let user in firebaseData) {
            const userLower = user.toLowerCase();

            if (!followingNames.has(userLower) || userLower === myUsername || seenNames.has(userLower)) continue;

            seenNames.add(userLower);
            const lastSeen = firebaseData[user].last_seen;
            const diff = Math.floor((now - lastSeen) / 1000);
            const isOnline = diff < 120;

            allUsers.push({ name: user, diff, isOnline });
        }

        allUsers.sort((a, b) => a.diff - b.diff);

        list.innerHTML = "";

        if (allUsers.length === 0) {
            list.innerHTML = "<div style='text-align:center; padding:40px; color:gray; font-size:12px;'>No active friends found</div>";
        }

        allUsers.forEach(user => {
            const timeText = user.diff < 60 ? `${user.diff}s ago` :
                user.diff < 3600 ? `${Math.floor(user.diff / 60)}m ago` :
                    `${Math.floor(user.diff / 3600)}h ago`;

            const row = document.createElement('div');
            row.style.cssText = "padding:10px; border-bottom:1px solid #f6f8fa; display:flex; align-items:center; justify-content:space-between; cursor:pointer; border-radius:8px; transition: background 0.2s;";
            row.onmouseover = () => row.style.backgroundColor = "#f6f8fa";
            row.onmouseout = () => row.style.backgroundColor = "transparent";
            row.onclick = () => window.open(`https://github.com/${user.name}`, '_blank');

            row.innerHTML = `
                <div style="display:flex; align-items:center;">
                    <span style="width:8px; height:8px; background:${user.isOnline ? '#2ea44f' : '#8c959f'}; border-radius:50%; margin-right:12px; box-shadow:${user.isOnline ? '0 0 5px #2ea44f' : 'none'};"></span>
                    <b style="color:${user.isOnline ? '#0969da' : '#1f2328'}; font-size:13px;">${user.name}</b>
                </div>
                <span style="font-size:11px; color:gray;">${user.isOnline ? 'Active' : timeText}</span>
            `;
            list.appendChild(row);
        });

        if (countLabel) countLabel.innerText = allUsers.filter(u => u.isOnline).length;

    } catch (e) {
        console.error(e);
        list.innerHTML = "<div style='text-align:center; padding:20px; color:#cf222e;'>Connection failed</div>";
    }
}