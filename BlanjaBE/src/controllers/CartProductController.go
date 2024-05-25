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

	err :=configs.DB.Where("cart_id = ? AND product_id = ?", request.CartID, request.ProductID).First(&cartProduct).Error

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

	err :=configs.DB.Where("cart_id = ? AND product_id = ?", request.CartID, request.ProductID).First(&cartProduct).Error

	if err != nil {
        if err == gorm.ErrRecordNotFound {
            return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Product not found in cart"})
        }
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    if cartProduct.Quantity <= request.Quantity {
        configs.DB.Delete(&cartProduct)
    } else {
        cartProduct.Quantity -= request.Quantity
        configs.DB.Save(&cartProduct)
    }
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Product quantity updated"})
}