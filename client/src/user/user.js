import React from 'react';
import { List, Datagrid, TextField, DateField, EmailField, Create, Edit, SimpleForm, TextInput, SelectInput, DisabledInput, EditButton } from 'react-admin';
//ArrayField,Create, Edit, SimpleForm, TextInput, DisabledInput,SelectField

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
    return <span>User {record ? `"${record.name}"` : ''}</span>;
};

export const UserCreate = (props) => (
    <Create title="Create a User" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            {/* <SelectInput source="role" choices={[
                { id: 'admin', name: 'admin' },
                { id: 'maintainer', name: 'maintainer' },
                { id: 'user', name: 'user' }
            ]} optionText={"name"} optionValue={"id"} /> */}
        </SimpleForm>
    </Create>
);

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="firstName" />
            <DisabledInput source="lastName" />
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
