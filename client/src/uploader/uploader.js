import React from 'react';
import { List, Datagrid, TextField, FileInput, FileField, DateField, Create, Edit, required, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton, } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';

export const UploaderList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <FileField source="url" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton basePath="/uploads" />
        </Datagrid>
    </List>
);
const UploaderTitle = ({ record }) => {
    return <span>Uploader {record ? `"${record.url}"` : ''}</span>;
};

export const UploaderCreate = (props) => (
    <Create title="Create a Uploader" {...props}>
        <SimpleForm>
            <FileInput source="files" label="upload video" accept="video/*" validate={required()} >
                <FileField source="src" />
            </FileInput>
        </SimpleForm>
    </Create>
);

export const UploaderEdit = (props) => (
    <Edit title={<UploaderTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="url" />
        </SimpleForm>
    </Edit>
);
