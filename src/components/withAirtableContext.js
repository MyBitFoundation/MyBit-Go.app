import React from 'react';
import { AirtableContext } from './Airtable';

const WithAirtableContext = (Component) => {
    return function WrapperComponent(props) {
        return (
            <AirtableContext.Consumer>
                {state => <Component {...props} airtableContext={state} />}
            </AirtableContext.Consumer>
        );
    };
}

export default WithAirtableContext;
