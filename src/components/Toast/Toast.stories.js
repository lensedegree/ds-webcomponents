import '../../components/Toast'

export default {
	title: 'Base Components/Notification',
  argTypes: {
		variant: {
			options: ['alert', 'confirmation', 'information', 'reward'],
			control: { type: 'radio' },
		},
		format: {
			options: ['mobile', 'desktop'],
			control: { type: 'radio' },
		},
		message: {
			control: { type: 'text' },
		},
		reward: {
			control: { type: 'number' },
		},
  },
}

export const Toast = ({ variant, format, message, reward }) => `
	<lens-toast
		variant="${variant}"
		format="${format}"
		reward="${reward || 0}"
	>
		${message || 'Mensagem padrão'}
	</lens-toast>
`