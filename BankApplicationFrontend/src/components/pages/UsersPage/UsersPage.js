import React from 'react';
import { connect } from 'react-redux'
import { showDialog } from '../../../actions';
import UserList from './UserList/UserList'
import Request from '../../../services/Request';
import { URL_RETRIEVEALLUSERS } from '../../../config/constants'

const mapDispatchToProps = dispatch => ({
    showPopup: (title, message) => dispatch(showDialog(title, message))
})

class UsersPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        const request = new Request().getRequestInstance();
        request.get(URL_RETRIEVEALLUSERS)
            .then((response) => {
                console.log(response);
                this.setState({ users: response.data });
            }).catch((error) => {
                console.log(error);
                var errorMessage = 'Network error.';
                if (error != null && error.response != null && error.response.data != null && error.response.data.message != null) {
                    errorMessage = error.response.data.message;
                }
                this.props.showPopup(0, errorMessage);
            });
    }

    render() {
        return (
            <UserList users={this.state.users} />
        )
    }
}

export default connect(null, mapDispatchToProps)(UsersPage)