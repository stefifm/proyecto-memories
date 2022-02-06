import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts.actions';

export const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [singleComment, setSingleComment] = useState('');
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const user = JSON.parse(localStorage.getItem('profile'));

  const handleClick = async () => {
    await dispatch(
      commentPost(
        `${user?.result?.name}:  ${singleComment}`,
        post._id,
        setComments,
        commentsRef
      )
    );

    setSingleComment('');
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comentarios
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div
            style={{ width: '95%', marginLeft: '20px', marginRight: '10px' }}
          >
            <Typography gutterBottom variant="h6">
              Escriba un comentario
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comentario"
              multiline
              value={singleComment}
              onChange={(e) => setSingleComment(e.target.value)}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!singleComment}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Enviar comentario
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
