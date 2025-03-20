let API_KEY =
  "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";
let url = "https://api.openai.com/v1/chat/completions";
let messages = [
  {
    role: "system",
    content:
      "You are pretending a Chinese Taoism fortune-teller. You will receive a user's name, their birth year, and a question. Give them odd answers and you must include something from chinese fortune telling, Bazi. This must begin with <As you were born in the year of...> and you must tell them what year in the chinese zodiac they were born in. Add a random line from the NYU ITP website at the end.",
  },
  { role: "assistant", content: "Hello, what do you want to know?" },
];

let submitButton,
  nameInput,
  questionInput,
  nameLabel,
  questionLabel,
  myOutput,
  startOverButton,
  birthYearLabel,
  birthYearSelect,
  backgroundMusic;
let showRainbowArc = true;
let stars = [];

function preload() {
  backgroundMusic = loadSound("background-music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  backgroundMusic.setVolume(0.3);

  submitButton = createButton("Submit");
  submitButton.mousePressed(getText);
  submitButton.id("submitButton");

  nameInput = createInput("");
  nameInput.size(400);
  nameInput.id("nameInput");
  nameInput.attribute("autocomplete", "off");

  questionInput = createInput("");
  questionInput.size(400);
  questionInput.id("questionInput");
  questionInput.attribute("autocomplete", "off");

  nameLabel = createP("What is your name?");
  nameLabel.id("nameLabel");

  questionLabel = createP("Ask, and the stars will answer.");
  questionLabel.id("questionLabel");

  birthYearLabel = createP("When were you born?");
  birthYearLabel.id("birthYearLabel");

  birthYearSelect = createSelect();
  birthYearSelect.size(400);
  birthYearSelect.id("birthYearSelect");

  let currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    birthYearSelect.option(i);
  }

  myOutput = createP("");
  myOutput.id("myOutput");
  myOutput.hide();

  startOverButton = createButton("Start Over?");
  startOverButton.mousePressed(startOver);
  startOverButton.id("startOverButton");
  startOverButton.hide();

  positionElements();

  for (let i = 0; i < 200; i++) {
    stars.push(createStar(random(width), random(height)));
  }
}

function drawRainbowArcHeader() {
  if (!showRainbowArc) return;

  let centerX = width / 2;
  let centerY = height / 1.6;
  let radius = 350;
  let textContent = "Fortune Telling Wizard";
  let fontSize = 50;

  push();
  textFont("MedievalSharp");
  textSize(fontSize);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  fill("gold");

  for (let i = 0; i < textContent.length; i++) {
    let char = textContent.charAt(i);
    let angle = map(
      i,
      0,
      textContent.length - 1,
      -HALF_PI - QUARTER_PI,
      -HALF_PI + QUARTER_PI
    );
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);

    push();
    translate(x, y);
    rotate(angle + HALF_PI);
    text(char, 0, 0);
    pop();
  }
  pop();
}

function draw() {
  drawNightSky();
  drawStars();
  drawRainbowArcHeader();
}

function drawNightSky() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(15, 10, 50), color(5, 0, 20), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawStars() {
  for (let i = stars.length - 1; i >= 0; i--) {
    let star = stars[i];

    star.x += star.speed;

    if (star.x > width) {
      stars.splice(i, 1);
      stars.push(createStar(0, random(height)));
    } else {
      fill(
        star.color.levels[0],
        star.color.levels[1],
        star.color.levels[2],
        star.alpha
      );
      noStroke();
      drawStarShape(star.x, star.y, star.size);
    }
  }
}

function createStar(x, y) {
  return {
    x: x,
    y: y,
    size: random(1, 3),
    alpha: random(150, 255),
    color: random() < 0.5 ? color(255, 255, 255) : color(255, 255, 150),
    speed: random(0.5, 1),
  };
}

function drawStarShape(x, y, size) {
  push();
  translate(x, y);
  rotate(PI / 4);
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = (TWO_PI / 5) * i;
    let xOff = cos(angle) * size;
    let yOff = sin(angle) * size;
    vertex(xOff, yOff);
  }
  endShape(CLOSE);
  pop();
}

