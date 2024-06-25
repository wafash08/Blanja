package controllers

import (
	"gofiber-marketplace/src/configs"
	// "gofiber-marketplace/src/helpers"
	"gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func AddProductToCart(c *fiber.Ctx) error {
	var request struct {
		CartID    uint `json:"cart_id" binding:"required"`
		ProductID uint `json:"product_id" binding:"required"`
		Quantity  uint `json:"quantity" binding:"required,min=1"`
	}
	var newCartProduct models.CartProduct
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	cartProduct := middlewares.XSSMiddleware(&newCartProduct).(*models.CartProduct)

	err := configs.DB.Where("cart_id = ? AND product_id = ?", request.CartID, request.ProductID).First(&cartProduct).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			// Create new entry
			cartProduct = &models.CartProduct{
				CartID:    request.CartID,
				ProductID: request.ProductID,
				Quantity:  request.Quantity,
			}
			configs.DB.Create(&cartProduct)
		} else {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
	} else {
		// Update existing entry
		cartProduct.Quantity += request.Quantity
		configs.DB.Save(&cartProduct)
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Product added to cart"})
}

func RemoveProductFromCart(c *fiber.Ctx) error {
	var request struct {
		CartID    uint `json:"cart_id" binding:"required"`
		ProductID uint `json:"product_id" binding:"required"`
		Quantity  uint `json:"quantity" binding:"required,min=1"`
	}
	var newCartProduct models.CartProduct
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	cartProduct := middlewares.XSSMiddleware(&newCartProduct).(*models.CartProduct)

	err := configs.DB.Where("cart_id = ? AND product_id = ?", request.CartID, request.ProductID).First(&cartProduct).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Product not found in cart"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	tx := configs.DB.Begin()
	if cartProduct.Quantity <= request.Quantity {
		// Use transaction to ensure atomic operation
		if err := tx.Delete(&cartProduct).Error; err != nil {
			tx.Rollback()
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to remove product from cart"})
		}
		var remainingProducts int64
		if err := tx.Model(&models.CartProduct{}).Where("cart_id = ?", request.CartID).Count(&remainingProducts).Error; err != nil {
			tx.Rollback()
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to check remaining products in cart"})
		}

		if remainingProducts == 0 {
			// Menghapus data keranjang karena kosong
			if err := tx.Delete(&models.Cart{}, request.CartID).Error; err != nil {
				tx.Rollback()
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to remove empty cart"})
			}
		}
	} else {
		cartProduct.Quantity -= request.Quantity
		// Use transaction to ensure atomic operation
		if err := tx.Save(&cartProduct).Error; err != nil {
			tx.Rollback()
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update product quantity in cart"})
		}
	}
	tx.Commit()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Product quantity updated"})
}
func DeleteProductFromCart(c *fiber.Ctx) error {
	var request struct {
		CartID    []uint `json:"cart_id" binding:"required"`
		ProductID []uint `json:"product_id" binding:"required"`
	}
	
	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	
	tx := configs.DB.Begin()
	
	// Menghapus produk dari keranjang
	if err := tx.Where("cart_id IN ? AND product_id IN ?", request.CartID, request.ProductID).Delete(&models.CartProduct{}).Error; err != nil {
		tx.Rollback()
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to remove product from cart"})
	}
	
	// Memeriksa apakah keranjang sekarang kosong
	for _, cartID := range request.CartID {
		var remainingProducts int64
		if err := tx.Model(&models.CartProduct{}).Where("cart_id = ?", cartID).Count(&remainingProducts).Error; err != nil {
			tx.Rollback()
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to check remaining products in cart"})
		}
		
		if remainingProducts == 0 {
			// if err := tx.Where("cart_id = ?", cartID).Delete(&models.Checkout{}).Error; err != nil {
            //     tx.Rollback()
            //     return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to remove associated checkout"})
            // }
			// Menghapus data keranjang karena kosong
			if err := tx.Delete(&models.Cart{}, cartID).Error; err != nil {
				tx.Rollback()
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to remove empty cart"})
			}
		}
	}
	
	tx.Commit()
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Products removed from cart"})
}

