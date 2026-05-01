// ===== DOM ELEMENTS =====
const chatContainer = document.getElementById("chat-container");
const chatBox       = document.getElementById("chat-box");
const userInput     = document.getElementById("user-input");
const sendBtn       = document.getElementById("send-btn");
const suggestions   = document.getElementById("suggestions");

// ===== TOGGLE CHAT WINDOW =====
function toggleChat() {
  chatContainer.classList.toggle("hidden");
  if (!chatContainer.classList.contains("hidden")) {
    userInput.focus();
  }
}

// ===== EVENT LISTENERS =====
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// ===== SEND MESSAGE =====
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  userInput.value = "";
  hideSuggestions();

  // Simulate bot "thinking"
  showTypingIndicator();

  const delay = Math.random() * 1000 + 800; // 0.8 – 1.8 s
  setTimeout(() => {
    removeTypingIndicator();
    const reply = getBotResponse(text);
    appendMessage(reply, "bot");
    showSuggestions();
  }, delay);
}

// ===== SEND QUICK SUGGESTION =====
function sendSuggestion(text) {
  userInput.value = text;
  sendMessage();
}

// ===== APPEND MESSAGE TO CHAT =====
function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", `${sender}-message`);

  if (sender === "bot") {
    msgDiv.innerHTML = `
      <div class="bot-avatar-small"><img src="imgs/mittu-bot-icon.png" style="width: 20px; height:20px;" alt="ChatBot Icon" class="chat-icon" /></div>
      <div class="bubble"><p>${text}</p></div>
    `;
  } else {
    msgDiv.innerHTML = `
      <div class="bubble"><p>${text}</p></div>
    `;
  }

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ===== TYPING INDICATOR =====
function showTypingIndicator() {
  const typing = document.createElement("div");
  typing.classList.add("message", "bot-message");
  typing.id = "typing";
  typing.innerHTML = `
    <div class="bot-avatar-small"><img src="imgs/mittu-bot-icon.png" style="width: 20px; height:20px;" alt="ChatBot Icon" class="chat-icon" /></div>
    <div class="bubble">
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

// ===== SHOW / HIDE SUGGESTIONS =====
function hideSuggestions() {
  suggestions.style.display = "none";
}

function showSuggestions() {
  suggestions.style.display = "flex";
}

// ============================================================
//  BOT BRAIN — keyword / pattern matching
// ============================================================
function getBotResponse(input) {
  const text = input.toLowerCase().trim();

  // ---------- GREETINGS ----------
  if (/^(hi|hello|hey|howdy|greetings|hola|namaste)\b/.test(text)) {
    return pickRandom([
      "Hello there! 👋 How can I help you today?",
      "Hey! 😊 Nice to chat with you!",
      "Hi! What's on your mind?",
      "Namaste! 🙏 How are you doing?"
    ]);
  }

  // ---------- HOW ARE YOU ----------
  if (/how are you|how('s| is) it going|how do you do/.test(text)) {
    return pickRandom([
      "I'm doing great, thanks for asking! 😄",
      "Running at 100% efficiency! How about you?",
      "I'm wonderful! Ready to help you with anything. 🚀"
    ]);
  }

  // ---------- NAME ----------
  if (/your name|who are you/.test(text)) {
    return "I'm ClicXY — your friendly assistant built to help you.";
  }

 

  // ---------- HELP ----------
  if (text.includes("help me")) {
    return `Here's what I can do:
      <br>👋 <strong>"hello"</strong> — I'll greet you
      <br>😄 <strong>"joke"</strong> — I'll tell a joke
      <br>🕐 <strong>"time"</strong> — I'll show the current time
      <br>📅 <strong>"date"</strong> — I'll show today's date
      <br>🔢 <strong>"calc 2+2"</strong> — I'll do math
      <br>🌤️ <strong>"weather"</strong> — Weather info
      <br>💡 <strong>"fact"</strong> — Random fun fact
      <br>❤️ <strong>"thanks"</strong> — You're welcome!`;
  }

  // ---------- JOKES ----------
  if (text.includes("joke") || text.includes("funny")) {
    return pickRandom([
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "Why did the JavaScript developer wear glasses? Because he couldn't C#! 👓",
      "What's a computer's favorite snack? Microchips! 🍟",
      "Why was the cell phone wearing glasses? It lost its contacts! 📱",
      "I told my computer I needed a break… and it said 'I'll go to sleep.' 😴",
      "Why do Java developers wear glasses? Because they can't C# ☕",
      "There are 10 types of people: those who understand binary and those who don't. 💻"
    ]);
  }

  // ---------- Poems ----------
  if (text.includes("Poems") || text.includes("Kids") || text.includes("poetry") || text.includes("poem") || text.includes("rhymes")) {
    return pickRandom([
      "Tota hoon main tota hoon, hare rang ka tota hoon, chonch meri lal hai, sunder meri chaal hai, baagon me main jata hoon, methe phal main khata hoon, jab-jab maali aata hai, patton mei chip jata hoon.",
      "Little Poll Parrot Sat in his garret Eating toast and tea; A little brown mouse Jumped into the house And stole it all away.",
      "Green parrot green parrot Where are you hiding in the tree, With your lovely hue, Green parrot green parrot, Show me your beak, That lovely bright red, Let me take a peek.",
      "I'm a parrot I'm a parrot Parrot green color I'm a parrot I'm a parrot Parrots green color I sing all songs in tune Whistling to my melodies.",
      "Baa Baa Black Sheep, Have you any wool? Yes sir, yes Sir, Three bags Full. One for my Master And one for my Dame, And one for the little Boy Who lives down the lane.",
      "I’m a Little Teapot, short and stout Here’s my handle Here’s my spout. When I get all steamed up, hear me shout Just tip me over and pour me out.",
      "Jack and Jill went up the hill To fetch a pail of water; Jack fell down and broke his crown, And Jill came tumbling after.",
      "Humpty Dumpty sat on a wall, Humpty Dumpty had a great fall. All the king’s horses and all the King’s men, Couldn’t put Humpty together again.",
      "Johnny Johnny, Yes Papa? Eating sugar? No Papa. Telling lies? No Papa. Open your mouth Ha! Ha! Ha!",
      "Twinkle Twinkle Little Star, How I wonder what you are. Up above the world so high, Like a diamond in the sky.Twinkle Twinkle little star, How I wonder what you are."
    ]);
  }

  // ---------- TIME ----------
  if (text.includes("time")) {
    const now = new Date();
    return `🕐 The current time is <strong>${now.toLocaleTimeString()}</strong>`;
  }

  // ---------- DATE ----------
  if (text.includes("date") || text.includes("today")) {
    const now = new Date();
    return `📅 Today is <strong>${now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })}</strong>`;
  }

  // ---------- CALCULATOR ----------
  if (text.startsWith("calc ")) {
    try {
      const expr = text.replace("calc ", "").replace(/[^0-9+\-*/().% ]/g, "");
      const result = Function('"use strict"; return (' + expr + ')')();
      return `🔢 The answer is: <strong>${result}</strong>`;
    } catch {
      return "Sorry, I couldn't calculate that. Try something like <strong>calc 2+2</strong>";
    }
  }

  // ---------- WEATHER (mock) ----------
  if (text.includes("weather")) {
    const conditions = ["☀️ Sunny", "🌤️ Partly Cloudy", "🌧️ Rainy", "⛈️ Stormy", "🌨️ Snowy"];
    const temps = [18, 22, 25, 28, 30, 15, 12];
    return `🌤️ Current weather: <strong>${pickRandom(conditions)}</strong>, <strong>${pickRandom(temps)}°C</strong><br><em>(This is simulated data — connect a real API for live weather!)</em>`;
  }

  // ---------- FUN FACTS ----------
  if (text.includes("fact") || text.includes("tell me something")) {
    return pickRandom([
      "🐙 An octopus has three hearts and blue blood!",
      "🍯 Honey never spoils — 3000-year-old honey is still edible!",
      "🌍 A day on Venus is longer than its year!",
      "🧬 Humans share 60% of their DNA with bananas!",
      "⚡ A bolt of lightning is 5x hotter than the sun's surface!",
      "🐋 The blue whale's heart is so big a small child could swim through its arteries!",
      "🎮 The first computer bug was an actual bug — a moth stuck in a relay!"
    ]);
  }

  

  // ---------- THANKS ----------
  if (/thank|thanks|Thankyou|thx/.test(text)) {
    return pickRandom([
      "You're welcome! 😊",
      "Happy to help! 🎉",
      "Anytime! Let me know if you need anything else.",
      "My pleasure! 💖"
    ]);
  }

   if (text.includes("Thank you") || text.includes("Thankyou for the help")) {
    return pickRandom([
      "You're welcome! 😊",
      "Happy to help! 🎉",
      "Anytime! Let me know if you need anything else.",
      "My pleasure! 💖"
    ]);
  }

   

  // ---------- BYE ----------
  if (/bye|goodbye|see you|good night/.test(text)) {
    return pickRandom([
      "Goodbye! Have a wonderful day! 👋",
      "See you later! 😊",
      "Bye bye! Come back anytime! 🤗",
      "Take care! 💖"
    ]);
  }

  // ---------- COMPLIMENTS ----------
  if (/you('re| are) (cool|awesome|great|amazing|smart|best)/.test(text)) {
    return pickRandom([
      "Aww, thank you! You're pretty awesome yourself! 🥰",
      "That made my circuits happy! 😄",
      "You just made my day! 💖"
    ]);
  }

  // ---------- AGE ----------
  if (text.includes("how old") || text.includes("your age")) {
    return "I was just created! In computer terms, I'm brand new. 😄";
  }

  // ---------- MEANING OF LIFE ----------
  if (text.includes("meaning of life")) {
    return "42. At least that's what the supercomputer said. 🤖📖";
  }

  // ---------- DEFAULT FALLBACK ----------
  return pickRandom([    
    "Oops! I didn't quite get that. Try asking about something else as I am still in learning mode.💡"
  ]);
}

// ===== UTILITY: Pick a random item from an array =====
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}