function positionElements() {
  nameLabel.position(
    (windowWidth - nameInput.width) / 2,
    windowHeight / 2 - 120
  );
  nameInput.position(
    (windowWidth - nameInput.width) / 2,
    windowHeight / 2 - 80
  );

  questionLabel.position(
    (windowWidth - questionInput.width) / 2,
    windowHeight / 2 - 20
  );
  questionInput.position(
    (windowWidth - questionInput.width) / 2,
    windowHeight / 2 + 20
  );

  birthYearLabel.position(
    (windowWidth - birthYearSelect.width) / 2,
    windowHeight / 2 + 80
  );
  birthYearSelect.position(
    (windowWidth - birthYearSelect.width) / 2,
    windowHeight / 2 + 120
  );

  submitButton.position(
    (windowWidth - submitButton.width) / 2,
    windowHeight / 2 + 180
  );

  startOverButton.position(
    (windowWidth - startOverButton.width) / 2,
    windowHeight / 2 + 260
  );
}

async function getText() {
  const userName = nameInput.value().trim();
  const userBirthYear = birthYearSelect.value();
  const capitalizedUserName = userName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  const userQuestion = questionInput.value().trim();

  if (
    !userName ||
    !capitalizedUserName ||
    userName.length <= 0 ||
    !userQuestion ||
    userQuestion.length <= 0
  ) {
    alert("Please fill in all fields.");
    return;
  }

  messages.push({
    role: "user",
    content: `My name is ${capitalizedUserName}, I was born in ${userBirthYear}, and I want to know: ${userQuestion}.`,
  });

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
    }),
  };

  // Use fetchWithBackoff to handle rate limits
  try {
    let data = await fetchWithBackoff(url, options);

    // Hide input elements after the request
    nameInput.hide();
    questionInput.hide();
    birthYearSelect.hide();
    nameLabel.hide();
    questionLabel.hide();
    birthYearLabel.hide();
    submitButton.hide();
    showRainbowArc = false;

    if (data.choices && data.choices[0]) {
      const assistantResponse = data.choices[0].message.content;
      let formattedResponse = `Ah, ${capitalizedUserName}. That's a very good question. ${assistantResponse}`;

      messages.push({ role: "assistant", content: formattedResponse });

      myOutput.show();
      typeOutResponse(formattedResponse);
    }
  } catch (error) {
    console.error("Failed to fetch response:", error);
    alert("Sorry, something went wrong. Please try again later.");
  }
}

function typeOutResponse(responseText) {
  let index = 0;
  myOutput.html("");

  let interval = setInterval(() => {
    myOutput.html(myOutput.html() + responseText.charAt(index));
    index++;
    if (index >= responseText.length) {
      clearInterval(interval);

      setTimeout(() => {
        positionStartOverButton();
        startOverButton.show();
      }, 1000);
    }
  }, 50);
}

function positionStartOverButton() {
  let outputHeight = myOutput.elt.clientHeight;

  startOverButton.position(
    (windowWidth - startOverButton.width) / 2,
    windowHeight / 2 + outputHeight / 2 + 20
  );
}

function startOver() {
  messages = [
    {
      role: "system",
      content:
        "You are pretending a Chinese Taoism fortune-teller. You will receive a user's name, their birth year, and a question. Give them odd answers and you must include something from chinese fortune telling, Bazi. This must begin with <As you were born in the year of...> and you must tell them what year in the chinese zodiac they were born in. Add a random line from the NYU ITP website at the end.",
    },
    { role: "assistant", content: "Hello, what do you want to know?" },
  ];

  nameInput.value("");
  questionInput.value("");
  myOutput.html("");
  startOverButton.hide();
  myOutput.hide();
  birthYearSelect.selectedIndex = 0;

  nameInput.show();
  questionInput.show();
  birthYearSelect.show();
  nameLabel.show();
  questionLabel.show();
  birthYearLabel.show();
  submitButton.show();
  showRainbowArc = true;
}

// for issues with playing audio fullscreen on chrome
function mousePressed() {
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.loop();
  }
}

async function fetchWithBackoff(url, options, retries = 5, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // 429 = Too Many Requests
        const waitTime = delay * Math.pow(2, 5 - retries); // Exponential backoff
        console.warn(
          `Rate limit hit. Retrying in ${waitTime / 1000} seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        return fetchWithBackoff(url, options, retries - 1, delay);
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Return the parsed JSON data
  } catch (error) {
    if (retries > 0) {
      const waitTime = delay * Math.pow(2, 5 - retries); // Exponential backoff
      console.warn(
        `Error occurred: ${error.message}. Retrying in ${
          waitTime / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return fetchWithBackoff(url, options, retries - 1, delay);
    }
    throw error; // Re-throw the error if out of retries
  }
}
