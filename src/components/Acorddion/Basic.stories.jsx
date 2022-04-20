import '../../components/Acorddion/'

export default {
	title: 'Base Components/Acorddion',
	argTypes: {
		active: {
			options: ['false', 'true'],
			control: { type: 'boolean' },
		},
		size: {
			options: ['tiny', 'normal'],
			control: { type: 'radio' },
		},
	},
}

const title = `Qual é a diferença entre a Maratona Guidelines e o Grid`
const body = `O acordeão oferece grandes quantidades de conteúdo em um pequeno espaço 
por meio de divulgação progressiva.`

export const Basic = ({ active, size }) => `
  <lens-acorddion
		size="${size}"
		${active ? 'active': ''}
    title="${title}"
  >${body}</lens-acorddion>
`
