import React from 'react';
import { Admin, Resource } from 'react-admin';
/* icons start*/
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/People';
import ListIcon from '@material-ui/icons/LibraryBooks';
import CommentIcon from '@material-ui/icons/Comment';
import ReportIcon from '@material-ui/icons/Report';
/* icons end */

/* rest providers & auth start*/
import dataProvider from './dataProvider/dataProvider';
import authProvider from './auth/authProvider';
/* rest providers & auth end*/

/* dashboard modules start */
import { CategoryList, CategoryCreate, CategoryEdit } from './category/categories';
import { HashTagList, HashTagCreate, HashTagEdit } from './hashTag/hashTags';
import { UserList, UserEdit, UserCreate } from './user/user';
/* dashboard modules end */

const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    {permissions => [
      permissions === 'admin'
        ? <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} icon={UserIcon} />
        : null,
      <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} />,
      <Resource name="hashTags" list={HashTagList} create={HashTagCreate} edit={HashTagEdit} icon={ListIcon} />,
      <Resource name="posts" icon={PostIcon} />,
      <Resource name="comments" icon={CommentIcon} />,
      <Resource name="reports" icon={ReportIcon} />

    ]}

  </Admin>
);

export default App;