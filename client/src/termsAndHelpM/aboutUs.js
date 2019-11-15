import React from 'react';
import { List, Datagrid, TextField, DateField, required, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';

export const AboutUsList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="body" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton basePath="/aboutUs/dashboard" />
        </Datagrid>
    </List>
);
const AboutUsTitle = ({ record }) => {
    return <span>AboutUs </span>;
};

// export const AboutUsCreate = (props) => (
//     <Create title="Create a AboutUs" {...props}>
//         <SimpleForm>
//             <TextInput source="body" validate={required()} />
//         </SimpleForm>
//     </Create>
// );

export const AboutUsEdit = (props) => (
    <Edit title={<AboutUsTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="body" />
        </SimpleForm>
    </Edit>
);
