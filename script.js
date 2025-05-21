document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        bgLayer1: document.getElementById('q-background-layer1'),
        bgLayer3Glitch: document.getElementById('q-background-layer3-glitch'),
        newsTickerContent: document.getElementById('q-news-ticker-content'),
        f1Zone: document.getElementById('q-fighter1-zone'),
        f1Card: document.getElementById('q-fighter1-card'),
        f1CardEmoji: document.querySelector('#q-fighter1-card .q-card-emoji-placeholder'),
        f1CardName: document.querySelector('#q-fighter1-card .q-card-name-placeholder'),
        f1CardElement: document.querySelector('#q-fighter1-card .q-card-element-placeholder'),
        f1Pod: document.getElementById('q-fighter1-pod'),
        f1Emoji: document.getElementById('q-fighter1-emoji'),
        f1Name: document.getElementById('q-fighter1-name'),
        f1Cry: document.getElementById('q-fighter1-cry'),
        f1ElementTag: document.getElementById('q-fighter1-element'),
        f1Field: document.getElementById('q-fighter1-field'),
        f1EnergyBar: document.getElementById('q-fighter1-energy-bar'),
        f2Zone: document.getElementById('q-fighter2-zone'),
        f2Card: document.getElementById('q-fighter2-card'),
        f2CardEmoji: document.querySelector('#q-fighter2-card .q-card-emoji-placeholder'),
        f2CardName: document.querySelector('#q-fighter2-card .q-card-name-placeholder'),
        f2CardElement: document.querySelector('#q-fighter2-card .q-card-element-placeholder'),
        f2Pod: document.getElementById('q-fighter2-pod'),
        f2Emoji: document.getElementById('q-fighter2-emoji'),
        f2Name: document.getElementById('q-fighter2-name'),
        f2Cry: document.getElementById('q-fighter2-cry'),
        f2ElementTag: document.getElementById('q-fighter2-element'),
        f2Field: document.getElementById('q-fighter2-field'),
        f2EnergyBar: document.getElementById('q-fighter2-energy-bar'),
        vsText: document.getElementById('q-vs-text'),
        clashEffectContainer: document.getElementById('q-clash-effect-container'),
        resultText: document.getElementById('q-result-text'),
        engageButton: document.getElementById('q-engage-button'),
        nextClashButton: document.getElementById('q-next-clash-button'),
    };

    const CONFIG = {
        SURGE_CHARGE_PER_ROUND: 34,
        SURGE_ACTIVATION_CHANCE: 0.30,
        ELEMENTAL_ADVANTAGE_BIAS: 0.70,
        PARTICLE_COUNT_CLASH: 25,
        PARTICLE_COUNT_SURGE: 40,
        TICKER_UPDATE_INTERVAL: 7000,
        CARD_REVEAL_DURATION: 1500,
        POD_REVEAL_DELAY_AFTER_CARD: 300,
    };

    const Q_ELEMENTS = {
        VOID: { name: 'VOID', symbol: '∅', color: 'var(--element-q-void)', fieldColor: 'rgba(140,0,255,0.3)' },
        MATRIX: { name: 'MATRIX', symbol: '∑', color: 'var(--element-q-matrix)', fieldColor: 'rgba(26,255,140,0.3)' },
        PHOTON: { name: 'PHOTON', symbol: '💡', color: 'var(--element-q-photon)', fieldColor: 'rgba(255,240,42,0.3)' },
        QFIRE: { name: 'Q-FIRE', symbol: '🔥', color: 'var(--element-q-fire)', fieldColor: 'rgba(255,72,0,0.3)' },
        CRYO: { name: 'CRYO', symbol: '❄️', color: 'var(--element-q-water)', fieldColor: 'rgba(0,184,255,0.3)' },
    };

    const Q_AFFINITIES = {
        [Q_ELEMENTS.VOID.name]: Q_ELEMENTS.MATRIX.name,
        [Q_ELEMENTS.MATRIX.name]: Q_ELEMENTS.PHOTON.name,
        [Q_ELEMENTS.PHOTON.name]: Q_ELEMENTS.CRYO.name,
        [Q_ELEMENTS.CRYO.name]: Q_ELEMENTS.QFIRE.name,
        [Q_ELEMENTS.QFIRE.name]: Q_ELEMENTS.VOID.name,
    };

    const Q_EMOJIS = [
        { id: 'qe01', emoji: '🌀', name: 'Void Spinner', element: Q_ELEMENTS.VOID, cries: ["Into the singularity!", "Event horizon nears!", "Unmake!"] , surgeMove: "ENTROPIC CASCADE"},
        { id: 'qe02', emoji: '💾', name: 'Data Weaver', element: Q_ELEMENTS.MATRIX, cries: ["Code is law!", "Executing algorithm!", "Reality recompiled!"] , surgeMove: "LOGIC BOMB OVERDRIVE"},
        { id: 'qe03', emoji: '💡', name: 'Photon Pulsar', element: Q_ELEMENTS.PHOTON, cries: ["Blinded by science!", "Light speed barrage!", "Spectrum overload!"] , surgeMove: "GAMMA RAY BURST"},
        { id: 'qe04', emoji: '🔥', name: 'Quasar Inferno', element: Q_ELEMENTS.QFIRE, cries: ["Incinerate!", "Stellar ignition!", "Nova's fury!"] , surgeMove: "SUPERNOVA ERUPTION"},
        { id: 'qe05', emoji: '❄️', name: 'Absolute Zero', element: Q_ELEMENTS.CRYO, cries: ["Freeze reality!", "Glacial prison!", "Entropy's chill!"] , surgeMove: "TIME CRYSTAL SHATTER"},
        { id: 'qe06', emoji: '🌌', name: 'Cosmic Drifter', element: Q_ELEMENTS.VOID, cries: ["Lost in the echoes...", "Beyond comprehension.", "Silent fall."] , surgeMove: "NEBULOUS SHROUD"},
        { id: 'qe07', emoji: '⚙️', name: 'Logic Core', element: Q_ELEMENTS.MATRIX, cries: ["Efficiency dictates.", "Processing...", "Optimized assault."] , surgeMove: "SYSTEM KERNEL PANIC"},
        { id: 'qe08', emoji: '✨', name: 'Stardust Oracle', element: Q_ELEMENTS.PHOTON, cries: ["The stars foretold this!", "Luminous prophecy!", "Shine forth!"] , surgeMove: "CELESTIAL CONVERGENCE"},
        { id: 'qe09', emoji: '🌠', name: 'Meteor God', element: Q_ELEMENTS.QFIRE, cries: ["Impact imminent!", "Cosmic rain of fire!", "From the heavens!"] , surgeMove: "PLANETARY DESTRUCTION"},
        { id: 'qe10', emoji: '🧊', name: 'Cryo Sentinel', element: Q_ELEMENTS.CRYO, cries: ["Stillness commands.", "Frozen heart.", "Winter's grasp."] , surgeMove: "PERMAFROST DOMINION"},
    ];
     const Q_TICKER_MESSAGES = [
        "Quantum fluctuations detected in Sector 7G...", "Recalibrating entanglement matrix...",
        "Energy signatures spiking! Prepare for trans-dimensional entities.", "Probability fields stabilizing...",
        "Warning: Chroniton particle surge imminent!", "Spectator drones online. Broadcasting to all known universes.",
        "Place your hyper-credits! This next clash will be electrifying!", "Remember: All realities are subjective. Enjoy the paradox!",
        "Is this real? Or just a highly advanced simulation? Does it matter?", "The laws of physics are merely suggestions in this arena.",
        "Entanglement successful. Awaiting combatant designation.", "Reality shards reforming. Arena protocols active.",
        "Creatd by Bismaya the Great. Powered by Quantum Energy.", "Quantum Surge: The ultimate test of skill and strategy.",
    ];
    const Q_RESULT_VERBS_NORMAL = ["outplays", "disassembles", "nullifies", "destabilizes", "reconfigures", "overwhelms"];
    const Q_RESULT_VERBS_SURGE = ["ANNIHILATES", "PULVERIZES", "OBLITERATES", "ERADICATES", "UNMAKES", "DOMINATES WITH QUANTUM FURY"];


    let fighter1, fighter2;
    let f1Energy = 0, f2Energy = 0;
    let gamePhase = 'INITIALIZING';
    let tickerInterval;

    function playSound(soundId) {}
    function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function animateTextByChar(element, text, charDelay = 30, onComplete = null) {
        if (!element) { console.error("animateTextByChar: Target element is null"); return; }
        element.innerHTML = '';
        let i = 0;
        function addChar() {
            if (i < text.length) {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = text[i];
                span.style.animationDelay = `${i * (charDelay / 1000)}s`;
                element.appendChild(span);
                i++;
                setTimeout(addChar, charDelay);
            } else if (onComplete) {
                onComplete();
            }
        }
        addChar();
    }

    function updateNewsTicker() {
        const message = randomChoice(Q_TICKER_MESSAGES);
        const duplicatedMessage = `${message} ♦♢♦ ${message} ♦♢♦ ${message} ♦♢♦ `;
        elements.newsTickerContent.textContent = duplicatedMessage;
    }
    function createParticleBurst(container, count, colors, sizeRange, durationRange) {
        if (!container) return;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'q-particle';
            const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = randomChoice(colors);

            const angle = Math.random() * 360;
            const distance = Math.random() * 100 + 30;
            const tx = Math.cos(angle * Math.PI / 180) * distance + 'px';
            const ty = Math.sin(angle * Math.PI / 180) * distance + 'px';

            const duration = (Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0]);

            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);
            particle.style.animation = `qParticleBurst ${duration / 1000}s ease-out forwards`;

            container.appendChild(particle);
            setTimeout(() => particle.remove(), duration);
        }
    }

    function resetUI() {
        if (elements.f1Card) {
            [elements.f1Card, elements.f2Card].forEach(card => {
                if (!card) return;
                card.classList.remove('active', 'dismissed');
                const emojiPlaceholder = card.querySelector('.q-card-emoji-placeholder');
                const namePlaceholder = card.querySelector('.q-card-name-placeholder');
                const elementPlaceholder = card.querySelector('.q-card-element-placeholder');
                if (emojiPlaceholder) emojiPlaceholder.textContent = '?';
                if (namePlaceholder) namePlaceholder.textContent = 'ID UNKNOWN';
                if (elementPlaceholder) elementPlaceholder.textContent = 'ELEMENT: ???';
            });
        }
        [elements.f1Pod, elements.f2Pod].forEach(pod => pod && pod.classList.remove('visible', 'winner', 'loser', 'quantum-surging', 'attacking'));
        [elements.f1Emoji, elements.f2Emoji].forEach(el => { if(el) { el.className = 'q-emoji'; el.textContent = '❓'; }});
        [elements.f1Name, elements.f2Name].forEach(el => el && (el.textContent = 'Awaiting Entity...'));
        [elements.f1Cry, elements.f2Cry].forEach(el => el && (el.textContent = '"..."'));
        [elements.f1ElementTag, elements.f2ElementTag].forEach(el => { if(el) { el.textContent = 'ERR'; el.className = 'q-element-tag'; }});
        [elements.f1Field, elements.f2Field].forEach(el => { if(el) { el.style.boxShadow = 'none'; el.style.opacity = '0'; }});

        if (elements.vsText) elements.vsText.classList.remove('visible');
        if (elements.clashEffectContainer) elements.clashEffectContainer.innerHTML = '';
        if (elements.resultText) {
            elements.resultText.classList.remove('visible', 'winner', 'loser');
            elements.resultText.innerHTML = 'Initializing Quantum Field...';
        }

        f1Energy = 0; f2Energy = 0;
        if (elements.f1EnergyBar) updateEnergyBar(elements.f1EnergyBar, f1Energy);
        if (elements.f2EnergyBar) updateEnergyBar(elements.f2EnergyBar, f2Energy);

        playSound('ui_reset');
    }

    function updateEnergyBar(barElement, energy) {
        if (!barElement) return;
        energy = Math.min(100, Math.max(0, energy));
        barElement.style.width = `${energy}%`;
        if (energy >= 100) barElement.classList.add('surged');
        else barElement.classList.remove('surged');
    }

    function displayFighterData(fighterData, cardEl, cardEmojiEl, cardNameEl, cardElementEl, podEl, emojiEl, nameEl, cryEl, elementTagEl, fieldEl) {
        if (!cardEl || !podEl) return;

        if (cardEmojiEl) cardEmojiEl.textContent = fighterData.emoji;
        if (cardNameEl) cardNameEl.textContent = fighterData.name;
        if (cardElementEl) cardElementEl.textContent = `ELEMENT: ${fighterData.element.name}`;
        cardEl.classList.remove('dismissed');
        cardEl.classList.add('active');
        playSound('card_reveal');

        setTimeout(() => {
            cardEl.classList.remove('active');
            cardEl.classList.add('dismissed');

            setTimeout(() => {
                podEl.classList.add('visible');
                if (emojiEl) emojiEl.textContent = fighterData.emoji;
                if (nameEl) nameEl.textContent = fighterData.name;
                if (cryEl) cryEl.textContent = `"${randomChoice(fighterData.cries)}"`;
                if (elementTagEl) {
                    elementTagEl.textContent = fighterData.element.symbol;
                    elementTagEl.className = 'q-element-tag';
                    const elementNameClean = fighterData.element.name.toLowerCase().replace('-', '');
                    elementTagEl.classList.add(`element-q-${elementNameClean}`);
                }
                if (fieldEl) {
                    fieldEl.style.boxShadow = `0 0 25px 8px ${fighterData.element.fieldColor}, inset 0 0 15px ${fighterData.element.fieldColor}`;
                    fieldEl.style.opacity = '1';
                }
                playSound('fighter_materialize');
            }, CONFIG.POD_REVEAL_DELAY_AFTER_CARD);

        }, CONFIG.CARD_REVEAL_DURATION);
    }

    function initializeSequence() {
        gamePhase = 'READY_TO_SUMMON';
        resetUI();
        updateNewsTicker();
        if (!tickerInterval) {
            tickerInterval = setInterval(updateNewsTicker, CONFIG.TICKER_UPDATE_INTERVAL);
        }

        if (elements.resultText) {
            animateTextByChar(elements.resultText, "Press 'SUMMON ENTITIES' to begin.", 40);
            elements.resultText.classList.add('visible');
        }

        if (elements.engageButton) {
            elements.engageButton.textContent = 'SUMMON ENTITIES';
            elements.engageButton.disabled = false;
            elements.engageButton.style.display = 'inline-block';
        }
        if (elements.nextClashButton) {
            elements.nextClashButton.style.display = 'none';
        }
        playSound('app_initialize');
    }

    function summonEntities() {
        if (gamePhase !== 'READY_TO_SUMMON') return;
        gamePhase = 'SUMMONING';
        if(elements.engageButton) elements.engageButton.disabled = true;
        if(elements.resultText) elements.resultText.classList.remove('visible');
        
        [elements.f1Card, elements.f2Card].forEach(card => card && card.classList.remove('active', 'dismissed'));
        [elements.f1Pod, elements.f2Pod].forEach(pod => pod && pod.classList.remove('visible', 'winner', 'loser', 'quantum-surging', 'attacking'));
        [elements.f1Field, elements.f2Field].forEach(el => { if(el) { el.style.boxShadow = 'none'; el.style.opacity = '0'; }});
        if(elements.vsText) elements.vsText.classList.remove('visible');


        let index1 = Math.floor(Math.random() * Q_EMOJIS.length);
        let index2;
        do { index2 = Math.floor(Math.random() * Q_EMOJIS.length); } while (index1 === index2);
        fighter1 = Q_EMOJIS[index1];
        fighter2 = Q_EMOJIS[index2];

        displayFighterData(fighter1, elements.f1Card, elements.f1CardEmoji, elements.f1CardName, elements.f1CardElement, elements.f1Pod, elements.f1Emoji, elements.f1Name, elements.f1Cry, elements.f1ElementTag, elements.f1Field);
        setTimeout(() => {
            displayFighterData(fighter2, elements.f2Card, elements.f2CardEmoji, elements.f2CardName, elements.f2CardElement, elements.f2Pod, elements.f2Emoji, elements.f2Name, elements.f2Cry, elements.f2ElementTag, elements.f2Field);
        }, 500);

        const totalSummonTime = CONFIG.CARD_REVEAL_DURATION + CONFIG.POD_REVEAL_DELAY_AFTER_CARD + 500 + 200;
        setTimeout(() => {
            if(elements.vsText) elements.vsText.classList.add('visible');
            if(elements.resultText) {
                animateTextByChar(elements.resultText, "Entities locked. Prepare for Quantum Entanglement!", 30);
                elements.resultText.classList.add('visible');
            }
            if(elements.engageButton) {
                elements.engageButton.textContent = 'ENGAGE CLASH';
                elements.engageButton.disabled = false;
            }
            gamePhase = 'FIGHTERS_SUMMONED';
            playSound('vs_appear');
        }, totalSummonTime);
    }

    function engageClash() {
        if (gamePhase !== 'FIGHTERS_SUMMONED' || !fighter1 || !fighter2) return;
        gamePhase = 'CLASHING';
        if(elements.engageButton) elements.engageButton.disabled = true;
        if(elements.resultText) elements.resultText.classList.remove('visible');
        playSound('clash_start');

        if (f1Energy < 100) f1Energy += CONFIG.SURGE_CHARGE_PER_ROUND;
        if (f2Energy < 100) f2Energy += CONFIG.SURGE_CHARGE_PER_ROUND;
        if(elements.f1EnergyBar) updateEnergyBar(elements.f1EnergyBar, f1Energy);
        if(elements.f2EnergyBar) updateEnergyBar(elements.f2EnergyBar, f2Energy);

        let f1Surging = false, f2Surging = false;
        if (f1Energy >= 100 && Math.random() < CONFIG.SURGE_ACTIVATION_CHANCE) {
            f1Surging = true;
            if(elements.f1Pod) elements.f1Pod.classList.add('quantum-surging');
            if(elements.f1Cry) animateTextByChar(elements.f1Cry, `"${fighter1.surgeMove}!!"`, 25);
            playSound('surge_activate_f1');
            f1Energy = 0;
        }
        if (f2Energy >= 100 && Math.random() < CONFIG.SURGE_ACTIVATION_CHANCE) {
            f2Surging = true;
            if(elements.f2Pod) elements.f2Pod.classList.add('quantum-surging');
            if(elements.f2Cry) animateTextByChar(elements.f2Cry, `"${fighter2.surgeMove}!!"`, 25);
            playSound('surge_activate_f2');
            f2Energy = 0;
        }
        if(elements.f1EnergyBar) updateEnergyBar(elements.f1EnergyBar, f1Energy);
        if(elements.f2EnergyBar) updateEnergyBar(elements.f2EnergyBar, f2Energy);

        const f1CurrentY = elements.f1Emoji && elements.f1Emoji.style.transform.includes('translateY') ? elements.f1Emoji.style.transform.match(/translateY\(([^)]+)\)/)[1] : '-5px';
        const f2CurrentY = elements.f2Emoji && elements.f2Emoji.style.transform.includes('translateY') ? elements.f2Emoji.style.transform.match(/translateY\(([^)]+)\)/)[1] : '-5px';

        if(elements.f1Emoji) {
            elements.f1Emoji.style.setProperty('--current-translate-y', f1CurrentY);
            elements.f1Emoji.style.setProperty('--attack-translate-x', '20px');
        }
        if(elements.f1Pod) elements.f1Pod.classList.add('attacking');

        if(elements.f2Emoji) {
            elements.f2Emoji.style.setProperty('--current-translate-y', f2CurrentY);
            elements.f2Emoji.style.setProperty('--attack-translate-x', '-20px');
        }
        setTimeout(() => elements.f2Pod && elements.f2Pod.classList.add('attacking'), 150);

        setTimeout(() => {
            playSound('impact_heavy');
            createParticleBurst(elements.clashEffectContainer, CONFIG.PARTICLE_COUNT_CLASH,
                [fighter1.element.color, fighter2.element.color, 'var(--color-q-accent-gold)'], [3, 8], [500, 1000]);
            if (f1Surging) createParticleBurst(elements.f1Field, CONFIG.PARTICLE_COUNT_SURGE, [fighter1.element.color, 'var(--color-q-tertiary-glow)'], [4,10], [600, 1200]);
            if (f2Surging) createParticleBurst(elements.f2Field, CONFIG.PARTICLE_COUNT_SURGE, [fighter2.element.color, 'var(--color-q-tertiary-glow)'], [4,10], [600, 1200]);

            document.body.style.animation = 'qScreenShake 0.3s ease-out';
            setTimeout(() => document.body.style.animation = '', 300);
        }, 500);

        setTimeout(() => {
            if(elements.f1Pod) elements.f1Pod.classList.remove('attacking');
            if(elements.f2Pod) elements.f2Pod.classList.remove('attacking');

            let winner;
            const f1Adv = Q_AFFINITIES[fighter1.element.name] === fighter2.element.name;
            const f2Adv = Q_AFFINITIES[fighter2.element.name] === fighter1.element.name;
            let advantagePlayed = false;

            if (f1Surging && !f2Surging) winner = fighter1;
            else if (f2Surging && !f1Surging) winner = fighter2;
            else {
                if (f1Adv && !f2Adv) {
                    winner = Math.random() < CONFIG.ELEMENTAL_ADVANTAGE_BIAS ? fighter1 : fighter2;
                    if (winner === fighter1) advantagePlayed = true;
                } else if (f2Adv && !f1Adv) {
                    winner = Math.random() < CONFIG.ELEMENTAL_ADVANTAGE_BIAS ? fighter2 : fighter1;
                    if (winner === fighter2) advantagePlayed = true;
                } else {
                    winner = Math.random() < 0.5 ? fighter1 : fighter2;
                }
            }
            showResult(winner, (f1Surging || f2Surging), advantagePlayed);
        }, 1000);
    }

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `@keyframes qScreenShake { 0%, 100% { transform: translate(0,0); } 25% { transform: translate(3px, -2px) rotate(0.2deg); } 50% { transform: translate(-2px, 2px) rotate(-0.1deg); } 75% { transform: translate(1px, -1px) rotate(0.1deg); }}`;
    document.head.appendChild(styleSheet);

    function showResult(winnerData, wasSurgeBattle, advantagePlayed) {
        gamePhase = 'RESULT';
        const loserData = (winnerData.id === fighter1.id) ? fighter2 : fighter1;
        const winnerPod = (winnerData.id === fighter1.id) ? elements.f1Pod : elements.f2Pod;
        const loserPod = (winnerData.id === fighter1.id) ? elements.f2Pod : elements.f1Pod;
        const winnerEmojiEl = (winnerData.id === fighter1.id) ? elements.f1Emoji : elements.f2Emoji;
        const loserEmojiEl = (winnerData.id === fighter1.id) ? elements.f2Emoji : elements.f1Emoji;

        if(winnerPod) {
            winnerPod.classList.add('winner');
            if(winnerPod.classList.contains('quantum-surging')) playSound('surge_win_impact');
            winnerPod.classList.remove('quantum-surging');
        }
        if(winnerEmojiEl) winnerEmojiEl.classList.add('winner-animation');

        if(loserPod) {
            loserPod.classList.add('loser');
            loserPod.classList.remove('quantum-surging');
        }
        if(loserEmojiEl) loserEmojiEl.classList.add('loser-animation');
        playSound(wasSurgeBattle ? 'win_surge' : 'win_normal');

        const verbs = wasSurgeBattle ? Q_RESULT_VERBS_SURGE : Q_RESULT_VERBS_NORMAL;
        const verb = randomChoice(verbs);
        let resultString = `${winnerData.name} ${verb} ${loserData.name}!`;
        if (wasSurgeBattle) resultString = `QUANTUM SURGE! ${resultString.toUpperCase()}`;
        else if (advantagePlayed) resultString += " Elemental dissonance favored the victor!";

        if(elements.resultText) {
            animateTextByChar(elements.resultText, resultString, wasSurgeBattle ? 50 : 35);
            elements.resultText.classList.add('visible', 'winner');
        }

        if(elements.engageButton) elements.engageButton.style.display = 'none';
        if(elements.nextClashButton) {
            elements.nextClashButton.style.display = 'inline-block';
            elements.nextClashButton.disabled = false;
        }
    }

    elements.engageButton.addEventListener('click', () => {
        const currentButtonText = elements.engageButton.textContent;
        if (gamePhase === 'INITIALIZING' || gamePhase === 'READY_TO_SUMMON') {
             if(currentButtonText === 'INITIALIZE SEQUENCE'){
                initializeSequence();
             } else if (currentButtonText === 'SUMMON ENTITIES') {
                summonEntities();
             }
        } else if (gamePhase === 'FIGHTERS_SUMMONED' && currentButtonText === 'ENGAGE CLASH') {
            engageClash();
        }
    });

    elements.nextClashButton.addEventListener('click', () => {
        if (gamePhase === 'RESULT') {
            initializeSequence();
        }
    });

    initializeSequence();
});