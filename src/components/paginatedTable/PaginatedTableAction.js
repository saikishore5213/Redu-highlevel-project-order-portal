import { setColumnSearch, setCurrentData, setIsNext, setIsPrev, setPageCount, setValueSearch } from '../../store/paginatedTableSlice';

export const searchOnLocalData = (value, searchType, fullData, pageCount, dispatch) => {
  const currentJson = fullData[pageCount];
  if (!(value?.length > 1)) {
    if (value === '') {
      dispatch(setCurrentData(currentJson));
    }
    if (searchType === 'column') {
      dispatch(setColumnSearch(value));
    }
    if (searchType === 'value') {
      dispatch(setValueSearch(value));
    }
    return;
  }
  if (searchType === 'column') {
    dispatch(setColumnSearch(value));
    const results = Object.keys(currentJson).reduce((result, keys) => {
      if (keys?.toUpperCase().includes(value.toUpperCase())) {
        result[keys] = currentJson[keys];
      }
      return result;
    }, {});
    dispatch(setCurrentData(results));
    return;
  }

  if (searchType === 'value') {
    dispatch(setValueSearch(value));
    const results = Object.keys(currentJson).reduce((result, keys) => {
      if (currentJson[keys]?.toUpperCase().includes(value.toUpperCase())) {
        result[keys] = currentJson[keys];
      }
      return result;
    }, {});
    dispatch(setCurrentData(results));
    return;
  }
};

export const clickNext = (pageCount, fullData, dispatch) => {
  const nextPageNumber = pageCount + 1;
  if (fullData.length > nextPageNumber) {
    dispatch(setCurrentData(fullData[nextPageNumber]));
  }

  if (nextPageNumber + 1 === fullData.length) {
    dispatch(setIsNext(false));
  } else {
    dispatch(setIsNext(true));
  }

  if (nextPageNumber > 0) {
    dispatch(setIsPrev(true));
  }
  dispatch(setPageCount(nextPageNumber));
};

export const clickPrev = (pageCount, fullData, dispatch) => {
  if (pageCount < 1) {
    dispatch(setIsPrev(false));
    return;
  }

  const prevPageNumber = pageCount - 1;
  dispatch(setCurrentData(fullData[prevPageNumber]));
  dispatch(setIsNext(true));

  if (prevPageNumber < 1) {
    dispatch(setIsPrev(false));
  }
  dispatch(setPageCount(prevPageNumber));
};

export const clickPageNumber = (pageNumber, pageCount, fullData, dispatch) => {
  if (pageNumber === 1) {
    dispatch(setIsPrev(false));
  } else {
    dispatch(setIsPrev(true));
  }

  if (pageNumber === fullData.length) {
    dispatch(setIsNext(false));
  } else {
    dispatch(setIsNext(true));
  }
  dispatch(setCurrentData(fullData[pageNumber - 1]));
  dispatch(setPageCount(pageNumber - 1));
};
