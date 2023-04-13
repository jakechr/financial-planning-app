import { Button, Dialog, TextField } from '@mui/material';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import DollarCard from 'app/components/DollarCard';
import { useFormik } from 'formik';
import * as yup from 'yup';

const expenseSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  amount: yup.number().required('Amount is required'),
  date: yup.string().required('Date is required of form MM/YY'),
  repeatInterval: yup.number().required('Number of repeats is required'),
});

const ExpensesDashboard = () => {
  const [cards, setCards] = useState([
  ]);

  const [addCard, setAddCard] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      amount: 0,
      date: '',
      repeatInterval: 0,
    },
    validationSchema: expenseSchema,
    onSubmit: values => {
      const columns = [
        {colTitle: 'Monthly', content: `$${values.amount}`},
        {colTitle: 'Date', content: `${values.date}`},
        {colTitle: 'Repeats', content: `Every ${values.repeatInterval} month(s)`}
      ];
      setCards([
        ...cards,
        { title: values.title, description: values.description ?? "", columns },
      ]);
      formik.resetForm();
      setAddCard(false);
    }
  });

  return (
    <div className="p-4">
      <div className="text-3xl font-bold">Expenses</div>
      <div>Use this page to list your expenses.</div>
      <Button
        variant="contained"
        className="bg-sky-800 mt-3"
        onClick={() => setAddCard(true)}>
        <Add className="h-3 w-3 mr-2" /> Add an Expense
      </Button>
      {cards.map((card, index) => (
        <DollarCard key={card.title} className="my-3" {...card} />
      ))}
      <Dialog open={addCard} onClose={() => setAddCard(false)}>
        <form
          className="flex flex-col m-5 gap-2 2-60"
          onSubmit={formik.handleSubmit}
        >
          <div className="text-xl font-semibold">Add an Expense</div>
          <TextField
            name="title"
            label="Expense Name"
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
            label="Monthly Expense"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <TextField
            name="date"
            type="string"
            label="Date (MM/YY)"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
          <TextField
            name="repeatInterval"
            type="number"
            label="Repeat Interval in Months"
            value={formik.values.repeatInterval}
            onChange={formik.handleChange}
            error={formik.touched.repeatInterval && Boolean(formik.errors.repeatInterval)}
            helperText={formik.touched.repeatInterval && formik.errors.repeatInterval}
          />
          <Button type="submit" variant="contained" className="bg-sky-800 mt-3">
            Submit
          </Button>
        </form>
      </Dialog>
    </div>
  );
};

export default ExpensesDashboard;
