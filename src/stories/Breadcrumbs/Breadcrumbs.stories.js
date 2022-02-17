import '../../components/Breadcrumbs/index.js'

export default {
	title: 'Base components/Breadcrumbs',
	argTypes: {
		variant: {
			options: ['primary', 'secundary'],
			control: { type: 'radio' },
		},
	},
}

export const Breadcrumbs = ({ variant }) => `
	<lens-breadcrumbs
		variant='${variant}'
	>
		<a>Breadcrumb 1</a>
		<a href="#">Breadcrumb 2</a>
		<a>Breadcrumb 3</a>
	</lens-breadcrumbs>
`