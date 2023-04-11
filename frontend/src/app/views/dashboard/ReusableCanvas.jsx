import { Fragment } from 'react';
import { styled } from '@mui/material';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

/**
 * Reusable Canvas Component
 * @param {string} canvasName 
 * @param {string} canvasDescription 
 * @param {string} canvasButton 
 * @param {string} tableData 
 */
export default function ReusableCanvas({canvasName, canvasDescription, canvasContent}) {

  return (
    <Fragment>
      <ContentBox className="analytics">
        <div className="Canvas">
          <div>
            <h4>{canvasName}</h4>
            <p>{canvasDescription}</p>
          </div>
          {canvasContent}
        </div>
      </ContentBox>
    </Fragment>
  );
};
