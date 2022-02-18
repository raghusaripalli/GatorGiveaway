package views

import (
	"fmt"
	"net/http"
	"strconv"
	m "webapp/model"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var Limit int = 10

type Posts struct {
	Page       int
	TotalPages int64
	Products   []m.Product
}

// Reads all posts of all buyers
func GetPosts(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		page := c.DefaultQuery("page", "1")
		pageNumber, err := strconv.Atoi(page)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("%s is a invalid page number", page)})
			return
		}
		// fetch all products
		var products []m.Product
		db.Model(&m.Product{}).Limit(Limit).Offset((pageNumber - 1) * Limit).Find(&products)

		// get total records
		var count int64
		db.Model(&m.Product{}).Count(&count)

		// build the response json
		totalPages := count/int64(Limit) + 1
		posts := Posts{Page: pageNumber, TotalPages: totalPages, Products: products}

		// return response json
		c.JSON(http.StatusOK, posts)
	}
	// return the GetPosts
	return gin.HandlerFunc(fn)
}
