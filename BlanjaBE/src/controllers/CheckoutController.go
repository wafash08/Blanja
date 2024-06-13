package controllers

import (
	// "gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/configs"
	"gofiber-marketplace/src/models"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

func CreateCheckout(c *fiber.Ctx) error {
	var user = c.Locals("user").(jwt.MapClaims)
	var input struct {
		AddressID uint `json:"address_id"`
		Carts     []struct {
			ID uint `json:"ID"`
		} `json:"carts"`
		Delivery uint `json:"delivery"`
		Summary  uint `json:"summary"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	userID := user["id"].(float64)
	newCheckout := models.Checkout{
		AddressID: input.AddressID,
		Delivery:  input.Delivery,
		Summary:   input.Summary,
		UserID:    uint(userID),
	}
	address := models.SelectAddressbyId(int(newCheckout.AddressID))
	if address.Primary != "on" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Address primary field must be 'on'",
		})
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

	// Simpan relasi many-to-many ke tabel perantara
	for _, cart := range input.Carts {
		checkoutCart := models.CheckoutCart{
			CheckoutID: newCheckout.ID,
			CartID:     cart.ID,
		}
		var existing models.CheckoutCart
		if err := tx.Where("checkout_id = ? AND cart_id = ?", checkoutCart.CheckoutID, checkoutCart.CartID).First(&existing).Error; err == nil {
			// Entri sudah ada, lanjut ke entri berikutnya
			continue
		} else if err != gorm.ErrRecordNotFound {
			// Error selain "record not found"
			tx.Rollback()
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":     "server error",
				"statusCode": 500,
				"message":    "Failed to check existing checkout-cart relationship",
				"error":      err.Error(),
			})
		}
		if err := tx.Create(&checkoutCart).Error; err != nil {
			tx.Rollback()
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":     "server error",
				"statusCode": 500,
				"message":    "Failed to create checkout-cart relationship",
				"error":      err.Error(),
			})
		}
	}

	tx.Commit()
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 201,
		"message":    "Checkout created successfully",
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
		"address":    checkout.Address,
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"message":    "Product not empty",
		"data":       resultCheckout,
	})
}
