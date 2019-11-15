import React from 'react';
import { List, Datagrid, TextField, ImageInput, ImageField, DateField, Create, Edit, SimpleForm, required, TextInput, DisabledInput, EditButton, DeleteButton, } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';

export const CategoryList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton basePath="/categories" />
        </Datagrid>
    </List>
);
const CategoryTitle = ({ record }) => {
    return <span>Category {record ? `"${record.name}"` : ''}</span>;
};

export const CategoryCreate = (props) => (
    <Create title="Create a Category" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            {/* <ImageInput source="files" label="Background image" accept="image/*" validate={required()}>
                <ImageField source="src" title="title" />
            </ImageInput> */}
        </SimpleForm>
    </Create>
);

export const CategoryEdit = (props) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
            {/* <ImageField source="backgroundImage" title="backgroundImage" />
            <ImageInput source="files" label="Background image" accept="image/*" validate={required()}>
                <ImageField source="src" title="title" />
            </ImageInput> */}
        </SimpleForm>
    </Edit>
);
