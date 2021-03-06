package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	m "webapp/model"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var dbName string = "test.db"
var storeName string = "testsecret"
var sessionName string = "testsession"
var users []m.User
var posts []m.Product
var orders []m.Order
var router *gin.Engine
var testDb *gorm.DB

func setupTestDb(dbName string) *gorm.DB {
	// Connection to the database with default configuration
	db, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database!")
	}

	// drop tables if exist
	db.Migrator().DropTable(&m.User{})
	db.Migrator().DropTable(&m.Product{})
	db.Migrator().DropTable(&m.Post{})
	db.Migrator().DropTable(&m.Order{})

	// Migrate the User & Product model to the db
	db.AutoMigrate(&m.User{}, &m.Product{}, &m.Post{}, &m.Order{})

	return db
}

func initData(db *gorm.DB) {
	users = []m.User{
		{
			Username:  "testadmin",
			Password:  "TestAdmin@123",
			FirstName: "Test",
			LastName:  "Admin",
			Phone:     "+1 999 888 7777",
		},
		{
			Username:  "testmoderator",
			Password:  "TestModerator@123",
			FirstName: "Test",
			LastName:  "Moderator",
			Phone:     "+1 666 555 4444",
		},
		{
			Username:  "testuser",
			Password:  "TestUser@123",
			FirstName: "Test",
			LastName:  "User",
			Phone:     "+1 333 222 1111",
		},
	}
	db.Create(&users)

	posts = []m.Product{
		{
			UserId:      1,
			Name:        "Wooden Table",
			Description: "Sturdy Wooden Table. Made with Rose Wood. Lightweight. Round edges, so safe around children.",
			Location:    "3800 SW 34th Blvd",
			Dimensions:  "10 x 10 x 10",
			Weight:      110,
			Age:         2,
			Count:       1,
		},
		{
			UserId:      1,
			Name:        "Wireless Keyboard",
			Description: "Logitech Wirless Keyboard. Comes along with the wireless mouse and adapter.",
			Location:    "3800 SW 34th Blvd",
			Dimensions:  "3 x 1 x 0.5",
			Weight:      20,
			Age:         1,
			Count:       2,
		},
		{
			UserId:      2,
			Name:        "CLRS Textbook",
			Description: "Good condition, all pages in the book are intact.",
			Location:    "3466 NE 12th Blvd",
			Dimensions:  "1 x 0.2 x 0.2",
			Weight:      35,
			Age:         2,
			Count:       1,
		},
		{
			UserId:      2,
			Name:        "Operating Sysrtems by Tannenbaum",
			Description: "Brand New Book, recent buy from amazon",
			Location:    "3466 NE 12th Blvd",
			Dimensions:  "1 x 0.1 x 0.2",
			Weight:      28,
			Age:         1,
			Count:       2,
		},
		{
			UserId:      3,
			Name:        "Instant Pot",
			Description: "Decent enough to cook for 4 people on meal.",
			Location:    "5412 Cummington Rd",
			Dimensions:  "5 x 4 x 3",
			Weight:      51,
			Age:         1,
			Count:       2,
		},
		{
			UserId:      3,
			Name:        "Coffee Maker",
			Description: "Electric and configurable to brew coffee at scheduled time.",
			Location:    "5412 Cummington Rd",
			Dimensions:  "2 x 3 x 2",
			Weight:      41,
			Age:         2,
			Count:       1,
		},
		{
			UserId:      3,
			Name:        "karaoke System",
			Description: "With disco lights, and mic included",
			Location:    "5412 Cummington Rd",
			Dimensions:  "12 x 5 x 5",
			Weight:      75,
			Age:         3,
			Count:       1,
		},
	}
	db.Create(&posts)

	orders = []m.Order{

		{
			Posts: []m.Post{
				{
					Count:     2,
					ProductId: 1,
				},
			},
		},

		{
			Posts: []m.Post{
				{
					Count:     1,
					ProductId: 2,
				},
			},
		},
	}
	db.Create(&orders)
}

func TestMain(m *testing.M) {
	// setup database
	testDb = setupTestDb(dbName)

	// init data
	initData(testDb)

	// setup router
	router = SetupRouter(testDb, storeName, sessionName)

	code := m.Run()

	os.Exit(code)
}

func TestGetAllUsers(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/users", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	b, _ := json.Marshal(users)
	assert.Equal(t, string(b), w.Body.String())
}

func TestGetUserByIdPassCase(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/users/user/1", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	b, _ := json.Marshal(users[0])
	assert.Equal(t, string(b), w.Body.String())
}

func TestGetUserByIdFailCase(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/users/user/-1", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 404, w.Code)
}

func TestGetUserByUsernamePassCase(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/users/testadmin", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	b, _ := json.Marshal([]m.User{users[0]})
	assert.Equal(t, string(b), w.Body.String())
}

func TestGetUserByUsernameFailCase(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/users/nouser", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 404, w.Code)
}
