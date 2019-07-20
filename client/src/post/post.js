import React from 'react';
import { List, Datagrid, TextField, DateField, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';

export const PostList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="content" sortable={false} />
            <DateField source="createdAt" sortable={false} />
            <DateField source="updatedAt" sortable={false} />
            {/* <EditButton basePath="/posts" />
            <DeleteButton basePath="/posts" /> */}
        </Datagrid>
    </List>
);
const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.name}"` : ''}</span>;
};

export const PostCreate = (props) => (
    <Create title="Create a Post" {...props}>
        <SimpleForm>
            <TextInput source="content" />
        </SimpleForm>
    </Create>
);

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="content" />
            {/* <TextInput source="content" /> */}
        </SimpleForm>
    </Edit>
);
