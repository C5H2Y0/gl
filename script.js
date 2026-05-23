document.addEventListener('DOMContentLoaded', function() {
    let visitorCount = localStorage.getItem('visitorCount');
    
    const pathname = window.location.pathname;
    const isHomePage = pathname === '/' || pathname === '/index.html' || pathname.endsWith('/index.html');
    
    if (!visitorCount) {
        visitorCount = 1;
    } else if (isHomePage) {
        visitorCount = parseInt(visitorCount) + 1;
    } else {
        visitorCount = parseInt(visitorCount);
    }
    
    localStorage.setItem('visitorCount', visitorCount);
    
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        visitorCountElement.textContent = visitorCount.toLocaleString();
    }

    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');

    const searchData = [
        { title: 'Quick Start Guide', category: 'Guide', url: 'guide.html#quick-start' },
        { title: 'Combat Techniques', category: 'Guide', url: 'guide.html#combat' },
        { title: 'Leveling Guide', category: 'Guide', url: 'guide.html#leveling' },
        { title: 'Dungeon Guide', category: 'Guide', url: 'guide.html#dungeon' },
        { title: 'Arena Guide', category: 'Guide', url: 'guide.html#arena' },
        { title: 'Warrior', category: 'Character', url: 'characters.html#warrior' },
        { title: 'Mage', category: 'Character', url: 'characters.html#mage' },
        { title: 'Ranger', category: 'Character', url: 'characters.html#ranger' },
        { title: 'Assassin', category: 'Character', url: 'characters.html#assassin' },
        { title: 'Cleric', category: 'Character', url: 'characters.html#cleric' },
        { title: 'Summoner', category: 'Character', url: 'characters.html#summoner' },
        { title: 'Oasis Town', category: 'Map', url: 'maps.html#oasis' },
        { title: 'Yellow Sand Desert', category: 'Map', url: 'maps.html#desert' },
        { title: 'Flame Caves', category: 'Map', url: 'maps.html#flame' },
        { title: 'Lost Temple', category: 'Map', url: 'maps.html#temple' },
        { title: 'Greatsword', category: 'Equipment', url: 'equipment.html#greatsword' },
        { title: 'Staff', category: 'Equipment', url: 'equipment.html#staff' },
        { title: 'Longbow', category: 'Equipment', url: 'equipment.html#longbow' },
        { title: 'Daggers', category: 'Equipment', url: 'equipment.html#daggers' },
        { title: 'Sand Cave', category: 'Dungeon', url: 'guide.html#sand-cave' },
        { title: 'Blazing Abyss', category: 'Dungeon', url: 'guide.html#blazing-abyss' },
        { title: "Storm's Peak", category: 'Dungeon', url: 'guide.html#storms-peak' },
        { title: 'Crystal Depths', category: 'Dungeon', url: 'guide.html#crystal-depths' }
    ];

    function performSearch(query) {
        if (!query.trim()) {
            searchResults.classList.remove('active');
            return;
        }

        const filtered = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length > 0) {
            searchResults.innerHTML = filtered.map(item => `
                <a href="${item.url}">
                    <div class="result-title">${item.title}</div>
                    <div class="result-category">${item.category}</div>
                </a>
            `).join('');
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<a href="#" style="pointer-events: none; color: #8b7355;">No results found</a>';
            searchResults.classList.add('active');
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const feedbackToggle = document.getElementById('feedback-toggle');
    const feedbackPanel = document.getElementById('feedback-panel');
    const closeBtn = document.getElementById('close-btn');

    if (feedbackToggle && feedbackPanel) {
        feedbackToggle.addEventListener('click', function() {
            feedbackPanel.classList.toggle('active');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                feedbackPanel.classList.remove('active');
            });
        }
    }

    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.innerHTML = `
                <div class="comment-header">
                    <span class="comment-name">${name}</span>
                    <span class="comment-date">${new Date().toLocaleDateString('zh-CN')}</span>
                </div>
                <p class="comment-content">${message}</p>
            `;
            
            const commentsList = document.getElementById('comments-list');
            commentsList.insertBefore(commentItem, commentsList.firstChild);
            
            feedbackForm.reset();
            
            alert('Feedback submitted successfully! Thank you for your feedback.');
        });
    }
});

