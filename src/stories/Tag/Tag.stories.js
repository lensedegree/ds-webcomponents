import '../../components/Tag'

export default {
	title: 'Base Components/Tag',
	argTypes: {
		variant: {
			options: ['selection', 'filter'],
			control: { type: 'radio' },
		},
		content: {
			control: { type: 'text' },
		}
	},
	decorators: [(story) => `
		<div>
			${story()}
			<p>DS-CSS já foi atualizado para a classe 'tag' ao invés de 'tags'</p>
		</div>
	`],
}

export const Tag = ({ variant, content }) => `
	<lens-tag
		variant="${variant}"
	>
		${content || 'Tag'}
	</lens-tag>
`