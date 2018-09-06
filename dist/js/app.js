//
const synth = window.speechSynthesis;

// DOM Elements

const textForm = document.querySelector('#text-form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice,name + '('+ voice.lang +')';
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
  });
}

getVoices();
if (synth.onvoiceschange !== undefind) {
  synth.onvoiceschange = getVoices;
}

const speak = () => {

  if(synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if(textInput.value !== '') {
// Add background animation
    body.style.background = "#141414 url(img/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.sytle.backgroundSize = '100% 100%';

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = e => {
      console.log('Done speaking...');
    }

    speakText.onerror = e => {
      console.log('Something went wrong');
    }

    const selectVoices = voiceSelect.selectedOptions[0]
    .getAttribute('data-name');

    voices.forEach(voice => {
      if(voice.name === selectedVoive) {
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);
  }
}

textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener('change', e => (rateValue.textContent = rate.value));

pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

voiceSelect.addEventListener('change', e => speak());

