package controllers

import (
	"gofiber-marketplace/src/helpers"
	"gofiber-marketplace/src/middlewares"
	"gofiber-marketplace/src/models"
	"gofiber-marketplace/src/services"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/veritrans/go-midtrans"
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

	transactionNumber := helpers.GenerateTransactionNumber()

	var newOrder models.Order

	if err := c.BodyParser(&newOrder); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	newOrder.UserID = uint(userId)
	newOrder.Status = "not_yet_paid"
	newOrder.TransactionNumber = transactionNumber

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
	}

	existUser := models.SelectUserById(int(userId))
	if existUser.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "User not found",
		})
	}

	var userInfo struct {
		Name  string
		Phone string
	}

	if existUser.Role == "seller" {
		seller := models.SelectSellerByUserId(int(existUser.ID))
		userInfo.Name = seller.Name
		userInfo.Phone = seller.Phone
	} else if existUser.Role == "customer" {
		customer := models.SelectCustomerByUserId(int(existUser.ID))
		userInfo.Name = customer.Name
		userInfo.Phone = customer.Phone
	}

	address := models.SelectAddressbyId(int(order.AddressID))

	snapGateway := midtrans.SnapGateway{
		Client: services.Client,
	}

	CustomerAddress := &midtrans.CustAddress{
		FName:    address.Name,
		Phone:    address.Phone,
		Address:  address.MainAddress,
		City:     address.City,
		Postcode: address.PostalCode,
	}

	snapReq := &midtrans.SnapReq{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  transactionNumber,
			GrossAmt: int64(order.TotalPrice),
		},
		CustomerDetail: &midtrans.CustDetail{
			FName:    userInfo.Name,
			Email:    existUser.Email,
			Phone:    userInfo.Phone,
			BillAddr: CustomerAddress,
			ShipAddr: CustomerAddress,
		},
	}

	snapResp, err := snapGateway.GetToken(snapReq)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 404,
			"message":    "Failed to create transaction with Midtrans",
			"error":      err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":       "success",
		"statusCode":   201,
		"message":      "Order created successfully. Please paid as soon as possible.",
		"token":        snapResp.Token,
		"redirect_url": snapResp.RedirectURL,
	})
}

func HandlePaymentCallback(c *fiber.Ctx) error {
	var notificationPayload models.Notification
	if err := c.BodyParser(&notificationPayload); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	orderID := notificationPayload.OrderID

	existOrder := models.SelectOrderbyTransactionNumber(orderID)
	if existOrder.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Order not found",
		})
	}

	var paymentMethod string
	if len(notificationPayload.VaNumbers) > 0 {
		paymentMethod = notificationPayload.PaymentType + "-" + notificationPayload.VaNumbers[0].Bank
	} else {
		paymentMethod = notificationPayload.PaymentType
	}

	if notificationPayload.TransactionStatus == "pending" {
		if err := models.UpdateStatusOrder(int(existOrder.ID), "not_yet_paid"); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":     "server error",
				"statusCode": 500,
				"message":    "Failed to update status order",
			})
		}
	}

	if notificationPayload.TransactionStatus == "settlement" {
		if err := models.UpdateStatusOrder(int(existOrder.ID), "get_paid"); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":     "server error",
				"statusCode": 500,
				"message":    "Failed to update status order",
			})
		}
	}

	if notificationPayload.TransactionStatus == "cancel" {
		if err := models.UpdateStatusOrder(int(existOrder.ID), "canceled"); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":     "server error",
				"statusCode": 500,
				"message":    "Failed to update status order",
			})
		}
	}

	if notificationPayload.TransactionStatus == "expired" {
		if err := models.UpdateStatusOrder(int(existOrder.ID), "expired"); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"status":     "server error",
				"statusCode": 500,
				"message":    "Failed to update status order",
			})
		}
	}

	if err := models.UpdatePaymentMethodOrder(int(existOrder.ID), paymentMethod); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to update status order",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "ok",
		"statusCode": 200,
		"message":    "Transaction payment and status updated.",
	})
}

func UpdateOrder(c *fiber.Ctx) error {
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

	if order := models.SelectOrderbyId(id); order.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "Order not found",
		})
	} else if order.UserID != uint(userId) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "This order is not same user",
		})
	}

	var updatedOrder models.Order

	if err := c.BodyParser(&updatedOrder); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid request body",
		})
	}
	updatedOrder.UserID = uint(userId)

	order := middlewares.XSSMiddleware(&updatedOrder).(*models.Order)

	if errors := helpers.StructValidation(order); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"status":     "unprocessable entity",
			"statusCode": 422,
			"message":    "Validation failed",
			"errors":     errors,
		})
	}

	if err := models.UpdateOrder(id, order); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to update order",
		})
	} else {
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"status":     "success",
			"statusCode": 200,
			"message":    "Order created successfully",
		})
	}
}

func DeleteOrder(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":     "bad request",
			"statusCode": 400,
			"message":    "Invalid ID format",
		})
	}

	order := models.SelectOrderbyId(id)
	if order.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":     "not found",
			"statusCode": 404,
			"message":    "order not found",
		})
	}

	if err := models.DeleteOrder(id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":     "server error",
			"statusCode": 500,
			"message":    "Failed to delete order",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"message":    "Order deleted successfully",
	})
}
