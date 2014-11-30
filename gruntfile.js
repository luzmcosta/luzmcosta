/**
 * Grunt configuration for luzmcosta.com
 *
 * @author Luz M. Costa <luzmcosta@gmail.com>
 * @updated 11.30.2014
 * @version 0.1.0
 */

module.exports = function( grunt ) {

    "use strict";

    // Auto-load grunt tasks.
    require( "load-grunt-tasks" )( grunt );

    // Set headers.
    var nl = "\n",
        comments = {
            open: "/**",
            close: nl + " */",
            nl: nl + " * " + nl
        },
        header = function( name, date ) {
            var header = "";

            // Open header.
            header += comments.open;

            // Construct header.
            header += comments.nl + name + " @ " + date;

            // Close header.
            header += comments.close;

            return header;
        };

    // Configure Grunt.
    grunt.initConfig({
        // Get package information.
        pkg: grunt.file.readJSON( "package.json" ),

        /**
         * Minifies JavaScript.
         */
        uglify: {
            options: {
                banner: header( "<%= pkg.name %>",
                    "<%= grunt.template.today( 'mm-dd-yyyy' )" )
            },
            build: {
                src: "js/main.js",
                dest: "js/build/<%= pkg.name %>.min.js"
            }
        },
        /**
         * Lints JavaScript using JSHint.
         *
         * @note @link http://www.jshint.com/docs/options/
         */
        jshint: {
            options: {
                jshintrc: true
            },
            all: {
                src: "js/main.js"
            }
        },
        /**
         * Executes configured tasks at every file save.
         */
        watch: {
            files: [ "**/*.js", "**/*.html" ],
            tasks: [ "jshint" ]
        }
    });

    /**
     * Register Grunt's tasks.
     */
    grunt.registerTask( "default", [ "watch" ] );
    grunt.registerTask( "test", [ "jshint" ] );
};
