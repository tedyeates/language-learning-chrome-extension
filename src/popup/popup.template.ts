import { saveWord } from "../store/store.methods"
import { Word } from "../store/store.types"
import { MainView, TranslationView, View } from "./popup.types"

export default class PopupTemplates {
    closeButton: HTMLElement
    lastView: View | undefined
    currentView: View | undefined

    translationView: TranslationView
    mainView: MainView
    popup: HTMLDivElement

    views: Array<View>

    constructor() {
        this.popup = document.createElement("div")
        this.popup.setAttribute("class", "thl-popup")
        this.mainView = {
            page: document.createElement("article"),
            viewTranslationButton: document.createElement("button")
        }

        this.translationView = {
            page: document.createElement("article")
        }
        this.closeButton = document.createElement("span")
        this.translationView.page.append(this.closeButton)
        console.log(this.translationView.page)
        
        this.views = [this.mainView, this.translationView]
        this.#switchView(this.mainView)
    }


    setupTranslationButton(originalWord: Word) {
        this.mainView.viewTranslationButton.onclick = () => {
            const word = document.createElement("span")
            word.innerText = originalWord.value

            this.#switchView(this.translationView)
            this.#resetView(this.translationView.page, word, true)
            saveWord(originalWord)
        }
    }

    #resetView(
        element:HTMLElement, 
        newContent:HTMLElement, 
        includeClose:boolean=false
    ){
        element.innerHTML = ""
        element.append(newContent)

        if (includeClose) {
            element.append(this.closeButton)
        }
    }
    
    #switchView(newView: View){
        this.#resetView(this.popup, newView.page)
        this.lastView = this.currentView
        this.currentView = newView
    }

    setupCloseButton() {
        this.closeButton.innerHTML = "&times;"
        this.closeButton.setAttribute("class", "thl-close")
        this.closeButton.onclick = () => {
            console.log(this.lastView?.page.innerHTML)
            if (!this.lastView) return
            
            this.#switchView(this.lastView)
        }

    }

    setupMainView() {
        const translationButtonContent = document.createTextNode(
            "view translation"
        )

        this.mainView.viewTranslationButton.setAttribute(
            "class", 
            "thl-popup-word"
        )
        this.mainView.viewTranslationButton.append(translationButtonContent)
        
        this.mainView.page.append(this.mainView.viewTranslationButton)
    }
}