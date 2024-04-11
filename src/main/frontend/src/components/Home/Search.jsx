import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { searchMenuItems } from '../State/Menu/Action';
import MenuCard from '../Menu/MenuCard';

const SearchPage = () => {
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState('');
    const { menu } = useSelector(store => store); // Assuming menu is stored in the Redux store
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (searchKeyword !== '') {
            dispatch(searchMenuItems({ keyword: searchKeyword, jwt }));
        }
    }, [searchKeyword, dispatch, jwt]);

    const handleSearch = () => {
        // Trigger search only if the keyword is not empty
        if (searchKeyword.trim() !== '') {
            dispatch(searchMenuItems({ keyword: searchKeyword, jwt }));
        }
    };

    return (
        <div className="container mx-auto m-10">
            <div className="flex items-center justify-center">
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="normal"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="mr-4"
                    sx={{ marginRight: '8px' }}
                />
               
            </div>
            <br />
            <div className="space-y-5 lg:pl-10">
                {menu.search.map((item) => (
                    <MenuCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
