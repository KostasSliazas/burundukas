(function (w, d) {
  'use strict'
  const IG = Object.create(null)
  // imageGalleryConfig variables with defaults
  // not using dot notation to not shorten variable names compile with google closure
  const getConfig = typeof w['imageGalleryConfig'] === 'undefined' || w['imageGalleryConfig']
  IG.folder = getConfig['folder'] || 'big/' // default folder 'big'
  IG.imageContainer = getConfig['imageContainer'] || 'images-container'
  IG.timer = typeof getConfig['delaySeconds'] === 'number' && isFinite(getConfig['delaySeconds']) ? getConfig['delaySeconds'] * 1000 : 2000
  IG.hideButtonsOnPlay = typeof getConfig['hideButtonsOnPlay'] === 'boolean' ? getConfig['hideButtonsOnPlay'] : false
  IG.showButtons = typeof getConfig['showButtons'] === 'boolean' ? getConfig['showButtons'] : true
  // elements containers array
  IG.containersArray = []
  // all elements array
  IG.imagesArray = []
  // initialize container with null value
  IG.container = null
  IG.indexOfImage = 0
  IG.isActive = false
  IG.isAutoplayOn = false
  IG.timeOutVar = 0
  IG.isLoadedImage = false
  // all stuff for creating main gallery window
  IG.frag = d.createDocumentFragment()
  IG.clos = d.createElement('button')
  IG.ilef = d.createElement('button')
  IG.irig = d.createElement('button')
  IG.imag = d.createElement('div')
  IG.cent = d.createElement('div')
  IG.left = d.createElement('div')
  IG.rigt = d.createElement('div')
  IG.head = d.createElement('div')
  IG.insi = d.createElement('div')
  IG.cent.appendChild(IG.insi)
  IG.cent.appendChild(IG.rigt).appendChild(IG.irig).id = 'irig7'
  IG.cent.appendChild(IG.left).appendChild(IG.ilef).id = 'ilef7'
  IG.imag.appendChild(IG.head).appendChild(IG.clos).id = 'clos7'
  IG.clos.setAttribute('aria-label', 'Close')
  IG.irig.setAttribute('aria-label', 'Next')
  IG.ilef.setAttribute('aria-label', 'Previous')
  IG.imag.appendChild(IG.cent).id = 'cent7'
  IG.frag.appendChild(IG.imag).id = 'imag7'
  IG.rigt.id = 'rigt7'
  IG.insi.id = 'insi7'
  IG.left.id = 'left7'
  IG.head.id = 'head7'
  IG.clos.setAttribute('title', 'Press Esc to close')
  IG.imag.setAttribute('tabindex', '-1')
  IG.imag.className = 'hide7'

  // show download and autoplay buttons if (true = default)
  if (IG.showButtons) {
    IG.wdow = d.createElement('button')
    IG.play = d.createElement('button')
    IG.wdow.setAttribute('aria-label', 'Download')
    IG.play.setAttribute('aria-label', 'Play')
    IG.foot = d.createElement('div')
    IG.alts = d.createElement('div')
    IG.onow = d.createElement('div')
    IG.fine = d.createElement('div')
    IG.down = d.createElement('span')
    IG.foot.id = 'foot7'
    IG.onow.id = 'onow7'
    IG.down.id = 'down7'
    IG.wdow.id = 'wdow7'
    IG.fine.id = 'stat7'
    IG.onow.appendChild(IG.alts).id = 'alts7'
    IG.imag.appendChild(IG.foot).appendChild(IG.play).id = 'play7'
    IG.imag.appendChild(IG.onow).appendChild(IG.wdow).appendChild(IG.down)
    IG.foot.appendChild(IG.fine)
  }
  // append document fragment to <body>
  d.body.appendChild(IG.frag)

  // autoplay method
  IG.autoPlay = function () {
    if (this.isAutoplayOn) {
      this.clear()
    } else {
      if (IG.showButtons) {
        this.play.className = 'acts7'
        this.setActiveClass.call(this.play)
      }
      this.isAutoplayOn = true
      this.loaded.call(this.imgs)
    }
  }

  // autoplay method loop
  IG.autoPlayLoop = function () {
    this.timeOutVar = setTimeout(function () {
      this.right().show()
      if (this.indexOfImage === this.imagesArray.length - 1) this.clear()
    }.bind(this), this.timer)
  }

  // image is loaded method
  IG.loaded = function () {
    this.onload = loadComplete.bind(this)
    const src = this
    this.src = src.src
  }

  // clear method to reset all values
  IG.clear = function () {
    clearTimeout(this.timeOutVar)
    this.timeOutVar = 0
    this.isAutoplayOn = false
    this.showButtons && this.play.classList.remove('acts7')
    this.hideButtons()
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
    this.onow.dataset.selected = this.imgs.src.split('/').pop()
  }

  // to left button method loop from images index
  IG.lefts = function () {
    if (this.indexOfImage > 0) this.indexOfImage--
    else this.indexOfImage = this.imagesArray.length - 1
    !this.isAutoplayOn && this.setActiveClass.call(this.ilef)
    return this
  }

  // to right button method loop from images index
  IG.right = function () {
    if (this.indexOfImage < this.imagesArray.length - 1) this.indexOfImage++
    else this.indexOfImage = 0
    !this.isAutoplayOn && this.setActiveClass.call(this.irig)
    return this
  }

  // function on close
  IG.close = function () {
    this.clear()
    this.isActive = false
    this.imag.className = 'hide7'
    d.body.style.overflow = 'visible'
    d.getElementsByTagName('html')[0].style.overflow = 'visible'
  }

  // add class for button animation (when clicked)
  IG.setActiveClass = function () {
    if (typeof this !== 'undefined') {
      this.classList.add('focu7')
      setTimeout(function () {
        this.classList.remove('focu7')
      }.bind(this), 150)
    }
  }
  // Hide buttons on autoplay
  IG.hideButtons = function () {
    if (this.isAutoplayOn && this.hideButtonsOnPlay) {
      this.left.className = this.rigt.className = this.clos.className = 'hide7'
      if (this.showButtons) this.foot.className = this.onow.className = 'hide7'
    } else {
      this.clos.className = ''
      if (this.showButtons) this.foot.className = this.onow.className = ''
    }
    if (!this.isAutoplayOn || !this.hideButtonsOnPlay) {
      this.left.className = this.indexOfImage === 0 ? 'hide7' : ''
      this.rigt.className = this.indexOfImage === this.imagesArray.length - 1 ? 'hide7' : ''
    }
  }

  // show image method to show image when loaded
  IG.show = function () {
    // if null is set as index return false
    if (this.indexOfImage < 0) return false
    // if image exist remove and later recreate it
    this.isLoadedImage && this.insi.removeChild(this.insi.firstChild)
    // don't rewrite values if active and set active gallery
    if (!this.isActive) {
      this.isActive = true
      d.body.style.overflow = 'hidden'
      d.getElementsByTagName('html')[0].style.overflow = 'hidden'
      this.imag.className = ''
      this.imag.focus()
    }
    this.isLoadedImage = true
    this.imgs = d.createElement('img')
    this.insi.appendChild(this.imgs)
    this.loaded.call(this.imgs)
    this.insi.appendChild(this.imgs)
    this.insi.className = 'spin7'
    const image = this.imagesArray[this.indexOfImage]
    this.imgs.setAttribute('alt', image.getAttribute('alt'))
    this.hideButtons()
    if (this.showButtons) {
      this.alts.innerText = decodeURI(image.src.slice(image.src.lastIndexOf('/') + 1))
      this.fine.innerText = Number(this.indexOfImage) + 1 + '/' + this.imagesArray.length
    }

    // get image src file name
    const fileName = image.src.split('/').pop()
    setTimeout(function () {
      // if there is no big image return small image src
      this.imgs.onerror = function (e) {
        e.target.src = image.src
      }
      // if image src === svg return that image.src else try to load big image src
      this.imgs.src = 'svg' === image.src.substr(image.src.length-3) ? image.src : image.src.replace(fileName, this.folder + fileName)
    }.bind(this), 0)
  }

  // asign container elements or BODY (default = BODY)
  IG.container = d.getElementsByClassName(IG.imageContainer).length > 0
    ? d.getElementsByClassName(IG.imageContainer)
    : d.getElementsByTagName('body')
  for (let l = IG.container.length - 1; l >= 0; l--) {
    IG.containersArray.push(IG.container[l])
  }

  // Loop from elements and add to array
  for (let i = IG.containersArray.length - 1; i >= 0; i--) {
    const img = IG.containersArray[i].getElementsByTagName('img')
    for (let j = 0; j < img.length; j++) {
      // this always overwrite parent class name if same parent
      // if (!img[j].parentElement.classList.contains('spin7'))
      img[j].parentElement.classList.add('spin7')
      IG.loaded.call(img[j])
      IG.imagesArray.push(img[j])
    }
  }

  // listen for clicked on image element and load show method
  const listenForIG = function listenForIG (e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault()
      e.stopImmediatePropagation()
      IG.indexOfImage = IG.imagesArray.indexOf(e.target) === -1 ? -1 : IG.imagesArray.indexOf(e.target) // set image index on click
      IG.show()
    }
  }

  if (IG.containersArray[0] && IG.containersArray[0].tagName === 'BODY') {
    d.body.addEventListener('click', listenForIG)
  } else {
    for (let k = IG.containersArray.length - 1; k >= 0; k--) {
      IG.containersArray[k].addEventListener('click', listenForIG)
    }
  }

  // autoplay and image loaded helper to remove class 'loader'
  function loadComplete () {
    if (typeof this !== 'undefined' && this.parentElement) {
      this.parentElement.classList.remove('spin7')
      IG.isAutoplayOn && IG.autoPlayLoop()
    }
  }

  // add click addEventListener to image div (gallery window)
  IG.imag.addEventListener('click', function (e) {
    if (!IG.isActive) return false
    if (e.target.id === 'wdow7' && IG.imagesArray[IG.indexOfImage].src.split('/').pop() !== IG.onow.dataset.selected) {
      IG.clear().downloads()
    }
    if (e.target.id === 'cent7' && IG.isAutoplayOn) IG.clear()
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
      if (moveX < 0) IG.clear().right().show()
      else IG.clear().lefts().show()
    }
  }
  IG.imag.addEventListener('touchstart', touchStart, {
    passive: true
  })
  IG.imag.addEventListener('touchend', touchEnd)
  // everything to handle swipe left/right ends
})(window, document)
