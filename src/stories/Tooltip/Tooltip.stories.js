import '../../components/Tooltip'

export default {
	title: 'Base Components/Tooltip',
	argTypes: {
		variant: {
			options: ['definition', 'click'],
			control: { type: 'radio' },
		},
		linkText: {
			control: { type: 'text' },
		},
		content: {
			control: { type: 'text' },
		}
	},
	decorators: [(story) => {
		console.log(story.variant)
		return `
			<div style="
				display: flex;
				flex-direction: column;
				align-items: center;
			">
				<span class="material-icons md-20">
					info
					<style>
						.material-icons.md-20 {
							font-size: 20px;
							color: #959595;
						}
					</style>
				</span>
				${story()}
			</div>
		`
	}],
}

/* TODO: Testar melhor, com outros botões */

const defaultContent = 'Esse é um tooltip de definição, é o mais comum dentre eles.'

export const Tooltip = ({ variant, linkText, content }) => `
	<lens-tooltip
		variant="${variant || 'definition'}"
		linkText="${linkText || ''}"
	>
		${content || defaultContent}
	</lens-tooltip>
`