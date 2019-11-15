import React from 'react';
import { List, Datagrid, TextField, DateField, required, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton , EmailField } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';

export const HelpMeList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="phone" />
            <EmailField source="email" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton basePath="/helpMe" />
        </Datagrid>
    </List>
);
const HelpMeTitle = ({ record }) => {
    return <span>HelpMe </span>;
};

// export const HelpMeCreate = (props) => (
//     <Create title="Create a HelpMe" {...props}>
//         <SimpleForm>
//             <TextInput source="body" validate={required()} />
//         </SimpleForm>
//     </Create>
// );

export const HelpMeEdit = (props) => (
    <Edit title={<HelpMeTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextField source="name" />
            <TextField source="phone" />
            <EmailField source="email" />
            <TextField source="descrption" />
        </SimpleForm>
    </Edit>
);
