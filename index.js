const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (renderPoem) => {
  //Get poem data
  const {0: { author, lines, title } } = renderPoem
  console.log(renderPoem)
  //Make title
  const poemTitle = makeTag('h2')(title)
  //Make byline
  const byLine = pipe(makeTag('em'), makeTag('h3'))(`by ${author}`)
  //Organize stanzas
  const poemLines = lines.join('<br>').split('<br><br>')
  const poemStanzas = poemLines.map(stanza => makeTag('p')(stanza.split('<br>').join('<br>')))
  //Display poem
  return `${poemTitle}${byLine}${poemStanzas.join('')}`
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
