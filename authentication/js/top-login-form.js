define( [ 'jquery', 'core/theme-app', 'core/modules/authentication', 'theme/authentication/js/common' ], function( $, App, Auth ) {

    /**
     * See ../readme.txt for general information about this authentication theme module example.
     */

    /**
     * Here is implemented a simple login/logout form displayed under the topbar of app's theme.
     *
     * When the user clicks the "Login" button, a minimalist login form comes up.
     * When the user has logged in, a "Log out" button appears, and user connection
     * state info is displayed next to it, along with a link to the user page.
     *
     * Login/logout are handled with the WP-AppKit Authentication API.
     */

    /**
     * Define HTML for our login form wrapper, insert it into DOM just after the feedback <div>,
     * then memorize a jQuery reference to it.
     * (In real theme creation conditions styles should be defined in a separated css file).
     */
    $( '<div id="user-login-form"><div id="user-info"></div></div>' )
        .css({
            'position': 'absolute',
            'top': '56px',
            'width': '100%',
            'z-index': 10,
            'padding': '15px',
            'border-bottom': '3px solid #ccc',
            'background': '#fff'
        })
        .insertAfter( '#app-header' );

    //Adjust other layout styles for login form:
    $('head').append( '<style>'
        +'.app-screen{ top: 108px; }'
        +'#user-login-form input{ width:35%; margin-right:3%}'
    +'</style>' );

    var $user_info = $('#user-info');

    /**
     * Function that handles the login/logout form display depending on
     * whether the user is logged in or not.
     */
    var update_login_info = function() {

        var current_user = Auth.getCurrentUser();

        if ( current_user ) {
            //User logged in : display user info and logout button :
            $user_info.html( 'Logged in as <a href="#user-page">'+ current_user.login +'</a> <button type="button" class="btn btn-danger" id="logout">Log out</button>');
        } else {
            //User not logged in : display the login button :
            $user_info.html( 'No user connected <button type="button" id="login">Log in</button>' );
        }

    };

    /**
     * Update the login/logout display as soon as the theme is loaded,
     * so that it displays correctly according user connection state
     */
    update_login_info();

    /**
     * Update the login/logout display at user login and logout
     */
    App.on( 'info', function( info ) {
        switch( info.event ) {
            case 'auth:user-login':
            case 'auth:user-logout':
                update_login_info();
                break;
        }
    } );

    /**
     * Make the login form appear when clicking the "Log in" button
     */
    $( $user_info ).on( 'click', '#login', function( e ) {
        e.preventDefault();
        $user_info.html(
            '<input id="userlogin" placeholder="Login" type="text" >' +
            '<input id="userpass" placeholder="Password" type="password" >' +
            '<button type="button" id="go-login">Log in</button>'
        );
    } );

    /**
     * Log the user in when submiting the login form
     */
    $( $user_info ).on( 'click', '#go-login', function( e ) {
        e.preventDefault();
        Auth.logUserIn(
            $('#userlogin').val(),
            $('#userpass').val()
        );
    } );

    /**
     * Log the user out when clicking the "Log out" button
     */
    $( $user_info ).on( 'click', '#logout', function( e ) {
        e.preventDefault();
        Auth.logUserOut();
    } );

} );




