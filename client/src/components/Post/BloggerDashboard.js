import React, { Component } from 'react';
import ListTable from './ListTable';
import ListForm from './ListForm';

function BloggerDashboard() {
    return (
        <div>
            <h1>Posts</h1>
            <div className="container">
                <ListForm />
                <hr />
                <ListTable />
            </div>
        </div>
    )
}
export default BloggerDashboard;