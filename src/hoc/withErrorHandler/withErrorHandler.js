import React, { useEffect, useState } from 'react';
import Modal from '../../components/ui/modal/modal';
import Aux from '../aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);
        useEffect(() => {
            const rq = axios.interceptors.request.use(req => {
                setError(null);
                return req;
            })

            const rs = axios.interceptors.response.use(res => res, err => {
                setError(err);
            })

            return () => {
                axios.interceptors.request.eject(rq);
                axios.interceptors.response.eject(rs);
            }
        }, []);

        const errorConfirmedHandler = () => setError(null);
        return (
            <Aux>
                <Modal show={error} clicked={errorConfirmedHandler}>
                    {error}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;