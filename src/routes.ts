/**  An Array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/api",
];
/**  An Array of routes that are used for authentication
 * these routes will  redirect logged in users to /user
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/register",
    "/error/auth",
];

/**  The prefix for API authentication routes
 * routes that start with this prefix are used for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**  The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/app";
