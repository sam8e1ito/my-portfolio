// === show all projects ===
async function loadAllProjects() {
  try {
    const res = await fetch('/data/projects.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const projects = await res.json();
    const container = document.getElementById('projects');
    if (!container) return;

    let openedInfo = null;
    let openedBtn = null;

    projects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('project-card');

      const title = document.createElement('h3');
      title.textContent = project.title;

      const moreInfoBtn = document.createElement('button');
      moreInfoBtn.classList.add('more-info-btn');
      moreInfoBtn.textContent = "More info";

      const infoBlock = document.createElement('div');
      infoBlock.classList.add('infoBlock');

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
      link.classList.add('link');
      infoBlock.appendChild(link);

      moreInfoBtn.addEventListener('click', () => {
        if (openedInfo && openedInfo !== infoBlock) {
          openedInfo.classList.remove('active');
          openedBtn.classList.remove('active');
        }

        const isActive = infoBlock.classList.toggle('active');
        moreInfoBtn.classList.toggle('active', isActive);

        openedInfo = isActive ? infoBlock : null;
        openedBtn = isActive ? moreInfoBtn : null;
      });

      card.appendChild(title);
      card.appendChild(moreInfoBtn);
      card.appendChild(infoBlock);
      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading projects:", err);
  }
}

loadAllProjects();
