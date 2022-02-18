import '../../components/Input'

export default {
	title: 'Base Components/Input',
  argTypes: {
		variant: {
			options: ['email', 'name', 'password', 'phone', 'search', 'text'],
			control: { type: 'select' },
		},
		disable: {
			control: { type: 'boolean' },
		},
		content: {
			control: { type: 'text' },
		},
		placeholder: {
			control: { type: 'text' },
		},
		error: {
			control: { type: 'boolean' },
		},
		messageText: {
			control: { type: 'text' },
		},
  },
}

export const BasicInput = ({ 
	variant,
	disable,
	content, 
	placeholder, 
	error,
	messageText
}) => `
	<lens-input
		variant="${variant}"
		disable="${disable}"
		placeholder="${placeholder || ''}"
		value="${content || ''}"
		${error ? 'error' : ''}
		info="${messageText || ''}"
	></lens-input>
`