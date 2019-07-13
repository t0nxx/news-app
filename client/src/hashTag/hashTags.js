import React from 'react';
import { List, Datagrid, TextField, DateField, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton } from 'react-admin';

export const HashTagList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton basePath="/hashTags" />
            <DeleteButton basePath="/hashTags" />
        </Datagrid>
    </List>
);
const HashTagTitle = ({ record }) => {
    return <span>HashTag {record ? `"${record.name}"` : ''}</span>;
};

export const HashTagCreate = (props) => (
    <Create title="Create a HashTag" {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

export const HashTagEdit = (props) => (
    <Edit title={<HashTagTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);
