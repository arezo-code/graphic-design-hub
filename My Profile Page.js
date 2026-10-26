const editDialog = document.getElementById('editDialog');
const profileForm = document.getElementById('profileForm');
const editButtons = [document.getElementById('editProfileBtn'), document.getElementById('editProfileBtn2')];
const fields = {
  name: document.getElementById('nameInput'),
  role: document.getElementById('roleInput'),
  email: document.getElementById('emailInput'),
  location: document.getElementById('locationInput'),
  bio: document.getElementById('bioInput')
};

function openEditor() {
  fields.name.value = document.getElementById('displayName').textContent;
  fields.role.value = document.getElementById('displayRole').textContent;
  fields.email.value = document.getElementById('displayEmail').textContent;
  fields.location.value = document.getElementById('displayLocation').textContent;
  fields.bio.value = document.getElementById('displayBio').textContent;
  editDialog.showModal();
}
editButtons.forEach(button => button.addEventListener('click', openEditor));
document.getElementById('closeDialog').addEventListener('click', () => editDialog.close());
document.getElementById('cancelEdit').addEventListener('click', () => editDialog.close());

profileForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = fields.name.value.trim();
  if (!name) return;
  document.getElementById('displayName').textContent = name;
  document.getElementById('displayRole').textContent = fields.role.value.trim() || 'Creative Learner';
  document.getElementById('displayEmail').textContent = fields.email.value.trim();
  document.getElementById('displayLocation').textContent = fields.location.value.trim() || 'Location not added';
  document.getElementById('displayBio').textContent = fields.bio.value.trim() || 'Add a short introduction about yourself.';
  document.getElementById('avatarInitials').textContent = name.split(/\s+/).slice(0,2).map(part => part[0]).join('').toUpperCase();
  editDialog.close();
  updateCompletion();
});

function updateCompletion() {
  const hasBio = document.getElementById('displayBio').textContent.trim().length > 15;
  const hasLocation = document.getElementById('displayLocation').textContent.trim().length > 0;
  const percent = hasBio && hasLocation ? 100 : hasBio || hasLocation ? 90 : 80;
  document.getElementById('completionNumber').textContent = percent + '%';
  document.getElementById('completionBar').style.width = percent + '%';
}

document.getElementById('addSkillBtn').addEventListener('click', () => {
  const skill = prompt('Enter a skill to add:');
  if (!skill || !skill.trim()) return;
  const cleanSkill = skill.trim();
  const existing = [...document.querySelectorAll('.skill-tag')].some(tag => tag.textContent.replace('×','').trim().toLowerCase() === cleanSkill.toLowerCase());
  if (existing) { alert('This skill is already listed.'); return; }
  addSkillTag(cleanSkill);
});
function addSkillTag(skill) {
  const tag = document.createElement('span');
  tag.className = 'skill-tag';
  const label = document.createTextNode(skill + ' ');
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.setAttribute('aria-label', 'Remove ' + skill);
  remove.textContent = '×';
  remove.addEventListener('click', () => tag.remove());
  tag.append(label, remove);
  document.getElementById('skillList').appendChild(tag);
}
document.querySelectorAll('.skill-tag button').forEach(button => {
  button.addEventListener('click', () => button.closest('.skill-tag').remove());
});

document.getElementById('avatarEdit').addEventListener('click', () => {
  alert('To use a real profile photo, replace the initials avatar in index.html with an image.');
});
document.getElementById('menuToggle').addEventListener('click', () => {
  if (window.innerWidth <= 700) document.getElementById('sidebar').classList.toggle('mobile-open');
  else document.body.classList.toggle('menu-open');
});
document.getElementById('globalSearch').addEventListener('keydown', event => {
  if (event.key === 'Enter' && event.target.value.trim()) {
    const query = event.target.value.trim().toLowerCase();
    const profileText = document.querySelector('.profile-card').innerText.toLowerCase();
    if (!profileText.includes(query)) alert('No matching text found in this profile.');
    else document.querySelector('.profile-card').scrollIntoView({behavior:'smooth', block:'start'});
  }
});
document.querySelector('.help-button').addEventListener('click', () => alert('Need help? Contact the GraphicDesignHUB support team.'));
