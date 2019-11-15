import React from 'react';
import { List, Datagrid, TextField, DateField, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton, ReferenceField, ChipField, TabbedForm, FormTab, ReferenceManyField, ReferenceInput, SelectInput } from 'react-admin';

export const ReportList = props => (
    <List  {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="body" sortable={false} />
            <ReferenceField label="Comment" source="comment.id" reference="comments" sortable={false}>
                <ChipField source="id" />
            </ReferenceField>
            <ReferenceField label="Author Name" source="user.id" reference="users" sortable={false}>
                <ChipField source="fullName" />
            </ReferenceField>
            <ReferenceField label="Author Email" source="user.id" reference="users" sortable={false}>
                <ChipField source="email" />
            </ReferenceField>
            <DateField source="createdAt" sortable={false} />
        </Datagrid>
    </List>
);
const ReportTitle = ({ record }) => {
    return <span>Report {record ? `"${record.body}"` : ''}</span>;
};

export const ReportEdit = (props) => (
    <Edit title={<ReportTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DisabledInput source="body" />
        </SimpleForm>
    </Edit>
);