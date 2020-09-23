module.exports = {
  
formatDate: function(date){
    let ampm = (date.getHours()<12) ? "AM" : "PM";
    let year = date.getFullYear().toString().slice(2,4) ;
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours()
      if(hour == 0){
        hour = 12;
      }else if(hour < 13){
         hour = date.getHours();
      }else{
        hour = date.getHours()-12;
      }
    let min = (date.getMinutes() > 9)? date.getMinutes() : "0"+date.getMinutes();
  
    let dateString = month + "/" + day +" "+ hour + ampm;  
  
    return dateString;
  }  

}