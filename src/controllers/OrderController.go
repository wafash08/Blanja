package controllers

import (
	"gofiber-marketplace/src/helpers"
	"gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/models"

	"github.com/gofiber/fiber/v2"
)

func GetAllOrders(c *fiber.Ctx) error {
	orders := models.SelectAllOrders()
	if len(orders) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "no content",
			"statusCode": 202,
			"message":    "Order is empty.",
		})
	}

	resultOrders := make([]*map[string]interface{}, len(orders))
	for i, order := range orders {
		resultOrders[i] = &map[string]interface{}{
			"id":          order.ID,
			"created_at":  order.CreatedAt,
			"updated_at":  order.UpdatedAt,
			"user_id":     order.UserID,
			"checkout_id": order.CheckoutID,
			"status":      order.Status,
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultOrders,
	})
}

func GetOrdersUser(c *fiber.Ctx) error {
	userId, err := middlewares.JWTAuthorize(c, "")
	if err != nil {
		if fiberErr, ok := err.(*fiber.Error); ok {
			return c.Status(fiberErr.Code).JSON(fiber.Map{
				"status":     fiberErr.Message,
				"statusCode": fiberErr.Code,
				"message":    fiberErr.Message,
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "Internal Server Error",
			"statusCode": fiber.StatusInternalServerError,
			"message":    err.Error(),
		})
	}

	orders := models.SelectOrdersbyUserId(int(userId))
	if len(orders) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "no content",
			"statusCode": 202,
			"message":    "Order is empty.",
		})
	}

	resultOrders := make([]*map[string]interface{}, len(orders))
	for i, order := range orders {
		resultOrders[i] = &map[string]interface{}{
			"id":          order.ID,
			"created_at":  order.CreatedAt,
			"updated_at":  order.UpdatedAt,
			"user_id":     order.UserID,
			"checkout_id": order.CheckoutID,
			"status":      order.Status,
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultOrders,
	})
}

func CreateOrder(c *fiber.Ctx) error {
	userId, err := middlewares.JWTAuthorize(c, "")
	if err != nil {
		if fiberErr, ok := err.(*fiber.Error); ok {
			return c.Status(fiberErr.Code).JSON(fiber.Map{
				"status":     fiberErr.Message,
				"statusCode": fiberErr.Code,
				"message":    fiberErr.Message,
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "Internal Server Error",
			"statusCode": fiber.StatusInternalServerError,
			"message":    err.Error(),
		})
	}

	var newOrder models.Order

	if err := c.BodyParser(&newOrder); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	newOrder.UserID = uint(userId)

	order := middlewares.XSSMiddleware(&newOrder).(*models.Order)

	if errors := helpers.StructValidation(order); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "Validation failed",
			"errors":     errors,
		})
	}

	if err := models.CreateOrder(order); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to create order",
		})
	} else {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Order created successfully",
		})
	}
}
