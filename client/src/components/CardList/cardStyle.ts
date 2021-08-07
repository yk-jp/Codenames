/*
 color for operative

 text and bg has a default color except for NO TEAM
*/
export const cardStyleForOperative = {
  "ASSASIN": { text: "", bg: "" },
  "BYSTANDER": { text: "", bg: "" },
  "RED": { text: "", bg: "" },
  "BLUE": { text: "", bg: "" },
  "NO TEAM": { text: "text-white", bg: "" },
  "disabled": false
};

//  color for spymaster
export const cardStyleForSpymaster = {
  "ASSASIN": { text: "text-dark", bg: "stopHover" },
  "BYSTANDER": { text: "text-success", bg: "stopHover" },
  "RED": { text: "text-danger", bg: "stopHover" },
  "BLUE": { text: "text-primary", bg: "stopHover" },
  "NO TEAM": { text: "text-white", bg: [""] },
  "disabled": true
};

//  after cards were clicked
export const clickedCardStyleForSpymasterAndOperative = {
  "ASSASIN": { text: "text-white", bg: "bg-dark stopHover" },
  "BYSTANDER": { text: "text-white", bg: "bg-success stopHover" },
  "RED": { text: "text-white", bg: "bg-danger stopHover" },
  "BLUE": { text: "text-white", bg: "bg-primary stopHover" },
  "NO TEAM": { text: "text-white", bg: "" },
  "disabled": true
};
