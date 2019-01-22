define( [ 'jquery', 'core/app', 'core/theme-app', 'core/modules/authentication', 'theme/authentication/js/common' ], function( $, CoreApp, App, Auth ) {

    /**
     * See ../readme.txt for general information about this authentication theme module example.
     */

     /**************************************************************************
     * Login page
     */

    /**
     * Create the "Login page" custom route :
     * tells the app that #login-page will lead to the login page, using the "login-page.html" template
     */
    App.addCustomRoute( 'login-page', 'authentication/login-page' );

    /**
     * Login page form submit : log the user in when submitting the login form,
     * calling Auth.logUserIn(login, pass) with login and password entered by
     * the user in the login form.
     */
    $( '#app-content-wrapper' ).on( 'submit', '#login-page-form', function( e ) {
        e.preventDefault();
        Auth.logUserIn(
            $('#user-login').val(),
            $('#user-pass').val()
        );
    } );

    /**
     * Memorize where we were before login so that we can redirect to this screen instead
     * of user-page when doing "back" on a single that poped just after login.
     */
    var fragment_before_login = '';

    /**
     * Redirect login page to user page if the user is connected.
     */
    App.filter( 'redirect', function( redirect, queried_screen, current_screen ) {

        var user = Auth.getCurrentUser();

        if ( queried_screen.item_id == 'login-page' ) {

            if ( user ) {

                if ( current_screen.screen_type == 'single' ) {

                    App.navigate( fragment_before_login );

                } else {

                    //Note: we have to use CoreApp.router.navigate here instead of App.navigate here so that
                    //redirection works even at app launch.
                    //App.navigate( 'user-page' );
                    CoreApp.router.navigate( 'user-page', { trigger: true } );
                }

                redirect = true;

                fragment_before_login = '';

            } else {

                //Memorize where we were before login
                fragment_before_login = current_screen.fragment;

            }
        }

        return redirect;
    } );

    /**************************************************************************
     * User page
     */

    /**
     * Create the "User page" custom route :
     * tells the app that #user-page will lead to the user page, using the "user-page.html" template
     */
    App.addCustomRoute( 'user-page', 'authentication/user-page' );

    /**
     * If we try to go to the user page without being connected, we
     * redirect to the homepage.
     */
    App.filter( 'redirect', function( redirect, queried_screen ) {

        if ( queried_screen.item_id == 'user-page' ) {
            var user = Auth.getCurrentUser();
            if ( !user ) {
                CoreApp.router.navigate( '#', { trigger: true } );
                redirect = true;
            }
        }

        return redirect;
    } );

    /**
     * Set the data that we want to be available in the user-page.html template :
     * user login, role and capabilities.
     */
    App.filter( 'template-args', function( template_args, view_type, view_template ) {
        if ( view_template == 'authentication/user-page' ) {
            var current_user = Auth.getCurrentUser();
            if ( current_user ) {
                template_args.user = {
                    login: current_user.login,
                    role: current_user.permissions.roles.pop(),
                    capabilities: current_user.permissions.capabilities
                };
            }
        }
        return template_args;
    } );

    /**
     * Handle navigation and transitions when coming from authentication pages:
     */

    App.filter( 'transition-direction', function( transition, current_screen, next_screen ){

        if( next_screen.screen_type === 'single' && current_screen.item_id === 'login-page' ) {
            transition = 'next-screen';
        }

        return transition;
    });

} );




