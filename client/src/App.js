import React from 'react';
import { Admin, Resource } from 'react-admin';
import { CategoryList, CategoryCreate, CategoryEdit } from './category/categories';
import { HashTagList, HashTagCreate, HashTagEdit } from './hashTag/hashTags';
import { UserList } from './user/user';
import dataProvider from './dataProvider/dataProvider';
import authProvider from './auth/authProvider';



const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} />
    <Resource name="hashTags" list={HashTagList} create={HashTagCreate} edit={HashTagEdit} />
    <Resource name="users" list={UserList} />
  </Admin>
);

export default App;