import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { allPullRequests } from '../../actions';

import config from '../../config';
import PullRequestItem from './pullrequest_item';

class PullRequestList extends Component {

  componentDidMount () {
    axios.get(`${config.baseServerUrl}/pullrequests`)
      .then(res => this.props.allPullRequests(res.data))
  };

  renderPullRequestItem (pulls) {
    return pulls.map(pull => {
      return (
        <div key={pull._id}>
          <PullRequestItem
            repo={pull.repository.name} 
            closed_at={pull.closed_at}
            merged_at={pull.merged_at} 
            created_at={pull.created_at} 
            updated_at={pull.updated_at} 
            action={pull.action} 
            title={pull.title} 
            number={pull.number} 
            state={pull.state}
            comment={pull.comment}
            comments={pull.comments}            
          />
        </div>
      )
    })
  }


  render () {
    if (this.props.pulls) {  
      return (
        <div>
          {this.renderPullRequestItem(this.props.pulls)}
        </div>
      )
    } else {
      return <p>Loading</p>
    }
  }
}

const mapStateToProps = ({ repos, pulls }) => ({
  repos,
  pulls
})

const mapDispatchToProps = (dispatch) => ({
  allPullRequests: (pulls) => dispatch(allPullRequests(pulls))
})

export default connect(mapStateToProps, mapDispatchToProps)(PullRequestList);