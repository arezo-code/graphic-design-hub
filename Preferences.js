const sidebar = document.getElementById('sidebar');
const main = document.querySelector('.main');
document.getElementById('menuBtn').addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  main.classList.toggle('expanded');
});

const tabs = document.querySelectorAll('.setting-tab');
const panels = document.querySelectorAll('.panel-section');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => item.classList.remove('active'));
  panels.forEach(panel => panel.classList.remove('visible'));
  tab.classList.add('active');
  document.getElementById(tab.dataset.target).classList.add('visible');
}));

document.querySelectorAll('.theme-choice').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.theme-choice').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    const theme = button.dataset.theme;
    document.body.classList.toggle('dark-mode', theme === 'dark');
    if (theme === 'system') document.body.classList.remove('dark-mode');
  });
});

document.getElementById('compactToggle').addEventListener('change', event => {
  document.body.classList.toggle('compact', event.target.checked);
});

const status = document.getElementById('statusMessage');
document.getElementById('saveBtn').addEventListener('click', () => {
  status.textContent = 'Changes updated for this demo.';
  status.style.color = '#2c9b72';
});
document.getElementById('resetBtn').addEventListener('click', () => {
  document.querySelectorAll('.switch input').forEach((input, index) => {
    input.checked = [true, true, true, false, false, true, true, true][index] ?? false;
  });
  document.querySelectorAll('.chips input').forEach((input, index) => input.checked = index < 2);
  document.getElementById('language').value = 'English';
  status.textContent = 'Demo preferences reset.';
  status.style.color = '#8a96a5';
});
document.getElementById('editProfile').addEventListener('click', () => {
  status.textContent = 'Profile editing can be connected to your My Profile page.';
  status.style.color = '#d72a83';
});
document.getElementById('passwordBtn').addEventListener('click', () => {
  status.textContent = 'Connect authentication to enable password changes.';
  status.style.color = '#d72a83';
});
document.querySelector('.help-btn').addEventListener('click', () => {
  status.textContent = 'Help Center: contact your GraphicDesignHUB administrator.';
  status.style.color = '#d72a83';
});
