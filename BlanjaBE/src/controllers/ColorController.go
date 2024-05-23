package controllers

import (
	"gofiber-marketplace/src/models"
	"slices"

	"github.com/gofiber/fiber/v2"
)

func GetAllColors(c *fiber.Ctx) error {
	colors := models.SelectAllColors()
	resultColors := make([]map[string]interface{}, len(colors))
	for i, color := range colors {
		resultColors[i] = map[string]interface{}{
			"id":         color.ID,
			"created_at": color.CreatedAt,
			"updated_at": color.UpdatedAt,
			"value":      color.Value,
			"product_id": color.ProductID,
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultColors,
	})
}

func GetColorsFilter(c *fiber.Ctx) error {
	colors := models.SelectAllColors()
	var resultColors []string

	for _, color := range colors {
		if !slices.Contains(resultColors, color.Value) {
			resultColors = append(resultColors, color.Value)
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultColors,
	})
}
