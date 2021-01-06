// var arr = Array.from(document.querySelector('.noteTextViewer').contentWindow.document.querySelectorAll('div[class$="-editable"]')).filter(ele => { return ele.innerText.includes('****') })



// *********************
// ****** ADD SEARCH TO BOTTOM + SCROLL INTO VIEW ****** //
// *********************


function clearStars() {
  Array.from(document.querySelector('.noteTextViewer').contentWindow.document.querySelector('#rendered-md').children).forEach(ele => { ele.style.display = 'block' })
}


function focusStars(searchStars) {
  var page_content = document.querySelector('.noteTextViewer').contentWindow.document.querySelector('#rendered-md')
  var eles = page_content.children

  // hide everything
  let display_indexes = []

  // for each ele
  for (let i = 0; i < eles.length; i++) {
    let ele = eles[i]

    // skip evaluating table of contents
    if (ele.className === 'table-of-contents') {
      console.log('found TOC -- skipping')
      continue
    }

    let starMatches = ele.innerText.match(/(\d?)+\*{3,}(\d?)+/g) || []
    let starMatches_stars_only = starMatches.map(match => { return match.match(/\*{3,}/g) })[0] || []

    
    // no stars found, hide ele if necessary and break out of loop
    let allStars = searchStars == '*'
    
    /// FIX THIS HERE
    if (allStars) {
      if (starMatches.length == 0) {
        !display_indexes.includes(i) ? ele.style.display = 'none' : ele.style.display = 'block'
        continue
      }
    } else {
      if (starMatches.length == 0 || !starMatches_stars_only.includes(searchStars)) {
        !display_indexes.includes(i) ? ele.style.display = 'none' : ele.style.display = 'block'
        continue
      }
    }
    

    /* stars found */
    let beforeNum = Math.max.apply(Math, starMatches.map(val => { return parseInt(val.split('*')[0]) || 0 }))
    let afterNum = Math.max.apply(Math, starMatches.map(val => { return parseInt(val.split('*').slice(-1)[0]) || 0 }))
    
    // walk up parents to redisplay relavent header and sub_header
    showHeaders(ele)

    // redisplay previous blocks
    for (let b = 0; b <= beforeNum; b++)
      eles[i-b].style.display = 'block'

    // push to array indexes to not hide
    for (let a = 0; a <= afterNum; a++)
      display_indexes.push(i+a)

    
  }

  // reshow if they are hidden
  display_indexes.forEach(i => { eles[i].style.display = 'block' })

  function showHeaders(ele, hasFoundHeader = false, hasFoundSubHeader = false) {
    if (!ele.previousElementSibling)
      return
    // header
    if (ele.previousElementSibling.tagName == "H1" && !hasFoundHeader) {
      ele.previousElementSibling.style.display = 'block'
      hasFoundHeader = true
    }
    
    // sub_header
    if (ele.previousElementSibling.tagName == "H2" && !hasFoundSubHeader) {
      ele.previousElementSibling.style.display = 'block'
      hasFoundSubHeader = true
    } 

    if (!hasFoundHeader || !hasFoundSubHeader)
      showHeaders(ele.previousElementSibling, hasFoundHeader, hasFoundSubHeader)
  }
}








/* STARS BUTTON FUNCTIONS */
function createStarsButtons() {
  if (document.querySelector('#my_stars_button'))
    return


  var attach_ele = document.querySelector('.rli-editor').children[0].children[0].children[0].children[0]


  var button = document.createElement('button')
  button.id = 'my_stars_button'
  button.textContent = '3 stars'
  button.onclick = () => { focusStars('***'); resetCustomSearch() }
  attach_ele.appendChild(button)

  var button = document.createElement('button')
  button.textContent = '4 stars'
  button.onclick = () => { focusStars('****'); resetCustomSearch() }
  attach_ele.appendChild(button)

  var button = document.createElement('button')
  button.textContent = 'All Stars'
  button.onclick = () => { focusStars('*'); resetCustomSearch() }
  attach_ele.appendChild(button)

  var button = document.createElement('button')
  button.textContent = 'Clear Stars'
  button.onclick = () => { clearStars(); resetCustomSearch() }
  attach_ele.appendChild(button)
}




function resetCustomSearch() {
  var search_input = document.querySelector('.rli-editor').querySelector('[placeholder="Search..."]')
  
  window.mysearch_index = 0 
  window.mysearch_items = Array.from(document.querySelector('.noteTextViewer').contentWindow.document.querySelector('#rendered-md').children).filter(ele => { return ele.innerText.includes(search_input.value) && ele.style.display != 'none' })
  document.querySelector('#search_index').innerText = (window.mysearch_index + 1) + ' / ' + window.mysearch_items.length
}

// *********************
// ****** ADD SEARCH TO BOTTOM + SCROLL INTO VIEW ****** //
// *********************

function createSearchButtons() {
    /// append next/prev buttons
    var search_input = document.querySelector('.rli-editor').querySelector('[placeholder="Search..."]')
  
    if (search_input && search_input.id !== 'testing') {
      search_input.id = 'testing'

      // add event listener on input to collect items to jump to
      search_input.onchange = () => { 
        resetCustomSearch()
      }
    
    
      // jump to prev button
      var btn = document.createElement('button')
      btn.textContent = 'prev'
      btn.onclick = () => {
        if (window.mysearch_index > 0)
          window.mysearch_index--
        else 
          window.mysearch_index = window.mysearch_items.length - 1
        document.querySelector('#search_index').innerText = (window.mysearch_index + 1)  + ' / ' + window.mysearch_items.length
        window.mysearch_items[window.mysearch_index].scrollIntoView()
      }
      search_input.parentElement.appendChild(btn)
    
    
      // jump to next button
      var btn = document.createElement('button')
      btn.textContent = 'next'
      btn.onclick = () => {
        if (window.mysearch_index < window.mysearch_items.length - 1)
          window.mysearch_index++
        else 
          window.mysearch_index = 0
        document.querySelector('#search_index').innerText = (window.mysearch_index + 1)  + ' / ' + window.mysearch_items.length
        window.mysearch_items[window.mysearch_index].scrollIntoView()
      }
      search_input.parentElement.appendChild(btn)


      // jump to next button
      var span = document.createElement('span')
      span.id = 'search_index'
      search_input.parentElement.appendChild(span)
    }
}


// *********************
// ****** MAIN LOOP
// *********************

setInterval(
  () => {
    if (document.querySelector('.rli-editor')) {
      createStarsButtons()

      createSearchButtons()
    }
}, 1500);

