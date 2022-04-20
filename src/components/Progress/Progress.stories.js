import '../../components/Progress'

export default {
	title: 'Base Components/Progress',
	argTypes: {
		variant: {
			options: ['mobile', 'desktop'],
			control: { type: 'radio' },
		},
		step: {
			control: { type: 'number' },
		},
		error: {
			control: { type: 'boolean' },
		}
	},
	decorators: [(story) => `
		<div>
			${story()}
			<p>TODO</p>
		</div>
	`],
}

/* TODO */

export const ProgressIndicator = ({ variant, step, error }) => `
	<lens-progress
		variant="${variant}"
		step="${step}"
		${ error ? 'error' : '' }
	>
		<div>Primeiro passo</div>
		<div>Segundo passo</div>
		<div>Terceiro passo</div>
		<div>Quarto passo</div>
		<div>Quinto passo</div>
	</lens-progress>
`