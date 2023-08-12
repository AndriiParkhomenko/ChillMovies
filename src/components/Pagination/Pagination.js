import { Pagination as PaginationNav, PaginationItem } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import './Pagination.scss';
import { useEffect } from 'react';

export const Pagination = ({ currentPage, totalPages, onChangePage }) => {

	const {pathname, search} = useLocation();

	const urlPage = parseInt(search.split('=')[1]);

	const handleClick = (pageNumber) => {
		if (pageNumber !== currentPage) {
			onChangePage(pageNumber);
		}
	};

	useEffect(()=>{
		if (urlPage && urlPage !== currentPage) {
			handleClick(urlPage);
		}
	}, [urlPage])

	return (
		<div className="pagination-main">
			<PaginationNav
			className='pagination-content'
			count={totalPages}
			page={currentPage}
			onChange={(_, num) => handleClick(num)}
			showFirstButton
			showLastButton
			sx={{marginY: 3, marginX: 'auto'}}
			renderItem={(item) => (
				<PaginationItem
					component={NavLink}
					to={`${pathname}?page=${item.page}`}
					{...item}
				/>
			)}
			/>
		</div>
	);
};
