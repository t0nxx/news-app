import React from 'react';
import { Filter, SelectInput, TextInput } from 'react-admin';

export const SearchFilter = (props) => (
    <Filter {...props} >
        <TextInput label="Search" source="query" alwaysOn />
        {/* < SelectInput optionText="name" /> */}
    </Filter>
);