const mapSVGData = {
    oasis: {
        title: 'Oasis Town',
        level: 'Level 1-10',
        description: 'The starting point for players. A sanctuary with clear springs and palm trees in the middle of the desert.',
        svgContent: `
            <svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="oasisGround" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#e8d4a8"/>
                        <stop offset="30%" style="stop-color:#d4c494"/>
                        <stop offset="70%" style="stop-color:#c4b07a"/>
                        <stop offset="100%" style="stop-color:#b8a066"/>
                    </linearGradient>
                    <radialGradient id="oasisWater" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#5dc1d4"/>
                        <stop offset="40%" style="stop-color:#3498db"/>
                        <stop offset="100%" style="stop-color:#2980b9"/>
                    </radialGradient>
                    <radialGradient id="waterShine" cx="30%" cy="30%" r="60%">
                        <stop offset="0%" style="stop-color:rgba(255,255,255,0.4)"/>
                        <stop offset="100%" style="stop-color:rgba(255,255,255,0)"/>
                    </radialGradient>
                    <pattern id="sandPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                        <rect width="30" height="30" fill="#d4c494"/>
                        <circle cx="5" cy="5" r="1" fill="#c4b07a" opacity="0.5"/>
                        <circle cx="20" cy="15" r="1.5" fill="#b8a066" opacity="0.4"/>
                        <circle cx="10" cy="25" r="1" fill="#c4b07a" opacity="0.3"/>
                    </pattern>
                    <pattern id="roadPattern" width="40" height="10" patternUnits="userSpaceOnUse">
                        <rect width="40" height="10" fill="#8b7355"/>
                        <rect x="0" y="3" width="40" height="4" fill="#a08060"/>
                    </pattern>
                    <pattern id="stonePattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect width="20" height="20" fill="#9a9080"/>
                        <rect x="0" y="0" width="9" height="9" fill="#8a8070"/>
                        <rect x="10" y="10" width="10" height="10" fill="#8a8070"/>
                    </pattern>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.4"/>
                    </filter>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <rect width="1000" height="700" fill="url(#oasisGround)"/>
                <rect width="1000" height="700" fill="url(#sandPattern)"/>
                <path d="M0 650 Q150 620 300 640 Q450 660 600 630 Q750 600 900 640 Q950 650 1000 640" fill="#c4a460" opacity="0.4"/>
                <path d="M0 100 Q100 80 200 90 Q300 100 400 85 Q500 70 600 90 Q700 110 800 90 Q900 70 1000 85" fill="#d4b470" opacity="0.3"/>
                <ellipse cx="480" cy="380" rx="220" ry="160" fill="url(#oasisWater)" opacity="0.85"/>
                <ellipse cx="480" cy="380" rx="220" ry="160" fill="url(#waterShine)"/>
                <ellipse cx="480" cy="380" rx="190" ry="130" fill="none" stroke="#3498db" stroke-width="2" stroke-dasharray="8,4" opacity="0.5"/>
                <ellipse cx="480" cy="380" rx="160" ry="100" fill="none" stroke="#5dc1d4" stroke-width="1" stroke-dasharray="4,4" opacity="0.3"/>
                <ellipse cx="420" cy="350" rx="40" ry="20" fill="rgba(255,255,255,0.2)"/>
                <path d="M350 300 Q360 280 370 300" stroke="#5dc1d4" stroke-width="2" fill="none" opacity="0.5"/>
                <path d="M500 400 Q510 380 520 400" stroke="#5dc1d4" stroke-width="2" fill="none" opacity="0.5"/>
                <circle cx="380" cy="320" r="15" fill="#228b22"/>
                <circle cx="370" cy="310" r="12" fill="#2e8b2e"/>
                <circle cx="395" cy="335" r="10" fill="#228b22"/>
                <path d="M380 320 Q375 290 380 260" stroke="#8b4513" stroke-width="4" fill="none"/>
                <path d="M370 310 Q365 285 370 260" stroke="#6b3513" stroke-width="3" fill="none"/>
                <path d="M395 335 Q390 310 395 280" stroke="#8b4513" stroke-width="3" fill="none"/>
                <circle cx="520" cy="340" r="18" fill="#228b22"/>
                <circle cx="510" cy="330" r="14" fill="#2e8b2e"/>
                <circle cx="535" cy="355" r="12" fill="#228b22"/>
                <path d="M520 340 Q515 305 520 270" stroke="#8b4513" stroke-width="5" fill="none"/>
                <path d="M510 330 Q505 300 510 270" stroke="#6b3513" stroke-width="4" fill="none"/>
                <circle cx="450" cy="420" r="14" fill="#228b22"/>
                <circle cx="440" cy="410" r="11" fill="#2e8b2e"/>
                <circle cx="465" cy="415" r="12" fill="#228b22"/>
                <path d="M450 420 Q445 395 450 365" stroke="#8b4513" stroke-width="4" fill="none"/>
                <circle cx="580" cy="400" r="16" fill="#228b22"/>
                <circle cx="570" cy="390" r="13" fill="#2e8b2e"/>
                <circle cx="595" cy="410" r="11" fill="#228b22"/>
                <path d="M580 400 Q575 370 580 340" stroke="#8b4513" stroke-width="4" fill="none"/>
                <path d="M570 390 Q565 365 570 340" stroke="#6b3513" stroke-width="3" fill="none"/>
                <rect x="80" y="120" width="100" height="80" fill="#deb887" stroke="#8b7355" stroke-width="3" filter="url(#shadow)"/>
                <rect x="85" y="125" width="90" height="70" fill="#d2b48c"/>
                <polygon points="80,120 130,70 180,120" fill="#8b4513"/>
                <polygon points="90,120 130,80 170,120" fill="#a0522d"/>
                <rect x="110" y="150" width="40" height="50" fill="#654321"/>
                <rect x="115" y="155" width="30" height="40" fill="#4a3010"/>
                <rect x="100" y="130" width="25" height="20" fill="#87ceeb" stroke="#8b7355" stroke-width="2"/>
                <rect x="145" y="130" width="25" height="20" fill="#87ceeb" stroke="#8b7355" stroke-width="2"/>
                <text x="130" y="110" fill="#654321" font-size="11" text-anchor="middle" font-weight="bold">GENERAL STORE</text>
                <rect x="750" y="100" width="120" height="90" fill="#deb887" stroke="#8b7355" stroke-width="3" filter="url(#shadow)"/>
                <rect x="755" y="105" width="110" height="80" fill="#c4a460"/>
                <polygon points="750,100 810,50 870,100" fill="#696969"/>
                <polygon points="760,100 810,60 860,100" fill="#808080"/>
                <rect x="790" y="140" width="40" height="45" fill="#4a4a4a"/>
                <rect x="795" y="145" width="30" height="35" fill="#3a3a3a"/>
                <rect x="770" y="115" width="30" height="25" fill="#87ceeb" stroke="#696969" stroke-width="2"/>
                <rect x="820" y="115" width="30" height="25" fill="#87ceeb" stroke="#696969" stroke-width="2"/>
                <path d="M760 110 L775 95 L790 110" stroke="#8b4513" stroke-width="2" fill="none"/>
                <path d="M810 110 L825 95 L840 110" stroke="#8b4513" stroke-width="2" fill="none"/>
                <text x="810" y="80" fill="#4a4a4a" font-size="12" text-anchor="middle" font-weight="bold">WEAPON SMITH</text>
                <rect x="200" y="450" width="130" height="100" fill="#deb887" stroke="#8b7355" stroke-width="3" filter="url(#shadow)"/>
                <rect x="205" y="455" width="120" height="90" fill="#d2b48c"/>
                <polygon points="200,450 265,380 330,450" fill="#8b0000"/>
                <polygon points="210,450 265,390 320,450" fill="#a52a2a"/>
                <rect x="250" y="490" width="30" height="60" fill="#654321"/>
                <circle cx="265" cy="510" r="5" fill="#ffd700"/>
                <rect x="220" y="470" width="25" height="20" fill="#87ceeb" stroke="#8b7355" stroke-width="2"/>
                <rect x="295" y="470" width="25" height="20" fill="#87ceeb" stroke="#8b7355" stroke-width="2"/>
                <text x="265" y="440" fill="#654321" font-size="11" text-anchor="middle" font-weight="bold">HEALING TEMPLE</text>
                <rect x="650" y="480" width="140" height="110" fill="#deb887" stroke="#8b7355" stroke-width="3" filter="url(#shadow)"/>
                <rect x="655" y="485" width="130" height="100" fill="#d2b48c"/>
                <polygon points="650,480 720,400 790,480" fill="#4a4a4a"/>
                <polygon points="660,480 720,410 780,480" fill="#5a5a5a"/>
                <rect x="700" y="520" width="40" height="65" fill="#3a3a3a"/>
                <rect x="705" y="525" width="30" height="55" fill="#2a2a2a"/>
                <rect x="670" y="500" width="30" height="25" fill="#87ceeb" stroke="#5a5a5a" stroke-width="2"/>
                <rect x="750" y="500" width="30" height="25" fill="#87ceeb" stroke="#5a5a5a" stroke-width="2"/>
                <text x="720" y="465" fill="#4a4a4a" font-size="11" text-anchor="middle" font-weight="bold">GUILD HALL</text>
                <rect x="380" y="520" width="80" height="60" fill="#deb887" stroke="#8b7355" stroke-width="3" filter="url(#shadow)"/>
                <rect x="385" y="525" width="70" height="50" fill="#c4a460"/>
                <polygon points="380,520 420,480 460,520" fill="#8b7355"/>
                <rect x="405" y="545" width="30" height="35" fill="#654321"/>
                <text x="420" y="515" fill="#654321" font-size="10" text-anchor="middle" font-weight="bold">BANK</text>
                <rect x="520" y="180" width="100" height="70" fill="#deb887" stroke="#8b7355" stroke-width="3" filter="url(#shadow)"/>
                <rect x="525" y="185" width="90" height="60" fill="#d2b48c"/>
                <polygon points="520,180 570,130 620,180" fill="#228b22"/>
                <rect x="555" y="205" width="30" height="40" fill="#654321"/>
                <text x="570" y="165" fill="#654321" font-size="10" text-anchor="middle" font-weight="bold">HERBALIST</text>
                <rect x="100" y="280" width="90" height="70" fill="#deb887" stroke="#8b7355" stroke-width="3" filter="url(#shadow)"/>
                <rect x="105" y="285" width="80" height="60" fill="#d2b48c"/>
                <polygon points="100,280 145,230 190,280" fill="#8b4513"/>
                <rect x="130" y="305" width="30" height="40" fill="#654321"/>
                <rect x="110" y="295" width="20" height="18" fill="#87ceeb" stroke="#8b7355" stroke-width="1"/>
                <text x="145" y="265" fill="#654321" font-size="9" text-anchor="middle" font-weight="bold">STABLE</text>
                <rect x="800" y="280" width="80" height="60" fill="#9370db" stroke="#8b7355" stroke-width="3" filter="url(#shadow)"/>
                <rect x="805" y="285" width="70" height="50" fill="#7b68ee"/>
                <polygon points="800,280 840,250 880,280" fill="#9370db"/>
                <ellipse cx="840" cy="305" rx="20" ry="15" fill="#4b0082" opacity="0.6"/>
                <path d="M830 295 L840 280 L850 295" stroke="#ffd700" stroke-width="2" fill="none"/>
                <text x="840" y="270" fill="#4b0082" font-size="9" text-anchor="middle" font-weight="bold">PORTAL</text>
                <path d="M50 620 Q100 590 180 600 Q260 610 340 590 Q420 570 500 590 Q580 610 660 585 Q740 560 820 585 Q880 600 950 580" stroke="url(#roadPattern)" stroke-width="25" fill="none"/>
                <path d="M50 620 Q100 590 180 600 Q260 610 340 590 Q420 570 500 590 Q580 610 660 585 Q740 560 820 585 Q880 600 950 580" stroke="#a08060" stroke-width="18" fill="none"/>
                <path d="M50 620 Q100 590 180 600 Q260 610 340 590 Q420 570 500 590 Q580 610 660 585 Q740 560 820 585 Q880 600 950 580" stroke="#b09070" stroke-width="4" fill="none" stroke-dasharray="15,10"/>
                <rect x="260" y="250" width="80" height="50" fill="#ffd700" opacity="0.3" rx="5"/>
                <text x="300" y="280" fill="#8b7355" font-size="12" text-anchor="middle" font-weight="bold">TOWN SQUARE</text>
                <circle cx="700" cy="200" r="8" fill="#ffd700" stroke="#ff8c00" stroke-width="2" filter="url(#glow)"/>
                <text x="700" y="220" fill="#fff" font-size="10" text-anchor="middle">WELL</text>
                <circle cx="300" cy="500" r="25" fill="#c4a460" stroke="#8b7355" stroke-width="2"/>
                <circle cx="300" cy="500" r="15" fill="#87ceeb"/>
                <text x="300" y="540" fill="#654321" font-size="9" text-anchor="middle">FOUNTAIN</text>
                <rect x="880" y="520" width="70" height="50" fill="#deb887" stroke="#8b7355" stroke-width="2"/>
                <text x="915" y="550" fill="#654321" font-size="9" text-anchor="middle">WATCH</text>
                <circle cx="480" cy="380" r="8" fill="#ffd700" stroke="#ff8c00" stroke-width="2" filter="url(#glow)"/>
                <text x="480" y="400" fill="#fff" font-size="10" text-anchor="middle">CENTER</text>
                <rect x="30" y="30" width="60" height="40" fill="rgba(0,0,0,0.6)" rx="5"/>
                <text x="60" y="50" fill="#fff" font-size="10">N</text>
                <path d="M55 35 L60 25 L65 35" stroke="#fff" stroke-width="2" fill="#c44536"/>
                <g class="grid-lines" opacity="0.15">
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="200" x2="1000" y2="200" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="300" x2="1000" y2="300" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="400" x2="1000" y2="400" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="500" x2="1000" y2="500" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="600" x2="1000" y2="600" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="100" y1="0" x2="100" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="200" y1="0" x2="200" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="300" y1="0" x2="300" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="400" y1="0" x2="400" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="500" y1="0" x2="500" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="600" y1="0" x2="600" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="700" y1="0" x2="700" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="800" y1="0" x2="800" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="900" y1="0" x2="900" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                </g>
            </svg>
        `,
        markers: [
            { x: 20, y: 30, type: 'quest', name: 'Elder NPC', desc: 'Main quest giver - "The First Step"' },
            { x: 45, y: 25, type: 'vendor', name: 'Weapon Smith', desc: 'Sells basic weapons (Level 1-10)' },
            { x: 60, y: 40, type: 'vendor', name: 'Armor Shop', desc: 'Sells starter armor sets' },
            { x: 35, y: 55, type: 'quest', name: 'Herbalist', desc: 'Side quest: "Gathering Herbs"' },
            { x: 75, y: 35, type: 'teleport', name: 'Town Portal', desc: 'Teleport to other regions' },
            { x: 50, y: 70, type: 'treasure', name: 'Hidden Chest', desc: 'Contains: 500 Gold, Healing Potion x5' },
            { x: 25, y: 65, type: 'quest', name: 'Stable Master', desc: 'Unlock mount at Level 5' }
        ],
        info: `
            <h4>Key Locations</h4>
            <ul>
                <li><strong>Town Square:</strong> Central hub with all vendors</li>
                <li><strong>Training Grounds:</strong> Practice combat skills</li>
                <li><strong>Oasis Spring:</strong> Restore HP/MP for free</li>
                <li><strong>Guild Hall:</strong> Join or create guilds (Level 10)</li>
            </ul>
            <h4>Important NPCs</h4>
            <ul>
                <li><strong>Elder Rahman:</strong> Main story quests</li>
                <li><strong>Blacksmith Omar:</strong> Weapon crafting</li>
                <li><strong>Merchant Sara:</strong> General goods</li>
            </ul>
        `
    },
    desert: {
        title: 'Yellow Sand Desert',
        level: 'Level 10-20',
        description: 'Vast desert area with ancient ruins and dangerous creatures lurking.',
        svgContent: `
            <svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="desertGround" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#e8c872"/>
                        <stop offset="25%" style="stop-color:#d4b468"/>
                        <stop offset="50%" style="stop-color:#c4a458"/>
                        <stop offset="75%" style="stop-color:#b89448"/>
                        <stop offset="100%" style="stop-color:#a88438"/>
                    </linearGradient>
                    <linearGradient id="duneShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#8b7355" stop-opacity="0.5"/>
                        <stop offset="100%" style="stop-color:#8b7355" stop-opacity="0"/>
                    </linearGradient>
                    <pattern id="sandTexture" width="25" height="25" patternUnits="userSpaceOnUse">
                        <rect width="25" height="25" fill="#c4a458"/>
                        <circle cx="5" cy="5" r="1" fill="#b89448" opacity="0.4"/>
                        <circle cx="18" cy="12" r="1.5" fill="#d4b468" opacity="0.3"/>
                        <circle cx="8" cy="20" r="1" fill="#a88438" opacity="0.4"/>
                        <circle cx="20" cy="22" r="0.8" fill="#b89448" opacity="0.3"/>
                    </pattern>
                    <pattern id="rockPattern" width="50" height="50" patternUnits="userSpaceOnUse">
                        <circle cx="25" cy="25" r="20" fill="none" stroke="#8b7355" stroke-width="2"/>
                        <circle cx="25" cy="25" r="12" fill="#9a8575"/>
                        <circle cx="25" cy="25" r="5" fill="#7a6555"/>
                    </pattern>
                    <pattern id="ruinsPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect width="40" height="40" fill="#8b7355"/>
                        <rect x="5" y="5" width="15" height="15" fill="#7a6555"/>
                        <rect x="25" y="15" width="10" height="20" fill="#6a5545"/>
                        <rect x="5" y="25" width="20" height="10" fill="#9a8575"/>
                    </pattern>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="3" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.5"/>
                    </filter>
                    <radialGradient id="oasisWater" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#5dc1d4"/>
                        <stop offset="100%" style="stop-color:#2980b9"/>
                    </radialGradient>
                    <radialGradient id="lavaGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#ff4500"/>
                        <stop offset="100%" style="stop-color:#8b0000"/>
                    </radialGradient>
                </defs>
                <rect width="1000" height="700" fill="url(#desertGround)"/>
                <rect width="1000" height="700" fill="url(#sandTexture)"/>
                <path d="M0 80 Q150 30 300 70 Q450 110 600 60 Q750 10 900 50 Q950 65 1000 50" fill="#d4b468" opacity="0.6"/>
                <path d="M0 80 Q150 30 300 70 Q450 110 600 60 Q750 10 900 50 Q950 65 1000 50" fill="url(#duneShadow)"/>
                <path d="M0 180 Q200 120 400 160 Q600 200 800 140 Q900 110 1000 130" fill="#c4a458" opacity="0.5"/>
                <path d="M0 350 Q150 300 350 330 Q550 360 750 310 Q850 285 1000 300" fill="#b89448" opacity="0.4"/>
                <path d="M0 500 Q250 450 500 480 Q750 510 1000 460" fill="#a88438" opacity="0.5"/>
                <path d="M0 600 Q200 550 400 580 Q600 610 800 570 Q900 550 1000 560" fill="#c4a458" opacity="0.4"/>
                <path d="M0 150 Q100 130 200 150 Q300 170 400 140 Q500 110 600 150 Q700 190 800 150 Q900 110 1000 140" fill="#d4b468" opacity="0.3"/>
                <path d="M0 450 Q150 400 300 430 Q450 460 600 420 Q750 380 900 420 Q950 435 1000 420" fill="#b89448" opacity="0.3"/>
                <rect x="80" y="120" width="120" height="90" fill="#8b7355" stroke="#654321" stroke-width="3" filter="url(#shadow)"/>
                <rect x="85" y="125" width="110" height="80" fill="#7a6555"/>
                <polygon points="80,120 140,50 200,120" fill="#654321"/>
                <polygon points="90,120 140,60 190,120" fill="#7a6555"/>
                <rect x="115" y="160" width="30" height="45" fill="#4a3a2a"/>
                <rect x="155" y="160" width="30" height="45" fill="#4a3a2a"/>
                <rect x="95" y="135" width="20" height="25" fill="#4a3a2a"/>
                <rect x="175" y="135" width="20" height="25" fill="#4a3a2a"/>
                <text x="140" y="235" fill="#fff" font-size="10" text-anchor="middle">ANCIENT RUINS</text>
                <rect x="250" y="80" width="80" height="60" fill="#9a8575" stroke="#7a6555" stroke-width="2"/>
                <polygon points="250,80 290,40 330,80" fill="#8b7355"/>
                <circle cx="290" cy="110" r="8" fill="#c4a458"/>
                <text x="290" y="155" fill="#fff" font-size="9" text-anchor="middle">RUINS</text>
                <rect x="400" y="200" width="140" height="110" fill="#8b7355" stroke="#654321" stroke-width="3" filter="url(#shadow)"/>
                <rect x="405" y="205" width="130" height="100" fill="#7a6555"/>
                <polygon points="400,200 470,100 540,200" fill="#654321"/>
                <polygon points="410,200 470,110 530,200" fill="#7a6555"/>
                <rect x="450" y="250" width="40" height="55" fill="#4a3a2a"/>
                <circle cx="470" cy="230" r="15" fill="#4a3a2a"/>
                <rect x="420" y="220" width="25" height="30" fill="#4a3a2a"/>
                <rect x="495" y="220" width="25" height="30" fill="#4a3a2a"/>
                <path d="M420 220 L470 180 L520 220" stroke="#8b7355" stroke-width="2" fill="none"/>
                <text x="470" y="335" fill="#fff" font-size="11" text-anchor="middle">LOST TEMPLE</text>
                <circle cx="700" cy="180" r="70" fill="url(#oasisWater)" opacity="0.8"/>
                <ellipse cx="700" cy="180" rx="60" ry="50" fill="none" stroke="#5dc1d4" stroke-width="2"/>
                <circle cx="680" cy="165" r="12" fill="#228b22"/>
                <circle cx="670" cy="155" r="10" fill="#2e8b2e"/>
                <path d="M680 165 Q675 135 680 105" stroke="#8b4513" stroke-width="4" fill="none"/>
                <circle cx="720" cy="175" r="14" fill="#228b22"/>
                <circle cx="710" cy="165" r="11" fill="#2e8b2e"/>
                <path d="M720 175 Q715 140 720 110" stroke="#8b4513" stroke-width="4" fill="none"/>
                <circle cx="690" cy="195" r="10" fill="#228b22"/>
                <circle cx="730" cy="190" r="12" fill="#228b22"/>
                <text x="700" y="275" fill="#fff" font-size="11" text-anchor="middle">SECRET OASIS</text>
                <rect x="550" y="380" width="150" height="120" fill="#4a3020" stroke="#3a2010" stroke-width="4" filter="url(#shadow)"/>
                <rect x="555" y="385" width="140" height="110" fill="#3a2010"/>
                <polygon points="550,380 625,260 700,380" fill="#2a1000"/>
                <ellipse cx="625" cy="450" rx="40" ry="20" fill="url(#lavaGlow)" opacity="0.6"/>
                <rect x="590" y="420" width="70" height="75" fill="#1a0a00"/>
                <text x="625" y="525" fill="#ff4500" font-size="12" text-anchor="middle" font-weight="bold">FLAME CAVE</text>
                <text x="625" y="545" fill="#ffd700" font-size="10" text-anchor="middle">ENTER</text>
                <rect x="150" y="420" width="100" height="70" fill="#c4a458" stroke="#a88438" stroke-width="2"/>
                <circle cx="200" cy="455" r="20" fill="#deb887"/>
                <path d="M200 440 L200 420 M185 450 L165 440 M215 450 L235 440" stroke="#228b22" stroke-width="3"/>
                <text x="200" y="510" fill="#fff" font-size="9" text-anchor="middle">OASIS</text>
                <rect x="280" y="500" width="80" height="50" fill="#9a8575" stroke="#7a6555" stroke-width="2"/>
                <polygon points="280,500 320,470 360,500" fill="#8b7355"/>
                <text x="320" y="570" fill="#fff" font-size="9" text-anchor="middle">CAMP</text>
                <circle cx="820" cy="350" r="50" fill="#8b7355" stroke="#654321" stroke-width="2"/>
                <circle cx="820" cy="350" r="35" fill="#7a6555"/>
                <circle cx="820" cy="350" r="15" fill="#5a4535"/>
                <text x="820" cy="420" fill="#fff" font-size="10" text-anchor="middle">ROCKS</text>
                <rect x="80" y="550" width="120" height="80" fill="#deb887" stroke="#8b7355" stroke-width="3" filter="url(#shadow)"/>
                <rect x="85" y="555" width="110" height="70" fill="#d2b48c"/>
                <polygon points="80,550 140,490 200,550" fill="#8b4513"/>
                <rect x="120" y="580" width="40" height="50" fill="#654321"/>
                <text x="140" y="650" fill="#fff" font-size="10" text-anchor="middle">TRADER CAMP</text>
                <rect x="800" y="500" width="100" height="70" fill="#9a8575" stroke="#7a6555" stroke-width="2"/>
                <polygon points="800,500 850,450 900,500" fill="#8b7355"/>
                <text x="850" y="595" fill="#fff" font-size="10" text-anchor="middle">MINE</text>
                <circle cx="920" cy="200" r="30" fill="#c4a458" stroke="#a88438" stroke-width="2"/>
                <circle cx="920" cy="200" r="15" fill="#deb887"/>
                <path d="M920 185 L920 170 M905 195 L890 185 M935 195 L950 185" stroke="#8b4513" stroke-width="2"/>
                <text x="920" y="250" fill="#fff" font-size="9" text-anchor="middle">PALM</text>
                <path d="M50 350 Q100 330 180 340 Q260 350 340 330 Q420 310 500 340 Q580 370 660 340 Q740 310 820 350 Q880 375 950 350" stroke="#8b7355" stroke-width="20" fill="none" opacity="0.6"/>
                <path d="M50 350 Q100 330 180 340 Q260 350 340 330 Q420 310 500 340 Q580 370 660 340 Q740 310 820 350 Q880 375 950 350" stroke="#a08060" stroke-width="15" fill="none"/>
                <path d="M50 350 Q100 330 180 340 Q260 350 340 330 Q420 310 500 340 Q580 370 660 340 Q740 310 820 350 Q880 375 950 350" stroke="#c4a460" stroke-width="4" fill="none" stroke-dasharray="20,15"/>
                <circle cx="180" cy="340" r="8" fill="#ffd700" stroke="#ff8c00" stroke-width="2"/>
                <circle cx="500" cy="340" r="8" fill="#ffd700" stroke="#ff8c00" stroke-width="2"/>
                <circle cx="820" cy="350" r="8" fill="#ffd700" stroke="#ff8c00" stroke-width="2"/>
                <text x="500" y="320" fill="#8b7355" font-size="11" text-anchor="middle" font-weight="bold">CARAVAN ROUTE</text>
                <rect x="30" y="30" width="60" height="40" fill="rgba(0,0,0,0.6)" rx="5"/>
                <text x="60" y="50" fill="#fff" font-size="10">N</text>
                <path d="M55 35 L60 25 L65 35" stroke="#fff" stroke-width="2" fill="#c44536"/>
                <path d="M600 100 L620 90 L620 110 Z" fill="#ff4500" opacity="0.7"/>
                <path d="M750 250 L770 240 L770 260 Z" fill="#ff4500" opacity="0.7"/>
                <circle cx="610" cy="105" r="5" fill="#ff4500"/>
                <circle cx="760" cy="250" r="5" fill="#ff4500"/>
                <text x="620" y="125" fill="#ff4500" font-size="8">BOSS</text>
                <text x="780" y="275" fill="#ff4500" font-size="8">BOSS</text>
                <g class="grid-lines" opacity="0.12">
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="200" x2="1000" y2="200" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="300" x2="1000" y2="300" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="400" x2="1000" y2="400" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="500" x2="1000" y2="500" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="0" y1="600" x2="1000" y2="600" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="100" y1="0" x2="100" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="200" y1="0" x2="200" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="300" y1="0" x2="300" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="400" y1="0" x2="400" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="500" y1="0" x2="500" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="600" y1="0" x2="600" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="700" y1="0" x2="700" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="800" y1="0" x2="800" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                    <line x1="900" y1="0" x2="900" y2="700" stroke="#8b7355" stroke-width="0.5"/>
                </g>
            </svg>
        `,
        markers: [
            { x: 15, y: 20, type: 'dungeon', name: 'Sand Cave', desc: 'Level 15+ Dungeon - Drops Green Gear' },
            { x: 40, y: 35, type: 'quest', name: 'Archaeologist Camp', desc: 'Quest: "Ancient Artifacts"' },
            { x: 70, y: 25, type: 'boss', name: 'Sand Worm', desc: 'World Boss - Spawns every 6 hours' },
            { x: 55, y: 50, type: 'treasure', name: 'Buried Treasure', desc: 'Requires: Treasure Map' },
            { x: 30, y: 60, type: 'quest', name: 'Caravan Leader', desc: 'Quest: "Escort Mission"' },
            { x: 80, y: 45, type: 'dungeon', name: 'Ruins Entrance', desc: 'Secret dungeon entrance' },
            { x: 20, y: 75, type: 'vendor', name: 'Wandering Merchant', desc: 'Sells rare items - Appears randomly' }
        ],
        info: `
            <h4>Danger Zones</h4>
            <ul>
                <li><strong>Quicksand Pits:</strong> Instant death - avoid at all costs</li>
                <li><strong>Mirage Fields:</strong> Causes confusion status</li>
                <li><strong>Scorpion Nests:</strong> High density of aggressive mobs</li>
            </ul>
            <h4>Resource Nodes</h4>
            <ul>
                <li><strong>Iron Ore:</strong> Northern region</li>
                <li><strong>Desert Herbs:</strong> Near oasis spots</li>
                <li><strong>Ancient Relics:</strong> Ruins area</li>
            </ul>
        `
    },
    flame: {
        title: 'Flame Caves',
        level: 'Level 20-30',
        description: 'Underground caves filled with lava and fire elements. Location of high-level dungeons.',
        svgContent: `
            <svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lavaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#ff6347"/>
                        <stop offset="30%" style="stop-color:#ff4500"/>
                        <stop offset="70%" style="stop-color:#dc143c"/>
                        <stop offset="100%" style="stop-color:#8b0000"/>
                    </linearGradient>
                    <linearGradient id="rockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#5a5a5a"/>
                        <stop offset="50%" style="stop-color:#3a3a3a"/>
                        <stop offset="100%" style="stop-color:#2a2a2a"/>
                    </linearGradient>
                    <linearGradient id="caveWall" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#4a4a4a"/>
                        <stop offset="100%" style="stop-color:#2a2a2a"/>
                    </linearGradient>
                    <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#ffff00"/>
                        <stop offset="50%" style="stop-color:#ff8c00"/>
                        <stop offset="100%" style="stop-color:#ff4500"/>
                    </radialGradient>
                    <radialGradient id="magmaGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#ff6347"/>
                        <stop offset="100%" style="stop-color:#8b0000"/>
                    </radialGradient>
                    <pattern id="rockTexture" width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect width="40" height="40" fill="#4a4a4a"/>
                        <rect x="5" y="5" width="15" height="15" fill="#3a3a3a"/>
                        <rect x="25" y="20" width="10" height="15" fill="#5a5a5a"/>
                        <rect x="10" y="25" width="20" height="10" fill="#2a2a2a"/>
                    </pattern>
                    <pattern id="lavaFlow" width="60" height="20" patternUnits="userSpaceOnUse">
                        <ellipse cx="30" cy="10" rx="25" ry="8" fill="#ff4500" opacity="0.6"/>
                        <ellipse cx="30" cy="10" rx="15" ry="5" fill="#ffff00" opacity="0.4"/>
                    </pattern>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.6"/>
                    </filter>
                </defs>
                <rect width="1000" height="700" fill="url(#rockGradient)"/>
                <rect width="1000" height="700" fill="url(#rockTexture)" opacity="0.5"/>
                <path d="M0 0 Q100 150 0 300" stroke="#3a3a3a" stroke-width="40" fill="none"/>
                <path d="M1000 0 Q900 150 1000 300" stroke="#3a3a3a" stroke-width="40" fill="none"/>
                <path d="M0 400 Q150 350 300 400 Q450 450 600 400 Q750 350 900 400 Q950 420 1000 400" fill="url(#lavaGradient)" opacity="0.9"/>
                <path d="M0 400 Q150 350 300 400 Q450 450 600 400 Q750 350 900 400 Q950 420 1000 400" fill="url(#lavaFlow)" opacity="0.5"/>
                <ellipse cx="150" cy="450" rx="80" ry="25" fill="#ff4500" filter="url(#glow)"/>
                <ellipse cx="150" cy="450" rx="50" ry="15" fill="#ffff00" opacity="0.6"/>
                <ellipse cx="400" cy="480" rx="120" ry="35" fill="#ff4500" filter="url(#glow)"/>
                <ellipse cx="400" cy="480" rx="80" ry="20" fill="#ffff00" opacity="0.5"/>
                <ellipse cx="650" cy="460" rx="100" ry="30" fill="#ff4500" filter="url(#glow)"/>
                <ellipse cx="650" cy="460" rx="60" ry="18" fill="#ffff00" opacity="0.5"/>
                <ellipse cx="850" cy="440" rx="70" ry="22" fill="#ff4500" filter="url(#glow)"/>
                <ellipse cx="850" cy="440" rx="40" ry="12" fill="#ffff00" opacity="0.4"/>
                <rect x="80" y="80" width="180" height="140" fill="#1a1a1a" stroke="#ff4500" stroke-width="3" filter="url(#shadow)"/>
                <rect x="85" y="85" width="170" height="130" fill="#0a0a0a"/>
                <polygon points="80,80 170,20 260,80" fill="#2f2f2f" stroke="#ff4500" stroke-width="2"/>
                <rect x="130" y="130" width="80" height="70" fill="#050505"/>
                <polygon points="130,130 170,90 210,130" fill="#ff4500" opacity="0.3"/>
                <circle cx="170" cy="130" r="20" fill="url(#fireGlow)" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
                </circle>
                <text x="170" y="220" fill="#ff4500" font-size="12" text-anchor="middle" font-weight="bold">BOSS CHAMBER</text>
                <text x="170" y="240" fill="#ffd700" font-size="10" text-anchor="middle">Fire Lord Lair</text>
                <rect x="380" y="150" width="240" height="180" fill="#1a1a1a" stroke="#ff6347" stroke-width="3" filter="url(#shadow)"/>
                <rect x="385" y="155" width="230" height="170" fill="#0a0a0a"/>
                <polygon points="380,150 500,50 620,150" fill="#2f2f2f" stroke="#ff6347" stroke-width="2"/>
                <rect x="450" y="200" width="100" height="100" fill="#050505"/>
                <polygon points="450,200 500,150 550,200" fill="#ff6347" opacity="0.2"/>
                <path d="M470 280 L480 250 L490 280 L500 240 L510 280 L520 250 L530 280" stroke="#ff4500" stroke-width="2" fill="none">
                    <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite"/>
                </path>
                <circle cx="500" cy="250" r="25" fill="url(#fireGlow)" filter="url(#glow)"/>
                <text x="500" y="355" fill="#ff6347" font-size="12" text-anchor="middle" font-weight="bold">MAIN HALL</text>
                <text x="500" y="375" fill="#ffd700" font-size="10" text-anchor="middle">Central Chamber</text>
                <rect x="720" y="60" width="180" height="130" fill="#1a1a1a" stroke="#ffd700" stroke-width="3" filter="url(#shadow)"/>
                <rect x="725" y="65" width="170" height="120" fill="#0a0a0a"/>
                <polygon points="720,60 810,0 900,60" fill="#2f2f2f" stroke="#ffd700" stroke-width="2"/>
                <rect x="770" y="100" width="80" height="60" fill="#050505"/>
                <rect x="780" y="110" width="60" height="40" fill="#1a1a00"/>
                <circle cx="810" cy="130" r="15" fill="#ffd700" filter="url(#glow)"/>
                <text x="810" y="210" fill="#ffd700" font-size="12" text-anchor="middle" font-weight="bold">TREASURE VAULT</text>
                <text x="810" y="230" fill="#ffa500" font-size="10" text-anchor="middle">Rare Drops</text>
                <rect x="100" y="320" width="120" height="90" fill="#1a1a1a" stroke="#ff4500" stroke-width="2" filter="url(#shadow)"/>
                <rect x="105" y="325" width="110" height="80" fill="#0a0a0a"/>
                <text x="160" y="370" fill="#ff4500" font-size="11" text-anchor="middle">VENDOR</text>
                <text x="160" y="390" fill="#ffa500" font-size="9" text-anchor="middle">Potions & Gear</text>
                <rect x="600" y="280" width="140" height="100" fill="#1a1a1a" stroke="#ff6347" stroke-width="2" filter="url(#shadow)"/>
                <rect x="605" y="285" width="130" height="90" fill="#0a0a0a"/>
                <text x="670" y="335" fill="#ff6347" font-size="11" text-anchor="middle">CRYSTAL</text>
                <text x="670" y="355" fill="#ff6347" font-size="11" text-anchor="middle">CAVERN</text>
                <circle cx="670" cy="330" r="12" fill="#ff00ff" filter="url(#glow)"/>
                <rect x="300" y="400" width="80" height="60" fill="#1a1a1a" stroke="#ff4500" stroke-width="2"/>
                <text x="340" y="435" fill="#ff4500" font-size="10" text-anchor="middle">CHECKPOINT</text>
                <rect x="780" y="350" width="100" height="80" fill="#1a1a1a" stroke="#ff8c00" stroke-width="2" filter="url(#shadow)"/>
                <text x="830" y="395" fill="#ff8c00" font-size="10" text-anchor="middle">FORGE</text>
                <text x="830" y="415" fill="#ffd700" font-size="9" text-anchor="middle">Crafting</text>
                <path d="M500 330 L500 400" stroke="#ff4500" stroke-width="6" stroke-dasharray="15,10">
                    <animate attributeName="stroke-dashoffset" values="0;25" dur="1s" repeatCount="indefinite"/>
                </path>
                <circle cx="500" cy="365" r="30" fill="url(#fireGlow)" filter="url(#glow)">
                    <animate attributeName="r" values="30;35;30" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                <text x="500" y="350" fill="#fff" font-size="10" text-anchor="middle" font-weight="bold">HOT</text>
                <text x="500" y="365" fill="#fff" font-size="10" text-anchor="middle" font-weight="bold">SPOT</text>
                <path d="M260 180 L380 150" stroke="#ff4500" stroke-width="4" stroke-dasharray="10,5" opacity="0.6"/>
                <path d="M620 240 L720 190" stroke="#ff4500" stroke-width="4" stroke-dasharray="10,5" opacity="0.6"/>
                <path d="M170 220 L170 320" stroke="#ff4500" stroke-width="4" stroke-dasharray="10,5" opacity="0.6"/>
                <path d="M830 140 L830 350" stroke="#ff4500" stroke-width="4" stroke-dasharray="10,5" opacity="0.6"/>
                <rect x="30" y="30" width="60" height="40" fill="rgba(0,0,0,0.6)" rx="5"/>
                <text x="60" y="50" fill="#fff" font-size="10">N</text>
                <path d="M55 35 L60 25 L65 35" stroke="#fff" stroke-width="2" fill="#c44536"/>
                <circle cx="900" cy="500" r="40" fill="url(#magmaGlow)" filter="url(#glow)"/>
                <circle cx="900" cy="500" r="25" fill="#ff4500"/>
                <circle cx="900" cy="500" r="12" fill="#ffff00"/>
                <text x="900" y="560" fill="#ff4500" font-size="10" text-anchor="middle">MAGMA</text>
                <text x="900" y="575" fill="#ff4500" font-size="10" text-anchor="middle">CORE</text>
                <g class="grid-lines" opacity="0.15">
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="0" y1="200" x2="1000" y2="200" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="0" y1="300" x2="1000" y2="300" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="0" y1="400" x2="1000" y2="400" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="0" y1="500" x2="1000" y2="500" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="0" y1="600" x2="1000" y2="600" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="100" y1="0" x2="100" y2="700" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="200" y1="0" x2="200" y2="700" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="300" y1="0" x2="300" y2="700" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="400" y1="0" x2="400" y2="700" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="500" y1="0" x2="500" y2="700" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="600" y1="0" x2="600" y2="700" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="700" y1="0" x2="700" y2="700" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="800" y1="0" x2="800" y2="700" stroke="#ff4500" stroke-width="0.5"/>
                    <line x1="900" y1="0" x2="900" y2="700" stroke="#ff4500" stroke-width="0.5"/>
                </g>
            </svg>
        `,
        markers: [
            { x: 25, y: 30, type: 'dungeon', name: 'Blazing Abyss', desc: 'Level 25+ Dungeon - Drops Blue Gear' },
            { x: 50, y: 20, type: 'boss', name: 'Fire Elemental Lord', desc: 'World Boss - Spawns every 4 hours' },
            { x: 70, y: 45, type: 'treasure', name: 'Magma Chest', desc: 'Contains: Fire Resistance Ring' },
            { x: 35, y: 60, type: 'quest', name: 'Flame Guardian', desc: 'Quest: "Trial of Fire"' },
            { x: 60, y: 70, type: 'teleport', name: 'Lava Bridge', desc: 'Shortcut to deeper caves' },
            { x: 15, y: 50, type: 'vendor', name: 'Fire Resistance Potions', desc: 'Essential for survival' }
        ],
        info: `
            <h4>Survival Tips</h4>
            <ul>
                <li><strong>Fire Resistance:</strong> Minimum 50% required</li>
                <li><strong>Lava Pools:</strong> Deal 500 damage per second</li>
                <li><strong>Heat Stroke:</strong> Use cooling potions</li>
            </ul>
            <h4>Notable Areas</h4>
            <ul>
                <li><strong>Magma Chamber:</strong> Boss spawn location</li>
                <li><strong>Crystal Caverns:</strong> Rare fire crystals</li>
                <li><strong>Forgotten Forge:</strong> Legendary weapon crafting</li>
            </ul>
        `
    },
    temple: {
        title: 'Lost Temple',
        level: 'Level 30-40',
        description: 'Ancient temple from a lost civilization. Contains great treasures and unknown dangers.',
        svgContent: `
            <svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="stoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#6a6a6a"/>
                        <stop offset="30%" style="stop-color:#808080"/>
                        <stop offset="70%" style="stop-color:#5a5a5a"/>
                        <stop offset="100%" style="stop-color:#4a4a4a"/>
                    </linearGradient>
                    <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#5a5a5a"/>
                        <stop offset="100%" style="stop-color:#3a3a3a"/>
                    </linearGradient>
                    <pattern id="brickPattern" width="50" height="25" patternUnits="userSpaceOnUse">
                        <rect width="50" height="25" fill="#5a5a5a"/>
                        <rect x="0" y="0" width="48" height="23" fill="#6a6a6a"/>
                        <rect x="25" y="12" width="48" height="23" fill="#6a6a6a"/>
                    </pattern>
                    <pattern id="floorPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect width="40" height="40" fill="#4a4a4a"/>
                        <rect x="0" y="0" width="19" height="19" fill="#5a5a5a"/>
                        <rect x="20" y="20" width="20" height="20" fill="#5a5a5a"/>
                    </pattern>
                    <pattern id="runePattern" width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="15" cy="15" r="10" fill="none" stroke="#9a30ff" stroke-width="2"/>
                        <circle cx="15" cy="15" r="5" fill="#9a30ff" opacity="0.5"/>
                    </pattern>
                    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#ffd700"/>
                        <stop offset="100%" style="stop-color:#b8860b"/>
                    </radialGradient>
                    <radialGradient id="spiritGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#9a30ff"/>
                        <stop offset="100%" style="stop-color:#4b0082"/>
                    </radialGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="3" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.6"/>
                    </filter>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <rect width="1000" height="700" fill="#2a2a2a"/>
                <rect width="1000" height="700" fill="url(#brickPattern)"/>
                <rect width="1000" height="700" fill="url(#floorPattern)" opacity="0.3"/>
                <rect x="150" y="80" width="700" height="540" fill="#3a3a3a" stroke="#808080" stroke-width="4"/>
                <polygon points="150,80 500,20 850,80" fill="#4a4a4a" stroke="#808080" stroke-width="3"/>
                <rect x="420" y="100" width="160" height="180" fill="#1a1a1a" stroke="#ffd700" stroke-width="3" filter="url(#shadow)"/>
                <polygon points="420,100 500,50 580,100" fill="#3a3a3a" stroke="#ffd700" stroke-width="2"/>
                <rect x="450" y="150" width="100" height="100" fill="#0a0a0a"/>
                <circle cx="500" cy="200" r="30" fill="url(#goldGlow)" filter="url(#glow)"/>
                <circle cx="500" cy="200" r="20" fill="#ffd700" opacity="0.6"/>
                <text x="500" y="300" fill="#ffd700" font-size="14" text-anchor="middle" font-weight="bold">MAIN ENTRANCE</text>
                <text x="500" y="320" fill="#b8860b" font-size="10" text-anchor="middle">Grand Hall</text>
                <rect x="80" y="180" width="120" height="160" fill="#2a2a2a" stroke="#808080" stroke-width="2" filter="url(#shadow)"/>
                <rect x="85" y="185" width="110" height="150" fill="#1a1a1a"/>
                <polygon points="80,180 140,120 200,180" fill="#3a3a3a" stroke="#808080" stroke-width="2"/>
                <rect x="110" y="230" width="60" height="80" fill="#0a0a0a"/>
                <text x="140" y="360" fill="#808080" font-size="12" text-anchor="middle" font-weight="bold">WING A</text>
                <text x="140" y="380" fill="#6a6a6a" font-size="9" text-anchor="middle">Western Hall</text>
                <rect x="800" y="180" width="120" height="160" fill="#2a2a2a" stroke="#808080" stroke-width="2" filter="url(#shadow)"/>
                <rect x="805" y="185" width="110" height="150" fill="#1a1a1a"/>
                <polygon points="800,180 860,120 920,180" fill="#3a3a3a" stroke="#808080" stroke-width="2"/>
                <rect x="830" y="230" width="60" height="80" fill="#0a0a0a"/>
                <text x="860" y="360" fill="#808080" font-size="12" text-anchor="middle" font-weight="bold">WING B</text>
                <text x="860" y="380" fill="#6a6a6a" font-size="9" text-anchor="middle">Eastern Hall</text>
                <rect x="350" y="380" width="300" height="200" fill="#2a2a2a" stroke="#ffd700" stroke-width="3" filter="url(#shadow)"/>
                <rect x="355" y="385" width="290" height="190" fill="#1a1a1a"/>
                <polygon points="350,380 500,300 650,380" fill="#3a3a3a" stroke="#ffd700" stroke-width="2"/>
                <rect x="430" y="440" width="140" height="110" fill="#0a0a0a"/>
                <circle cx="500" cy="480" r="35" fill="url(#goldGlow)" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="500" cy="480" r="20" fill="#ffd700"/>
                <text x="500" y="600" fill="#ffd700" font-size="14" text-anchor="middle" font-weight="bold">BOSS CHAMBER</text>
                <text x="500" y="620" fill="#b8860b" font-size="10" text-anchor="middle">Temple Guardian</text>
                <rect x="80" y="450" width="140" height="110" fill="#1a3a1a" stroke="#00ff00" stroke-width="3" filter="url(#shadow)"/>
                <rect x="85" y="455" width="130" height="100" fill="#0a1a0a"/>
                <polygon points="80,450 150,400 220,450" fill="#2a4a2a" stroke="#00ff00" stroke-width="2"/>
                <circle cx="150" cy="500" r="20" fill="#00ff00" opacity="0.3"/>
                <text x="150" y="580" fill="#00ff00" font-size="12" text-anchor="middle" font-weight="bold">SAFE ZONE</text>
                <text x="150" y="600" fill="#00aa00" font-size="9" text-anchor="middle">Healing Shrine</text>
                <rect x="780" y="450" width="140" height="110" fill="#3a1a1a" stroke="#ff0000" stroke-width="3" filter="url(#shadow)"/>
                <rect x="785" y="455" width="130" height="100" fill="#1a0a0a"/>
                <polygon points="780,450 850,400 920,450" fill="#4a2a2a" stroke="#ff0000" stroke-width="2"/>
                <path d="M820 480 L850 510 L880 480 L850 450 Z" fill="#ff0000" opacity="0.5"/>
                <text x="850" y="580" fill="#ff0000" font-size="12" text-anchor="middle" font-weight="bold">TRAP ZONE</text>
                <text x="850" y="600" fill="#aa0000" font-size="9" text-anchor="middle">Dart Traps</text>
                <rect x="200" y="550" width="600" height="80" fill="#2a2a2a" stroke="#ffd700" stroke-width="2"/>
                <line x1="250" y1="590" x2="750" y2="590" stroke="#ffd700" stroke-width="3" stroke-dasharray="15,10"/>
                <circle cx="300" cy="590" r="15" fill="url(#runePattern)"/>
                <circle cx="500" cy="590" r="15" fill="url(#runePattern)"/>
                <circle cx="700" cy="590" r="15" fill="url(#runePattern)"/>
                <text x="500" y="650" fill="#ffd700" font-size="13" text-anchor="middle" font-weight="bold">HALL OF TRIALS</text>
                <circle cx="250" cy="250" r="20" fill="url(#spiritGlow)" filter="url(#glow)"/>
                <text x="250" y="290" fill="#9a30ff" font-size="11" text-anchor="middle">RUNE 1</text>
                <circle cx="750" cy="250" r="20" fill="url(#spiritGlow)" filter="url(#glow)"/>
                <text x="750" y="290" fill="#9a30ff" font-size="11" text-anchor="middle">RUNE 2</text>
                <circle cx="500" cy="320" r="20" fill="url(#spiritGlow)" filter="url(#glow)"/>
                <text x="500" y="360" fill="#9a30ff" font-size="11" text-anchor="middle">RUNE 3</text>
                <path d="M250 270 L250 320 Q500 380 500 340" stroke="#9a30ff" stroke-width="2" stroke-dasharray="5,5" fill="none" opacity="0.6"/>
                <path d="M750 270 L750 320 Q500 380 500 340" stroke="#9a30ff" stroke-width="2" stroke-dasharray="5,5" fill="none" opacity="0.6"/>
                <rect x="280" y="150" width="80" height="60" fill="#2a2a2a" stroke="#9a30ff" stroke-width="2"/>
                <text x="320" y="185" fill="#9a30ff" font-size="10" text-anchor="middle">PUZZLE</text>
                <rect x="640" y="150" width="80" height="60" fill="#2a2a2a" stroke="#9a30ff" stroke-width="2"/>
                <text x="680" y="185" fill="#9a30ff" font-size="10" text-anchor="middle">PUZZLE</text>
                <rect x="450" y="250" width="100" height="80" fill="#2a2a2a" stroke="#808080" stroke-width="2"/>
                <text x="500" y="295" fill="#808080" font-size="10" text-anchor="middle">LIBRARY</text>
                <rect x="30" y="30" width="60" height="40" fill="rgba(0,0,0,0.6)" rx="5"/>
                <text x="60" y="50" fill="#fff" font-size="10">N</text>
                <path d="M55 35 L60 25 L65 35" stroke="#fff" stroke-width="2" fill="#c44536"/>
                <rect x="900" y="80" width="70" height="50" fill="#1a1a1a" stroke="#ffd700" stroke-width="2"/>
                <text x="935" y="110" fill="#ffd700" font-size="9" text-anchor="middle">VAULT</text>
                <rect x="50" y="80" width="70" height="50" fill="#1a1a1a" stroke="#ffd700" stroke-width="2"/>
                <text x="85" y="110" fill="#ffd700" font-size="9" text-anchor="middle">VAULT</text>
                <g class="grid-lines" opacity="0.12">
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="0" y1="200" x2="1000" y2="200" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="0" y1="300" x2="1000" y2="300" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="0" y1="400" x2="1000" y2="400" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="0" y1="500" x2="1000" y2="500" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="0" y1="600" x2="1000" y2="600" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="100" y1="0" x2="100" y2="700" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="200" y1="0" x2="200" y2="700" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="300" y1="0" x2="300" y2="700" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="400" y1="0" x2="400" y2="700" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="500" y1="0" x2="500" y2="700" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="600" y1="0" x2="600" y2="700" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="700" y1="0" x2="700" y2="700" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="800" y1="0" x2="800" y2="700" stroke="#ffd700" stroke-width="0.5"/>
                    <line x1="900" y1="0" x2="900" y2="700" stroke="#ffd700" stroke-width="0.5"/>
                </g>
            </svg>
        `,
        markers: [
            { x: 30, y: 25, type: 'dungeon', name: 'Temple Depths', desc: 'Level 35+ Dungeon - 6 Player Raid' },
            { x: 50, y: 40, type: 'boss', name: 'Temple Guardian', desc: 'World Boss - Spawns every 3 hours' },
            { x: 70, y: 30, type: 'treasure', name: 'Ancient Vault', desc: 'Requires: 3 Temple Keys' },
            { x: 20, y: 55, type: 'quest', name: 'Temple Scholar', desc: 'Quest: "Deciphering Runes"' },
            { x: 60, y: 65, type: 'teleport', name: 'Portal Chamber', desc: 'Teleport between temple wings' },
            { x: 40, y: 70, type: 'treasure', name: 'Hidden Library', desc: 'Contains: Skill Books' }
        ],
        info: `
            <h4>Temple Sections</h4>
            <ul>
                <li><strong>Hall of Trials:</strong> Combat challenges</li>
                <li><strong>Sanctuary:</strong> Safe zone with healing shrine</li>
                <li><strong>Treasure Vaults:</strong> Multiple hidden chests</li>
            </ul>
            <h4>Puzzle Mechanics</h4>
            <ul>
                <li><strong>Rune Stones:</strong> Activate in correct order</li>
                <li><strong>Pressure Plates:</strong> Requires 2+ players</li>
                <li><strong>Hidden Doors:</strong> Look for wall cracks</li>
            </ul>
        `
    },
    storm: {
        title: 'Storm Sea',
        level: 'Level 40-50',
        description: 'Dangerous area shrouded in sandstorms. Home to powerful storm elementals.',
        svgContent: `
            <svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="stormSky" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#0a0a1a"/>
                        <stop offset="30%" style="stop-color:#1a1a2e"/>
                        <stop offset="70%" style="stop-color:#16213e"/>
                        <stop offset="100%" style="stop-color:#0f0f1a"/>
                    </linearGradient>
                    <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#1a1a3e"/>
                        <stop offset="100%" style="stop-color:#0a0a2e"/>
                    </linearGradient>
                    <pattern id="cloudPattern" width="120" height="60" patternUnits="userSpaceOnUse">
                        <ellipse cx="60" cy="30" rx="50" ry="25" fill="#2a2a4a" opacity="0.5"/>
                        <ellipse cx="35" cy="35" rx="30" ry="18" fill="#3a3a5a" opacity="0.4"/>
                        <ellipse cx="85" cy="25" rx="35" ry="20" fill="#3a3a5a" opacity="0.4"/>
                    </pattern>
                    <pattern id="wavePattern" width="100" height="30" patternUnits="userSpaceOnUse">
                        <path d="M0 15 Q25 5 50 15 Q75 25 100 15" stroke="#4169e1" stroke-width="2" fill="none"/>
                    </pattern>
                    <pattern id="stormPattern" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M20 0 L25 20 L40 15 L30 30 L50 35 L30 45 L45 60 L20 50 L25 70 L10 55 L0 70 L5 50 L-10 55 L10 45 L0 35 L20 30 L10 15 Z" fill="#3a3a5a" opacity="0.3"/>
                    </pattern>
                    <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#4169e1"/>
                        <stop offset="100%" style="stop-color:#1a1a3e"/>
                    </radialGradient>
                    <radialGradient id="lightningGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#ffff00"/>
                        <stop offset="100%" style="stop-color:#ff8c00"/>
                    </radialGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="3" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.6"/>
                    </filter>
                </defs>
                <rect width="1000" height="700" fill="url(#stormSky)"/>
                <rect width="1000" height="700" fill="url(#cloudPattern)" opacity="0.7"/>
                <rect width="1000" height="700" fill="url(#stormPattern)"/>
                <rect x="0" y="450" width="1000" height="250" fill="url(#seaGradient)" opacity="0.9"/>
                <rect x="0" y="450" width="1000" height="250" fill="url(#wavePattern)" opacity="0.5"/>
                <path d="M0 480 Q100 460 200 480 Q300 500 400 480 Q500 460 600 480 Q700 500 800 480 Q900 460 1000 480" stroke="#4169e1" stroke-width="3" fill="none" opacity="0.4"/>
                <path d="M0 520 Q100 500 200 520 Q300 540 400 520 Q500 500 600 520 Q700 540 800 520 Q900 500 1000 520" stroke="#4169e1" stroke-width="2" fill="none" opacity="0.3"/>
                <path d="M100 100 L130 180 L160 100 L190 180 L220 100" stroke="#ffff00" stroke-width="4" fill="none">
                    <animate attributeName="opacity" values="1;0.2;1" dur="0.4s" repeatCount="indefinite"/>
                </path>
                <path d="M300 60 L330 140 L360 60 L390 140 L420 60" stroke="#ffff00" stroke-width="4" fill="none">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="0.5s" repeatCount="indefinite"/>
                </path>
                <path d="M550 120 L580 200 L610 120 L640 200 L670 120" stroke="#ffff00" stroke-width="4" fill="none">
                    <animate attributeName="opacity" values="1;0.4;1" dur="0.6s" repeatCount="indefinite"/>
                </path>
                <path d="M750 80 L780 160 L810 80 L840 160 L870 80" stroke="#ffff00" stroke-width="4" fill="none">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite"/>
                </path>
                <circle cx="115" cy="150" r="8" fill="#ffff00" filter="url(#glow)">
                    <animate attributeName="opacity" values="1;0.3;1" dur="0.3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="360" cy="110" r="8" fill="#ffff00" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="0.4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="610" cy="170" r="8" fill="#ffff00" filter="url(#glow)">
                    <animate attributeName="opacity" values="1;0.5;1" dur="0.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="810" cy="130" r="8" fill="#ffff00" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="0.35s" repeatCount="indefinite"/>
                </circle>
                <rect x="220" y="220" width="180" height="130" fill="#1a1a3e" stroke="#4169e1" stroke-width="3" filter="url(#shadow)"/>
                <rect x="225" y="225" width="170" height="120" fill="#0a0a1e"/>
                <polygon points="220,220 310,140 400,220" fill="#2a2a4e" stroke="#4169e1" stroke-width="2"/>
                <circle cx="310" cy="285" r="25" fill="url(#lightningGlow)" filter="url(#glow)">
                    <animate attributeName="r" values="25;30;25" dur="1s" repeatCount="indefinite"/>
                </circle>
                <text x="310" y="370" fill="#4169e1" font-size="14" text-anchor="middle" font-weight="bold">BOSS ARENA</text>
                <text x="310" y="390" fill="#6a6a9e" font-size="10" text-anchor="middle">Storm Lord Lair</text>
                <rect x="550" y="180" width="140" height="110" fill="#1a1a3e" stroke="#00ffff" stroke-width="3" filter="url(#shadow)"/>
                <rect x="555" y="185" width="130" height="100" fill="#0a0a1e"/>
                <polygon points="550,180 620,120 690,180" fill="#2a2a4e" stroke="#00ffff" stroke-width="2"/>
                <text x="620" y="240" fill="#00ffff" font-size="12" text-anchor="middle">STORM</text>
                <text x="620" y="260" fill="#00ffff" font-size="12" text-anchor="middle">GEAR</text>
                <text x="620" y="310" fill="#6a9a9e" font-size="10" text-anchor="middle">Vendor</text>
                <rect x="50" y="480" width="160" height="120" fill="#1a1a3e" stroke="#00ff00" stroke-width="3" filter="url(#shadow)"/>
                <rect x="55" y="485" width="150" height="110" fill="#0a1a0e"/>
                <polygon points="50,480 130,400 210,480" fill="#2a2a4e" stroke="#00ff00" stroke-width="2"/>
                <text x="130" y="540" fill="#00ff00" font-size="12" text-anchor="middle" font-weight="bold">SAFE HARBOR</text>
                <text x="130" y="560" fill="#00aa00" font-size="10" text-anchor="middle">Rest & Respawn</text>
                <circle cx="480" cy="520" r="80" fill="url(#eyeGlow)" opacity="0.4"/>
                <circle cx="480" cy="520" r="60" fill="url(#eyeGlow)" opacity="0.5"/>
                <circle cx="480" cy="520" r="40" fill="url(#eyeGlow)" opacity="0.6"/>
                <circle cx="480" cy="520" r="25" fill="#4169e1"/>
                <text x="480" y="620" fill="#fff" font-size="13" text-anchor="middle" font-weight="bold">STORM EYE</text>
                <text x="480" y="640" fill="#aaa" font-size="10" text-anchor="middle">Safe Zone</text>
                <rect x="700" y="480" width="140" height="110" fill="#1a1a3e" stroke="#ffd700" stroke-width="3" filter="url(#shadow)"/>
                <rect x="705" y="485" width="130" height="100" fill="#1a1a0e"/>
                <polygon points="700,480 770,400 840,480" fill="#2a2a1e" stroke="#ffd700" stroke-width="2"/>
                <circle cx="770" cy="530" r="20" fill="#ffd700" filter="url(#glow)"/>
                <text x="770" y="610" fill="#ffd700" font-size="12" text-anchor="middle" font-weight="bold">TREASURE ISLAND</text>
                <text x="770" y="630" fill="#b8860b" font-size="10" text-anchor="middle">Rare Drops</text>
                <rect x="350" y="580" width="120" height="80" fill="#1a1a3e" stroke="#4169e1" stroke-width="2" filter="url(#shadow)"/>
                <text x="410" y="625" fill="#4169e1" font-size="11" text-anchor="middle">PORTAL</text>
                <text x="410" y="645" fill="#6a6a9e" font-size="9" text-anchor="middle">To Other Regions</text>
                <rect x="800" y="280" width="120" height="90" fill="#1a1a3e" stroke="#8800ff" stroke-width="2" filter="url(#shadow)"/>
                <text x="860" y="330" fill="#8800ff" font-size="11" text-anchor="middle">WIND</text>
                <text x="860" y="350" fill="#8800ff" font-size="11" text-anchor="middle">GATE</text>
                <rect x="100" y="320" width="100" height="80" fill="#1a1a3e" stroke="#ff00ff" stroke-width="2" filter="url(#shadow)"/>
                <text x="150" y="365" fill="#ff00ff" font-size="11" text-anchor="middle">DUNGEON</text>
                <text x="150" y="385" fill="#aa00aa" font-size="9" text-anchor="middle">Storm's Peak</text>
                <path d="M310 350 L310 480" stroke="#4169e1" stroke-width="4" stroke-dasharray="10,5" opacity="0.5"/>
                <path d="M620 290 L700 480" stroke="#00ffff" stroke-width="3" stroke-dasharray="8,4" opacity="0.4"/>
                <path d="M770 400 L480 520" stroke="#ffd700" stroke-width="3" stroke-dasharray="8,4" opacity="0.4"/>
                <rect x="30" y="30" width="60" height="40" fill="rgba(0,0,0,0.6)" rx="5"/>
                <text x="60" y="50" fill="#fff" font-size="10">N</text>
                <path d="M55 35 L60 25 L65 35" stroke="#fff" stroke-width="2" fill="#c44536"/>
                <g class="grid-lines" opacity="0.1">
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="0" y1="200" x2="1000" y2="200" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="0" y1="300" x2="1000" y2="300" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="0" y1="400" x2="1000" y2="400" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="0" y1="500" x2="1000" y2="500" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="0" y1="600" x2="1000" y2="600" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="100" y1="0" x2="100" y2="700" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="200" y1="0" x2="200" y2="700" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="300" y1="0" x2="300" y2="700" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="400" y1="0" x2="400" y2="700" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="500" y1="0" x2="500" y2="700" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="600" y1="0" x2="600" y2="700" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="700" y1="0" x2="700" y2="700" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="800" y1="0" x2="800" y2="700" stroke="#4169e1" stroke-width="0.5"/>
                    <line x1="900" y1="0" x2="900" y2="700" stroke="#4169e1" stroke-width="0.5"/>
                </g>
            </svg>
        `,
        markers: [
            { x: 25, y: 35, type: 'dungeon', name: "Storm's Peak", desc: 'Level 45+ Raid - Drops Purple Gear' },
            { x: 55, y: 25, type: 'boss', name: 'Storm Lord', desc: 'World Boss - Spawns every 2 hours' },
            { x: 75, y: 50, type: 'treasure', name: 'Storm Chest', desc: 'Contains: Legendary Storm Essence' },
            { x: 40, y: 60, type: 'quest', name: 'Storm Chaser', desc: 'Quest: "Eye of the Storm"' },
            { x: 20, y: 70, type: 'teleport', name: 'Wind Gate', desc: 'Fast travel to safe zones' },
            { x: 65, y: 40, type: 'vendor', name: 'Storm Gear Vendor', desc: 'Sells storm-resistant equipment' }
        ],
        info: `
            <h4>Weather Effects</h4>
            <ul>
                <li><strong>Sandstorms:</strong> -50% visibility, -30% movement</li>
                <li><strong>Lightning:</strong> Random strikes - 1000 damage</li>
                <li><strong>Wind Gusts:</strong> Can push players off cliffs</li>
            </ul>
            <h4>Strategy Tips</h4>
            <ul>
                <li><strong>Storm Eye:</strong> Safe zone during storms</li>
                <li><strong>Lightning Rods:</strong> Use to redirect strikes</li>
                <li><strong>Wind Shields:</strong> Essential equipment</li>
            </ul>
        `
    },
    crystal: {
        title: 'Crystal Desert',
        level: 'Level 50+',
        description: 'Rich in crystal resources. Main source of rare crafting materials.',
        svgContent: `
            <svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="crystalGround" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#2a0050"/>
                        <stop offset="30%" style="stop-color:#4a0080"/>
                        <stop offset="70%" style="stop-color:#6a0dad"/>
                        <stop offset="100%" style="stop-color:#3a0060"/>
                    </linearGradient>
                    <linearGradient id="crystalGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#ff00ff"/>
                        <stop offset="50%" style="stop-color:#aa00ff"/>
                        <stop offset="100%" style="stop-color:#8000ff"/>
                    </linearGradient>
                    <linearGradient id="fireGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#ff4444"/>
                        <stop offset="100%" style="stop-color:#ff8c00"/>
                    </linearGradient>
                    <linearGradient id="iceGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#00ffff"/>
                        <stop offset="100%" style="stop-color:#0088ff"/>
                    </linearGradient>
                    <pattern id="crystalPattern" width="80" height="80" patternUnits="userSpaceOnUse">
                        <polygon points="40,5 50,35 80,40 50,45 40,75 30,45 0,40 30,35" fill="#9a30ff" opacity="0.2"/>
                        <polygon points="60,20 68,40 88,45 68,50 60,70 52,50 32,45 52,40" fill="#aa00ff" opacity="0.15"/>
                    </pattern>
                    <pattern id="sandPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="#8000ff" opacity="0.3"/>
                        <circle cx="30" cy="30" r="1.5" fill="#9a30ff" opacity="0.4"/>
                        <circle cx="20" cy="5" r="0.8" fill="#aa00ff" opacity="0.3"/>
                        <circle cx="5" cy="25" r="1.2" fill="#8000ff" opacity="0.2"/>
                    </pattern>
                    <radialGradient id="primalGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#ffff00"/>
                        <stop offset="50%" style="stop-color:#ff8c00"/>
                        <stop offset="100%" style="stop-color:#ff4500"/>
                    </radialGradient>
                    <radialGradient id="dragonGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#ff8c00"/>
                        <stop offset="100%" style="stop-color:#ff4500"/>
                    </radialGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="3" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.6"/>
                    </filter>
                </defs>
                <rect width="1000" height="700" fill="url(#crystalGround)"/>
                <rect width="1000" height="700" fill="url(#crystalPattern)"/>
                <rect width="1000" height="700" fill="url(#sandPattern)"/>
                <polygon points="150,500 180,320 210,500" fill="url(#crystalGlow)" opacity="0.9">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
                </polygon>
                <polygon points="280,520 320,280 360,520" fill="url(#crystalGlow)" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite"/>
                </polygon>
                <polygon points="520,480 560,260 600,480" fill="url(#fireGlow)" opacity="0.85">
                    <animate attributeName="opacity" values="0.85;1;0.85" dur="1.8s" repeatCount="indefinite"/>
                </polygon>
                <polygon points="700,500 740,320 780,500" fill="url(#crystalGlow)" opacity="0.75">
                    <animate attributeName="opacity" values="0.75;0.95;0.75" dur="2.2s" repeatCount="indefinite"/>
                </polygon>
                <polygon points="850,510 880,380 910,510" fill="url(#crystalGlow)" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2.8s" repeatCount="indefinite"/>
                </polygon>
                <polygon points="380,550 410,450 440,550" fill="url(#iceGlow)" opacity="0.6"/>
                <polygon points="480,540 515,420 550,540" fill="url(#iceGlow)" opacity="0.5"/>
                <polygon points="620,530 650,440 680,530" fill="url(#iceGlow)" opacity="0.6"/>
                <polygon points="750,560 780,470 810,560" fill="url(#iceGlow)" opacity="0.55"/>
                <polygon points="60,450 85,360 110,450" fill="url(#fireGlow)" opacity="0.5"/>
                <polygon points="920,460 945,370 970,460" fill="url(#fireGlow)" opacity="0.55"/>
                <rect x="100" y="150" width="180" height="150" fill="#1a0030" stroke="#ff00ff" stroke-width="4" filter="url(#shadow)"/>
                <rect x="105" y="155" width="170" height="140" fill="#0a0015"/>
                <polygon points="100,150 190,60 280,150" fill="#2a0050" stroke="#ff00ff" stroke-width="3"/>
                <circle cx="190" cy="225" r="25" fill="url(#primalGlow)" filter="url(#glow)">
                    <animate attributeName="r" values="25;32;25" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                <text x="190" y="320" fill="#ff00ff" font-size="14" text-anchor="middle" font-weight="bold">BOSS LAIR</text>
                <text x="190" y="340" fill="#aa00aa" font-size="10" text-anchor="middle">Crystal Guardian</text>
                <rect x="580" y="160" width="160" height="130" fill="#1a0030" stroke="#ffd700" stroke-width="4" filter="url(#shadow)"/>
                <rect x="585" y="165" width="150" height="120" fill="#1a1500"/>
                <polygon points="580,160 660,60 740,160" fill="#2a2000" stroke="#ffd700" stroke-width="3"/>
                <circle cx="660" cy="220" r="20" fill="#ffd700" filter="url(#glow)"/>
                <text x="660" y="310" fill="#ffd700" font-size="13" text-anchor="middle" font-weight="bold">TREASURE VAULT</text>
                <text x="660" y="330" fill="#b8860b" font-size="10" text-anchor="middle">Legendary Materials</text>
                <rect x="300" y="280" width="140" height="110" fill="#1a0030" stroke="#8000ff" stroke-width="3" filter="url(#shadow)"/>
                <rect x="305" y="285" width="130" height="100" fill="#0a0015"/>
                <polygon points="300,280 370,200 440,280" fill="#200040" stroke="#8000ff" stroke-width="2"/>
                <text x="370" y="340" fill="#8000ff" font-size="13" text-anchor="middle" font-weight="bold">CRYSTAL FORGE</text>
                <text x="370" y="360" fill="#6000aa" font-size="9" text-anchor="middle">Crafting Station</text>
                <rect x="680" y="400" width="130" height="100" fill="#1a0030" stroke="#00ffff" stroke-width="3" filter="url(#shadow)"/>
                <rect x="685" y="405" width="120" height="90" fill="#001520"/>
                <polygon points="680,400 745,320 810,400" fill="#002030" stroke="#00ffff" stroke-width="2"/>
                <text x="745" y="465" fill="#00ffff" font-size="12" text-anchor="middle" font-weight="bold">CRYSTAL MERCHANT</text>
                <text x="745" y="485" fill="#0088aa" font-size="9" text-anchor="middle">Trade Materials</text>
                <rect x="80" y="520" width="180" height="100" fill="#1a0030" stroke="#ff00ff" stroke-width="3" filter="url(#shadow)"/>
                <rect x="85" y="525" width="170" height="90" fill="#0a0015"/>
                <text x="170" y="570" fill="#ff00ff" font-size="12" text-anchor="middle" font-weight="bold">DUNGEON ENTRANCE</text>
                <text x="170" y="590" fill="#aa00aa" font-size="9" text-anchor="middle">Crystal Depths</text>
                <circle cx="830" cy="450" r="60" fill="url(#dragonGlow)" opacity="0.4"/>
                <circle cx="830" cy="450" r="45" fill="url(#dragonGlow)" opacity="0.5"/>
                <circle cx="830" cy="450" r="30" fill="url(#dragonGlow)" opacity="0.6"/>
                <circle cx="830" cy="450" r="20" fill="#ff8c00" filter="url(#glow)">
                    <animate attributeName="r" values="20;25;20" dur="1.2s" repeatCount="indefinite"/>
                </circle>
                <text x="830" y="530" fill="#ff8c00" font-size="13" text-anchor="middle" font-weight="bold">ANCIENT DRAGON</text>
                <text x="830" y="550" fill="#aa5500" font-size="9" text-anchor="middle">Legendary Boss</text>
                <rect x="430" y="400" width="120" height="90" fill="#1a0030" stroke="#ffff00" stroke-width="2" filter="url(#shadow)"/>
                <text x="490" y="450" fill="#ffff00" font-size="11" text-anchor="middle">PORTAL</text>
                <text x="490" y="470" fill="#aaaa00" font-size="9" text-anchor="middle">Endgame Content</text>
                <rect x="50" y="50" width="60" height="40" fill="rgba(0,0,0,0.6)" rx="5"/>
                <text x="80" y="70" fill="#fff" font-size="10">N</text>
                <path d="M75 55 L80 45 L85 55" stroke="#fff" stroke-width="2" fill="#c44536"/>
                <polygon points="230,400 245,350 260,400" fill="url(#crystalGlow)" opacity="0.6"/>
                <polygon points="780,380 795,330 810,380" fill="url(#crystalGlow)" opacity="0.65"/>
                <polygon points="450,480 470,400 490,480" fill="url(#fireGlow)" opacity="0.5"/>
                <polygon points="560,470 580,390 600,470" fill="url(#fireGlow)" opacity="0.55"/>
                <path d="M190 300 L370 340" stroke="#ff00ff" stroke-width="3" stroke-dasharray="10,5" opacity="0.4"/>
                <path d="M660 290 L490 340" stroke="#ffd700" stroke-width="3" stroke-dasharray="8,4" opacity="0.4"/>
                <path d="M830 390 L660 380" stroke="#ff8c00" stroke-width="3" stroke-dasharray="8,4" opacity="0.4"/>
                <g class="grid-lines" opacity="0.12">
                    <line x1="0" y1="100" x2="1000" y2="100" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="0" y1="200" x2="1000" y2="200" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="0" y1="300" x2="1000" y2="300" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="0" y1="400" x2="1000" y2="400" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="0" y1="500" x2="1000" y2="500" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="0" y1="600" x2="1000" y2="600" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="100" y1="0" x2="100" y2="700" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="200" y1="0" x2="200" y2="700" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="300" y1="0" x2="300" y2="700" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="400" y1="0" x2="400" y2="700" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="500" y1="0" x2="500" y2="700" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="600" y1="0" x2="600" y2="700" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="700" y1="0" x2="700" y2="700" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="800" y1="0" x2="800" y2="700" stroke="#ff00ff" stroke-width="0.5"/>
                    <line x1="900" y1="0" x2="900" y2="700" stroke="#ff00ff" stroke-width="0.5"/>
                </g>
            </svg>
        `,
        markers: [
            { x: 30, y: 20, type: 'dungeon', name: 'Crystal Depths', desc: 'Level 50+ Dungeon - Drops Orange Gear' },
            { x: 60, y: 35, type: 'boss', name: 'Crystal Guardian', desc: 'World Boss - Spawns every 4 hours' },
            { x: 45, y: 55, type: 'treasure', name: 'Primal Crystal Cache', desc: 'Contains: Legendary Materials' },
            { x: 75, y: 25, type: 'quest', name: 'Crystal Collector', desc: 'Quest: "Rare Crystals"' },
            { x: 20, y: 60, type: 'vendor', name: 'Crystal Merchant', desc: 'Trades crystals for gear' },
            { x: 50, y: 75, type: 'teleport', name: 'Crystal Gate', desc: 'Portal to endgame content' },
            { x: 85, y: 45, type: 'boss', name: 'Ancient Crystal Dragon', desc: 'Legendary Boss - Weekly spawn' }
        ],
        info: `
            <h4>Crystal Types</h4>
            <ul>
                <li><strong>Fire Crystals:</strong> Used for weapon enhancement</li>
                <li><strong>Ice Crystals:</strong> Used for armor crafting</li>
                <li><strong>Primal Crystals:</strong> Legendary material - rare drop</li>
            </ul>
            <h4>Endgame Content</h4>
            <ul>
                <li><strong>Crystal Depths:</strong> Hardest dungeon</li>
                <li><strong>Dragon Lair:</strong> Legendary boss</li>
                <li><strong>Ancient Forge:</strong> Craft mythic gear</li>
            </ul>
        `
    }
};

