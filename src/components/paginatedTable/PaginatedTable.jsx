import { FormControl, InputGroup, Pagination, Stack, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clickNext, clickPageNumber, clickPrev, searchOnLocalData } from './PaginatedTableAction';

function PaginatedTable({ jsonData }) {
  const dispatch = useDispatch();
  const { pageCount, isNext, isPrev, fullData, currentData, valueSearch, columnSearch } = useSelector((state) => state.tableView);

  let paginatedItem = [];
  for (let i = 1; i <= jsonData?.length; i++) {
    paginatedItem.push(
      <Pagination.Item key={i} active={i === pageCount + 1} onClick={(e) => clickPageNumber(i, pageCount, fullData, dispatch)}>
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <>
      <Table striped hover>
        <thead>
          <tr>
            <th>
              <span className="m-1">Column</span>
            </th>
            <th>
              <Stack direction="horizontal" gap={3}>
                <span className="m-1"> Value</span>
                <Pagination size="sm" className="m-2" hidden={fullData?.length < 2}>
                  <Pagination.Prev disabled={!isPrev} onClick={(e) => clickPrev(pageCount, fullData, dispatch)} />
                  {paginatedItem}
                  <Pagination.Next disabled={!isNext} onClick={(e) => clickNext(pageCount, fullData, dispatch)} />
                </Pagination>
                <InputGroup className="mb-1">
                  <InputGroup.Text hidden={valueSearch !== '' || currentData?.length < 1}>Search Column</InputGroup.Text>
                  <FormControl
                    aria-label="searchColumn"
                    onChange={(e) => searchOnLocalData(e.target.value, 'column', fullData, pageCount, dispatch)}
                    hidden={valueSearch !== '' || currentData?.length < 1}
                  />
                  <InputGroup.Text hidden={columnSearch !== '' || currentData?.length < 1}>Search Value</InputGroup.Text>
                  <FormControl
                    aria-label="searchValue"
                    onChange={(e) => searchOnLocalData(e.target.value, 'value', fullData, pageCount, dispatch)}
                    hidden={columnSearch !== '' || currentData?.length < 1}
                  />
                </InputGroup>
              </Stack>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData &&
            Object.keys(currentData)?.map((obj, index) => {
              return (
                <tr key={index}>
                  <td>{obj}</td>
                  <td>{currentData[obj]}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}

export default PaginatedTable;
