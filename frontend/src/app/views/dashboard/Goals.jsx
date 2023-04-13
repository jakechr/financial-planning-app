import {
	Button,
	Dialog,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import DollarCard from 'app/components/DollarCard';
import { Add } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { formatDateString, isValidDate } from '../../utils/utils';

const goalsSchema = yup.object().shape({
	title: yup.string().required('Goal title is required'),
	description: yup.string(),
  saved: yup.number(),
  amount: yup.number().required('Goal amount is required'),
  date: yup.date().required('Date is required'),
});

const GoalsDashboard = () => {
	const [cards, setCards] = useState([
		{
			title: 'Down Payment on House',
			description: 'Save up enough money to get our new house in Orem!',
			columns: [
				{ colTitle: 'Amount Saved', content: '$9,349' },
				{ colTitle: 'Goal', content: '$20,000' },
        { colTitle: 'By', content: 'Jan 1st, 2024' },
			],
		},
		{
			title: 'Pay off Student Debt',
			description: 'Pay off student debt from college',
			columns: [
				{ colTitle: 'Amount Saved', content: '$3,702' },
				{ colTitle: 'Goal', content: '$15,000' },
        { colTitle: 'By', content: 'Apr 30th, 2024' },
			],
		},
    {
			title: 'New car',
			description: 'Save up for the new Tesla Truck',
			columns: [
				{ colTitle: 'Amount Saved', content: '$496' },
				{ colTitle: 'Goal', content: '$50,000' },
        { colTitle: 'By', content: 'Aug 3rd, 2025' },
			],
		},
	]);
	const [addCard, setAddCard] = useState(false);
	const formik = useFormik({
		initialValues: {
			title: '',
			description: '',
			amount: '',
      goal: '',
      date: '',
		},
		validationSchema: goalsSchema,
		onSubmit: values => {
			const columns = [
        { colTitle: 'Amount Saved', content: `$${values.saved || 0}` },
				{ colTitle: 'Goal', content: `$${values.amount}` },
        { colTitle: 'By', content: formatDateString(values.date) },
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
			<div className="text-3xl font-bold">Goals</div>
			<div>Track your spending goals here.</div>
			<Button
				variant="contained"
				className="bg-sky-800 mt-3"
				onClick={() => setAddCard(true)}
			>
				<Add className="h-3 w-3 mr-2" /> Add New Goal
			</Button>
			{cards.map((card, index) => (
				<DollarCard key={card.title} className="my-3" {...card} />
			))}
			<Dialog open={addCard} onClose={() => setAddCard(false)}>
				<form
					className="flex flex-col m-5 gap-2 w-60"
					onSubmit={formik.handleSubmit}
				>
					<div className="text-xl font-semibold">Add an goals</div>
					<TextField
						name="title"
						label="Goal"
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
						label="Goal Amount"
						value={formik.values.amount}
						onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.touched.amount}
					/>
          <TextField
						name="date"
						label="Goal Date"
						value={formik.values.date}
						onChange={formik.handleChange}
            error={(formik.values.date ? !isValidDate(formik.values.date) : formik.touched.date) || Boolean(formik.errors.date)}
            helperText={
              formik.values.date
              ? (!isValidDate(formik.values.date) && "Date must be formatted as MM/DD/YYYY") || formik.errors.date
              : formik.touched.date && formik.errors.date
            }
					/>
					<Button type="submit" variant="contained" className="bg-sky-800 mt-3">
						Submit
					</Button>
				</form>
			</Dialog>
		</div>
	);
};

export default GoalsDashboard;
