const express = require('express')

const app = express()

app.use(express.json())

let books = [
  {
    id: 'B000FCK9D6',
    title: 'Death on the Nile',
    author: 'Agatha Christie',
    description: 'The tranquillity of a cruise along the Nile is shattered by the discovery that Linnet Ridgeway has been shot through the head. She was young, stylish and beautiful, a girl who had everything - until she lost her life. Hercule Poirot recalls an earlier outburst by a fellow passenger: "I&apos;d like to put my dear little pistol against her head and just press the trigger." Yet in this exotic setting, nothing is ever quite what it seems...',
    price: 6.64,
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327955885l/6251565._SX98_.jpg'
  },
  {
    id: 'B000FA675C',
    title: 'The da Vinci Code',
    author: 'Dan Brown',
    description: "As millions of readers around the globe have already discovered, The Da Vinci Code is a reading experience unlike any other. Simultaneously lightning-paced, intelligent, and intricately layered with remarkable research and detail, Dan Brown's novel is a thrilling masterpiece—from its opening pages to its stunning conclusion.",
    price: 1.99,
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328153996l/6192236._SX98_.jpg'
  },
  {
    id: 'B000FBJFSM',
    title: 'Angels & Demons',
    author: 'Dan Brown',
    description: "When world-renowned Harvard symbologist Robert Langdon is summoned to a Swiss research facility to analyze a mysterious symbol -- seared into the chest of a murdered physicist -- he discovers evidence of the unimaginable: the resurgence of an ancient secret brotherhood known as the Illuminati... the most powerful underground organization ever to walk the earth. The Illuminati has surfaced from the shadows to carry out the final phase of its legendary vendetta against its most hated enemy... the Catholic Church.\n Langdon&apos;s worst fears are confirmed on the eve of the Vatican&apos;s holy conclave, when a messenger of the Illuminati announces he has hidden an unstoppable time bomb at the very heart of Vatican City. With the countdown under way, Langdon jets to Rome to join forces with Vittoria Vetra, a beautiful and mysterious Italian scientist, to assist the Vatican in a desperate bid for survival. Embarking on a frantic hunt through sealed crypts, dangerous catacombs, deserted cathedrals, and even to the heart of the most secretive vault on earth, Langdon and Vetra follow a 400-year old trail of ancient symbols that snakes across Rome toward the long-forgotten Illuminati lair... a secret location that contains the only hope for Vatican salvation.",
    price: 1.99,
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1228190952l/873884._SX98_.jpg'
  },
  {
    id: 'B000OZ0NXA',
    title: 'Killing Floor',
    author: 'Lee Child',
    description: 'Ex-military policeman Jack Reacher is a drifter. He’s just passing through Margrave, Georgia, and in less than an hour, he’s arrested for murder. Not much of a welcome. All Reacher knows is that he didn’t kill anybody. At least not here. Not lately. But he doesn’t stand a chance of convincing anyone. Not in Margrave, Georgia. Not a chance in hell.',
    price: 4.99,
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1526088782l/40105393._SY160_.jpg'
  },
  {
    id: 'B0036S4CWA',
    title: '61 Hours',
    author: 'Lee Child',
    description: "A bus crashes in a savage snowstorm and lands Jack Reacher in the middle of a deadly confrontation. In nearby Bolton, South Dakota, one brave woman is standing up for justice in a small town threatened by sinister forces. If she’s going to live long enough to testify, she’ll need help. Because a killer is coming to Bolton, a coldly proficient assassin who never misses. Reacher’s original plan was to keep on moving. But the next 61 hours will change everything. The secrets are deadlier and his enemies are stronger than he could have guessed—but so is the woman he'll risk his life to save.",
    price: 2.99,
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1516596132l/38119515._SY160_.jpg'
  },
  {
    id: 'B00B0LP48G',
    title: 'Never Go Back',
    author: 'Lee Child',
    description: "Former military cop Jack Reacher makes it all the way from snowbound South Dakota to his destination in northeastern Virginia, near Washington, D.C.: the headquarters of his old unit, the 110th MP. The old stone building is the closest thing to a home he ever had.\n Reacher is there to meet—in person—the new commanding officer, Major Susan Turner, so far just a warm, intriguing voice on the phone.\n But it isn’t Turner behind the CO’s desk. And Reacher is hit with two pieces of shocking news, one with serious criminal consequences, and one too personal to even think about.\n When threatened, you can run or fight.\n Reacher fights, aiming to find Turner and clear his name, barely a step ahead of the army, and the FBI, and the D.C. Metro police, and four unidentified thugs.\n Combining an intricate puzzle of a plot and an exciting chase for truth and justice, Lee Child puts Reacher through his paces—and makes him question who he is, what he’s done, and the very future of his untethered life on the open road.",
    price: 1.99,
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1556681769l/45420919._SY160_.jpg'
  }
]

app.get('/books', (req, res) => res.json(books))

app.get('/books/:id', (req, res) => {
  const {id} = req.params
  const book = books.find(book => book.id === id)
  if (book) return res.json(book)
  res.status(400).send()
})

app.post('/books/new', (req, res) => {
  const {book} = req.body
  let exists = books.some(bookFromArray => bookFromArray.id === book.id)

  if (exists) return res.status(400).json({ok: false})

  books.push(book)

  res.json(book)
})

app.post('/books/:id', (req, res) => {
  const {id} = req.params
  const {book: updatedBook} = req.body

  books = books.map(book => (book.id === id ? updatedBook : book))

  res.json(books.find(book => book.id === id))
})

app.delete('/books/:id', (req, res) => {
  const {id} = req.params

  let exists = books.some(book => book.id === id)
  if (!exists) return res.status(400).json({ok: false})

  books.splice(books.findIndex(i => i.id === id), 1)
  res.json(books)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
