function doPost(req) {
    const sheet = SpreadsheetApp.getActiveSheet();
    const {firstName, mail, country, phone, password} = req.parameter;
    const lastRow = sheet.getLastRow();
  
    if (!firstName){
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Не указан userName', requestName: req})).setMimeType(ContentService.MimeType.JSON)
    }
    else if (!mail){
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Не указан mail'})).setMimeType(ContentService.MimeType.JSON)
    }
    else if (!country){
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Не указан country'})).setMimeType(ContentService.MimeType.JSON)
    }
    else if (!phone){
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Не указан phone'})).setMimeType(ContentService.MimeType.JSON)
    }
    else if (!password){
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Не указан password'})).setMimeType(ContentService.MimeType.JSON)
    }
    sheet.getRange(`A${lastRow+1}`).setValue(firstName);
    sheet.getRange(`B${lastRow+1}`).setValue(mail);
    sheet.getRange(`C${lastRow+1}`).setValue(country);
    sheet.getRange(`D${lastRow+1}`).setValue(phone);
    sheet.getRange(`E${lastRow+1}`).setValue(password);
    const result = getResult(req.parameter)
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON)
  }
  
  function doGet(req) {
    const {firstName} = req.parameter
  
    if (!firstName) 
      return ContentService.createTextOutput(JSON.stringify({succe: false, error: `Не указан userName`})).setMimeType(ContentService.MimeType.JSON)
    
    const result = getResult(req.parameter)
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON)
  }
  
  function getResult({firstName, mail, country, phone, password}) {
    const sheet = SpreadsheetApp.getActiveSheet()
    const lastRow = sheet.getLastRow() + 1
    const result = {firstName, mail,  success: true}
  
    for(let i = 2; i < lastRow; i++) {
      let id = sheet.getRange(`A${i}`).getValue()
      let currMail = sheet.getRange(`C${i}`).getValue()
  
      if (!id) break
      if (id == firstName && (!mail || mail == currMail)) {
          result += sheet.getRange(`B${i}`).getValue() * 1 
      }
    }
    return result
  }