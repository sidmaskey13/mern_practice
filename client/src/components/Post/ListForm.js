import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { savePostSuccess, updatePostSuccess } from "../../redux/post/action";
import { addPost, editPost } from "../../redux/post/api";
import { Form, Button } from 'semantic-ui-react'


function ListForm() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [_id, setId] = useState("");
    const editIndex = useSelector(state => state.posts.currentIndex)
    const posts = useSelector(state => state.posts.postList)
    const singlePost = useSelector(state => state.posts.singlePost)

    const dispatch = useDispatch()

    useEffect(() => {
        if (editIndex != -1) {
            setTitle(singlePost.title)
            setBody(singlePost.body)
            setId(singlePost._id)
        }
    }, [editIndex])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== -1) {
            dispatch(editPost({ _id, title, body }));
        }
        else {
            dispatch(addPost({ title, body }));
        }
        setTitle('')
        setBody('')
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Body</label>
                    <input placeholder='Body' value={body} onChange={e => setBody(e.target.value)} />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>

        </div>
    )

}

export default ListForm;