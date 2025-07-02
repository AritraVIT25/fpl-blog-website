// 🌐 Smooth Scroll on Nav Links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// 🕒 Relative Timestamps for Live Updates
document.querySelectorAll('.update-time').forEach(span => {
  const originalText = span.textContent;
  const now = new Date();
  let mins = 0;

  if (originalText.includes('mins')) mins = parseInt(originalText);
  else if (originalText.includes('hour')) mins = parseInt(originalText) * 60;

  const time = new Date(now.getTime() - mins * 60000);
  span.textContent = `⏱ ${timeSince(time)} ago`;
});

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1)
      return `${count} ${interval.label}${count > 1 ? 's' : ''}`;
  }

  return 'just now';
}

// 📅 Countdown to Next Deadline (Gameweek Deadline Example)
function startCountdown(deadlineDate) {
  const countdownEl = document.getElementById('deadline-countdown');
  function updateCountdown() {
    const now = new Date();
    const diff = deadlineDate - now;

    if (diff <= 0) {
      countdownEl.textContent = '✅ Deadline Passed';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);

    countdownEl.textContent = `⏰ ${d}d ${h}h ${m}m remaining`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000); // update every minute
}

// 🔥 Sample deadline: July 5, 2025 11:30 AM (customize this)
startCountdown(new Date('2025-07-05T11:30:00'));

// 📰 Modal System for Blog Cards
const modalHTML = `
  <div class="modal" id="postModal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" id="closeModal">&times;</span>
        <h2 id="modalTitle">Post Title</h2>
        <div class="modal-meta" id="modalMeta">Meta Info</div>
      </div>
      <div class="modal-body" id="modalBody">
        <p>Loading content...</p>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

// 🧠 Click Post Card → Open Modal
document.querySelectorAll('.post-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('.post-title').textContent;
    const meta = card.querySelector('.post-meta').textContent;
    const excerpt = card.querySelector('.post-excerpt').textContent;

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMeta').textContent = meta;
    document.getElementById('modalBody').innerHTML = `
      <p>${excerpt}</p>
      <br />
      <p><em>Stay tuned for the full article. More insights dropping soon 👀</em></p>
    `;

    document.getElementById('postModal').style.display = 'block';
  });
});

// ❌ Close Modal
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('postModal').style.display = 'none';
});
window.addEventListener('click', e => {
  if (e.target.id === 'postModal') document.getElementById('postModal').style.display = 'none';
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('postModal').style.display = 'none';
});

// 🧭 Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// 🎉 Console Message
console.log('%c👋 Hello from FPL Master Hub!', 'color: #00ff87; font-size: 16px');
