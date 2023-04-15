import pageediting from '../pageediting/pageediting.methods'
import scraping from '../scraping/scraping.methods'
import { translate } from '../translating/translating.methods'


const pickNewWord = async () => {
    const paragraphs = scraping.getVisibleParagraphsOnPage()
    const text = scraping.combineElementText(paragraphs)
    const words = await scraping.removeUselessWords(text)

    console.log(words)
    const randomWord = words[Math.floor(Math.random()*words.length)]
    console.log(randomWord)
    const translatedWord = await translate(randomWord)
    console.log(translatedWord)
    const replacementMappings = pageediting.getReplacementMapping([translatedWord])
    pageediting.replaceWords(replacementMappings, paragraphs)
}


pickNewWord()