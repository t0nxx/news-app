import React from 'react';
import { Admin, Resource } from 'react-admin';
/* icons start*/
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/People';
import ListIcon from '@material-ui/icons/LibraryBooks';
import CommentIcon from '@material-ui/icons/Comment';
import ReportIcon from '@material-ui/icons/Report';
import SourceIcon from '@material-ui/icons/Apps';
import FileUpload from '@material-ui/icons/FileUpload';
import NotificationsIcon from '@material-ui/icons/Notifications';
/* icons end */

/* rest providers & auth start*/
import dataProvider from './dataProvider/dataProvider';
import authProvider from './auth/authProvider';
/* rest providers & auth end*/

/* dashboard modules start */
import { CategoryList, CategoryCreate, CategoryEdit } from './category/categories';
import { HashTagList, HashTagCreate, HashTagEdit } from './hashTag/hashTags';
import { UserList, UserEdit } from './user/user';
import { PostList, PostCreate, PostEdit } from './post/post';
import { CommentList, CommentEdit, CommentCreate } from './comment/comment';
import { SourceList, SourceEdit, SourceCreate } from './source/source';
import { UploaderList, UploaderCreate, UploaderEdit } from './uploader/uploader';
import { NotificationList, NotificationCreate } from './notification/notification';
import Dashboard from './dashboard/dashboard';
import { AboutUsEdit, AboutUsList } from './termsAndHelpM/aboutUs';
import { HelpMeList, HelpMeEdit } from './termsAndHelpM/helpMe';
import { TermsList, TermsEdit } from './termsAndHelpM/terms';
import { ReportList, ReportEdit } from './reports/reports';
/* dashboard modules end */

const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    {permissions => [
      permissions === 'admin'
        ? <Resource name="users" list={UserList} edit={UserEdit} icon={UserIcon} />
        : null,

      <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} />,
      <Resource name="hashTags" list={HashTagList} create={HashTagCreate} edit={HashTagEdit} icon={ListIcon} />,
      <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} icon={PostIcon} />,
      <Resource name="comments" create={CommentCreate} edit={CommentEdit} icon={CommentIcon} />,
      <Resource name="sources" list={SourceList} create={SourceCreate} edit={SourceEdit} icon={SourceIcon} />,
      <Resource name="uploads" list={UploaderList} create={UploaderCreate} edit={UploaderEdit} icon={FileUpload} />,
      <Resource name="notifications" list={NotificationList} create={NotificationCreate} icon={NotificationsIcon} />,
      <Resource name="aboutUs/dashboard" list={AboutUsList} edit={AboutUsEdit} icon={SourceIcon} />,
      <Resource name="helpMe" list={HelpMeList} edit={HelpMeEdit} icon={NotificationsIcon} />,
      <Resource name="terms/dashboard" list={TermsList} edit={TermsEdit} icon={CommentIcon} />,
      // <Resource name="reports" list={ReportList} edit={ReportEdit} icon={ReportIcon} />,

    ]}

  </Admin>
);

export default App;