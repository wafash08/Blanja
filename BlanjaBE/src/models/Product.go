package models

import (
	"gofiber-marketplace/src/configs"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name        string   `json:"name" validate:"required"`
	Price       float64  `json:"price" validate:"required,gt=0"`
	Stock       int      `json:"stock" validate:"required,gt=0"`
	Images      []Image  `json:"images" gorm:"constraint:OnDelete:CASCADE;" validate:"dive"`
	Sizes       []Size   `json:"sizes" gorm:"constraint:OnDelete:CASCADE;" validate:"dive"`
	Colors      []Color  `json:"colors" gorm:"constraint:OnDelete:CASCADE;" validate:"dive"`
	Rating      uint     `json:"rating" gorm:"default:0"`
	Description string   `json:"description" validate:"required"`
	Condition   string   `json:"condition" gorm:"default:new" validate:"oneof=new used"`
	CategoryID  uint     `json:"category_id" validate:"required"`
	Category    Category `gorm:"foreignKey:CategoryID" validate:"-"`
	SellerID    uint     `json:"seller_id" validate:"required"`
	Seller      Seller   `gorm:"foreignKey:SellerID" validate:"-"`
	Carts       []Cart   `gorm:"many2many:cart_products;" json:"carts"`
}

func SelectAllProducts(keyword, sort string, limit, offset int) []*Product {
	var products []*Product
	keyword = "%" + keyword + "%"
	configs.DB.Preload("Images").Preload("Sizes").Preload("Colors").Preload("Category").Preload("Seller").
		Order(sort).Limit(limit).Offset(offset).
		Where("name ILIKE ?", keyword).Find(&products)
	return products
}

func SelectAllProductsWithFilter(keyword, sort string, limit, offset int, filter map[string]interface{}, condition string) []*Product {
	var products []*Product
	keyword = "%" + keyword + "%"

	query := configs.DB.
		Preload("Images").Preload("Sizes").Preload("Colors").Preload("Category").Preload("Seller").
		Group("products.id").Order(sort).Limit(limit).Offset(offset).
		Where("products.name ILIKE ?", keyword)

	if colors, ok := filter["colorValues"].([]string); ok && len(colors) > 0 {
		query = query.Joins("INNER JOIN colors ON colors.product_id = products.id AND colors.value IN ?", filter["colorValues"])
	}

	if sizes, ok := filter["sizeValues"].([]string); ok && len(sizes) > 0 {
		query = query.Joins("INNER JOIN sizes ON sizes.product_id = products.id AND sizes.value IN ?", filter["sizeValues"])
	}

	if filter["category_id"] != 0 {
		query = query.Where("products.category_id = ?", filter["category_id"])
	}

	if filter["seller_id"] != 0 {
		query = query.Where("products.seller_id = ?", filter["seller_id"])
	}

	if condition != "" {
		query = query.Where("products.condition = ?", condition)
	}

	query.Find(&products)

	return products
}

func SelectProductById(id int) *Product {
	var product Product
	configs.DB.Preload("Images").Preload("Sizes").Preload("Colors").Preload("Category").Preload("Seller").First(&product, "id = ?", id)
	return &product
}

func CountData(keyword string) int64 {
	var result int64
	keyword = "%" + keyword + "%"
	configs.DB.Table("products").Where("deleted_at IS NULL AND name ILIKE ?", keyword).Count(&result)
	return result
}

func CountDataWithFilter(keyword string, filter map[string]interface{}, condition string) int64 {
	var result int64
	keyword = "%" + keyword + "%"
	query := configs.DB.Model(&Product{}).Where("products.deleted_at IS NULL AND products.name ILIKE ?", keyword)

	if colors, ok := filter["colorValues"].([]string); ok && len(colors) > 0 {
		query = query.Joins("INNER JOIN colors ON colors.product_id = products.id AND colors.value IN ?", filter["colorValues"])
	}

	if sizes, ok := filter["sizeValues"].([]string); ok && len(sizes) > 0 {
		query = query.Joins("INNER JOIN sizes ON sizes.product_id = products.id AND sizes.value IN ?", filter["sizeValues"])
	}

	if filter["category_id"] != 0 {
		query = query.Where("products.category_id = ?", filter["category_id"])
	}

	if filter["seller_id"] != 0 {
		query = query.Where("products.seller_id = ?", filter["seller_id"])
	}

	if condition != "" {
		query = query.Where("products.condition = ?", condition)
	}

	query.Group("products.id").Count(&result)

	return result
}

func CreateProduct(product *Product) error {
	result := configs.DB.Create(&product)
	return result.Error
}

func UpdateProduct(id int, updatedProduct *Product) error {
	result := configs.DB.Model(&Product{}).Where("id = ?", id).Updates(updatedProduct)
	return result.Error
}

func DeleteProduct(id int) error {
	result := configs.DB.Delete(&Product{}, "id = ?", id)
	return result.Error
}

func DeleteProductAllData(id int) error {
	var result *gorm.DB

	if result = configs.DB.Delete(&Color{}, "product_id = ?", id); result.Error != nil {
		return result.Error
	}

	if configs.DB.Delete(&Size{}, "product_id = ?", id); result.Error != nil {
		return result.Error
	}

	if configs.DB.Delete(&Image{}, "product_id = ?", id); result.Error != nil {
		return result.Error
	}

	result = configs.DB.Delete(&Product{}, "id = ?", id)
	return result.Error
}

// func updateImages(product *Product, updatedImages []Image) {
// 	existingIDs := make(map[uint]struct{})
// 	for _, img := range product.Images {
// 		existingIDs[img.ID] = struct{}{}
// 	}
// 	updatedIDs := make(map[uint]struct{})
// 	for _, updatedImg := range updatedImages {
// 		updatedIDs[updatedImg.ID] = struct{}{}
// 	}

// 	// Delete removed images
// 	for id := range existingIDs {
// 		if _, exists := updatedIDs[id]; !exists {
// 			configs.DB.Where("id = ?", id).Delete(&Image{})
// 		}
// 	}

// 	// Add or update images
// 	for _, updatedImg := range updatedImages {
// 		if updatedImg.ID == 0 {
// 			// New image
// 			updatedImg.ProductID = product.ID
// 			configs.DB.Create(&updatedImg)
// 		} else {
// 			// Existing image
// 			configs.DB.Model(&Image{}).Where("id = ?", updatedImg.ID).Updates(updatedImg)
// 		}
// 	}
// }
