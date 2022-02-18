class Tabs extends HTMLElement {
	constructor() {
    super()

		this.toggleTab = this.toggleTab.bind(this)

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
		linkDSCSS.setAttribute('href', 'https://unpkg.com/@overlens/ds-css/src/components/Tabs/index.css')
		this._root.appendChild(linkDSCSS)
	}

	connectedCallback() {
		if(!this.variant) {
			switch (this.getAttribute('variant')) {
				case 'container':
					this.variant = 'container'
					break
				default:
					this.variant = 'default'
					break
			}
		}

		if(!this.activeTab) {
			this.activeTab = 0
		}
		
		if(!this.tabsContent) {
			this.tabsContent = []
			let idx = 0
			for(let child of this.children) {
				this.tabsContent.push({
					title: child.getAttribute('title') || 'Adicione um título à tag',
					active: child.getAttribute('active') === ''
						|| child.getAttribute('active') === 'true' 
							? true 
							: false,
					content: child.innerHTML || '<p>Adicione um conteúdo à tag</p>'
				})

				if(
					child.getAttribute('active') === ''
					|| child.getAttribute('active') === 'true'
				) {
					this.activeTab = idx
				}
				
				idx += 1
			}
		}

		this._container.className = [
			'tabs',
			`variant--${this.variant}`
		].join(' ')

		this._render({ initial: true })
	}

	_render({ initial = false }) {
		if (!initial) {
			this._root.removeChild(this._container)
			this._container.innerHTML = ``
		}

		this._renderTabs()
		this._renderContent()

		this._root.appendChild(this._container)
	}

	_renderTabs() {
		const tabsContainer = document.createElement('div')
		tabsContainer.className = 'tabs-header'

		this.tabsContent.forEach((tabContent, idx) => {
			const tab = document.createElement('div')
			tab.className = `${ this.activeTab === idx ? 'active' : 'deactive' }`
			tab.innerText = tabContent.title
			tab.onclick = () => { this.toggleTab(idx) }

			tabsContainer.appendChild(tab)
		});

		this._container.appendChild(tabsContainer)
	}

	_renderContent() {
		const contentContainer = document.createElement('div')
		contentContainer.className = 'tabs-content'
		contentContainer.innerHTML = this.tabsContent[this.activeTab].content;

		this._container.appendChild(contentContainer)
	}

	toggleTab = (idx) => {
		this.activeTab = idx
		this._render({})
	}
}

customElements.define('lens-tabs', Tabs)