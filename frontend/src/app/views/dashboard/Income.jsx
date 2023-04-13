import {
	Button,
	Dialog,
	Modal,
	TextField,
	styled,
	useTheme,
} from '@mui/material';
import { useState } from 'react';
import DollarCard from 'app/components/DollarCard';
import { Add } from '@mui/icons-material';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';

const ContentBox = styled('div')(({ theme }) => ({
	margin: '30px',
	[theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
	fontSize: '1rem',
	fontWeight: '500',
	marginRight: '.5rem',
	textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
	fontSize: '0.875rem',
	color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
	fontSize: '1rem',
	fontWeight: '500',
	marginBottom: '16px',
	textTransform: 'capitalize',
	color: theme.palette.text.secondary,
}));

const incomeSchema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string(),
	amount: yup.number().required('Amount is required'),
});

const IncomeDashboard = () => {
	const [cards, setCards] = useState([
		{
			title: 'Main Job',
			description: 'Salary income from my job',
			columns: [
				{ colTitle: 'Yearly', content: '$72,000' },
				{ colTitle: 'Monthly', content: '$6,000' },
			],
		},
		{
			title: 'Side Hustle',
			description: 'Saturday job doing who knows what',
			columns: [
				{ colTitle: 'Yearly', content: '$12,000' },
				{ colTitle: 'Monthly', content: '$1,000' },
			],
		},
	]);
	const [addCard, setAddCard] = useState(false);
	const { palette } = useTheme();
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			amount: '',
		},
		validationSchema: incomeSchema,
		onSubmit: values => {
			const columns = [
				{ colTitle: 'Yearly', content: `$${values.amount}` },
				{ colTitle: 'Monthly', content: `$${(values.amount / 12).toFixed(2)}` },
			];
			setCards([
				...cards,
				{ title: values.title, description: values.description ?? "", columns },
			]);
      formik.resetForm();
			setAddCard(false);
		},
	});

	return (
		<div className="p-4">
			<div className="text-3xl font-bold">Income</div>
			<div>Use this page to list your sources of income.</div>
			<Button
				variant="contained"
				className="bg-sky-800 mt-3"
				onClick={() => setAddCard(true)}
			>
				<Add className="h-3 w-3 mr-2" /> Add an Income
			</Button>
			{cards.map((card, index) => (
				<DollarCard key={card.title} className="my-3" {...card} />
			))}
			<Dialog open={addCard} onClose={() => setAddCard(false)}>
				<form
					className="flex flex-col m-5 gap-2 w-60"
					onSubmit={formik.handleSubmit}
				>
					<div className="text-xl font-semibold">Add an Income</div>
					<TextField
						name="title"
						label="Income Name"
						value={formik.values.title}
						onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
					/>
					<TextField
						name="description"
						label="Description"
						value={formik.values.description}
						onChange={formik.handleChange}
					/>
					<TextField
						name="amount"
						type="number"
						label="Yearly"
						value={formik.values.amount}
						onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
					/>
					<Button type="submit" variant="contained" className="bg-sky-800 mt-3">
						Submit
					</Button>
				</form>
			</Dialog>
		</div>
	);
};

export default IncomeDashboard;
