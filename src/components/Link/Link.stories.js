import '../../components/Link'

export default {
	title: 'Base Components/Link',
  argTypes: {
		variant: {
			options: ['basic', 'danger'],
			control: { type: 'radio' },
		},
		size: {
			options: ['small', 'medium', 'large'],
			control: { type: 'radio' },
		},
		content: {
			control: { type: 'text' },
		},
  },
}

export const Link = ({ variant, size, content }) => `
	<lens-link
		variant="${variant}"
		size="${size}"
	>${content || 'Link'}</lens-link>
`