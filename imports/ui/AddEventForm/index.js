import AddEventForm from './AddEventForm.jsx';
import composeWithTracker from 'compose-with-tracker';

import { withAuthentication } from '../Auth/Auth'

const loader = ({ history }, onData) => {
    const subscription = Meteor.subscribe('events');

    if (subscription.ready()) {
        onData(null, {
            onFormSubmit: event => {
                Meteor.call('addEvent', event, (err, insertedId) => {
                    if (!err) {
                        history.push(`/events/${insertedId}`)
                    }
                })
            }
        });
    }
};

export default composeWithTracker(loader)(withAuthentication(AddEventForm));