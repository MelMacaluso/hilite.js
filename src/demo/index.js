import Hilite from '../lib/App'


const card1Trigger = new Hilite([
  {
    target: document.querySelector('[data-hilite-target="github"]'),
    message: 'ciao come stai GITHUB'
  },
  {
    target: document.querySelector('[data-hilite-target="card1"]'),
    message: 'ciao come stai CARD1'
  },
  {
    target: document.querySelector('input'),
    message: 'ciao come stai last'
  },
])

const card2 = document.querySelector('.card2')

card2.addEventListener('click', () => {
  card1Trigger.start()
})