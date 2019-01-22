define( [ 'jquery', 'core/theme-app', 'core/modules/authentication' ], function( $, App, Auth ) {

    /**
     * See ../readme.txt for general information about this authentication theme module example.
     */

    /**************************************************************************
     * Customize authentication feedback messages and errors
     */

    /**
     * Display logout info messages in feedback div
     */
    App.on( 'info', function( info ) {
        switch( info.event ) {
            case 'auth:user-logout':
                if ( info.message && info.message.length ) {
                    //TODO
                }
                break;
        }
    } );

    /**
     * Intercept error and info messages that are related to authentication so that
     * we can display our custom messages when the login fails.
     */
    App.filter( 'theme-event-message', function( message, event_data ) {

        if ( event_data.subtype == 'authentication-error' ) {

            //Custom messages for log in error events :
            switch ( event_data.event ) {
                case 'auth:empty-user':
                    message = "User login is empty";
                    break;
                case 'auth:wrong-user':
                    message = "User not found";
                    break;
                case 'auth:wrong-pass':
                    message = "User name and password do not match";
                    break;
                case 'auth:wrong-permissions':
                    message = "Wrong user permissions or user permissions expired.";
                    break;
                default:
                    message = "User authentication failed :(";
                    break;
            }

        } else if ( event_data.subtype == 'authentication-info' ) {

            //Custom messages for log out info events :
            if ( event_data.event == 'auth:user-logout' ) {

                switch ( event_data.core_data.logout_type ) {
                    case 'user-connection-expired':
                        message = 'Your connection has expired. Please log in again!';
                        break;
                    case 'user-not-authenticated':
                        message = "Your connection has been reseted. Please log in again!";
                        break;
                    case 'user-wrong-permissions':
                        message = "Your user permissions expired.";
                        break;
                }

            } else if ( event_data.event == 'auth:user-login' ) {
                message = 'User logged in successfully :)';
            }

        }

        return message;
    } );


    /**************************************************************************
     * User connection validity
     */

    /**
     * At each app launch, we check that the user connection is still valid,
     * ie that the server still has valid authentication data for the
     * connected user.
     * If the connection expired, the user will be automatically logged out
     * by the app core, calling loggout events.
     */
    App.on( 'info:app-ready', function() {
        Auth.checkUserAuthenticationFromRemote(
            function( current_user ){
                //The user is still connected ok
            },
            function( error ){
                //The user has been disconnected, or was not connected
                //Logout events are triggered and intercepted in the following
                //App.on( 'info' );
            }
        );
    } );

} );




