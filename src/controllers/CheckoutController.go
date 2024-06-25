package controllers

import (
	// "gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/configs"
	"gofiber-marketplace/src/models"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func CreateCheckout(c *fiber.Ctx) error {
	var input struct {
		Carts []struct {
			ID uint `json:"id"`
		} `json:"carts"`
		Delivery uint `json:"delivery"`
		Summary  uint `json:"summary"`
		UserID   uint `json:"user_id"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}

	newCheckout := models.Checkout{
		Delivery: input.Delivery,
		Summary:  input.Summary,
		UserID:   input.UserID,
	}

	tx := configs.DB.Begin()
	if err := tx.Create(&newCheckout).Error; err != nil {
		tx.Rollback()
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to create checkout",
		})
	}

	// Update carts with the new checkout ID
	for _, cart := range input.Carts {
		var existingCart models.Cart
		if err := tx.First(&existingCart, cart.ID).Error; err != nil {
			tx.Rollback()
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status":     "not found",
				"statusCode": 404,
				"message":    "Cart not found",
			})
		}
		existingCart.CheckoutID = newCheckout.ID
		if err := tx.Save(&existingCart).Error; err != nil {
			tx.Rollback()
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":     "server error",
				"statusCode": 500,
				"message":    "Failed to update cart",
			})
		}
	}

	tx.Commit()
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 201,
		"message":    newCheckout,
	})
}

func GetCheckoutByUserId(c *fiber.Ctx) error {
	var user = c.Locals("user").(jwt.MapClaims)
	userID := user["id"].(float64)
	checkout := models.SelectCheckoutById(int(userID))
	if checkout.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Checkout not found",
		})
	}
	cartUser := models.SelectCartById(int(userID))
	resultCart := make([]map[string]interface{}, len(cartUser))
	for i, cart := range cartUser {
		products := make([]map[string]interface{}, len(cart.Products))
		for j, product := range cart.Products {
			var cartProduct models.CartProduct
			if err := configs.DB.Where("cart_id = ? AND product_id = ?", cart.ID, product.ID).First(&cartProduct).Error; err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to retrieve quantity"})
			}
			var image *models.Image
			configs.DB.First(&image, "product_id = ?", product.ID)
			products[j] = map[string]interface{}{
				"id":         product.ID,
				"created_at": product.CreatedAt,
				"updated_at": product.UpdatedAt,
				"name":       product.Name,
				"price":      product.Price,
				"photo":      image.URL,
				"size":       product.Sizes,
				"color":      product.Colors,
				"quantity":   cartProduct.Quantity,
				"rating":     product.Rating,
			}
		}

		resultCart[i] = map[string]interface{}{
			"id":          cart.ID,
			"user_id":     cart.UserID,
			"seller_id":   cart.SellerID,
			"seller_name": cart.Seller.Name,
			"created_at":  cart.CreatedAt,
			"updated_at":  cart.UpdatedAt,
			"products":    products,
		}
	}
	resultCheckout := map[string]interface{}{
		"id":         checkout.ID,
		"created_at": checkout.CreatedAt,
		"updated_at": checkout.UpdatedAt,
		"carts":      checkout.Carts,
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"message":    "Product not empty",
		"data":       resultCheckout,
	})
}
