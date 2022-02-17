import '../../components/IconShape'

class Pagination extends HTMLElement {
	constructor() {
    super()

		this.setPage = this.setPage.bind(this)

		if(!this.root) {
			this._root = this.attachShadow({ mode: 'open' })
			this._header()
		}
		
		if(!this._container) {
			this._container = document.createElement('div')
		}
  }

	_header() {
		let linkNeueHaasUnica = document.createElement('link')
		linkNeueHaasUnica.setAttribute('rel', 'stylesheet')
		linkNeueHaasUnica.setAttribute('href', 'https://use.typekit.net/vpa4dxb.css')
		this._root.appendChild(linkNeueHaasUnica)

		let linkMaterialIcons = document.createElement('link')
		linkMaterialIcons.setAttribute('rel', 'stylesheet')
		linkMaterialIcons.setAttribute('href', 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp')
		this._root.appendChild(linkMaterialIcons)

		let linkDSCSS = document.createElement('link')
		linkDSCSS.setAttribute('rel', 'stylesheet')
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@lensedegree/ds-css/src/components/Pagination/index.css')
		this._root.appendChild(linkDSCSS)

		let linkIconShapeCSS = document.createElement('link')
		linkIconShapeCSS.setAttribute('rel', 'stylesheet')
		linkIconShapeCSS.setAttribute('href', 'https://unpkg.com/@lensedegree/ds-css/src/components/IconShape/index.css')
		this._root.appendChild(linkIconShapeCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'basic':
					this.variant = 'basic'
					break
				case 'extended':
					this.variant = 'extended'
					break
				default:
					this.variant = 'default'
					break
			}
		}

		if(!this.nPages) {
			this.nPages = Number(this.getAttribute('nPages')) || 0
			if(this.nPages < 2) {
				this.nPages = 2
			}
		}

		if(!this.activePage) {
			this.activePage = Number(this.getAttribute('activePage')) || 1
			if (this.activePage < 1) {
				this.activePage = 1
			} else if (this.activePage > this.nPages) {
				this.activePage = this.nPages
			}
		}

		this._render({ initial: true })
	}

	_render({ initial = false }) {
		if (!initial) {
			this._root.removeChild(this._container)
			this._container.innerHTML = ``
		}

		if(this.variant === 'basic') {
			this._renderBasic()
		} else if(this.variant === 'extended') {
			this._renderExtended()
		} else {
			this._renderDefault()
		}

		this._root.appendChild(this._container)
	}

	_renderDefault() {
		this._container.className = [
			`pagination`,
			`variant--default`
		].join(' ')

		const backIconShape = document.createElement('div')
		backIconShape.className = [
			`icon-shape`,
			`shape--circle`,
			`size--medium`,
			`variant--outlined`,
		].join(' ')
		backIconShape.innerHTML = `
			<span class="material-icons-outlined md-24">
				arrow_back
				<style>
					.material-icons-outlined.md-24 {
						font-size: 24px;
					}
				</style>
			</span>
		`
		backIconShape.onclick = () => { this.setPage(this.activePage - 1) }
		this._container.appendChild(backIconShape)

		const forwardIconShape = document.createElement('div')
		forwardIconShape.className = [
			`icon-shape`,
			`shape--circle`,
			`size--medium`,
			`variant--outlined`,
		].join(' ')
		forwardIconShape.innerHTML = `
			<span class="material-icons-outlined md-24">
				arrow_forward
				<style>
					.material-icons-outlined.md-24 {
						font-size: 24px;
					}
				</style>
			</span>
		`
		forwardIconShape.onclick = () => { this.setPage(this.activePage + 1) }
		this._container.appendChild(forwardIconShape)
	}

	_renderBasic() {
		/* FIXME: O dígito 1 tira o foco do input */
		/* FIXME: Esse tipo de paginação não têm botão de 'enviar' */
		this._container.className = [
			`pagination`,
			`variant--basic`
		].join(' ')

		const backButton = document.createElement('div')
		const backIcon = document.createElement('span')
		backButton.appendChild(backIcon)
		backButton.onclick = () => { this.setPage(this.activePage - 1) }
		this._container.appendChild(backButton)

		const inputContainer = document.createElement('div')
		const input = document.createElement('input')
		input.setAttribute('value', this.activePage)
		inputContainer.appendChild(input)
		this._container.appendChild(inputContainer)

		const pageContainer = document.createElement('div')
		const page = document.createElement('p')
		page.innerText = `de ${this.nPages}`
		pageContainer.appendChild(page)
		this._container.appendChild(pageContainer)

		const forwardButton = document.createElement('div')
		const forwardIcon = document.createElement('span')
		forwardButton.appendChild(forwardIcon)
		forwardButton.onclick = () => { this.setPage(this.activePage + 1) }
		this._container.appendChild(forwardButton)
	}

