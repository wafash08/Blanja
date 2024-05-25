package controllers

import (
	"gofiber-marketplace/src/configs"
	"gofiber-marketplace/src/helpers"
	"gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/models"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func GetCart(c *fiber.Ctx) error {
	carts := models.SelectAllCart()
	if len(carts) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "no content",
			"statusCode": 200,
			"message":    "Cart is empty. You should create cart",
		})
	}
	resultCarts := make([]map[string]interface{}, len(carts))
	for i, cart := range carts {
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

		resultCarts[i] = map[string]interface{}{
			"id":         cart.ID,
			"user_id":    cart.UserID,
			"brand_id":   cart.SellerID,
			"brand_name": cart.Seller.Name,
			"created_at": cart.CreatedAt,
			"updated_at": cart.UpdatedAt,
			"products":   products,
		}
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultCarts,
	})
}

func CreateCart(c *fiber.Ctx) error {
	var newCart models.Cart
	var user = c.Locals("user").(jwt.MapClaims)
	if err := c.BodyParser(&newCart); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	userID := user["id"].(float64)
	newCart.UserID = uint(userID)

	cart := middlewares.XSSMiddleware(&newCart).(*models.Cart)

	if errors := helpers.StructValidation(cart); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "There are bad request or validation",
			"errors":     errors,
		})
	}

	if err := models.CreateCart(cart); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to create cart",
		})
	} else {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Cart created successfully",
		})
	}
}
