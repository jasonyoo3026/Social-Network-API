function getDateSuffix(date) {
    let dateStr = String(date);
  
    const lastDigit = dateStr.slice(-1);
  
    if (lastDigit === "1" && dateStr !== "11") {
      dateStr += "st";
    } else if (lastDigit === "2" && dateStr !== "12") {
      dateStr += "nd";
    } else if (lastDigit === "3" && dateStr !== "13") {
      dateStr += "rd";
    } else {
      dateStr += "th";
    }
  
    return dateStr;
  }
  
  function formatTimestamp(timestamp, options = {}) {
    const { monthLength = "short", dateSuffix = true } = options;
  
    const monthNames = monthLength === "short"
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const dateInstance = new Date(timestamp);
    const month = monthNames[dateInstance.getMonth()];
  
    const day = dateSuffix ? getDateSuffix(dateInstance.getDate()) : dateInstance.getDate();
    const year = dateInstance.getFullYear();
  
    let hour = dateInstance.getHours();
    hour = hour > 12 ? hour % 12 : hour === 0 ? 12 : hour;
  
    const minutes = dateInstance.getMinutes().toString().padStart(2, '0');
    const period = dateInstance.getHours() >= 12 ? "pm" : "am";
  
    return `${month} ${day}, ${year} at ${hour}:${minutes} ${period}`;
  }
  
  module.exports = formatTimestamp;
  