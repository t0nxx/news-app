import React from 'react';
import { List, Datagrid, TextField, DateField, required, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';

export const TermsList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="body" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton basePath="/terms/dashboard" />
        </Datagrid>
    </List>
);
const TermsTitle = ({ record }) => {
    return <span>Terms And Condations </span>;
};

// export const TermsCreate = (props) => (
//     <Create title="Create a Terms" {...props}>
//         <SimpleForm>
//             <TextInput source="body" validate={required()} />
//         </SimpleForm>
//     </Create>
// );

export const TermsEdit = (props) => (
    <Edit title={<TermsTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="body" />
        </SimpleForm>
    </Edit>
);
