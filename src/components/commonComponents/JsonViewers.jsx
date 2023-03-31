import { useState } from 'react';
import { Button, Col, FormControl, InputGroup } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import JsonViewer from 'searchable-react-json-view';
import { handleEnterKeyPress } from '../../util/helper';

const JsonViewers = ({ name, data, collapsed = 1, maxHeightValue = '79vh', showSearch = true }) => {
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const jsonMaxHeight = {
    maxHeight: maxHeightValue,
  };
  const hitEnterToSetSearchValue = () => {
    if (searchValue && searchValue !== '') {
      setSearch(searchValue);
    }
  };
  const SearchValueOrResetSearch = (value) => {
    if (!value || value.trim() === '') {
      setSearchValue('');
      setSearch('');
      return;
    }
    if (value.length >= 5) {
      setSearch(value);
    }
    setSearchValue(value);
  };
  return (
    <div className="JsonOverFlow" style={jsonMaxHeight}>
      {data && showSearch && (
        <Col md={2}>
          <InputGroup className="mb-3 mt-2">
            <FormControl
              placeholder="Search Value"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={(e) => SearchValueOrResetSearch(e.target.value)}
              value={searchValue}
              onKeyPress={(e) => handleEnterKeyPress(e, hitEnterToSetSearchValue)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={(e) => (searchValue && searchValue !== '' ? setSearch(searchValue) : undefined)}
            >
              Search
            </Button>
            {searchValue && searchValue.length > 0 && (
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={(e) => {
                  setSearchValue('');
                  setSearch('');
                }}
              >
                Reset
              </Button>
            )}
          </InputGroup>
        </Col>
      )}
      <JsonViewer
        src={data}
        highlightSearch={search}
        quotesOnKeys={false}
        collapsed={collapsed}
        name={name}
        theme={'grayscale:inverted'}
        displayObjectSize={false}
        displayDataTypes={false}
      />
    </div>
  );
};

JsonViewers.prototypes = {
  name: propTypes.string,
  data: propTypes.object,
};

export default JsonViewers;
