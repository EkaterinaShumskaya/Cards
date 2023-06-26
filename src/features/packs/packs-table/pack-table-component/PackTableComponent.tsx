import React, { FC } from "react";
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { PackTableBody } from "features/packs/packs-table/pack-table-body/PackTableBody";


type PackTableHeadType={
  disabled?:boolean,
  tableCellForHeader:string[]
  // children: React.ReactNode
}

export const PackTableHead:FC<PackTableHeadType> = ({disabled,tableCellForHeader}) => {
  const tableHeaderSX = {
    ordWrap: 'break-word',
    minWidth: '150px',
    maxWidth: '200px',
    wordBreak: 'break-all'
  }
  return (
    <TableContainer component={Paper} sx={{marginTop:"30px", marginBottom:"30px"}}>
      <Table sx={{ minWidth: '650px' }}>
        <TableHead>
          <TableRow sx={{ background: '#EFEFEF' }}>
            {tableCellForHeader.map(textHead => (
              <TableCell sx={tableHeaderSX} key={textHead}>
                {textHead}
                {textHead === 'Last Updated' && (
                  <IconButton disabled={disabled}>
                    <ArrowDropDownIcon />
                  </IconButton>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <PackTableBody />
      </Table>
    </TableContainer>
  );
};

