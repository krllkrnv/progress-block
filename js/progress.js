export default class ProgressComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { 
          display: inline-block; 
          width: 120px; 
          height: 120px; 
        }

        :host([hidden]) { 
          visibility: hidden; 
        }

        :host([animated]) .container {
          animation: rotate 2s linear infinite;
        }
        
        .container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        svg { 
          width: 100%; 
          height: 100%; 
        }
        
        circle {
          fill: none;
          stroke: #EAF0F6;
          stroke-width: 10;
        }
        
        circle.progress {
          stroke: #005CFF;
          transform-origin: center;
          transition: stroke-dasharray 0.3s ease;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        </style>

      <div class="container">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45"></circle>
          <circle class="progress" cx="50" cy="50" r="45"></circle>
        </svg>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['value', 'animated', 'hidden'];
  }

  attributeChangedCallback(name) {
    if (name === 'value') {
      this.updateProgress();
    }
  }

  updateProgress() {
    const progress = this.shadowRoot.querySelector('circle.progress');
    const value = Math.min(100, Math.max(0, Number(this.getAttribute('value') || 0)));
    
    const circumference = 2 * Math.PI * 45;
    const arcLength = (value / 100) * circumference;
    
    progress.style.strokeDasharray = `${arcLength} ${circumference}`;
    progress.style.strokeDashoffset = '0';
    progress.style.transform = 'rotate(-90deg)';
  }

  setValue(percent) {
    this.setAttribute('value', percent);
  }

  getValue() {
    return this.getAttribute('value') || 0;
  }

  startAnimation() {
    this.setAttribute('animated', '');
  }

  stopAnimation() {
    this.removeAttribute('animated');
  }

  hide() {
    this.setAttribute('hidden', '');
  }

  show() {
    this.removeAttribute('hidden');
  }

  connectedCallback() {
    this.updateProgress();
  }
}

customElements.define('progress-component', ProgressComponent);