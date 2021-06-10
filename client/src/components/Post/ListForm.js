import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { savePostSuccess, updatePostSuccess, clearPostForm } from "../../redux/post/action";
import { fetchCategory } from "../../redux/category/api";
import { addPost, editPost } from "../../redux/post/api";
import { Form, Button, TextArea } from 'semantic-ui-react'
import CreatableSelect from 'react-select/creatable';

function ListForm() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [active, setActive] = useState(false);
    const [_id, setId] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);

    const editIndex = useSelector(state => state.posts.currentIndex)
    const singlePost = useSelector(state => state.posts.singlePost)
    const categoryList = useSelector(state => state.category.categoryList)

    const dispatch = useDispatch()

    useEffect(() => {
        if (editIndex != -1) {
            setTitle(singlePost.title)
            setBody(singlePost.body)
            setActive(JSON.parse(String(singlePost.is_active).toLowerCase()))
            setId(singlePost._id)
            setCategory(singlePost.category._id)

            let listSellerNormalized = [];
            singlePost.tags.map(each => {
                let obj = {
                    label: each,
                    value: each
                };
                listSellerNormalized = [
                    ...listSellerNormalized,
                    obj,
                ];
            });
            console.log(listSellerNormalized)

            setTags(listSellerNormalized)
        }
    }, [editIndex])

    useEffect(() => {
        dispatch(fetchCategory());
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== -1) {
            let temp = []
            tags.map(i => temp.push(i.value))
            dispatch(editPost({ _id, title, body, category, tags: temp, is_active: active }));
        }
        else {
            let temp = []
            tags.map(i => temp.push(i.value))
            dispatch(addPost({ title, body, category, tags: temp, is_active: active }));
        }
        clearForm()
    };

    const handleClearBtn = (e) => {
        e.preventDefault();
        dispatch(clearPostForm())
        clearForm()
    };

    const clearForm = () => {
        setTitle('')
        setBody('')
        setId('')
        setTags('')
        setCategory('')
        setActive(false)
    }


    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]


    const handleChange = (tags) => {
        setTags(tags)
    };
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Body</label>
                    <TextArea placeholder='Tell us more' value={body} onChange={e => setBody(e.target.value)} required />
                </Form.Field>
                <Form.Field>
                    <label>Is Active</label>
                    <input type='checkbox' value={active} onChange={e => setActive(e.target.checked)} checked={active} />
                </Form.Field>
                <Form.Field>
                    <label>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} required>
                        <option value="" disabled selected hidden>Please Choose Category...</option>
                        {categoryList ? categoryList.map((category, index) => (
                            <option value={category._id}>{category.title}</option>
                        )) : "No data"}
                    </select>

                </Form.Field>
                <Form.Field>
                    <label>Tags</label>
                    <CreatableSelect
                        isMulti
                        isClearable
                        placeholder="Type something and press enter..."
                        onChange={handleChange}
                        value={tags}
                    />
                </Form.Field>
                <Button type='submit'>Submit</Button>
                <Button onClick={handleClearBtn}>Clear</Button>
            </Form>

        </div>
    )

}

export default ListForm;