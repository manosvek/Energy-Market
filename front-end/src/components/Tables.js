import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


export default function StickyHeadTable(props) {

  var rows = [];
  var columns = [];
  var i=0;
  var month;
  console.log(props.dataset)
  console.log(props.time)
  console.log(props.day)
  console.log(props.month)
  if(props.dataset === "ActualTotalLoad")
  {
    function createData(value, time) {
      return { value, time };
    }
    if(props.time)
    {
      columns = [
        { id: 'value', label: 'Actual\u00a0Total\u00a0Load', minWidth: 170 },
        { id: 'time', label: 'Time', minWidth: 100 },
      ];

      while (i < props.actual_value.length){
        rows.push(createData(props.actual_value[i], props.time[i]));
        i+=1;
      }
    }

    if(props.day)
    {
      columns = [
        { id: 'value', label: 'Actual\u00a0Total\u00a0Load', minWidth: 170 },
        { id: 'time', label: 'Day', minWidth: 100 },
      ];

      while (i < props.actual_value.length){
        rows.push(createData(props.actual_value[i], props.day[i]));
        i+=1;
      }
    }

    if(props.month)
    {
      columns = [
        { id: 'value', label: 'Actual\u00a0Total\u00a0Load', minWidth: 170 },
        { id: 'time', label: 'Month', minWidth: 100 },
      ];

      while (i < props.actual_value.length){
        if (props.month[i] ===1 )
           month = "January";
        rows.push(createData(props.actual_value[i], month));
        i+=1;
      }
    }
  }

  else if (props.dataset === "DayAheadTotalLoadForecast")
  {
    function createData(value, time) {
      return { value, time };
    }
    if(props.time)
    {
      columns = [
        { id: 'value', label: 'Day\u00a0Ahead\u00a0Total\u00a0Load\u00a0Forecast\u00a0Value', minWidth: 170 },
        { id: 'time', label: 'Time', minWidth: 100 },
      ];

      while (i < props.forecast_value.length){
        rows.push(createData(props.forecast_value[i], props.time[i]));
        i+=1;
      }
    }
    else if(props.day)
    {
      columns = [
        { id: 'value', label: 'Day\u00a0Ahead\u00a0Total\u00a0Load\u00a0Forecast\u00a0Value', minWidth: 170 },
        { id: 'time', label: 'Day', minWidth: 100 },
      ];

      while (i < props.forecast_value.length){
        rows.push(createData(props.forecast_value[i], props.day[i]));
        i+=1;
      }
    }
    else if(props.month)
    {
      columns = [
        { id: 'value', label: 'Day\u00a0Ahead\u00a0Total\u00a0Load\u00a0Forecast\u00a0Value', minWidth: 170 },
        { id: 'time', label: 'Month', minWidth: 100 },
      ];

      while (i < props.forecast_value.length){
        if (props.month[i] ===1 )
           month = "January";
        rows.push(createData(props.forecast_value[i], month));
        i+=1;
      }
    }
  }

  else if (props.dataset === "ActualvsForecast")
  {
    function createData(forecast_value, actual_value, time) {
      return { forecast_value, actual_value, time };
    }
    if(props.time){
      columns = [
        { id: 'forecast_value', label: 'Day\u00a0Ahead\u00a0Total\u00a0Load\u00a0Forecast\u00a0Value', minWidth: 170 },
        { id: 'actual_value', label: 'Actual\u00a0Total\u00a0Load', minWidth: 170 },
        { id: 'time', label: 'Time', minWidth: 100 },
      ];

      while (i < props.forecast_value.length){
        rows.push(createData(props.forecast_value[i], props.actual_value[i], props.time[i]));
        i+=1;
      }
    }

    else if (props.day){
      columns = [
        { id: 'forecast_value', label: 'Day\u00a0Ahead\u00a0Total\u00a0Load\u00a0Forecast\u00a0Value', minWidth: 170 },
        { id: 'actual_value', label: 'Actual\u00a0Total\u00a0Load', minWidth: 170 },
        { id: 'time', label: 'Day', minWidth: 100 },
      ];

      while (i < props.forecast_value.length){
        rows.push(createData(props.forecast_value[i], props.actual_value[i], props.day[i]));
        i+=1;
      }
    }
    else if (props.month){
      columns = [
        { id: 'forecast_value', label: 'Day\u00a0Ahead\u00a0Total\u00a0Load\u00a0Forecast\u00a0Value', minWidth: 170 },
        { id: 'actual_value', label: 'Actual\u00a0Total\u00a0Load', minWidth: 170 },
        { id: 'time', label: 'Month', minWidth: 100 },
      ];

      while (i < props.forecast_value.length){
        if (props.month[i] ===1 )
           month = "January";
        rows.push(createData(props.forecast_value[i], props.actual_value[i], month));
        i+=1;
      }
    }
  }

  else if (props.dataset === "AggregatedGenerationPerType")
  {
    if (props.time){
      columns = [
        { id: 'actual_value', label: 'Actual\u00a0Generation\u00a0Output\u00a0Value', minWidth: 170 },
        { id: 'type', label: 'Production\u00a0Type', minWidth: 170 },
        { id: 'time', label: 'Time', minWidth: 100 },
      ];

      function createData(actual_value, type, time) {
        return { actual_value, type, time };
      }
      while (i < props.actual_value.length){
        rows.push(createData( props.actual_value[i], props.type[i], props.time[i]));
        i+=1;
      }
    }
    else if (props.day){
      columns = [
        { id: 'actual_value', label: 'Actual\u00a0Generation\u00a0Output\u00a0Value', minWidth: 170 },
        { id: 'type', label: 'Production\u00a0Type', minWidth: 170 },
        { id: 'time', label: 'Day', minWidth: 100 },
      ];

      function createData(actual_value, type, time) {
        return { actual_value, type, time };
      }
      while (i < props.actual_value.length){
        rows.push(createData( props.actual_value[i], props.type[i], props.day[i]));
        i+=1;
      }
    }
    else if (props.month){
      columns = [
        { id: 'actual_value', label: 'Actual\u00a0Generation\u00a0Output\u00a0Value', minWidth: 170 },
        { id: 'type', label: 'Production\u00a0Type', minWidth: 170 },
        { id: 'time', label: 'Month', minWidth: 100 },
      ];

      function createData(actual_value, type, time) {
        return { actual_value, type, time };
      }
      while (i < props.actual_value.length){
        if (props.month[i] ===1 )
           month = "January";
        rows.push(createData( props.actual_value[i], props.type[i], month));
        i+=1;
      }
    }
  }

  const useStyles = makeStyles({
    root: {
      width: '150%',
      backgroundColor: '#f89c83',
      minHeight: 50
    },
    container: {
      maxHeight: 400
    },
    tablecell: {
      fontSize: '12pt',
      fontFamily: 'sans-serif',
      fontWeight: 200,
      letterSpacing: "2px",
    }
  });

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper  className={classes.root} >
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className="table">
          <TableHead >
            <TableRow >
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.tablecell}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} className={classes.tablecell}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} className={classes.tablecell}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
