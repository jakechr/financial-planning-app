import { Button, Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment, useState } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';
import { Add } from '@mui/icons-material';
import DollarCard from 'app/components/DollarCard';

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

const ExpensesDashboard = () => {
  const { palette } = useTheme();
  const [cards, setCards] = useState([
    { title: 'Rent', description: 'Gotta pay for a roof and a bed', columns: [
      { colTitle: 'Yearly', content: '$6,000' },
      { colTitle: 'Monthly', content: '$500' },
      { colTitle: 'Repeats Monthly on', content: '1st'}

    ]},
    { title: 'Food', description: 'Gotta eat', columns: [
      { colTitle: 'Yearly', content: '$2,400' },
      { colTitle: 'Monthly', content: '$200' },
      { colTitle: 'Repeats Monthly on', content: '1st'}
    ]},
    { title: 'Car Insurance', description: "Hopefully I don't crash", columns: [
      { colTitle: 'Yearly', content: '$1,200' },
      { colTitle: 'Bi-annually', content: '$600' },
      { colTitle: 'On', content: '5/1 && 11/1'}
    ]},
    { title: 'A New Mattress', description: "Our old one needs to go", columns: [
      { colTitle: 'One time purchase', content: '$500' },
      { colTitle: 'On', content: 'March 30'}
    ]},
  ]);

  return (
    <div className="p-4">
    <div className="text-3xl font-bold">Income</div>
    <div>Use this page to list your sources of income.</div>
    <Button variant="contained" className="bg-sky-800 mt-3">
      <Add className="h-3 w-3 mr-2" /> Add an Income
    </Button>
    {cards.map((card, index) => (
      <DollarCard className='my-3' {...card} />
    ))}
  </div>
  );
};

export default ExpensesDashboard;
