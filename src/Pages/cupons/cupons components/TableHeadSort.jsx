import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../Styles/GlobalStyles';


function TableHeadSort(props) {
    const { order, orderBy, onRequestSort, headCells } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={'center'}
                        padding={'normal'}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{
                                '&:hover':{
                                    color: '#FFF'
                                }
                            }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
                <StyledTableCell align='center'>
                    Featured
                </StyledTableCell>
                <StyledTableCell align='center'>
                    Active
                </StyledTableCell>
                <StyledTableCell align='center'>
                    Single Use
                </StyledTableCell>
                <StyledTableCell align='center'>
                    Coupon Description
                </StyledTableCell>
                <StyledTableCell align='center'>
                    Update
                </StyledTableCell>
                <StyledTableCell align='center'>
                    Delete
                </StyledTableCell>
            </StyledTableRow>
        </TableHead>
    );
}

export default TableHeadSort