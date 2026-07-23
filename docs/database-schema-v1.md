# Database Schema v1

## User

| Field    | Type    |
| -------- | ------- |
| id       | INTEGER |
| email    | STRING  |
| password | STRING  |
| role     | STRING  |

Relations:

* User has one Basket
* User has many Ratings

---

## Basket

| Field  | Type    |
| ------ | ------- |
| id     | INTEGER |
| userId | INTEGER |

Relations:

* Basket belongs to User
* Basket has many BasketDevices

---

## BasketDevice

| Field    | Type                    |
| -------- | ----------------------- |
| id       | INTEGER                 |
| basketId | INTEGER                 |
| deviceId | INTEGER                 |
| quantity | INTEGER DEFAULT 1       |

Relations:

* BasketDevice belongs to Basket
* BasketDevice belongs to Device

---

## Device

| Field   | Type    |
| ------- | ------- |
| id      | INTEGER |
| name    | STRING  |
| price   | INTEGER |
| rating  | INTEGER |
| img     | STRING  |
| typeId  | INTEGER |
| brandId | INTEGER |

Relations:

* Device belongs to Type
* Device belongs to Brand
* Device has many Ratings
* Device has many DeviceInfos
* Device has many BasketDevices

---

## Type

| Field | Type    |
| ----- | ------- |
| id    | INTEGER |
| name  | STRING  |

Relations:

* Type has many Devices
* Type belongs to many Brands

---

## Brand

| Field | Type    |
| ----- | ------- |
| id    | INTEGER |
| name  | STRING  |

Relations:

* Brand has many Devices
* Brand belongs to many Types

---

## Rating

| Field    | Type    |
| -------- | ------- |
| id       | INTEGER |
| rate     | INTEGER |
| userId   | INTEGER |
| deviceId | INTEGER |

---

## DeviceInfo

| Field       | Type    |
| ----------- | ------- |
| id          | INTEGER |
| title       | STRING  |
| description | STRING  |
| deviceId    | INTEGER |

---

## TypeBrand

Many-to-many relation table between Type and Brand.

| Field   | Type    |
| ------- | ------- |
| id      | INTEGER |
| typeId  | INTEGER |
| brandId | INTEGER |


## Order

| Field      | Type                    |
| ---------- | ----------------------- |
| id         | INTEGER                 |
| status     | STRING DEFAULT 'NEW'    |
| totalPrice | INTEGER DEFAULT 0       |
| userId     | INTEGER                 |

Relations:

* Order belongs to User
* Order has many OrderItems

---

## OrderItem

| Field    | Type              |
| -------- | ----------------- |
| id       | INTEGER           |
| price    | INTEGER           |
| quantity | INTEGER DEFAULT 1 |
| orderId  | INTEGER           |
| deviceId | INTEGER           |

Relations:

* OrderItem belongs to Order
* OrderItem belongs to Device


---