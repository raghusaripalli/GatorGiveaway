package model

import "gorm.io/gorm"

// Product table
type Product struct {
	gorm.Model
	UserId      uint   `json:"-"`
	Name        string `form:"name" json:"name"`
	Description string `form:"description" json:"description"`
	Location    string `form:"location" json:"location"`
	Dimensions  string `form:"dimensions" json:"dimensions"`
	Weight      int    `form:"weight" json:"weight"`
	Age         int    `form:"age" json:"age"`
	Count       int    `form:"count" json:"count"`
	IsFav       *bool  `form:"isFav" json:"isFav"`
	Tags        string `form:"tags" json:"tags"`
	//expected to have url of the image when uploaded to server
	ImageUrl string `json:"imageUrl"`
}
