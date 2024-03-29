package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/yk-jp/Codenames/config"
	"github.com/yk-jp/Codenames/database"
)

func greeting(c *fiber.Ctx) error {
	return c.SendString("Welcome")
}

func main() {
	app := fiber.New()

	config := config.LoadEnvVariables()

	database.ConnectDb(config)

	app.Get("/api", greeting)

	log.Fatal(app.Listen(":5000"))
}
