import React, { useState, useEffect } from "react";
import { createContact, getContacts, updateContact } from "../../redux/actions/contactActions";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/reducers/contactReducer";
import { openNotificationWithIcon } from "../../utils/notification";
import { Spin } from "antd";

const initialContact = {
  name: "",
  email: "",
  phone: "",
  type: "personal",
};

const ContactForm = () => {
  const [contact, setContact] = useState(initialContact);
  const dispatch = useDispatch();
  const {
    isLoadingContactCreate,
    isSuccessContactCreate,
    isErrorContactCreate,
    isMessageContactCreate,
    contactDetails
  } = useSelector((state) => state.contact);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (contactDetails === null) {
    dispatch(createContact(contact));
    } else {
      dispatch(updateContact(contact))
    }
    // clearAll();
  };

  const clearAll = () => {
    setContact({ name: "", email: "", phone: "", type: "personal" });
  };

  useEffect(() => {
    if(contactDetails !== null) setContact(contactDetails)
  },[contactDetails])

  useEffect(() => {
    if (isSuccessContactCreate) {
      openNotificationWithIcon("success", "Success", isMessageContactCreate);
      dispatch(getContacts());
      clearAll();
    }
    if (isErrorContactCreate) {
      openNotificationWithIcon("error", "Failed", isMessageContactCreate);
    }
    return () => dispatch(reset());
  }, [isSuccessContactCreate, isErrorContactCreate, isMessageContactCreate, dispatch ]);

  return (
    <Spin spinning={isLoadingContactCreate}>
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">{contactDetails ? "Update Contact" : "Add Contact"}</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={onChange}
        />
        <h4>Contact Type</h4>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />{" "}
        Personal{" "}
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />{" "}
        Professional
        <div>
          <input
            type="submit"
            value={contactDetails ? "Update Contact" : "Add Contact"}
            className="btn btn-primary btn-block"
          />
        </div>
        {/* {current && ( */}
        {/* <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div> */}
        {/* )} */}
      </form>
    </Spin>
  );
};

export default ContactForm;
