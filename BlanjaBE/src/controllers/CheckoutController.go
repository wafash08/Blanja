package controllers

import (
	// "gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/models"

	"github.com/gofiber/fiber/v2"
	// "github.com/golang-jwt/jwt/v5"
)

func CreateCheckout(c *fiber.Ctx) error {
	var newCheckout models.Checkout
	if err := c.BodyParser(&newCheckout); err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	if err := models.CreateCheckout(&newCheckout); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to create checkout",
		})
	} else {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Checkout created successfully",
		})
	}

}
