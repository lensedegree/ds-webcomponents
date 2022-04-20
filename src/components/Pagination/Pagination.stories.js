import '../../components/Pagination'

export default {
	title: 'Base Components/Pagination',
	argTypes: {
		variant: {
			options: ['default', 'basic', 'extended'],
			control: { type: 'radio' },
		},
		page: {
			control: { type: 'number' },
		},
		nPages: {
			control: { type: 'number' },
		},
	},
	decorators: [(story) => `
		<div>
			${story()}
			<p>
				<b>OBS.: </b>
				A variant 'basic' do componente ainda não está funcional
				(Falta configurar a utilização do input)
			</p>
		</div>
	`],
}

export const Pagination = ({ variant, page, nPages }) => `
	<lens-pagination
		variant="${variant}"
		activePage="${page}"
		nPages="${nPages}"
	></lens-pagination>
`
