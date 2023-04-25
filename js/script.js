(function (w,d) {

  d.addEventListener('DOMContentLoaded', function(e){
    d.documentElement.lang = navigator.language === 'lt' ? 'lt' : 'en-US'
    d.title = d.documentElement.lang === 'lt' ? 'Burundukas' : 'Chipmunk'

    const ext = d.createElement('script')
    ext.setAttribute('defer', 'defer')
    ext.setAttribute('src', './js/gall7.min.js')
    d.head.appendChild(ext)
    // d.querySelector('#kmenu > ul.nav.navbar-nav.navbar-right').innerHTML = '<a data-toggle="collapse" data-target=".navbar-collapse.in" style="background:#3b5998;color:#eee; border-radius:5px; line-height:50px; margin:0 24px; padding:0 6px;" href="https://www.facebook.com/sharer/sharer.php?u=https://kostassliazas.github.io/burundukas.github.io/" rel="nofollow" target="_blank">Share</a>'
    let langue = d.querySelector('#langue')   
    let headimage = d.querySelector('#headImage')
    d.addEventListener('click', function (e) {
      if(e.target.classList.contains('arrowd') || e.target.id === 'headImage')
      headimage.classList.toggle('pause')
    })

    langue.addEventListener('click', function (e) {    
      d.documentElement.lang = d.documentElement.lang === 'lt' ? 'en-US' : 'lt'
      d.title = d.documentElement.lang === 'lt' ? 'Burundukas' : 'Chipmunk'
    })

    d.querySelector('#loader').classList.remove('loader')
  })

})(window,document)


