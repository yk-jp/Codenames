package models

import (
	"time"
)

type Player struct {
	ID            uint   `json:"id" gorm:"primaryKey,AUTO_INCREMENT"`
	Name          string `json:"name" gorm:"not null"`
	CreatedAt     time.Time
	Socket_id     string     `json:"socket_id" gorm:"not null;unique"`
	Color_idRefer int        `json:"color_id" gorm:"not null"`
	Color         Color      `gorm:"foreignKey:Color_idRefer;constraint:OnDelete:CASCADE"`
	Role_idRefer  int        `json:"role_id" gorm:"not null"`
	Role          PlayerRole `gorm:"foreignKey:Role_idRefer;constraint:OnDelete:CASCADE"`
	Table_idRefer int        `json:"table_id" gorm:"not null"`
	Table         Table      `gorm:"foreignKey:Table_idRefer;constraint:OnDelete:CASCADE"`
}
