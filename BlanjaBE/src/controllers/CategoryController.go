package controllers

import (
	"gofiber-marketplace/src/helpers"
	"gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/models"
	"gofiber-marketplace/src/services"
	"slices"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func GetAllCategories(c *fiber.Ctx) error {
	keyword := c.Query("search")
	sort := helpers.GetSortParams(c.Query("sorting"), c.Query("orderBy"))

	categories := models.SelectAllCategories(keyword, sort)
	if len(categories) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "no content",
			"statusCode": 202,
			"message":    "Category is empty.",
			"data":       categories,
		})
	}

	resultCategories := make([]map[string]interface{}, len(categories))
	for i, category := range categories {
		products := make([]map[string]interface{}, len(category.Products))
		for j, product := range category.Products {
			products[j] = map[string]interface{}{
				"id":         product.ID,
				"created_at": product.CreatedAt,
				"updated_at": product.UpdatedAt,
				"name":       product.Name,
				"price":      product.Price,
				"image":      product.Images,
				"rating":     product.Rating,
			}
		}

		resultCategories[i] = map[string]interface{}{
			"id":         category.ID,
			"created_at": category.CreatedAt,
			"updated_at": category.UpdatedAt,
			"name":       category.Name,
			"image":      category.Image,
			"slug":       category.Slug,
			"products":   products,
		}
	}

	// return c.JSON(categories)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultCategories,
	})
}

func GetCategory(c *fiber.Ctx) error {
	category := models.SelectCategoryBySlug(c.Params("slug"))
	if category.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Category not found",
		})
	}

	products := make([]map[string]interface{}, len(category.Products))
	for i, product := range category.Products {
		products[i] = map[string]interface{}{
			"id":         product.ID,
			"created_at": product.CreatedAt,
			"updated_at": product.UpdatedAt,
			"name":       product.Name,
			"price":      product.Price,
			"image":      product.Images,
			"rating":     product.Rating,
		}
	}

	resultCategory := map[string]interface{}{
		"id":         category.ID,
		"created_at": category.CreatedAt,
		"updated_at": category.UpdatedAt,
		"name":       category.Name,
		"image":      category.Image,
		"slug":       category.Slug,
		"products":   products,
	}

	// return c.JSON(category)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultCategory,
	})
}

func GetCategoryFilter(c *fiber.Ctx) error {
	categories := models.SelectAllCategories("", "name ASC")
	var resultCategories []string

	for _, category := range categories {
		if !slices.Contains(resultCategories, category.Name) {
			resultCategories = append(resultCategories, category.Name)
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"data":       resultCategories,
	})
}
func CreateCategory(c *fiber.Ctx) error {
	var newCategory models.Category
	if err := c.BodyParser(&newCategory); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}

	image, err := c.FormFile("image")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Failed to upload image",
		})
	}

	if err := helpers.ImageValidation(image); len(err) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "Validation failed",
			"errors":     err,
		})
	}

	uploadResult, err := services.UploadCloudinary(c, image)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to save file",
		})
	}

	newCategory.Image = uploadResult.URL
	if newCategory.Slug == "" || newCategory.Slug != strings.ReplaceAll(strings.ToLower(newCategory.Name), " ", "") {
		newCategory.Slug = strings.ReplaceAll(strings.ToLower(newCategory.Name), " ", "")
	}

	category := middlewares.XSSMiddleware(&newCategory).(*models.Category)

	if errors := helpers.StructValidation(category); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "There are bad request or validation",
			"errors":     errors,
		})
	}

	if existCategory := models.SelectCategoryBySlug(category.Slug); existCategory.ID != 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Category with this name or slug already exists",
		})
	}

	if err := models.CreateCategory(category); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to create category",
		})
	} else {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Category created successfully",
		})
	}
}

func UpdateCategory(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid ID format",
		})
	}

	category := models.SelectCategoryById(id)
	if category.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Category not found",
		})
	}

	var updatedCategory models.Category

	if err := c.BodyParser(&updatedCategory); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}

	image, _ := c.FormFile("image")
	if image == nil {
		updatedCategory.Image = category.Image
	} else {
		if err := helpers.ImageValidation(image); len(err) > 0 {
			return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
				"status":     "unprocessable entity",
				"statusCode": 422,
				"message":    "Validation failed",
				"errors":     err,
			})
		}

		uploadResult, err := services.UploadCloudinary(c, image)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":     "server error",
				"statusCode": 500,
				"message":    "Failed to save file",
			})
		}

		updatedCategory.Image = uploadResult.URL
	}

	if updatedCategory.Slug == "" || updatedCategory.Slug != strings.ReplaceAll(strings.ToLower(updatedCategory.Name), " ", "") {
		updatedCategory.Slug = strings.ReplaceAll(strings.ToLower(updatedCategory.Name), " ", "")
	}

	category = middlewares.XSSMiddleware(&updatedCategory).(*models.Category)

	if errors := helpers.StructValidation(category); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "There are bad request or validation",
			"errors":     errors,
		})
	}

	if existCategory := models.SelectCategoryBySlug(category.Slug); existCategory.ID != 0 && existCategory.ID != category.ID {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Category with this name or slug already exists",
		})
	}

	if err := models.UpdateCategory(id, category); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to update category",
		})
	} else {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Category updated successfully",
		})
	}
}

func DeleteCategory(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid ID format",
		})
	}

	category := models.SelectCategoryById(id)
	if category.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Category not found",
		})
	}

	if err := models.DeleteCategory(id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to delete category",
		})
	} else {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Category deleted successfully",
		})
	}
}
