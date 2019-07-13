import React, { Component } from 'react'
import AppNavbar from '../../components/appnavbar/AppNavbar'
import { connect } from 'react-redux'
import FavouritesButton from '../../components/post/FavouritesButton'

import styles from './PostViewer.scss'

import { fetchPostInfo } from '../../actions/postInfoActions'
import { favouritePost, backButtonPressed } from '../../actions/postsActions'
import { showCollapsableCommentArea } from '../../actions/newCommentActions'
import PostHeader from '../../components/postheader/PostHeader'
import BackButton from './BackButton'
import CommentArea from '../../components/commentarea/CommentArea'
import CollapsableView from '../../components/collapsableview/CollapsableView'
import CommentTree from '../../components/commenttree/CommentTree'

class PostViewer extends Component {

    componentDidMount() {
        this.props.fetchPostInfo(this.props.match.params.postId)        
    }


    render() {
        
        return (
            <div>
                <AppNavbar />
                <CollapsableView 
                    visible={this.props.commentAreaVisible}
                    showCollapsableArea={this.props.showCollapsableCommentArea.bind(this)}
                    
                >
                    <CommentArea
                        className={styles.commentArea}
                        parentPostAuthorName={this.props.name}
                        parentPostId={this.props.match.params.postId}
                    />
                </CollapsableView>

                <br /> <br /> <br />

                <div className={`container ${styles.div} ${styles.story}`}>
                    <BackButton
                        styles={styles}
                        backButtonPressed={this.props.backButtonPressed.bind(this)}
                        originalPath={this.props.originalPath}
                    />

                    <br /><br /><br />

                    <PostHeader
                        user={this.props.user}
                        email={this.props.email}
                        timeDiff={this.props.timeDiff}
                    />

                    <blockquote className={styles.content}>
                        {this.props.content}
                    </blockquote>

                    <div className={`container ${styles.actions}`}>
                        <i className={`col-sm-3 col-xs-3 col-lg-3 col-md-3 glyphicon glyphicon-comment ${styles.commentIcon}`}
                            onClick={() => {
                                this.props.showCollapsableCommentArea(true);
                            }}
                        />
                        <div className={`col-sm-3 col-xs-3 col-lg-3 col-md-3`}>{this.props.commentsCount}</div>

                        <div className={`col-sm-3 col-xs-3 col-lg-3 col-md-3`}>
                            <FavouritesButton
                                styles={styles}
                                isFavourite={this.props.favourite}
                                favourite={this.props.favouritePost.bind(this)}
                                resource={this.props.favouritesResource}
                                loading={this.props.favouritePostLoading}
                            />
                        </div>
                        <div className={`col-sm-3 col-xs-3 col-lg-3 col-md-3`}>{this.props.favouritesCount}</div>
                    </div>
                </div>

                <br /><br />

                <CommentTree />
            </div >

        )
    }

}


const mapStateToProps = (state) => ({
    comments: state.postInfo.comments,
    content: state.postInfo.content,
    name: state.postInfo.name,
    email: state.postInfo.email,
    timeDiff: state.postInfo.timeDiff,
    favourite: state.postInfo.favourite,
    favouritesCount: state.postInfo.favouritesCount,
    commentsCount: state.postInfo.commentsCount,
    favouritesResource: state.postInfo.favouritesResource,
    favouritePostLoading: state.posts.favouriteLoading,
    originalPath: state.posts.originalPath,
    commentAreaVisible: state.newComment.commentAreaVisible
})

const mapDispatchToProps = (dispatch) => ({
    favouritePost: (resource, method) => dispatch(favouritePost(resource, method)),
    fetchPostInfo: (postId) => dispatch(fetchPostInfo(postId)),
    backButtonPressed: (path) => dispatch(backButtonPressed(path)),
    showCollapsableCommentArea: (bool) => dispatch(showCollapsableCommentArea(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostViewer)
