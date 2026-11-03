const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const form = document.querySelector('[data-form]');
const result = document.querySelector('[data-result]');
const output = document.querySelector('[data-output]');
const copy = document.querySelector('[data-copy]');
const emailSend = document.querySelector('[data-email-send]');
const whatsappSend = document.querySelector('[data-whatsapp-send]');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = `Hi Jiani, my name is ${data.get('name')}.

I would like help with: ${data.get('interest')}
Travel dates: ${data.get('dates') || 'Not fixed yet'}
Travellers: ${data.get('travellers') || 'Not decided'}
Time in Chengdu: ${data.get('duration') || 'Not decided'}
Already booked: ${data.get('booked') || 'Nothing yet / not specified'}
Budget or preferences: ${data.get('budget') || 'Not specified'}

My biggest question:
${data.get('message')}`;
  output.textContent = message;
  emailSend.href = `mailto:heresjiani@gmail.com?subject=${encodeURIComponent(`Chengdu trip inquiry from ${data.get('name')}`)}&body=${encodeURIComponent(message)}`;
  whatsappSend.href = `https://wa.me/8618980723020?text=${encodeURIComponent(message)}`;
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
});


copy?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.textContent);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(output);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
  const old = copy.textContent;
  copy.textContent = 'Copied ✓';
  setTimeout(() => { copy.textContent = old; }, 1800);
});
