import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary';

const WithErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: false
        }
        
        componentDidMount(){
            axios.interceptors.request.use(req => {
                this.setState({error : null});
                return req;
              });

            axios.interceptors.response.use(res => res,(error) => {
                this.setState({error : true});
              });
        }

        closeModalHandler = ()=> {
            this.setState({error: null});
        }

        render(){
            return (
                <Aux>
                    <Modal show = {this.state.error}
                           clicked = {this.closeModalHandler}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrapperComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

export default WithErrorHandler;