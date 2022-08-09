import React from 'react';
import { setFilterValue } from '../../redux/reducers/contactReducer';
import { useDispatch } from 'react-redux';

const ContactFilter = () => {
  // we just need the conact dispatch without state.
    const dispatch = useDispatch()

  const onChange = (e) => {
    if (e.target.value !== '') {
      dispatch(setFilterValue(e.target.value))
    } else {
      dispatch(setFilterValue(""))
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type='text' placeholder='Filter Contacts...' onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
