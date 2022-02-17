class Toast extends HTMLElement {
	constructor() {
    super()

		this.closeToast = this.closeToast.bind(this)
		this._renderTimeline = this._renderTimeline.bind(this)

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
		linkMaterialIcons.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons')
		this._root.appendChild(linkMaterialIcons)

		let linkDSCSS = document.createElement('link')
		linkDSCSS.setAttribute('rel', 'stylesheet')
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@lensedegree/ds-css/src/components/Toast/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'confirmation':
					this.variant = 'confirmation'
					break
				case 'information':
					this.variant = 'information'
					break
				case 'reward':
					this.variant = 'reward'
					break
				default:
					this.variant = 'alert'
					break
			}
		}

		if(!this.format) {
			switch (this.getAttribute('format')) {
				case 'mobile':
					this.format = 'mobile'
					break
				default:
					this.format = 'desktop'
					break
			}
		}

		if(!this.reward) {
			this.reward = this.getAttribute('reward') 
				? Number(this.getAttribute('reward'))
				: 0
		}

		if(!this.message) {
			if(this.textContent !== '') {
				this.message = this.textContent.replace(/(\r\n|\n|\r)/gm, "")
			} else {
				this.message = 'Adicione uma mensagem dentro da tag do Toast'
			}
			
			console.log(this.message)
		}
		
		this._container.className = [
			'toast',
			`variant--${this.variant}`,
			`format--${this.format}`
		].join(' ')

		this._render()

		/* FIXME: O Toast de reward também deveria sumir em 5s? */
		setTimeout(this.closeToast, 5000)
	}

	_render() {
		this._renderToast()

		this._renderTimeline()

		this._root.appendChild(this._container)
	}

	_renderToast() {
		const toastContent = document.createElement('span')

		const toastIcon = document.createElement('span')
		toastContent.appendChild(toastIcon)

		const paragraph = document.createTextNode(this.message)
		toastContent.appendChild(paragraph)
		
		const actionContainer = document.createElement('span')
		const acceptAction = document.createElement('span')
		if(this.variant === 'reward') {
			acceptAction.innerText = this.reward > 0 
				? `+${this.reward}`
				: `${this.reward}`
		} else {
			acceptAction.innerText = 'REENVIAR'
		}
		actionContainer.appendChild(acceptAction)

		const closeAction = document.createElement('span')
		closeAction.innerText = 'FECHAR'
		if(this.variant !== 'reward') {
			closeAction.onclick = this.closeToast
		}
		actionContainer.appendChild(closeAction)

		toastContent.appendChild(actionContainer)
		this._container.appendChild(toastContent)

		
	}

	_renderTimeline() {
		const backLine = document.createElement('span')
		this.line = document.createElement('hr')
		backLine.appendChild(this.line)

		this._container.appendChild(backLine)

		const timeLine = document.createElement('span')
		this.line = document.createElement('hr')
		timeLine.appendChild(this.line)

		this._container.appendChild(timeLine)
	}

	closeToast() {
		this.remove()
	}
}

customElements.define('lens-toast', Toast)