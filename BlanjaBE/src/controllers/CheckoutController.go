package controllers

import (
	// "gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/configs"
	"gofiber-marketplace/src/models"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"strconv"
)

func CreateCheckout(c *fiber.Ctx) error {
	var user = c.Locals("user").(jwt.MapClaims)
	userID := user["id"].(float64)
	var input struct {
		Carts []struct {
			ID uint `json:"id"`
		} `json:"carts"`
		Delivery uint `json:"delivery"`
		Summary  uint `json:"summary"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	if len(input.Carts) == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Carts cannot be empty",
		})
	}

	newCheckout := models.Checkout{
		Delivery: input.Delivery,
		Summary:  input.Summary,
		UserID:   uint(userID),
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

	checkoutID := newCheckout.ID
	// Update carts with the new checkout ID
	for _, cartInput := range input.Carts {
		var existingCart models.Cart
		if err := tx.First(&existingCart, "id = ? AND user_id = ?", cartInput.ID, uint(userID)).Error; err != nil {
			tx.Rollback()
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"status":     "not found",
				"statusCode": 404,
				"message":    "Cart not found or does not belong to the user",
			})
		}
		existingCart.CheckoutID = &checkoutID
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
		"checkoutID": checkoutID,
		"message":    newCheckout,
	})

}
func GetCheckoutByUserId(c *fiber.Ctx) error {
	var user = c.Locals("user").(jwt.MapClaims)
	userID := user["id"].(float64)
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid ID format",
		})
	}
	var checkouts []models.Checkout
	if err := configs.DB.Where("user_id = ? AND id = ?", uint(userID), id).Preload("Carts.Products").Find(&checkouts).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to get checkouts",
			"error":      err.Error(),
		})
	}
	resultCheckout := make([]map[string]interface{}, len(checkouts))
	for i, checkout := range checkouts {
		carts := make([]map[string]interface{}, len(checkout.Carts))
		for j, cart := range checkout.Carts {
			products := make([]map[string]interface{}, len(cart.Products))
			for k, product := range cart.Products {
				var cartProduct models.CartProduct
				if err := configs.DB.Where("cart_id = ? AND product_id = ?", cart.ID, product.ID).First(&cartProduct).Error; err != nil {
					return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to retrieve quantity"})
				}
				var image *models.Image
				configs.DB.First(&image, "product_id = ?", product.ID)
				products[k] = map[string]interface{}{
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
			carts[j] = map[string]interface{}{
				"id":          cart.ID,
				"user_id":     cart.UserID,
				"seller_id":   cart.SellerID,
				"seller_name": cart.Seller.Name,
				"created_at":  cart.CreatedAt,
				"updated_at":  cart.UpdatedAt,
				"products":    products,
			}
		}
		resultCheckout[i] = map[string]interface{}{
			"id":         checkout.ID,
			"user_id":    checkout.UserID,
			"carts":      carts,
			"delivery":   checkout.Delivery,
			"summary":    checkout.Summary,
			"created_at": checkout.CreatedAt,
			"updated_at": checkout.UpdatedAt,
		}
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultCheckout,
	})

}
