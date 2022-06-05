(function (w, d) {
  'use strict'
  const IG = Object.create(null)

  // imageGalleryConfig variables
  const getConfig = typeof w.imageGalleryConfig !== 'undefined' && w.imageGalleryConfig
  IG.folder = getConfig && typeof getConfig.folder === 'string' ? getConfig.folder : 'big' // default folder 'big'
  IG.imageContainer = getConfig.imageContainer || 'images-container' // default class for images
  IG.timer = getConfig && typeof getConfig.delaySeconds === 'number' && isFinite(getConfig.delaySeconds) ? getConfig.delaySeconds * 1000 : 2000 // delay for image auto showing

  // create all elements containers array
  IG.IGContainersArray = []
  // create all elements array
  IG.IGArray = []
  // initialize container with null value
  IG.container = null
  IG.indexOfImage = 0
  IG.isActive = false
  IG.isAutoplayOn = false
  IG.timeOutVar = 0
  // all stuff for creating main gallery window
  IG.frag = d.createDocumentFragment()
  IG.clos = d.createElement('button')
  IG.ilef = d.createElement('button')
  IG.irig = d.createElement('button')
  IG.wdow = d.createElement('button')
  IG.play = d.createElement('button')
  IG.imag = d.createElement('div')
  IG.cent = d.createElement('div')
  IG.left = d.createElement('div')
  IG.rigt = d.createElement('div')
  IG.foot = d.createElement('div')
  IG.alts = d.createElement('div')
  IG.onow = d.createElement('div')
  IG.fine = d.createElement('div')
  IG.head = d.createElement('div')
  IG.insi = d.createElement('div')
  IG.imgs = d.createElement('img')
  IG.down = d.createElement('span')
  IG.imag.appendChild(IG.cent).id = 'cent7'
  IG.onow.appendChild(IG.alts).id = 'alts7'
  IG.frag.appendChild(IG.imag).id = 'imag7'
  IG.cent.appendChild(IG.insi).appendChild(IG.imgs)
  IG.cent.appendChild(IG.rigt).appendChild(IG.irig).id = 'irig7'
  IG.cent.appendChild(IG.left).appendChild(IG.ilef).id = 'ilef7'
  IG.imag.appendChild(IG.foot).appendChild(IG.play).id = 'play7'
  IG.imag.appendChild(IG.head).appendChild(IG.clos).id = 'clos7'
  IG.imag.appendChild(IG.onow).appendChild(IG.wdow).appendChild(IG.down)
  IG.foot.appendChild(IG.fine)
  IG.foot.id = 'foot7'
  IG.rigt.id = 'rigt7'
  IG.insi.id = 'insi7'
  IG.left.id = 'left7'
  IG.onow.id = 'onow7'
  IG.down.id = 'down7'
  IG.wdow.id = 'wdow7'
  IG.head.id = 'head7'
  IG.clos.setAttribute('title', 'Press Esc to close')
  IG.imgs.setAttribute('alt', '')
  IG.imag.setAttribute('tabindex', '-1')
  IG.imag.className = 'hide7'
  // create empty image source
  IG.imgs.src = 'data:,'
  // append document fragment to BODY
  d.body.appendChild(IG.frag)

  // autoplay method
  IG.autoPlay = function () {
    if (this.isAutoplayOn) {
      this.clear()
    } else {
      this.play.className = 'acts7'
      this.isAutoplayOn = true
      this.setActiveClass.call(this.play)
      this.loaded.call(this.imgs)
    }
  }

  // autoplay method loop
  IG.autoPlayLoop = function () {
    this.timeOutVar = setTimeout(function () {
      this.right().show()
      if (this.indexOfImage === this.IGArray.length - 1) this.clear()
    }.bind(this), this.timer)
  }

  // image is loaded method
  IG.loaded = function () {
    this.onload = loadComplete.bind(this)
    const img = this
    this.src = img.src
  }
  // call method on image element
  IG.loaded.call(IG.imgs)

  // clear method to reset all values
  IG.clear = function () {
    clearTimeout(this.timeOutVar)
    this.timeOutVar = 0
    this.isAutoplayOn = false
    this.isLoadedImage = false
    this.play.classList.remove('acts7')
    return this
  }

  // downloads method
  IG.downloads = function () {
    // add class active for button animation
    this.setActiveClass.call(this.down)
    const a = d.createElement('a')
    a.setAttribute('rel', 'noopener noreferrer')
    a.target = '_blank'
    a.href = this.imgs.src
    a.setAttribute('download', this.imgs.src)
    a.click()
    a.remove()
    this.onow.dataset.selected = this.imgs.src
  }

  // to left button method loop from images index
  IG.lefts = function () {
    if (this.indexOfImage > 0) this.indexOfImage--
    else this.indexOfImage = this.IGArray.length - 1
    this.setActiveClass.call(this.ilef)
    return this
  }

  // to right button method loop from images index
  IG.right = function () {
    if (this.indexOfImage < this.IGArray.length - 1) this.indexOfImage++
    else this.indexOfImage = 0
    this.setActiveClass.call(this.irig)
    return this
  }

  // function on close
  IG.close = function () {
    this.clear()
    this.isActive = false
    this.imag.className = 'hide7'
    d.body.style.overflowY = 'visible'
    d.children[0].style.overflow = 'hidden'
  }

  // add class for button animation (when clicked)
  IG.setActiveClass = function () {
    this.classList.add('focu7')
    setTimeout(function () {
      this.classList.remove('focu7')
    }.bind(this), 150)
  }

  // show image method to show image when loaded
  IG.show = function () {
    // if null is set as index return false
    if (this.indexOfImage === null) return false
    this.insi.className = 'spin7'
    const image = this.IGArray[this.indexOfImage]
    // don't rewrite values if active and set active gallery
    if (!this.isActive) {
      this.isActive = true
      d.body.style.overflowY = 'hidden'
      d.children[0].style.overflow = 'hidden'
      this.imag.className = ''
      this.imag.focus()
    }
    // two lines below for hiding left right buttons
    this.left.className = this.indexOfImage === 0 ? 'hide7' : ''
    this.rigt.className = this.indexOfImage === this.IGArray.length - 1 ? 'hide7' : ''
    this.alts.innerText = decodeURI(image.src.slice(image.src.lastIndexOf('/') + 1))
    this.fine.innerText = Number(this.indexOfImage) + 1 + '/' + this.IGArray.length
    this.imgs.onerror = function (e) { e.target.src = image.src }
    this.imgs.src = image.src.substr(image.src.length - 3) === 'svg' ? image.src : image.src.substring(0, image.src.lastIndexOf('/') + 1) + this.folder + image.src.slice(image.src.lastIndexOf('/'))
  }
  // asign container elements or BODY (default = BODY)
  IG.container = d.getElementsByClassName(IG.imageContainer).length > 0
    ? d.getElementsByClassName(IG.imageContainer)
    : d.getElementsByTagName('body')
  for (let l = IG.container.length - 1; l >= 0; l--) {
    IG.IGContainersArray.push(IG.container[l])
  }
  // Loop from elements
  for (let i = IG.IGContainersArray.length - 1; i >= 0; i--) {
    const img = IG.IGContainersArray[i].getElementsByTagName('img')
    for (let j = 0; j < img.length; j++) {
      img[j].parentElement.classList.add('spin7')
      IG.loaded.call(img[j])
      IG.IGArray.push(img[j])
    }
  }

  // listen for clicked on image element and load show method
  const listenForIG = function listenForIG (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault()
      e.stopImmediatePropagation()
      IG.indexOfImage = IG.IGArray.indexOf(e.target) === -1 ? null : IG.IGArray.indexOf(e.target) // set image index on click
      IG.show()
    }
  }

  if (IG.IGContainersArray[0] && IG.IGContainersArray[0].tagName === 'BODY') {
    // remove last element from array if body is selected
    IG.IGArray.pop()
    d.body.addEventListener('click', listenForIG)
  } else {
    for (let k = IG.IGContainersArray.length - 1; k >= 0; k--) { IG.IGContainersArray[k].addEventListener('click', listenForIG) }
  }

  // autoplay and image loaded helper to remove class 'loader'
  function loadComplete () {
    this.parentElement.classList.remove('spin7')
    IG.isAutoplayOn && IG.autoPlayLoop()
  }

  // add click addEventListener to image div (gallery window)
  IG.imag.addEventListener('click', function (e) {
    if (!IG.isActive) return false
    if (e.target.id === 'wdow7') {
      if (IG.IGArray[IG.indexOfImage].src === IG.onow.dataset.selected) return false
      IG.clear().downloads()
    }
    e.target.id === 'rigt7' && IG.clear().right().show()
    e.target.id === 'left7' && IG.clear().lefts().show()
    e.target.id === 'play7' && IG.autoPlay()
    e.target.id === 'clos7' && IG.close()
    e.preventDefault()
    e.stopImmediatePropagation()
  })

  // add keyup addEventListener to image div (gallery window)
  w.addEventListener('keyup', function (e) {
    if (!IG.isActive || e.isComposing || e.key === 229) return false
    e.key === 'ArrowLeft' && IG.clear().lefts().show()
    e.key === 'ArrowRight' && IG.clear().right().show()
    e.key === 'Escape' && IG.close()
    e.key === ' ' && IG.autoPlay()
    e.preventDefault()
    e.stopImmediatePropagation()
  })
  // everything to handle swipe left/right
  // https://code-maven.com/swipe-left-right-vanilla-javascript
  const minHorizontalMove = 30
  const maxVerticalMove = 30
  const withinMs = 1000

  let startXPos
  let startYPos
  let startTime
  function touchStart (event) {
    startXPos = event.touches[0].pageX
    startYPos = event.touches[0].pageY
    startTime = new Date()
  }

  function touchEnd (event) {
    const endXPos = event.changedTouches[0].pageX
    const endYPos = event.changedTouches[0].pageY
    const endTime = new Date()
    const moveX = endXPos - startXPos
    const moveY = endYPos - startYPos
    const elapsedTime = endTime - startTime
    if (Math.abs(moveX) > minHorizontalMove && Math.abs(moveY) < maxVerticalMove && elapsedTime < withinMs) {
      if (moveX < 0) {
        IG.clear().right().show()
      } else {
        IG.clear().lefts().show()
      }
    }
  }
  IG.imag.addEventListener('touchstart', touchStart)
  IG.imag.addEventListener('touchend', touchEnd)
  // everything to handle swipe left/right ends
})(window, document)
