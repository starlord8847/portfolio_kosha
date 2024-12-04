function downloadSelected(){
    const excel = new ExcelJsWrap({
        processName: '창호공사 작업',
    });
    excel.setData();
    excel.save();

     // onlyTextList = selectedHotspots.map(hs=>{
        //     return hs.textindex;
        // });
        // onlyTextList = selectedHotspots.map(hs=>{
        //     return hs.textindex;
        // });


    // 기존 onlyTextList
    // onlyTextList = selectedHotspots.map(hs=>{
    //     return hs.html.replaceAll('[br/]','');;
    // })

    // function updateArray(myArray, oldValue, newValue){
    //     if(!myArray instanceof Array)
    //     return;

    //     const index = myArray.indexOf(oldValue);
    //     if(index !== -1){
    //         myArray[index] = newValue;
    //     }
    // }
    // updateArray(test, 1, " ");
}