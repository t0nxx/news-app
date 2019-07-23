import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Link } from 'react-router-dom';
import { List, Datagrid, TextField, DateField, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton, ReferenceArrayInput, SelectArrayInput, ChipField, ReferenceArrayField, ShowButton, RichTextField, TabbedForm, FormTab, SingleFieldList, ArrayField, ImageInput, ImageField, required, ReferenceManyField, ReferenceField, Button } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';
import RichTextInput from 'ra-input-rich-text';


const AddNewCommentButton = ({ record }) => (
    <Button
        component={Link}
        to={`/comments/create?postId=${record.id}`}
        label="Add a comment"
    >
        <ChatBubbleIcon />
    </Button>
);

export const PostList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" sortable={false} />
            <TextField source="reactionsCount" sortable={false} />
            <DateField source="createdAt" sortable={false} />
            <DateField source="updatedAt" sortable={false} />
            <EditButton basePath="/posts" />
        </Datagrid>
    </List>
);
const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostCreate = (props) => (
    <Create title="Create a Post" {...props}>
        <SimpleForm>
            <TextInput source="title" validate={required()} />
            {/* editor */}

            <RichTextInput source="body" toolbar={[
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'font': [] }],
                [{ 'direction': 'rtl' }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline', 'link', 'blockquote', 'video']]
            } />

            <ImageInput source="files" label="Related pictures , First One is background image" accept="image/*" multiple>
                <ImageField source="src" title="title" />
            </ImageInput>

            <ReferenceArrayInput label="categories" reference="categories" source="categories" perPage={100} validate={required()}>
                <SelectArrayInput >
                    <ChipField source="name" />
                </SelectArrayInput>
            </ReferenceArrayInput>

            <ReferenceArrayInput label="tags" reference="hashTags" source="tags" perPage={100} validate={required()}>
                <SelectArrayInput >
                    <ChipField source="name" />
                </SelectArrayInput>
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>

        <TabbedForm>
            <FormTab label="summary">
                <DisabledInput source="id" />
                <DisabledInput source="title" />
                <DisabledInput source="reactionsCount" />
                <RichTextField source="body" />
                <ImageField source="backgroundImage" title="backgroundImage" />

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
                <ReferenceArrayInput label="categories" reference="categories" source="categories" perPage={100} validate={required()}>
                    <SelectArrayInput source="name" >
                        <ChipField source="name" />
                    </SelectArrayInput>
                </ReferenceArrayInput>

                <ReferenceArrayInput label="tags" reference="hashTags" source="tags" perPage={100} validate={required()}>
                    <SelectArrayInput >
                        <ChipField source="name" />
                    </SelectArrayInput>
                </ReferenceArrayInput>
            </FormTab>
            <FormTab label="Comments">
                <ReferenceManyField
                    label="Comments"
                    reference="comments"
                    target="post.id"
                >
                    <Datagrid rowClick="edit">
                        <TextField source="id" />
                        <TextField source="body" sortable={false} />
                        <ReferenceField label="Author Name" source="user.id" reference="users" sortable={false}>
                            <ChipField source="fullName" />
                        </ReferenceField>
                        <ReferenceField label="Author Email" source="user.id" reference="users" sortable={false}>
                            <ChipField source="email" />
                        </ReferenceField>
                        <ReferenceField label="Post" source="post.id" reference="posts" sortable={false}>
                            <ChipField source="id" />
                        </ReferenceField>
                        <TextField source="reports" sortable={false} />
                        <DateField source="createdAt" sortable={false} />
                        <DateField source="updatedAt" sortable={false} />
                        <EditButton basePath="/comments" />
                    </Datagrid>
                </ReferenceManyField>
                <AddNewCommentButton />
            </FormTab>
        </TabbedForm>
    </Edit>
);
