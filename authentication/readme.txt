
 # WP-AppKit User Authentication theme module for Q for Android theme.

 This user authentication demo handles :

 - in js/top-login-form.js:
         - a simple login/logout form displayed under the topbar of app's theme.

 - in js/pages.js:
         - a user page, where user data can be displayed, using the user-page.html template
         - a login page, where the login form is implemented, using the login-page.html template

 - in js/premium-posts.js:
         - a "Premium posts" feature, meaning that the user can read posts only if he's connected.

 - in js/common.js:
         - authentication feedback messages customization
         - user authentication validation on app launch

Login and authentication validation are handled with the WP-AppKit Authentication API.
https://uncategorized-creations.com/wp-appkit/doc/user-login-feature/

To use one or several of the above modules in Q for Android theme, simply require them in the functions.js file of your theme.
For example, to use the top-login-form and premium-posts modules, add the following to the "define" statement of functions.js:
define([..., 'theme/authentication/js/top-login-form', 'theme/authentication/js/premium-posts', ...])

No need to include the js/common module, it is already included by other modules.
