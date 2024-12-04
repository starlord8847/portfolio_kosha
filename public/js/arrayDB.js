let data = [];
var krpano

function krpanoready(_krpano){
    krpano = _krpano;
};

function database(){
    console.log("hello data :: ", data);
    for(let i = 0; i < data.length; i++){
        console.log("배열 반복문 :: ", data[i]);
        krpano.call(`callwith(hotspot[icon_exp_${data[i]}], onclick2);`);
        // krpano.call(`hotspot[icon_exp_${data[i]}].`);
    }
};

function newPanoCreateArray(){
    makeThreatList = [];
    for (i = 0; i < ThreatList.length; i++) {
        makeThreatList.push('');
    };
};

// function removePanoResetArray(){
//     for (i = 0; i < ThreatList.length; i++) {
//         makeThreatList.splice(0, ThreatList.length);
//     };
// };
