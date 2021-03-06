import React, { Component } from 'react'
import PostList from '../../components/postlist/PostList'
import CountryProfile from './countryprofile/CountryProfile'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { fetchCountryInfo} from '../../actions/countryInfoActions'
import { newPostCountryViewer } from '../../actions/newPostActions'
import PostArea from '../../components/postarea/PostArea'

import styles from './CountryViewer.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountNotRequiredRoute from '../../routes/AccountNotRequiredRoute';

class CountryViewer extends Component {

    componentDidMount() {        
        if(this.props.backButtonPressed === true) {
            window.scrollTo(0, this.props.scrollPositionY)
        } else {
            this.props.fetchCountryInfo(this.props.match.params.countryCode)
        }                        
    }


    getPostsDiv = () => {
        return (
            <div>
                {this.props.compose ?
                <PostArea  
                    countryCode={this.props.match.params.countryCode}
                    countryName={this.props.countryName}                    
                    newPost={this.props.newPostCountryViewer.bind(this)}
                /> 
                :
                <PostList 
                    fromCountryViewer={true}
                    originalPath={`/c/${this.props.match.params.countryCode}`}
                />
                }
                
            </div>)
    }

    getButtons = () => {
        return(
            <div className={styles.buttonsDiv}>
                <button className={`btn ${styles.btn} ${styles.postsButton}`}
                    onClick={(e) => {                            
                        this.props.navigateTo({ pathname: `/c/${this.props.match.params.countryCode}` });
                    }}>
                    posts
                </button>            
                <button className={`btn ${styles.btn} ${styles.newPostButton}`}
                    onClick={(e) => {      
                        this.props.navigateTo({ pathname: `/c/${this.props.match.params.countryCode}/new`});
                    }}>
                    new
                </button>
            </div>)
    }

    render() {
        const postsDiv = this.getPostsDiv()
        const buttons = this.getButtons()

        return (
            <AccountNotRequiredRoute>                   
                <br />
                <CountryProfile countryId={this.props.match.params.countryId} />

                <br /><br />

                {buttons}

                <br /><br />
                
                {postsDiv}

                <ToastContainer enableMultiContainer containerId={'newPostToast'} position={toast.POSITION.TOP_RIGHT} />

            </AccountNotRequiredRoute>
        )
    }

}


const mapStateToProps = (state) => ({
    countryName: state.countryInfo.countryName,
    postsResource: state.countryInfo.postsResource,
    loading: state.posts.loading,
    newPostSuccessful: state.newPost.successful,
    newPostLoading: state.newPost.loading,
    newPostError: state.newPost.error,
    newPostErrorMessage: state.newPost.errorMessage,
    backButtonPressed: state.posts.backButtonPressed,
    scrollPositionY: state.posts.scrollPositionY
})

const mapDispatchToProps = (dispatch) => ({
    navigateTo: (e) => dispatch(push(e)),
    fetchCountryInfo: (countryId) => dispatch(fetchCountryInfo(countryId)),
    newPostCountryViewer: (countryId, content) =>  dispatch(newPostCountryViewer(countryId, content)),

})

export default connect(mapStateToProps, mapDispatchToProps)(CountryViewer)
