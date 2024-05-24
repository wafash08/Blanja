package controllers

import (
	"gofiber-marketplace/src/models"
	"slices"

	"github.com/gofiber/fiber/v2"
)

func GetAllSizes(c *fiber.Ctx) error {
	sizes := models.SelectAllSizes()
	resultSizes := make([]map[string]interface{}, len(sizes))
	for i, size := range sizes {
		resultSizes[i] = map[string]interface{}{
			"id":         size.ID,
			"created_at": size.CreatedAt,
			"updated_at": size.UpdatedAt,
			"value":      size.Value,
			"product_id": size.ProductID,
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultSizes,
	})
}

func GetSizesFilter(c *fiber.Ctx) error {
	sizes := models.SelectAllSizes()
	var resultSizes []string

	for _, size := range sizes {
		if !slices.Contains(resultSizes, size.Value) {
			resultSizes = append(resultSizes, size.Value)
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultSizes,
	})
}
