import '../../components/Textarea'

export default {
	title: 'Base Components/Input',
  argTypes: {
		placeholder: {
			control: { type: 'text' },
		},
		message: {
			control: { type: 'text' },
		},
  },
}

export const Textarea = ({ placeholder, message }) => `
	<lens-textarea
		placeholder="${placeholder ?? ''}"
		message="${message ?? ''}"
	></lens-textarea>
`
