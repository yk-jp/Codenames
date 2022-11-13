package models

type Card struct {
	ID            uint  `json:"id" gorm:"primaryKey, AUTO_INCREMENT"`
	Word_idRefer  int   `json:"word_id" gorm:"not null"`
	Word_id       Word  `gorm:"foreignKey:Word_idRefer"`
	Table_idRefer int   `json:"table_id" gorm:"not null"`
	Table         Table `gorm:"foreignKey:Table_idRefer"`
	Color_idRefer int   `json:"color_id" gorm:"not null"`
	Color         Color `gorm:"foreignKey:Color_idRefer"`
	Is_clicked    uint  `json:"is_clicked"`
}
