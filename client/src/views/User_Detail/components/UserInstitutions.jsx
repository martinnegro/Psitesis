import React from 'react'
import { Box, Table, TableCell, TableHead, TableRow } from '@material-ui/core';

function UserInstitutions({user}) {
    return (
        <Box >
            <Table>
                <TableHead style={{color: "#861C55", fontSize: "30px"} }>
                    Instituciones:
                </TableHead>
            { user.institutions.map(i => (
                <TableRow>
                    <TableCell href={i.inst_link}>{i.inst_link_logo}</TableCell>
                    <TableCell>{i.inst_name}</TableCell>
                    <TableCell>{i.inst_description}</TableCell>
                </TableRow>
            )) }
            </Table>
        </Box>
    )
}

export default UserInstitutions;
