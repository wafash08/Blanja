package helpers

import (
	"strconv"
	"strings"
)

func GetSortParams(sort, orderBy string) string {
	if sort != "ASC" && sort != "DESC" {
		sort = "DESC"
	}

	if orderBy == "" {
		orderBy = "updated_at"
	}

	return orderBy + " " + sort
}

func GetPaginationParams(oldLimit, oldPage string) (int, int, int) {
	page, _ := strconv.Atoi(oldPage)
	if page == 0 {
		page = 1
	}

	limit, _ := strconv.Atoi(oldLimit)
	if limit == 0 {
		limit = 5
	}

	offset := (page - 1) * limit

	return page, limit, offset
}

func GetFilterParams(colors, sizes, category_id, seller_id string) map[string]interface{} {
	filter := make(map[string]interface{})

	if colors != "" {
		colorSplit := strings.Split(colors, ",")
		for i, color := range colorSplit {
			toLowerColor := strings.ToLower(color)
			pageColor := strings.Replace(toLowerColor, "%23", "#", 1)
			colorSplit[i] = pageColor
		}
		filter["colorValues"] = colorSplit
	}

	if sizes != "" {
		sizeSplit := strings.Split(sizes, ",")
		filter["sizeValues"] = sizeSplit
	}

	idCategory, _ := strconv.Atoi(category_id)
	filter["category_id"] = idCategory

	idSeller, _ := strconv.Atoi(seller_id)
	filter["seller_id"] = idSeller

	return filter
}
