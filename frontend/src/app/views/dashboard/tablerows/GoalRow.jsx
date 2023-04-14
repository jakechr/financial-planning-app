import { TableCell, TableRow } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { Goal } from 'app/model/objects';

export function GoalHeader() {
  return (
    <TableRow>
      <TableCell align="left">Name</TableCell>
      <TableCell align="center">Description</TableCell>
      <TableCell align="center">Date</TableCell>
      <TableCell align="right">Amount</TableCell>
    </TableRow>
  );
}

/**
 * @param {Goal} goal
 */
export default function GoalRow({goal}) {
  return (
    <TableRow data-cy="goal-row">
      <TableCell align="left">{goal.name}</TableCell>
      <TableCell align="center">{goal.description}</TableCell>
      <TableCell align="center">{goal.date}</TableCell>
      <TableCell align="right">${goal.amount}</TableCell>
    </TableRow>
  );
};
