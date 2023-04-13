import { MoreHoriz } from "@mui/icons-material";

function DollarCard({
	title = 'This is the title',
	description = '',
	columns = [
		{ colTitle: 'Amount Saved', content: '$500' },
		{ colTitle: 'Goal', content: '$2000' },
		{ colTitle: 'By', content: 'April 12, 2023' },
	],
    className = ""
}) {
	return (
		<div className={`w-full p-3 flex justify-between border-2 rounded-md items-center ${className}`}>
			<div className="border-r-2 p-2 border-black w-2/5 mr-5">
				<div className="text-2xl font-bold">{title}</div>
				<div className="text-md">{description}</div>
			</div>
			{columns.map(({ colTitle, content }, index) => (
				<div className="grow px-2">
					<div className="font-bold text-gray-400">{colTitle}</div>
					<div className="text-xl font-bold">{content}</div>
				</div>
			))}
            <MoreHoriz className="h-7 w-7" />
		</div>
	);
}

export default DollarCard;
