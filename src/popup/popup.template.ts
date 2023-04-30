export default class PopupTemplates {
    closeButton: HTMLButtonElement
    translationView: HTMLElement
    mainView: HTMLElement

    constructor(id:string) {
        this.mainView = document.createElement("article")
        this.#mainView()
        
        this.closeButton = document.createElement("button")
        this.#setupCloseButton(id)

        this.translationView = document.createElement("article")
    }

    #setupCloseButton(id: string) {
        this.closeButton.innerText = "&times;"
        this.closeButton.setAttribute("class", "thl-close")
        this.closeButton.setAttribute("id", id)
    }

    #mainView() {
        const translationButtonContent = document.createTextNode("view translation")
        const translationButton = document.createElement("button")
        translationButton.setAttribute("class", "thl-popup-word")
        translationButton.append(translationButtonContent)
        
        this.mainView.setAttribute("class", "thl-popup")
        this.mainView.append(translationButton)
    }
}