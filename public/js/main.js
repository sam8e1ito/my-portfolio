// === MATRIX EFFECT ===
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

const hero = document.querySelector('.hero');
const fontSize = 16;
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const characters = letters.split('');

let columns;
let drops = [];
let clearStart, clearEnd;

function resizeCanvas() {
  canvas.width = hero.clientWidth;
  canvas.height = hero.clientHeight;

  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);

  clearStart = canvas.height * 0.3;
  clearEnd = canvas.height * 0.7;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// draw loop
function draw() {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    canvas.height * 0.1,  // inner circle 
    canvas.width / 2,
    canvas.height / 2,
    canvas.height * 0.5   // outer circle
  );
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.0)'); 
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)'); 
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = characters[Math.floor(Math.random() * characters.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    const dx = x - canvas.width / 2;
    const dy = y - canvas.height / 2;

    const radiusX = canvas.width * 0.27; 
    const radiusY = canvas.height * 0.2;  

    if ((dx*dx)/(radiusX*radiusX) + (dy*dy)/(radiusY*radiusY) > 1) {
        ctx.fillText(text, x, y);
    }


    // reset drops at bottom
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(draw);
}

// start matrix animation
draw();

// === show the projects ===
async function loadProjects() {
  const res = await fetch('/data/projects.json');
  const projects = await res.json();
  const projectsToShow = projects.slice(0, 5);

  const container = document.getElementById('projects');
  
  let openedInfo = null;
  let openedBtn = null;
  projectsToShow.forEach(project => {
    const card = document.createElement('div');
    card.classList.add('project-card');

    const title = document.createElement('h3');
    title.textContent = project.title;

    const infoBlock = document.createElement('div');
    infoBlock.classList.add('infoBlock');

    const moreInfoBtn = document.createElement('button');
    moreInfoBtn.classList.add('more-info-btn')
    moreInfoBtn.textContent = "More info";

    moreInfoBtn.addEventListener('click', () => {
      // close the previous button
      if (openedInfo && openedInfo !== infoBlock) {
        openedInfo.classList.remove('active');
        openedBtn.classList.remove('active'); // remove class from previous button
      }

      const isActive = infoBlock.classList.toggle('active');

      moreInfoBtn.classList.toggle('active', isActive);

      openedInfo = isActive ? infoBlock : null;
      openedBtn = isActive ? moreInfoBtn : null;
    });


    const ul = document.createElement('ul');
    project.description.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    infoBlock.appendChild(ul);
    
    

    const link = document.createElement('a');
    link.href = project.link;        
    link.textContent = "Visit site"; 
    link.target = "_blank";
    link.classList.add('link')
    infoBlock.appendChild(link);

    card.appendChild(title);
    card.appendChild(moreInfoBtn);
    card.appendChild(infoBlock);
    container.appendChild(card);
  });
}

loadProjects();

// === scrollspy ===
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// === skills array ===
fetch('/data/skills.json')
  .then(response => response.json())
  .then(data => {
    const renderSkills = (array, elementId) => {
      const ul = document.getElementById(elementId);
      array.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        ul.appendChild(li);
      });
    };

    renderSkills(data.frontend, "frontend-skills");
    renderSkills(data.backend, "backend-skills");
    renderSkills(data.databases, "database-skills");
    renderSkills(data.tools, "tools-skills");
  })
  .catch(err => console.error("Error loading skills:", err));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); 
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    history.replaceState(null, null, "/");
  });
});

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

window.addEventListener("pageshow", () => {
  window.scrollTo(0, 0);
  if (window.location.hash) {
    history.replaceState(null, null, "/");
  }
});

const seeMoreBtn = document.getElementById('seeMoreBtn');
if(seeMoreBtn){
  seeMoreBtn.addEventListener('click', () => {
    window.location.href='projects'
  })  
}
