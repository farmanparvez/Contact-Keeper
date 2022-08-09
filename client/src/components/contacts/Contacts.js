import React, { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import { getContacts } from "../../redux/actions/contactActions";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Result } from "antd";
import { reset } from "../../redux/reducers/contactReducer";
import { openNotificationWithIcon } from "../../utils/notification";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    isMessage,
    isErrorContactDelete,
    contacts,
    filterValue,
  } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      openNotificationWithIcon("success", "Success", isMessage);
    }
    if (isErrorContactDelete) {
      openNotificationWithIcon("error", "Failed", isMessage);
    }
    dispatch(getContacts(navigate));
    return () => dispatch(reset());
  }, [isSuccess, isErrorContactDelete, dispatch, isMessage, navigate]);

  const filterData = contacts.filter((fil) => {
    if (filterValue)
      return fil?.name === filterValue || fil?.phone === filterValue;
    return fil;
  });

  if (contacts !== null && contacts.length === 0 && !isError) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Spin spinning={isLoading}>
      <TransitionGroup>
        {!isLoading &&
          filterData?.map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        {!isLoading && isError && (
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
          />
        )}
      </TransitionGroup>
    </Spin>
  );
};

export default Contacts;
