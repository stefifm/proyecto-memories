import React, { useEffect, useState } from 'react';
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from '@jansedlon/material-ui-chip-input';

import { Form } from '../Form/Form';
import { Posts } from '../Posts/Posts';
import { Paginate } from '../Pagination';
import { useDispatch } from 'react-redux';
import { getPosts, getPostBySearch } from '../../actions/posts.actions';

import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(',') }));
      navigate(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      navigate('/');
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagtoDelete) =>
    setTags(tags.filter((tag) => tag !== tagtoDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Buscar Recuerdos"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Buscar Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Buscar
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
