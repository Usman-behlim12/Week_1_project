document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  navToggle && navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    primaryNav && primaryNav.setAttribute('aria-hidden', String(expanded));
  });

  document.querySelectorAll('#primary-nav a').forEach(a=>{
    a.addEventListener('click', ()=>{
      if(window.innerWidth <= 720){
        navToggle.setAttribute('aria-expanded','false');
        primaryNav.setAttribute('aria-hidden','true');
      }
    });
  });

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if(form){
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      let valid = true;

      if(name.length < 2){
        showError('err-name', 'Please enter your name.');
        valid = false;
      }

      if(!validateEmail(email)){
        showError('err-email', 'Please enter a valid email address.');
        valid = false;
      }

      if(message.length < 8){
        showError('err-message', 'Message should be at least 8 characters.');
        valid = false;
      }

      if(!valid){
        status.textContent = 'Fix the errors above and try again.';
        status.style.color = '#b91c1c';
        return;
      }

  
  
      status.textContent = 'Message sent. Thank you!';
      status.style.color = 'green';
      form.reset();
    });
  }

  function showError(id, text){
    const el = document.getElementById(id);
    if(el) el.textContent = text;
  }
  function clearErrors(){
    ['err-name','err-email','err-message'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.textContent = '';
    });
    if(status) status.textContent = '';
  }

  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});