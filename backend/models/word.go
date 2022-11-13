package models

type Word struct {
	ID               uint     `json:"id" gorm:"primaryKey, AUTO_INCREMENT"`
	Name             string   `json:"name" gorm:"not null, unique"`
	Language_idRefer int      `json:"language_id" gorm:"not null, unique"`
	Language         Language `gorm:"foreignKey:Language_idRefer;constraint:OnDelete:CASCADE"`
}
