import '../lib/css/App.css'

class Hilite {
  constructor(stepsArray) {
    this.stepsArray = stepsArray
    this.step = 0
    this.stepsNumber = this.stepsArray.length
    this.body = document.querySelector('body')

    this.currentStepObj = this.stepsArray[this.step]
    this.message = this.currentStepObj.message
    this.overlaysWrapper = this.createOverlaysWrapper()
    this.overlays = this.createOverlays()
    this.closeBtn = this.createCloseBtn(this.currentStepObj.closeBtnText)
    this.messageBox = this.createMessage()
    this.nextStepBtn = this.createNextStepBtn()

    this.update()
    this.handleResize()
  }

  update() {
    this.currentStepObj = this.stepsArray[this.step]
    this.target = this.currentStepObj.target
    this.targetWidth = this.target.clientWidth
    this.targetHeight = this.target.clientHeight
    this.message = this.currentStepObj.message

    this.messageBox.innerText = this.message
  }

  handleLastStep() {
    const isLastStep = this.stepsNumber === this.step + 1

    if(isLastStep) {
      this.nextStepBtn.remove()
      this.displaceCloseBtn()
      this.appendCloseBtn()
    }
  }

  createOverlay(classNames) {
    const overlay = document.createElement('div')
    overlay.classList = `hilite__overlay ${classNames}`

    return overlay
  }

  createOverlays() {
    const overlayLeft = this.createOverlay('hilite__overlay--left')
    const overlayRight = this.createOverlay('hilite__overlay--right')
    const overlayTop = this.createOverlay('hilite__overlay--top')
    const overlayBottom = this.createOverlay('hilite__overlay--bottom')

    return {
      left: overlayLeft,
      right: overlayRight,
      top: overlayTop,
      bottom: overlayBottom,
    }
  }

  createOverlaysWrapper() {
    const overlaysWrapper = document.createElement('div')
    overlaysWrapper.className = 'hilite__overlays'

    return overlaysWrapper
  }

  appendOverlays() {
    Object.values(this.overlays).forEach((overlay) =>
      this.overlaysWrapper.appendChild(overlay)
    )
    this.body.appendChild(this.overlaysWrapper)
  }

  appendMessage() {
    this.overlaysWrapper.append(this.messageBox)
  }

  appendNextStepBtn() {
    this.messageBox.parentNode.insertBefore(
      this.nextStepBtn,
      this.messageBox.nextSibling
    )
  }

  appendCloseBtn() {
    this.messageBox.parentNode.insertBefore(
      this.closeBtn,
      this.messageBox.nextSibling
    )
  }

  displaceOverlays() {
    const { left, top, bottom } = this.target.getBoundingClientRect()

    this.overlays.left.style.width = `${left}px`

    this.overlays.right.style.width = `${
      window.innerWidth - (left + this.targetWidth)
    }px`

    this.overlays.bottom.style.height = `${
      window.innerHeight - (top + this.targetHeight)
    }px`
    this.overlays.bottom.style.width = `${this.targetWidth}px`
    this.overlays.bottom.style.left = `${left}px`

    this.overlays.top.style.height = `${bottom - this.targetHeight}px`
    this.overlays.top.style.width = `${this.targetWidth}px`
    this.overlays.top.style.left = `${left}px`
  }

  displaceMessage() {
    const { left, bottom } = this.target.getBoundingClientRect()

    this.messageBox.style.left = `${left}px`
    this.messageBox.style.top = `${bottom + 20}px`
  }

  displaceNextStepBtn() {
    const { left, bottom } = this.target.getBoundingClientRect()
    const messageBoxHeigth = this.messageBox.clientHeight

    this.nextStepBtn.style.left = `${left}px`
    this.nextStepBtn.style.top = `${bottom + 30 + messageBoxHeigth}px`
  }

  displaceCloseBtn() {
    const { left, bottom } = this.target.getBoundingClientRect()
    const messageBoxHeigth = this.messageBox.clientHeight

    this.closeBtn.style.left = `${left}px`
    this.closeBtn.style.top = `${bottom + 30 + messageBoxHeigth}px`
  }

  createNextStepBtn() {
    const btn = document.createElement('button')
    btn.innerText = 'Next'
    btn.className = 'hilite__next-step-btn'
    btn.addEventListener('click', () => {
      this.nextStep()
    })

    return btn
  }

  createMessage() {
    const messageBox = document.createElement('div')
    messageBox.className = 'hilite__message'
    messageBox.innerHTML = this.message

    return messageBox
  }

  createCloseBtn(closeBtnText) {
    const closeBtn = document.createElement('button')
    closeBtn.className = 'hilite__close-btn'
    closeBtn.innerText = closeBtnText || 'Finish'
    closeBtn.addEventListener('click', () => {
      this.endOfFlow()
    })

    return closeBtn
  }

  nextStep(step, reset) {
    !reset ? this.step += 1 : this.step = 0
    this.update()
    this.displaceOverlays()
    this.displaceMessage()
    this.displaceNextStepBtn()
    this.handleLastStep()
  }

  start() {
    const targetExists = this.target

    if (targetExists) {
      this.isHilited = true

      this.displaceOverlays()
      this.appendOverlays()
      this.displaceMessage()
      this.appendMessage()

      if (this.stepsNumber > 0) {
        this.displaceNextStepBtn()
        this.appendNextStepBtn()
      }

      setTimeout(() => {
        this.overlaysWrapper.style.opacity = 1
      }, 300)
    }
  }

  endOfFlow() {
    this.overlaysWrapper.style.opacity = 0
    setTimeout(() => {
      this.overlaysWrapper.remove()
      this.nextStep(0, true)
    }, 300)
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.displaceMessage()
      this.displaceNextStepBtn()
      this.displaceCloseBtn()
      this.displaceOverlays()
    })
  }
}

export default Hilite
