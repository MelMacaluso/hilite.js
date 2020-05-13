import Hilite from '../lib/App'


const card1Trigger = new Hilite(
  {
    flow: [
      {
        target: document.querySelector('[data-hilite-target="github"]'),
        message: 'ciao come stai GITHUB <a href="#">cazzo</a>'
      },
      {
        target: document.querySelector('[data-hilite-target="card1"]'),
        message: 'ciao come stai CARD1'
      },
      {
        target: document.querySelector('input'),
        message: 'ciao come stai last'
      },
    ],
    // initTimeout: 2000
  }
)

const card2 = document.querySelector('.card2')

card2.addEventListener('click', () => {
  card1Trigger.start()
})