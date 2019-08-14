import React, { useState, useCallback } from 'react';
import Button from '../../Button';
import Input from '../../Input';

const OrganizationSearch = ({
  organizationName,
  onOrganizationSearch,
}) => {
  const [value, setValue] = useState(organizationName);

  const onChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  const onSubmit = event => {
    onOrganizationSearch(value);
    event.preventDefault();
  };

  return (
    <div className="Navigation-search">
      <form onSubmit={onSubmit}>
        <Input
          color={'white'}
          type="text"
          value={value}
          onChange={onChange}
        />{' '}
        <Button color={'white'} type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default OrganizationSearch;
