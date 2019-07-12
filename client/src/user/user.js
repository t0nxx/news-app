import React from 'react';
import { List, Datagrid, TextField, DateField, EmailField, } from 'react-admin';
//ArrayField,Create, Edit, SimpleForm, TextInput, DisabledInput

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <EmailField source="email" />
            <TextField source="number" />
            <TextField source="role" />
            <DateField source="createdAt" />
            {/* <ArrayField source="subscribed">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                </Datagrid>
            </ArrayField> */}
        </Datagrid>
    </List>
);
// const UserTitle = ({ record }) => {
//     return <span>User {record ? `"${record.name}"` : ''}</span>;
// };

// export const UserCreate = (props) => (
//     <Create title="Create a User" {...props}>
//         <SimpleForm>
//             <TextInput source="name" />
//         </SimpleForm>
//     </Create>
// );

// export const UserEdit = (props) => (
//     <Edit title={<UserTitle />} {...props}>
//         <SimpleForm>
//             <DisabledInput source="id" />
//             <TextInput source="name" />
//         </SimpleForm>
//     </Edit>
// );
