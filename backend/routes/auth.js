// Create a new router instance
const router = express.Router();

// Define routes
router.post("/login", login); // Route for user login
router.post("/register", register); // Route for user registration
router.get("/logout", logout); // Route for user logout
router.get('/is_logged_in', isLoggedIn); // Route to check if a user is logged in

// Export the router to be used by other modules
export default router;