/**
 * JavaScript for luzmcosta.com
 *
 * @author Luz M. Costa <luzmcosta@gmail.com>
 * @updated 11.29.2014
 * @version 0.1
 */

var Tracker = {
    initialize: function() {
        // Bind methods to events.
        $( "#email" ).click( this.email );
        $( "#linkedin" ).click( this.linkedin );
        $( "#twitter" ).click( this.twitter );
    },
    email: function() {
        this.send( "contact", "click", "Email" );
    },
    linkedin: function() {
        this.send( "social", "go", "LinkedIn" );
    },
    twitter: function() {
        this.send( "social", "go", "Twitter" );
    },
    send: function( category, action, label ) {
        var ga = ga || {};

        ga( "send", "event", category, action, label );
    }
};

Tracker.initialize();
