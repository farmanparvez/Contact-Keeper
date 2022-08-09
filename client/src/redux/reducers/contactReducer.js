import { createSlice } from "@reduxjs/toolkit";
import { getContacts, deleteContact, createContact, updateContact } from "../actions/contactActions";

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        isMessage: null,
        isLoadingContactCreate: false,
        isSuccessContactCreate: false,
        isErrorContactCreate: false,
        isMessageContactCreate: null,
        isErrorContactDelete: false,
        contacts: [],
        contactDetails: null,
        filterValue: ""
    },
    reducers: {
        reset: (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isMessage = false
            state.isLoadingContactCreate = false
            state.isSuccessContactCreate = false
            state.isErrorContactCreate = false
            state.isMessageContactCreate = null
            state.isErrorContactDelete = false
        },
        setContact: (state, action) => {
            state.contactDetails = action.payload
        },
        setFilterValue: (state, action) => {
            state.filterValue = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getContacts.pending, (state, action) =>{
            state.isLoading = true
        })
        .addCase(getContacts.fulfilled, (state, action) =>{
            state.isLoading = false
            // state.isSuccess = true
            state.contacts = action.payload
        })
        .addCase(getContacts.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            // state.isMessage = action.payload
        })
        .addCase(createContact.pending, (state, action) =>{
            state.isLoadingContactCreate = true
        })
        .addCase(createContact.fulfilled, (state, action) =>{
            state.isLoadingContactCreate = false
            state.isSuccessContactCreate = true
            state.isMessageContactCreate = action.payload
            // localStorage.setItem('token', action.payload)
        })
        .addCase(createContact.rejected, (state, action) =>{
            state.isLoadingContactCreate = false
            state.isErrorContactCreate = true
            state.isMessageContactCreate = action.payload
        })
        .addCase(updateContact.pending, (state, action) =>{
            state.isLoadingContactCreate = true
        })
        .addCase(updateContact.fulfilled, (state, action) =>{
            state.isLoadingContactCreate = false
            state.isSuccessContactCreate = true
            state.isMessageContactCreate = action.payload
            state.contactDetails = null
            // localStorage.setItem('token', action.payload)
        })
        .addCase(updateContact.rejected, (state, action) =>{
            state.isLoadingContactCreate = false
            state.isErrorContactCreate = true
            state.isMessageContactCreate = action.payload
        })
        .addCase(deleteContact.pending, (state, action) =>{
            state.isLoading = true
        })
        .addCase(deleteContact.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isMessage = action.payload
            // localStorage.setItem('token', action.payload)
        })
        .addCase(deleteContact.rejected, (state, action) =>{
            state.isLoading = false
            state.isErrorContactDelete = true
            state.isMessage = action.payload
        })
    }
})

export const { reset, setContact, setFilterValue } = contactSlice.actions
export default contactSlice.reducer