import { Button, styled, useTheme } from '@mui/material';
import { useState } from 'react';
import DollarCard from 'app/components/DollarCard';
import { Add } from '@mui/icons-material';

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

const IncomeDashboard = () => {
	const [cards, setCards] = useState([
    { title: 'Main Job', description: 'Salary income from my job', columns: [
      { colTitle: 'Yearly', content: '$72,000' },
      { colTitle: 'Monthly', content: '$6,000' },
    ]},
    { title: 'Side Hustle', description: 'Saturday job doing who knows what', columns: [
      { colTitle: 'Yearly', content: '$12,000' },
      { colTitle: 'Monthly', content: '$1,000' },
    ]},
  ]);
	const { palette } = useTheme();

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

export default IncomeDashboard;
