package controllers

import (
	"fmt"
	"gofiber-marketplace/src/helpers"
	"gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/models"
	"math"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllProduct(c *fiber.Ctx) error {
	params := c.Queries()
	keyword := params["search"]
	condition := params["condition"]
	sort := helpers.GetSortParams(params["sorting"], params["orderBy"])
	page, limit, offset := helpers.GetPaginationParams(params["limit"], params["page"])
	filter := helpers.GetFilterParams(params["colors"], params["sizes"], params["category"], params["seller"])

	totalData := models.CountDataWithFilter(keyword, filter, condition)
	totalPage := math.Ceil(float64(totalData) / float64(limit))

	products := models.SelectAllProductsWithFilter(keyword, sort, limit, offset, filter, condition)
	if len(products) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "no content",
			"statusCode": 202,
			"message":    "Product is empty.",
			"data":       products,
		})
	}

	resultProducts := make([]*map[string]interface{}, len(products))
	for i, product := range products {
		resultProducts[i] = &map[string]interface{}{
			"id":            product.ID,
			"created_at":    product.CreatedAt,
			"updated_at":    product.UpdatedAt,
			"category_id":   product.CategoryID,
			"category_name": product.Category.Name,
			"seller_id":     product.SellerID,
			"seller_name":   product.Seller.Name,
			"name":          product.Name,
			"image":         product.Images[0].URL,
			"rating":        product.Rating,
			"price":         product.Price,
		}
	}

	// return c.JSON(products)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":      "success",
		"statusCode":  200,
		"data":        resultProducts,
		"currentPage": page,
		"limit":       limit,
		"totalData":   totalData,
		"totalPage":   totalPage,
	})
}

func GetDetailProduct(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid ID format",
		})
	}

	product := models.SelectProductById(id)
	if product.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Product not found",
		})
	}

	images := make([]map[string]interface{}, len(product.Images))
	for i, image := range product.Images {
		images[i] = map[string]interface{}{
			"id":         image.ID,
			"created_at": image.CreatedAt,
			"updated_at": image.UpdatedAt,
			"url":        image.URL,
		}
	}

	sizes := make([]map[string]interface{}, len(product.Sizes))
	for i, size := range product.Sizes {
		sizes[i] = map[string]interface{}{
			"id":         size.ID,
			"created_at": size.CreatedAt,
			"updated_at": size.UpdatedAt,
			"value":      size.Value,
		}
	}

	colors := make([]map[string]interface{}, len(product.Colors))
	for i, image := range product.Colors {
		colors[i] = map[string]interface{}{
			"id":         image.ID,
			"created_at": image.CreatedAt,
			"updated_at": image.UpdatedAt,
			"value":      image.Value,
		}
	}

	resultProduct := map[string]interface{}{
		"id":            product.ID,
		"created_at":    product.CreatedAt,
		"updated_at":    product.UpdatedAt,
		"category_id":   product.CategoryID,
		"category_name": product.Category.Name,
		"seller_id":     product.SellerID,
		"seller_name":   product.Seller.Name,
		"name":          product.Name,
		"images":        images,
		"sizes":         sizes,
		"colors":        colors,
		"rating":        product.Rating,
		"price":         product.Price,
		"stock":         product.Stock,
		"condition":     product.Condition,
		"desc":          product.Description,
	}

	// return c.JSON(product)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"message":    "Product not empty",
		"data":       resultProduct,
	})
}

func CreateProduct(c *fiber.Ctx) error {
	id, err := middlewares.JWTAuthorize(c, "seller")
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

	seller := models.SelectSellerByUserId(int(id))
	if seller.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Seller not found",
		})
	}

	var newProduct models.Product

	if err := c.BodyParser(&newProduct); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	newProduct.SellerID = seller.ID

	product := middlewares.XSSMiddleware(&newProduct).(*models.Product)

	if errors := helpers.StructValidation(product); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "Validation failed",
			"errors":     errors,
		})
	}

	if category := models.SelectCategoryById(int(product.CategoryID)); category.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Category not found",
		})
	}

	if err := models.CreateProduct(product); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to create product",
		})
	} else {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Product created successfully",
		})
	}
}

func UpdateProduct(c *fiber.Ctx) error {
	userId, err := middlewares.JWTAuthorize(c, "seller")
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

	seller := models.SelectSellerByUserId(int(userId))
	if seller.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Seller not found",
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

	currentProduct := models.SelectProductById(id)
	if currentProduct.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Product not found",
		})
	}

	// currentSizes := models.SelectSizesByProductId(id)

	var updatedProduct models.Product

	if err := c.BodyParser(&updatedProduct); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
			"data":       updatedProduct,
		})
	}
	updatedProduct.SellerID = seller.ID

	product := middlewares.XSSMiddleware(&updatedProduct).(*models.Product)

	if errors := helpers.StructValidation(product); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "Validation failed",
			"errors":     errors,
		})
	}

	if category := models.SelectCategoryById(int(product.CategoryID)); category.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Category not found",
		})
	}

	// currentSizeMap := make(map[string]bool)
	// productSizeMap := make(map[string]bool)

	// for _, currentSize := range currentSizes {
	// 	currentSizeMap[currentSize.Value] = true
	// }

	// for _, size := range product.Sizes {
	// 	productSizeMap[size.Value] = true
	// }

	// var resultSizesDeleted []string
	// var resultSizesAdded []string

	// for _, currentSize := range currentSizes {
	// 	if !productSizeMap[currentSize.Value] {
	// 		// resultSizesDeleted = append(resultSizesDeleted, currentSize.Value)
	// 		if err := models.DeleteSizeProduct(int(currentSize.ID)); err != nil {
	// 			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
	// 				"status":     "server error",
	// 				"statusCode": 500,
	// 				"message":    "Failed to delete size product",
	// 			})
	// 		}
	// 	}
	// }

	// for _, size := range product.Sizes {
	// 	if !currentSizeMap[size.Value] {
	// 		// resultSizesAdded = append(resultSizesAdded, size.Value)
	// 		newSize := models.Size{
	// 			Value: size.Value,
	// 			ProductID: uint(id),
	// 		}
	// 		if err := models.CreateSizeProduct(&newSize); err != nil {
	// 			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
	// 				"status":     "server error",
	// 				"statusCode": 500,
	// 				"message":    "Failed to create product",
	// 			})
	// 		}
	// 	}
	// }

	// return c.Status(fiber.StatusOK).JSON(fiber.Map{
	// 	"status":       "success",
	// 	"statusCode":   200,
	// 	// "size_added":   resultSizesAdded,
	// 	// "size_deleted": resultSizesDeleted,
	// })

	if err := models.UpdateProductWithDetails(currentProduct, product); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    fmt.Sprintf("Failed to update product with ID %d", id),
		})
	} else {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    fmt.Sprintf("Product with ID %d updated successfully", id),
		})
	}
}

func DeleteProduct(c *fiber.Ctx) error {
	if _, err := middlewares.JWTAuthorize(c, "seller"); err != nil {
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

	product := models.SelectProductById(id)
	if product.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Product not found",
		})
	}

	if err := models.DeleteProductAllData(id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    fmt.Sprintf("Failed to delete product with ID %d", id),
		})
	} else {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    fmt.Sprintf("Product with ID %d deleted successfully", id),
		})
	}
}
