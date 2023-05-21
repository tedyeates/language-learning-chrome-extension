import marktext from '../marktext/marktextmethods'
import popup from '../popup/popup.methods'
import scraping from '../scraping/scraping.methods'
import { getLearntWords } from '../store/store.methods'
import { Word } from '../store/store.types'
import { translate } from '../translating/translating.methods'


const pickNewWord = async () => {
    const paragraphs = scraping.getVisibleParagraphsOnPage()
    const text = scraping.combineElementText(paragraphs)
    const words = await scraping.removeUselessWords(text)

    const randomWord = words[Math.floor(Math.random()*words.length)]
    console.log("random word: " + randomWord)
    const translatedWord = await translate(randomWord)

    const learntWords = await getLearntWords()
    const wordsToMark = [
        translatedWord.value, 
        ...learntWords.map((word:Word) => word.value)
    ]
    console.log(`translated word: ${JSON.stringify(translatedWord)}`)
    marktext.markAllTextForTranslation(wordsToMark, paragraphs)

    popup.addInformationPopups([translatedWord, ...learntWords])
}


pickNewWord()