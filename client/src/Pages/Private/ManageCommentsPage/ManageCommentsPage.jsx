import React from 'react'
import axios from 'axios'

import { TitleMain, CardComment } from './../../../Components'
import { DefaultLayout } from './../../../Layouts'

class ManageCommentsPage extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            comments: null
        }
    }

    componentDidMount()
    {
        this.fetchComments()
    }

    fetchComments()
    {
        axios.get(process.env.REACT_APP_API_ROOT + 'comment/all').then((result)=> {
            if(result.status === 200)
            {
                this.setState({
                    comments: result.data
                })
            }
        }).catch((error)=> {
            console.log(error)
        })
    }

    handleApproveStatus(comment)
    {
        let status = !comment.isApproved
        let url = process.env.REACT_APP_API_ROOT + `comment/approve/${comment._id}?status=${status}`
        axios.get(url).then((result)=> {
            if(result.status === 200)
            {
                this.fetchComments()
            }
        }).catch((error)=> {
            console.log(error)
        })
    }

    createCommentCards()
    {
        if(this.state.comments !== null)
        {
            return this.state.comments.map((comment, index)=> {
                return (
                    <div className="mb-3" key={ 'comment_' + index }>
                        <CardComment author={ 'Serban' }
                                     subject={ comment.title }
                                     content={ comment.content }
                                     isApproved={ comment.isApproved }
                                     onApproveChange={ ()=> this.handleApproveStatus(comment) }/>
                    </div>
                )
            })
        }
        return null
    }

    render()
    {
        return (
            <div>
                <DefaultLayout>
                    <TitleMain>Manage comments</TitleMain>
                </DefaultLayout>
                <DefaultLayout col={ 6 } horizontalCenter>
                    { this.createCommentCards() }
                </DefaultLayout>
            </div>
        )
    }
}

export default ManageCommentsPage
