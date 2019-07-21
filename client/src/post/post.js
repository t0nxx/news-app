import React from 'react';
import { List, Datagrid, TextField, DateField, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton, ReferenceArrayInput, SelectArrayInput, ChipField, ReferenceArrayField, ShowButton, RichTextField, TabbedForm, FormTab, SingleFieldList, ArrayField, ImageInput, ImageField, required } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';
import RichTextInput from 'ra-input-rich-text';


export const PostList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" sortable={false} />
            <DateField source="createdAt" sortable={false} />
            <DateField source="updatedAt" sortable={false} />
            <EditButton basePath="/posts" />
            {/* <DeleteButton basePath="/posts" />  */}
        </Datagrid>
    </List>
);
const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostCreate = (props) => (
    <Create title="Create a Post" {...props}>
        <SimpleForm>
            <TextInput source="title" required />
            {/* editor */}

            <RichTextInput source="body" required toolbar={[
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'font': [] }],
                [{ 'direction': 'rtl' }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline', 'link', 'blockquote', 'video']]
            } />

            <ImageInput source="files" label="Related pictures , First One is background image" accept="image/*" multiple>
                <ImageField source="src" title="title" />
            </ImageInput>

            <ReferenceArrayInput label="categories" reference="categories" source="categories" perPage={100}>
                <SelectArrayInput >
                    <ChipField source="name" />
                </SelectArrayInput>
            </ReferenceArrayInput>

            <ReferenceArrayInput label="tags" reference="hashTags" source="tags" perPage={100}>
                <SelectArrayInput >
                    <ChipField source="name" />
                </SelectArrayInput>
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        {/* <SimpleForm> */}
        <TabbedForm>
            <FormTab label="summary">
                <DisabledInput source="id" />
                <DisabledInput source="title" />
                <RichTextField source="body" />

                <ArrayField source="categories">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>

                <ArrayField source="tags">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>

            </FormTab>
            <FormTab label="update">
                <TextInput source="title" />
                <RichTextInput source="body" toolbar={[
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'font': [] }],
                    [{ 'direction': 'rtl' }],
                    [{ 'align': [] }],
                    ['bold', 'italic', 'underline', 'link', 'blockquote', 'video']]
                } />
            </FormTab>
        </TabbedForm>
        {/* <TextInput source="content" /> */}
        {/* </SimpleForm> */}
    </Edit>
);
