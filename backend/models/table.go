package models

type Table struct {
	ID          uint   `json:"id" gorm:"primaryKey, AUTO_INCREMENT"`
	Game_status string `json:"game_status" gorm:"not null"`
	Phase       string `json:"phase" gorm:"not null"`
}