const mapData = mapSVGData;

function openMapModal(mapId) {
    const modal = document.getElementById('map-modal');
    const map = mapData[mapId];
    
    if (!modal || !map) return;
    
    document.getElementById('map-modal-title').textContent = map.title;
    document.getElementById('map-info-title').textContent = `${map.title} - ${map.level}`;
    document.getElementById('map-info-content').innerHTML = map.info;
    
    const canvas = document.getElementById('map-canvas');
    canvas.innerHTML = '';
    
    if (map.svgContent) {
        canvas.innerHTML = map.svgContent;
        const svg = canvas.querySelector('svg');
        if (svg) {
            svg.style.width = '100%';
            svg.style.height = '100%';
        }
    } else {
        const mapBackground = document.createElement('div');
        mapBackground.className = 'map-background';
        mapBackground.style.background = getMapBackground(mapId);
        canvas.appendChild(mapBackground);
    }
    
    map.markers.forEach(marker => {
        const markerEl = document.createElement('div');
        markerEl.className = `map-marker marker-${marker.type}`;
        markerEl.style.left = `${marker.x}%`;
        markerEl.style.top = `${marker.y}%`;
        markerEl.setAttribute('data-name', marker.name);
        markerEl.setAttribute('data-desc', marker.desc);
        
        markerEl.addEventListener('mouseenter', function(e) {
            showMarkerTooltip(e, marker);
        });
        
        markerEl.addEventListener('mouseleave', function() {
            hideMarkerTooltip();
        });
        
        canvas.appendChild(markerEl);
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeMapModal() {
    const modal = document.getElementById('map-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function getMapBackground(mapId) {
    const backgrounds = {
        oasis: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #2d5a27 100%)',
        desert: 'linear-gradient(135deg, #c2a878 0%, #d4b896 50%, #c2a878 100%)',
        flame: 'linear-gradient(135deg, #8b0000 0%, #ff4500 50%, #8b0000 100%)',
        temple: 'linear-gradient(135deg, #4a4a4a 0%, #6b6b6b 50%, #4a4a4a 100%)',
        storm: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
        crystal: 'linear-gradient(135deg, #4a0080 0%, #8000ff 50%, #4a0080 100%)'
    };
    return backgrounds[mapId] || backgrounds.desert;
}

function showMarkerTooltip(e, marker) {
    let tooltip = document.getElementById('marker-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'marker-tooltip';
        tooltip.className = 'marker-tooltip';
        document.body.appendChild(tooltip);
    }
    
    tooltip.innerHTML = `
        <div class="tooltip-title">${marker.name}</div>
        <div class="tooltip-desc">${marker.desc}</div>
    `;
    
    tooltip.style.display = 'block';
    tooltip.style.left = `${e.pageX + 15}px`;
    tooltip.style.top = `${e.pageY + 15}px`;
}

function hideMarkerTooltip() {
    const tooltip = document.getElementById('marker-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('map-modal');
    if (event.target === modal) {
        closeMapModal();
    }
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMapModal();
    }
});