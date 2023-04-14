
import { Box, Fab, Icon, styled, Table, TableBody, TableHead } from '@mui/material';
import { SimpleCard } from "app/components";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

/**
 * Reusable Canvas Content Component
 * @param {string} addButtonTitle 
 * @param {JSX.Element} tableHeader 
 * @param {JSX.Element[]} tableRows 
 */
export default function ReusableCanvasContent({addButtonTitle, tableHeader, tableRows, onAddButtonPress}) {

  return (
    <>
      <Fab variant="extended" aria-label="Add" className="button" onClick={onAddButtonPress} >
        <Icon sx={{ mr: 4 }}>add</Icon>
        <div data-cy="add-row-button">{addButtonTitle}</div>
      </Fab>
      <SimpleCard title="Simple Table">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              {tableHeader}
            </TableHead>
            <TableBody>
              {tableRows}
            </TableBody>
          </StyledTable>
        </Box>
      </SimpleCard>
    </>
  );
};