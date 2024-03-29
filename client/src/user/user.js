import React from 'react';
import { List, Datagrid, TextField, DateField, EmailField, Create, Edit, SimpleForm, TextInput, SelectInput, DisabledInput, EditButton } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';
//ArrayField,Create, Edit, SimpleForm, TextInput, DisabledInput,SelectField

export const UserList = props => (
    <List filters={<SearchFilter />}{...props} perPage={2000}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="fullName" />
            <EmailField source="email" />
            <TextField source="number" />
            <TextField source="role" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton basePath="/users" />
            {/* <ArrayField source="subscribed">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                </Datagrid>
            </ArrayField> */}
        </Datagrid>
    </List>
);
const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.fullName}"` : ''}</span>;
};

// export const UserCreate = (props) => (
//     <Create title="Create a User" {...props}>
//         <SimpleForm>
//             <TextInput source="name" />
//             {/* <SelectInput source="role" choices={[
//                 { id: 'admin', name: 'admin' },
//                 { id: 'maintainer', name: 'maintainer' },
//                 { id: 'user', name: 'user' }
//             ]} optionText={"name"} optionValue={"id"} /> */}
//         </SimpleForm>
//     </Create>
// );

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="fullName" />
            <DisabledInput source="email" />
            <DisabledInput source="number" />
            <SelectInput source="role" choices={[
                { id: 'admin', name: 'admin' },
                { id: 'maintainer', name: 'maintainer' },
                { id: 'user', name: 'user' }
            ]} />
        </SimpleForm>
    </Edit>
);