	_renderExtended() {
		this._container.className = [
			`pagination`,
			`variant--extended`
		].join(' ')

		const backButton = document.createElement('div')
		const backIcon = document.createElement('span')
		backButton.appendChild(backIcon)
		backButton.onclick = () => { this.setPage(this.activePage - 1) }
		this._container.appendChild(backButton)

		const pagesContainer = document.createElement('div')
	
		if(this.nPages < 7) {
			for(let i = 0; i < this.nPages; i++) {
				const page = document.createElement('div')
				page.className = this.activePage === (i + 1) ? 'active' : 'deactive'
				page.innerText = `${i + 1}`
				if(this.activePage !== (i + 1)) {
					page.onclick = () => { this.setPage(i + 1) }
				}
				pagesContainer.appendChild(page)
			}
		} else if(this.activePage < 4) {
			for(let i = 0; i < 5; i++) {
				const page = document.createElement('div')
				page.className = this.activePage === (i + 1) ? 'active' : 'deactive'
				page.innerText = `${i + 1}`
				if(this.activePage !== (i + 1)) {
					page.onclick = () => { this.setPage(i + 1) }
				}
				pagesContainer.appendChild(page)
			}

			const horiz = document.createElement('div')
			horiz.className = 'horiz'
			const horizIcon = document.createElement('span')
			horiz.appendChild(horizIcon)
			pagesContainer.appendChild(horiz)

			const lastPage = document.createElement('div')
			lastPage.className = 'deactive'
			lastPage.innerText = `${this.nPages}`
			lastPage.onclick = () => { this.setPage(this.nPages) }
			pagesContainer.appendChild(lastPage)
		} else if(this.activePage < this.nPages - 2) {
			const firstPage = document.createElement('div')
			firstPage.className = 'deactive'
			firstPage.innerText = `1`
			firstPage.onclick = () => { this.setPage(1) }
			pagesContainer.appendChild(firstPage)

			const firstHoriz = document.createElement('div')
			firstHoriz.className = 'horiz'
			const firstHorizIcon = document.createElement('span')
			firstHoriz.appendChild(firstHorizIcon)
			pagesContainer.appendChild(firstHoriz)

			for(let i = this.activePage - 1; i <= this.activePage + 1; i++) {
				const page = document.createElement('div')
				page.className = this.activePage === i ? 'active' : 'deactive'
				page.innerText = `${i}`
				if(this.activePage !== i) {
					page.onclick = () => { this.setPage(i) }
				}
				pagesContainer.appendChild(page)
			}

			const lastHoriz = document.createElement('div')
			lastHoriz.className = 'horiz'
			const lastHorizIcon = document.createElement('span')
			lastHoriz.appendChild(lastHorizIcon)
			pagesContainer.appendChild(lastHoriz)

			const lastPage = document.createElement('div')
			lastPage.className = 'deactive'
			lastPage.innerText = `${this.nPages}`
			lastPage.onclick = () => { this.setPage(this.nPages) }
			pagesContainer.appendChild(lastPage)
		} else {
			const firstPage = document.createElement('div')
			firstPage.className = 'deactive'
			firstPage.innerText = `1`
			firstPage.onclick = () => { this.setPage(1) }
			pagesContainer.appendChild(firstPage)

			const firstHoriz = document.createElement('div')
			firstHoriz.className = 'horiz'
			const firstHorizIcon = document.createElement('span')
			firstHoriz.appendChild(firstHorizIcon)
			pagesContainer.appendChild(firstHoriz)

			for(let i = this.nPages - 4; i <= this.nPages; i++) {
				const page = document.createElement('div')
				page.className = i === this.activePage ? 'active' : 'deactive'
				page.innerText = `${i}`
				if(this.activePage !== i) {
					page.onclick = () => { this.setPage(i) }
				}
				pagesContainer.appendChild(page)
			}
		}

		this._container.appendChild(pagesContainer)

		const forwardButton = document.createElement('div')
		const forwardIcon = document.createElement('span')
		forwardButton.appendChild(forwardIcon)
		forwardButton.onclick = () => { this.setPage(this.activePage + 1) }
		this._container.appendChild(forwardButton)

		if(this.nPages >= 7) {
			/* FIXME: O dígito 1 tira o foco do input */
			const inputContainer = document.createElement('div')
			const input = document.createElement('input')
			inputContainer.appendChild(input)
			const inputIcon = document.createElement('span')
			inputIcon.onclick = () => {
				this.setPage(input.value)
			}
			inputContainer.appendChild(inputIcon)
			this._container.appendChild(inputContainer)
		}
	}

	setPage(pageNumber) {
		if(+pageNumber < 1) {
			this.activePage = 1
		} else if (+pageNumber > this.nPages) {
			this.activePage = this.nPages
		} else {
			this.activePage = +pageNumber
		}

		this._render({})
	}
}

customElements.define('lens-pagination', Pagination)