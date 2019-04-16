

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { actionCreators as animalActionCreators } from "../store/Animal";
import {bindActionCreators} from 'redux';


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

var columns = [];

const animalColumns = [ { definition: 'name', label: 'Name' },
{ definition: 'id', label: 'Id' },
{ definition: 'color', label: 'Color' },
{ definition: 'gender', label: 'Gender' },
{ definition: 'species', label: 'Species' }]

const businessColumns = [ { definition: 'name', label: 'Name' },
{ definition: 'id', label: 'Id' }]

class DataTableToolbar extends React.Component {
   
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columns.map(
                        column => (
                            <TableCell
                                key={column.definition}
                                sortDirection={orderBy === column.definition ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    enterDelay={300}
                                >
                                    <TableSortLabel hidden={false}
                                        active={orderBy === column.definition}
                                        direction={order}
                                        onClick={this.createSortHandler(column.definition)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

DataTableToolbar.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

class DataTable extends Component {


    state = {
        order: 'asc',
        orderBy: 'id',
        page: 0,
        rowsPerPage: 10
    };
    
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    getById = (id) => {
        this.props.actions.getAnimalById(id);
    }

    render() {

        var data = this.props.data || [];
        var dataType = this.props.dataType;

        switch (dataType) {
            case "animal":
                columns = animalColumns 
                break;
                case "business":
                columns = businessColumns 
                break;
            default:
                break;
        }
        const { order, orderBy, rowsPerPage, page } = this.state;

        return (
            <Paper className="paper">
                <Table>
            <DataTableToolbar
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
            />
            <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(rowData => {
                        return (
                            <TableRow
                                hover={false}
                                tabIndex={-1}
                                key={rowData.id}
                            >
                                <TableCell component="th" scope="row">
                                <Link onClick={() => this.getById(rowData.id)} to={{ pathname: "/animaldetails"}} >
                                        {rowData.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{rowData.id}</TableCell>
                                <TableCell>{rowData.color}</TableCell>
                                <TableCell>{rowData.gender}</TableCell>
                                <TableCell>{rowData.species}</TableCell>
                            </TableRow>
                        );
                    })}
            </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
                'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
            </Paper>
        );
    }
}

DataTable.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array,
    dataType: PropTypes.string,
    actions: PropTypes.shape({
      getAnimalById: PropTypes.func.isRequired
    })
};

const mapStateToProps = state => ({
    isLoading: state.animals.isLoading,
    data: state.animals.value
  });
  

  const mapDispatchToProps = dispatch => {
    return {
      actions: bindActionCreators(
        {
          getAnimalById: animalActionCreators.getAnimalById
        },
        dispatch
      )
    };
  };

export default connect(mapDispatchToProps)(DataTable);