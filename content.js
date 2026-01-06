window.addEventListener('load', () => {
    const myUsername = document.querySelector('meta[name="user-login"]')?.content?.toLowerCase();

    if (myUsername) {
        const updateStatus = () => {
            fetch(`https://github-online-tracker-default-rtdb.firebaseio.com/users/${myUsername}.json`, {
                method: 'PATCH',
                body: JSON.stringify({ last_seen: Date.now() })
            });
        };
        updateStatus();
        setInterval(updateStatus, 30000);
    }

    if (document.querySelector('.vcard-details')) {
        createOnlineDashboard(myUsername);
    }
});

function createOnlineDashboard(myUsername) {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fireMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes fireGlow { 0% { box-shadow: 0 0 5px rgba(46,164,79,0.4); } 50% { box-shadow: 0 0 15px rgba(46,164,79,0.6); } 100% { box-shadow: 0 0 5px rgba(46,164,79,0.4); } }
        .gh-fire-btn {
            background: #f6f8fa !important; color: #1f2328 !important; border: 1px solid #d0d7de !important;
            padding: 8px 16px !important; font-size: 13px !important; font-weight: 600 !important;
            border-radius: 6px !important; cursor: pointer !important;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            display: flex !important; align-items: center !important; gap: 8px !important;
            animation: fireGlow 2s infinite ease-in-out !important; outline: none !important;
        }
        .gh-fire-btn:hover {
            background: linear-gradient(-45deg, #ff0000, #ff4500, #ff8c00, #ff0000) !important;
            background-size: 400% 400% !important; color: white !important; border-color: #ff4500 !important;
            animation: fireMove 3s ease infinite !important; transform: scale(1.05) translateY(-3px) !important;
            box-shadow: 0 8px 15px rgba(255, 69, 0, 0.4) !important;
        }
        .online-dot { width: 8px; height: 8px; background: #2ea44f; border-radius: 50%; }
        .gh-fire-btn:hover .online-dot { background: #fff; box-shadow: 0 0 8px #fff; }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.className = 'gh-fire-btn';
    btn.innerHTML = `<span class="online-dot"></span> Friends Online`;
    btn.style.cssText = "position:fixed; bottom:20px; left:20px; z-index:10000;";

    const side = document.createElement('div');
    side.id = "friends-sidebar-main";
    side.style.cssText = `
        position: fixed; bottom: 75px; left: -320px; width: 280px; height: 400px; 
        background: white; border: 1px solid #d0d7de; border-radius: 12px; z-index: 9999; 
        opacity: 0; transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 12px 28px rgba(140, 149, 159, 0.3); display: flex; flex-direction: column; overflow: hidden;
    `;

    side.innerHTML = `
        <div style="padding:15px; background:#f6f8fa; border-bottom:1px solid #d0d7de; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:600; color:#1f2328; font-size:14px; font-family:sans-serif;">Live Tracker</span>
            <span id="online-count" style="background:#dafbe1; color:#1a7f37; padding:2px 10px; border-radius:12px; font-size:12px; font-weight:bold; border:1px solid rgba(27,31,35,0.1); font-family:sans-serif;">0</span>
        </div>
        <div id="friends-list" style="padding:10px; overflow-y:auto; flex:1; background:white; font-family:sans-serif;"></div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(side);

    let open = false;
    btn.onclick = () => {
        open = !open;
        side.style.left = open ? "20px" : "-320px";
        side.style.opacity = open ? "1" : "0";
        if (open) refreshFriends(myUsername);
    };
}

function refreshFriends(myUsername) {
    const list = document.getElementById('friends-list');
    const countLabel = document.getElementById('online-count');
    if (!list) return;
    fetch(`https://github-online-tracker-default-rtdb.firebaseio.com/users.json`)
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";
            let count = 0;
            const now = Date.now();

            for (let user in data) {
                const isOnline = (now - data[user].last_seen) < 45000;
                if (isOnline && user !== myUsername) {
                    count++;
                    const row = document.createElement('div');
                    row.style.cssText = "padding:10px; border-bottom:1px solid #f6f8fa; display:flex; align-items:center; cursor:pointer; border-radius:8px; transition:0.2s;";
                    row.onmouseover = () => row.style.backgroundColor = "#f6f8fa";
                    row.onmouseout = () => row.style.backgroundColor = "transparent";
                    row.onclick = () => window.open(`https://github.com/${user}`, '_blank');
                    row.innerHTML = `<span style="width:8px; height:8px; background:#2ea44f; border-radius:50%;
                    margin-right:12px; box-shadow:0 0 5px #2ea44f;"></span>
                    <b style="color:#0969da;font-size:13px;">${user}</b>`;
                    list.appendChild(row);
                }
            }
            if (countLabel) countLabel.innerText = count;
            if (count === 0) list.innerHTML = "<div style='text-align:center; padding:40px; color:gray; font-size:12px;'>No one is online </div>";
        }).catch(() => { list.innerHTML = "Error loading data"; });
}