import ReusableCanvas from './ReusableCanvas';
import ReusableCanvasContent from './ReusableCanvasContent';
import GoalRow, { GoalHeader } from './tablerows/GoalRow';

export default function GoalsDashboard() {
  const canvasName = 'Goals';
  const canvasDescription = 'Track your spending goals here.';
  const canvasButton = 'Add New Goal';

  const mockGoals = [
    {
      name: "Subaru",
      date: "10/1/2024",
      amount: 10000,
      description: "get a used car"
    },
    {
      name: "Better Subaru",
      date: "12/1/2025",
      amount: 25000,
      description: "get a nicer car"
    },
  ];
  const tableRows = mockGoals.map((goal, index) => (
    <GoalRow key={index} goal={goal} />
  ));

  const canvasContent = <ReusableCanvasContent
    addButtonTitle={canvasButton}
    tableHeader={<GoalHeader/>}
    tableRows={tableRows}
  />;

  return (
    <ReusableCanvas
      canvasName={canvasName}
      canvasDescription={canvasDescription}
      canvasContent={canvasContent}
    />
  );
};
