class ExcelJsWrap{
    _subject = '위험성평가 결과표';
    _workbook;
    _filename;
    _processName;

    _borders = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
    };
    
    constructor({filename, processName}){
        if(!ExcelJS){
            console.error('ExcelJs is NOT loaded!');
            return;
        }
        // 생성시 파일명 넘길때 적용
        if(filename) this._filename = filename;
        if(processName) this._processName = processName;

        this.init();
    }

    init(){
        // 워크북 생성
        this._workbook = new ExcelJS.Workbook();
        // Force workbook calculation on load
        // workbook.calcProperties.fullCalcOnLoad = true;
        // 워크북 뷰 설정
        this._workbook.views = [
            {
            x: 0, y: 0,width: 30000, height: 20000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
            }
        ];

        // 시트 생성
        // const worksheet = this._workbook.getWorksheet('위험성평가 결과표');
        const worksheet = this._workbook.addWorksheet(this._subject, {
            views:[{}],
            pageSetup:{paperSize: 9, orientation:'landscape'}
        });
        worksheet.views = [{state: 'frozen', xSplit: 0, ySplit:2}];
        

        // adjust properties afterwards (not supported by worksheet-writer)
        // worksheet.properties.outlineLevelCol = 2;
        worksheet.properties.defaultRowHeight = 45;
        
        // "위험성평가 결과표" row 높이 조절
        let row = worksheet.getRow(1);
        row.height = 30;
        
        // "NO" 있는 row 두 줄 높이 조절
        let rows = worksheet.getRows(2, 1);
        rows.forEach(row=>{
            row.height = 30;
        })

        // Set Print Area for a sheet
        // worksheet.pageSetup.printArea = 'A1:N10';
        worksheet.pageSetup.printTitlesColumn = 'A:J';


        // Add column headers and define column keys and widths
        // Note: these column structures are a this._workbook-building convenience only,
        // apart from the column width, they will not be fully persisted.
        worksheet.columns = [
            { header: 'NO', key: 'number', width: 10, height: 30 },
            { header: '유해・위험요인', key: 'factor', width: 60, height: 50 },
            { header: '상.', key: 'frequency', width: 10, height: 50 },
            { header: '중.', key: 'strength', width: 10, height: 50 },
            { header: '하.', key: 'strength', width: 10, height: 50 },
            { header: '해당없음.', key: 'risk', width: 10, height: 50 },
            { header: '개선대책', key: 'Measures', width: 70, height: 50 },
            { header: '개선예정일', key: 'Measures', width: 15, height: 50 },
            { header: '개선완료일', key: 'Measures', width: 15, height: 50 },
            { header: '담당자', key: 'Measures', width: 15, height: 50 },
        ];


        const subjectTextAlign = { vertical: 'middle', horizontal: 'center' };
        const subjectBgColor = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'9e9e9e'},
        }
        const subjectRowHeight = 200;

        // 상단 대제목 추가
        let cell = worksheet.getCell('A1');

        // 상단 중제목 배경색 설정
        const middleSubjectBgColor = {
            ...subjectBgColor, 
            fgColor:{argb:'cccccc'},
        };

        // 상단 중제목 추가
        worksheet.mergeCells('A1:A2');
        cell = worksheet.getCell('A1');
        cell.value = 'NO';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;
        
        // 상단 중제목 추가
        worksheet.mergeCells('B1:B2');
        cell = worksheet.getCell('B1');
        cell.value = '유해・위험요인';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;

        worksheet.mergeCells('C1:F1');
        cell = worksheet.getCell('C1');
        cell.value = '위험성의 수준';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;

        worksheet.mergeCells('G1:G2');
        cell = worksheet.getCell('G1');
        cell.value = '개선 대책';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;

        worksheet.mergeCells('H1:H2');
        cell = worksheet.getCell('H1');
        cell.value = '개선 예정일';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;

        worksheet.mergeCells('I1:I2');
        cell = worksheet.getCell('I1');
        cell.value = '개선 완료일';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;

        worksheet.mergeCells('J1:J2');
        cell = worksheet.getCell('J1');
        cell.value = '담당자';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;

        cell = worksheet.getCell('C2');
        cell.value = '상';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;

        cell = worksheet.getCell('D2');
        cell.value = '중';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;

        cell = worksheet.getCell('E2');
        cell.value = '하';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;

        cell = worksheet.getCell('F2');
        cell.value = '해당없음';
        cell.alignment = subjectTextAlign;
        cell.fill = middleSubjectBgColor;
        cell.border = this._borders;
        cell.height = subjectRowHeight;
        
    }
    setData(){
        if(!this._workbook){
            console.error('ExcelJsWrap.setData() workbook 이 초기화 되지 않았습니다.');
            return;
        }
        let noCount = 1;
        const worksheet = this._workbook.getWorksheet(this._subject);
        for(let i=0; i < THREATLIST.length; i++){
            let threat = THREATLIST[i].threat;
            let countermeasure = THREATLIST[i].countermeasure1;
            let grade = THREATLIST[i].grade.replace("HIGH", "✓").replace("MID", "✓").replace("LOW", "✓");
            if(THREATLIST[i].grade == THREATGRADE.HIGH){
                worksheet.addRow([noCount, threat, grade, '', '', '', countermeasure, '','','']);
            }else if(THREATLIST[i].grade == THREATGRADE.MID){
                worksheet.addRow([noCount, threat, '', grade, '', '', countermeasure, '','','']);
            }else if(THREATLIST[i].grade == THREATGRADE.LOW){
                worksheet.addRow([noCount, threat, '', '', grade, '', countermeasure, '','','']);
            }else if(THREATLIST[i].grade == THREATGRADE.NONE){
                worksheet.addRow([noCount, threat, '', '', '', grade, countermeasure, '','','']);
            }else if(THREATLIST[i].grade == THREATGRADE.UNKNOWN){
                worksheet.addRow([noCount, threat, '', '', '', '', countermeasure, '','','']);
            };
            
            const row = worksheet.lastRow;
            row.eachCell((cell, colNumber)=> {
                let subjectTextAlign = { vertical: 'middle', horizontal: 'center' };
                if(colNumber == 2 || colNumber == 7 ){
                    subjectTextAlign = { vertical: 'middle', horizontal: 'left', wrapText:true };
                }

                cell.border = this._borders;
                cell.alignment = subjectTextAlign;
            });
            // 정보가 추가되는 새로운 row 높이 설정
            // row.height=row.height * 20 / row.width;
            // row.height = height > 20 ? height * 2 / 3 : 20;
            noCount += 1;
        };
    };

    save(filename){
        // 생성시 파일명 넘길때 적용
        if(filename){
            this._filename = filename;
        }

        // 파일명이 설정되지 않은 경우, 새로 부여
        if(!this._filename){
            this._filename = this.getNewFileName();
        }

        // 파일 생성
        this._workbook.xlsx.writeBuffer( {
            base64: true
        })
        .then((xls64)=> {
            // build anchor tag and attach file (works in chrome)
            var a = document.createElement("a");
            var data = new Blob([xls64], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

            var url = URL.createObjectURL(data);
            a.href = url;
            a.download = this._filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        })
        .catch(function(error) {
            console.log(error.message);
        });
    }


    // 새로운 제목을 회신하는 함수 : 새 제목 부여에 사용
    getNewFileName(){
        return `${this._subject}_${Date.now()}.xlsx`;
    }


    // getter : workbook 회신
    get workbook(){
        return this._workbook;
    }
    // getter : filename 회신
    get filename(){
        return this._filename;
    }


    
}


/**
 * 실행 방법 예제
 * */ 
// const excel = new ExcelJsWrap({
//     processName: '프레스임가공',
// })
// excel.setData(ThreatList);
// excel.save();