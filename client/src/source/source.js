import React from 'react';
import { List, Datagrid, TextField, ImageInput, ImageField, DateField, Create, Edit, SimpleForm, required, TextInput, DisabledInput, EditButton, DeleteButton, } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';

export const SourceList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="link" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton basePath="/sources" />
        </Datagrid>
    </List>
);
const SourceTitle = ({ record }) => {
    return <span>Source {record ? `"${record.name}"` : ''}</span>;
};

export const SourceCreate = (props) => (
    <Create title="Create a Source" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="link" validate={required()} />
            <ImageInput source="files" label="Background image" accept="image/*" validate={required()}>
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const SourceEdit = (props) => (
    <Edit title={<SourceTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            <TextInput source="link" />
            <ImageField source="backgroundImage" title="backgroundImage" />
            <ImageInput source="files" label="Background image" accept="image/*" >
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);
