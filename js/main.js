/**
 * JavaScript for luzmcosta.com
 *
 * @author Luz M. Costa <luzmcosta@gmail.com>
 * @updated 11.30.2014
 * @version 0.1
 */

"use strict";

var Tracker, Phrases;

Tracker = {
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

Phrases = {
    el: $( "#summary" ),
    initialize: function() {
        // Set content to scroll.
        this.scroll();

        // Set click events on options.
        this.setOptions();
    },
    /**
     * Toggles the options in and out of view.
     */
    animate: function( el, classes ) {
        // Toggle options in/out of view.
        $( el ).toggleClass( classes );
    },
    setOptions: function() {
        // Set click events on play option.
        $( ".fa-play" )
            .off()
            .on( "click", this.play.call( this, true ) );

        // Set click events on pause option.
        $( ".fa-pause" )
            .off()
            .on( "click", this.stop.bind( this ) )
            .on( "click", this.togglePlay );

        // Set event on list option
        $( ".fa-list" ).off().on( "click", this.list.bind( this ) );

        // Set event on refresh option
        $( ".fa-refresh" ).off().on( "click", this.reset.bind( this ) );
    },
    /**
     * Toggle the pause/play button's icon and functionality.
     */
    togglePlay: function( play, pause ) {
        // Set classes on the view.
        $( ".play" )
            .toggleClass( "fa-pause", pause )
            .toggleClass( "fa-play", play );
    },
    /**
     * Toggles the options in and out of view.
     */
    options: function() {
        console.log("OPTIONS");
        // Toggle options in/out of view.
        this.animate( "#options", "visuallyhidden" );
    },
    /**
     * Stores the return value of the interval.
     */
    interval: 0,
    /**
     * Stores the state of the view.
     */
    playing: false,
    /**
     * Toggles between the pause and play buttons.
     */
    play: function( start ) {
        console.log("PLAY", start );
        // If starting event, set pause button.
        // If stopping event, set play button.
        var pause = ( start ? true : false ),
            play = ( !start ? true : false );

        // Set classes on the view.
        this.togglePlay( play, pause );

        // Set the view's state;
        this.playing = start;

        return this.playing;
    },
    /**
     * Stop the interval counter from continuing.
     */
    stop: function( e ) {
        console.log("STOP", e );

        var isPlay = $( ".play" ).is( ".fa-play" ),
            isRefresh = $( ".list" ).is( ".fa-refresh" );

        // Set method to execute at set interval.
        clearInterval( this.interval );

        // Set the view's state;
        this.playing = false;

        // If starting...
        if ( isPlay || isRefresh ) {
            // Set the view to update at intervals.
            this.scroll();
        }

        // Set random phrase on view.
        return true;
    },
    /**
     * Restart the process.
     */
    reset: function() {
        // Stop all scrolling.
        this.stop();

        // Set play button.
        // Passes condition circa L125, if $(".play").is(".fa-play"), scroll.
        this.togglePlay( false );

        // Reset index to 0.
        this.current = 0;

        // Start scrolling.
        this.scroll();
    },
    /**
     * Updates the view every 2 seconds with a new phrase.
     */
    scroll: function() {
        // Set method to execute at set interval.
        // Save the return value to this.interval.
        this.interval = setInterval( this.render.bind( this ), 2000 );

        // Return setInterval's return value.
        return this.interval;
    },
    /**
     * Saves state.
     */
    save: function( i ) {
        this.current = i || 0;
    },
    /**
     * The index of the current phrase in the view.
     */
    current: 0,
    /**
     * List of phrases.
     *
     * @todo Replace with a data storage solution.
     */
    phrases: {
        default: "designs user experiences.",
        apps: "builds proprietary web applications.",
        bloat: "enjoys sweeping away the cruft in her free time",
        freeTime: "jokes about having free time",
        style: "likes Bauhaus",
        sites: "designs websites.",
        designui: "designs user interfaces.",
        users: "is getting to know her users.",
        staging: "always stages on the production server.",
        cli: "doesn't mind writing shell scripts.",
        gplus: "has a <a href='https://plus.google.com/+LuzMCosta/posts'>Google+ page</a>, kinda...</a>",
        facebook: "remembers when Facebook still posted statuses in the third-person",
        opensource: "<i class='fa fa-heart'></i>s open source.",
        js: "<i class='fa fa-heart'></i>s JavaScript.",
        sourceCode: "reads source code over morning coffee",
        requirejs: "uses RequireJS.",
        grunt: "uses Grunt.",
        backbone: "uses Backbone.",
        jquery: "uses jQuery.",
        qunit: "uses QUnit.",
        bodhi: "has a cat named Bodhi.",
        scrolling: "thought to herself, \" I better give users a button to stop this scrolling.\"",
        owls: "thinks <a hre'http://j.mp/lobowls'>the lobotomized owl</a> is brilliant! * + *",
        es6: "is perusing <a href='http://j.mp/es6drafts'>the latest ECMAScript 6 draft</a>.",
        raygun: "is playing around with <a href='https://raygun.io'>RayGun</a> for error logging.",
        wip: "has some work to do"
    },
    /**
     * Provide the index of a random property of this.phrases.
     */
    random: function( phrases ) {
        var i, list, phrase;

        // Get a list of all phrases' keys.
        list = Object.keys( phrases );

        // Get a random number to use as the index.
        i = Math.floor( Math.random( 0, list.length - 1 ) * 10 );

        // Prevent replacing a phrase w/ the same phrase.
        if ( i === this.current ) {
            i += 1;
        }

        // Get the phrase at the random index.
        phrase = list[ i ];

        // Save state.
        this.save( i );

        return phrase;
    },
    /**
     * Chooses, from the list of phrases, the phrase following the current.
     */
    next: function( phrases ) {
        var list, phrase;

        // Get a list of all phrases' keys.
        list = Object.keys( phrases );

        // Increment the current
        this.current = this.current + 1;

        // If this is the last phrase in the list...
        if ( this.current > list.length ) {
            // Restart from the first phrase.
            this.current = 0;
        }

        // Get the phrase at the next index.
        phrase = list[ this.current ];

        return phrase;
    },
    /**
     * Return a random phrase from the stored list of phrases.
     */
    phrase: function() {
        // Get the phrase at the random index.
        // @note To select phrases randomly, replace next w/ the random method.
        var phrase = this.next( this.phrases );

        return this.phrases[ phrase ];
    },
    /**
     * Set a random phrase on the view.
     */
    render: function() {
        // Get the phrase at the random index.
        var phrase = this.phrase();

        // Set random phrase on view.
        $( this.el ).html( phrase );

        // Set play button.
        // Passes condition circa L125, if $(".play").is(".fa-play"), scroll.
        this.togglePlay( false, true );

        return this;
    },
    /**
     * Lists every phrase.
     */
    list: function() {
        // Stop other events.
        this.stop();

        // Get the view.
        var $el = $( this.el );

        // Prepare view.
        $el.empty();

        // Get the phrase at the random index.
        var phrases = this.phrases;

        // Set random phrase on view.
        $.each( phrases, function( name, phrase ) {
            $el.append( "<span>" + phrase + "</span>" );
        });

        // Set view.
        $( ".list" ).toggleClass( "fa-list" ).toggleClass( "fa-refresh" );

        // Set play button.
        // Passes condition circa L125, if $(".play").is(".fa-play"), scroll.
        this.togglePlay( true, false );

        return this;
    }
};


Phrases.initialize();
Tracker.initialize();
