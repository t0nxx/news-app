import React from 'react';
import { List, Datagrid, TextField, DateField, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton, ReferenceArrayInput, SelectArrayInput, ChipField, ReferenceArrayField, ShowButton, RichTextField, TabbedForm, FormTab, SingleFieldList, ArrayField, ImageInput, ImageField, required, ReferenceManyField, ReferenceField, Button } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';

export const NotificationList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="title" sortable={false} />
            <TextField source="body" sortable={false} />
            <DateField source="createdAt" sortable={false} />
            <DateField source="updatedAt" sortable={false} />
        </Datagrid>
    </List>
);

export const NotificationCreate = (props) => (
    <Create title="Create a Notification" {...props}>
        <SimpleForm>
            <TextInput source="title" validate={required()} />
            <TextInput source="body" validate={required()} />
            <ReferenceArrayInput label="categories" reference="categories" source="categories" perPage={100} validate={required()}>
                <SelectArrayInput >
                    <ChipField source="name" />
                </SelectArrayInput>
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);