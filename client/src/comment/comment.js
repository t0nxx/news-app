import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Link } from 'react-router-dom';
import { Button, List, Datagrid, TextField, DateField, Create, Edit, SimpleForm, TextInput, DisabledInput, EditButton, DeleteButton, ReferenceField, ChipField, TabbedForm, FormTab, ReferenceManyField, ReferenceInput, SelectInput } from 'react-admin';
import { SearchFilter } from '../shared/serachFilter';
import { parse } from 'query-string';

const AddNewReplyButton = ({ record }) => (
    <Button
        component={Link}
        to={`/comments/create?parentId=${record.id}&postId=${record.post.id}`}
        label="Add a Reply"
    >
        <ChatBubbleIcon />
    </Button>
);

export const CommentList = props => (
    <List filters={<SearchFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="body" sortable={false} />
            <ReferenceField label="Post" source="post.id" reference="posts" sortable={false}>
                <ChipField source="id" />
            </ReferenceField>
            <TextField source="reports" sortable={false} />
            <DateField source="createdAt" sortable={false} />
            <DateField source="updatedAt" sortable={false} />
        </Datagrid>
    </List>
);
const CommentTitle = ({ record }) => {
    return <span>Comment {record ? `"${record.body}"` : ''}</span>;
};

export const CommentCreate = (props) => {

    const postId = parse(props.location.search).postId;
    const parentId = parse(props.location.search).parentId || null;

    return (
        <Create title="Create a Comment" {...props}>
            <SimpleForm
                defaultValue={{ postId, parentId }}
                redirect={`/posts/${postId}/2`}
            >
                <DisabledInput source="postId" />
                <DisabledInput source="parentId" />

                <TextInput source="body" />
            </SimpleForm>
        </Create>
    )
};

export const CommentEdit = (props) => (
    <Edit title={<CommentTitle />} {...props}>
        <TabbedForm>
            <FormTab label="summary">
                <DisabledInput source="id" />
                <DisabledInput source="body" />
            </FormTab>
            <FormTab label="replies">
                <ReferenceManyField
                    label="replies"
                    reference="comments"
                    target="parentId"
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
                <AddNewReplyButton />
            </FormTab>
        </TabbedForm>
    </Edit>
);
