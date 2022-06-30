   let ss = SpreadsheetApp.getActiveSpreadsheet();
   let g_targetMonth = '7月マルチ適用に合わせる';
 let nextColVal_global = '7月(8月頭リリース)';
 
 function tanto(targetMonth){
   const sheetName = "各月担当別進捗管理【新体制】";
   let sheet = ss.getSheetByName(sheetName);
   let targetCol = 3; // 本番は1(ふし番号)
 
   //   let lastRow = 
   // sheet.getRange(sheet.getMaxRows(), lastCol)
   // .getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
   // Logger.log(lastRow)
 
   const maxRows = sheet.getMaxRows();
   let startRow;
   // 該当の月まで探索
   for (let i = 60; i < maxRows; i++){
     if (targetMonth == sheet.getRange(i, targetCol).getValue()){
       startRow = i + 1;
       break;
     }
   }
   // Logger.log(sheet.getRange(62, targetCol).getValue());
   
   //end 
   let endRow = null;
   for (let i = startRow; i < maxRows; i++){
     if (nextColVal_global == sheet.getRange(i, targetCol).getValue()){
       endRow = i;
       break;
     }
   }
 
   //
   // for (let i = startRow; i < endRow; i++){
   //   let val = sheet.getRange(i,targetCol).getValue();
   //   val 
   // }
    let array = new Array();
 
   const regex = /^[0-9]{6}/;
   for (let i = startRow; i < endRow; i++) {
     let val = sheet.getRange(i,targetCol).getValue(); 
     
     // 数値始まりのものだけ抽出する
     if (val == ''){continue;}
     if (typeof val == 'number'){
       val = val.toString();
     }
 
     // 数値始まりのものだけ抽出する
     if (regex.test(val)) {
       // すべて数字の場合は、そのまま設定
       if (/^[0-9]{6}$/.test(val)) {
         array.push(val);
       } else{
         array.push(val.slice(0, 6));
       }
     }
   }
   return array;
 
 
 
 }
 
 // ####################### end of tanto 
 let keikakuArray_ = new Array();
 let tantoArray_ = new Array();
 
 function compareKeikakuTanto(keikakuArray, tantoArray){
 
   Logger.log(keikakuArray);
   Logger.log(tantoArray);
   let keikakuNotHasNumArray = new Array();
   let tantoNotHasNumArray = new Array();
 
   for (let i = 0; i < keikakuArray.length; i++){
     for (let j = 0; j < tantoArray.length; j++){
       if (tantoArray[j] == keikakuArray[i]){
         break;
       } else if (j == tantoArray.length - 1){
         tantoNotHasNumArray.push(keikakuArray[i]);
       }
     }
   }
 
   for (let i = 0; i < tantoArray.length; i++){ //
     for (let j = 0; j < keikakuArray.length; j++){
       if (keikakuArray[j] == tantoArray[i]){ //
         break;
       } else if (j == keikakuArray.length - 1){
         keikakuNotHasNumArray.push(tantoArray[i]);//
       }
     }
   }
 let ans = [tantoNotHasNumArray, keikakuNotHasNumArray];
 return ans;
 }
 
 function main(){
   let targetMonth = getTargetMonth();
   let doubleDiffArray =compareKeikakuTanto(
         test(targetMonth),
         tanto(targetMonth)
   )
   outputDiff(doubleDiffArray);
   
 
 
 }
 
 
 function saveNextColVal(nextColVal) {
   nextColVal_global = nextColVal;
 }
 
 // getKeikakuBugNo(targetMonth)
 function test(){
 
 
   const sheetName = "今後の計画 【新体制】";
   let sheet = ss.getSheetByName(sheetName);
   const targetRow = 9;
 
   let nextCol;
   var lastCol = sheet.getRange(targetRow, sheet.getMaxColumns()).getNextDataCell(SpreadsheetApp.Direction.PREVIOUS).getColumn();
     // 対象のセルを特定する
   var targetCol = 1;
   for (;; lastCol--) {
     if (g_targetMonth == sheet.getRange(targetRow, lastCol).getValue()) {
       saveNextColVal(sheet.getRange(targetRow, lastCol + 1).getValue());
       break;
     }
   }
 
 
 
   let lastRow = 
   sheet.getRange(sheet.getMaxRows(), lastCol)
   .getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
 
   let array = new Array();
 
 
 const regex = /^[0-9]{6}/;
   for (let i = lastRow ; i > targetRow ; i--) {
     let val = sheet.getRange(i, lastCol).getValue(); 
     
     // 数値始まりのものだけ抽出する
     if (typeof val == 'number'){
       val = val.toString();
     }
 
     // 数値始まりのものだけ抽出する
     if (regex.test(val)) {
       // すべて数字の場合は、そのまま設定
       if (/^[0-9]{6}$/.test(val)) {
         array.push(val);
       } else{
         array.push(val.slice(0, 6));
       }
     }
   }
   return array;
 }
 
 /**
  * フォーマットを任意の数分追加する
  */
 // #########################
 
 // function onClickLeakCheck() {
 
 //   // 操作対象のシート名を指定
 //   const sheetName = "ふし対応漏れチェック";
 //   let sheet = ss.getSheetByName(sheetName);
 
 //   // チェック対象の月を指定する
 //   const cellRange = "C16";
 //   let targetMonth = sheet.getRange(cellRange).getValue;
 
 //   // 「今後の計画」シートから対象のふし番号を抽出する
 //   const keikakuMap = getKeikakuBugNo(targetMonth);
 //   // 「各月担当別進捗管理【新体制】」シートから対象のふし番号を抽出する
 //   const tantouMap = getTantoBugNo(targetMonth);
 
 //   Logger.log(keikakuMap);
 //   Logger.log(tantouMap)
 // }
 
 function getKeikakuBugNo(targetMonth) {
 
   // 操作対象のシート名を指定
   const sheetName = "今後の計画 【新体制】";
   let sheet = ss.getSheetByName(sheetName);
 
   //最終列から左方向に取得する // works
   const targetRow = 9;
   var lastCol = sheet.getRange(targetRow, sheet.getMaxColumns()).getNextDataCell(SpreadsheetApp.Direction.PREVIOUS).getColumn();
 
   // 対象のセルを特定する // Works
   var targetCol = 3;
   for (let i = 0 ; i < lastCol ; i++, targetCol++) {
     if (targetMonth == sheet.getRange(targetRow, targetCol).getValue()) {
       break;
     }
   }
 
   // 列の最終行から上方向に取得する // failed // なぜかエラーが出る
   let lastRow = sheet.getRange(sheet.getMaxRows(), targetCol).getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
   
   let array = new Array();
 
 // map の使い方間違えている
   for (let i = 0 ; i < lastRow ; i++) {
     let val = sheet.getRange(i, lastCol).getValue(); 
   
     // 数値始まりのものだけ抽出する
     if (val.test(/^[0-9]/)) {
 
       // すべて数字の場合は、そのまま設定
       if (val.test(/[0-9]/)) {
         array.push(val);
       } else {
         // コメント付きの場合は、ふし番号だけ抽出
         // 例）123456（差し込み）
         array.push(val.slice(0, 5));
       }
     }
   }
   return array;
 }
 
 function outputDiff(doubleArray){
   let sheet = ss.getSheetByName('ふし対応漏れチェック');
   const keikakuIndex = 1;
   const tantoIndex = 0;
   let tantoNotHasArray = doubleArray[tantoIndex];
   let keikakuArray = doubleArray[keikakuIndex];
 
   let startRow = 17;
   let outRangeTantoNotHas = sheet.getRange(startRow,14);
   let outRangeKeikakuNotHas = sheet.getRange(startRow,15);
 
   for (let i = 0; i < tantoNotHasArray.length ; i++){
     sheet.getRange(i + startRow, 14).setValue(tantoNotHasArray[i]);
   }
 
   for (let i = 0; i < keikakuArray.length ; i++){
     sheet.getRange(i + startRow, 15).setValue(keikakuArray[i]);
   }
 }
 
 
 function getTargetMonth(){
   let sheet = ss.getSheetByName('ふし対応漏れチェック');
   let targetMonthCell = sheet.getRange('C19');
 
   return (targetMonthCell.getValue());
 
 
 }
