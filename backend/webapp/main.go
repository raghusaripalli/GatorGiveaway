package main

// Imports Gin, Gorm, models and views
import (
	m "webapp/model"
	v "webapp/views"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

/// Driver function which starts the server
func main() {

	// Connection to the database with default configuration
	db, err := gorm.Open(sqlite.Open("main.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the User model to the db
	db.AutoMigrate(&m.User{})

	// Migrate the Product Model to the db
	db.AutoMigrate(&m.Product{})

	// setting up the webserver with default config
	r := gin.Default()

	// Check every request if allowed for CORS
	r.Use(CORSMiddleware())

	// Adding logger to the middleware
	r.Use(gin.Logger())

	// Using default recovery mechanism in case of any unexpected crashes in webserver
	r.Use(gin.Recovery())

	store := cookie.NewStore([]byte("secret"))
	store.Options(sessions.Options{MaxAge: 60 * 60 * 24})
	r.Use(sessions.Sessions("mysession", store))

	// **** END POINTS ****
	r.POST("/login", v.LoginView(db))
	r.POST("/register", v.RegisterView(db))
	r.POST("/logout", v.LogoutView)
	r.GET("/users", v.GetAllUsers(db))
	r.GET("/users/user/:userId", v.GetUserById(db))
	r.GET("/users/:username", v.GetUserByUsername(db))
	r.DELETE("/users/:userId", v.DeleteUser(db))
	r.POST("/create", v.PostCreateView(db))
	r.GET("/read", v.GetPostView(db))
	r.PATCH("/update/:postId", v.UpdatePostView(db))
	r.DELETE("/delete/:postId", v.DeletePostView(db))
	r.GET("/allPosts", v.GetPosts(db))

	// starts server and listens on port 8080
	r.Run()
}
