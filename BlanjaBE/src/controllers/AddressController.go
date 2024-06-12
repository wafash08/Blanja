package controllers

import (
	"gofiber-marketplace/src/helpers"
	"gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAddresses(c *fiber.Ctx) error {
	addresses := models.SelectAllAddresses()
	resultAddresses := make([]map[string]interface{}, len(addresses))
	for i, address := range addresses {
		resultAddresses[i] = map[string]interface{}{
			"id":             address.ID,
			"created_at":     address.CreatedAt,
			"updated_at":     address.UpdatedAt,
			"main_address":   address.MainAddress,
			"detail_address": address.DetailAddress,
			"name":           address.Name,
			"user_id":        address.User.ID,
			"email":          address.User.Email,
			"phone":          address.Phone,
			"primary":        address.Primary,
			"city":           address.City,
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultAddresses,
	})
}

func GetAddressesByUserID(c *fiber.Ctx) error {
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

	addresses := models.SelectAddressesbyUserID(int(userId))
	resultAddresses := make([]map[string]interface{}, len(addresses))
	for i, address := range addresses {
		resultAddresses[i] = map[string]interface{}{
			"id":             address.ID,
			"created_at":     address.CreatedAt,
			"updated_at":     address.UpdatedAt,
			"main_address":   address.MainAddress,
			"detail_address": address.DetailAddress,
			"name":           address.Name,
			"user_id":        address.User.ID,
			"email":          address.User.Email,
			"phone":          address.Phone,
			"primary":        address.Primary,
			"city":           address.City,
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultAddresses,
	})
}

func CreateAddress(c *fiber.Ctx) error {
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

	var newAddress models.Address
	if err := c.BodyParser(&newAddress); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	newAddress.UserID = uint(userId)

	address := middlewares.XSSMiddleware(&newAddress).(*models.Address)

	if errors := helpers.StructValidation(address); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "There are bad request or validation",
			"errors":     errors,
		})
	}

	if err := models.CreateAddress(address); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to create address",
		})
	} else {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Address created successfully",
		})
	}
}

func UpdateAddress(c *fiber.Ctx) error {
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

	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid ID format",
		})
	}

	if address := models.SelectAddressbyId(id); address.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Address not found",
		})
	}

	var updatedAddress models.Address

	if err := c.BodyParser(&updatedAddress); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	updatedAddress.UserID = uint(userId)

	address := middlewares.XSSMiddleware(&updatedAddress).(*models.Address)

	if errors := helpers.StructValidation(address); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "There are bad request or validation",
			"errors":     errors,
		})
	}

	if address.Primary == "on" {
		if err := models.SetOtherAddressesPrimaryOff(address.UserID, uint(id)); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":     "server error",
				"statusCode": 500,
				"message":    "Failed to update other addresses",
			})
		}
	}

	if err := models.UpdateAddress(id, address); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to update address",
		})
	} else {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Address updated successfully",
		})
	}
}

func DeleteAddress(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid ID format",
		})
	}

	address := models.SelectAddressbyId(id)
	if address.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Address not found",
		})
	}

	if err := models.DeleteAddress(id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to delete address",
		})
	} else {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Address deleted successfully",
		})
	}
}
