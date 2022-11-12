package database

import (
	"fmt"
	"log"

	"github.com/yk-jp/Codenames/config"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DBInstance struct {
	Db *gorm.DB
}

var Db DBInstance

func ConnectDb(config config.Config) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/codenames", config.Db.User, config.Db.Password, config.Db.Host, config.Db.Port)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	log.Println("Conecction was successful")
	db.Logger = logger.Default.LogMode(logger.Info)
	log.Println("Running migrations")

	Db = DBInstance{Db: db}
}
