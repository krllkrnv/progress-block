const demo = document.querySelector('#demo progress-component');

const valInput = document.getElementById('valueInput');
const animToggle = document.getElementById('animateToggle');
const hideToggle = document.getElementById('hideToggle');

valInput.addEventListener('input', () => {
  const value = parseInt(valInput.value) || 0;
  demo.setValue(value);
});

animToggle.addEventListener('change', () => {
  if (animToggle.checked) {
    demo.startAnimation();
  } else {
    demo.stopAnimation();
  }
});

hideToggle.addEventListener('change', () => {
  if (hideToggle.checked) {
    demo.hide();
  } else {
    demo.show();
  }
});

demo.setValue(0);